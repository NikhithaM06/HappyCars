import type { CarFilters, Car } from "./types";

export const PAGE_SIZE = 9;

export const PRICE_OPTIONS = [
  { value: "", label: "Any price" },
  { value: "1000000", label: "Under ₹10 lakh" },
  { value: "2000000", label: "Under ₹20 lakh" },
  { value: "4000000", label: "Under ₹40 lakh" },
  { value: "7500000", label: "Under ₹75 lakh" },
];

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "mileage", label: "Lowest mileage" },
  { value: "rating", label: "Highest rated" },
];

export const MILEAGE_OPTIONS = [
  { value: "", label: "Any mileage" },
  { value: "20000", label: "Under 20,000 km" },
  { value: "40000", label: "Under 40,000 km" },
  { value: "60000", label: "Under 60,000 km" },
  { value: "100000", label: "Under 1,00,000 km" },
];

export function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatKm(value: number) {
  return `${new Intl.NumberFormat("en-IN").format(value)} km`;
}

export function formatCompactPrice(value: number) {
  if (value >= 10000000) {
    const cr = value / 10000000;
    return `₹${cr.toFixed(cr % 1 === 0 ? 0 : 2)} Cr`;
  }
  const lakh = value / 100000;
  return `₹${lakh.toFixed(lakh % 1 === 0 ? 0 : 2)} L`;
}

export function monthlyPayment(principal: number, annualRate: number, months: number) {
  if (principal <= 0 || months <= 0) return 0;
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * factor) / (factor - 1);
}

export function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

export function applyCarFilters(cars: Car[], filters: CarFilters) {
  const q = filters.q?.trim().toLowerCase() ?? "";
  let result = cars.filter((car) => {
    if (q) {
      const haystack = `${car.title} ${car.make} ${car.model} ${car.location} ${car.color}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (filters.make && car.make !== filters.make) return false;
    if (filters.model && car.model !== filters.model) return false;
    if (filters.body && car.body !== filters.body) return false;
    if (filters.fuel && car.fuel !== filters.fuel) return false;
    if (filters.transmission && car.transmission !== filters.transmission) return false;
    if (filters.color && car.color !== filters.color) return false;
    if (filters.price && car.price > Number(filters.price)) return false;
    if (filters.minPrice && car.price < Number(filters.minPrice)) return false;
    if (filters.year && car.year < Number(filters.year)) return false;
    if (filters.mileage && car.mileage > Number(filters.mileage)) return false;
    return true;
  });

  const sort = filters.sort || "newest";
  result = [...result].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "mileage") return a.mileage - b.mileage;
    if (sort === "rating") return b.rating - a.rating;
    return b.createdAt.localeCompare(a.createdAt);
  });

  return result;
}

export function paginate<T>(items: T[], page: number, pageSize = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(Math.max(page, 1), totalPages);
  const start = (current - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    total: items.length,
    totalPages,
    page: current,
  };
}
