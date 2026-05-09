"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/realist/Navbar";
import Footer from "@/components/realist/Footer";
import PropertyCard from "@/components/realist/PropertyCard";
import { AnimatedSection, StaggerContainer, StaggerItem, CountUp, GoldDivider, MagneticHover } from "@/components/realist/AnimatedSection";
import { properties, journalPosts } from "@/lib/data";
import { ArrowRight, CheckCircle2, XCircle, Star, ChevronRight } from "lucide-react";
import { ease } from "@/lib/animations";

const recentListings = properties.slice(0, 4);

const services = [
  { num: "01", title: "Buyer Representation", desc: "Expert guidance from search to closing — we fight exclusively for your interests." },
  { num: "02", title: "Luxury Sales", desc: "Curated marketing strategies that attract the right buyers for exceptional properties." },
  { num: "03", title: "Rental Management", desc: "Full-service property management for landlords who demand the best returns." },
  { num: "04", title: "Investment Advisory", desc: "Data-driven market analysis to identify high-yield real estate opportunities." },
];

const comparisonData = [
  { feature: "Direct agent access 24/7", us: true, them: false },
  { feature: "Luxury market specialists", us: true, them: false },
  { feature: "Off-market listings", us: true, them: false },
  { feature: "Professional photography", us: true, them: true },
  { feature: "Transparent pricing", us: true, them: false },
];

const reviews = [
  { name: "Sarah M.", role: "Buyer — Beverly Hills", text: "The most seamless home-buying experience. Harvey found us our dream home in 3 weeks.", rating: 5 },
  { name: "David C.", role: "Seller — New York", text: "Listed Friday, accepted offer Tuesday — at 7% above asking. Simply exceptional.", rating: 5 },
  { name: "The Pearson Group", role: "Investor — Austin", text: "Four properties closed through Realist. The data they provide is unmatched.", rating: 5 },
];

const heroWords = ["buy.", "sell.", "rent."];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F4F1E8] overflow-x-hidden relative">
      {/* Film grain */}
      <div className="fixed inset-0 pointer-events-none z-[60] grain" />

      <Navbar />

      {/* ─── HERO ──────────────────────────────────────── */}
      <section className="relative min-h-[100vh] flex flex-col justify-end pt-28 pb-20 px-6 lg:px-10 overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay pointer-events-none" />

        {/* Ambient gold glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#D4B06A]/[0.03] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[-30%] left-[-20%] w-[50vw] h-[50vw] bg-[#D4B06A]/[0.02] rounded-full blur-[120px] pointer-events-none" />

        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_144509_89e2d612-8af2-45c3-90f4-4831bc60715d.mp4" type="video/mp4" />
          </video>
          {/* Only bottom gradient for smooth transition */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F4F1E8] via-transparent to-transparent z-1" />
        </div>

        {/* Floating property images — gallery mosaic overlapping the video */}
        <div className="absolute top-24 right-0 w-[55vw] max-w-[700px] h-[80vh] hidden lg:block pointer-events-none z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.5, ease: ease.apple }}
            className="absolute top-0 right-16 w-[55%] aspect-[3/2] rounded-[32px] overflow-hidden shadow-luxury animate-float"
          >
            <Image src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800" alt="Featured Property" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 glass rounded-[16px] px-4 py-3">
              <p className="text-[10px] text-[#D4B06A] tracking-widest uppercase font-bold mb-1">Featured</p>
              <p className="font-serif font-bold text-sm text-[#1A1A1A]">Oakwood Estate</p>
              <p className="text-[#D4B06A] font-bold text-sm">$4,500,000</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1.2, ease: ease.apple }}
            className="absolute bottom-[10%] right-[52%] w-[40%] aspect-[3/2] rounded-[24px] overflow-hidden shadow-luxury"
            style={{ animationDelay: '1s' }}
          >
            <Image src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600" alt="Luxury Interior" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1.2, ease: ease.apple }}
            className="absolute bottom-[25%] right-4 w-[35%] aspect-square rounded-[20px] overflow-hidden shadow-luxury"
          >
            <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600" alt="Modern Villa" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>
        </div>

        {/* Hero Text */}
        <div className="relative z-10 max-w-screen-xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: ease.apple }}
            className="text-[11px] font-bold tracking-[0.4em] text-[#D4B06A]/80 uppercase mb-8"
          >
            Est. 2018 · Ultra-Premium Real Estate
          </motion.p>

          {/* Staggered diagonal hero text — FANCY REDESIGN */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.3, delayChildren: 0.5 } }
            }}
            className="mb-12 flex flex-col items-start w-full relative z-20"
          >
            {[
              { text: "buy", italic: false, outline: false, shift: 0 },
              { text: "sell", italic: true, outline: true, shift: 8 },
              { text: "rent", italic: false, outline: false, shift: 16 },
            ].map((word, wi) => (
              <motion.div 
                key={word.text} 
                variants={{
                  hidden: { opacity: 0, x: -50, filter: "blur(20px)" },
                  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="overflow-visible w-full flex items-baseline"
                style={{ 
                  paddingLeft: `${word.shift}vw`,
                }}
              >
                <h1
                  className={`text-[20vw] md:text-[11rem] lg:text-[14rem] font-serif font-bold leading-[0.8] tracking-tighter drop-shadow-2xl flex items-baseline select-none ${
                    word.italic ? "italic pr-4" : ""
                  }`}
                  style={{
                    color: word.outline ? 'transparent' : '#1A1A1A',
                    WebkitTextStroke: word.outline ? '1.5px #1A1A1A' : 'none',
                    mixBlendMode: 'multiply'
                  }}
                >
                  {word.text}
                  <span className="text-[#D4B06A] italic not-italic inline-block ml-[0.02em] leading-none">.</span>
                </h1>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <MagneticHover strength={0.1}>
              <Link
                href="/explore"
                className="inline-flex items-center gap-3 bg-gradient-to-br from-[#D4B06A] to-[#B7C58E] text-[#FFFFFF] text-sm font-bold tracking-widest px-7 py-4 rounded-full hover:shadow-[0_0_30px_rgba(200, 169, 107,0.3)] transition-shadow duration-300 group"
              >
                EXPLORE LISTINGS
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticHover>
            <Link href="/submit-property" className="text-sm font-bold text-[#6F6A62] hover:text-[#D4B06A] flex items-center gap-2 transition-colors">
              List your property <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: ease.apple }}
          className="relative z-10 mt-20 flex flex-wrap gap-12 lg:gap-20"
        >
          {[
            { val: 2.4, prefix: "$", suffix: "B+", label: "TOTAL SALES" },
            { val: 340, suffix: "+", label: "PROPERTIES CLOSED" },
            { val: 98, suffix: "%", label: "CLIENT SATISFACTION" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-serif font-bold text-[#D4B06A]">
                <CountUp target={stat.val} prefix={stat.prefix || ""} suffix={stat.suffix} />
              </p>
              <p className="text-[10px] font-bold tracking-widest text-[#6F6A62] mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ delay: 2, duration: 3, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#6F6A62] rotate-180 [writing-mode:vertical-lr]">Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-[#D4B06A]/30 to-transparent" />
        </motion.div>
      </section>

      {/* ─── MARQUEE ──────────────────────────────────── */}
      <section className="py-6 border-y border-[#D8D1C2] bg-[#1A1A1A] overflow-hidden flex items-center">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex whitespace-nowrap items-center gap-8 text-[11px] font-bold tracking-widest text-[#D4B06A]/60 uppercase"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>JUST LISTED</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4B06A]/40" />
              <span className="text-[#1A1A1A]/60">OAKWOOD ESTATE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4B06A]/40" />
              <span>$4.5M</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4B06A]/40" />
              <span className="text-[#1A1A1A]/60">BEVERLY HILLS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4B06A]/40" />
            </span>
          ))}
        </motion.div>
      </section>

      {/* ─── PRESS LOGOS ──────────────────────────────── */}
      <section className="py-16 px-6 lg:px-10 max-w-screen-xl mx-auto flex flex-col items-center border-b border-[#D8D1C2]">
        <p className="text-[10px] font-bold tracking-[0.4em] text-[#6F6A62] uppercase mb-8">As seen in</p>
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
          {["Forbes", "Vogue", "Wall Street Journal", "Financial Times"].map((press) => (
            <span key={press} className="font-serif font-bold text-xl md:text-2xl text-[#1A1A1A] hover:text-[#D4B06A] transition-colors duration-500">
              {press}
            </span>
          ))}
        </div>
      </section>

      {/* ─── RECENT LISTINGS ──────────────────────────── */}
      <section className="py-28 px-6 lg:px-10 max-w-screen-xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <AnimatedSection>
            <p className="text-[10px] font-bold tracking-[0.4em] text-[#D4B06A]/50 uppercase mb-3">Current Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tighter">Recent <span className="italic text-[#D4B06A]">Listings</span></h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Link href="/explore" className="hidden md:flex items-center gap-2 text-sm font-bold text-[#1A1A1A]/25 hover:text-[#D4B06A] transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {recentListings.map((property, i) => (
            <StaggerItem key={property.id}>
              <PropertyCard property={property} index={i} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <GoldDivider className="max-w-screen-xl mx-auto" />

      {/* ─── NEIGHBORHOODS ────────────────────────────── */}
      <section className="py-28 px-6 lg:px-10 max-w-screen-xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <p className="text-[10px] font-bold tracking-[0.4em] text-[#D4B06A]/50 uppercase mb-3">● Neighborhood</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tighter italic">
            Where you live matters<br />— pick the <span className="text-[#D4B06A]">perfect spot</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Beverly Hills, California", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600" },
            { name: "Malibu Coast", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600" },
            { name: "Upper East Side, NYC", img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&q=80&w=600" },
            { name: "Barton Hills, Austin", img: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?auto=format&fit=crop&q=80&w=600" },
            { name: "SoHo, New York City", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=600" },
            { name: "Pelican Bay, Naples", img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=600" },
          ].map((hood) => (
            <StaggerItem key={hood.name}>
              <Link href="/explore" className="group block">
                <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden bg-[#ECE7DC] mb-4">
                  <Image src={hood.img} alt={hood.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-serif font-bold text-[#1A1A1A] group-hover:text-[#D4B06A] transition-colors">{hood.name}</p>
                  <ChevronRight className="w-4 h-4 text-[#6F6A62] group-hover:text-[#D4B06A] group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <GoldDivider className="max-w-screen-xl mx-auto" />

      {/* ─── SERVICES ─────────────────────────────────── */}
      <section className="py-28 px-6 lg:px-10 relative">
        <div className="absolute inset-0 bg-[#1A1A1A]" />
        <div className="max-w-screen-xl mx-auto relative z-10">
          <AnimatedSection className="mb-16">
            <p className="text-[10px] font-bold tracking-[0.4em] text-[#D4B06A]/50 uppercase mb-3">What We Do</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tighter">Our <span className="italic text-[#D4B06A]">Services</span></h2>
          </AnimatedSection>

          <div className="divide-y divide-white/[0.04]">
            {services.map((service, i) => (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: ease.apple }}
                className="group flex gap-8 lg:gap-12 py-8 cursor-pointer hover:bg-white/[0.02] transition-colors px-4 -mx-4 rounded-[16px]"
              >
                <span className="text-4xl font-serif font-bold tracking-tighter text-[#D4B06A]/15 shrink-0 w-16 group-hover:text-[#D4B06A]/40 transition-colors">
                  {service.num}
                </span>
                <div className="flex-1">
                  <h3 className="text-xl font-serif font-bold tracking-tight mb-2 text-[#1A1A1A] group-hover:text-[#D4B06A] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#6F6A62] leading-relaxed max-w-xl">{service.desc}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#1A1A1A]/10 shrink-0 self-center group-hover:text-[#D4B06A]/60 group-hover:translate-x-1 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPARISON ───────────────────────────────── */}
      <section className="py-28 px-6 lg:px-10">
        <div className="max-w-screen-xl mx-auto">
          <AnimatedSection className="mb-14">
            <p className="text-[10px] font-bold tracking-[0.4em] text-[#D4B06A]/50 uppercase mb-3">Why Realist?</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tighter">The <span className="italic text-[#D4B06A]">Difference</span></h2>
          </AnimatedSection>

          <div className="glass rounded-[32px] overflow-hidden">
            <div className="grid grid-cols-3 text-[11px] font-bold tracking-widest uppercase border-b border-[#D8D1C2]">
              <div className="p-6 text-[#6F6A62]">Feature</div>
              <div className="p-6 text-center bg-[#D4B06A]/10 text-[#D4B06A]">Realist</div>
              <div className="p-6 text-center text-[#6F6A62]">Others</div>
            </div>
            {comparisonData.map((row, i) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="grid grid-cols-3 border-b border-white/[0.03] last:border-0"
              >
                <div className="p-5 pl-6 text-sm font-medium text-[#6F6A62]">{row.feature}</div>
                <div className="p-5 flex justify-center bg-[#D4B06A]/[0.03]">
                  {row.us ? <CheckCircle2 className="w-5 h-5 text-[#D4B06A]" /> : <XCircle className="w-5 h-5 text-[#1A1A1A]/15" />}
                </div>
                <div className="p-5 flex justify-center">
                  {row.them ? <CheckCircle2 className="w-5 h-5 text-[#6F6A62]" /> : <XCircle className="w-5 h-5 text-[#1A1A1A]/10" />}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider className="max-w-screen-xl mx-auto" />

      {/* ─── REVIEWS ──────────────────────────────────── */}
      <section className="py-28 overflow-hidden">
        <div className="px-6 lg:px-10 max-w-screen-xl mx-auto mb-14">
          <AnimatedSection>
            <p className="text-[10px] font-bold tracking-[0.4em] text-[#D4B06A]/50 uppercase mb-3">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tighter">Client <span className="italic text-[#D4B06A]">Stories</span></h2>
          </AnimatedSection>
        </div>

        <div className="flex gap-6 px-6 lg:px-10 overflow-x-auto pb-4 custom-scrollbar">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: ease.apple }}
              className="min-w-[280px] sm:min-w-[340px] max-w-[380px] glass rounded-[24px] p-8 flex flex-col gap-6 hover:gold-glow transition-shadow duration-500"
            >
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#D4B06A] text-[#D4B06A]" />
                ))}
              </div>
              <p className="text-[#6F6A62] leading-relaxed italic font-serif">&ldquo;{review.text}&rdquo;</p>
              <div>
                <p className="font-bold text-[#1A1A1A]">{review.name}</p>
                <p className="text-[11px] text-[#D4B06A]/40 tracking-widest uppercase">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── JOURNAL PREVIEW ──────────────────────────── */}
      <section className="py-28 px-6 lg:px-10 max-w-screen-xl mx-auto">
        <div className="flex justify-between items-end mb-14">
          <AnimatedSection>
            <p className="text-[10px] font-bold tracking-[0.4em] text-[#D4B06A]/50 uppercase mb-3">From the Journal</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tighter">Latest <span className="italic text-[#D4B06A]">Insights</span></h2>
          </AnimatedSection>
          <Link href="/journal" className="hidden md:flex items-center gap-2 text-sm font-bold text-[#1A1A1A]/25 hover:text-[#D4B06A] transition-colors">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {journalPosts.map((post) => (
            <StaggerItem key={post.id}>
              <Link href={`/journal/${post.id}`} className="group block">
                <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden bg-[#ECE7DC] mb-4">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute top-4 left-4 glass text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full text-[#D4B06A]">
                    {post.category}
                  </span>
                </div>
                <p className="text-[10px] font-bold tracking-widest text-[#6F6A62] uppercase mb-2">{post.date} · {post.readTime}</p>
                <h3 className="text-lg font-serif font-bold tracking-tight text-[#1A1A1A] group-hover:text-[#D4B06A] transition-colors">{post.title}</h3>
                <p className="mt-2 text-sm text-[#6F6A62] leading-relaxed line-clamp-2">{post.excerpt}</p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ─── AGENT SPOTLIGHT ────────────────────────────── */}
      <section className="py-28 px-6 lg:px-10 max-w-screen-xl mx-auto relative">
        <div className="absolute inset-0 bg-[#1A1A1A] rounded-[40px]" />
        <div className="relative z-10 flex flex-col md:flex-row gap-12 lg:gap-24 items-center p-8 md:p-16">
          <div className="flex-1 space-y-8">
            <AnimatedSection>
              <p className="text-[10px] font-bold tracking-[0.4em] text-[#D4B06A]/50 uppercase mb-3">Meet the Experts</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tighter text-[#1A1A1A] mb-6">
                Your luxury real estate <span className="italic text-[#D4B06A]">concierge</span>
              </h2>
              <p className="text-[#6F6A62] leading-relaxed text-sm">
                Our elite team of brokers brings decades of experience, unparalleled market knowledge, and an exclusive network to every transaction. We do more than sell properties; we curate lifestyles.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} className="flex gap-8">
              <div>
                <p className="text-3xl font-serif font-bold text-[#D4B06A] mb-1"><CountUp target={15} suffix="+" /></p>
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#6F6A62]">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-[#D4B06A] mb-1"><CountUp target={500} prefix="$" suffix="M" /></p>
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#6F6A62]">Sold in 2025</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <Link href="/contact" className="inline-flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-[#6F6A62] hover:text-[#D4B06A] transition-colors group">
                MEET THE FULL TEAM <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: ease.apple }}
            className="w-full md:w-5/12 aspect-[4/5] relative rounded-[24px] overflow-hidden shadow-luxury"
          >
            <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" alt="Lead Broker" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-serif font-bold text-xl text-[#1A1A1A]">Harvey Specter</p>
              <p className="text-[11px] font-bold tracking-widest uppercase text-[#D4B06A]/80 mt-1">Senior Partner</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── LEAD CAPTURE ─────────────────────────────── */}
      <section className="py-28 px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: ease.apple }}
          className="max-w-screen-xl mx-auto glass rounded-[40px] p-12 md:p-20 flex flex-col md:flex-row gap-12 items-center gold-glow"
        >
          <div className="flex-1">
            <p className="text-[10px] font-bold tracking-[0.4em] text-[#D4B06A]/50 uppercase mb-4">Get Started Today</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tighter text-[#1A1A1A] mb-4">
              Ready to find your <span className="italic text-[#D4B06A]">perfect property?</span>
            </h2>
            <p className="text-[#6F6A62] leading-relaxed">
              Leave your details and one of our specialists will reach out within the hour.
            </p>
          </div>
          <div className="w-full md:w-auto md:min-w-[360px] flex flex-col gap-3">
            <input type="text" placeholder="Full Name" className="bg-[#ECE7DC] border border-[#D8D1C2] text-[#1A1A1A] placeholder:text-[#6F6A62] rounded-[16px] px-5 py-4 text-sm outline-none focus:border-[#D4B06A]/30 focus:shadow-[0_0_20px_rgba(200, 169, 107,0.1)] transition-all" />
            <input type="email" placeholder="Email Address" className="bg-[#ECE7DC] border border-[#D8D1C2] text-[#1A1A1A] placeholder:text-[#6F6A62] rounded-[16px] px-5 py-4 text-sm outline-none focus:border-[#D4B06A]/30 focus:shadow-[0_0_20px_rgba(200, 169, 107,0.1)] transition-all" />
            <input type="tel" placeholder="Phone Number" className="bg-[#ECE7DC] border border-[#D8D1C2] text-[#1A1A1A] placeholder:text-[#6F6A62] rounded-[16px] px-5 py-4 text-sm outline-none focus:border-[#D4B06A]/30 focus:shadow-[0_0_20px_rgba(200, 169, 107,0.1)] transition-all" />
            <MagneticHover strength={0.08}>
              <button className="w-full bg-gradient-to-br from-[#D4B06A] to-[#B7C58E] text-[#FFFFFF] font-bold text-sm tracking-widest uppercase px-6 py-4 rounded-[16px] hover:shadow-[0_0_30px_rgba(200, 169, 107,0.3)] transition-shadow mt-2">
                SEND REQUEST
              </button>
            </MagneticHover>
          </div>
        </motion.div>
      </section>

      <GoldDivider className="max-w-screen-xl mx-auto" />

      {/* ─── NEWSLETTER SIGNUP ────────────────────────── */}
      <section className="py-24 px-6 lg:px-10 text-center max-w-2xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl font-serif font-bold tracking-tighter text-[#1A1A1A] mb-3">
            Join the <span className="italic text-[#D4B06A]">Inner Circle</span>
          </h2>
          <p className="text-sm text-[#6F6A62] mb-8">
            Receive curated selections of off-market properties and market insights directly to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email Address" className="flex-1 bg-[#ECE7DC] border border-[#D8D1C2] text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 rounded-full px-6 py-4 text-sm outline-none focus:border-[#D4B06A]/40 transition-colors" />
            <button type="submit" className="bg-gradient-to-br from-[#D4B06A] to-[#B7C58E] text-[#FFFFFF] text-[11px] font-bold tracking-widest uppercase px-8 py-4 rounded-full hover:shadow-[0_0_20px_rgba(200, 169, 107,0.3)] transition-shadow whitespace-nowrap">
              SUBSCRIBE
            </button>
          </form>
        </AnimatedSection>
      </section>

      <Footer />
    </main>
  );
}
