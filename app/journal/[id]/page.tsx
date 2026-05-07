"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import Navbar from "@/components/realist/Navbar";
import Footer from "@/components/realist/Footer";
import { AnimatedSection, GoldDivider } from "@/components/realist/AnimatedSection";
import { journalPosts } from "@/lib/data";
import { ease } from "@/lib/animations";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import NotFound from "@/app/not-found";

export default function JournalPostPage() {
  const { id } = useParams();
  const post = journalPosts.find((p) => p.id === id);

  if (!post) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen bg-[#F4F1E8]">
      <Navbar />

      {/* Hero Image */}
      <div className="relative w-full h-[60vh] md:h-[70vh] min-h-[400px] mt-24 bg-[#ECE7DC]">
        <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4F1E8] via-black/40 to-black/20" />
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-10 -mt-32 relative z-10 pb-24">
        <Link href="/journal" className="inline-flex items-center gap-2 text-sm text-[#6F6A62] hover:text-[#D4B06A] mb-8 group transition-colors">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Journal
        </Link>

        <AnimatedSection>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="glass px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest text-[#D4B06A] uppercase">
              {post.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#6F6A62] font-medium tracking-widest uppercase">
              <Calendar className="w-3.5 h-3.5" /> {post.date}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#6F6A62] font-medium tracking-widest uppercase">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tighter text-[#1A1A1A] mb-8 leading-tight">
            {post.title}
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="prose prose-invert prose-lg max-w-none text-[#6F6A62]">
          <p className="text-xl leading-relaxed text-[#1A1A1A] italic font-serif mb-10">
            {post.excerpt}
          </p>
          
          <p className="mb-6">
            The luxury real estate market is constantly evolving, with new trends emerging that redefine what it means to live in unparalleled comfort and style. In {new Date().getFullYear()}, we are seeing a significant shift towards properties that offer not just opulence, but holistic living experiences. Buyers are increasingly looking for homes that blend seamlessly with their natural surroundings while providing state-of-the-art technological integrations.
          </p>
          
          <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mt-12 mb-6">Architectural Innovation</h2>
          
          <p className="mb-6">
            Contemporary luxury homes are pushing the boundaries of architectural design. We're observing a departure from traditional, compartmentalized layouts in favor of expansive, open-concept spaces that prioritize natural light and fluid movement. Floor-to-ceiling glass walls that retract to merge indoor and outdoor living areas are no longer just a luxury feature; they are becoming an expected standard in high-end properties.
          </p>

          <div className="relative aspect-[16/9] w-full my-12 rounded-[24px] overflow-hidden">
            <Image src={post.image} alt="Detail view" fill className="object-cover scale-105" />
          </div>

          <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mt-12 mb-6">Sustainable Luxury</h2>
          
          <p className="mb-6">
            Sustainability is no longer at odds with luxury. Discerning buyers now demand eco-friendly features integrated flawlessly into the design. This includes advanced solar power systems that are architecturally invisible, smart climate control systems that learn the occupants' preferences, and the use of sustainably sourced, rare materials that offer both unique aesthetics and environmental consciousness.
          </p>
          
          <p className="mb-6">
            As we move forward, the definition of luxury will continue to expand, encompassing not just what a home looks like, but how it enhances the well-being of those who live within its walls. The most coveted properties will be those that offer a sanctuary from the fast-paced modern world, without sacrificing any of its conveniences.
          </p>
        </AnimatedSection>

        <GoldDivider className="my-16" />

        {/* Share & Next */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-bold tracking-widest text-[#6F6A62] uppercase">
            Share this article
          </p>
          <div className="flex gap-3">
            {["Twitter", "LinkedIn", "Facebook"].map((platform) => (
              <button key={platform} className="glass px-6 py-3 rounded-full text-xs font-bold text-[#6F6A62] hover:text-[#D4B06A] transition-colors">
                {platform}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
