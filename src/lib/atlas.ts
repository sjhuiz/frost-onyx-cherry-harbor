export type AtlasArea = "storage" | "memory" | "cpu";
export type AtlasSize = "lg" | "wide" | "cell";

export type AtlasItem = {
  id: string;
  area: AtlasArea;
  size: AtlasSize;
  title: string;
  weight: string;
  where: string;
  path?: string;
  why: string;
  reclaim: string;
};

export const ATLAS: AtlasItem[] = [
  {
    id: "snapshots",
    area: "storage",
    size: "lg",
    title: "Local Time Machine snapshots",
    weight: "Often 10–100 GB",
    where: "System Settings → General → Storage, inside System Data",
    why: "macOS keeps local snapshots on the startup disk until a backup finishes or space runs out. They do not appear as a normal folder, so About This Mac looks mysteriously full.",
    reclaim:
      "Leave the Mac plugged in and let Time Machine finish. A restart often lets macOS thin old snapshots on its own. Do not delete system folders by hand.",
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
    reclaim: "Delete backups for devices you do not use. Keep one current backup if it is your only copy.",
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
    reclaim:
      "Use Docker’s reclaim or prune unused images. Lower the disk image limit after it shrinks. Removing the app without that step leaves the file.",
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
    reclaim:
      "Delete old simulator runtimes and device-support folders you do not build against. Clearing DerivedData is safe; the next build recreates it.",
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
    reclaim:
      "Turn on Optimize Mac Storage if the originals can live in iCloud. Otherwise move the library to an external disk from Photos settings.",
  },
  {
    id: "projects",
    area: "storage",
    size: "cell",
    title: "Old project folders",
    weight: "1–5 GB each",
    where: "Wherever you clone repos",
    why: "node_modules, virtualenvs, build outputs, and target folders are local caches pretending to be source.",
    reclaim:
      "Sort the parent folder by size in Finder. Delete checkouts you are not building. The next install restores dependencies.",
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
    reclaim:
      "Clear cached files from inside the app. Wiping all of Library/Caches is ruder than it needs to be and can sign you out.",
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
    reclaim:
      "Set downloads to Recent. Mailbox → Erase Deleted Items. Removing ~/Library/Mail forces a full re-download, so prefer the in-app controls.",
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
    reclaim: "Empty Trash. Sort Downloads by size and remove disk images you already used.",
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
    reclaim:
      "Homebrew, npm, and pnpm can clear their own caches from their docs. Also check ~/.npm and the pnpm store. They rebuild on demand.",
  },
  {
    id: "browsers",
    area: "memory",
    size: "lg",
    title: "Browser helper processes",
    weight: "The usual RAM leak",
    where: "Activity Monitor → Memory, or the browser’s own task manager",
    why: "Each tab, extension, and site process holds its own heap. Chrome’s Window menu → Task Manager shows which one, which Activity Monitor will not.",
    reclaim:
      "Close the heavy tabs and extra windows. Quit the browser once so helpers actually exit. One profile you forgot is often still open.",
  },
  {
    id: "electron",
    area: "memory",
    size: "wide",
    title: "Electron apps left open",
    weight: "0.5–2 GB each, idle",
    where: "Activity Monitor, sort by memory",
    why: "Slack, Teams, Discord, VS Code, Notion, Figma, and Spotify are each a browser. Closing the window often leaves them resident.",
    reclaim: "Quit the ones you are not using. Check the menu-bar icon, not just the Dock dot.",
  },
  {
    id: "mempressure",
    area: "memory",
    size: "wide",
    title: "Memory pressure and swap",
    weight: "A symptom, not a file",
    where: "Activity Monitor → Memory, the graph at the bottom",
    why: "Yellow or red pressure means macOS is compressing and paging. The Mac feels hot and slow even when CPU looks ordinary. Swap Used is the scar.",
    reclaim:
      "Quit the largest processes until the graph goes green. Adding login items back one at a time tells you who caused it.",
  },
  {
    id: "windowserver",
    area: "memory",
    size: "cell",
    title: "WindowServer",
    weight: "Grows with displays",
    where: "Activity Monitor, search WindowServer",
    why: "It composites every window. A leak or a wall of high-resolution windows shows up here, and you cannot quit it alone.",
    reclaim: "Log out and back in. That restarts WindowServer without a full restart. Then reopen fewer huge windows.",
  },
  {
    id: "loginitems",
    area: "memory",
    size: "cell",
    title: "Login items",
    weight: "Quiet residents",
    where: "System Settings → General → Login Items & Extensions",
    why: "Updaters, menu bar utilities, and cloud sync stay in RAM from the moment you log in, whether or not you open the app.",
    reclaim: "Remove anything you do not need every day. Background items are listed in the same pane.",
  },
  {
    id: "vms",
    area: "memory",
    size: "wide",
    title: "Virtual machines",
    weight: "A second computer",
    where: "Parallels, UTM, or VirtualBox",
    why: "A running or paused VM reserves a slice of RAM the host cannot use. Suspended is not free.",
    reclaim: "Shut the guest down fully when you are done. Lower its memory assignment if it is always on.",
  },
  {
    id: "kerneltask",
    area: "cpu",
    size: "lg",
    title: "kernel_task means heat",
    weight: "Do not force-quit it",
    where: "Activity Monitor → CPU",
    why: "When kernel_task is high, macOS is usually throttling because the machine is hot. It is the brake, not the thing wasting cycles. Killing it is not possible and would not help.",
    reclaim:
      "Find the real load, or the reason it is hot: a blocked vent, a lap, a display, a runaway process. Let it cool. The percentage should fall on its own.",
  },
  {
    id: "spotlight",
    area: "cpu",
    size: "wide",
    title: "Spotlight indexing",
    weight: "Hours after a big copy",
    where: "Activity Monitor: mds and mds_stores",
    why: "After an OS update, a migration, or a huge folder copy, indexing pins a core and the disk. That is normal until it finishes, and stuck if it never does.",
    reclaim:
      "If it has run for days, add the enormous folder under System Settings → Spotlight → Search Privacy, then remove it so indexing starts clean.",
  },
  {
    id: "photosd",
    area: "cpu",
    size: "wide",
    title: "Photos analysis",
    weight: "Heavy once per import",
    where: "Activity Monitor: photoanalysisd, mediaanalysisd",
    why: "Face recognition and search run after imports and OS updates. They look like a stuck fan and then stop.",
    reclaim: "Plug in and leave it overnight. There is no useful off switch. Interrupting just resumes later.",
  },
  {
    id: "backupd",
    area: "cpu",
    size: "cell",
    title: "Time Machine working",
    weight: "CPU plus disk",
    where: "System Settings → General → Time Machine",
    why: "backupd spikes while copying, especially to a slow disk or a drive that just woke up.",
    reclaim: "Let the backup finish, or pause Time Machine if you need the machine quiet right now.",
  },
  {
    id: "icloud",
    area: "cpu",
    size: "cell",
    title: "iCloud sync",
    weight: "Desktop and Documents",
    where: "System Settings → Apple ID → iCloud",
    why: "cloudd and bird chew CPU when a large Desktop, Documents, or Photos library is reconciling. A “stuck” fan is often just the first sync.",
    reclaim:
      "Wait it out on power, or turn off Desktop & Documents sync if you did not mean to upload the whole home folder.",
  },
  {
    id: "editors",
    area: "cpu",
    size: "wide",
    title: "Editors and language servers",
    weight: "Hidden node processes",
    where: "Activity Monitor: node, tsserver, rust-analyzer, eslint",
    why: "Closing a project window does not always stop its language server, file watcher, or Docker helper.",
    reclaim: "Quit the editor, or close the folder from its own menu. One forgotten window can hold a core all day.",
  },
  {
    id: "displays",
    area: "cpu",
    size: "cell",
    title: "Extra displays",
    weight: "WindowServer CPU",
    where: "System Settings → Displays",
    why: "High refresh, a 5K display, and transparency make WindowServer expensive even when you are “doing nothing.”",
    reclaim:
      "Lower the refresh rate, unplug a display you are not using, and turn on Reduce Transparency under Accessibility → Display.",
  },
  {
    id: "loudtab",
    area: "cpu",
    size: "cell",
    title: "One loud tab",
    weight: "Outruns the whole Mac",
    where: "Browser task manager, not Activity Monitor",
    why: "A canvas, a video ad, or a runaway extension sits in one helper and looks anonymous in Activity Monitor.",
    reclaim: "Open the browser’s task manager, sort by CPU, and close that site. Then remove the extension if it comes back.",
  },
];

export function areaLabel(area: AtlasArea): string {
  if (area === "storage") return "Storage";
  if (area === "memory") return "Memory";
  return "Processor";
}
