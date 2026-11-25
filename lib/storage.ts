"use client";

import { useCallback, useEffect, useState } from "react";

const EVENT = "sufra:storage";
const PREFIX = "sufra:";

export function readStored<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function writeStored<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Storage can be full or blocked (private mode); the in-memory state still works.
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: key }));
}

/**
 * State that persists in localStorage and stays in sync between components
 * on the same page and across browser tabs. Renders `fallback` on the server
 * and on first paint, then loads the saved value.
 */
export function useStored<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setValue(readStored(key, fallback));
    setLoaded(true);
    const sync = (e: Event) => {
      const changed = e instanceof StorageEvent ? e.key?.replace(PREFIX, "") : (e as CustomEvent<string>).detail;
      if (changed === key) setValue(readStored(key, fallback));
    };
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
    // fallback is intentionally not a dependency: callers pass literals.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        writeStored(key, resolved);
        return resolved;
      });
    },
    [key],
  );

  return [value, update, loaded] as const;
}

/* ---------- Domain helpers ---------- */

export function useFavorites() {
  const [favs, setFavs, loaded] = useStored<string[]>("favorites", []);
  const toggle = useCallback(
    (slug: string) => setFavs((f) => (f.includes(slug) ? f.filter((s) => s !== slug) : [...f, slug])),
    [setFavs],
  );
  return { favorites: favs, toggle, isFavorite: (slug: string) => favs.includes(slug), loaded };
}

export interface ListEntry {
  slug: string;
  servings: number;
  method?: string;
  /** Ingredient ids the cook already has at home, left off the list. */
  skip: string[];
}

export interface ShoppingState {
  entries: ListEntry[];
  /** Keys of aggregated list lines that are ticked off. */
  checked: string[];
}

export function useShoppingList() {
  const [state, setState, loaded] = useStored<ShoppingState>("shopping-list", { entries: [], checked: [] });

  const addRecipe = useCallback(
    (entry: ListEntry) =>
      setState((s) => ({
        ...s,
        entries: [...s.entries.filter((e) => e.slug !== entry.slug), entry],
      })),
    [setState],
  );
  const removeRecipe = useCallback(
    (slug: string) => setState((s) => ({ ...s, entries: s.entries.filter((e) => e.slug !== slug) })),
    [setState],
  );
  const toggleChecked = useCallback(
    (key: string) =>
      setState((s) => ({
        ...s,
        checked: s.checked.includes(key) ? s.checked.filter((k) => k !== key) : [...s.checked, key],
      })),
    [setState],
  );
  const clearChecked = useCallback(() => setState((s) => ({ ...s, checked: [] })), [setState]);
  const clearAll = useCallback(() => setState({ entries: [], checked: [] }), [setState]);

  return { ...state, loaded, addRecipe, removeRecipe, toggleChecked, clearChecked, clearAll, has: (slug: string) => state.entries.some((e) => e.slug === slug) };
}
