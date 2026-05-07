"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/realist/Navbar";
import Footer from "@/components/realist/Footer";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/realist/AnimatedSection";
import PropertyCard from "@/components/realist/PropertyCard";
import { useStore } from "@/lib/store";
import { properties } from "@/lib/data";
import { ArrowRight, Heart } from "lucide-react";

export default function SavedPage() {
  const { saved } = useStore();
  const savedProperties = properties.filter((p) => saved.includes(p.id));

  return (
    <main className="min-h-screen bg-[#F4F1E8] flex flex-col">
      <Navbar />

      <div className="flex-grow pt-36 pb-24 px-6 lg:px-10 max-w-screen-xl mx-auto w-full">
        <AnimatedSection className="mb-12">
          <p className="text-[10px] font-bold tracking-[0.4em] text-[#D4B06A]/50 uppercase mb-3 flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 fill-[#D4B06A]/50" /> Your Collection
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter">
            Saved <span className="italic text-[#D4B06A]">Properties</span>
          </h1>
        </AnimatedSection>

        {savedProperties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 glass rounded-[32px] border-dashed border-[#D4B06A]/20"
          >
            <Heart className="w-12 h-12 text-[#D4B06A]/20 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-2">No properties saved yet</h2>
            <p className="text-[#6F6A62] mb-8 max-w-sm mx-auto">
              Curate your personal collection of luxury real estate by tapping the heart icon on properties you love.
            </p>
            <Link
              href="/explore"
              className="inline-flex items-center gap-3 bg-gradient-to-br from-[#D4B06A] to-[#B7C58E] text-[#FFFFFF] text-[11px] font-bold tracking-widest uppercase px-8 py-4 rounded-[14px] hover:shadow-[0_0_25px_rgba(200, 169, 107,0.3)] transition-shadow"
            >
              EXPLORE LISTINGS <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedProperties.map((property, i) => (
              <StaggerItem key={property.id}>
                <PropertyCard property={property} index={i} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>

      <Footer />
    </main>
  );
}
