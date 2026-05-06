# Eryon Private Management | Real Estate CRM

A premium, private-access CRM tailored for single-business real estate management. This application provides a comprehensive suite of tools for tracking properties, managing leads, analyzing sales pipelines, and monitoring team performance.

![Dashboard Preview](https://images.unsplash.com/photo-1460472178825-e5240623abe5?auto=format&fit=crop&q=80&w=1200)

## 🚀 Features

### 🏢 Property Management
- **Inventory Tracking**: Manage "For Sale," "Rent," and "Lease" properties in a unified dashboard.
- **Media Library**: Dedicated space for property images, video tours, and documentation.
- **Categorization**: Group properties by type (Villa, Apartment, Penthouse, etc.) for quick filtering.

### 👥 Lead & Pipeline Management
- **Visual Sales Funnel**: Drag-and-drop-style pipeline for tracking leads from "New" to "Closed."
- **Lead Intelligence**: Capture budget, location preferences, and priority levels for every prospect.
- **Automated Follow-ups**: Stay on top of client interactions with a dedicated follow-up queue.

### 📊 Analytics & Reporting
- **Performance Metrics**: Real-time tracking of team revenue, lead conversion rates, and visit counts.
- **Geo-Intelligence**: Map-based visualization of property locations and active team movements.
- **Export Capabilities**: Generate professional PDF/CSV reports for sales, leads, and commissions.

### 🛡️ Operations & Security
- **Role-Based Access**: Specialized permissions for Admins, Agents, Finance, and Media teams.
- **Team Management**: Live tracking of agent status and performance scorecards.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: Optimized for [Vercel](https://vercel.com/)
- **Database (Optional)**: [Supabase](https://supabase.com/) integration ready.

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd real-estate-crm
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚢 Deployment

### Deploy to Vercel
This project is configured for one-click deployment to Vercel:
```bash
npx vercel
```

### Connect to Supabase
To enable persistent data storage:
1. Create a project at [supabase.com](https://supabase.com).
2. Run the provided `schema.sql` (found in the integration plan) in the SQL Editor.
3. Add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`.

## 📄 License

Internal use only for **Eryon Management**. All rights reserved.
# real-estate-CRM
