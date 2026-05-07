// lib/animations.ts — Centralized Framer Motion presets for luxury feel

import type { Variants, Transition } from "framer-motion";

// ─── EASING CURVES ────────────────────────────────────────────
export const ease = {
  apple: [0.16, 1, 0.3, 1] as const,       // Apple-style overshoot
  smooth: [0.22, 1, 0.36, 1] as const,      // Smooth deceleration
  dramatic: [0.77, 0, 0.175, 1] as const,   // Dramatic entrance
  out: [0, 0, 0.2, 1] as const,             // Clean exit
};

// ─── TRANSITIONS ──────────────────────────────────────────────
export const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.8,
};

export const smoothTransition: Transition = {
  duration: 0.8,
  ease: ease.apple,
};

// ─── STAGGER CONTAINER ────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// ─── CHILD VARIANTS ───────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.apple },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.8, ease: ease.smooth },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: ease.apple },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: ease.apple },
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: ease.apple },
  },
};

export const revealBlur: Variants = {
  hidden: { opacity: 0, filter: "blur(20px)", y: 20 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 1.2, ease: ease.apple },
  },
};

// ─── PAGE TRANSITIONS ─────────────────────────────────────────
export const pageEnter: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.apple } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: ease.out } },
};

// ─── HOVER PRESETS ────────────────────────────────────────────
export const cardHover = {
  scale: 1.02,
  transition: springTransition,
};

export const cardTap = {
  scale: 0.98,
};

export const buttonHover = {
  scale: 1.04,
  transition: { type: "spring" as const, stiffness: 400, damping: 17 },
};

// ─── CHARACTER STAGGER (for hero text) ────────────────────────
export const charContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.03 },
  },
};

export const charVariant: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: ease.apple },
  },
};

// ─── GOLD SHIMMER KEYFRAMES (for CSS) ─────────────────────────
export const shimmerAnimation = {
  backgroundSize: "200% 100%",
  animation: "shimmer 2s infinite linear",
};
