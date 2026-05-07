"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/realist/Navbar";
import Footer from "@/components/realist/Footer";
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/realist/AnimatedSection";
import { journalPosts } from "@/lib/data";
import { ArrowRight } from "lucide-react";

const categories = ["ALL", "DESIGN", "MARKET", "ARCHITECTURE"];

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const filtered = activeCategory === "ALL" ? journalPosts : journalPosts.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#F4F1E8]">
      <Navbar />

      <div className="pt-36 pb-12 px-6 lg:px-10 max-w-screen-xl mx-auto">
        <AnimatedSection>
          <p className="text-[10px] font-bold tracking-[0.4em] text-[#D4B06A]/50 uppercase mb-3">Insights & Ideas</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter mb-10">
            The <span className="italic text-[#D4B06A]">Journal</span>
          </h1>
        </AnimatedSection>

        <div className="flex flex-wrap gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[11px] font-bold tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-br from-[#D4B06A] to-[#B7C58E] text-[#FFFFFF]"
                  : "glass text-[#6F6A62] hover:text-[#D4B06A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 lg:px-10 max-w-screen-xl mx-auto pb-28">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((post) => (
            <StaggerItem key={post.id}>
              <Link href={`/journal/${post.id}`} className="group block">
                <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden bg-[#ECE7DC] mb-5">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute top-4 left-4 glass text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full text-[#D4B06A]">
                    {post.category}
                  </span>
                </div>
                <p className="text-[10px] font-bold tracking-widest text-[#6F6A62] uppercase mb-2">{post.date} · {post.readTime}</p>
                <h2 className="text-xl font-serif font-bold tracking-tight text-[#1A1A1A] group-hover:text-[#D4B06A] transition-colors mb-2">{post.title}</h2>
                <p className="text-sm text-[#6F6A62] leading-relaxed line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center gap-2 mt-4 text-sm font-bold text-[#6F6A62] group-hover:text-[#D4B06A] transition-colors">
                  Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <Footer />
    </main>
  );
}
