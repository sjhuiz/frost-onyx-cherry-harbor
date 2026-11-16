import { useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { ATLAS, areaLabel, type AtlasArea, type AtlasItem } from "@/lib/atlas";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Filter = "all" | AtlasArea | "tracked";

const SIZE: Record<AtlasItem["size"], string> = {
  lg: "col-span-2 min-h-44 lg:row-span-2 lg:min-h-52",
  wide: "col-span-2 min-h-32",
  cell: "col-span-1 min-h-32",
};

export function MassMap({
  tracked,
  onToggle,
}: {
  tracked: string[];
  onToggle: (id: string) => void;
}) {
  const [filter, setFilter] = useState<Filter>("storage");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("snapshots");
  const [copied, setCopied] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ATLAS.filter((item) => {
      if (filter === "tracked" && !tracked.includes(item.id)) return false;
      if (filter !== "all" && filter !== "tracked" && item.area !== filter) return false;
      if (!q) return true;
      return `${item.title} ${item.where} ${item.why} ${item.path ?? ""}`.toLowerCase().includes(q);
    });
  }, [filter, query, tracked]);

  const selected = items.find((item) => item.id === selectedId) ?? items[0] ?? null;

  function choose(id: string) {
    setSelectedId(id);
    setCopied(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
    }, 30);
  }

  async function copyPath(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  const chips: { id: Filter; label: string }[] = [
    { id: "storage", label: "Storage" },
    { id: "memory", label: "Memory" },
    { id: "cpu", label: "Processor" },
    { id: "all", label: "All" },
    { id: "tracked", label: tracked.length ? `Tracked ${tracked.length}` : "Tracked" },
  ];

  return (
    <section className="mt-14" aria-labelledby="map-title">
      <h2 id="map-title" className="font-display text-2xl font-medium tracking-tight md:text-3xl">
        Where the weight usually sits
      </h2>
      <p className="mt-3 max-w-2xl text-pretty text-muted">
        A page cannot open your disk. These are the places that actually get heavy on a Mac, sized by how often they are the culprit — not by a measurement of your machine.
      </p>

      <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative min-w-0 lg:max-w-sm lg:flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <label className="sr-only" htmlFor="map-search">
            Search the map
          </label>
          <Input
            id="map-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search places"
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter the map">
          {chips.map((chip) => {
            const on = filter === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(chip.id)}
                className={cn(
                  "h-11 rounded-full px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg",
                  on ? "bg-fg text-bg" : "border border-line text-fg",
                )}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {items.length === 0 ? (
        <p className="mt-6 text-muted">Nothing in the map matches that.</p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {items.map((item) => {
            const on = selected?.id === item.id;
            const pinned = tracked.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={on}
                onClick={() => choose(item.id)}
                className={cn(
                  "relative flex h-full flex-col rounded-xl border p-4 text-left transition-colors duration-150",
                  SIZE[item.size],
                  on ? "border-fg bg-surface" : "border-line hover:border-muted",
                )}
              >
                {pinned ? <span className="absolute top-4 right-4 size-2 rounded-full bg-mark" aria-label="Tracked" /> : null}
                <span className="text-sm text-muted">{areaLabel(item.area)}</span>
                <span className="mt-2 font-display text-lg leading-tight">{item.title}</span>
                <span className="mt-2 text-sm text-muted">{item.weight}</span>
                {item.size === "lg" ? (
                  <span className="mt-3 line-clamp-3 text-sm text-pretty text-muted">{item.why}</span>
                ) : null}
              </button>
            );
          })}
        </div>
      )}

      {selected ? (
        <div ref={detailRef} className="mt-3 rounded-3xl bg-surface p-4 md:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm text-muted">{areaLabel(selected.area)}</p>
              <h3 className="mt-1 font-display text-2xl leading-tight">{selected.title}</h3>
            </div>
            <Button
              type="button"
              variant="outline"
              className="shrink-0 rounded-lg"
              onClick={() => onToggle(selected.id)}
            >
              {tracked.includes(selected.id) ? "Remove from list" : "Track this place"}
            </Button>
          </div>
          <dl className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="min-w-0">
              <dt className="text-sm text-muted">Where to look</dt>
              <dd className="mt-1 text-pretty">{selected.where}</dd>
              {selected.path ? (
                <dd className="mt-2 break-words text-sm text-muted">{selected.path}</dd>
              ) : null}
            </div>
            <div className="min-w-0">
              <dt className="text-sm text-muted">Why it grows</dt>
              <dd className="mt-1 text-pretty">{selected.why}</dd>
            </div>
            <div className="min-w-0">
              <dt className="text-sm text-muted">How to reclaim</dt>
              <dd className="mt-1 text-pretty">{selected.reclaim}</dd>
            </div>
          </dl>
          {selected.path ? (
            <Button
              type="button"
              variant="ghost"
              className="mt-4 rounded-lg px-0"
              onClick={() => copyPath(selected.path!)}
            >
              {copied ? "Copied" : "Copy path"}
            </Button>
          ) : null}
        </div>
      ) : null}

      {tracked.length > 0 ? (
        <ol className="mt-6 divide-y divide-line border-y border-line">
          {ATLAS.filter((item) => tracked.includes(item.id)).map((item, index) => (
            <li key={item.id} className="grid gap-1 py-4 sm:grid-cols-[2rem_1fr]">
              <span className="text-sm text-muted tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              <div className="min-w-0">
                <p className="font-medium">{item.title}</p>
                <p className="mt-1 text-sm text-pretty text-muted">{item.reclaim}</p>
              </div>
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
