import LuxuryNavbar from "@/components/luxury/LuxuryNavbar";
import LuxuryHero from "@/components/luxury/LuxuryHero";
import InventoryPreview from "@/components/luxury/InventoryPreview";
import LuxuryPhilosophy from "@/components/luxury/LuxuryPhilosophy";
import LuxuryFooter from "@/components/luxury/LuxuryFooter";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black selection:bg-amber-500/30">
      <LuxuryNavbar />
      <LuxuryHero />
      <LuxuryPhilosophy />
      <InventoryPreview />
      <LuxuryFooter />
    </main>
  );
}
