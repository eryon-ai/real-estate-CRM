"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import Navbar from "@/components/realist/Navbar";
import Footer from "@/components/realist/Footer";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/realist/AnimatedSection";
import PropertyCard from "@/components/realist/PropertyCard";
import { properties } from "@/lib/data";
import { ease } from "@/lib/animations";
import { ArrowLeft, Phone, Mail, Instagram, Linkedin } from "lucide-react";
import NotFound from "@/app/not-found";

export default function AgentProfilePage() {
  const { id } = useParams();
  
  // Find agent from properties data based on some mock logic since we don't have a direct agent list with IDs
  const agentNameMapping: Record<string, string> = {
    "harvey-specter": "Harvey Specter",
    "donna-paulsen": "Donna Paulsen",
    "mike-ross": "Mike Ross",
  };
  
  const agentName = agentNameMapping[id as string];
  const agentProperties = properties.filter((p) => p.agent.name === agentName);
  
  if (!agentName || agentProperties.length === 0) {
    return <NotFound />;
  }

  const agent = agentProperties[0].agent;

  return (
    <main className="min-h-screen bg-[#F4F1E8] flex flex-col">
      <Navbar />

      <div className="flex-grow pt-36 pb-24 px-6 lg:px-10 max-w-screen-xl mx-auto w-full">
        <Link href="/contact" className="inline-flex items-center gap-2 text-sm text-[#6F6A62] hover:text-[#D4B06A] mb-12 group transition-colors">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Team
        </Link>

        <div className="flex flex-col lg:flex-row gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: ease.apple }}
            className="w-full lg:w-1/3 aspect-[4/5] relative rounded-[32px] overflow-hidden shadow-luxury shrink-0"
          >
            <Image src={agent.avatar.replace("150", "600")} alt={agent.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>

          <div className="flex-1 flex flex-col justify-center">
            <AnimatedSection>
              <p className="text-[10px] font-bold tracking-[0.4em] text-[#D4B06A]/50 uppercase mb-3">Senior Partner</p>
              <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter text-[#1A1A1A] mb-6">
                {agent.name}
              </h1>
              <p className="text-[#6F6A62] text-lg leading-relaxed mb-8 max-w-2xl">
                With over a decade of experience in the luxury real estate market, {agent.name.split(" ")[0]} has built a reputation for providing unparalleled service to an exclusive clientele. Specializing in high-end residential properties and architectural masterpieces, they bring a wealth of knowledge, integrity, and discretion to every transaction.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <a href={`tel:${agent.phone}`} className="inline-flex items-center gap-3 bg-[#ECE7DC] hover:bg-[#E5DED0] text-[#1A1A1A] px-6 py-3.5 rounded-full text-sm font-bold transition-colors">
                  <Phone className="w-4 h-4 text-[#D4B06A]" /> {agent.phone}
                </a>
                <a href={`mailto:${agent.email}`} className="inline-flex items-center gap-3 bg-[#ECE7DC] hover:bg-[#E5DED0] text-[#1A1A1A] px-6 py-3.5 rounded-full text-sm font-bold transition-colors">
                  <Mail className="w-4 h-4 text-[#D4B06A]" /> Email {agent.name.split(" ")[0]}
                </a>
                <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:text-[#D4B06A] transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:text-[#D4B06A] transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="grid grid-cols-3 gap-6 pt-8 border-t border-[#D8D1C2]">
              <div>
                <p className="text-3xl font-serif font-bold text-[#D4B06A] mb-1">{agentProperties.length}</p>
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#6F6A62]">Active Listings</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-[#D4B06A] mb-1">$45M+</p>
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#6F6A62]">Career Sales</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-[#D4B06A] mb-1">12</p>
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#6F6A62]">Years Exp</p>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Agent's Listings */}
        <div className="border-t border-[#D8D1C2] pt-24">
          <AnimatedSection className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tighter text-[#1A1A1A]">
              Exclusive <span className="italic text-[#D4B06A]">Listings</span>
            </h2>
          </AnimatedSection>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agentProperties.map((property, i) => (
              <StaggerItem key={property.id}>
                <PropertyCard property={property} index={i} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>

      <Footer />
    </main>
  );
}
