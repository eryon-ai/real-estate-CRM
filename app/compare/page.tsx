"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/realist/Navbar";
import Footer from "@/components/realist/Footer";
import { AnimatedSection, GoldDivider } from "@/components/realist/AnimatedSection";
import { useStore } from "@/lib/store";
import { properties } from "@/lib/data";
import { ArrowRight, GitCompare, X, Check } from "lucide-react";
import { ease } from "@/lib/animations";

export default function ComparePage() {
  const { compare, toggleCompare } = useStore();
  const compareList = properties.filter((p) => compare.includes(p.id));

  return (
    <main className="min-h-screen bg-[#F4F1E8] flex flex-col">
      <Navbar />

      <div className="flex-grow pt-36 pb-24 px-6 lg:px-10 max-w-screen-xl mx-auto w-full">
        <AnimatedSection className="mb-12">
          <p className="text-[10px] font-bold tracking-[0.4em] text-[#D4B06A]/50 uppercase mb-3 flex items-center gap-2">
            <GitCompare className="w-3.5 h-3.5 text-[#D4B06A]/50" /> Side by Side
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter">
              Compare <span className="italic text-[#D4B06A]">Properties</span>
            </h1>
            <p className="text-sm font-bold text-[#6F6A62] mb-2">
              {compareList.length} of 3 selected
            </p>
          </div>
        </AnimatedSection>

        {compareList.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 glass rounded-[32px] border-dashed border-[#D4B06A]/20"
          >
            <GitCompare className="w-12 h-12 text-[#D4B06A]/20 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-2">No properties to compare</h2>
            <p className="text-[#6F6A62] mb-8 max-w-sm mx-auto">
              Select up to 3 properties from our collection to compare their features side by side.
            </p>
            <Link
              href="/explore"
              className="inline-flex items-center gap-3 bg-gradient-to-br from-[#D4B06A] to-[#B7C58E] text-[#FFFFFF] text-[11px] font-bold tracking-widest uppercase px-8 py-4 rounded-[14px] hover:shadow-[0_0_25px_rgba(200, 169, 107,0.3)] transition-shadow"
            >
              EXPLORE LISTINGS <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="overflow-x-auto pb-8 custom-scrollbar">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-4 gap-6">
                {/* Empty top-left cell */}
                <div className="col-span-1" />

                {/* Property Headers */}
                {compareList.map((property, idx) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, ease: ease.apple }}
                    className="col-span-1 relative group"
                  >
                    <button
                      onClick={() => toggleCompare(property.id, property.title)}
                      className="absolute top-3 right-3 z-10 w-8 h-8 glass rounded-full flex items-center justify-center text-[#6F6A62] hover:text-red-400 hover:bg-[#E5DED0] transition-all opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <Link href={`/explore/${property.id}`} className="block">
                      <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden mb-4">
                        <Image src={property.images[0]} alt={property.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <p className="absolute bottom-4 left-4 right-4 text-lg font-serif font-bold text-[#1A1A1A] leading-tight">
                          {property.title}
                        </p>
                      </div>
                      <p className="text-xl font-serif font-bold text-[#D4B06A] mb-4">{property.price}</p>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Empty slots */}
                {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="col-span-1">
                    <div className="aspect-[4/3] rounded-[16px] border border-dashed border-[#D8D1C2] bg-white/[0.02] flex items-center justify-center">
                      <Link href="/explore" className="text-[10px] font-bold tracking-widest uppercase text-[#6F6A62] hover:text-[#D4B06A] transition-colors">
                        + Add Property
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comparison Rows */}
              <div className="mt-8 border-t border-[#D8D1C2]">
                {[
                  { label: "Status", key: "status" },
                  { label: "Location", key: "location" },
                  { label: "Bedrooms", key: (p: any) => p.specs.beds },
                  { label: "Bathrooms", key: (p: any) => p.specs.baths },
                  { label: "Square Footage", key: (p: any) => `${p.specs.sqft.toLocaleString()} sq ft` },
                  { label: "Lot Size", key: (p: any) => p.specs.lot },
                  { label: "Year Built", key: (p: any) => p.specs.year },
                ].map((row, rowIdx) => (
                  <div key={row.label} className="grid grid-cols-4 gap-6 border-b border-[#D8D1C2] py-5 hover:bg-white/[0.01] transition-colors">
                    <div className="col-span-1 flex items-center">
                      <span className="text-[11px] font-bold tracking-widest uppercase text-[#6F6A62]">{row.label}</span>
                    </div>
                    {compareList.map((property) => (
                      <div key={property.id} className="col-span-1">
                        <span className="text-sm text-[#1A1A1A]">
                          {typeof row.key === "function" ? row.key(property) : (property as any)[row.key]}
                        </span>
                      </div>
                    ))}
                    {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                      <div key={`empty-row-${rowIdx}-${idx}`} className="col-span-1" />
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-4 gap-6">
                <div className="col-span-1" />
                {compareList.map((property) => (
                  <div key={property.id} className="col-span-1">
                    <Link
                      href={`/contact?property=${property.id}`}
                      className="block w-full text-center py-4 rounded-[12px] glass text-[10px] font-bold tracking-widest uppercase text-[#1A1A1A] hover:text-[#D4B06A] hover:bg-[#E5DED0] transition-all"
                    >
                      INQUIRE NOW
                    </Link>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
