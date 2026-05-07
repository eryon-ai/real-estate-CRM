"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, BedDouble, Bath, Square, Heart, GitCompare } from "lucide-react";
import type { Property } from "@/lib/data";
import { ease, cardHover, cardTap } from "@/lib/animations";
import { useStore } from "@/lib/store";

function isNewListing(createdAt?: string) {
  if (!createdAt) return false;
  return (Date.now() - new Date(createdAt).getTime()) < 7 * 24 * 60 * 60 * 1000;
}

export default function PropertyCard({ property, index = 0 }: { property: Property; index?: number }) {
  const { isSaved, isInCompare, toggleSaved, toggleCompare } = useStore();
  const saved = isSaved(property.id);
  const inCompare = isInCompare(property.id);
  const isNew = isNewListing((property as Property & { createdAt?: string }).createdAt);
  const pricePerSqft = property.specs.sqft > 0
    ? Math.round(parseInt(property.price.replace(/[^0-9]/g, "")) / property.specs.sqft).toLocaleString()
    : null;

  const tagStyle =
    property.status === "FOR SALE"
      ? "bg-[#B7C58E]/20 text-[#4F5B31] border border-[#B7C58E]/30"
      : "bg-[#D4B06A]/20 text-[#7D5A2E] border border-[#D4B06A]/30";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: ease.apple }}
      whileHover={cardHover}
      whileTap={cardTap}
      className="relative"
    >
      <Link href={`/explore/${property.id}`} className="group block">
        {/* Image */}
        <div className="relative aspect-[3/2] rounded-[32px] overflow-hidden mb-5 bg-[#ECE7DC]">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-[1.06] transition-transform duration-[1.2s] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {isNew && (
              <span className="text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full bg-[#D4B06A] text-[#FFFFFF]">NEW</span>
            )}
          </div>
          <span className={`absolute top-4 right-4 text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md ${tagStyle}`}>
            {property.status}
          </span>
        </div>

        {/* Location */}
        <div className="px-1 flex items-center gap-1.5 text-[11px] font-bold tracking-widest text-[#1A1A1A]/30 uppercase mb-3">
          <MapPin className="w-3.5 h-3.5 shrink-0 text-[#D4B06A]/40" />
          {property.location}
        </div>

        {/* Specs + Price row */}
        <div className="px-1 flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3 text-[11px] font-bold text-[#1A1A1A]/30 uppercase tracking-widest">
            <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5 text-[#6F6A62]" /> {property.specs.beds}</span>
            <span className="text-[#1A1A1A]/10">•</span>
            <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-[#6F6A62]" /> {property.specs.baths}</span>
            <span className="text-[#1A1A1A]/10">•</span>
            <span className="flex items-center gap-1"><Square className="w-3.5 h-3.5 text-[#6F6A62]" /> {property.specs.sqft.toLocaleString()}</span>
          </div>
          <p className="shrink-0 text-lg font-serif font-bold text-[#D4B06A]">{property.price}</p>
        </div>

        {/* Title */}
        <h3 className="px-1 text-lg font-serif font-bold tracking-tight text-[#1A1A1A] group-hover:text-[#D4B06A] transition-colors duration-300 leading-snug">
          {property.title}
        </h3>

        {/* Price per sqft */}
        {pricePerSqft && (
          <p className="px-1 mt-1.5 text-[10px] font-bold tracking-widest text-[#6F6A62] uppercase">
            ${pricePerSqft}/sqft
          </p>
        )}
      </Link>

      {/* Action buttons — absolute so they don't interfere with link */}
      <div className="absolute top-[calc(40%-60px)] right-8 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" style={{ top: "calc(56% - 100px)" }}>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={(e) => { e.preventDefault(); toggleSaved(property.id, property.title); }}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-luxury ${
            saved
              ? "bg-[#D4B06A] text-[#FFFFFF]"
              : "glass text-[#1A1A1A]/60 hover:text-[#D4B06A]"
          }`}
          aria-label={saved ? "Remove from saved" : "Save property"}
        >
          <Heart className={`w-4 h-4 ${saved ? "fill-black" : ""}`} />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={(e) => { e.preventDefault(); toggleCompare(property.id, property.title); }}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-luxury ${
            inCompare
              ? "bg-[#D4B06A] text-[#FFFFFF]"
              : "glass text-[#1A1A1A]/60 hover:text-[#D4B06A]"
          }`}
          aria-label={inCompare ? "Remove from compare" : "Add to compare"}
        >
          <GitCompare className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}
