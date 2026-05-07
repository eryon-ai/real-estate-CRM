"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, X, Check, Key, Clock, MapPin } from "lucide-react";
import { ease } from "@/lib/animations";

export type FilterState = {
  status: string;
  type: string;
  neighborhood: string;
  query: string;
};

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
}

const statusOptions = ["All", "FOR SALE", "FOR RENT"];
const neighborhoodOptions = ["All", "Beverly Hills", "Upper East Side", "Malibu Coast", "Barton Hills", "SoHo", "Pelican Bay"];

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    status: "All",
    type: "All",
    neighborhood: "All",
    query: "",
  });

  const update = (key: keyof FilterState, value: string) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    onFilterChange(next);
  };

  const reset = () => {
    const d = { status: "All", type: "All", neighborhood: "All", query: "" };
    setFilters(d);
    onFilterChange(d);
  };

  const hasActive = filters.status !== "All" || filters.neighborhood !== "All" || filters.query !== "";

  return (
    <div className="relative z-[100] w-full flex flex-col md:flex-row items-end gap-4">
      {/* Status / Listing Type */}
      <div className="flex-1 w-full">
        <div className="flex items-center gap-1.5 mb-2 px-1">
          <Key className="w-3.5 h-3.5 text-[#6F6A62]" />
          <p className="text-[10px] font-bold tracking-[0.15em] text-[#6F6A62] uppercase">Listing Type</p>
        </div>
        <FilterDropdown value={filters.status} options={statusOptions} onChange={(v) => update("status", v)} />
      </div>

      {/* Neighborhood */}
      <div className="flex-1 w-full">
        <div className="flex items-center gap-1.5 mb-2 px-1">
          <MapPin className="w-3.5 h-3.5 text-[#6F6A62]" />
          <p className="text-[10px] font-bold tracking-[0.15em] text-[#6F6A62] uppercase">Neighborhood</p>
        </div>
        <FilterDropdown value={filters.neighborhood} options={neighborhoodOptions} onChange={(v) => update("neighborhood", v)} />
      </div>

      {/* Search */}
      <div className="flex-[1.5] w-full">
        <div className="flex items-center gap-1.5 mb-2 px-1">
          <Search className="w-3.5 h-3.5 text-[#6F6A62]" />
          <p className="text-[10px] font-bold tracking-[0.15em] text-[#6F6A62] uppercase">Search Properties</p>
        </div>
        <div className="w-full flex items-center gap-2.5 px-4 py-3 bg-[#ECE7DC] rounded-[10px] border border-[#D8D1C2] transition-colors focus-within:border-[#D4B06A]/50">
          <input
            type="text"
            placeholder="Search..."
            value={filters.query}
            onChange={(e) => update("query", e.target.value)}
            className="bg-transparent border-none outline-none text-[13px] font-medium w-full placeholder:text-[#6F6A62] text-[#1A1A1A]"
          />
          <AnimatePresence>
            {filters.query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => update("query", "")}
              >
                <X className="w-3.5 h-3.5 text-[#6F6A62] hover:text-[#D4B06A]" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Reset */}
      <AnimatePresence>
        {hasActive && (
          <motion.button
            initial={{ opacity: 0, width: 0, scale: 0.9 }}
            animate={{ opacity: 1, width: "auto", scale: 1 }}
            exit={{ opacity: 0, width: 0, scale: 0.9 }}
            onClick={reset}
            className="h-[46px] px-5 flex items-center justify-center gap-2 rounded-[10px] border border-[#D8D1C2] text-[11px] font-bold tracking-widest text-[#6F6A62] hover:text-[#1A1A1A] hover:bg-[#ECE7DC] transition-colors whitespace-nowrap shrink-0"
          >
            <X className="w-3.5 h-3.5" /> RESET FILTERS
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterDropdown({
  label, value, options, onChange,
}: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const isActive = value !== "All";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center justify-between gap-3 px-4 py-3 rounded-[10px] transition-all w-full border ${
          isActive
            ? "bg-[#D4B06A]/10 border-[#D4B06A]/30 text-[#B7C58E]"
            : "bg-[#ECE7DC] border-[#D8D1C2] text-[#6F6A62] hover:border-[#6F6A62]/30"
        }`}
      >
        <div className="text-left">
          <p className="text-[13px] font-medium truncate">
            {value === "All" ? (options === statusOptions ? "All Statuses" : "All Neighborhoods") : value}
          </p>
        </div>
        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${open ? "rotate-180" : ""} ${isActive ? "text-[#D4B06A]/40" : "text-[#6F6A62]"}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            className="absolute top-full left-0 mt-2 z-50 bg-[#1A1A1A]/95 backdrop-blur-2xl rounded-[16px] min-w-[200px] p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-white/20 text-[#FFFFFF]"
          >
            {options.map((opt) => {
              const isSelected = value === opt;
              return (
                <button
                  key={opt}
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-left text-[13px] font-medium rounded-[8px] transition-colors mb-0.5 last:mb-0 ${
                    isSelected
                      ? "bg-[#3478F6] text-[#1A1A1A] shadow-sm"
                      : "text-[#F4F1E8]/80 hover:text-[#FFFFFF] hover:bg-black/[0.06]"
                  }`}
                >
                  <div className="w-4 h-4 flex items-center justify-center shrink-0">
                    {isSelected && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                  </div>
                  {opt === "All" && label === "Status" ? "All Statuses" : opt === "All" && label === "Neighborhood" ? "All Neighborhoods" : opt}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
