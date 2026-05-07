"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/realist/Navbar";
import Footer from "@/components/realist/Footer";
import { AnimatedSection, GoldDivider, MagneticHover } from "@/components/realist/AnimatedSection";
import { ease } from "@/lib/animations";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { useStore } from "@/lib/store";

const agents = [
  { name: "Harvey Specter", role: "Senior Partner", phone: "+1 (310) 555-0102", email: "harvey@realist.com", avatar: "https://i.pravatar.cc/150?u=2" },
  { name: "Donna Paulsen", role: "Sales Director", phone: "+1 (239) 555-0103", email: "donna@realist.com", avatar: "https://i.pravatar.cc/150?u=3" },
  { name: "Mike Ross", role: "Acquisition Lead", phone: "+1 (512) 555-0101", email: "mike@realist.com", avatar: "https://i.pravatar.cc/150?u=1" },
];

export default function ContactPage() {
  const { addToast } = useStore();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast("Message sent! We'll be in touch shortly.", "success");
  };

  return (
    <main className="min-h-screen bg-[#F4F1E8]">
      <Navbar />

      <div className="pt-36 pb-24 px-6 lg:px-10 max-w-screen-xl mx-auto">
        <AnimatedSection className="mb-20">
          <p className="text-[10px] font-bold tracking-[0.4em] text-[#D4B06A]/50 uppercase mb-3">Get in Touch</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter">
            Let&apos;s <span className="italic text-[#D4B06A]">Talk</span>
          </h1>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Contact Info */}
          <div className="space-y-8">
            <AnimatedSection>
              <h2 className="text-2xl font-serif font-bold tracking-tighter mb-6 text-[#1A1A1A]">Our <span className="italic text-[#D4B06A]">Offices</span></h2>
              {[
                { city: "Beverly Hills", address: "9100 Wilshire Blvd, Suite 200, Beverly Hills, CA 90210", phone: "+1 (310) 555-0100" },
                { city: "New York", address: "432 Park Avenue, Floor 45, New York, NY 10022", phone: "+1 (212) 555-0200" },
              ].map((office) => (
                <div key={office.city} className="glass rounded-[20px] p-6 mb-4">
                  <p className="text-[10px] font-bold tracking-widest text-[#D4B06A]/50 uppercase mb-2">{office.city}</p>
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin className="w-4 h-4 text-[#D4B06A]/40 shrink-0 mt-0.5" />
                    <p className="text-sm text-[#6F6A62]">{office.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#D4B06A]/40 shrink-0" />
                    <a href={`tel:${office.phone}`} className="text-sm text-[#6F6A62] hover:text-[#D4B06A] transition-colors">{office.phone}</a>
                  </div>
                </div>
              ))}
            </AnimatedSection>

            <div className="flex flex-col gap-3">
              {[
                { icon: Mail, label: "Email", value: "private@realist.com" },
                { icon: Clock, label: "Hours", value: "Mon–Sat: 9AM–7PM EST" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 glass rounded-full flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#D4B06A]/60" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-[#6F6A62] uppercase">{label}</p>
                    <p className="text-sm text-[#6F6A62]">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={`https://wa.me/919999999999?text=${encodeURIComponent("Hi! I'd like to speak with an agent.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366]/15 border border-[#25D366]/20 text-[#25D366] px-5 py-3.5 rounded-full text-sm font-bold hover:bg-[#25D366]/25 transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: ease.apple }}
            className="glass rounded-[32px] p-8 gold-glow"
          >
            {submitted ? (
              <div className="text-center py-12">
                <p className="text-5xl mb-4">✓</p>
                <h3 className="text-2xl font-serif font-bold text-[#D4B06A] mb-2">Message Sent!</h3>
                <p className="text-[#6F6A62]">One of our agents will reach out within the hour.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-serif font-bold tracking-tighter mb-6 text-[#1A1A1A]">Send a <span className="text-[#D4B06A] italic">Message</span></h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {[
                    { name: "name", placeholder: "Full Name", type: "text" },
                    { name: "email", placeholder: "Email Address", type: "email" },
                    { name: "phone", placeholder: "Phone Number", type: "tel" },
                  ].map((field) => (
                    <input key={field.name} type={field.type} placeholder={field.placeholder} required
                      className="bg-[#ECE7DC] border border-[#D8D1C2] text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 rounded-[16px] px-5 py-4 text-sm outline-none focus:border-[#D4B06A]/40 transition-colors" />
                  ))}
                  <select className="bg-[#ECE7DC] border border-[#D8D1C2] text-[#6F6A62] rounded-[16px] px-5 py-4 text-sm outline-none focus:border-[#D4B06A]/40 transition-colors">
                    <option value="">I am a...</option>
                    <option>Buyer</option>
                    <option>Seller</option>
                    <option>Investor</option>
                    <option>Renter</option>
                  </select>
                  <textarea rows={4} placeholder="Your message..." className="bg-[#ECE7DC] border border-[#D8D1C2] text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 rounded-[16px] px-5 py-4 text-sm outline-none focus:border-[#D4B06A]/40 transition-colors resize-none" />
                  <MagneticHover strength={0.06}>
                    <button type="submit" className="w-full bg-gradient-to-br from-[#D4B06A] to-[#B7C58E] text-[#FFFFFF] text-[11px] font-bold tracking-widest uppercase py-4 rounded-[16px] hover:shadow-[0_0_25px_rgba(200, 169, 107,0.3)] transition-shadow mt-1">
                      SEND MESSAGE
                    </button>
                  </MagneticHover>
                </form>
              </>
            )}
          </motion.div>
        </div>

        <GoldDivider />

        {/* Team */}
        <div className="pt-16">
          <AnimatedSection className="mb-10">
            <h2 className="text-3xl font-serif font-bold tracking-tighter">Meet the <span className="italic text-[#D4B06A]">Agents</span></h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div key={agent.name} className="glass rounded-[24px] p-6 text-center hover:gold-glow transition-shadow duration-500">
                <img src={agent.avatar} alt={agent.name} className="w-16 h-16 rounded-full mx-auto mb-4 ring-2 ring-[#D4B06A]/20" />
                <p className="font-bold text-[#1A1A1A]">{agent.name}</p>
                <p className="text-[11px] text-[#D4B06A]/50 tracking-widest uppercase mt-1 mb-4">{agent.role}</p>
                <div className="flex gap-3 justify-center">
                  <a href={`tel:${agent.phone}`} className="p-2 glass rounded-full hover:text-[#D4B06A] text-[#6F6A62] transition-colors"><Phone className="w-3.5 h-3.5" /></a>
                  <a href={`mailto:${agent.email}`} className="p-2 glass rounded-full hover:text-[#D4B06A] text-[#6F6A62] transition-colors"><Mail className="w-3.5 h-3.5" /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
