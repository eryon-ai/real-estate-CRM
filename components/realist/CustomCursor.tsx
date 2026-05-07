"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let animFrame: number;
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      }
      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);

    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);
    const onMouseLeave = () => setIsVisible(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.querySelectorAll("a, button, [role='button']").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Re-attach on DOM changes via MutationObserver
    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(animFrame);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Gold dot — follows cursor exactly */}
          <div
            ref={cursorRef}
            className="fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-[#D4B06A] pointer-events-none mix-blend-difference"
            style={{ willChange: "transform" }}
          />
          {/* Ring — follows with lag */}
          <div
            ref={ringRef}
            className={`fixed top-0 left-0 z-[9998] w-8 h-8 rounded-full border pointer-events-none transition-all duration-200 ${
              isHovering
                ? "border-[#D4B06A] scale-150 opacity-60"
                : "border-[#D4B06A]/40 scale-100 opacity-40"
            }`}
            style={{ willChange: "transform" }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
