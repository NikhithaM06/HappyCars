"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CarCard } from "@/components/cars/CarCard";
import { VehicleFilterPanel } from "@/components/home/HeroSearch";
import { applyCarFilters } from "@/lib/format";
import { getCars } from "@/services/catalog";
import type { CarFilters } from "@/lib/types";

export function BrowseCarsView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cars = useMemo(() => getCars(), []);

  const action = searchParams.get("action") || undefined;

  const filters: CarFilters = useMemo(() => {
    return {
      make: searchParams.get("make") || "",
      body: searchParams.get("body") || "",
      fuel: searchParams.get("fuel") || "",
      year: searchParams.get("year") || "",
      transmission: searchParams.get("transmission") || "",
      price: searchParams.get("price") || "",
      minPrice: searchParams.get("minPrice") || "",
    };
  }, [searchParams]);

  const filteredCars = useMemo(() => {
    return applyCarFilters(cars, filters);
  }, [cars, filters]);

  const hasActiveFilters = Boolean(
    filters.make ||
      filters.body ||
      filters.fuel ||
      filters.year ||
      filters.transmission ||
      filters.price ||
      filters.minPrice,
  );

  const handleReset = () => {
    router.push("/browse-cars");
  };

  return (
    <div className="space-y-10">
      {/* Same 2-row vehicle filter console as homepage hero */}
      <VehicleFilterPanel mode="page" />

      {/* Enquiry Banner if navigated from Send a Vehicle Enquiry */}
      {action === "enquiry" && (
        <div className="rounded-2xl bg-[#0B2241] p-4 sm:p-5 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-md">
          <div>
            <span className="inline-block rounded-full bg-gold/20 px-2.5 py-0.5 text-[11px] font-bold text-gold uppercase tracking-wider mb-1">
              Vehicle Enquiry
            </span>
            <h3 className="text-sm sm:text-base font-bold">
              Select any car below and click &quot;View Details&quot; to send your enquiry
            </h3>
          </div>
          <Link
            href="/browse-cars"
            className="text-xs font-semibold text-white/80 hover:text-white underline underline-offset-2 shrink-0"
          >
            Clear
          </Link>
        </div>
      )}

      {/* Results Header and Car Cards */}
      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line/70 pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-navy sm:text-2xl">
              Available Vehicles
            </h2>
            <p className="mt-1 text-xs text-ink sm:text-sm">
              Showing <span className="font-semibold text-navy">{filteredCars.length}</span>{" "}
              {filteredCars.length === 1 ? "car" : "cars"} in stock
            </p>
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="cursor-pointer text-xs font-semibold text-navy underline underline-offset-4 transition-colors hover:text-gold-dark sm:text-sm"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {filteredCars.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-line bg-white p-12 text-center shadow-card">
            <h3 className="text-lg font-bold text-navy">No cars match those filters</h3>
            <p className="mt-2 text-sm text-ink">
              Try adjusting or clearing your criteria to view our full collection.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-5 inline-flex cursor-pointer items-center justify-center rounded-xl bg-navy px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-navy-deep hover:shadow-card"
            >
              Clear Filters &amp; View All
            </button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} action={action} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
