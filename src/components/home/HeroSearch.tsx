"use client";

import { ChevronDown, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useMemo, useState } from "react";
import { getCars } from "@/services/catalog";
import { uniqueSorted } from "@/lib/format";
import type { BodyType } from "@/lib/types";

export const MIN_PRICE = 500000;
export const MAX_PRICE = 5000000;
export const PRICE_STEP = 50000;

export function formatPriceLabel(amount: number): string {
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${cr.toFixed(cr % 1 === 0 ? 0 : 2)} Cr`;
  }
  const lakh = amount / 100000;
  return `₹${lakh.toFixed(lakh % 1 === 0 ? 0 : 1)} Lakh`;
}

interface FilterSelectProps {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

function FilterSelect({ id, label, value, options, onChange }: FilterSelectProps) {
  return (
    <div className="relative">
      <label htmlFor={id} className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy/70">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-line/80 bg-mist/40 pl-3.5 pr-9 text-sm font-semibold text-navy transition-all hover:border-navy/30 focus:border-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/25"
        >
          {options.map((opt) => (
            <option key={opt.value + opt.label} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-navy/50"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export function VehicleFilterPanel({ mode = "hero" }: { mode?: "hero" | "page" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cars = useMemo(() => getCars(), []);

  // Row 1 Filter Options (derived from existing catalogue)
  const brandOptions = useMemo(() => {
    const makes = uniqueSorted(cars.map((car) => car.make));
    return [{ value: "", label: "All Brands" }, ...makes.map((item) => ({ value: item, label: item }))];
  }, [cars]);

  const categoryOptions = useMemo(() => {
    const supportedCategories: BodyType[] = ["Hatchback", "SUV", "Sedan", "MPV", "Coupe"];
    const availableBodies = new Set(cars.map((car) => car.body));
    const active = supportedCategories.filter((cat) => availableBodies.has(cat));
    return [{ value: "", label: "All Cars" }, ...active.map((cat) => ({ value: cat, label: cat }))];
  }, [cars]);

  const fuelOptions = useMemo(() => {
    const fuels = uniqueSorted(cars.map((car) => car.fuel));
    return [{ value: "", label: "Any Fuel" }, ...fuels.map((item) => ({ value: item, label: item }))];
  }, [cars]);

  const yearOptions = useMemo(() => {
    const years = uniqueSorted(cars.map((car) => String(car.year))).reverse();
    return [{ value: "", label: "Any Year" }, ...years.map((item) => ({ value: item, label: item }))];
  }, [cars]);

  // Row 2 Transmission Options
  const transmissionOptions = useMemo(() => {
    const transmissions = uniqueSorted(cars.map((car) => car.transmission));
    return [{ value: "", label: "Any Transmission" }, ...transmissions.map((item) => ({ value: item, label: item }))];
  }, [cars]);

  // State initialized from URL query params for seamless filter persistence
  const [brand, setBrand] = useState(() => searchParams.get("make") || "");
  const [category, setCategory] = useState(() => searchParams.get("body") || "");
  const [fuel, setFuel] = useState(() => searchParams.get("fuel") || "");
  const [year, setYear] = useState(() => searchParams.get("year") || "");
  const [transmission, setTransmission] = useState(() => searchParams.get("transmission") || "");
  const [minPrice, setMinPrice] = useState(() => {
    const p = searchParams.get("minPrice");
    return p ? Number(p) : MIN_PRICE;
  });
  const [maxPrice, setMaxPrice] = useState(() => {
    const p = searchParams.get("price");
    return p ? Number(p) : MAX_PRICE;
  });

  // Keep state in sync with URL changes / refreshes
  useEffect(() => {
    setBrand(searchParams.get("make") || "");
    setCategory(searchParams.get("body") || "");
    setFuel(searchParams.get("fuel") || "");
    setYear(searchParams.get("year") || "");
    setTransmission(searchParams.get("transmission") || "");
    const pMin = searchParams.get("minPrice");
    const pMax = searchParams.get("price");
    setMinPrice(pMin ? Number(pMin) : MIN_PRICE);
    setMaxPrice(pMax ? Number(pMax) : MAX_PRICE);
  }, [searchParams]);

  const handleReset = () => {
    setBrand("");
    setCategory("");
    setFuel("");
    setYear("");
    setTransmission("");
    setMinPrice(MIN_PRICE);
    setMaxPrice(MAX_PRICE);
    if (mode === "page") {
      router.push("/browse-cars");
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (brand) params.set("make", brand);
    if (category) params.set("body", category);
    if (fuel) params.set("fuel", fuel);
    if (year) params.set("year", year);
    if (transmission) params.set("transmission", transmission);
    if (maxPrice < MAX_PRICE) params.set("price", String(maxPrice));
    if (minPrice > MIN_PRICE) params.set("minPrice", String(minPrice));
    router.push(`/browse-cars${params.toString() ? `?${params}` : ""}`);
  };

  const minPercent = Math.round(((minPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100);
  const maxPercent = Math.round(((maxPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100);

  return (
    <>
      <style>{`
        .hero-range-slider::-webkit-slider-thumb {
          pointer-events: auto;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #ffffff;
          border: 3px solid #1a3760;
          box-shadow: 0 2px 8px rgba(26, 55, 96, 0.28);
          cursor: pointer;
          transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .hero-range-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          border-color: #f5c34b;
        }
        .hero-range-slider::-webkit-slider-thumb:active {
          transform: scale(1.22);
          border-color: #f5c34b;
          box-shadow: 0 0 0 4px rgba(245, 195, 75, 0.35);
        }
        .hero-range-slider::-moz-range-thumb {
          pointer-events: auto;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #ffffff;
          border: 3px solid #1a3760;
          box-shadow: 0 2px 8px rgba(26, 55, 96, 0.28);
          cursor: pointer;
          transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .hero-range-slider::-moz-range-thumb:hover {
          transform: scale(1.15);
          border-color: #f5c34b;
        }
        .hero-range-slider::-moz-range-thumb:active {
          transform: scale(1.22);
          border-color: #f5c34b;
          box-shadow: 0 0 0 4px rgba(245, 195, 75, 0.35);
        }
      `}</style>

      <form
        onSubmit={onSubmit}
        className="w-full rounded-3xl border border-line/70 bg-white p-5 sm:p-7 md:p-8 lg:p-9 shadow-[0_16px_50px_rgba(10,35,87,0.12)] transition-shadow duration-300"
        aria-label="Vehicle Search & Filter Console"
      >
        {/* ROW 1: Vehicle Selection (4 filters horizontally) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <FilterSelect
            id={`filter-brand-${mode}`}
            label="Brand"
            value={brand}
            options={brandOptions}
            onChange={setBrand}
          />
          <FilterSelect
            id={`filter-category-${mode}`}
            label="Vehicle Category"
            value={category}
            options={categoryOptions}
            onChange={setCategory}
          />
          <FilterSelect
            id={`filter-fuel-${mode}`}
            label="Fuel Type"
            value={fuel}
            options={fuelOptions}
            onChange={setFuel}
          />
          <FilterSelect
            id={`filter-year-${mode}`}
            label="Manufacturing Year"
            value={year}
            options={yearOptions}
            onChange={setYear}
          />
        </div>

        {/* Subtle Section Divider */}
        <div className="my-5 h-px w-full bg-line/80 sm:my-6" />

        {/* ROW 2: Refine Your Search (Asymmetric Layout) */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-end lg:gap-6">
          {/* 1. Transmission (Asymmetric: narrower col-span-3) */}
          <div className="md:col-span-3 lg:col-span-3">
            <FilterSelect
              id={`filter-transmission-${mode}`}
              label="Transmission"
              value={transmission}
              options={transmissionOptions}
              onChange={setTransmission}
            />
          </div>

          {/* 2. Price Range (Asymmetric: wider col-span-5 with dual-handle slider) */}
          <div className="md:col-span-5 lg:col-span-5">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-navy/70">
                Price Range
              </span>
              <span className="text-xs font-bold text-navy">
                {formatPriceLabel(minPrice)} – {formatPriceLabel(maxPrice)}
              </span>
            </div>

            <div className="relative flex h-12 items-center">
              {/* Background Track */}
              <div className="absolute inset-x-0 h-2 rounded-full bg-line" />

              {/* Highlighted Selected Range */}
              <div
                className="absolute h-2 rounded-full bg-navy"
                style={{
                  left: `${minPercent}%`,
                  width: `${Math.max(0, maxPercent - minPercent)}%`,
                }}
              />

              {/* Dual Range Inputs */}
              <input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={PRICE_STEP}
                value={minPrice}
                aria-label="Minimum price"
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val <= maxPrice - PRICE_STEP) {
                    setMinPrice(val);
                  }
                }}
                className="hero-range-slider pointer-events-none absolute inset-x-0 z-20 h-2 w-full appearance-none bg-transparent"
                style={{ zIndex: minPrice > MAX_PRICE - 100000 ? 30 : 20 }}
              />
              <input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={PRICE_STEP}
                value={maxPrice}
                aria-label="Maximum price"
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= minPrice + PRICE_STEP) {
                    setMaxPrice(val);
                  }
                }}
                className="hero-range-slider pointer-events-none absolute inset-x-0 z-20 h-2 w-full appearance-none bg-transparent"
              />
            </div>

            <div className="-mt-1 flex justify-between text-[11px] font-medium text-ink/75">
              <span>Min: {formatPriceLabel(MIN_PRICE)}</span>
              <span>Max: {formatPriceLabel(MAX_PRICE)}</span>
            </div>
          </div>

          {/* 3. Action Area */}
          <div className="flex items-center justify-end gap-3 pt-1 md:col-span-4 md:pt-0 lg:col-span-4">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex h-12 cursor-pointer items-center justify-center rounded-xl border border-line bg-mist/60 px-5 text-sm font-semibold text-navy transition-all hover:border-navy/40 hover:bg-white active:scale-[0.98]"
            >
              Clear Filters
            </button>
            <button
              type="submit"
              className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-navy px-6 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(10,35,87,0.22)] transition-all duration-150 hover:bg-navy-deep hover:shadow-[0_12px_26px_rgba(10,35,87,0.30)] active:scale-[0.98] sm:px-7"
            >
              <Search size={16} className="shrink-0 text-gold" aria-hidden="true" />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export function HeroSearch() {
  return (
    <Suspense fallback={<div className="h-44 w-full rounded-3xl bg-white shadow-card" />}>
      <VehicleFilterPanel mode="hero" />
    </Suspense>
  );
}
