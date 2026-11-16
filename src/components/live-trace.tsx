import { useEffect, useState } from "react";
import type { ComponentType } from "react";

export function LiveTrace({ samples }: { samples: { frame: number }[] }) {
  const [Chart, setChart] = useState<ComponentType<{ samples: { frame: number }[] }> | null>(null);

  useEffect(() => {
    let live = true;
    import("./frame-chart")
      .then((mod) => {
        if (live) setChart(() => mod.FrameChart);
      })
      .catch(() => {
        if (live) setChart(null);
      });
    return () => {
      live = false;
    };
  }, []);

  return (
    <div className="mt-3">
      <div className="h-36 w-full min-w-0">
        {Chart && samples.length > 1 ? (
          <Chart samples={samples} />
        ) : (
          <div className="flex h-full items-end border-b border-line">
            <p className="pb-3 text-sm text-muted">Collecting frame times.</p>
          </div>
        )}
      </div>
      <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
        <span>Line is frame time</span>
        <span className="text-mark">Mark is one frame, 16.7 ms</span>
      </p>
    </div>
  );
}
