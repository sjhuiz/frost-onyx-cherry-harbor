import { G as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ResponsiveContainer, i as ReferenceLine, n as YAxis, r as Line, t as LineChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/frame-chart-Cl-fbDQT.js
var import_jsx_runtime = require_jsx_runtime();
function FrameChart({ samples }) {
	const peak = samples.reduce((max, sample) => Math.max(max, sample.frame), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
			data: samples,
			margin: {
				top: 8,
				right: 4,
				bottom: 4,
				left: 4
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					hide: true,
					domain: [0, Math.max(32, Math.ceil(peak))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
					y: 16.7,
					stroke: "var(--color-mark)",
					strokeDasharray: "2 4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
					type: "monotone",
					dataKey: "frame",
					stroke: "var(--color-fg)",
					strokeWidth: 1.5,
					dot: false,
					isAnimationActive: false
				})
			]
		})
	});
}
//#endregion
export { FrameChart };
