// lib/store.ts — Global in-memory state for saved, compare, recently viewed, toasts
// Uses localStorage for persistence, React context for reactivity

"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Property } from "./data";

// ─── TYPES ───────────────────────────────────────────────────
export type Toast = { id: string; message: string; type?: "success" | "info" | "error" };

type StoreState = {
  saved: string[];
  compare: string[];
  recentlyViewed: string[];
  toasts: Toast[];
  toggleSaved: (id: string, title: string) => void;
  toggleCompare: (id: string, title: string) => void;
  addRecentlyViewed: (id: string) => void;
  isSaved: (id: string) => boolean;
  isInCompare: (id: string) => boolean;
  addToast: (message: string, type?: Toast["type"]) => void;
  removeToast: (id: string) => void;
};

const StoreContext = createContext<StoreState | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      setSaved(JSON.parse(localStorage.getItem("re_saved") || "[]"));
      setCompare(JSON.parse(localStorage.getItem("re_compare") || "[]"));
      setRecentlyViewed(JSON.parse(localStorage.getItem("re_recent") || "[]"));
    } catch {}
  }, []);

  const addToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const toggleSaved = useCallback((id: string, title: string) => {
    setSaved((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem("re_saved", JSON.stringify(next));
      addToast(prev.includes(id) ? `Removed from saved` : `"${title}" saved!`, "success");
      return next;
    });
  }, [addToast]);

  const toggleCompare = useCallback((id: string, title: string) => {
    setCompare((prev) => {
      if (!prev.includes(id) && prev.length >= 3) {
        addToast("Max 3 properties to compare", "error");
        return prev;
      }
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem("re_compare", JSON.stringify(next));
      addToast(prev.includes(id) ? `Removed from compare` : `"${title}" added to compare`);
      return next;
    });
  }, [addToast]);

  const addRecentlyViewed = useCallback((id: string) => {
    setRecentlyViewed((prev) => {
      const next = [id, ...prev.filter((x) => x !== id)].slice(0, 6);
      localStorage.setItem("re_recent", JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <StoreContext.Provider value={{
      saved, compare, recentlyViewed, toasts,
      toggleSaved, toggleCompare, addRecentlyViewed,
      isSaved: (id) => saved.includes(id),
      isInCompare: (id) => compare.includes(id),
      addToast, removeToast,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be inside StoreProvider");
  return ctx;
}
