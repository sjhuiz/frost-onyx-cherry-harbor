import { tidyGpu } from "@/lib/format";
import type { BrowserFamily, MachineReport, StorageReport } from "@/lib/types";

type Stage = (label: string) => void;

type HeapMemory = {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
};

function browserFamily(ua: string): { family: BrowserFamily; name: string } {
  const brands = (navigator as Navigator & {
    userAgentData?: { brands?: { brand: string; version: string }[] };
  }).userAgentData?.brands;
  const brand = brands?.find(
    (item) => !/not.a.brand/i.test(item.brand) && !/chromium/i.test(item.brand),
  );
  if (/firefox|fxios/i.test(ua)) return { family: "firefox", name: brand?.brand ?? "Firefox" };
  if (/edg\//i.test(ua)) return { family: "chromium", name: brand?.brand ?? "Edge" };
  if (/chrome|crios|chromium/i.test(ua)) return { family: "chromium", name: brand?.brand ?? "Chrome" };
  if (/safari/i.test(ua)) return { family: "safari", name: "Safari" };
  return { family: "other", name: brand?.brand ?? "Browser" };
}

function platformOf(ua: string): { platformLabel: string; mac: boolean } {
  const hinted = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData
    ?.platform;
  const blob = `${hinted ?? ""} ${navigator.platform ?? ""} ${ua}`;
  if (/mac/i.test(blob)) return { platformLabel: "Mac", mac: true };
  if (/win/i.test(blob)) return { platformLabel: "Windows", mac: false };
  if (/iphone|ipad|ios/i.test(blob)) return { platformLabel: "iPhone or iPad", mac: false };
  if (/android/i.test(blob)) return { platformLabel: "Android", mac: false };
  if (/linux/i.test(blob)) return { platformLabel: "Linux", mac: false };
  return { platformLabel: hinted || "This device", mac: false };
}

function storageBytes(storage: Storage): number {
  let bytes = 0;
  for (let i = 0; i < storage.length; i += 1) {
    const key = storage.key(i) ?? "";
    const value = storage.getItem(key) ?? "";
    bytes += (key.length + value.length) * 2;
  }
  return bytes;
}

export async function probeStorage(): Promise<StorageReport> {
  const report: StorageReport = {
    supported: typeof navigator !== "undefined" && !!navigator.storage?.estimate,
    quota: null,
    usage: null,
    cacheBytes: 0,
    cacheEntries: 0,
    databases: [],
    localStorageBytes: 0,
    sessionStorageBytes: 0,
    serviceWorkers: 0,
  };

  try {
    if (navigator.storage?.estimate) {
      const estimate = await navigator.storage.estimate();
      report.quota = estimate.quota ?? null;
      report.usage = estimate.usage ?? null;
    }
  } catch {
    report.supported = false;
  }

  try {
    report.localStorageBytes = storageBytes(localStorage);
  } catch {
    report.localStorageBytes = 0;
  }
  try {
    report.sessionStorageBytes = storageBytes(sessionStorage);
  } catch {
    report.sessionStorageBytes = 0;
  }

  try {
    const anyIdb = indexedDB as IDBFactory & {
      databases?: () => Promise<{ name?: string }[]>;
    };
    if (anyIdb.databases) {
      const dbs = await anyIdb.databases();
      report.databases = dbs.map((db) => db.name).filter((name): name is string => !!name);
    }
  } catch {
    report.databases = [];
  }

  try {
    if ("caches" in window) {
      const names = await caches.keys();
      const deadline = performance.now() + 500;
      for (const name of names) {
        if (performance.now() > deadline) break;
        const cache = await caches.open(name);
        const requests = await cache.keys();
        report.cacheEntries += requests.length;
        const cap = Math.min(requests.length, 30);
        for (let i = 0; i < cap; i += 1) {
          if (performance.now() > deadline) break;
          const response = await cache.match(requests[i]);
          const len = Number(response?.headers.get("content-length") || 0);
          if (len > 0) report.cacheBytes += len;
        }
      }
    }
  } catch {
    report.cacheBytes = 0;
  }

  try {
    if (navigator.serviceWorker?.getRegistrations) {
      const regs = await navigator.serviceWorker.getRegistrations();
      report.serviceWorkers = regs.length;
    }
  } catch {
    report.serviceWorkers = 0;
  }

  return report;
}

function benchWorker(ms: number): Promise<number> {
  return new Promise((resolve, reject) => {
    let url = "";
    try {
      const source =
        "self.onmessage=function(e){var ms=e.data|0;var t=performance.now();var n=0;var x=1;while(performance.now()-t<ms){x=Math.imul(x,1664525)+1013904223|0;n++;}self.postMessage(n);};";
      url = URL.createObjectURL(new Blob([source], { type: "text/javascript" }));
      const worker = new Worker(url);
      const timer = window.setTimeout(() => {
        worker.terminate();
        URL.revokeObjectURL(url);
        reject(new Error("timeout"));
      }, ms + 1500);
      worker.onerror = () => {
        window.clearTimeout(timer);
        worker.terminate();
        URL.revokeObjectURL(url);
        reject(new Error("worker"));
      };
      worker.onmessage = (event) => {
        window.clearTimeout(timer);
        worker.terminate();
        URL.revokeObjectURL(url);
        resolve(Number(event.data) || 0);
      };
      worker.postMessage(ms);
    } catch (error) {
      if (url) URL.revokeObjectURL(url);
      reject(error);
    }
  });
}

function benchMain(ms: number): Promise<number> {
  return new Promise((resolve) => {
    const start = performance.now();
    let n = 0;
    let x = 1;
    const step = () => {
      const slice = performance.now();
      while (performance.now() - slice < 12 && performance.now() - start < ms) {
        x = Math.imul(x, 1664525) + 1013904223;
        n += 1;
      }
      if (performance.now() - start < ms) window.setTimeout(step, 0);
      else resolve(n);
    };
    step();
  });
}

async function benchmark(ms: number): Promise<number | null> {
  try {
    return await benchWorker(ms);
  } catch {
    try {
      return await benchMain(Math.min(ms, 80));
    } catch {
      return null;
    }
  }
}

export async function measureContention(threads: number): Promise<{
  ratio: number;
  workers: number;
  single: number;
  many: number;
}> {
  const ms = 240;
  const workers = Math.min(Math.max(threads, 1), 8);
  const single = (await benchmark(ms)) ?? 0;
  const counts = await Promise.all(Array.from({ length: workers }, () => benchmark(ms)));
  const many = counts.reduce<number>((sum, value) => sum + (value ?? 0), 0);
  const ratio = single > 0 ? many / (single * workers) : 0;
  return { ratio, workers, single, many };
}

function readGpu(): { tidy: string | null; full: string | null } {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");
    if (!gl) return { tidy: null, full: null };
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const full = ext
      ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || "")
      : String(gl.getParameter(gl.RENDERER) || "");
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    const tidy = tidyGpu(full);
    return { tidy: tidy || null, full: full || null };
  } catch {
    return { tidy: null, full: null };
  }
}

function watchLongTasks(ms: number): Promise<{ count: number; ms: number }> {
  return new Promise((resolve) => {
    let count = 0;
    let total = 0;
    let observer: PerformanceObserver | null = null;
    try {
      observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          count += 1;
          total += entry.duration;
        }
      });
      observer.observe({ type: "longtask", buffered: false });
    } catch {
      resolve({ count: 0, ms: 0 });
      return;
    }
    window.setTimeout(() => {
      observer?.disconnect();
      resolve({ count, ms: total });
    }, ms);
  });
}

export async function sweep(onStage: Stage): Promise<MachineReport> {
  onStage("Nameplate");
  const ua = navigator.userAgent;
  const browser = browserFamily(ua);
  const platform = platformOf(ua);
  const gpu = readGpu();
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const heap = (performance as Performance & { memory?: HeapMemory }).memory;
  const connection = (navigator as Navigator & {
    connection?: { effectiveType?: string; saveData?: boolean; downlink?: number };
  }).connection;

  onStage("Processor");
  const benchmarkMs = 180;
  const benchmarkOps = await benchmark(benchmarkMs);

  onStage("Storage");
  const storage = await probeStorage();

  onStage("Compositor");
  const longTasks = await watchLongTasks(350);

  return {
    capturedAt: Date.now(),
    browser: { ...browser, ...platform },
    cpu: {
      threads: navigator.hardwareConcurrency || 1,
      benchmarkOps,
      benchmarkMs,
    },
    memory: {
      deviceMemoryGb: typeof deviceMemory === "number" ? deviceMemory : null,
      deviceMemoryCapped: typeof deviceMemory === "number" && deviceMemory >= 8,
      heapUsed: heap?.usedJSHeapSize ?? null,
      heapTotal: heap?.totalJSHeapSize ?? null,
      heapLimit: heap?.jsHeapSizeLimit ?? null,
    },
    storage,
    display: {
      width: window.screen?.width ?? 0,
      height: window.screen?.height ?? 0,
      dpr: window.devicePixelRatio || 1,
    },
    gpu: gpu.tidy,
    gpuFull: gpu.full,
    network: {
      effectiveType: connection?.effectiveType ?? null,
      saveData: !!connection?.saveData,
      downlink: typeof connection?.downlink === "number" ? connection.downlink : null,
    },
    longTasks,
  };
}
