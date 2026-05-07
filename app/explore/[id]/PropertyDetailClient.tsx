"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/realist/Navbar";
import Footer from "@/components/realist/Footer";
import { AnimatedSection, MagneticHover, StaggerContainer, StaggerItem } from "@/components/realist/AnimatedSection";
import { type Property, properties } from "@/lib/data";
import { ease } from "@/lib/animations";
import { useStore } from "@/lib/store";
import PropertyCard from "@/components/realist/PropertyCard";
import { useEffect } from "react";
import { MapPin, BedDouble, Bath, Square, Calendar, ChevronLeft, ChevronRight, Phone, Mail, ArrowLeft } from "lucide-react";

export default function PropertyDetailClient({ property }: { property: Property }) {
  const [activeImage, setActiveImage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const { addRecentlyViewed, recentlyViewed } = useStore();

  useEffect(() => {
    addRecentlyViewed(property.id);
  }, [property.id, addRecentlyViewed]);

  const similarProperties = properties
    .filter((p) => p.id !== property.id && p.location.includes(property.location.split(",")[0]))
    .slice(0, 3);
  
  if (similarProperties.length === 0) {
    similarProperties.push(...properties.filter(p => p.id !== property.id).slice(0, 3));
  }

  const recentList = properties.filter((p) => recentlyViewed.includes(p.id) && p.id !== property.id).slice(0, 3);

  const tagStyle = property.status === "FOR SALE"
    ? "bg-[#D4B06A]/15 text-[#B7C58E] border border-[#D4B06A]/20"
    : "bg-white/[0.06] text-[#1A1A1A]/70 border border-white/10";

  return (
    <main className="min-h-screen bg-[#F4F1E8]">
      <Navbar />

      {/* Gallery */}
      <div className="pt-24">
        <div className="relative w-full aspect-[16/8] overflow-hidden bg-[#ECE7DC]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: ease.apple }}
              className="absolute inset-0"
            >
              <Image src={property.images[activeImage]} alt={`${property.title} — Image ${activeImage + 1}`} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/30" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 flex items-center justify-between px-6 z-10">
            <button onClick={() => setActiveImage((i) => (i - 1 + property.images.length) % property.images.length)} className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-[#E5DED0] transition-colors">
              <ChevronLeft className="w-5 h-5 text-[#6F6A62]" />
            </button>
            <button onClick={() => setActiveImage((i) => (i + 1) % property.images.length)} className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-[#E5DED0] transition-colors">
              <ChevronRight className="w-5 h-5 text-[#6F6A62]" />
            </button>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {property.images.map((_, i) => (
              <button key={i} onClick={() => setActiveImage(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeImage ? "bg-[#D4B06A] w-8" : "bg-white/20 w-1.5"}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">
          <div>
            <Link href="/explore" className="inline-flex items-center gap-2 text-sm text-[#1A1A1A]/25 hover:text-[#D4B06A] mb-8 group transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Listings
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md ${tagStyle}`}>{property.status}</span>
            </div>

            <AnimatedSection>
              <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tighter mb-2 text-[#1A1A1A]">{property.title}</h1>
              <p className="text-xl text-[#6F6A62] font-medium mb-3 italic font-serif">{property.subtitle}</p>
              <div className="flex items-center gap-2 text-sm text-[#6F6A62] mb-10">
                <MapPin className="w-4 h-4 text-[#D4B06A]/40" /> {property.location}
              </div>
            </AnimatedSection>

            {/* Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
              {[
                { icon: BedDouble, label: "Bedrooms", value: property.specs.beds },
                { icon: Bath, label: "Bathrooms", value: property.specs.baths },
                { icon: Square, label: "Square Feet", value: property.specs.sqft.toLocaleString() },
                { icon: Calendar, label: "Year Built", value: property.specs.built },
              ].map(({ icon: Icon, label, value }) => (
                <motion.div key={label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-[20px] p-5 text-center">
                  <Icon className="w-5 h-5 mx-auto mb-2 text-[#D4B06A]/40" />
                  <p className="text-[10px] font-bold tracking-widest text-[#6F6A62] uppercase mb-1">{label}</p>
                  <p className="text-lg font-bold text-[#1A1A1A]">{value}</p>
                </motion.div>
              ))}
            </div>

            <AnimatedSection className="mb-12">
              <h2 className="text-2xl font-serif font-bold tracking-tighter mb-4 text-[#1A1A1A]">About This <span className="text-[#D4B06A] italic">Property</span></h2>
              <p className="text-base text-[#6F6A62] leading-relaxed">{property.description}</p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-2xl font-serif font-bold tracking-tighter mb-6 text-[#1A1A1A]">Amenities</h2>
              <div className="flex flex-wrap gap-3">
                {property.amenities.map((amenity) => (
                  <span key={amenity} className="glass px-4 py-2.5 rounded-full text-sm font-bold text-[#6F6A62] hover:text-[#D4B06A] hover:border-[#D4B06A]/20 transition-colors cursor-default">
                    {amenity}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: ease.apple }} className="glass rounded-[32px] p-8 gold-glow">
              <div className="mb-6">
                <p className="text-[10px] font-bold tracking-widest text-[#D4B06A]/50 uppercase mb-1">Asking Price</p>
                <p className="text-3xl font-serif font-bold tracking-tighter text-gold-gradient">{property.price}</p>
              </div>

              <div className="flex items-center gap-4 mb-8 p-4 bg-[#ECE7DC] rounded-[20px] border border-[#D8D1C2]">
                <Image src={property.agent.avatar} alt={property.agent.name} width={52} height={52} className="rounded-full" />
                <div>
                  <p className="font-bold text-sm text-[#1A1A1A]">{property.agent.name}</p>
                  <p className="text-xs text-[#6F6A62]">Listing Agent</p>
                </div>
                <div className="flex gap-2 ml-auto">
                  <a href={`tel:${property.agent.phone}`} className="p-2.5 glass rounded-full hover:bg-[#D4B06A]/10 hover:text-[#D4B06A] transition-colors text-[#6F6A62]"><Phone className="w-4 h-4" /></a>
                  <a href={`mailto:${property.agent.email}`} className="p-2.5 glass rounded-full hover:bg-[#D4B06A]/10 hover:text-[#D4B06A] transition-colors text-[#6F6A62]"><Mail className="w-4 h-4" /></a>
                </div>
              </div>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <p className="text-4xl mb-3">✓</p>
                  <p className="font-serif font-bold text-lg text-[#D4B06A]">Request Sent!</p>
                  <p className="text-[#6F6A62] text-sm mt-1">We&apos;ll be in touch within the hour.</p>
                </motion.div>
              ) : (
                <>
                  <h3 className="font-serif font-bold text-lg tracking-tighter mb-5 text-[#1A1A1A]">Arrange a <span className="text-[#D4B06A] italic">Tour</span></h3>
                  <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                    <input type="text" placeholder="Your Name" required className="bg-[#ECE7DC] border border-[#D8D1C2] text-[#1A1A1A] placeholder:text-[#6F6A62] rounded-[14px] px-4 py-3.5 text-sm outline-none focus:border-[#D4B06A]/30 transition-colors" />
                    <input type="email" placeholder="Email Address" required className="bg-[#ECE7DC] border border-[#D8D1C2] text-[#1A1A1A] placeholder:text-[#6F6A62] rounded-[14px] px-4 py-3.5 text-sm outline-none focus:border-[#D4B06A]/30 transition-colors" />
                    <input type="date" className="bg-[#ECE7DC] border border-[#D8D1C2] text-[#6F6A62] rounded-[14px] px-4 py-3.5 text-sm outline-none focus:border-[#D4B06A]/30 transition-colors" />
                    <MagneticHover strength={0.08}>
                      <button type="submit" className="w-full bg-gradient-to-br from-[#D4B06A] to-[#B7C58E] text-[#FFFFFF] text-[11px] font-bold tracking-widest uppercase px-6 py-4 rounded-[14px] hover:shadow-[0_0_25px_rgba(200, 169, 107,0.3)] transition-shadow mt-2">
                        SCHEDULE VIEWING
                      </button>
                    </MagneticHover>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── SIMILAR PROPERTIES ───────────────────────── */}
      <section className="py-24 px-6 lg:px-10 max-w-screen-xl mx-auto border-t border-[#D8D1C2]">
        <div className="flex justify-between items-end mb-12">
          <AnimatedSection>
            <p className="text-[10px] font-bold tracking-[0.4em] text-[#D4B06A]/50 uppercase mb-3">You May Also Like</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tighter">Similar <span className="italic text-[#D4B06A]">Properties</span></h2>
          </AnimatedSection>
        </div>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {similarProperties.slice(0, 3).map((p, i) => (
            <StaggerItem key={p.id}>
              <PropertyCard property={p} index={i} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ─── RECENTLY VIEWED ──────────────────────────── */}
      {recentList.length > 0 && (
        <section className="py-24 px-6 lg:px-10 max-w-screen-xl mx-auto border-t border-[#D8D1C2]">
          <AnimatedSection className="mb-12">
            <p className="text-[10px] font-bold tracking-[0.4em] text-[#D4B06A]/50 uppercase mb-3">Your History</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tighter">Recently <span className="italic text-[#D4B06A]">Viewed</span></h2>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentList.map((p, i) => (
              <StaggerItem key={p.id}>
                <PropertyCard property={p} index={i} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}

      <Footer />
    </main>
  );
}
