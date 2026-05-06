'use client';

import React, { useMemo, useState, useEffect } from 'react';
import {
  Activity,
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Bell,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Edit2,
  Eye,
  FileText,
  Filter,
  Home,
  Image as ImageIcon,
  Layers,
  LayoutDashboard,
  List,
  LogOut,
  MapPin,
  Menu,
  MessageSquare,
  PieChart,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Target,
  Trash2,
  TrendingUp,
  UserCheck,
  Users,
  Video,
  X,
  XCircle
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

interface OperationsItem {
  id: string;
  label: string;
  owner: string;
  value: number;
  status: string;
  meta: string;
}

type Property = {
  id: string;
  title: string;
  type: string;
  listing_type: string;
  stage: string;
  price: number;
  location: string;
  city: string;
  size: number;
  bedrooms: number;
  bathrooms: number;
  status: string;
  amenities: string[];
  owner: { name: string; phone: string };
  image: string;
};

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  budget: number;
  location: string;
  stage: string;
  agent: string;
  priority: string;
  nextFollowUp: string | null;
};

const pipelineStages = [
  { id: 'new', label: 'New Lead', dot: 'bg-blue-500' },
  { id: 'contacted', label: 'Contacted', dot: 'bg-cyan-500' },
  { id: 'qualified', label: 'Qualified', dot: 'bg-violet-500' },
  { id: 'visit', label: 'Site Visit', dot: 'bg-amber-500' },
  { id: 'negotiation', label: 'Negotiation', dot: 'bg-orange-500' },
  { id: 'closed', label: 'Closed', dot: 'bg-emerald-500' },
  { id: 'lost', label: 'Lost', dot: 'bg-slate-400' }
];

const initialProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Oceanview Villa',
    type: 'Villa',
    listing_type: 'sale',
    stage: 'ready',
    price: 4500000,
    location: 'Beverly Hills',
    city: 'Los Angeles',
    size: 4500,
    bedrooms: 5,
    bathrooms: 6,
    status: 'Active',
    amenities: ['Pool', 'Smart Home', 'Cinema', 'Gym'],
    owner: { name: 'John Doe', phone: '+1 555-0101' },
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '2',
    title: 'Modern Downtown Loft',
    type: 'Apartment',
    listing_type: 'rent',
    stage: 'ready',
    price: 4500,
    location: 'Financial District',
    city: 'New York',
    size: 1200,
    bedrooms: 2,
    bathrooms: 2,
    status: 'Pending',
    amenities: ['Doorman', 'Roof Deck', 'Gym'],
    owner: { name: 'Jane Smith', phone: '+1 555-0202' },
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '3',
    title: 'Suburban Family Home',
    type: 'House',
    listing_type: 'sale',
    stage: 'resale',
    price: 850000,
    location: 'Maple Avenue',
    city: 'Austin',
    size: 2400,
    bedrooms: 4,
    bathrooms: 3,
    status: 'Active',
    amenities: ['Garden', 'Garage', 'Fireplace'],
    owner: { name: 'Bob Wilson', phone: '+1 555-0303' },
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '4',
    title: 'Seaside Retreat',
    type: 'Villa',
    listing_type: 'sale',
    stage: 'under_construction',
    price: 3200000,
    location: 'Malibu Coast',
    city: 'Los Angeles',
    size: 3800,
    bedrooms: 4,
    bathrooms: 5,
    status: 'Active',
    amenities: ['Beach Access', 'Infinity Pool'],
    owner: { name: 'Alice Cooper', phone: '+1 555-0404' },
    image: 'https://images.unsplash.com/photo-1600596542815-e32c8ec0486d?auto=format&fit=crop&q=80&w=1000'
  }
];

const initialLeads: Lead[] = [
  { id: '1', name: 'Sarah Johnson', phone: '+1 (555) 123-4567', email: 'sarah.j@example.com', budget: 1200000, location: 'Los Angeles', stage: 'visit', agent: 'Mike Ross', priority: 'High', nextFollowUp: '2026-05-08' },
  { id: '2', name: 'David Chen', phone: '+1 (555) 987-6543', email: 'd.chen@tech.co', budget: 850000, location: 'San Francisco', stage: 'negotiation', agent: 'Harvey Specter', priority: 'Medium', nextFollowUp: '2026-05-07' },
  { id: '3', name: 'Emily Davis', phone: '+1 (555) 456-7890', email: 'emily.d@design.net', budget: 2500000, location: 'New York', stage: 'qualified', agent: 'Donna Paulsen', priority: 'Low', nextFollowUp: '2026-05-10' },
  { id: '4', name: 'Michael Brown', phone: '+1 (555) 222-3333', email: 'm.brown@law.com', budget: 600000, location: 'Austin', stage: 'new', agent: 'Mike Ross', priority: 'High', nextFollowUp: '2026-05-06' },
  { id: '5', name: 'Jessica Pearson', phone: '+1 (555) 777-8888', email: 'j.pearson@firm.com', budget: 5000000, location: 'Chicago', stage: 'closed', agent: 'Harvey Specter', priority: 'High', nextFollowUp: null }
];

const agents = [
  { id: '1', name: 'Mike Ross', leads: 12, visits: 8, conversions: 2, revenue: 1200000, active: true, avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Harvey Specter', leads: 24, visits: 15, conversions: 8, revenue: 15000000, active: true, avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Donna Paulsen', leads: 18, visits: 12, conversions: 5, revenue: 8500000, active: false, avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Louis Litt', leads: 9, visits: 4, conversions: 1, revenue: 450000, active: true, avatar: 'https://i.pravatar.cc/150?u=4' }
];

const notifications = [
  { id: 1, type: 'alert', message: 'Follow-up due for Sarah Johnson', time: '10 min ago' },
  { id: 2, type: 'success', message: 'Deal closed with Jessica Pearson', time: '2 hours ago' },
  { id: 3, type: 'info', message: 'New property listing added', time: '5 hours ago' }
];

const navGroups = [
  {
    title: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 }
    ]
  },
  {
    title: 'Property Management',
    items: [
      { id: 'properties', label: 'Properties', icon: Home },
      { id: 'categories', label: 'Categories', icon: Layers },
      { id: 'media', label: 'Media Library', icon: ImageIcon }
    ]
  },
  {
    title: 'Lead Management',
    items: [
      { id: 'leads', label: 'All Leads', icon: Users, badge: '12' },
      { id: 'pipeline', label: 'Pipeline', icon: Activity },
      { id: 'followups', label: 'Follow-ups', icon: Clock, badge: '3', alert: true },
      { id: 'activities', label: 'Activities', icon: FileText }
    ]
  },
  {
    title: 'Sales & Team',
    items: [
      { id: 'deals', label: 'Deals', icon: Briefcase },
      { id: 'transactions', label: 'Transactions', icon: DollarSign },
      { id: 'commissions', label: 'Commissions', icon: Award },
      { id: 'agents', label: 'Agents', icon: UserCheck },
      { id: 'performance', label: 'Performance', icon: TrendingUp },
      { id: 'roles', label: 'Roles & Permissions', icon: Shield }
    ]
  },
  {
    title: 'Operations',
    items: [
      { id: 'visits', label: 'Field Visits', icon: Calendar },
      { id: 'locations', label: 'Team Locations', icon: MapPin },
      { id: 'sales_reports', label: 'Sales Reports', icon: PieChart },
      { id: 'lead_reports', label: 'Lead Reports', icon: BarChart3 },
      { id: 'messages', label: 'Internal Messages', icon: MessageSquare },
      { id: 'settings', label: 'CRM Settings', icon: Settings }
    ]
  }
];

const currency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

const makeId = () => Math.random().toString(36).slice(2, 11);

function Button({
  children,
  variant = 'primary',
  className = '',
  icon: Icon,
  size = 'md',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  icon?: React.ElementType;
  size?: 'sm' | 'md';
}) {
  const variants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
    ghost: 'bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900',
    danger: 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100'
  };
  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm'
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon ? <Icon size={size === 'sm' ? 14 : 16} /> : null}
      {children}
    </button>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

function Badge({ children, tone = 'slate' }: { children: React.ReactNode; tone?: 'slate' | 'green' | 'amber' | 'blue' | 'red' }) {
  const tones = {
    slate: 'bg-slate-100 text-slate-600',
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    blue: 'bg-sky-50 text-sky-700',
    red: 'bg-red-50 text-red-700'
  };
  return <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...inputProps } = props;
  return (
    <label className="block space-y-2 text-sm">
      <span className="font-bold text-slate-700 tracking-tight">{label}</span>
      <input
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
        {...inputProps}
      />
    </label>
  );
}

function Select({ label, options, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; options: { value: string; label: string }[] }) {
  return (
    <label className="block space-y-2 text-sm">
      {label ? <span className="font-bold text-slate-700 tracking-tight">{label}</span> : null}
      <span className="relative block">
        <select
          className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
      </span>
    </label>
  );
}

function Sidebar({
  activeTab,
  setActiveTab,
  open,
  setOpen
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <aside className={`${open ? 'w-72' : 'w-20'} fixed inset-y-0 left-0 z-40 flex flex-col border-r border-slate-200 bg-white transition-all duration-200 lg:relative`}>
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white">
          <Building2 size={18} />
        </div>
        {open ? (
          <div>
            <div className="text-lg font-black tracking-tighter text-slate-950 uppercase">Eryon</div>
            <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Private Management</div>
          </div>
        ) : null}
      </div>

      <nav className="custom-scrollbar flex-1 overflow-y-auto px-3 py-5">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-6">
            {open ? <div className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wide text-slate-400">{group.title}</div> : <div className="mx-3 mb-3 h-px bg-slate-100" />}
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    title={!open ? item.label : undefined}
                    onClick={() => setActiveTab(item.id)}
                    className={`group relative flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-medium transition ${
                      active ? 'bg-slate-900 text-white shadow-sm' : item.alert ? 'text-amber-700 hover:bg-amber-50' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                    }`}
                  >
                    <Icon size={18} className={active ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'} />
                    {open ? <span className="truncate">{item.label}</span> : null}
                    {open && item.badge ? (
                      <span className={`ml-auto rounded-md px-1.5 py-0.5 text-[10px] font-bold ${active ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        {item.badge}
                      </span>
                    ) : null}
                    {!open && item.badge ? <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" /> : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-200 bg-slate-50 p-3">
        <div className={`mb-2 flex items-center gap-3 rounded-lg px-3 py-2 ${open ? '' : 'justify-center'}`}>
          <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-tr from-slate-900 via-sky-700 to-emerald-500" />
          {open ? (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-950">Admin User</p>
              <p className="truncate text-xs text-slate-500">admin@eryon.com</p>
            </div>
          ) : null}
          {open ? <LogOut size={16} className="text-slate-400" /> : null}
        </div>
        <button onClick={() => setOpen(!open)} className="flex h-9 w-full items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-200">
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>
    </aside>
  );
}

function StatCard({ label, value, change, icon: Icon, tone }: { label: string; value: string | number; change: string; icon: React.ElementType; tone: string }) {
  const tones: Record<string, string> = {
    slate: 'bg-slate-100 text-slate-700',
    sky: 'bg-sky-50 text-sky-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700'
  };
  return (
    <Card className="p-6 transition-all hover:shadow-md border-none ring-1 ring-slate-200">
      <div className="mb-5 flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-sm ${tones[tone]}`}>
          <Icon size={24} />
        </div>
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${change.startsWith('+') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
          {change.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </span>
      </div>
      <p className="text-sm font-semibold text-slate-500 tracking-wide uppercase">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-slate-950 tracking-tight">{value}</p>
    </Card>
  );
}

function PropertyCard({
  property,
  onEdit,
  onDelete,
  onView,
  onTour
}: {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
  onView: (property: Property) => void;
  onTour: (property: Property) => void;
}) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative h-52">
        <Image src={property.image} alt={property.title} fill className="object-cover" />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge tone="blue">{property.listing_type}</Badge>
          <Badge tone={property.stage === 'ready' ? 'green' : 'amber'}>{property.stage.replace('_', ' ')}</Badge>
        </div>
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button onClick={() => onView(property)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-slate-700 shadow-sm backdrop-blur" aria-label="View property">
            <Eye size={15} />
          </button>
          <button onClick={() => onTour(property)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-slate-700 shadow-sm backdrop-blur" aria-label="Start video tour">
            <Video size={15} />
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-base font-bold text-slate-950">{property.title}</h3>
          <p className="shrink-0 font-bold text-slate-950">{currency(property.price)}</p>
        </div>
        <p className="mb-4 flex items-center gap-1 text-sm text-slate-500">
          <MapPin size={14} />
          {property.location}, {property.city}
        </p>
        <div className="mb-4 grid grid-cols-3 border-y border-slate-100 py-3 text-center">
          <div>
            <p className="text-[11px] font-bold uppercase text-slate-400">Beds</p>
            <p className="font-semibold">{property.bedrooms}</p>
          </div>
          <div className="border-x border-slate-100">
            <p className="text-[11px] font-bold uppercase text-slate-400">Baths</p>
            <p className="font-semibold">{property.bathrooms}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase text-slate-400">Sq Ft</p>
            <p className="font-semibold">{property.size}</p>
          </div>
        </div>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {property.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
              {amenity}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">{property.owner.name}</p>
            <p className="truncate text-xs text-slate-500">{property.owner.phone}</p>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => onEdit(property)} aria-label="Edit property">
              <Edit2 size={14} />
            </Button>
            <Button variant="danger" size="sm" onClick={() => onDelete(property.id)} aria-label="Delete property">
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [propertySearch, setPropertySearch] = useState('');
  const [listingFilter, setListingFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [propertyForm, setPropertyForm] = useState<Partial<Property>>({});
  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const [activeModuleFilter, setActiveModuleFilter] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string; type: 'success' | 'error' }[]>([]);

  // New states for missing functionalities
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadForm, setLeadForm] = useState<Partial<Lead>>({});
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<OperationsItem | null>(null);

  // Background scroll lock
  useEffect(() => {
    if (propertyModalOpen || leadModalOpen || categoryModalOpen || mediaModalOpen || detailModalOpen || selectedProperty) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [propertyModalOpen, leadModalOpen, categoryModalOpen, mediaModalOpen, detailModalOpen, selectedProperty]);

  const closedLeads = leads.filter((lead) => lead.stage === 'closed').length;
  const sortedAgents = useMemo(() => [...agents].sort((a, b) => b.revenue - a.revenue), []);
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const search = propertySearch.trim().toLowerCase();
      const matchesSearch =
        !search ||
        [property.title, property.type, property.location, property.city, property.owner.name].some((value) => value.toLowerCase().includes(search));
      const matchesListing = listingFilter === 'all' || property.listing_type === listingFilter;
      const matchesPrice = priceFilter === 'all' || (priceFilter === 'low' ? property.price < 1000000 : property.price >= 1000000);
      return matchesSearch && matchesListing && matchesPrice;
    });
  }, [listingFilter, priceFilter, properties, propertySearch]);

  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts((items) => [...items, { id, message, type }]);
    window.setTimeout(() => setToasts((items) => items.filter((item) => item.id !== id)), 2800);
  };

  const openNewProperty = () => {
    setEditingProperty(null);
    setPropertyForm({
      title: '',
      price: 0,
      listing_type: 'sale',
      stage: 'ready',
      type: 'House',
      city: '',
      location: '',
      bedrooms: 1,
      bathrooms: 1,
      size: 1000,
      amenities: [],
      owner: { name: '', phone: '' },
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000'
    });
    setPropertyModalOpen(true);
  };

  const openEditProperty = (property: Property) => {
    setEditingProperty(property);
    setPropertyForm(property);
    setPropertyModalOpen(true);
  };

  const saveProperty = () => {
    if (!propertyForm.title || !propertyForm.price) {
      notify('Title and price are required', 'error');
      return;
    }

    if (editingProperty) {
      setProperties((items) => items.map((item) => (item.id === editingProperty.id ? ({ ...item, ...propertyForm } as Property) : item)));
      notify('Property updated');
    } else {
      setProperties((items) => [
        {
          id: makeId(),
          title: propertyForm.title || 'Untitled Property',
          type: propertyForm.type || 'House',
          listing_type: propertyForm.listing_type || 'sale',
          stage: propertyForm.stage || 'ready',
          price: Number(propertyForm.price || 0),
          location: propertyForm.location || 'New Location',
          city: propertyForm.city || 'New City',
          size: Number(propertyForm.size || 0),
          bedrooms: Number(propertyForm.bedrooms || 0),
          bathrooms: Number(propertyForm.bathrooms || 0),
          status: 'Active',
          amenities: propertyForm.amenities || [],
          owner: propertyForm.owner || { name: 'Owner', phone: '+1 555-0000' },
          image: propertyForm.image || initialProperties[0].image
        },
        ...items
      ]);
      notify('Property created');
    }

    setPropertyModalOpen(false);
    setEditingProperty(null);
    setPropertyForm({});
  };

  const deleteProperty = (id: string) => {
    setProperties((items) => items.filter((item) => item.id !== id));
    notify('Property deleted', 'error');
  };

  const moveLead = (leadId: string, stage: string) => {
    setLeads((items) => items.map((lead) => (lead.id === leadId ? { ...lead, stage } : lead)));
    notify(`Lead moved to ${pipelineStages.find((item) => item.id === stage)?.label}`);
  };

  const openNewLead = () => {
    setLeadForm({
      name: '',
      email: '',
      phone: '',
      budget: 0,
      location: '',
      stage: 'new',
      agent: agents[0].name,
      priority: 'Medium',
      nextFollowUp: new Date().toISOString().split('T')[0]
    });
    setLeadModalOpen(true);
  };

  const saveLead = () => {
    if (!leadForm.name || !leadForm.email) {
      notify('Name and email are required', 'error');
      return;
    }

    setLeads((items) => [
      {
        id: makeId(),
        name: leadForm.name || 'Anonymous Lead',
        phone: leadForm.phone || '',
        email: leadForm.email || '',
        budget: Number(leadForm.budget || 0),
        location: leadForm.location || 'Unknown',
        stage: leadForm.stage || 'new',
        agent: leadForm.agent || agents[0].name,
        priority: leadForm.priority || 'Medium',
        nextFollowUp: leadForm.nextFollowUp || null
      },
      ...items
    ]);
    notify('Lead created successfully');
    setLeadModalOpen(false);
  };

  const markNotificationsRead = () => {
    setShowNotifications(false);
    notify('Notifications marked as read');
  };

  const moduleAction = (message: string) => notify(message);

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Executive Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Real-time CRM activity, property inventory, and sales performance.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon={Calendar} onClick={() => moduleAction('Dashboard period set to May 2026')}>May 2026</Button>
          <Button icon={Plus} onClick={openNewProperty}>Add Listing</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Revenue" value="$24.5M" change="+12%" icon={DollarSign} tone="slate" />
        <StatCard label="Active Listings" value={properties.length} change="+4" icon={Home} tone="sky" />
        <StatCard label="Total Leads" value={leads.length} change="+18%" icon={Users} tone="emerald" />
        <StatCard label="Closed Leads" value={closedLeads} change="-0.4%" icon={Target} tone="amber" />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        <Card className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-bold text-slate-950">Sales Trends</h2>
            <Select options={[{ value: 'year', label: 'This Year' }, { value: 'month', label: 'This Month' }]} defaultValue="year" />
          </div>
          <div className="flex h-64 items-end gap-2">
            {[35, 55, 40, 70, 60, 85, 95, 80, 65, 75, 50, 60].map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: index * 0.04 }}
                  className="w-full rounded-t bg-slate-800"
                />
                <span className="text-xs font-medium text-slate-400">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="mb-5 font-bold text-slate-950">Conversion Funnel</h2>
          <div className="space-y-4">
            {[
              { label: 'New Leads', count: 1200, color: 'bg-sky-500' },
              { label: 'Contacted', count: 800, color: 'bg-cyan-500' },
              { label: 'Site Visits', count: 450, color: 'bg-violet-500' },
              { label: 'Negotiation', count: 120, color: 'bg-amber-500' },
              { label: 'Closed Deals', count: 45, color: 'bg-emerald-500' }
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-slate-600">{item.label}</span>
                  <span className="font-bold text-slate-950">{item.count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(item.count / 1200) * 100}%` }} className={`h-full rounded-full ${item.color}`} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="p-5 xl:col-span-2">
          <h2 className="mb-5 font-bold text-slate-950">Recent Activity</h2>
          <div className="space-y-5">
            {[
              ['Mike Ross', 'scheduled a visit for', 'Luxury Oceanview Villa', '2 hours ago'],
              ['System', 'generated follow-up reminder for', 'Sarah Johnson', '4 hours ago'],
              ['Harvey Specter', 'closed deal with', 'Jessica Pearson', 'Yesterday'],
              ['Donna Paulsen', 'added new property', 'Seaside Retreat', 'Yesterday']
            ].map(([user, action, target, time]) => (
              <div key={`${user}-${target}`} className="flex gap-3 text-sm">
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-900" />
                <div>
                  <span className="font-bold text-slate-950">{user}</span>
                  <span className="text-slate-500"> {action} </span>
                  <span className="font-semibold text-slate-800">{target}</span>
                  <p className="mt-0.5 text-xs text-slate-400">{time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        {renderAgents()}
      </div>
    </div>
  );

  const renderAnalytics = () => {
    const sourceMix = [
      { label: 'Website', value: 42, color: 'bg-sky-500' },
      { label: 'Referral', value: 26, color: 'bg-emerald-500' },
      { label: 'Social', value: 18, color: 'bg-amber-500' },
      { label: 'Walk-in', value: 14, color: 'bg-violet-500' }
    ];

    return (
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-950">Analytics Command Center</h1>
            <p className="mt-1 text-sm text-slate-500">Channel attribution, team velocity, and forecast quality for the current quarter.</p>
          </div>
          <Button icon={RefreshCw} onClick={() => moduleAction('Analytics refreshed')}>Refresh</Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Pipeline Value" value="$8.7M" change="+9%" icon={Briefcase} tone="slate" />
          <StatCard label="Lead Velocity" value="31/day" change="+6%" icon={Activity} tone="sky" />
          <StatCard label="Avg Response" value="14 min" change="+3%" icon={Clock} tone="emerald" />
          <StatCard label="Forecast Risk" value="Low" change="-7%" icon={Shield} tone="amber" />
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <Card className="p-5 xl:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-bold text-slate-950">Revenue Forecast</h2>
              <Badge tone="green">On Track</Badge>
            </div>
            <div className="space-y-4">
              {[
                ['Committed', 72, '$4.8M', 'bg-emerald-500'],
                ['Best Case', 54, '$2.7M', 'bg-sky-500'],
                ['Open Pipeline', 38, '$1.2M', 'bg-amber-500']
              ].map(([label, width, value, color]) => (
                <div key={label}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-semibold text-slate-700">{label}</span>
                    <span className="font-bold text-slate-950">{value}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${width}%` }} className={`h-full rounded-full ${color}`} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="mb-5 font-bold text-slate-950">Lead Source Mix</h2>
            <div className="space-y-4">
              {sourceMix.map((source) => (
                <div key={source.label} className="flex items-center gap-3">
                  <span className={`h-3 w-3 rounded ${source.color}`} />
                  <span className="flex-1 text-sm font-medium text-slate-700">{source.label}</span>
                  <span className="text-sm font-bold text-slate-950">{source.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const renderProperties = () => (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <h1 className="text-2xl font-bold text-slate-950">Property Inventory</h1>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative min-w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-slate-400"
              placeholder="Search properties..."
              value={propertySearch}
              onChange={(event) => setPropertySearch(event.target.value)}
            />
          </div>
          <div className="flex rounded-lg border border-slate-200 bg-white p-1">
            <button onClick={() => setViewMode('grid')} className={`flex h-8 w-8 items-center justify-center rounded-md ${viewMode === 'grid' ? 'bg-slate-900 text-white' : 'text-slate-500'}`}>
              <LayoutDashboard size={16} />
            </button>
            <button onClick={() => setViewMode('list')} className={`flex h-8 w-8 items-center justify-center rounded-md ${viewMode === 'list' ? 'bg-slate-900 text-white' : 'text-slate-500'}`}>
              <List size={16} />
            </button>
          </div>
          <Button icon={Plus} onClick={openNewProperty}>Add New</Button>
        </div>
      </div>

      <Card className="flex flex-wrap items-center gap-3 p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
          <Filter size={16} />
          Filters
        </div>
        <Select options={[{ value: 'all', label: 'All Types' }, { value: 'sale', label: 'For Sale' }, { value: 'rent', label: 'For Rent' }]} value={listingFilter} onChange={(event) => setListingFilter(event.target.value)} />
        <Select options={[{ value: 'all', label: 'Any Price' }, { value: 'low', label: '< $1M' }, { value: 'high', label: '> $1M' }]} value={priceFilter} onChange={(event) => setPriceFilter(event.target.value)} />
        <span className="ml-auto text-sm text-slate-400">Showing {filteredProperties.length} results</span>
      </Card>

      {viewMode === 'grid' ? (
        <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={openEditProperty}
              onDelete={deleteProperty}
              onView={(item) => setSelectedProperty(item)}
              onTour={(item) => moduleAction(`Video tour opened for ${item.title}`)}
            />
          ))}
        </div>
      ) : (
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3">Property</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Specs</th>
                <th className="px-5 py-3">Owner</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map((property) => (
                <tr key={property.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Image src={property.image} alt="" width={48} height={48} className="h-12 w-12 rounded-lg object-cover" />
                      <div>
                        <p className="font-bold text-slate-950">{property.title}</p>
                        <p className="text-xs text-slate-500">{property.location}, {property.city}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4"><Badge tone="blue">{property.listing_type}</Badge></td>
                  <td className="px-5 py-4 font-bold">{currency(property.price)}</td>
                  <td className="px-5 py-4 text-slate-600">{property.bedrooms} Beds, {property.bathrooms} Baths</td>
                  <td className="px-5 py-4 text-slate-600">{property.owner.name}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedProperty(property)}><Eye size={14} /></Button>
                      <Button variant="ghost" size="sm" onClick={() => openEditProperty(property)}><Edit2 size={14} /></Button>
                      <Button variant="danger" size="sm" onClick={() => deleteProperty(property.id)}><Trash2 size={14} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );

  const renderPipeline = () => (
    <div className="flex h-[calc(100vh-9rem)] flex-col">
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Lead Pipeline</h1>
          <p className="mt-1 text-sm text-slate-500">Move leads between stages with the quick action on each card.</p>
        </div>
        <Button icon={Plus} onClick={openNewLead}>Add New Lead</Button>
      </div>
      <div className="custom-scrollbar flex flex-1 gap-4 overflow-x-auto pb-4">
        {pipelineStages.map((stage) => {
          const stageLeads = leads.filter((lead) => lead.stage === stage.id);
          const totalBudget = stageLeads.reduce((acc, lead) => acc + lead.budget, 0);
          return (
            <div key={stage.id} className="flex w-80 shrink-0 flex-col rounded-lg border border-slate-200 bg-slate-50 shadow-sm">
              <div className="border-b border-slate-200 bg-white/50 p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${stage.dot}`} />
                    <h3 className="font-bold text-slate-800">{stage.label}</h3>
                  </div>
                  <Badge tone="slate">{stageLeads.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Total Value</p>
                  <p className="text-sm font-bold text-slate-950">{currency(totalBudget)}</p>
                </div>
              </div>
              <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto p-3">
                {stageLeads.length ? (
                  stageLeads.map((lead) => (
                    <Card key={lead.id} className="p-4">
                      <div className="mb-3 flex items-start justify-between gap-2">
                        <h4 className="font-bold text-slate-950">{lead.name}</h4>
                        {lead.priority === 'High' ? <AlertCircle className="text-red-500" size={16} /> : null}
                      </div>
                      <div className="space-y-2 text-xs text-slate-500">
                        <p className="flex items-center gap-2"><DollarSign size={12} />{currency(lead.budget)}</p>
                        <p className="flex items-center gap-2"><MapPin size={12} />{lead.location}</p>
                        <p className="flex items-center gap-2"><UserCheck size={12} />{lead.agent}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                        {lead.nextFollowUp ? <Badge tone="amber">{new Date(lead.nextFollowUp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</Badge> : <Badge tone="green">Done</Badge>}
                        <select className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs" value={lead.stage} onChange={(event) => moveLead(lead.id, event.target.value)}>
                          {pipelineStages.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                        </select>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="flex h-28 items-center justify-center rounded-lg border border-dashed border-slate-300 text-xs font-medium text-slate-400">No leads</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderAgents = () => (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <h2 className="flex items-center gap-2 font-bold text-slate-950"><Award className="text-amber-500" size={18} /> Top Performers</h2>
        <Button variant="ghost" size="sm" onClick={() => setActiveTab('performance')}>View All</Button>
      </div>
      <div>
        {sortedAgents.map((agent, index) => (
          <div key={agent.id} className="flex items-center gap-3 border-b border-slate-100 p-4 last:border-0">
            <div className="w-6 text-center font-bold text-slate-400">{index + 1}</div>
            <Image src={agent.avatar} alt={agent.name} width={40} height={40} className="h-10 w-10 rounded-full" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-950">{agent.name}</p>
              <p className="text-xs text-slate-500">{agent.conversions} Deals Closed</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-slate-950">{currency(agent.revenue)}</p>
              <p className="text-xs text-slate-400">Revenue</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  const renderLocations = () => (
    <div className="flex h-[calc(100vh-9rem)] flex-col">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-950">Geo Intelligence</h1>
        <Badge tone="green">Live Tracking Active</Badge>
      </div>
      <div className="relative flex-1 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        {properties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.08 }}
            className="absolute"
            style={{ top: `${22 + index * 15}%`, left: `${18 + index * 18}%` }}
          >
            <div className="flex flex-col items-center">
              <div className="mb-1 rounded bg-white px-2 py-1 text-xs font-bold shadow-sm">{currency(property.price)}</div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-slate-900 text-white shadow-lg">
                <Home size={15} />
              </div>
            </div>
          </motion.div>
        ))}
        {agents.filter((agent) => agent.active).map((agent, index) => (
          <motion.div
            key={agent.id}
            animate={{ x: [0, 12, -8, 0], y: [0, -6, 4, 0] }}
            transition={{ duration: 15, repeat: Infinity, delay: index }}
            className="absolute h-9 w-9 rounded-full border-2 border-emerald-500 shadow-lg overflow-hidden"
            style={{ top: `${48 + index * 10}%`, left: `${48 + index * 11}%` }}
          >
            <Image src={agent.avatar} alt={agent.name} fill className="object-cover" />
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderLeadsTable = () => (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">All Leads</h1>
          <p className="mt-1 text-sm text-slate-500">Lead directory with quick stage updates and assignment details.</p>
        </div>
        <Button icon={Plus} onClick={openNewLead}>Add New Lead</Button>
      </div>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-3">Lead</th>
              <th className="px-5 py-3">Budget</th>
              <th className="px-5 py-3">Location</th>
              <th className="px-5 py-3">Agent</th>
              <th className="px-5 py-3">Priority</th>
              <th className="px-5 py-3">Stage</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-slate-100 last:border-0">
                <td className="px-5 py-4">
                  <p className="font-bold text-slate-950">{lead.name}</p>
                  <p className="text-xs text-slate-500">{lead.email}</p>
                </td>
                <td className="px-5 py-4 font-bold">{currency(lead.budget)}</td>
                <td className="px-5 py-4 text-slate-600">{lead.location}</td>
                <td className="px-5 py-4 text-slate-600">{lead.agent}</td>
                <td className="px-5 py-4"><Badge tone={lead.priority === 'High' ? 'red' : lead.priority === 'Medium' ? 'amber' : 'slate'}>{lead.priority}</Badge></td>
                <td className="px-5 py-4">
                  <select className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs" value={lead.stage} onChange={(event) => moveLead(lead.id, event.target.value)}>
                    {pipelineStages.map((stage) => <option key={stage.id} value={stage.id}>{stage.label}</option>)}
                  </select>
                </td>
                <td className="px-5 py-4 text-right">
                  <Button size="sm" variant="secondary" onClick={() => moduleAction(`Call scheduled for ${lead.name}`)}>Call</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );

  const renderFollowups = () => {
    const followups = leads.filter((lead) => lead.nextFollowUp);
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-950">Follow-ups</h1>
          <Button icon={Calendar} onClick={() => moduleAction('Follow-up calendar synced')}>Sync Calendar</Button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {followups.map((lead) => (
            <Card key={lead.id} className="p-5">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h2 className="font-bold text-slate-950">{lead.name}</h2>
                  <p className="text-sm text-slate-500">{lead.phone}</p>
                </div>
                <Badge tone="amber">{new Date(lead.nextFollowUp || '').toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</Badge>
              </div>
              <p className="mb-4 text-sm text-slate-600">Budget {currency(lead.budget)} for {lead.location}. Assigned to {lead.agent}.</p>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => moduleAction(`Follow-up completed for ${lead.name}`)}>Complete</Button>
                <Button size="sm" variant="secondary" onClick={() => moveLead(lead.id, 'contacted')}>Contacted</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderCategories = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-950">Property Categories</h1>
        <Button icon={Plus} onClick={() => setCategoryModalOpen(true)}>Add Category</Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {['Villa', 'Apartment', 'House', 'Commercial'].map((category) => {
          const count = properties.filter((property) => property.type === category).length;
          return (
            <Card key={category} className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <Home className="text-slate-500" size={20} />
                <Badge tone="blue">{count} listings</Badge>
              </div>
              <h2 className="text-lg font-bold text-slate-950">{category}</h2>
              <p className="mt-1 text-sm text-slate-500">Average value {currency(Math.max(1, count) * 875000)}</p>
              <Button className="mt-4 w-full" variant="secondary" size="sm" onClick={() => {
                setPropertySearch(category);
                setActiveTab('properties');
                notify(`Showing all ${category} listings`);
              }}>Manage</Button>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderMedia = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-950">Media Library</h1>
        <Button icon={Plus} onClick={() => setMediaModalOpen(true)}>Upload Media</Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="relative h-44 w-full">
              <Image src={property.image} alt={property.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h2 className="line-clamp-1 font-bold text-slate-950">{property.title}</h2>
              <p className="mt-1 text-sm text-slate-500">{property.amenities.length + 3} assets attached</p>
              <Button className="mt-4 w-full" size="sm" variant="secondary" onClick={() => setSelectedProperty(property)}>Preview</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderOperationsModule = (title: string, description: string, items: OperationsItem[], primaryAction: string) => (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold capitalize text-slate-950">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
        <div className="flex gap-2">
          <Select value={activeModuleFilter} onChange={(event) => setActiveModuleFilter(event.target.value)} options={[{ value: 'all', label: 'All' }, { value: 'active', label: 'Active' }, { value: 'review', label: 'Review' }]} />
          <Button icon={Plus} onClick={() => {
            setSelectedDetail({ title: `New ${primaryAction}`, row: '', status: 'Ready' });
            setDetailModalOpen(true);
          }}>{primaryAction}</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {items.map((item, index) => (
          <Card key={item.id} className="group relative overflow-hidden p-5 transition-all hover:shadow-md">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="font-bold text-slate-950 group-hover:text-slate-900">{item.label}</h2>
                <p className="mt-1 text-xs font-medium text-slate-400">Owner: {item.owner}</p>
              </div>
              <Badge tone={item.status === 'Ready' ? 'green' : item.status === 'Review' ? 'amber' : 'blue'}>{item.status}</Badge>
            </div>
            
            {item.value > 0 && (
              <div className="mb-4 rounded-lg bg-slate-50 p-3">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-tight">
                  <span>Value</span>
                  <span>Progress</span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-950">{currency(item.value)}</span>
                  <span className="text-xs font-bold text-slate-600">{85 + index * 3}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${85 + index * 3}%` }} className="h-full bg-slate-900" />
                </div>
              </div>
            )}

            <p className="mb-4 text-xs italic text-slate-500">{item.meta}</p>

            <div className="flex gap-2">
              <Button size="sm" className="flex-1" onClick={() => {
                setSelectedDetail({ title: item.label, row: item.label, ...item });
                setDetailModalOpen(true);
              }}>Open Details</Button>
              <Button size="sm" variant="secondary" onClick={() => {
                notify(`Exporting ${item.label} data...`);
                setTimeout(() => notify(`${item.label}_details.pdf downloaded`), 1500);
              }}>Export</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    if (activeTab === 'dashboard') return renderDashboard();
    if (activeTab === 'analytics') return renderAnalytics();
    if (activeTab === 'properties') return renderProperties();
    if (activeTab === 'categories') return renderCategories();
    if (activeTab === 'media') return renderMedia();
    if (activeTab === 'leads') return renderLeadsTable();
    if (activeTab === 'pipeline') return renderPipeline();
    if (activeTab === 'followups') return renderFollowups();
    if (activeTab === 'locations') return renderLocations();
    if (activeTab === 'agents') return <div className="max-w-3xl">{renderAgents()}</div>;
    
    if (activeTab === 'deals') return renderOperationsModule('Deals', 'Offer tracking, negotiation movement, and expected closing value.', [
      { id: 'd1', label: 'Oceanview Villa Offer', owner: 'Mike Ross', value: 4200000, status: 'Negotiation', meta: 'Counter-offer sent' },
      { id: 'd2', label: 'Downtown Loft Renewal', owner: 'Harvey Specter', value: 55000, status: 'Review', meta: 'Lease docs pending' },
      { id: 'd3', label: 'Austin Home Counter', owner: 'Donna Paulsen', value: 825000, status: 'Active', meta: 'Inspection completed' },
      { id: 'd4', label: 'Malibu Pre-sale', owner: 'Mike Ross', value: 3100000, status: 'Ready', meta: 'Deposit received' }
    ], 'Add Deal');

    if (activeTab === 'transactions') return renderOperationsModule('Transactions', 'Payment milestones, escrow status, and document readiness.', [
      { id: 't1', label: 'Escrow Pending', owner: 'Louis Litt', value: 120000, status: 'Active', meta: 'Waiting for bank' },
      { id: 't2', label: 'Deposit Verified', owner: 'Harvey Specter', value: 45000, status: 'Ready', meta: 'Wire received' },
      { id: 't3', label: 'Final Invoice', owner: 'Donna Paulsen', value: 8500, status: 'Review', meta: 'Tax calculation' },
      { id: 't4', label: 'Title Transfer', owner: 'Louis Litt', value: 0, status: 'Ready', meta: 'Scheduled for Friday' }
    ], 'Add Transaction');

    if (activeTab === 'commissions') return renderOperationsModule('Commissions', 'Agent commission slabs, payout progress, and approval status.', [
      { id: 'c1', label: 'Harvey May Payout', owner: 'Harvey Specter', value: 45000, status: 'Ready', meta: 'Approved by Finance' },
      { id: 'c2', label: 'Donna Q2 Bonus', owner: 'Donna Paulsen', value: 12000, status: 'Review', meta: 'Target verification' },
      { id: 'c3', label: 'Mike Referral Split', owner: 'Mike Ross', value: 3500, status: 'Active', meta: 'Pending closing' },
      { id: 'c4', label: 'Louis Listing Fee', owner: 'Louis Litt', value: 8500, status: 'Ready', meta: 'Paid' }
    ], 'Add Commission');

    if (activeTab === 'visits') return renderOperationsModule('Site Visits', 'Scheduled visits, property walkthroughs, and field notes.', [
      { id: 'v1', label: 'Sarah Johnson Visit', owner: 'Mike Ross', value: 0, status: 'Ready', meta: '10:30 AM Tomorrow' },
      { id: 'v2', label: 'David Chen Revisit', owner: 'Harvey Specter', value: 0, status: 'Active', meta: 'Second viewing' },
      { id: 'v3', label: 'Emily Davis Tour', owner: 'Donna Paulsen', value: 0, status: 'Review', meta: 'Video tour first' },
      { id: 'v4', label: 'Builder Inspection', owner: 'Louis Litt', value: 0, status: 'Ready', meta: 'Final punchlist' }
    ], 'Schedule Visit');

    if (activeTab === 'messages') return renderOperationsModule('Messages', 'Client conversations, outbound campaigns, and response queues.', [
      { id: 'm1', label: 'Buyer Follow-up', owner: 'System', value: 0, status: 'Active', meta: '42 emails sent' },
      { id: 'm2', label: 'Owner Price Update', owner: 'Harvey Specter', value: 0, status: 'Review', meta: 'Drafting response' },
      { id: 'm3', label: 'Visit Reminder', owner: 'System', value: 0, status: 'Ready', meta: 'SMS automation' },
      { id: 'm4', label: 'Agent Broadcast', owner: 'Donna Paulsen', value: 0, status: 'Active', meta: 'Meeting notes' }
    ], 'New Message');

    if (activeTab === 'activities') return renderOperationsModule('Activities', 'Logged calls, meetings, tasks, and team activity timeline.', [
      { id: 'a1', label: 'Morning Call Block', owner: 'Mike Ross', value: 0, status: 'Ready', meta: '15/20 completed' },
      { id: 'a2', label: 'Pricing Review', owner: 'Harvey Specter', value: 0, status: 'Review', meta: 'Market analysis' },
      { id: 'a3', label: 'Owner Meeting', owner: 'Donna Paulsen', value: 0, status: 'Active', meta: 'Contract signing' },
      { id: 'a4', label: 'Lead Qualification', owner: 'Mike Ross', value: 0, status: 'Active', meta: 'New batch incoming' }
    ], 'Log Activity');

    if (activeTab === 'performance') return renderOperationsModule('Performance', 'Agent targets, conversion quality, and revenue contribution.', [
      { id: 'p1', label: 'North Team', owner: 'Harvey Specter', value: 12000000, status: 'Active', meta: '92% of target' },
      { id: 'p2', label: 'Luxury Segment', owner: 'Donna Paulsen', value: 8500000, status: 'Ready', meta: 'Leading in ROI' },
      { id: 'p3', label: 'Rental Desk', owner: 'Mike Ross', value: 450000, status: 'Review', meta: 'High volume' },
      { id: 'p4', label: 'Outbound Team', owner: 'Louis Litt', value: 210000, status: 'Active', meta: 'Lead growth +12%' }
    ], 'Add Target');

    if (activeTab === 'roles') return renderOperationsModule('Roles & Permissions', 'Access groups, module permissions, and approval levels.', [
      { id: 'r1', label: 'Admin Access', owner: 'System', value: 0, status: 'Ready', meta: 'Full access' },
      { id: 'r2', label: 'Agent Access', owner: 'System', value: 0, status: 'Ready', meta: 'Standard CRM' },
      { id: 'r3', label: 'Finance Access', owner: 'System', value: 0, status: 'Ready', meta: 'Commissions & Deals' },
      { id: 'r4', label: 'Media Access', owner: 'System', value: 0, status: 'Ready', meta: 'Library management' }
    ], 'Add Role');

    if (activeTab === 'sales_reports') return renderOperationsModule('Sales Reports', 'Revenue summaries, closing trend reports, and export-ready metrics.', [
      { id: 'sr1', label: 'Monthly Revenue', owner: 'Harvey Specter', value: 0, status: 'Ready', meta: 'Generated May 1st' },
      { id: 'sr2', label: 'Inventory Velocity', owner: 'Donna Paulsen', value: 0, status: 'Review', meta: 'Q2 Analysis' },
      { id: 'sr3', label: 'City Sales Mix', owner: 'Mike Ross', value: 0, status: 'Active', meta: 'Real-time data' },
      { id: 'sr4', label: 'Forecast Accuracy', owner: 'Louis Litt', value: 0, status: 'Ready', meta: '98% confidence' }
    ], 'Create Report');

    if (activeTab === 'lead_reports') return renderOperationsModule('Lead Reports', 'Lead quality, source attribution, and follow-up performance.', [
      { id: 'lr1', label: 'Source Quality', owner: 'System', value: 0, status: 'Ready', meta: 'Channel ROI' },
      { id: 'lr2', label: 'Response SLA', owner: 'Donna Paulsen', value: 0, status: 'Active', meta: 'Avg 14 min' },
      { id: 'lr3', label: 'Stage Leakage', owner: 'Mike Ross', value: 0, status: 'Review', meta: 'Funnel drop-off' },
      { id: 'lr4', label: 'Agent Follow-up', owner: 'Louis Litt', value: 0, status: 'Active', meta: 'Call logs' }
    ], 'Create Report');

    return renderOperationsModule('CRM Settings', 'Company profile, team preferences, and system integrations.', [
      { id: 's1', label: 'Company Profile', owner: 'Admin', value: 0, status: 'Ready', meta: 'Business details' },
      { id: 's2', label: 'Notification Rules', owner: 'Admin', value: 0, status: 'Active', meta: 'Internal alerts' },
      { id: 's3', label: 'Workflow Settings', owner: 'Admin', value: 0, status: 'Review', meta: 'Custom stages' },
      { id: 's4', label: 'API Integrations', owner: 'Admin', value: 0, status: 'Ready', meta: 'Connected tools' }
    ], 'Save Setting');
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} open={sidebarOpen} setOpen={setSidebarOpen} />

      <main className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={22} />
            </button>
            <p className="text-sm font-semibold capitalize text-slate-500">{activeTab.replace('_', ' ')}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input className="h-9 w-64 rounded-full border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none focus:bg-white" placeholder="Global search..." />
            </div>
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                <Bell size={20} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </button>
              <AnimatePresence>
                {showNotifications ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 p-4">
                      <h3 className="font-bold text-slate-950">Notifications</h3>
                      <button onClick={markNotificationsRead} className="text-xs font-semibold text-slate-500 hover:text-slate-950">Mark all read</button>
                    </div>
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex gap-3 border-b border-slate-100 p-4 last:border-0">
                        <span className={`mt-1 h-2 w-2 rounded-full ${notification.type === 'alert' ? 'bg-red-500' : notification.type === 'success' ? 'bg-emerald-500' : 'bg-sky-500'}`} />
                        <div>
                          <p className="text-sm font-medium text-slate-800">{notification.message}</p>
                          <p className="mt-1 text-xs text-slate-400">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-slate-900 via-sky-700 to-emerald-500" />
          </div>
        </header>

        <div className="custom-scrollbar flex-1 overflow-y-auto p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.16 }}
              className="mx-auto max-w-7xl"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {(propertyModalOpen || leadModalOpen || categoryModalOpen || mediaModalOpen || detailModalOpen || selectedProperty) ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setPropertyModalOpen(false);
                setLeadModalOpen(false);
                setCategoryModalOpen(false);
                setMediaModalOpen(false);
                setDetailModalOpen(false);
                setSelectedProperty(null);
              }}
              className="absolute inset-0 bg-slate-950/30 backdrop-blur-sm"
            />
            
            {selectedProperty && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-2xl"
              >
                <div className="relative h-72 w-full">
                  <Image src={selectedProperty.image} alt={selectedProperty.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge tone={selectedProperty.listing_type === 'sale' ? 'blue' : 'green'}>{selectedProperty.listing_type}</Badge>
                      <Badge tone={selectedProperty.stage === 'ready' ? 'green' : 'amber'}>{selectedProperty.stage.replace('_', ' ')}</Badge>
                    </div>
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">{selectedProperty.title}</h2>
                  </div>
                  <button onClick={() => setSelectedProperty(null)} className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white shadow-sm backdrop-blur-md hover:bg-white/40 transition">
                    <X size={20} />
                  </button>
                </div>
                <div className="p-8">
                  <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-slate-500 font-medium">
                      <MapPin size={18} className="text-slate-400" />
                      <span>{selectedProperty.location}, {selectedProperty.city}</span>
                    </div>
                    <p className="text-2xl font-black text-slate-950">{currency(selectedProperty.price)}</p>
                  </div>
                  
                  <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Total Size</p>
                      <p className="mt-1 text-xl font-black text-slate-950">{selectedProperty.size} <span className="text-sm font-normal text-slate-500">sq ft</span></p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Bedrooms</p>
                      <p className="mt-1 text-xl font-black text-slate-950">{selectedProperty.bedrooms}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Bathrooms</p>
                      <p className="mt-1 text-xl font-black text-slate-950">{selectedProperty.bathrooms}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Status</p>
                      <p className="mt-1 text-xl font-black text-slate-950">{selectedProperty.status}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="mb-4 text-sm font-black uppercase tracking-widest text-slate-900">Premium Amenities</p>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedProperty.amenities.map((amenity) => (
                        <span key={amenity} className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 border border-slate-200">
                          <CheckCircle size={14} className="text-emerald-500" />
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-slate-100 pt-8 sm:flex-row">
                    <Button className="flex-1 h-12" icon={Calendar} onClick={() => { notify(`Visit scheduled for ${selectedProperty.title}`); setSelectedProperty(null); }}>Schedule Field Visit</Button>
                    <Button className="flex-1 h-12" variant="secondary" icon={Edit2} onClick={() => { openEditProperty(selectedProperty); setSelectedProperty(null); }}>Edit Listing</Button>
                    <Button className="flex-1 h-12" variant="secondary" icon={Video} onClick={() => { notify(`Video tour started for ${selectedProperty.title}`); setSelectedProperty(null); }}>Start Video Tour</Button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Property Modal */}
            {propertyModalOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl"
              >
                <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-100 bg-white p-5">
                  <h2 className="text-lg font-bold text-slate-950">{editingProperty ? 'Edit Property' : 'Add New Property'}</h2>
                  <button onClick={() => setPropertyModalOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                    <X size={18} />
                  </button>
                </div>
                <div className="space-y-6 p-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Input label="Property Title" value={propertyForm.title || ''} onChange={(event) => setPropertyForm({ ...propertyForm, title: event.target.value })} />
                    <Select label="Listing Type" value={propertyForm.listing_type || 'sale'} onChange={(event) => setPropertyForm({ ...propertyForm, listing_type: event.target.value })} options={[{ value: 'sale', label: 'For Sale' }, { value: 'rent', label: 'For Rent' }, { value: 'lease', label: 'Lease' }]} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <Input label="Price" type="number" value={propertyForm.price || ''} onChange={(event) => setPropertyForm({ ...propertyForm, price: Number(event.target.value) })} />
                    <Input label="City" value={propertyForm.city || ''} onChange={(event) => setPropertyForm({ ...propertyForm, city: event.target.value })} />
                    <Input label="Bedrooms" type="number" value={propertyForm.bedrooms || ''} onChange={(event) => setPropertyForm({ ...propertyForm, bedrooms: Number(event.target.value) })} />
                    <Input label="Bathrooms" type="number" value={propertyForm.bathrooms || ''} onChange={(event) => setPropertyForm({ ...propertyForm, bathrooms: Number(event.target.value) })} />
                  </div>
                  <Input label="Location" value={propertyForm.location || ''} onChange={(event) => setPropertyForm({ ...propertyForm, location: event.target.value })} />
                  <div>
                    <p className="mb-2 text-sm font-medium text-slate-700">Amenities</p>
                    <div className="flex flex-wrap gap-2">
                      {['Pool', 'Gym', 'Parking', 'Security', 'Garden', 'Smart Home'].map((amenity) => {
                        const active = (propertyForm.amenities || []).includes(amenity);
                        return (
                          <button
                            key={amenity}
                            onClick={() => {
                              const current = propertyForm.amenities || [];
                              setPropertyForm({ ...propertyForm, amenities: active ? current.filter((item) => item !== amenity) : [...current, amenity] });
                            }}
                            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}
                          >
                            {amenity}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 border-t border-slate-100 pt-5 md:grid-cols-2">
                    <Input label="Owner Name" value={propertyForm.owner?.name || ''} onChange={(event) => setPropertyForm({ ...propertyForm, owner: { ...(propertyForm.owner || { phone: '' }), name: event.target.value } })} />
                    <Input label="Owner Phone" value={propertyForm.owner?.phone || ''} onChange={(event) => setPropertyForm({ ...propertyForm, owner: { ...(propertyForm.owner || { name: '' }), phone: event.target.value } })} />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="secondary" className="flex-1" onClick={() => setPropertyModalOpen(false)}>Cancel</Button>
                    <Button className="flex-1" icon={CheckCircle} onClick={saveProperty}>{editingProperty ? 'Save Changes' : 'Create Property'}</Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Lead Modal */}
            {leadModalOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl"
              >
                <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-100 bg-white p-5">
                  <h2 className="text-lg font-bold text-slate-950">Add New Lead</h2>
                  <button onClick={() => setLeadModalOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                    <X size={18} />
                  </button>
                </div>
                <div className="space-y-6 p-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Input label="Full Name" value={leadForm.name || ''} onChange={(event) => setLeadForm({ ...leadForm, name: event.target.value })} placeholder="John Doe" />
                    <Input label="Email Address" type="email" value={leadForm.email || ''} onChange={(event) => setLeadForm({ ...leadForm, email: event.target.value })} placeholder="john@example.com" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Input label="Phone Number" value={leadForm.phone || ''} onChange={(event) => setLeadForm({ ...leadForm, phone: event.target.value })} placeholder="+1 (555) 000-0000" />
                    <Input label="Budget ($)" type="number" value={leadForm.budget || ''} onChange={(event) => setLeadForm({ ...leadForm, budget: Number(event.target.value) })} />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Input label="Preferred Location" value={leadForm.location || ''} onChange={(event) => setLeadForm({ ...leadForm, location: event.target.value })} placeholder="e.g. Beverly Hills" />
                    <Select label="Priority" value={leadForm.priority || 'Medium'} onChange={(event) => setLeadForm({ ...leadForm, priority: event.target.value })} options={[{ value: 'Low', label: 'Low' }, { value: 'Medium', label: 'Medium' }, { value: 'High', label: 'High' }]} />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Select label="Assigned Agent" value={leadForm.agent || agents[0].name} onChange={(event) => setLeadForm({ ...leadForm, agent: event.target.value })} options={agents.map(a => ({ value: a.name, label: a.name }))} />
                    <Input label="Next Follow-up" type="date" value={leadForm.nextFollowUp || ''} onChange={(event) => setLeadForm({ ...leadForm, nextFollowUp: event.target.value })} />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="secondary" className="flex-1" onClick={() => setLeadModalOpen(false)}>Cancel</Button>
                    <Button className="flex-1" icon={CheckCircle} onClick={saveLead}>Create Lead</Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Category Modal */}
            {categoryModalOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative z-10 w-full max-w-md rounded-xl bg-white shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-slate-100 p-5">
                  <h2 className="text-lg font-bold text-slate-950">Add Property Category</h2>
                  <button onClick={() => setCategoryModalOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                    <X size={18} />
                  </button>
                </div>
                <div className="space-y-6 p-6">
                  <Input label="Category Name" placeholder="e.g. Penthouse" />
                  <Input label="Description" placeholder="Description of this property type" />
                  <div className="flex gap-2">
                    <Button variant="secondary" className="flex-1" onClick={() => setCategoryModalOpen(false)}>Cancel</Button>
                    <Button className="flex-1" onClick={() => { notify('Category added'); setCategoryModalOpen(false); }}>Add Category</Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Media Modal */}
            {mediaModalOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative z-10 w-full max-w-md rounded-xl bg-white shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-slate-100 p-5">
                  <h2 className="text-lg font-bold text-slate-950">Upload Media</h2>
                  <button onClick={() => setMediaModalOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                    <X size={18} />
                  </button>
                </div>
                <div className="space-y-6 p-6 text-center">
                  <div className="flex h-40 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-slate-500">
                    <ImageIcon size={32} className="mb-2 text-slate-300" />
                    <p className="text-sm font-medium">Drag and drop images here</p>
                    <p className="mt-1 text-xs">or click to browse from your computer</p>
                    <input type="file" className="absolute inset-0 cursor-pointer opacity-0" onChange={() => { notify('Files uploaded successfully'); setMediaModalOpen(false); }} />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" className="flex-1" onClick={() => setMediaModalOpen(false)}>Cancel</Button>
                    <Button className="flex-1" variant="primary">Start Upload</Button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Generic Detail Modal */}
            {detailModalOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative z-10 w-full max-w-lg rounded-xl bg-white shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-slate-100 p-5">
                  <h2 className="text-lg font-bold text-slate-950">{selectedDetail?.title || 'Detail View'}</h2>
                  <button onClick={() => setDetailModalOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                    <X size={18} />
                  </button>
                </div>
                <div className="space-y-6 p-6">
                  <div className="rounded-lg bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Details</p>
                    <div className="mt-3 space-y-3">
                      <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-sm text-slate-500">Item Name</span><span className="text-sm font-bold">{selectedDetail?.row}</span></div>
                      <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-sm text-slate-500">Owner</span><span className="text-sm font-bold">{agents[0].name}</span></div>
                      <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-sm text-slate-500">Status</span><Badge tone="green">Active</Badge></div>
                      <div className="flex justify-between"><span className="text-sm text-slate-500">Last Modified</span><span className="text-sm font-bold">{new Date().toLocaleDateString()}</span></div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" variant="secondary" onClick={() => setDetailModalOpen(false)}>Close</Button>
                    <Button className="flex-1" onClick={() => { notify('Details updated'); setDetailModalOpen(false); }}>Update</Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ) : null}
      </AnimatePresence>

      <div className="fixed bottom-5 right-5 z-[60] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              className={`flex items-center gap-3 rounded-lg border bg-white px-4 py-3 text-sm font-medium shadow-lg ${toast.type === 'success' ? 'border-emerald-100 text-emerald-700' : 'border-red-100 text-red-700'}`}
            >
              {toast.type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
