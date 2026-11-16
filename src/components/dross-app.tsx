import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveTrace } from "@/components/live-trace";
import { MassMap } from "@/components/mass-map";
import { buildFindings, buildVerdict } from "@/lib/interpret";
import { formatBytes, formatCount } from "@/lib/format";
import { useTracked } from "@/lib/pins";
import { measureContention, probeStorage, sweep } from "@/lib/probe";
import type { ContentionResult, MachineReport, PressureState } from "@/lib/types";
import { cn } from "@/lib/cn";

type PressureCtor = new (
  callback: (records: { state?: string }[]) => void,
) => {
  disconnect: () => void;
  observe: (source: string, options?: { sampleInterval: number }) => void | Promise<void>;
};

const TONE_LABEL = { waste: "Waste", watch: "Watch", clear: "Clear" } as const;

function isPressure(value: string | undefined): value is PressureState {
  return value === "nominal" || value === "fair" || value === "serious" || value === "critical";
}

function meterWidth(fraction: number): string {
  if (!Number.isFinite(fraction) || fraction <= 0) return "0%";
  return `${Math.min(100, Math.max(2, fraction * 100))}%`;
}

export function DrossApp() {
  const { ids, toggle } = useTracked();
  const [runId, setRunId] = useState(0);
  const [status, setStatus] = useState<"idle" | "scanning" | "ready" | "error">("idle");
  const [stage, setStage] = useState("Nameplate");
  const [report, setReport] = useState<MachineReport | null>(null);
  const [error, setError] = useState("");
  const [pressure, setPressure] = useState<PressureState>("unknown");
  const [samples, setSamples] = useState<{ frame: number }[]>([]);
  const [liveHeap, setLiveHeap] = useState<number | null>(null);
  const [contention, setContention] = useState<ContentionResult | null>(null);
  const [busy, setBusy] = useState<"caches" | "contention" | null>(null);

  useEffect(() => {
    let live = true;
    setStatus("scanning");
    setError("");
    sweep((label) => {
      if (live) setStage(label);
    })
      .then((next) => {
        if (!live) return;
        setReport(next);
        setStatus("ready");
      })
      .catch((reason: unknown) => {
        if (!live) return;
        setError(reason instanceof Error ? reason.message : "The sweep failed.");
        setStatus("error");
      });
    return () => {
      live = false;
    };
  }, [runId]);

  useEffect(() => {
    const Ctor = (window as unknown as { PressureObserver?: PressureCtor }).PressureObserver;
    if (!Ctor) {
      setPressure("unsupported");
      return;
    }
    let observer: InstanceType<PressureCtor> | null = null;
    try {
      observer = new Ctor((records) => {
        const state = records[records.length - 1]?.state;
        if (isPressure(state)) setPressure(state);
      });
      Promise.resolve(observer.observe("cpu", { sampleInterval: 1000 })).catch(() => {
        try {
          void observer?.observe("cpu");
        } catch {
          setPressure("unsupported");
        }
      });
    } catch {
      setPressure("unsupported");
    }
    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    let frames: number[] = [];
    let last = performance.now();
    let acc = 0;
    let raf = 0;
    let alive = true;
    const loop = (now: number) => {
      if (!alive) return;
      const dt = now - last;
      last = now;
      if (dt > 0 && dt < 1000) frames.push(dt);
      acc += dt;
      if (acc >= 1000) {
        const sorted = [...frames].sort((a, b) => a - b);
        const index = Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95));
        const p95 = sorted[index] ?? 0;
        setSamples((prev) => [...prev, { frame: Math.round(p95 * 10) / 10 }].slice(-60));
        const heap = (performance as Performance & { memory?: { usedJSHeapSize: number } }).memory;
        if (heap) setLiveHeap(heap.usedJSHeapSize);
        frames = [];
        acc = 0;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  const findings = report ? buildFindings(report, pressure, contention) : [];
  const verdict = report
    ? buildVerdict(report, findings, pressure)
    : status === "error"
      ? "The sweep could not finish."
      : "Sweeping what this browser is allowed to see. Not Activity Monitor, and not your disk.";

  const heap = liveHeap ?? report?.memory.heapUsed ?? null;
  const heapLimit = report?.memory.heapLimit ?? null;
  const quota = report?.storage.quota ?? null;
  const usage = report?.storage.usage ?? null;
  const pressureHot = pressure === "serious" || pressure === "critical";
  const pressureFraction =
    pressure === "nominal" ? 0.18 : pressure === "fair" ? 0.46 : pressure === "serious" ? 0.74 : pressure === "critical" ? 1 : 0;

  async function onClearCaches() {
    setBusy("caches");
    try {
      if ("caches" in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      }
      const storage = await probeStorage();
      setReport((prev) => (prev ? { ...prev, storage } : prev));
    } finally {
      setBusy(null);
    }
  }

  async function onContention() {
    if (!report) return;
    setBusy("contention");
    try {
      const result = await measureContention(report.cpu.threads);
      if (result.single <= 0 || result.many <= 0) {
        setError("The core check could not run in this browser.");
        return;
      }
      setError("");
      setContention(result);
    } finally {
      setBusy(null);
    }
  }

  const plate: { label: string; value: string; note: string }[] = [
    {
      label: "Processor",
      value: report ? `${report.cpu.threads} threads` : "—",
      note: report?.cpu.benchmarkOps
        ? `${formatCount(report.cpu.benchmarkOps)} steps / ${report.cpu.benchmarkMs} ms`
        : status === "scanning"
          ? "Timing a short sweep"
          : "Threads the browser will admit",
    },
    {
      label: "Memory",
      value: report?.memory.deviceMemoryGb
        ? `${report.memory.deviceMemoryGb} GB${report.memory.deviceMemoryCapped ? "+" : ""}`
        : heap != null
          ? formatBytes(heap)
          : "Hidden",
      note: heap != null ? `${formatBytes(heap)} in this tab` : "No heap counter in this browser",
    },
    {
      label: "Storage ceiling",
      value: quota != null ? formatBytes(quota) : "—",
      note: usage != null ? `${formatBytes(usage)} used by this site` : "Quota not shared",
    },
    {
      label: "Display",
      value: report ? `${report.display.width}×${report.display.height}` : "—",
      note: report ? `${report.display.dpr}× pixel ratio` : "Screen",
    },
    {
      label: "Graphics",
      value: report?.gpu ?? (status === "ready" ? "Hidden" : "—"),
      note: report?.browser.name ?? "Renderer",
    },
    {
      label: "Machine",
      value: report?.browser.platformLabel ?? "—",
      note: report ? report.browser.name : "Waiting for the nameplate",
    },
  ];

  const raw: { label: string; value: string }[] = report
    ? [
        { label: "Browser", value: report.browser.name },
        { label: "Platform", value: report.browser.platformLabel },
        { label: "Threads", value: String(report.cpu.threads) },
        { label: "Pressure", value: pressure },
        { label: "Heap", value: formatBytes(heap) },
        { label: "Heap limit", value: formatBytes(heapLimit) },
        { label: "Device memory", value: report.memory.deviceMemoryGb ? `${report.memory.deviceMemoryGb} GB` : "—" },
        { label: "Quota", value: formatBytes(quota) },
        { label: "Origin usage", value: formatBytes(usage) },
        { label: "Cache entries", value: String(report.storage.cacheEntries) },
        { label: "Databases", value: report.storage.databases.join(", ") || "—" },
        { label: "localStorage", value: formatBytes(report.storage.localStorageBytes) },
        { label: "Service workers", value: String(report.storage.serviceWorkers) },
        { label: "Long tasks", value: `${report.longTasks.count} / ${Math.round(report.longTasks.ms)} ms` },
        { label: "Network", value: report.network.effectiveType ?? "—" },
        { label: "Graphics", value: report.gpuFull ?? "—" },
      ]
    : [];

  return (
    <main className="mx-auto w-full max-w-6xl overflow-x-clip px-4 py-8 md:px-8 md:py-12">
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-4xl font-medium tracking-tight md:text-5xl">Dross</h1>
          <p className="mt-3 max-w-xl text-pretty text-muted">
            Memory, storage, and processor slack — measured where a webpage is allowed to look, and mapped where a Mac usually hides the rest.
          </p>
        </div>
        <Button
          type="button"
          className="shrink-0"
          disabled={status === "scanning" || busy !== null}
          onClick={() => setRunId((value) => value + 1)}
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          {status === "scanning" ? "Sweeping" : "Sweep again"}
        </Button>
      </header>

      <p className="mt-8 max-w-3xl font-display text-2xl leading-snug text-balance md:text-3xl" aria-live="polite">
        {verdict}
      </p>
      {status === "scanning" ? (
        <p className="mt-3 text-sm text-muted">Reading {stage.toLowerCase()}.</p>
      ) : null}
      {error ? <p className="mt-3 text-sm text-mark">{error}</p> : null}

      <div className={cn("mt-8 grid gap-5 md:grid-cols-3", status === "scanning" && "sweep-line")}>
        <Meter
          label="Processor"
          value={pressure === "unknown" ? "…" : pressure}
          fraction={pressureFraction}
          hot={pressureHot}
        />
        <Meter
          label="This tab’s heap"
          value={heap != null ? formatBytes(heap) : "Hidden"}
          fraction={heap != null && heapLimit ? heap / heapLimit : 0}
          hot={!!heap && !!heapLimit && heap / heapLimit > 0.7}
        />
        <Meter
          label="Site storage, against the ceiling"
          value={usage != null && quota != null ? `${formatBytes(usage)} / ${formatBytes(quota)}` : "—"}
          fraction={usage != null && quota ? usage / quota : 0}
          hot={!!quota && quota < 2 * 1024 ** 3 && report?.browser.family === "chromium"}
        />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-3">
        {plate.map((cell) => (
          <div key={cell.label} className="min-w-0 bg-bg p-4" title={cell.note}>
            <p className="text-sm text-muted">{cell.label}</p>
            <p className="mt-2 truncate font-display text-2xl leading-tight tabular-nums">{cell.value}</p>
            <p className="mt-1 truncate text-sm text-muted">{cell.note}</p>
          </div>
        ))}
      </div>

      <section className="mt-14" aria-labelledby="findings-title">
        <h2 id="findings-title" className="font-display text-2xl font-medium tracking-tight">
          What the readings mean
        </h2>
        {findings.length === 0 ? (
          <p className="mt-4 text-pretty text-muted">
            Findings appear when the sweep finishes. They interpret the readings. They are not a scan of the disk.
          </p>
        ) : (
          <ul className="mt-2 border-t border-line">
            {findings.map((finding) => (
              <li key={finding.id} className="border-b border-line py-4">
                <div className="flex gap-3">
                  <span
                    className={cn(
                      "mt-2 size-2 shrink-0 rounded-full",
                      finding.tone === "waste" && "bg-mark",
                      finding.tone === "watch" && "bg-muted",
                      finding.tone === "clear" && "border border-line bg-transparent",
                    )}
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <h3 className="font-medium">
                        <span className="sr-only">{TONE_LABEL[finding.tone]}. </span>
                        {finding.title}
                      </h3>
                      <p className="shrink-0 text-sm text-muted tabular-nums sm:text-right">{finding.evidence}</p>
                    </div>
                    <p className="mt-1 max-w-3xl text-sm text-pretty text-muted">{finding.detail}</p>
                    {finding.action === "clear-caches" ? (
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-3 rounded-lg"
                        disabled={busy !== null}
                        onClick={onClearCaches}
                      >
                        {busy === "caches" ? "Clearing" : "Clear site caches"}
                      </Button>
                    ) : null}
                    {finding.action === "contention" ? (
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-3 rounded-lg"
                        disabled={busy !== null || status !== "ready"}
                        onClick={onContention}
                      >
                        {busy === "contention" ? "Listening to the cores" : "See if the cores are crowded"}
                      </Button>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-14" aria-labelledby="trace-title">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="trace-title" className="font-display text-2xl font-medium tracking-tight">
            Frame time
          </h2>
          <p className="text-sm text-muted tabular-nums">
            {samples.length ? `${samples[samples.length - 1].frame} ms` : "—"}
          </p>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-pretty text-muted">
          The slowest frames in each second. Above the mark, this tab is missing the display refresh.
        </p>
        <LiveTrace samples={samples} />
      </section>

      <MassMap tracked={ids} onToggle={toggle} />

      {raw.length > 0 ? (
        <section className="mt-14" aria-labelledby="raw-title">
          <h2 id="raw-title" className="font-display text-2xl font-medium tracking-tight">
            Raw reading
          </h2>
          <dl className="mt-4 grid gap-x-8 sm:grid-cols-2">
            {raw.map((row) => (
              <div key={row.label} className="flex min-w-0 justify-between gap-4 border-b border-line py-2">
                <dt className="text-sm text-muted">{row.label}</dt>
                <dd className="min-w-0 text-right text-sm break-words tabular-nums">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <p className="mt-14 max-w-2xl text-sm text-pretty text-muted">
        Dross reads threads, an optional memory class, the heap of this tab, the browser’s storage ceiling, and CPU pressure where the browser shares it. It cannot list your processes or open your home folder. That limit is deliberate.
      </p>
    </main>
  );
}

function Meter({
  label,
  value,
  fraction,
  hot,
}: {
  label: string;
  value: string;
  fraction: number;
  hot: boolean;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm text-muted">{label}</p>
        <p className="truncate text-sm tabular-nums">{value}</p>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface">
        <div className={cn("h-full", hot ? "bg-mark" : "bg-fg")} style={{ width: meterWidth(fraction) }} />
      </div>
    </div>
  );
}
