"use client";

import { motion } from "framer-motion";

export default function LuxuryPhilosophy() {
  return (
    <section className="py-40 bg-white text-[#FFFFFF] overflow-hidden">
      <div className="max-w-5xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="text-center"
        >
          <span className="text-slate-400 font-light tracking-[0.4em] uppercase text-[10px] mb-12 block">The Eryon Philosophy</span>
          <h2 className="text-3xl md:text-5xl font-serif leading-relaxed font-light mb-16">
            We believe that <span className="italic">extraordinary properties</span> require an extraordinary approach. Eryon provides the bridge between architectural vision and legacy ownership.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-left border-t border-slate-100 pt-16">
            <div>
              <span className="text-amber-600 font-serif italic text-2xl mb-4 block">01</span>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-4">Unrivaled Privacy</h4>
              <p className="text-slate-500 font-light text-sm leading-relaxed">
                Our platform is exclusively designed for high-value transactions where discretion is the primary currency.
              </p>
            </div>
            <div>
              <span className="text-amber-600 font-serif italic text-2xl mb-4 block">02</span>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-4">Curated Excellence</h4>
              <p className="text-slate-500 font-light text-sm leading-relaxed">
                Every listing is hand-vetted to ensure it meets our strict criteria for architectural integrity and location prestige.
              </p>
            </div>
            <div>
              <span className="text-amber-600 font-serif italic text-2xl mb-4 block">03</span>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-4">Legacy Assets</h4>
              <p className="text-slate-500 font-light text-sm leading-relaxed">
                We manage properties that aren&apos;t just homes, but intergenerational assets that define skylines and coastal horizons.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
