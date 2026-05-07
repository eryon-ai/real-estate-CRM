import Link from "next/link";
import { GoldDivider } from "./AnimatedSection";

export default function Footer() {
  return (
    <footer className="bg-[#0C0A07] text-[#1A1A1A] relative overflow-hidden">
      {/* Giant brand watermark */}
      <div className="py-20 border-b border-[#D8D1C2] overflow-hidden">
        <p className="text-[18vw] font-serif font-bold tracking-tighter leading-none text-gold-gradient opacity-[0.06] select-none text-center">
          REALIST
        </p>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-12">
          <div>
            <p className="text-[10px] font-bold tracking-widest text-[#D4B06A]/50 mb-5">COMPANY</p>
            <ul className="space-y-3 text-sm text-[#6F6A62]">
              <li><Link href="/about" className="hover:text-[#D4B06A] transition-colors duration-300">About Us</Link></li>
              <li><Link href="/journal" className="hover:text-[#D4B06A] transition-colors duration-300">Journal</Link></li>
              <li><Link href="/admin" className="hover:text-[#D4B06A] transition-colors duration-300">Agent Login</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-widest text-[#D4B06A]/50 mb-5">PROPERTIES</p>
            <ul className="space-y-3 text-sm text-[#6F6A62]">
              <li><Link href="/explore" className="hover:text-[#D4B06A] transition-colors duration-300">All Listings</Link></li>
              <li><Link href="/explore" className="hover:text-[#D4B06A] transition-colors duration-300">For Sale</Link></li>
              <li><Link href="/explore" className="hover:text-[#D4B06A] transition-colors duration-300">For Rent</Link></li>
              <li><Link href="/submit-property" className="hover:text-[#D4B06A] transition-colors duration-300">Submit Property</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-widest text-[#D4B06A]/50 mb-5">CONNECT</p>
            <ul className="space-y-3 text-sm text-[#6F6A62]">
              <li><a href="#" className="hover:text-[#D4B06A] transition-colors duration-300">Instagram</a></li>
              <li><a href="#" className="hover:text-[#D4B06A] transition-colors duration-300">Twitter / X</a></li>
              <li><a href="#" className="hover:text-[#D4B06A] transition-colors duration-300">LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-widest text-[#D4B06A]/50 mb-5">CONTACT</p>
            <p className="text-sm text-[#6F6A62] leading-relaxed">
              private@realist.com<br />
              +1 (800) 555-LUXE
            </p>
          </div>
        </div>

        <GoldDivider />

        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold tracking-widest text-[#1A1A1A]/15">
          <span>© 2026 REALIST. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-8">
            <span className="hover:text-[#6F6A62] cursor-pointer transition-colors">PRIVACY POLICY</span>
            <span className="hover:text-[#6F6A62] cursor-pointer transition-colors">TERMS OF ACCESS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
