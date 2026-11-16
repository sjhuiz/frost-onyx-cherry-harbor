import { i as __toESM, n as __exportAll } from "../_runtime.mjs";
import { G as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as Search, r as RefreshCw } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CMOlWFez.js
var routes_CMOlWFez_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 text-sm font-medium transition-[color,background-color,opacity,transform] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-40", {
	variants: { variant: {
		default: "bg-fg text-bg",
		outline: "border border-line bg-transparent text-fg",
		ghost: "bg-transparent text-fg"
	} },
	defaultVariants: { variant: "default" }
});
function Button({ className, variant, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({ variant }), className),
		...props
	});
}
function LiveTrace({ samples }) {
	const [Chart, setChart] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let live = true;
		import("./frame-chart-Cl-fbDQT.mjs").then((mod) => {
			if (live) setChart(() => mod.FrameChart);
		}).catch(() => {
			if (live) setChart(null);
		});
		return () => {
			live = false;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-36 w-full min-w-0",
			children: Chart && samples.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chart, { samples }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-full items-end border-b border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pb-3 text-sm text-muted",
					children: "Collecting frame times."
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Line is frame time" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-mark",
				children: "Mark is one frame, 16.7 ms"
			})]
		})]
	});
}
var ATLAS = [
	{
		id: "snapshots",
		area: "storage",
		size: "lg",
		title: "Local Time Machine snapshots",
		weight: "Often 10–100 GB",
		where: "System Settings → General → Storage, inside System Data",
		why: "macOS keeps local snapshots on the startup disk until a backup finishes or space runs out. They do not appear as a normal folder, so About This Mac looks mysteriously full.",
		reclaim: "Leave the Mac plugged in and let Time Machine finish. A restart often lets macOS thin old snapshots on its own. Do not delete system folders by hand."
	},
	{
		id: "backups",
		area: "storage",
		size: "wide",
		title: "iPhone and iPad backups",
		weight: "Often 15–80 GB",
		where: "Finder → the device in the sidebar → Manage Backups",
		path: "~/Library/Application Support/MobileSync/Backup",
		why: "Every encrypted device backup is a near-copy of that phone. Old phones you no longer own still leave theirs behind.",
		reclaim: "Delete backups for devices you do not use. Keep one current backup if it is your only copy."
	},
	{
		id: "docker",
		area: "storage",
		size: "wide",
		title: "Docker disk image",
		weight: "Often 20–60 GB",
		where: "Docker Desktop → Settings → Resources",
		path: "~/Library/Containers/com.docker.docker",
		why: "Images, stopped containers, and build cache live in one growing virtual disk. Quitting Docker does not shrink it.",
		reclaim: "Use Docker’s reclaim or prune unused images. Lower the disk image limit after it shrinks. Removing the app without that step leaves the file."
	},
	{
		id: "xcode",
		area: "storage",
		size: "wide",
		title: "Xcode leftovers",
		weight: "Often 10–50 GB",
		where: "Xcode → Settings → Locations, and Settings → Platforms",
		path: "~/Library/Developer",
		why: "DerivedData, old simulators, device-support folders, and archives accumulate per OS version. They are rebuildable.",
		reclaim: "Delete old simulator runtimes and device-support folders you do not build against. Clearing DerivedData is safe; the next build recreates it."
	},
	{
		id: "photos",
		area: "storage",
		size: "wide",
		title: "Photos originals",
		weight: "Often the largest single file",
		where: "Photos → Settings → iCloud",
		path: "~/Pictures/Photos Library.photoslibrary",
		why: "With Optimize Mac Storage off, the library keeps every original locally and in iCloud. The package is one file Finder will not explain.",
		reclaim: "Turn on Optimize Mac Storage if the originals can live in iCloud. Otherwise move the library to an external disk from Photos settings."
	},
	{
		id: "projects",
		area: "storage",
		size: "cell",
		title: "Old project folders",
		weight: "1–5 GB each",
		where: "Wherever you clone repos",
		why: "node_modules, virtualenvs, build outputs, and target folders are local caches pretending to be source.",
		reclaim: "Sort the parent folder by size in Finder. Delete checkouts you are not building. The next install restores dependencies."
	},
	{
		id: "appcaches",
		area: "storage",
		size: "cell",
		title: "Browser and app caches",
		weight: "1–10 GB an app",
		where: "Each app’s own settings, not a wipe of Library",
		path: "~/Library/Caches",
		why: "Chrome, Slack, Discord, Spotify, and Teams keep caches and service-worker files that survive quitting.",
		reclaim: "Clear cached files from inside the app. Wiping all of Library/Caches is ruder than it needs to be and can sign you out."
	},
	{
		id: "mail",
		area: "storage",
		size: "cell",
		title: "Mail downloads",
		weight: "Years of attachments",
		where: "Mail → Settings → Accounts",
		path: "~/Library/Mail",
		why: "Accounts set to download all attachments keep every file forever, including ones you already saved.",
		reclaim: "Set downloads to Recent. Mailbox → Erase Deleted Items. Removing ~/Library/Mail forces a full re-download, so prefer the in-app controls."
	},
	{
		id: "downloads",
		area: "storage",
		size: "cell",
		title: "Downloads and Trash",
		weight: "The obvious pile",
		where: "Dock → Trash, and your Downloads folder",
		path: "~/Downloads",
		why: "Installers, disk images, and exports sit here after the install. Trash still counts until you empty it.",
		reclaim: "Empty Trash. Sort Downloads by size and remove disk images you already used."
	},
	{
		id: "packages",
		area: "storage",
		size: "wide",
		title: "Package-manager caches",
		weight: "Usually 0.5–8 GB",
		where: "Homebrew, npm, pnpm, and Yarn caches",
		path: "~/Library/Caches/Homebrew",
		why: "Old bottles and tarballs are kept so reinstalls are fast. They are pure cache.",
		reclaim: "Homebrew, npm, and pnpm can clear their own caches from their docs. Also check ~/.npm and the pnpm store. They rebuild on demand."
	},
	{
		id: "browsers",
		area: "memory",
		size: "lg",
		title: "Browser helper processes",
		weight: "The usual RAM leak",
		where: "Activity Monitor → Memory, or the browser’s own task manager",
		why: "Each tab, extension, and site process holds its own heap. Chrome’s Window menu → Task Manager shows which one, which Activity Monitor will not.",
		reclaim: "Close the heavy tabs and extra windows. Quit the browser once so helpers actually exit. One profile you forgot is often still open."
	},
	{
		id: "electron",
		area: "memory",
		size: "wide",
		title: "Electron apps left open",
		weight: "0.5–2 GB each, idle",
		where: "Activity Monitor, sort by memory",
		why: "Slack, Teams, Discord, VS Code, Notion, Figma, and Spotify are each a browser. Closing the window often leaves them resident.",
		reclaim: "Quit the ones you are not using. Check the menu-bar icon, not just the Dock dot."
	},
	{
		id: "mempressure",
		area: "memory",
		size: "wide",
		title: "Memory pressure and swap",
		weight: "A symptom, not a file",
		where: "Activity Monitor → Memory, the graph at the bottom",
		why: "Yellow or red pressure means macOS is compressing and paging. The Mac feels hot and slow even when CPU looks ordinary. Swap Used is the scar.",
		reclaim: "Quit the largest processes until the graph goes green. Adding login items back one at a time tells you who caused it."
	},
	{
		id: "windowserver",
		area: "memory",
		size: "cell",
		title: "WindowServer",
		weight: "Grows with displays",
		where: "Activity Monitor, search WindowServer",
		why: "It composites every window. A leak or a wall of high-resolution windows shows up here, and you cannot quit it alone.",
		reclaim: "Log out and back in. That restarts WindowServer without a full restart. Then reopen fewer huge windows."
	},
	{
		id: "loginitems",
		area: "memory",
		size: "cell",
		title: "Login items",
		weight: "Quiet residents",
		where: "System Settings → General → Login Items & Extensions",
		why: "Updaters, menu bar utilities, and cloud sync stay in RAM from the moment you log in, whether or not you open the app.",
		reclaim: "Remove anything you do not need every day. Background items are listed in the same pane."
	},
	{
		id: "vms",
		area: "memory",
		size: "wide",
		title: "Virtual machines",
		weight: "A second computer",
		where: "Parallels, UTM, or VirtualBox",
		why: "A running or paused VM reserves a slice of RAM the host cannot use. Suspended is not free.",
		reclaim: "Shut the guest down fully when you are done. Lower its memory assignment if it is always on."
	},
	{
		id: "kerneltask",
		area: "cpu",
		size: "lg",
		title: "kernel_task means heat",
		weight: "Do not force-quit it",
		where: "Activity Monitor → CPU",
		why: "When kernel_task is high, macOS is usually throttling because the machine is hot. It is the brake, not the thing wasting cycles. Killing it is not possible and would not help.",
		reclaim: "Find the real load, or the reason it is hot: a blocked vent, a lap, a display, a runaway process. Let it cool. The percentage should fall on its own."
	},
	{
		id: "spotlight",
		area: "cpu",
		size: "wide",
		title: "Spotlight indexing",
		weight: "Hours after a big copy",
		where: "Activity Monitor: mds and mds_stores",
		why: "After an OS update, a migration, or a huge folder copy, indexing pins a core and the disk. That is normal until it finishes, and stuck if it never does.",
		reclaim: "If it has run for days, add the enormous folder under System Settings → Spotlight → Search Privacy, then remove it so indexing starts clean."
	},
	{
		id: "photosd",
		area: "cpu",
		size: "wide",
		title: "Photos analysis",
		weight: "Heavy once per import",
		where: "Activity Monitor: photoanalysisd, mediaanalysisd",
		why: "Face recognition and search run after imports and OS updates. They look like a stuck fan and then stop.",
		reclaim: "Plug in and leave it overnight. There is no useful off switch. Interrupting just resumes later."
	},
	{
		id: "backupd",
		area: "cpu",
		size: "cell",
		title: "Time Machine working",
		weight: "CPU plus disk",
		where: "System Settings → General → Time Machine",
		why: "backupd spikes while copying, especially to a slow disk or a drive that just woke up.",
		reclaim: "Let the backup finish, or pause Time Machine if you need the machine quiet right now."
	},
	{
		id: "icloud",
		area: "cpu",
		size: "cell",
		title: "iCloud sync",
		weight: "Desktop and Documents",
		where: "System Settings → Apple ID → iCloud",
		why: "cloudd and bird chew CPU when a large Desktop, Documents, or Photos library is reconciling. A “stuck” fan is often just the first sync.",
		reclaim: "Wait it out on power, or turn off Desktop & Documents sync if you did not mean to upload the whole home folder."
	},
	{
		id: "editors",
		area: "cpu",
		size: "wide",
		title: "Editors and language servers",
		weight: "Hidden node processes",
		where: "Activity Monitor: node, tsserver, rust-analyzer, eslint",
		why: "Closing a project window does not always stop its language server, file watcher, or Docker helper.",
		reclaim: "Quit the editor, or close the folder from its own menu. One forgotten window can hold a core all day."
	},
	{
		id: "displays",
		area: "cpu",
		size: "cell",
		title: "Extra displays",
		weight: "WindowServer CPU",
		where: "System Settings → Displays",
		why: "High refresh, a 5K display, and transparency make WindowServer expensive even when you are “doing nothing.”",
		reclaim: "Lower the refresh rate, unplug a display you are not using, and turn on Reduce Transparency under Accessibility → Display."
	},
	{
		id: "loudtab",
		area: "cpu",
		size: "cell",
		title: "One loud tab",
		weight: "Outruns the whole Mac",
		where: "Browser task manager, not Activity Monitor",
		why: "A canvas, a video ad, or a runaway extension sits in one helper and looks anonymous in Activity Monitor.",
		reclaim: "Open the browser’s task manager, sort by CPU, and close that site. Then remove the extension if it comes back."
	}
];
function areaLabel(area) {
	if (area === "storage") return "Storage";
	if (area === "memory") return "Memory";
	return "Processor";
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-xl border border-line bg-bg px-3 text-base text-fg placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg", className),
		...props
	});
}
var SIZE = {
	lg: "col-span-2 min-h-44 lg:row-span-2 lg:min-h-52",
	wide: "col-span-2 min-h-32",
	cell: "col-span-1 min-h-32"
};
function MassMap({ tracked, onToggle }) {
	const [filter, setFilter] = (0, import_react.useState)("storage");
	const [query, setQuery] = (0, import_react.useState)("");
	const [selectedId, setSelectedId] = (0, import_react.useState)("snapshots");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const detailRef = (0, import_react.useRef)(null);
	const items = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return ATLAS.filter((item) => {
			if (filter === "tracked" && !tracked.includes(item.id)) return false;
			if (filter !== "all" && filter !== "tracked" && item.area !== filter) return false;
			if (!q) return true;
			return `${item.title} ${item.where} ${item.why} ${item.path ?? ""}`.toLowerCase().includes(q);
		});
	}, [
		filter,
		query,
		tracked
	]);
	const selected = items.find((item) => item.id === selectedId) ?? items[0] ?? null;
	function choose(id) {
		setSelectedId(id);
		setCopied(false);
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		window.setTimeout(() => {
			detailRef.current?.scrollIntoView({
				behavior: reduce ? "auto" : "smooth",
				block: "nearest"
			});
		}, 30);
	}
	async function copyPath(value) {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1400);
		} catch {
			setCopied(false);
		}
	}
	const chips = [
		{
			id: "storage",
			label: "Storage"
		},
		{
			id: "memory",
			label: "Memory"
		},
		{
			id: "cpu",
			label: "Processor"
		},
		{
			id: "all",
			label: "All"
		},
		{
			id: "tracked",
			label: tracked.length ? `Tracked ${tracked.length}` : "Tracked"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-14",
		"aria-labelledby": "map-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "map-title",
				className: "font-display text-2xl font-medium tracking-tight md:text-3xl",
				children: "Where the weight usually sits"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-pretty text-muted",
				children: "A page cannot open your disk. These are the places that actually get heavy on a Mac, sized by how often they are the culprit — not by a measurement of your machine."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-col gap-3 lg:flex-row lg:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-0 lg:max-w-sm lg:flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "sr-only",
							htmlFor: "map-search",
							children: "Search the map"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "map-search",
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Search places",
							className: "pl-10"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					role: "group",
					"aria-label": "Filter the map",
					children: chips.map((chip) => {
						const on = filter === chip.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": on,
							onClick: () => setFilter(chip.id),
							className: cn("h-11 rounded-full px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg", on ? "bg-fg text-bg" : "border border-line text-fg"),
							children: chip.label
						}, chip.id);
					})
				})]
			}),
			items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-muted",
				children: "Nothing in the map matches that."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4",
				children: items.map((item) => {
					const on = selected?.id === item.id;
					const pinned = tracked.includes(item.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-pressed": on,
						onClick: () => choose(item.id),
						className: cn("relative flex h-full flex-col rounded-xl border p-4 text-left transition-colors duration-150", SIZE[item.size], on ? "border-fg bg-surface" : "border-line hover:border-muted"),
						children: [
							pinned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute top-4 right-4 size-2 rounded-full bg-mark",
								"aria-label": "Tracked"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted",
								children: areaLabel(item.area)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 font-display text-lg leading-tight",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 text-sm text-muted",
								children: item.weight
							}),
							item.size === "lg" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-3 line-clamp-3 text-sm text-pretty text-muted",
								children: item.why
							}) : null
						]
					}, item.id);
				})
			}),
			selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: detailRef,
				className: "mt-3 rounded-3xl bg-surface p-4 md:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: areaLabel(selected.area)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 font-display text-2xl leading-tight",
								children: selected.title
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							className: "shrink-0 rounded-lg",
							onClick: () => onToggle(selected.id),
							children: tracked.includes(selected.id) ? "Remove from list" : "Track this place"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-5 grid gap-4 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-sm text-muted",
										children: "Where to look"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1 text-pretty",
										children: selected.where
									}),
									selected.path ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-2 break-words text-sm text-muted",
										children: selected.path
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-sm text-muted",
									children: "Why it grows"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 text-pretty",
									children: selected.why
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-sm text-muted",
									children: "How to reclaim"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 text-pretty",
									children: selected.reclaim
								})]
							})
						]
					}),
					selected.path ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						className: "mt-4 rounded-lg px-0",
						onClick: () => copyPath(selected.path),
						children: copied ? "Copied" : "Copy path"
					}) : null
				]
			}) : null,
			tracked.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-6 divide-y divide-line border-y border-line",
				children: ATLAS.filter((item) => tracked.includes(item.id)).map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid gap-1 py-4 sm:grid-cols-[2rem_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted tabular-nums",
						children: String(index + 1).padStart(2, "0")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-pretty text-muted",
							children: item.reclaim
						})]
					})]
				}, item.id))
			}) : null
		]
	});
}
function formatBytes(n) {
	if (n == null || !Number.isFinite(n)) return "—";
	const sign = n < 0 ? -1 : 1;
	let value = Math.abs(n);
	const units = [
		"B",
		"KB",
		"MB",
		"GB",
		"TB"
	];
	let i = 0;
	while (value >= 1024 && i < units.length - 1) {
		value /= 1024;
		i += 1;
	}
	const digits = i === 0 ? 0 : value >= 100 ? 0 : value >= 10 ? 1 : 2;
	const body = value.toFixed(digits);
	return `${sign < 0 ? "-" : ""}${body} ${units[i]}`;
}
function formatCount(n) {
	if (!Number.isFinite(n)) return "—";
	if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
	if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
	if (n >= 1e4) return `${Math.round(n / 1e3)}k`;
	return Math.round(n).toLocaleString("en-US");
}
function tidyGpu(renderer) {
	if (!renderer) return "";
	const metal = renderer.match(/Metal Renderer:\s*([^,)]+)/i);
	if (metal?.[1]) return metal[1].trim();
	const name = (renderer.match(/ANGLE \((?:[^,]+),\s*([^,)]+)/i)?.[1] ?? renderer).trim();
	return name.length > 48 ? `${name.slice(0, 46)}…` : name;
}
var GB = 1024 ** 3;
function buildFindings(report, pressure, contention) {
	const findings = [];
	const threads = `${report.cpu.threads} threads`;
	if (pressure === "serious" || pressure === "critical") findings.push({
		id: "pressure",
		area: "cpu",
		tone: "waste",
		title: pressure === "critical" ? "The processor is saturated" : "The processor is under pressure",
		detail: "This signal is system-wide, not a reading of this tab. Something else is using the cores, or the machine is thermally limited.",
		evidence: pressure,
		action: "contention"
	});
	else if (pressure === "fair") findings.push({
		id: "pressure",
		area: "cpu",
		tone: "watch",
		title: "The processor is mildly busy",
		detail: "Not an emergency. If the fans are up, the processor side of the map is the next place to look.",
		evidence: "fair pressure",
		action: "contention"
	});
	else if (pressure === "nominal") findings.push({
		id: "pressure",
		area: "cpu",
		tone: "clear",
		title: "Processor pressure is nominal",
		detail: report.cpu.benchmarkOps ? `A short single-thread sweep managed ${formatCount(report.cpu.benchmarkOps)} steps in ${report.cpu.benchmarkMs} ms, and the browser says the cores are not stressed.` : "The browser reports the CPU is not under pressure.",
		evidence: report.cpu.benchmarkOps ? `${formatCount(report.cpu.benchmarkOps)} steps` : threads,
		action: "contention"
	});
	else if (pressure === "unsupported") findings.push({
		id: "pressure",
		area: "cpu",
		tone: "watch",
		title: "This browser hides CPU pressure",
		detail: "Safari and Firefox do not share the Compute Pressure signal. Thread count, and a short core check, are what this page can do instead.",
		evidence: threads,
		action: "contention"
	});
	else findings.push({
		id: "pressure",
		area: "cpu",
		tone: "watch",
		title: "Waiting on a pressure sample",
		detail: "The browser has not answered yet. Thread count is already known.",
		evidence: threads,
		action: "contention"
	});
	if (contention && contention.ratio < .45) findings.push({
		id: "contention",
		area: "cpu",
		tone: "waste",
		title: "Extra cores barely helped",
		detail: "A one-second burst across the threads did not scale. The machine was already busy, or it throttled as soon as the work started.",
		evidence: `${Math.round(contention.ratio * 100)}% of ideal scaling`
	});
	else if (contention && contention.ratio < .75) findings.push({
		id: "contention",
		area: "cpu",
		tone: "watch",
		title: "Cores scaled only partway",
		detail: "Some capacity was free, but not all of it. Something else is sharing the processor.",
		evidence: `${Math.round(contention.ratio * 100)}% of ideal scaling`
	});
	else if (contention) findings.push({
		id: "contention",
		area: "cpu",
		tone: "clear",
		title: "The cores were free for that burst",
		detail: "Work spread across threads almost linearly. A slow Mac right now is probably not a saturated CPU.",
		evidence: `${Math.round(contention.ratio * 100)}% of ideal scaling`
	});
	const quota = report.storage.quota;
	const usage = report.storage.usage ?? 0;
	if (!report.storage.supported || quota == null) findings.push({
		id: "ceiling",
		area: "storage",
		tone: "watch",
		title: "No storage estimate from this browser",
		detail: "A page cannot see free disk space, and this browser also declined to share a site quota.",
		evidence: "unavailable"
	});
	else if (report.browser.family === "safari") findings.push({
		id: "ceiling",
		area: "storage",
		tone: "clear",
		title: "Safari’s allotment is not your disk",
		detail: "Safari usually grants a site about a gigabyte until you approve more. A small number here does not mean the Mac is full.",
		evidence: `${formatBytes(quota)} ceiling · ${formatBytes(usage)} used here`
	});
	else if (report.browser.family === "chromium" && quota < 2 * GB) findings.push({
		id: "ceiling",
		area: "storage",
		tone: "waste",
		title: "The storage ceiling is tight",
		detail: "Chromium shrinks what a site may store when the disk is low. Under 2 GB is a strong hint the volume is crowded. This page is not those files.",
		evidence: `${formatBytes(quota)} ceiling · ${formatBytes(usage)} used here`
	});
	else if (report.browser.family === "chromium" && quota >= 40 * GB) findings.push({
		id: "ceiling",
		area: "storage",
		tone: "clear",
		title: "The storage ceiling is wide",
		detail: "Chromium only offers a ceiling this large when the volume still has room. It is a hint, not a folder scan. Weight you can feel still lives in the map.",
		evidence: `${formatBytes(quota)} ceiling · ${formatBytes(usage)} used here`
	});
	else findings.push({
		id: "ceiling",
		area: "storage",
		tone: "watch",
		title: "The storage ceiling is only a hint",
		detail: "The browser published a quota, not a map of the disk. The places that actually fill a Mac are below.",
		evidence: `${formatBytes(quota)} ceiling · ${formatBytes(usage)} used here`
	});
	if (report.storage.cacheBytes > 5242880 || report.storage.cacheEntries > 40) findings.push({
		id: "caches",
		area: "storage",
		tone: "waste",
		title: "This site is holding cache",
		detail: "Cache Storage for this origin can be deleted. It will not touch Mail, Xcode, or the rest of the disk.",
		evidence: formatBytes(report.storage.cacheBytes),
		action: "clear-caches"
	});
	else if (report.storage.cacheBytes > 0 || report.storage.cacheEntries > 0) findings.push({
		id: "caches",
		area: "storage",
		tone: "watch",
		title: "A little cache is stored here",
		detail: "Small, and limited to this site. Clearing it is safe and will not free space you can feel.",
		evidence: formatBytes(report.storage.cacheBytes),
		action: "clear-caches"
	});
	else findings.push({
		id: "caches",
		area: "storage",
		tone: "clear",
		title: "No site cache to reclaim",
		detail: "This origin is not holding Cache Storage. Disk waste, if you have it, is outside the page.",
		evidence: "0 B"
	});
	if (report.storage.localStorageBytes > 2e5) findings.push({
		id: "local",
		area: "storage",
		tone: "watch",
		title: "This origin has a large local store",
		detail: "localStorage here is bigger than a reclaim list should be. It is still this site only, not the disk.",
		evidence: formatBytes(report.storage.localStorageBytes)
	});
	const { heapUsed, heapLimit, deviceMemoryGb, deviceMemoryCapped } = report.memory;
	if (heapUsed != null && heapLimit != null && heapLimit > 0 && heapUsed / heapLimit > .7) findings.push({
		id: "heap",
		area: "memory",
		tone: "waste",
		title: "This tab’s heap is near its limit",
		detail: "The JavaScript heap in this tab is tight. That slows the page. It is not the Mac’s overall memory — other apps are still invisible.",
		evidence: `${formatBytes(heapUsed)} of ${formatBytes(heapLimit)}`
	});
	else if (heapUsed != null) findings.push({
		id: "heap",
		area: "memory",
		tone: "clear",
		title: "This tab’s heap is light",
		detail: deviceMemoryGb ? `Device memory reads as ${deviceMemoryGb} GB${deviceMemoryCapped ? " or more. The browser stops counting at 8, so a 16–64 GB Mac looks the same." : ". Other apps can still be what fills RAM."}` : "Heap size is only this tab. Activity Monitor is the picture of everything else.",
		evidence: formatBytes(heapUsed)
	});
	else if (deviceMemoryGb) findings.push({
		id: "heap",
		area: "memory",
		tone: deviceMemoryGb <= 4 ? "watch" : "clear",
		title: deviceMemoryGb <= 4 ? "Memory class is modest" : "Memory class is ample",
		detail: deviceMemoryCapped ? "The browser caps the figure it shares at 8 GB. Watch Activity Monitor’s memory-pressure graph, not this number." : "This is the class of memory the browser will admit, not a live reading of what is free.",
		evidence: `${deviceMemoryGb} GB class`
	});
	else findings.push({
		id: "heap",
		area: "memory",
		tone: "watch",
		title: "Memory figures are hidden",
		detail: "This browser does not publish heap size or device memory. The real picture is Activity Monitor → Memory, graph at the bottom.",
		evidence: "not shared"
	});
	if (report.longTasks.count >= 3 || report.longTasks.ms > 150) findings.push({
		id: "jank",
		area: "session",
		tone: "watch",
		title: "The main thread stuttered while idle",
		detail: "After the sweep, the page still saw long tasks. Another tab, an extension, or the browser itself is stealing frames.",
		evidence: `${report.longTasks.count} tasks · ${Math.round(report.longTasks.ms)} ms`
	});
	if (!report.browser.mac) findings.push({
		id: "platform",
		area: "session",
		tone: "watch",
		title: `Opened on ${report.browser.platformLabel}`,
		detail: "The measurements above are this device. The map underneath is written for macOS, which is where those files and processes live.",
		evidence: report.browser.name
	});
	const order = {
		waste: 0,
		watch: 1,
		clear: 2
	};
	return findings.sort((a, b) => order[a.tone] - order[b.tone]);
}
function buildVerdict(report, findings, pressure) {
	if (pressure === "critical" || pressure === "serious") return "The processor is busy outside this page. The tab you are looking at is not the load.";
	const waste = findings.filter((finding) => finding.tone === "waste");
	if (waste.some((finding) => finding.id === "ceiling")) return "The browser is offering almost no storage room. That usually means the disk is what is full.";
	if (waste.some((finding) => finding.id === "contention")) return "The cores did not scale. Something else is already using them, or the machine throttled.";
	if (waste.length > 0) return `${waste[0].title}.`;
	if (!report.browser.mac) return "Nothing measurable here is bloated. This device is not a Mac — the map below is still the macOS field guide.";
	return "Nothing this page can see is wasted. If the Mac feels heavy, the weight is in the places below. A website is not allowed to open them.";
}
var KEY = "dross.tracked";
var EVENT = "dross-pins";
function subscribe(onStoreChange) {
	const handler = () => onStoreChange();
	window.addEventListener(EVENT, handler);
	window.addEventListener("storage", handler);
	return () => {
		window.removeEventListener(EVENT, handler);
		window.removeEventListener("storage", handler);
	};
}
function read() {
	try {
		return localStorage.getItem(KEY) ?? "[]";
	} catch {
		return "[]";
	}
}
function getServerSnapshot() {
	return "[]";
}
function parse(raw) {
	try {
		const value = JSON.parse(raw);
		if (!Array.isArray(value)) return [];
		return value.filter((item) => typeof item === "string");
	} catch {
		return [];
	}
}
function useTracked() {
	const raw = (0, import_react.useSyncExternalStore)(subscribe, read, getServerSnapshot);
	return {
		ids: (0, import_react.useMemo)(() => parse(raw), [raw]),
		toggle: (0, import_react.useCallback)((id) => {
			const current = parse(read());
			const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
			try {
				localStorage.setItem(KEY, JSON.stringify(next));
			} catch {
				return;
			}
			window.dispatchEvent(new Event(EVENT));
		}, [])
	};
}
function browserFamily(ua) {
	const brand = (navigator.userAgentData?.brands)?.find((item) => !/not.a.brand/i.test(item.brand) && !/chromium/i.test(item.brand));
	if (/firefox|fxios/i.test(ua)) return {
		family: "firefox",
		name: brand?.brand ?? "Firefox"
	};
	if (/edg\//i.test(ua)) return {
		family: "chromium",
		name: brand?.brand ?? "Edge"
	};
	if (/chrome|crios|chromium/i.test(ua)) return {
		family: "chromium",
		name: brand?.brand ?? "Chrome"
	};
	if (/safari/i.test(ua)) return {
		family: "safari",
		name: "Safari"
	};
	return {
		family: "other",
		name: brand?.brand ?? "Browser"
	};
}
function platformOf(ua) {
	const hinted = navigator.userAgentData?.platform;
	const blob = `${hinted ?? ""} ${navigator.platform ?? ""} ${ua}`;
	if (/mac/i.test(blob)) return {
		platformLabel: "Mac",
		mac: true
	};
	if (/win/i.test(blob)) return {
		platformLabel: "Windows",
		mac: false
	};
	if (/iphone|ipad|ios/i.test(blob)) return {
		platformLabel: "iPhone or iPad",
		mac: false
	};
	if (/android/i.test(blob)) return {
		platformLabel: "Android",
		mac: false
	};
	if (/linux/i.test(blob)) return {
		platformLabel: "Linux",
		mac: false
	};
	return {
		platformLabel: hinted || "This device",
		mac: false
	};
}
function storageBytes(storage) {
	let bytes = 0;
	for (let i = 0; i < storage.length; i += 1) {
		const key = storage.key(i) ?? "";
		const value = storage.getItem(key) ?? "";
		bytes += (key.length + value.length) * 2;
	}
	return bytes;
}
async function probeStorage() {
	const report = {
		supported: typeof navigator !== "undefined" && !!navigator.storage?.estimate,
		quota: null,
		usage: null,
		cacheBytes: 0,
		cacheEntries: 0,
		databases: [],
		localStorageBytes: 0,
		sessionStorageBytes: 0,
		serviceWorkers: 0
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
		const anyIdb = indexedDB;
		if (anyIdb.databases) report.databases = (await anyIdb.databases()).map((db) => db.name).filter((name) => !!name);
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
		if (navigator.serviceWorker?.getRegistrations) report.serviceWorkers = (await navigator.serviceWorker.getRegistrations()).length;
	} catch {
		report.serviceWorkers = 0;
	}
	return report;
}
function benchWorker(ms) {
	return new Promise((resolve, reject) => {
		let url = "";
		try {
			url = URL.createObjectURL(new Blob(["self.onmessage=function(e){var ms=e.data|0;var t=performance.now();var n=0;var x=1;while(performance.now()-t<ms){x=Math.imul(x,1664525)+1013904223|0;n++;}self.postMessage(n);};"], { type: "text/javascript" }));
			const worker = new Worker(url);
			const timer = window.setTimeout(() => {
				worker.terminate();
				URL.revokeObjectURL(url);
				reject(/* @__PURE__ */ new Error("timeout"));
			}, ms + 1500);
			worker.onerror = () => {
				window.clearTimeout(timer);
				worker.terminate();
				URL.revokeObjectURL(url);
				reject(/* @__PURE__ */ new Error("worker"));
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
function benchMain(ms) {
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
async function benchmark(ms) {
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
async function measureContention(threads) {
	const ms = 240;
	const workers = Math.min(Math.max(threads, 1), 8);
	const single = await benchmark(ms) ?? 0;
	const many = (await Promise.all(Array.from({ length: workers }, () => benchmark(ms)))).reduce((sum, value) => sum + (value ?? 0), 0);
	return {
		ratio: single > 0 ? many / (single * workers) : 0,
		workers,
		single,
		many
	};
}
function readGpu() {
	try {
		const gl = document.createElement("canvas").getContext("webgl");
		if (!gl) return {
			tidy: null,
			full: null
		};
		const ext = gl.getExtension("WEBGL_debug_renderer_info");
		const full = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || "") : String(gl.getParameter(gl.RENDERER) || "");
		gl.getExtension("WEBGL_lose_context")?.loseContext();
		return {
			tidy: tidyGpu(full) || null,
			full: full || null
		};
	} catch {
		return {
			tidy: null,
			full: null
		};
	}
}
function watchLongTasks(ms) {
	return new Promise((resolve) => {
		let count = 0;
		let total = 0;
		let observer = null;
		try {
			observer = new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					count += 1;
					total += entry.duration;
				}
			});
			observer.observe({
				type: "longtask",
				buffered: false
			});
		} catch {
			resolve({
				count: 0,
				ms: 0
			});
			return;
		}
		window.setTimeout(() => {
			observer?.disconnect();
			resolve({
				count,
				ms: total
			});
		}, ms);
	});
}
async function sweep(onStage) {
	onStage("Nameplate");
	const ua = navigator.userAgent;
	const browser = browserFamily(ua);
	const platform = platformOf(ua);
	const gpu = readGpu();
	const deviceMemory = navigator.deviceMemory;
	const heap = performance.memory;
	const connection = navigator.connection;
	onStage("Processor");
	const benchmarkMs = 180;
	const benchmarkOps = await benchmark(benchmarkMs);
	onStage("Storage");
	const storage = await probeStorage();
	onStage("Compositor");
	const longTasks = await watchLongTasks(350);
	return {
		capturedAt: Date.now(),
		browser: {
			...browser,
			...platform
		},
		cpu: {
			threads: navigator.hardwareConcurrency || 1,
			benchmarkOps,
			benchmarkMs
		},
		memory: {
			deviceMemoryGb: typeof deviceMemory === "number" ? deviceMemory : null,
			deviceMemoryCapped: typeof deviceMemory === "number" && deviceMemory >= 8,
			heapUsed: heap?.usedJSHeapSize ?? null,
			heapTotal: heap?.totalJSHeapSize ?? null,
			heapLimit: heap?.jsHeapSizeLimit ?? null
		},
		storage,
		display: {
			width: window.screen?.width ?? 0,
			height: window.screen?.height ?? 0,
			dpr: window.devicePixelRatio || 1
		},
		gpu: gpu.tidy,
		gpuFull: gpu.full,
		network: {
			effectiveType: connection?.effectiveType ?? null,
			saveData: !!connection?.saveData,
			downlink: typeof connection?.downlink === "number" ? connection.downlink : null
		},
		longTasks
	};
}
var TONE_LABEL = {
	waste: "Waste",
	watch: "Watch",
	clear: "Clear"
};
function isPressure(value) {
	return value === "nominal" || value === "fair" || value === "serious" || value === "critical";
}
function meterWidth(fraction) {
	if (!Number.isFinite(fraction) || fraction <= 0) return "0%";
	return `${Math.min(100, Math.max(2, fraction * 100))}%`;
}
function DrossApp() {
	const { ids, toggle } = useTracked();
	const [runId, setRunId] = (0, import_react.useState)(0);
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [stage, setStage] = (0, import_react.useState)("Nameplate");
	const [report, setReport] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [pressure, setPressure] = (0, import_react.useState)("unknown");
	const [samples, setSamples] = (0, import_react.useState)([]);
	const [liveHeap, setLiveHeap] = (0, import_react.useState)(null);
	const [contention, setContention] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let live = true;
		setStatus("scanning");
		setError("");
		sweep((label) => {
			if (live) setStage(label);
		}).then((next) => {
			if (!live) return;
			setReport(next);
			setStatus("ready");
		}).catch((reason) => {
			if (!live) return;
			setError(reason instanceof Error ? reason.message : "The sweep failed.");
			setStatus("error");
		});
		return () => {
			live = false;
		};
	}, [runId]);
	(0, import_react.useEffect)(() => {
		const Ctor = window.PressureObserver;
		if (!Ctor) {
			setPressure("unsupported");
			return;
		}
		let observer = null;
		try {
			observer = new Ctor((records) => {
				const state = records[records.length - 1]?.state;
				if (isPressure(state)) setPressure(state);
			});
			Promise.resolve(observer.observe("cpu", { sampleInterval: 1e3 })).catch(() => {
				try {
					observer?.observe("cpu");
				} catch {
					setPressure("unsupported");
				}
			});
		} catch {
			setPressure("unsupported");
		}
		return () => observer?.disconnect();
	}, []);
	(0, import_react.useEffect)(() => {
		let frames = [];
		let last = performance.now();
		let acc = 0;
		let raf = 0;
		let alive = true;
		const loop = (now) => {
			if (!alive) return;
			const dt = now - last;
			last = now;
			if (dt > 0 && dt < 1e3) frames.push(dt);
			acc += dt;
			if (acc >= 1e3) {
				const sorted = [...frames].sort((a, b) => a - b);
				const p95 = sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * .95))] ?? 0;
				setSamples((prev) => [...prev, { frame: Math.round(p95 * 10) / 10 }].slice(-60));
				const heap = performance.memory;
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
	const verdict = report ? buildVerdict(report, findings, pressure) : status === "error" ? "The sweep could not finish." : "Sweeping what this browser is allowed to see. Not Activity Monitor, and not your disk.";
	const heap = liveHeap ?? report?.memory.heapUsed ?? null;
	const heapLimit = report?.memory.heapLimit ?? null;
	const quota = report?.storage.quota ?? null;
	const usage = report?.storage.usage ?? null;
	const pressureHot = pressure === "serious" || pressure === "critical";
	const pressureFraction = pressure === "nominal" ? .18 : pressure === "fair" ? .46 : pressure === "serious" ? .74 : pressure === "critical" ? 1 : 0;
	async function onClearCaches() {
		setBusy("caches");
		try {
			if ("caches" in window) {
				const keys = await caches.keys();
				await Promise.all(keys.map((key) => caches.delete(key)));
			}
			const storage = await probeStorage();
			setReport((prev) => prev ? {
				...prev,
				storage
			} : prev);
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
	const plate = [
		{
			label: "Processor",
			value: report ? `${report.cpu.threads} threads` : "—",
			note: report?.cpu.benchmarkOps ? `${formatCount(report.cpu.benchmarkOps)} steps / ${report.cpu.benchmarkMs} ms` : status === "scanning" ? "Timing a short sweep" : "Threads the browser will admit"
		},
		{
			label: "Memory",
			value: report?.memory.deviceMemoryGb ? `${report.memory.deviceMemoryGb} GB${report.memory.deviceMemoryCapped ? "+" : ""}` : heap != null ? formatBytes(heap) : "Hidden",
			note: heap != null ? `${formatBytes(heap)} in this tab` : "No heap counter in this browser"
		},
		{
			label: "Storage ceiling",
			value: quota != null ? formatBytes(quota) : "—",
			note: usage != null ? `${formatBytes(usage)} used by this site` : "Quota not shared"
		},
		{
			label: "Display",
			value: report ? `${report.display.width}×${report.display.height}` : "—",
			note: report ? `${report.display.dpr}× pixel ratio` : "Screen"
		},
		{
			label: "Graphics",
			value: report?.gpu ?? (status === "ready" ? "Hidden" : "—"),
			note: report?.browser.name ?? "Renderer"
		},
		{
			label: "Machine",
			value: report?.browser.platformLabel ?? "—",
			note: report ? report.browser.name : "Waiting for the nameplate"
		}
	];
	const raw = report ? [
		{
			label: "Browser",
			value: report.browser.name
		},
		{
			label: "Platform",
			value: report.browser.platformLabel
		},
		{
			label: "Threads",
			value: String(report.cpu.threads)
		},
		{
			label: "Pressure",
			value: pressure
		},
		{
			label: "Heap",
			value: formatBytes(heap)
		},
		{
			label: "Heap limit",
			value: formatBytes(heapLimit)
		},
		{
			label: "Device memory",
			value: report.memory.deviceMemoryGb ? `${report.memory.deviceMemoryGb} GB` : "—"
		},
		{
			label: "Quota",
			value: formatBytes(quota)
		},
		{
			label: "Origin usage",
			value: formatBytes(usage)
		},
		{
			label: "Cache entries",
			value: String(report.storage.cacheEntries)
		},
		{
			label: "Databases",
			value: report.storage.databases.join(", ") || "—"
		},
		{
			label: "localStorage",
			value: formatBytes(report.storage.localStorageBytes)
		},
		{
			label: "Service workers",
			value: String(report.storage.serviceWorkers)
		},
		{
			label: "Long tasks",
			value: `${report.longTasks.count} / ${Math.round(report.longTasks.ms)} ms`
		},
		{
			label: "Network",
			value: report.network.effectiveType ?? "—"
		},
		{
			label: "Graphics",
			value: report.gpuFull ?? "—"
		}
	] : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-6xl overflow-x-clip px-4 py-8 md:px-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-medium tracking-tight md:text-5xl",
						children: "Dross"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-pretty text-muted",
						children: "Memory, storage, and processor slack — measured where a webpage is allowed to look, and mapped where a Mac usually hides the rest."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					className: "shrink-0",
					disabled: status === "scanning" || busy !== null,
					onClick: () => setRunId((value) => value + 1),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						className: "size-4",
						"aria-hidden": "true"
					}), status === "scanning" ? "Sweeping" : "Sweep again"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 max-w-3xl font-display text-2xl leading-snug text-balance md:text-3xl",
				"aria-live": "polite",
				children: verdict
			}),
			status === "scanning" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted",
				children: [
					"Reading ",
					stage.toLowerCase(),
					"."
				]
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-mark",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("mt-8 grid gap-5 md:grid-cols-3", status === "scanning" && "sweep-line"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: "Processor",
						value: pressure === "unknown" ? "…" : pressure,
						fraction: pressureFraction,
						hot: pressureHot
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: "This tab’s heap",
						value: heap != null ? formatBytes(heap) : "Hidden",
						fraction: heap != null && heapLimit ? heap / heapLimit : 0,
						hot: !!heap && !!heapLimit && heap / heapLimit > .7
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: "Site storage, against the ceiling",
						value: usage != null && quota != null ? `${formatBytes(usage)} / ${formatBytes(quota)}` : "—",
						fraction: usage != null && quota ? usage / quota : 0,
						hot: !!quota && quota < 2 * 1024 ** 3 && report?.browser.family === "chromium"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-3",
				children: plate.map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 bg-bg p-4",
					title: cell.note,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: cell.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 truncate font-display text-2xl leading-tight tabular-nums",
							children: cell.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 truncate text-sm text-muted",
							children: cell.note
						})
					]
				}, cell.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				"aria-labelledby": "findings-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "findings-title",
					className: "font-display text-2xl font-medium tracking-tight",
					children: "What the readings mean"
				}), findings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-pretty text-muted",
					children: "Findings appear when the sweep finishes. They interpret the readings. They are not a scan of the disk."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 border-t border-line",
					children: findings.map((finding) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-b border-line py-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("mt-2 size-2 shrink-0 rounded-full", finding.tone === "waste" && "bg-mark", finding.tone === "watch" && "bg-muted", finding.tone === "clear" && "border border-line bg-transparent"),
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
											className: "font-medium",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "sr-only",
												children: [TONE_LABEL[finding.tone], ". "]
											}), finding.title]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "shrink-0 text-sm text-muted tabular-nums sm:text-right",
											children: finding.evidence
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 max-w-3xl text-sm text-pretty text-muted",
										children: finding.detail
									}),
									finding.action === "clear-caches" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										className: "mt-3 rounded-lg",
										disabled: busy !== null,
										onClick: onClearCaches,
										children: busy === "caches" ? "Clearing" : "Clear site caches"
									}) : null,
									finding.action === "contention" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										className: "mt-3 rounded-lg",
										disabled: busy !== null || status !== "ready",
										onClick: onContention,
										children: busy === "contention" ? "Listening to the cores" : "See if the cores are crowded"
									}) : null
								]
							})]
						})
					}, finding.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				"aria-labelledby": "trace-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "trace-title",
							className: "font-display text-2xl font-medium tracking-tight",
							children: "Frame time"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted tabular-nums",
							children: samples.length ? `${samples[samples.length - 1].frame} ms` : "—"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm text-pretty text-muted",
						children: "The slowest frames in each second. Above the mark, this tab is missing the display refresh."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveTrace, { samples })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MassMap, {
				tracked: ids,
				onToggle: toggle
			}),
			raw.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				"aria-labelledby": "raw-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "raw-title",
					className: "font-display text-2xl font-medium tracking-tight",
					children: "Raw reading"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-4 grid gap-x-8 sm:grid-cols-2",
					children: raw.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 justify-between gap-4 border-b border-line py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-sm text-muted",
							children: row.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "min-w-0 text-right text-sm break-words tabular-nums",
							children: row.value
						})]
					}, row.label))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-14 max-w-2xl text-sm text-pretty text-muted",
				children: "Dross reads threads, an optional memory class, the heap of this tab, the browser’s storage ceiling, and CPU pressure where the browser shares it. It cannot list your processes or open your home folder. That limit is deliberate."
			})
		]
	});
}
function Meter({ label, value, fraction, hot }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-sm tabular-nums",
				children: value
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 h-1.5 overflow-hidden rounded-full bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("h-full", hot ? "bg-mark" : "bg-fg"),
				style: { width: meterWidth(fraction) }
			})
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrossApp, {});
}
//#endregion
export { Home as component, routes_CMOlWFez_exports as t };
