import LuxuryNavbar from "@/components/luxury/LuxuryNavbar";
import LuxuryHero from "@/components/luxury/LuxuryHero";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black selection:bg-amber-500/30">
      <LuxuryNavbar />
      <LuxuryHero />
    </main>
  );
}
