import { Line, LineChart, ReferenceLine, ResponsiveContainer, YAxis } from "recharts";

export function FrameChart({ samples }: { samples: { frame: number }[] }) {
  const peak = samples.reduce((max, sample) => Math.max(max, sample.frame), 0);
  const yMax = Math.max(32, Math.ceil(peak));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={samples} margin={{ top: 8, right: 4, bottom: 4, left: 4 }}>
        <YAxis hide domain={[0, yMax]} />
        <ReferenceLine y={16.7} stroke="var(--color-mark)" strokeDasharray="2 4" />
        <Line
          type="monotone"
          dataKey="frame"
          stroke="var(--color-fg)"
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
