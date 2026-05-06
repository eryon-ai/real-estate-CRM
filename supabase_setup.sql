-- Supabase Database Setup & Seed Data for Eryon Management CRM

-- 1. Create Tables

-- Agents Table
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  leads INTEGER DEFAULT 0,
  visits INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  revenue BIGINT DEFAULT 0,
  active BOOLEAN DEFAULT true,
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Properties Table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT DEFAULT 'House',
  listing_type TEXT CHECK (listing_type IN ('sale', 'rent', 'lease')),
  stage TEXT DEFAULT 'ready',
  price BIGINT NOT NULL,
  location TEXT,
  city TEXT,
  size INTEGER,
  bedrooms INTEGER,
  bathrooms INTEGER,
  status TEXT DEFAULT 'Active',
  amenities TEXT[] DEFAULT '{}',
  owner_name TEXT,
  owner_phone TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Leads Table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  budget BIGINT,
  location TEXT,
  stage TEXT DEFAULT 'new',
  agent_name TEXT, -- Simplified for demo, can link to agents.id
  priority TEXT DEFAULT 'Medium',
  next_follow_up DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable RLS (Row Level Security)
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 3. Create Public Policies (Allow anon access for demo)
CREATE POLICY "Allow public read access" ON agents FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON properties FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON leads FOR SELECT USING (true);

-- 4. Seed Data

-- Seed Agents
INSERT INTO agents (name, leads, visits, conversions, revenue, active, avatar)
VALUES 
('Mike Ross', 12, 8, 2, 1200000, true, 'https://i.pravatar.cc/150?u=1'),
('Harvey Specter', 24, 15, 8, 15000000, true, 'https://i.pravatar.cc/150?u=2'),
('Donna Paulsen', 18, 12, 5, 8500000, false, 'https://i.pravatar.cc/150?u=3'),
('Louis Litt', 9, 4, 1, 450000, true, 'https://i.pravatar.cc/150?u=4');

-- Seed Properties
INSERT INTO properties (title, type, listing_type, stage, price, location, city, size, bedrooms, bathrooms, amenities, owner_name, owner_phone, image)
VALUES 
('Luxury Oceanview Villa', 'Villa', 'sale', 'ready', 4500000, 'Beverly Hills', 'Los Angeles', 4500, 5, 6, ARRAY['Pool', 'Smart Home', 'Cinema', 'Gym'], 'John Doe', '+1 555-0101', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1000'),
('Modern Downtown Loft', 'Apartment', 'rent', 'ready', 4500, 'Financial District', 'New York', 1200, 2, 2, ARRAY['Doorman', 'Roof Deck', 'Gym'], 'Jane Smith', '+1 555-0202', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000'),
('Suburban Family Home', 'House', 'sale', 'resale', 850000, 'Maple Avenue', 'Austin', 2400, 4, 3, ARRAY['Garden', 'Garage', 'Fireplace'], 'Bob Wilson', '+1 555-0303', 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000'),
('Seaside Retreat', 'Villa', 'sale', 'under_construction', 3200000, 'Malibu Coast', 'Los Angeles', 3800, 4, 5, ARRAY['Beach Access', 'Infinity Pool'], 'Alice Cooper', '+1 555-0404', 'https://images.unsplash.com/photo-1600596542815-e32c8ec0486d?auto=format&fit=crop&q=80&w=1000');

-- Seed Leads
INSERT INTO leads (name, phone, email, budget, location, stage, agent_name, priority, next_follow_up)
VALUES 
('Sarah Johnson', '+1 (555) 123-4567', 'sarah.j@example.com', 1200000, 'Los Angeles', 'visit', 'Mike Ross', 'High', '2026-05-08'),
('David Chen', '+1 (555) 987-6543', 'd.chen@tech.co', 850000, 'San Francisco', 'negotiation', 'Harvey Specter', 'Medium', '2026-05-07'),
('Emily Davis', '+1 (555) 456-7890', 'emily.d@design.net', 2500000, 'New York', 'qualified', 'Donna Paulsen', 'Low', '2026-05-10'),
('Michael Brown', '+1 (555) 222-3333', 'm.brown@law.com', 600000, 'Austin', 'new', 'Mike Ross', 'High', '2026-05-06'),
('Jessica Pearson', '+1 (555) 777-8888', 'j.pearson@firm.com', 5000000, 'Chicago', 'closed', 'Harvey Specter', 'High', NULL);
