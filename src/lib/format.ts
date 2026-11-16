export function formatBytes(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return "—";
  const sign = n < 0 ? -1 : 1;
  let value = Math.abs(n);
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i += 1;
  }
  const digits = i === 0 ? 0 : value >= 100 ? 0 : value >= 10 ? 1 : 2;
  const body = value.toFixed(digits);
  return `${sign < 0 ? "-" : ""}${body} ${units[i]}`;
}

export function formatCount(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `${Math.round(n / 1_000)}k`;
  return Math.round(n).toLocaleString("en-US");
}

export function tidyGpu(renderer: string | null | undefined): string {
  if (!renderer) return "";
  const metal = renderer.match(/Metal Renderer:\s*([^,)]+)/i);
  if (metal?.[1]) return metal[1].trim();
  const angle = renderer.match(/ANGLE \((?:[^,]+),\s*([^,)]+)/i);
  const name = (angle?.[1] ?? renderer).trim();
  return name.length > 48 ? `${name.slice(0, 46)}…` : name;
}
