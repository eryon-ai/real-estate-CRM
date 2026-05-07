"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/realist/Navbar";
import Footer from "@/components/realist/Footer";
import { AnimatedSection, MagneticHover } from "@/components/realist/AnimatedSection";
import { CheckCircle2 } from "lucide-react";
import { ease } from "@/lib/animations";

const propertyTypes = ["Villa", "Apartment", "House", "Penthouse", "Commercial", "Land"];

export default function SubmitPropertyPage() {
  const [formData, setFormData] = useState({
    ownerName: "", ownerEmail: "", ownerPhone: "",
    propertyTitle: "", propertyAddress: "", propertyType: "",
    status: "FOR SALE", price: "", bedrooms: "", bathrooms: "", sqft: "",
    description: "", imageUrls: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (key: string, value: string) => setFormData((s) => ({ ...s, [key]: value }));

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#F4F1E8]">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: ease.apple }}>
            <CheckCircle2 className="w-20 h-20 text-[#D4B06A] mx-auto mb-6" />
            <h1 className="text-4xl font-serif font-bold tracking-tighter mb-4 text-[#1A1A1A]">Submission <span className="italic text-[#D4B06A]">Received</span></h1>
            <p className="text-[#6F6A62] text-lg max-w-md mx-auto">
              Thank you! One of our agents will review your property and be in touch within 24 hours.
            </p>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F1E8]">
      <Navbar />

      <div className="pt-36 pb-24 px-6 lg:px-10 max-w-screen-xl mx-auto">
        <AnimatedSection className="mb-16">
          <p className="text-[10px] font-bold tracking-[0.4em] text-[#D4B06A]/50 uppercase mb-3">List with Realist</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter">
            Submit a <span className="italic text-[#D4B06A]">Property</span>
          </h1>
        </AnimatedSection>

        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-2"><SectionTitle num="01" title="Owner Information" /></div>
          <FormField label="Full Name" placeholder="John Doe" value={formData.ownerName} onChange={(v) => update("ownerName", v)} required />
          <FormField label="Email Address" type="email" placeholder="john@example.com" value={formData.ownerEmail} onChange={(v) => update("ownerEmail", v)} required />
          <FormField label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" value={formData.ownerPhone} onChange={(v) => update("ownerPhone", v)} />

          <div className="lg:col-span-2 mt-6"><SectionTitle num="02" title="Property Details" /></div>
          <FormField label="Property Title" placeholder="e.g., Oakwood Estate" value={formData.propertyTitle} onChange={(v) => update("propertyTitle", v)} required />
          <FormField label="Full Address" placeholder="123 Main St, Beverly Hills, CA" value={formData.propertyAddress} onChange={(v) => update("propertyAddress", v)} required />

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold tracking-widest text-[#D4B06A]/40 uppercase">Property Type</label>
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map((type) => (
                <button type="button" key={type} onClick={() => update("propertyType", type)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    formData.propertyType === type
                      ? "bg-gradient-to-br from-[#D4B06A] to-[#B7C58E] text-[#FFFFFF]"
                      : "glass text-[#6F6A62] hover:text-[#D4B06A]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold tracking-widest text-[#D4B06A]/40 uppercase">Listing Status</label>
            <div className="flex gap-3">
              {["FOR SALE", "FOR RENT"].map((s) => (
                <button type="button" key={s} onClick={() => update("status", s)}
                  className={`px-5 py-2.5 rounded-full text-[11px] font-bold tracking-widest transition-all duration-300 ${
                    formData.status === s
                      ? "bg-gradient-to-br from-[#D4B06A] to-[#B7C58E] text-[#FFFFFF]"
                      : "glass text-[#6F6A62]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 mt-6"><SectionTitle num="03" title="Property Specifications" /></div>
          <FormField label="Asking Price" placeholder="e.g., $4,500,000" value={formData.price} onChange={(v) => update("price", v)} required />
          <FormField label="Bedrooms" type="number" placeholder="4" value={formData.bedrooms} onChange={(v) => update("bedrooms", v)} />
          <FormField label="Bathrooms" type="number" placeholder="3" value={formData.bathrooms} onChange={(v) => update("bathrooms", v)} />
          <FormField label="Square Footage" type="number" placeholder="3500" value={formData.sqft} onChange={(v) => update("sqft", v)} />

          <div className="lg:col-span-2">
            <label className="block text-[10px] font-bold tracking-widest text-[#D4B06A]/40 uppercase mb-2">Description</label>
            <textarea rows={5} placeholder="Describe the property..." value={formData.description} onChange={(e) => update("description", e.target.value)}
              className="w-full bg-[#ECE7DC] border border-[#D8D1C2] text-[#1A1A1A] placeholder:text-[#6F6A62] rounded-[20px] px-5 py-4 text-sm outline-none focus:border-[#D4B06A]/30 focus:shadow-[0_0_20px_rgba(200, 169, 107,0.1)] transition-all resize-none" />
          </div>

          <div className="lg:col-span-2 mt-4">
            <MagneticHover strength={0.06}>
              <button type="submit" className="w-full md:w-auto bg-gradient-to-br from-[#D4B06A] to-[#B7C58E] text-[#FFFFFF] text-[11px] font-bold tracking-widest uppercase px-10 py-5 rounded-full hover:shadow-[0_0_30px_rgba(200, 169, 107,0.3)] transition-shadow">
                SUBMIT PROPERTY FOR REVIEW
              </button>
            </MagneticHover>
          </div>
        </form>
      </div>

      <Footer />
    </main>
  );
}

function SectionTitle({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-4 border-b border-[#D8D1C2] pb-5">
      <span className="text-3xl font-serif font-bold tracking-tighter text-[#D4B06A]/20">{num}</span>
      <h2 className="text-2xl font-serif font-bold tracking-tighter text-[#1A1A1A]">{title}</h2>
    </div>
  );
}

function FormField({ label, placeholder, value, onChange, type = "text", required = false }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold tracking-widest text-[#D4B06A]/40 uppercase">{label}</label>
      <input type={type} placeholder={placeholder} value={value} required={required} onChange={(e) => onChange(e.target.value)}
        className="bg-[#ECE7DC] border border-[#D8D1C2] text-[#1A1A1A] placeholder:text-[#6F6A62] rounded-[20px] px-5 py-4 text-sm outline-none focus:border-[#D4B06A]/30 focus:shadow-[0_0_20px_rgba(200, 169, 107,0.1)] transition-all" />
    </div>
  );
}
