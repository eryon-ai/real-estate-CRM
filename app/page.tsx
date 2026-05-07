import RealistingNavbar from "@/components/luxury/RealistingNavbar";
import RealistingHero from "@/components/luxury/RealistingHero";
import RealistingFilters from "@/components/luxury/RealistingFilters";
import RealistingPropertyCard from "@/components/luxury/RealistingPropertyCard";

const listings = [
  {
    title: "Oakwood Estate",
    location: "BEVERLY HILLS, CA",
    price: "$4,500,000",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1000",
    type: "FOR SALE" as const
  },
  {
    title: "Azure Penthouse",
    location: "NEW YORK, NY",
    price: "$12,000/mo",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    type: "FOR RENT" as const
  },
  {
    title: "The Glass House",
    location: "MALIBU, CA",
    price: "$8,200,000",
    image: "https://images.unsplash.com/photo-1600596542815-e32c8ec0486d?auto=format&fit=crop&q=80&w=1000",
    type: "FOR SALE" as const
  },
  {
    title: "Shadow heights",
    location: "AUSTIN, TX",
    price: "$3,100,000",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000",
    type: "FOR SALE" as const
  }
];

export default function Home() {
  return (
    <main className="min-h-screen pb-20">
      <RealistingNavbar />
      <RealistingHero />
      <RealistingFilters />
      
      <section className="px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {listings.map((listing) => (
            <RealistingPropertyCard key={listing.title} {...listing} />
          ))}
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="mt-32 px-6 text-center border-t border-black/5 pt-20">
        <h2 className="text-[12vw] font-bold tracking-tighter opacity-10 select-none">REALIST.</h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-12 text-xs font-bold uppercase tracking-widest text-black/40">
          <p>© 2026 REALIST ARCHIVE</p>
          <div className="flex gap-12">
            <a href="#" className="hover:text-black">INSTAGRAM</a>
            <a href="#" className="hover:text-black">TWITTER</a>
            <a href="#" className="hover:text-black">LINKEDIN</a>
          </div>
          <a href="/admin" className="hover:text-black underline underline-offset-8">ACCESS CRM</a>
        </div>
      </footer>
    </main>
  );
}
