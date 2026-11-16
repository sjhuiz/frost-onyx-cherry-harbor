import { formatBytes, formatCount } from "@/lib/format";
import type { ContentionResult, Finding, MachineReport, PressureState } from "@/lib/types";

const GB = 1024 ** 3;

export function buildFindings(
  report: MachineReport,
  pressure: PressureState,
  contention: ContentionResult | null,
): Finding[] {
  const findings: Finding[] = [];
  const threads = `${report.cpu.threads} threads`;

  if (pressure === "serious" || pressure === "critical") {
    findings.push({
      id: "pressure",
      area: "cpu",
      tone: "waste",
      title: pressure === "critical" ? "The processor is saturated" : "The processor is under pressure",
      detail:
        "This signal is system-wide, not a reading of this tab. Something else is using the cores, or the machine is thermally limited.",
      evidence: pressure,
      action: "contention",
    });
  } else if (pressure === "fair") {
    findings.push({
      id: "pressure",
      area: "cpu",
      tone: "watch",
      title: "The processor is mildly busy",
      detail: "Not an emergency. If the fans are up, the processor side of the map is the next place to look.",
      evidence: "fair pressure",
      action: "contention",
    });
  } else if (pressure === "nominal") {
    findings.push({
      id: "pressure",
      area: "cpu",
      tone: "clear",
      title: "Processor pressure is nominal",
      detail: report.cpu.benchmarkOps
        ? `A short single-thread sweep managed ${formatCount(report.cpu.benchmarkOps)} steps in ${report.cpu.benchmarkMs} ms, and the browser says the cores are not stressed.`
        : "The browser reports the CPU is not under pressure.",
      evidence: report.cpu.benchmarkOps ? `${formatCount(report.cpu.benchmarkOps)} steps` : threads,
      action: "contention",
    });
  } else if (pressure === "unsupported") {
    findings.push({
      id: "pressure",
      area: "cpu",
      tone: "watch",
      title: "This browser hides CPU pressure",
      detail:
        "Safari and Firefox do not share the Compute Pressure signal. Thread count, and a short core check, are what this page can do instead.",
      evidence: threads,
      action: "contention",
    });
  } else {
    findings.push({
      id: "pressure",
      area: "cpu",
      tone: "watch",
      title: "Waiting on a pressure sample",
      detail: "The browser has not answered yet. Thread count is already known.",
      evidence: threads,
      action: "contention",
    });
  }

  if (contention && contention.ratio < 0.45) {
    findings.push({
      id: "contention",
      area: "cpu",
      tone: "waste",
      title: "Extra cores barely helped",
      detail:
        "A one-second burst across the threads did not scale. The machine was already busy, or it throttled as soon as the work started.",
      evidence: `${Math.round(contention.ratio * 100)}% of ideal scaling`,
    });
  } else if (contention && contention.ratio < 0.75) {
    findings.push({
      id: "contention",
      area: "cpu",
      tone: "watch",
      title: "Cores scaled only partway",
      detail: "Some capacity was free, but not all of it. Something else is sharing the processor.",
      evidence: `${Math.round(contention.ratio * 100)}% of ideal scaling`,
    });
  } else if (contention) {
    findings.push({
      id: "contention",
      area: "cpu",
      tone: "clear",
      title: "The cores were free for that burst",
      detail: "Work spread across threads almost linearly. A slow Mac right now is probably not a saturated CPU.",
      evidence: `${Math.round(contention.ratio * 100)}% of ideal scaling`,
    });
  }

  const quota = report.storage.quota;
  const usage = report.storage.usage ?? 0;
  if (!report.storage.supported || quota == null) {
    findings.push({
      id: "ceiling",
      area: "storage",
      tone: "watch",
      title: "No storage estimate from this browser",
      detail: "A page cannot see free disk space, and this browser also declined to share a site quota.",
      evidence: "unavailable",
    });
  } else if (report.browser.family === "safari") {
    findings.push({
      id: "ceiling",
      area: "storage",
      tone: "clear",
      title: "Safari’s allotment is not your disk",
      detail:
        "Safari usually grants a site about a gigabyte until you approve more. A small number here does not mean the Mac is full.",
      evidence: `${formatBytes(quota)} ceiling · ${formatBytes(usage)} used here`,
    });
  } else if (report.browser.family === "chromium" && quota < 2 * GB) {
    findings.push({
      id: "ceiling",
      area: "storage",
      tone: "waste",
      title: "The storage ceiling is tight",
      detail:
        "Chromium shrinks what a site may store when the disk is low. Under 2 GB is a strong hint the volume is crowded. This page is not those files.",
      evidence: `${formatBytes(quota)} ceiling · ${formatBytes(usage)} used here`,
    });
  } else if (report.browser.family === "chromium" && quota >= 40 * GB) {
    findings.push({
      id: "ceiling",
      area: "storage",
      tone: "clear",
      title: "The storage ceiling is wide",
      detail:
        "Chromium only offers a ceiling this large when the volume still has room. It is a hint, not a folder scan. Weight you can feel still lives in the map.",
      evidence: `${formatBytes(quota)} ceiling · ${formatBytes(usage)} used here`,
    });
  } else {
    findings.push({
      id: "ceiling",
      area: "storage",
      tone: "watch",
      title: "The storage ceiling is only a hint",
      detail: "The browser published a quota, not a map of the disk. The places that actually fill a Mac are below.",
      evidence: `${formatBytes(quota)} ceiling · ${formatBytes(usage)} used here`,
    });
  }

  if (report.storage.cacheBytes > 5 * 1024 * 1024 || report.storage.cacheEntries > 40) {
    findings.push({
      id: "caches",
      area: "storage",
      tone: "waste",
      title: "This site is holding cache",
      detail: "Cache Storage for this origin can be deleted. It will not touch Mail, Xcode, or the rest of the disk.",
      evidence: formatBytes(report.storage.cacheBytes),
      action: "clear-caches",
    });
  } else if (report.storage.cacheBytes > 0 || report.storage.cacheEntries > 0) {
    findings.push({
      id: "caches",
      area: "storage",
      tone: "watch",
      title: "A little cache is stored here",
      detail: "Small, and limited to this site. Clearing it is safe and will not free space you can feel.",
      evidence: formatBytes(report.storage.cacheBytes) ,
      action: "clear-caches",
    });
  } else {
    findings.push({
      id: "caches",
      area: "storage",
      tone: "clear",
      title: "No site cache to reclaim",
      detail: "This origin is not holding Cache Storage. Disk waste, if you have it, is outside the page.",
      evidence: "0 B",
    });
  }

  if (report.storage.localStorageBytes > 200_000) {
    findings.push({
      id: "local",
      area: "storage",
      tone: "watch",
      title: "This origin has a large local store",
      detail: "localStorage here is bigger than a reclaim list should be. It is still this site only, not the disk.",
      evidence: formatBytes(report.storage.localStorageBytes),
    });
  }

  const { heapUsed, heapLimit, deviceMemoryGb, deviceMemoryCapped } = report.memory;
  if (heapUsed != null && heapLimit != null && heapLimit > 0 && heapUsed / heapLimit > 0.7) {
    findings.push({
      id: "heap",
      area: "memory",
      tone: "waste",
      title: "This tab’s heap is near its limit",
      detail:
        "The JavaScript heap in this tab is tight. That slows the page. It is not the Mac’s overall memory — other apps are still invisible.",
      evidence: `${formatBytes(heapUsed)} of ${formatBytes(heapLimit)}`,
    });
  } else if (heapUsed != null) {
    findings.push({
      id: "heap",
      area: "memory",
      tone: "clear",
      title: "This tab’s heap is light",
      detail: deviceMemoryGb
        ? `Device memory reads as ${deviceMemoryGb} GB${deviceMemoryCapped ? " or more. The browser stops counting at 8, so a 16–64 GB Mac looks the same." : ". Other apps can still be what fills RAM."}`
        : "Heap size is only this tab. Activity Monitor is the picture of everything else.",
      evidence: formatBytes(heapUsed),
    });
  } else if (deviceMemoryGb) {
    findings.push({
      id: "heap",
      area: "memory",
      tone: deviceMemoryGb <= 4 ? "watch" : "clear",
      title: deviceMemoryGb <= 4 ? "Memory class is modest" : "Memory class is ample",
      detail: deviceMemoryCapped
        ? "The browser caps the figure it shares at 8 GB. Watch Activity Monitor’s memory-pressure graph, not this number."
        : "This is the class of memory the browser will admit, not a live reading of what is free.",
      evidence: `${deviceMemoryGb} GB class`,
    });
  } else {
    findings.push({
      id: "heap",
      area: "memory",
      tone: "watch",
      title: "Memory figures are hidden",
      detail:
        "This browser does not publish heap size or device memory. The real picture is Activity Monitor → Memory, graph at the bottom.",
      evidence: "not shared",
    });
  }

  if (report.longTasks.count >= 3 || report.longTasks.ms > 150) {
    findings.push({
      id: "jank",
      area: "session",
      tone: "watch",
      title: "The main thread stuttered while idle",
      detail:
        "After the sweep, the page still saw long tasks. Another tab, an extension, or the browser itself is stealing frames.",
      evidence: `${report.longTasks.count} tasks · ${Math.round(report.longTasks.ms)} ms`,
    });
  }

  if (!report.browser.mac) {
    findings.push({
      id: "platform",
      area: "session",
      tone: "watch",
      title: `Opened on ${report.browser.platformLabel}`,
      detail:
        "The measurements above are this device. The map underneath is written for macOS, which is where those files and processes live.",
      evidence: report.browser.name,
    });
  }

  const order = { waste: 0, watch: 1, clear: 2 };
  return findings.sort((a, b) => order[a.tone] - order[b.tone]);
}

export function buildVerdict(
  report: MachineReport,
  findings: Finding[],
  pressure: PressureState,
): string {
  if (pressure === "critical" || pressure === "serious") {
    return "The processor is busy outside this page. The tab you are looking at is not the load.";
  }
  const waste = findings.filter((finding) => finding.tone === "waste");
  if (waste.some((finding) => finding.id === "ceiling")) {
    return "The browser is offering almost no storage room. That usually means the disk is what is full.";
  }
  if (waste.some((finding) => finding.id === "contention")) {
    return "The cores did not scale. Something else is already using them, or the machine throttled.";
  }
  if (waste.length > 0) return `${waste[0].title}.`;
  if (!report.browser.mac) {
    return "Nothing measurable here is bloated. This device is not a Mac — the map below is still the macOS field guide.";
  }
  return "Nothing this page can see is wasted. If the Mac feels heavy, the weight is in the places below. A website is not allowed to open them.";
}
