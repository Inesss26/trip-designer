import type {
  ContentKind,
  LeadStatus,
  PublicationStatus,
  ReviewStatus,
} from "@/lib/validation/schemas";

export type Trip = {
  id: string;
  slug: string;
  title: string;
  destination: string;
  country: string | null;
  durationDays: number | null;
  priceFrom: number | null;
  summary: string;
  description: string | null;
  coverImageUrl: string | null;
  gallery: string[];
  tags: string[];
  status: PublicationStatus;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  description: string;
  priceFrom: number | null;
  features: string[];
  status: PublicationStatus;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type Review = {
  id: string;
  authorName: string;
  authorLocation: string | null;
  rating: number;
  content: string;
  tripId: string | null;
  travelDate: string | null;
  status: ReviewStatus;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  destination: string | null;
  travelPeriod: string | null;
  partySize: number | null;
  budgetRange: string | null;
  message: string;
  status: LeadStatus;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SiteContentEntry = {
  key: string;
  label: string;
  kind: ContentKind;
  value: string;
  sortOrder: number;
  updatedAt: string;
};

/** Dictionnaire `clé -> texte`, tel que consommé par les pages publiques. */
export type SiteContentMap = Record<string, string>;
