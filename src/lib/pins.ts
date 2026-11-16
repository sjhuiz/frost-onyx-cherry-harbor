import { useCallback, useMemo, useSyncExternalStore } from "react";

const KEY = "dross.tracked";
const EVENT = "dross-pins";

function subscribe(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener(EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

function read(): string {
  try {
    return localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function getServerSnapshot() {
  return "[]";
}

function parse(raw: string): string[] {
  try {
    const value = JSON.parse(raw) as unknown;
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function useTracked() {
  const raw = useSyncExternalStore(subscribe, read, getServerSnapshot);
  const ids = useMemo(() => parse(raw), [raw]);
  const toggle = useCallback((id: string) => {
    const current = parse(read());
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      return;
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);
  return { ids, toggle };
}
