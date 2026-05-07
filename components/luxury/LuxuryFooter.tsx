"use client";

export default function LuxuryFooter() {
  return (
    <footer className="bg-black text-[#1A1A1A] py-20 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
        <div className="max-w-sm">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
              <span className="text-[#FFFFFF] font-serif font-bold text-sm leading-none">E</span>
            </div>
            <span className="font-serif text-xl font-semibold tracking-wider">ERYON</span>
          </div>
          <p className="text-[#6F6A62] font-light text-sm leading-relaxed">
            Eryon Private Management is a boutique real estate firm specializing in the acquisition and management of luxury architectural assets worldwide.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-24">
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-[#6F6A62] font-bold mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm font-light text-[#6F6A62]">
              <li><a href="#" className="hover:text-[#1A1A1A] transition-colors">Inventory</a></li>
              <li><a href="#" className="hover:text-[#1A1A1A] transition-colors">Locations</a></li>
              <li><a href="#" className="hover:text-[#1A1A1A] transition-colors">Philosophy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-[#6F6A62] font-bold mb-6">Admin</h4>
            <ul className="space-y-4 text-sm font-light text-[#6F6A62]">
              <li><a href="/admin" className="hover:text-[#1A1A1A] transition-colors">CRM Login</a></li>
              <li><a href="#" className="hover:text-[#1A1A1A] transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-[#1A1A1A] transition-colors">Support</a></li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-[10px] uppercase tracking-widest text-[#6F6A62] font-bold mb-6">Contact</h4>
            <p className="text-sm font-light text-[#6F6A62] leading-relaxed italic">
              private@eryon.com<br />
              +1 800 555 LUXE
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-[#6F6A62]">
        <span>© 2026 Eryon Management</span>
        <div className="flex gap-8">
          <span>Privacy Policy</span>
          <span>Terms of Access</span>
        </div>
      </div>
    </footer>
  );
}
