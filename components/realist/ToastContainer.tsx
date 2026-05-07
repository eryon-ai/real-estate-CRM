"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { CheckCircle2, Info, XCircle, X } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useStore();

  return (
    <div className="fixed bottom-24 right-6 z-[300] flex flex-col gap-3 items-end">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex items-center gap-3 glass-strong rounded-[16px] px-4 py-3.5 shadow-luxury max-w-[300px]"
          >
            {toast.type === "error" ? (
              <XCircle className="w-4 h-4 text-red-400 shrink-0" />
            ) : toast.type === "info" ? (
              <Info className="w-4 h-4 text-[#D4B06A] shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#D4B06A] shrink-0" />
            )}
            <span className="text-sm font-medium text-[#1A1A1A]/80 flex-1">{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="text-[#6F6A62] hover:text-[#1A1A1A]/60 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
