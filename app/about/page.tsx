"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/realist/Navbar";
import Footer from "@/components/realist/Footer";
import { AnimatedSection, GoldDivider } from "@/components/realist/AnimatedSection";
import { teamAgents } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";
import { ease } from "@/lib/animations";

const values = [
  "Discretion above all else",
  "Evidence-based guidance, not gut feeling",
  "One client relationship at a time",
  "No rush, no pressure — ever",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F4F1E8]">
      <Navbar />

      <div className="pt-36 pb-24 px-6 lg:px-10 max-w-screen-xl mx-auto">
        <AnimatedSection>
          <p className="text-[10px] font-bold tracking-[0.4em] text-[#D4B06A]/50 uppercase mb-3">Who We Are</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter max-w-4xl leading-[0.9] mb-8 text-[#1A1A1A]">
            We exist to match extraordinary people with extraordinary <span className="italic text-[#D4B06A]">properties.</span>
          </h1>
          <p className="text-lg text-[#6F6A62] max-w-2xl leading-relaxed">
            Founded in 2018, Realist has grown into one of the most trusted private real estate firms in the country. We don&apos;t list everything — we list the right things.
          </p>
        </AnimatedSection>
      </div>

      {/* Image */}
      <div className="px-6 lg:px-10 mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: ease.apple }}
          className="relative w-full aspect-[21/8] rounded-[40px] overflow-hidden bg-[#ECE7DC]"
        >
          <Image src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1400" alt="Our office" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
        </motion.div>
      </div>

      {/* Values */}
      <div className="px-6 lg:px-10 max-w-screen-xl mx-auto py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <AnimatedSection>
          <p className="text-[10px] font-bold tracking-[0.4em] text-[#D4B06A]/50 uppercase mb-3">Our Principles</p>
          <h2 className="text-4xl font-serif font-bold tracking-tighter mb-8 text-[#1A1A1A]">How we <span className="italic text-[#D4B06A]">operate</span></h2>
          <ul className="space-y-5">
            {values.map((v) => (
              <li key={v} className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-[#D4B06A] shrink-0 mt-0.5" />
                <span className="text-base font-medium text-[#6F6A62]">{v}</span>
              </li>
            ))}
          </ul>
        </AnimatedSection>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: ease.apple }}
          className="glass rounded-[40px] p-12 gold-glow"
        >
          <p className="text-[#6F6A62] text-sm mb-6 leading-relaxed italic font-serif">
            &ldquo;The luxury market is built on relationships and trust. Our entire model is designed to earn and keep both.&rdquo;
          </p>
          <p className="font-bold text-[#1A1A1A]">Harvey Specter</p>
          <p className="text-[10px] font-bold tracking-widest text-[#D4B06A]/40 uppercase mt-1">Founder & Senior Partner</p>
        </motion.div>
      </div>

      <GoldDivider className="max-w-screen-xl mx-auto" />

      {/* Team */}
      <div className="py-24 bg-[#1A1A1A]">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <AnimatedSection className="mb-14">
            <p className="text-[10px] font-bold tracking-[0.4em] text-[#D4B06A]/50 uppercase mb-2">The People</p>
            <h2 className="text-4xl font-serif font-bold tracking-tighter text-[#1A1A1A]">Our <span className="italic text-[#D4B06A]">Team</span></h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {teamAgents.map((agent, i) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: ease.apple }}
                className="text-center glass rounded-[24px] p-6 hover:gold-glow transition-shadow duration-500"
              >
                <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-[#D4B06A]/20">
                  <Image src={agent.avatar} alt={agent.name} fill className="object-cover" />
                </div>
                <p className="font-bold text-[#1A1A1A]">{agent.name}</p>
                <p className="text-[11px] text-[#D4B06A]/40 tracking-widest uppercase mt-1">{agent.role}</p>
                <div className="flex justify-center gap-6 mt-4 text-xs text-[#6F6A62]">
                  <span><b className="text-[#D4B06A]">{agent.listings}</b> Listings</span>
                  <span><b className="text-[#D4B06A]">{agent.sales}</b> Sales</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
