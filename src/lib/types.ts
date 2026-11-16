export type BrowserFamily = "chromium" | "safari" | "firefox" | "other";

export type PressureState =
  | "nominal"
  | "fair"
  | "serious"
  | "critical"
  | "unsupported"
  | "unknown";

export type StorageReport = {
  supported: boolean;
  quota: number | null;
  usage: number | null;
  cacheBytes: number;
  cacheEntries: number;
  databases: string[];
  localStorageBytes: number;
  sessionStorageBytes: number;
  serviceWorkers: number;
};

export type MachineReport = {
  capturedAt: number;
  browser: {
    family: BrowserFamily;
    name: string;
    platformLabel: string;
    mac: boolean;
  };
  cpu: {
    threads: number;
    benchmarkOps: number | null;
    benchmarkMs: number;
  };
  memory: {
    deviceMemoryGb: number | null;
    deviceMemoryCapped: boolean;
    heapUsed: number | null;
    heapTotal: number | null;
    heapLimit: number | null;
  };
  storage: StorageReport;
  display: {
    width: number;
    height: number;
    dpr: number;
  };
  gpu: string | null;
  gpuFull: string | null;
  network: {
    effectiveType: string | null;
    saveData: boolean;
    downlink: number | null;
  };
  longTasks: { count: number; ms: number };
};

export type FindingTone = "waste" | "watch" | "clear";

export type Finding = {
  id: string;
  area: "cpu" | "memory" | "storage" | "session";
  tone: FindingTone;
  title: string;
  detail: string;
  evidence: string;
  action?: "clear-caches" | "contention";
};

export type ContentionResult = {
  ratio: number;
  workers: number;
  single: number;
  many: number;
};
