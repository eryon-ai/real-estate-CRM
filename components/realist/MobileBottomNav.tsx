"use client";

import Link from "next/link";
import { Home, Search, Heart, GitCompare, Phone } from "lucide-react";
import { useStore } from "@/lib/store";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/explore", icon: Search, label: "Explore" },
  { href: "/saved", icon: Heart, label: "Saved" },
  { href: "/compare", icon: GitCompare, label: "Compare" },
  { href: "/contact", icon: Phone, label: "Contact" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { saved, compare } = useStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] md:hidden glass border-t border-[#D8D1C2]">
      <div className="flex items-center justify-around px-2 py-3">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          const badge =
            href === "/saved" ? saved.length :
            href === "/compare" ? compare.length : 0;

          return (
            <Link
              key={href}
              href={href}
              className={`relative flex flex-col items-center gap-1 px-3 py-1 rounded-[12px] transition-colors ${
                isActive ? "text-[#D4B06A]" : "text-[#6F6A62] hover:text-[#1A1A1A]/60"
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#D4B06A] text-[#FFFFFF] text-[9px] font-black rounded-full flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-bold tracking-widest uppercase">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
