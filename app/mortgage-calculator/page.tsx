"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/realist/Navbar";
import Footer from "@/components/realist/Footer";
import { AnimatedSection, CountUp } from "@/components/realist/AnimatedSection";
import { ease } from "@/lib/animations";

export default function MortgageCalculatorPage() {
  const [homePrice, setHomePrice] = useState(1500000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(7.5);
  const [termYears, setTermYears] = useState(30);

  const { monthly, totalPaid, totalInterest, downPaymentAmt, loanAmount } = useMemo(() => {
    const down = (downPaymentPct / 100) * homePrice;
    const loan = homePrice - down;
    const monthly_r = interestRate / 100 / 12;
    const n = termYears * 12;
    const payment = monthly_r === 0 ? loan / n : (loan * monthly_r * Math.pow(1 + monthly_r, n)) / (Math.pow(1 + monthly_r, n) - 1);
    const total = payment * n;
    return {
      monthly: Math.round(payment),
      totalPaid: Math.round(total),
      totalInterest: Math.round(total - loan),
      downPaymentAmt: Math.round(down),
      loanAmount: Math.round(loan),
    };
  }, [homePrice, downPaymentPct, interestRate, termYears]);

  return (
    <main className="min-h-screen bg-[#F4F1E8]">
      <Navbar />

      <div className="pt-36 pb-24 px-6 lg:px-10 max-w-screen-xl mx-auto">
        <AnimatedSection className="mb-16">
          <p className="text-[10px] font-bold tracking-[0.4em] text-[#D4B06A]/50 uppercase mb-3">Plan Your Investment</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter">
            Mortgage <span className="italic text-[#D4B06A]">Calculator</span>
          </h1>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Sliders */}
          <div className="space-y-10">
            {[
              { label: "Home Price", value: homePrice, min: 200000, max: 10000000, step: 50000, set: setHomePrice, format: (v: number) => `$${v.toLocaleString()}` },
              { label: "Down Payment", value: downPaymentPct, min: 5, max: 50, step: 1, set: setDownPaymentPct, format: (v: number) => `${v}%` },
              { label: "Interest Rate", value: interestRate, min: 2, max: 15, step: 0.1, set: setInterestRate, format: (v: number) => `${v.toFixed(1)}%` },
              { label: "Loan Term", value: termYears, min: 5, max: 30, step: 5, set: setTermYears, format: (v: number) => `${v} years` },
            ].map(({ label, value, min, max, step, set, format }) => (
              <motion.div key={label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: ease.apple }}>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[11px] font-bold tracking-widest text-[#6F6A62] uppercase">{label}</label>
                  <span className="text-xl font-serif font-bold text-[#D4B06A]">{format(value)}</span>
                </div>
                <div className="relative">
                  <input type="range" min={min} max={max} step={step} value={value}
                    onChange={(e) => set(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #D4B06A ${((value - min) / (max - min)) * 100}%, rgba(0,0,0,0.04) ${((value - min) / (max - min)) * 100}%)`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: ease.apple }}
            className="glass rounded-[32px] p-8 gold-glow sticky top-28"
          >
            <p className="text-[10px] font-bold tracking-widest text-[#D4B06A]/50 uppercase mb-2">Monthly Payment</p>
            <div className="text-5xl font-serif font-bold text-gold-gradient mb-8">
              ${monthly.toLocaleString()}
            </div>

            <div className="space-y-4 divide-y divide-white/[0.04]">
              {[
                { label: "Home Price", value: `$${homePrice.toLocaleString()}` },
                { label: "Down Payment", value: `$${downPaymentAmt.toLocaleString()} (${downPaymentPct}%)` },
                { label: "Loan Amount", value: `$${loanAmount.toLocaleString()}` },
                { label: "Total Interest", value: `$${totalInterest.toLocaleString()}` },
                { label: "Total Cost", value: `$${totalPaid.toLocaleString()}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-3">
                  <span className="text-sm text-[#6F6A62]">{label}</span>
                  <span className="text-sm font-bold text-[#1A1A1A]">{value}</span>
                </div>
              ))}
            </div>

            <a
              href="/contact"
              className="mt-8 block w-full bg-gradient-to-br from-[#D4B06A] to-[#B7C58E] text-[#FFFFFF] text-[11px] font-bold tracking-widest uppercase py-4 rounded-[16px] text-center hover:shadow-[0_0_25px_rgba(200, 169, 107,0.3)] transition-shadow"
            >
              TALK TO AN AGENT
            </a>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
