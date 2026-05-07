// lib/data.ts — local seed data, no database

export type Property = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  priceRaw: number;
  location: string;
  neighborhood: string;
  city: string;
  status: "FOR SALE" | "FOR RENT";
  featured: boolean;
  specs: { beds: number; baths: number; sqft: number; built: number };
  amenities: string[];
  description: string;
  images: string[];
  agent: { name: string; avatar: string; phone: string; email: string };
};

export type JournalPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  readTime: string;
};

export type Agent = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  listings: number;
  sales: number;
};

export const properties: Property[] = [
  {
    id: "oakwood-estate",
    title: "Oakwood Estate",
    subtitle: "Modern elegance meets nature",
    price: "$4,500,000",
    priceRaw: 4500000,
    location: "12 Oakwood Drive, Beverly Hills",
    neighborhood: "Beverly Hills",
    city: "Los Angeles",
    status: "FOR SALE",
    featured: true,
    specs: { beds: 5, baths: 6, sqft: 5200, built: 2020 },
    amenities: ["Infinity Pool", "Home Cinema", "Smart Home", "Wine Cellar", "6-Car Garage", "Gym"],
    description: "A masterpiece of modern architecture nestled in the hills of Beverly Hills. Floor-to-ceiling glass walls offer panoramic views of the city below, while the open-plan layout creates a seamless flow between indoor and outdoor living spaces.",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1400",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1400",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1400",
    ],
    agent: { name: "Harvey Specter", avatar: "https://i.pravatar.cc/150?u=2", phone: "+1 (310) 555-0102", email: "harvey@realist.com" },
  },
  {
    id: "azure-penthouse",
    title: "Azure Penthouse",
    subtitle: "Above the clouds, above the ordinary",
    price: "$12,000/mo",
    priceRaw: 12000,
    location: "580 Park Avenue, Apt 42A, New York",
    neighborhood: "Upper East Side",
    city: "New York",
    status: "FOR RENT",
    featured: true,
    specs: { beds: 3, baths: 3, sqft: 3100, built: 2018 },
    amenities: ["Rooftop Terrace", "Concierge", "Gym", "Doorman", "City Views", "Valet Parking"],
    description: "Set atop one of Manhattan's most prestigious addresses, this exceptional penthouse offers an unrivalled living experience. The wrap-around terrace commands breathtaking 360-degree views of the city skyline.",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1400",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1400",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1400",
    ],
    agent: { name: "Donna Paulsen", avatar: "https://i.pravatar.cc/150?u=3", phone: "+1 (212) 555-0103", email: "donna@realist.com" },
  },
  {
    id: "the-glass-house",
    title: "The Glass House",
    subtitle: "Transparency redefined",
    price: "$8,200,000",
    priceRaw: 8200000,
    location: "7 Malibu Coast Road, Malibu",
    neighborhood: "Malibu Coast",
    city: "Los Angeles",
    status: "FOR SALE",
    featured: false,
    specs: { beds: 4, baths: 5, sqft: 4100, built: 2022 },
    amenities: ["Beach Access", "Infinity Pool", "Glass Walls", "Chef's Kitchen", "Spa", "Boat Dock"],
    description: "Perched on the edge of the Pacific, this architectural marvel is defined by its expansive glass walls that dissolve the boundary between interior luxury and the raw beauty of the ocean.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1400",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1400",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1400",
    ],
    agent: { name: "Harvey Specter", avatar: "https://i.pravatar.cc/150?u=2", phone: "+1 (310) 555-0102", email: "harvey@realist.com" },
  },
  {
    id: "shadow-heights",
    title: "Shadow Heights",
    subtitle: "Boldly private, quietly powerful",
    price: "$3,100,000",
    priceRaw: 3100000,
    location: "45 Barton Springs Rd, Austin",
    neighborhood: "Barton Hills",
    city: "Austin",
    status: "FOR SALE",
    featured: false,
    specs: { beds: 4, baths: 4, sqft: 3800, built: 2019 },
    amenities: ["Private Garden", "Pool", "Home Office", "Guest Suite", "Outdoor Kitchen", "Tesla Charger"],
    description: "A statement of restraint and power. Shadow Heights sits behind a wall of mature trees, offering total seclusion while the interiors reveal a world of deliberate luxury — warm materials, bespoke joinery, and curated art.",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1400",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1400",
      "https://images.unsplash.com/photo-1612637968894-660373e23b03?auto=format&fit=crop&q=80&w=1400",
    ],
    agent: { name: "Mike Ross", avatar: "https://i.pravatar.cc/150?u=1", phone: "+1 (512) 555-0101", email: "mike@realist.com" },
  },
  {
    id: "riviera-villa",
    title: "Riviera Villa",
    subtitle: "Timeless Mediterranean splendor",
    price: "$6,750,000",
    priceRaw: 6750000,
    location: "22 Pelican Bay Drive, Naples",
    neighborhood: "Pelican Bay",
    city: "Naples",
    status: "FOR SALE",
    featured: false,
    specs: { beds: 6, baths: 7, sqft: 6400, built: 2015 },
    amenities: ["Private Beach", "Tennis Court", "Pool", "Guest Cottage", "Helipad", "Wine Room"],
    description: "An homage to Mediterranean grandeur on the Gulf of Mexico. Riviera Villa blends old-world craftsmanship with contemporary amenities across six bedrooms, each with its own private terrace overlooking the water.",
    images: [
      "https://images.unsplash.com/photo-1625602812206-5ec545ca1231?auto=format&fit=crop&q=80&w=1400",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1400",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1400",
    ],
    agent: { name: "Donna Paulsen", avatar: "https://i.pravatar.cc/150?u=3", phone: "+1 (239) 555-0103", email: "donna@realist.com" },
  },
  {
    id: "city-loft",
    title: "City Loft",
    subtitle: "Industrial chic in the heart of it all",
    price: "$5,500/mo",
    priceRaw: 5500,
    location: "101 Soho Grand, New York",
    neighborhood: "SoHo",
    city: "New York",
    status: "FOR RENT",
    featured: false,
    specs: { beds: 2, baths: 2, sqft: 1800, built: 2010 },
    amenities: ["Exposed Brick", "12ft Ceilings", "Rooftop Access", "Doorman", "Open Kitchen"],
    description: "A SoHo classic reimagined. Original cast-iron details and exposed brick are counterbalanced by sleek, modern finishes — the result is a loft that feels both lived-in and aspirational.",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1400",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1400",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1400",
    ],
    agent: { name: "Mike Ross", avatar: "https://i.pravatar.cc/150?u=1", phone: "+1 (212) 555-0101", email: "mike@realist.com" },
  },
];

export const journalPosts: JournalPost[] = [
  {
    id: "future-of-luxury-living",
    title: "The Future of Luxury Living",
    excerpt: "How smart home technology and biophilic design are reshaping what it means to live well in 2026.",
    category: "DESIGN",
    date: "May 3, 2026",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1400",
    readTime: "6 min read",
  },
  {
    id: "beverly-hills-market-report",
    title: "Beverly Hills Market Report — Q2 2026",
    excerpt: "Demand for ultra-premium properties above $5M is up 34% compared to Q2 2025. Here's what's driving it.",
    category: "MARKET",
    date: "May 1, 2026",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1400",
    readTime: "8 min read",
  },
  {
    id: "architecture-of-privacy",
    title: "The Architecture of Privacy",
    excerpt: "A deep dive into why the world's wealthiest buyers are prioritizing seclusion and how architects are responding.",
    category: "ARCHITECTURE",
    date: "Apr 28, 2026",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1400",
    readTime: "5 min read",
  },
];

export const teamAgents: Agent[] = [
  { id: "1", name: "Harvey Specter", role: "Senior Partner", avatar: "https://i.pravatar.cc/150?u=2", listings: 18, sales: 124 },
  { id: "2", name: "Donna Paulsen", role: "Luxury Specialist", avatar: "https://i.pravatar.cc/150?u=3", listings: 12, sales: 87 },
  { id: "3", name: "Mike Ross", role: "Buyer's Agent", avatar: "https://i.pravatar.cc/150?u=1", listings: 9, sales: 63 },
  { id: "4", name: "Louis Litt", role: "Investment Advisor", avatar: "https://i.pravatar.cc/150?u=4", listings: 6, sales: 41 },
];
