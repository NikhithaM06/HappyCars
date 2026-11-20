"use client";

import { Calendar, Cog, Fuel, Gauge } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatKm } from "@/lib/format";
import type { Car } from "@/lib/types";

function getCarDisplayNames(car: Car) {
  // Strip trailing year from title if present
  const cleanTitle = car.title.replace(new RegExp(`\\s*${car.year}\\s*$`), "").trim();

  if (cleanTitle.toLowerCase().startsWith(car.make.toLowerCase())) {
    const afterMake = cleanTitle.slice(car.make.length).trim();
    const parts = afterMake.split(/\s+/);
    if (parts.length > 1) {
      return {
        brandModel: `${car.make} ${parts[0]}`,
        variant: parts.slice(1).join(" "),
      };
    } else if (parts.length === 1 && parts[0]) {
      return {
        brandModel: `${car.make} ${parts[0]}`,
        variant: car.model || car.condition || `${car.year}`,
      };
    }
  }

  return {
    brandModel: `${car.make} ${car.model}`,
    variant: cleanTitle.replace(`${car.make} ${car.model}`, "").trim() || `${car.year}`,
  };
}

function formatCardPrice(price: number): string {
  if (price >= 10000000) {
    const cr = price / 10000000;
    return `₹ ${cr.toFixed(2)} Cr`;
  }
  const lakh = price / 100000;
  return `₹ ${lakh.toFixed(2)} L`;
}

export function CarCard({
  car,
  layout = "grid",
  action,
}: {
  car: Car;
  layout?: "grid" | "list";
  action?: string;
}) {
  const { brandModel, variant } = getCarDisplayNames(car);
  const formattedPrice = formatCardPrice(car.price);
  const targetHref = action
    ? `/cars/${car.slug}?action=${encodeURIComponent(action)}#interested-in-this-car`
    : `/cars/${car.slug}`;

  return (
    <Link
      href={targetHref}
      aria-label={`View details for ${car.title}`}
      className={`group relative overflow-hidden rounded-[20px] border border-slate-100 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(11,34,65,0.10)] cursor-pointer ${
        layout === "list" ? "grid md:grid-cols-[240px_1fr]" : "flex flex-col"
      }`}
    >
      {/* 1. Full-width car image with rounded top corners and compact 16/9 aspect */}
      <div
        className={`relative w-full overflow-hidden bg-slate-100 ${
          layout === "list"
            ? "aspect-[16/9] md:aspect-auto md:h-full rounded-t-[20px] md:rounded-tr-none md:rounded-l-[20px]"
            : "aspect-[16/9] rounded-t-[20px]"
        }`}
      >
        <Image
          src={car.images[0]}
          alt={car.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 360px"
        />
      </div>

      {/* 2. Card Content Layout (Compact & Well-proportioned) */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-4.5">
        <div>
          {/* Brand & Model + Subtitle */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {brandModel}
            </h3>
            <p className="mt-0.5 text-xs sm:text-sm font-normal text-slate-500 truncate">
              {variant || car.model}
            </p>
          </div>

          {/* 2x2 Specifications Grid (Compact) */}
          <div className="mt-3 sm:mt-3.5 grid grid-cols-2 gap-x-3 gap-y-1.5 sm:gap-y-2 text-xs sm:text-[13px] font-medium text-slate-700">
            {/* Top-Left: Calendar icon + Manufacturing Year */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Calendar size={15} className="shrink-0 text-slate-400" />
              <span>{car.year}</span>
            </div>

            {/* Top-Right: Fuel pump icon + Fuel Type */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Fuel size={15} className="shrink-0 text-slate-400" />
              <span>{car.fuel}</span>
            </div>

            {/* Bottom-Left: Gear/cog icon + Transmission */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Cog size={15} className="shrink-0 text-slate-400" />
              <span>{car.transmission}</span>
            </div>

            {/* Bottom-Right: Speedometer icon + Kilometers driven */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Gauge size={15} className="shrink-0 text-slate-400" />
              <span>{formatKm(car.mileage)}</span>
            </div>
          </div>

          {/* Price (Balanced & Elegant, Not Oversized) */}
          <p className="mt-3 sm:mt-3.5 text-lg sm:text-xl font-bold text-[#9A7B2C] tracking-tight truncate">
            {formattedPrice}
          </p>
        </div>

        {/* CTA Button (Compact Full-Width Pill) */}
        <div className="mt-3.5 sm:mt-4">
          <div className="w-full rounded-full bg-[#0B2241] py-2.5 text-center text-xs sm:text-sm font-bold text-white shadow-xs transition-colors group-hover:bg-[#163761]">
            View details
          </div>
        </div>
      </div>
    </Link>
  );
}
