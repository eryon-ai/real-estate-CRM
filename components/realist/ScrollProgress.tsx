"use client";

import { useScroll, motion, useTransform } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #D4B06A, #B7C58E, #D4B06A)",
      }}
    />
  );
}
