"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const shown = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (shown.current) return;
      const dismissed = sessionStorage.getItem("popup_dismissed");
      if (dismissed) return;

      const onMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0 && !shown.current) {
          shown.current = true;
          setShow(true);
        }
      };
      document.addEventListener("mouseleave", onMouseLeave);
      return () => document.removeEventListener("mouseleave", onMouseLeave);
    }, 8000); // Wait 8s before activating

    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("popup_dismissed", "1");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[500] flex items-center justify-center px-6"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={dismiss} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="relative glass-strong rounded-[32px] p-10 max-w-md w-full text-center gold-glow"
          >
            <button onClick={dismiss} className="absolute top-5 right-5 text-[#6F6A62] hover:text-[#1A1A1A]/70 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <p className="text-4xl mb-4">🏡</p>
            <p className="text-[10px] font-bold tracking-[0.3em] text-[#D4B06A]/60 uppercase mb-3">Before You Go</p>
            <h2 className="text-2xl font-serif font-bold tracking-tighter text-[#1A1A1A] mb-3">
              Get a free property <span className="italic text-[#D4B06A]">consultation</span>
            </h2>
            <p className="text-sm text-[#6F6A62] leading-relaxed mb-8">
              Our specialists are available now. Leave your number and we&apos;ll call you back within 15 minutes.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="tel"
                placeholder="Your phone number"
                className="bg-[#ECE7DC] border border-[#D8D1C2] text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 rounded-[14px] px-4 py-3.5 text-sm outline-none focus:border-[#D4B06A]/40 transition-colors"
              />
              <button
                onClick={dismiss}
                className="w-full bg-gradient-to-br from-[#D4B06A] to-[#B7C58E] text-[#FFFFFF] text-[11px] font-bold tracking-widest uppercase py-4 rounded-[14px] hover:shadow-[0_0_25px_rgba(200, 169, 107,0.3)] transition-shadow"
              >
                REQUEST FREE CALL
              </button>
              <button onClick={dismiss} className="text-xs text-[#6F6A62] hover:text-[#6F6A62] transition-colors mt-1">
                No thanks, I&apos;ll browse on my own
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
