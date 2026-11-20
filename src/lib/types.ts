export type Fuel = "Petrol" | "Diesel" | "Hybrid" | "Electric";
export type Transmission = "Automatic" | "Manual";
export type Condition = "Used" | "Certified" | "New";
export type BodyType =
  | "SUV"
  | "Sedan"
  | "Hatchback"
  | "Coupe"
  | "Convertible"
  | "MPV"
  | "Pickup";

export interface Seller {
  name: string;
  role: string;
  phone: string;
  email: string;
}

export type AvailabilityStatus = "Available" | "Reserved" | "Sold";

export interface Car {
  id: string;
  slug: string;
  title: string;
  make: string;
  model: string;
  variant?: string;
  status?: AvailabilityStatus;
  year: number;
  price: number;
  condition?: string;
  body: BodyType;
  mileage: number;
  fuel: Fuel;
  transmission: Transmission;
  drivetrain: string;
  engine: string;
  power: string;
  color: string;
  owners: number;
  seats: number;
  doors: number;
  location: string;
  rating: number;
  reviews: number;
  photos: number;
  videos: number;
  featured: boolean;
  popular: boolean;
  images: string[];
  description: string;
  features: string[];
  seller: Seller;
  createdAt: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  content: string[];
}

export interface Product {
  slug: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  details: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  date?: string;
  source?: "Google" | "Justdial";
  featured?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface MessageThread {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread: boolean;
  messages: { from: "them" | "me"; text: string; time: string }[];
}

export interface CarFilters {
  q?: string;
  make?: string;
  model?: string;
  body?: string;
  fuel?: string;
  transmission?: string;
  price?: string;
  minPrice?: string;
  year?: string;
  mileage?: string;
  color?: string;
  sort?: string;
  page?: string;
}

export interface CartLine {
  slug: string;
  qty: number;
}

export interface SessionUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface RegisteredUser extends SessionUser {
  password: string;
}

export interface ShowroomState {
  favorites: string[];
  compare: string[];
  cart: CartLine[];
  userListings: Car[];
  session: SessionUser | null;
  users: RegisteredUser[];
}
