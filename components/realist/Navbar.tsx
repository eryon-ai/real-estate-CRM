"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { ease } from "@/lib/animations";
import { MagneticHover } from "./AnimatedSection";

const navLinks = [
  { href: "/explore", label: "EXPLORE" },
  { href: "/journal", label: "JOURNAL" },
  { href: "/about", label: "ABOUT" },
  { href: "/submit-property", label: "LIST PROPERTY" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: ease.apple }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 lg:px-10 transition-all duration-500 ${
          scrolled
            ? "py-3 glass border-b border-[#D8D1C2]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-2 h-2 bg-[#D4B06A] rounded-full group-hover:shadow-[0_0_12px_rgba(200, 169, 107,0.6)] transition-shadow duration-300" />
            <span className="font-sans text-xl font-bold tracking-tighter text-[#1A1A1A]">REALIST</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-bold tracking-widest text-[#6F6A62] hover:text-[#D4B06A] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-full hover:bg-[#ECE7DC] transition-colors" aria-label="Search">
              <Search className="w-4 h-4 text-[#6F6A62]" />
            </button>
            <MagneticHover strength={0.15}>
              <Link
                href="/admin"
                className="hidden md:inline-flex text-[11px] font-bold tracking-widest bg-gradient-to-br from-[#D4B06A] to-[#B7C58E] text-[#FFFFFF] px-5 py-2.5 rounded-full hover:shadow-[0_0_20px_rgba(200, 169, 107,0.3)] transition-shadow duration-300"
              >
                ADMIN DASHBOARD DEMO
              </Link>
            </MagneticHover>
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2.5 rounded-full hover:bg-[#ECE7DC] transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5 text-[#6F6A62]" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#F4F1E8]/95 backdrop-blur-xl"
          >
            <div className="flex flex-col h-full px-6 pt-6 pb-12">
              <div className="flex justify-between items-center mb-20">
                <Link href="/" className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#D4B06A] rounded-full" />
                  <span className="font-sans text-xl font-bold tracking-tighter">REALIST</span>
                </Link>
                <button onClick={() => setMobileOpen(false)} className="p-2 text-[#6F6A62]">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, ease: ease.apple }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-4xl font-serif font-bold tracking-tighter text-[#1A1A1A]/70 hover:text-[#D4B06A] transition-colors block"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto">
                <Link
                  href="/admin"
                  className="inline-flex text-sm font-bold tracking-widest bg-gradient-to-br from-[#D4B06A] to-[#B7C58E] text-[#FFFFFF] px-6 py-3 rounded-full"
                >
                  ADMIN DASHBOARD DEMO
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
