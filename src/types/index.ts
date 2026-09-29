// ─── Property Types ────────────────────────────────────────────────────────

export type TransactionType = 'buy' | 'rent';

export type PropertyType =
  | 'apartment'
  | 'house'
  | 'villa'
  | 'townhouse'
  | 'land'
  | 'commercial';

export type Currency = 'GHS' | 'USD' | 'EUR' | 'GBP';

export interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string;
  photo: string;
  agency: string;
  verified: boolean;
  listings: number;
}

export interface PropertyLocation {
  address: string;
  neighborhood: string;
  city: string;
  region: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: Currency;
  priceLabel?: string; // e.g. "/ month" for rentals
  transactionType: TransactionType;
  propertyType: PropertyType;
  location: PropertyLocation;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  parking: number;
  area: number; // sq metres
  amenities: string[];
  featured: boolean;
  verified: boolean;
  agent: Agent;
  createdAt: string; // ISO date string
  yearBuilt?: number;
  // Phase 3 additions
  furnished?: boolean;
  availability?: string;  // e.g. "Available now", "Available January 2027"
  views?: number;         // for display only — not real analytics
}

// ─── Recently Viewed ────────────────────────────────────────────────────────

export interface RecentlyViewedEntry {
  id: string;
  viewedAt: number; // timestamp ms
}

// ─── Comparison ─────────────────────────────────────────────────────────────

export interface ComparisonState {
  ids: string[];        // max 3
  isOpen: boolean;
}

// ─── Search / Filter Types ──────────────────────────────────────────────────

export interface SearchFilters {
  query: string;
  transactionType: TransactionType | 'all';
  propertyType: PropertyType | 'all';
  city: string;
  minPrice: number | null;
  maxPrice: number | null;
  minBedrooms: number | null;
  minBathrooms: number | null;
  amenities: string[];
}

export type SortOption =
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'area-asc'
  | 'area-desc';

// ─── UI / Misc Types ────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export interface CategoryItem {
  type: PropertyType;
  label: string;
  description: string;
  image: string;
  count?: number;
}

export interface StatItem {
  value: string;
  label: string;
}

// ─── Favorites ──────────────────────────────────────────────────────────────

export type FavoriteIds = Set<string>;
