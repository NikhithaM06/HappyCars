"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Calendar,
  CalendarCheck,
  CarFront,
  Check,
  Cog,
  Fuel,
  Gauge,
  Mail,
  Palette,
  Phone,
  User,
  X,
} from "lucide-react";
import { CarImageGallery } from "@/components/cars/CarImageGallery";
import { VehicleEnquiryForm } from "@/components/cars/CarEnquiryPageView";
import { useShowroom } from "@/context/ShowroomContext";
import { formatInr, formatKm, monthlyPayment } from "@/lib/format";
import type { Car } from "@/lib/types";

// Helpers for Brand & Model and Variant
export function getCarNames(car: Car) {
  if (car.variant) {
    return {
      carName: `${car.make} ${car.model}`,
      variant: car.variant,
    };
  }

  // Strip trailing year from title
  const cleanTitle = car.title.replace(new RegExp(`\\s*${car.year}\\s*$`), "").trim();

  if (cleanTitle.toLowerCase().startsWith(car.make.toLowerCase())) {
    const afterMake = cleanTitle.slice(car.make.length).trim();
    const parts = afterMake.split(/\s+/);
    if (parts.length > 1) {
      return {
        carName: `${car.make} ${parts[0]}`,
        variant: parts.slice(1).join(" "),
      };
    } else if (parts.length === 1 && parts[0]) {
      return {
        carName: `${car.make} ${parts[0]}`,
        variant: car.model || car.condition || `${car.year}`,
      };
    }
  }

  return {
    carName: `${car.make} ${car.model}`,
    variant: cleanTitle.replace(`${car.make} ${car.model}`, "").trim() || `${car.year}`,
  };
}

export function formatPriceLakh(price: number): string {
  if (price >= 10000000) {
    const cr = price / 10000000;
    return `₹${cr.toFixed(2)} Crore`;
  }
  const lakh = price / 100000;
  return `₹${lakh.toFixed(2)} Lakh`;
}

function formatOwnership(owners?: number): string | null {
  if (!owners) return null;
  if (owners === 1) return "1st owner";
  if (owners === 2) return "2nd owner";
  if (owners === 3) return "3rd owner";
  return `${owners}th owner`;
}

export function CarDetail({ car }: { car: Car }) {
  const { carName, variant } = getCarNames(car);
  const status = car.status || "Available";

  const officialPhone = "+91 89048 05777";
  const officialPhoneClean = "+918904805777";

  const [isEnquiryActive, setIsEnquiryActive] = useState(false);
  const enquirySectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const action = params.get("action");
    if (
      action === "enquiry" ||
      params.get("enquiry") === "true" ||
      window.location.hash === "#enquiry" ||
      window.location.hash === "#interested-in-this-car"
    ) {
      setIsEnquiryActive(true);
      setTimeout(() => {
        const target =
          document.getElementById("vehicle-enquiry-section") ||
          document.getElementById("interested-in-this-car") ||
          document.getElementById("interested-in-this-car-desktop");
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, []);

  // 7 specifications array dynamically formatted
  const specs = [
    { label: "Year", value: car.year ? String(car.year) : null, icon: Calendar },
    { label: "Kilometres", value: car.mileage ? formatKm(car.mileage) : null, icon: Gauge },
    { label: "Fuel Type", value: car.fuel || null, icon: Fuel },
    { label: "Transmission", value: car.transmission || null, icon: Cog },
    { label: "Body Type", value: car.body || null, icon: CarFront },
    { label: "Ownership", value: formatOwnership(car.owners), icon: User },
    { label: "Colour", value: car.color || null, icon: Palette },
  ].filter((item) => Boolean(item.value));

  return (
    <div className="bg-[#f8f9fb] min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 lg:pb-12 space-y-6">
        {/* Top Breadcrumb Navigation */}
        <div>
          <Link
            href="/browse-cars"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#102B5C] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Browse Cars</span>
          </Link>
        </div>

        {/* 
          RESPONSIVE MAIN CONTENT GRID:
          - Desktop (lg:): 2-column layout. Left: Gallery, Specs, About, Assured. Right (sticky): Pricing & Actions.
          - Tablet / Mobile (< lg:): Single-column stack with fixed bottom bar for mobile.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT / MAIN COLUMN (Desktop: 7 cols, Tablet/Mobile: 12 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* 1. Large Car Image Gallery */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 shadow-xs">
              <CarImageGallery images={car.images} title={car.title} />
            </div>

            {/* Pricing card visible on Tablet & Mobile ONLY (< lg) */}
            <div className="lg:hidden rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#102B5C] tracking-tight">
                    {carName}
                  </h1>
                  <p className="mt-0.5 text-xs sm:text-sm font-medium text-slate-500">
                    {variant}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="shrink-0">
                  {status === "Available" && (
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
                      Available
                    </span>
                  )}
                  {status === "Reserved" && (
                    <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200">
                      Reserved
                    </span>
                  )}
                  {status === "Sold" && (
                    <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 border border-rose-200">
                      Sold
                    </span>
                  )}
                </div>
              </div>

              {/* Reserved notice */}
              {status === "Reserved" && (
                <div className="mt-3.5 rounded-xl border border-amber-200 bg-amber-50/90 p-3 text-xs sm:text-sm text-amber-900 leading-relaxed">
                  <strong className="font-semibold">Notice:</strong> This car is reserved for another customer. Send an enquiry to be notified if it becomes available.
                </div>
              )}

              {/* Divider */}
              <div className="border-t border-slate-100 my-3 sm:my-4" />

              {/* Pricing Row */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-[#9A7B2C] tracking-tight">
                    {formatPriceLakh(car.price)}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-slate-500">
                    {formatInr(car.price)}
                  </p>
                </div>
                <p className="text-xs text-slate-400 font-medium">Listed price</p>
              </div>
            </div>

            {/* 2. Vehicle Specifications Card */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-[#102B5C] mb-4 sm:mb-5">
                Vehicle Specifications
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {specs.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="rounded-xl bg-slate-50 border border-slate-100 p-3.5 sm:p-4 flex items-start gap-3"
                    >
                      <Icon size={18} className="text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-xs font-medium text-slate-500">
                          {item.label}
                        </span>
                        <span className="block text-sm sm:text-base font-bold text-slate-900 mt-0.5 leading-snug">
                          {item.value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. About This Car Card */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-[#102B5C] mb-3">
                About This Car
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {car.description}
              </p>
            </div>

            {/* 4. Happy Cars Assured Card */}
            <div className="rounded-2xl bg-[#0B2241] p-6 sm:p-7 text-white shadow-md border border-white/10">
              <div className="flex items-center gap-2.5 mb-4">
                <Award size={22} className="text-[#F4C34E] shrink-0" />
                <h2 className="text-lg sm:text-xl font-bold text-[#F4C34E]">
                  Happy Cars Assured
                </h2>
              </div>

              <ul className="space-y-3 text-sm sm:text-base font-medium">
                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span>Multi-point quality inspection</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span>Verified documents and service history</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span>Help with finance and insurance</span>
                </li>
              </ul>
            </div>

            {/* In-page Action Card on Tablet/Mobile */}
            <div id="interested-in-this-car" className="lg:hidden rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-[#102B5C]">
                Interested in this car?
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 mb-5">
                Connect with our showroom team for more information.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <a
                  href={`tel:${officialPhoneClean}`}
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#102B5C] bg-white px-4 py-3 text-xs sm:text-sm font-bold text-[#102B5C] transition-colors hover:bg-slate-50"
                >
                  <Phone size={16} />
                  <span>Call Showroom</span>
                </a>

                <Link
                  href={`/cars/${car.slug}/enquiry`}
                  onClick={() => {
                    setIsEnquiryActive(true);
                    setTimeout(() => {
                      document.getElementById("vehicle-enquiry-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 100);
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#102B5C] bg-[#102B5C] px-4 py-3 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-[#163761] cursor-pointer"
                >
                  <Mail size={16} />
                  <span>Send Vehicle Enquiry</span>
                </Link>

                <Link
                  href={`/cars/${car.slug}/test-drive`}
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#102B5C] bg-white px-4 py-3 text-xs sm:text-sm font-bold text-[#102B5C] transition-colors hover:bg-slate-50"
                >
                  <CalendarCheck size={16} />
                  <span>Request Test Drive</span>
                </Link>
              </div>
            </div>

            {/* Embedded Vehicle Enquiry Section (Opens when clicked or navigated via Send a Vehicle Enquiry) */}
            {isEnquiryActive && (
              <div
                id="vehicle-enquiry-section"
                ref={enquirySectionRef}
                className="rounded-3xl border-2 border-[#102B5C] bg-[#F4F6FA] p-5 sm:p-7 shadow-xl space-y-4 scroll-mt-24"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2.5 text-[#102B5C]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#102B5C] text-white">
                      <Mail size={18} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold">
                        Send Vehicle Enquiry
                      </h3>
                      <p className="text-xs text-slate-500">
                        Inquire directly about the {car.year} {carName} {variant}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEnquiryActive(false)}
                    className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                    aria-label="Close enquiry form"
                    title="Close"
                  >
                    <X size={20} />
                  </button>
                </div>
                <VehicleEnquiryForm
                  car={car}
                  mode="enquiry"
                  showVehicleCard={true}
                  showSegmentedToggle={false}
                  onCancel={() => setIsEnquiryActive(false)}
                />
              </div>
            )}
          </div>

          {/* RIGHT / SIDEBAR COLUMN (Desktop Only: 5 cols, sticky) */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Desktop Pricing & Basic Details Card */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-[#102B5C] tracking-tight">
                    {carName}
                  </h1>
                  <p className="mt-0.5 text-sm font-medium text-slate-500">
                    {variant}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="shrink-0">
                  {status === "Available" && (
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                      Available
                    </span>
                  )}
                  {status === "Reserved" && (
                    <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
                      Reserved
                    </span>
                  )}
                  {status === "Sold" && (
                    <span className="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 border border-rose-200">
                      Sold
                    </span>
                  )}
                </div>
              </div>

              {/* Reserved notice */}
              {status === "Reserved" && (
                <div className="rounded-xl border border-amber-200 bg-amber-50/90 p-3 text-xs text-amber-900 leading-relaxed">
                  <strong className="font-semibold">Notice:</strong> This car is reserved for another customer. Send an enquiry to be notified if it becomes available.
                </div>
              )}

              {/* Quick Specs Strip */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 pt-1">
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
                  {car.year}
                </span>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
                  {car.fuel}
                </span>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
                  {car.transmission}
                </span>
                {car.mileage && (
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
                    {formatKm(car.mileage)}
                  </span>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 pt-3" />

              {/* Pricing */}
              <div>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">
                  Listed Price
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <p className="text-3xl font-extrabold text-[#9A7B2C] tracking-tight">
                    {formatPriceLakh(car.price)}
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    ({formatInr(car.price)})
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Action & Contact Card */}
            <div id="interested-in-this-car-desktop" className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-lg font-bold text-[#102B5C]">
                  Interested in this car?
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Connect directly with our Kundapura showroom team.
                </p>
              </div>

              <div className="space-y-3 pt-1">
                {/* Send Enquiry */}
                <Link
                  href={`/cars/${car.slug}/enquiry`}
                  onClick={() => {
                    setIsEnquiryActive(true);
                    setTimeout(() => {
                      document.getElementById("vehicle-enquiry-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 100);
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#102B5C] py-3.5 px-4 text-sm font-bold text-white shadow-sm hover:bg-[#163761] transition-all cursor-pointer"
                >
                  <Mail size={16} />
                  <span>Send Vehicle Enquiry</span>
                </Link>

                {/* Request Test Drive */}
                <Link
                  href={`/cars/${car.slug}/test-drive`}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-[#102B5C] bg-white py-3.5 px-4 text-sm font-bold text-[#102B5C] hover:bg-slate-50 transition-all"
                >
                  <CalendarCheck size={16} />
                  <span>Request a Test Drive</span>
                </Link>

                {/* Call Showroom */}
                <a
                  href={`tel:${officialPhoneClean}`}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 py-3 px-4 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <Phone size={14} className="text-[#102B5C]" />
                  <span>Call Showroom ({officialPhone})</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Bottom Action Bar (Mobile Only: lg:hidden) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 sm:p-3 shadow-[0_-6px_25px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-3 gap-2 max-w-[600px] mx-auto">
          {/* Call Showroom */}
          <a
            href={`tel:${officialPhoneClean}`}
            className="flex items-center justify-center gap-1.5 rounded-lg border-2 border-[#102B5C] bg-white py-2.5 px-2 text-[11px] sm:text-xs font-bold text-[#102B5C] active:bg-slate-100"
          >
            <Phone size={14} className="shrink-0" />
            <span className="truncate">Call Showroom</span>
          </a>

          {/* Send Enquiry */}
          <Link
            href={`/cars/${car.slug}/enquiry`}
            onClick={() => {
              setIsEnquiryActive(true);
              setTimeout(() => {
                document.getElementById("vehicle-enquiry-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 100);
            }}
            className="flex items-center justify-center gap-1.5 rounded-lg border-2 border-[#102B5C] bg-[#102B5C] py-2.5 px-2 text-[11px] sm:text-xs font-bold text-white active:bg-[#163761] cursor-pointer"
          >
            <Mail size={14} className="shrink-0" />
            <span className="truncate">Send Vehicle Enquiry</span>
          </Link>

          {/* Request Test Drive */}
          <Link
            href={`/cars/${car.slug}/test-drive`}
            className="flex items-center justify-center gap-1.5 rounded-lg border-2 border-[#102B5C] bg-white py-2.5 px-2 text-[11px] sm:text-xs font-bold text-[#102B5C] active:bg-slate-100"
          >
            <CalendarCheck size={14} className="shrink-0" />
            <span className="truncate">Test Drive</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// User-submitted car detail wrapper
export function UserCarDetail({ slug }: { slug: string }) {
  const { userListings, ready } = useShowroom();
  if (!ready) {
    return (
      <div className="max-w-[860px] mx-auto py-16 px-4 text-center font-semibold text-[#102B5C]">
        Loading vehicle details…
      </div>
    );
  }
  const car = userListings.find((item) => item.slug === slug);
  if (!car) {
    return (
      <div className="max-w-[860px] mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl font-extrabold text-[#102B5C]">This vehicle is not in our showroom</h1>
        <p className="mt-3 text-slate-600">Please browse our available collection to find matching vehicles.</p>
        <Link
          href="/browse-cars"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#102B5C] px-6 py-3 text-sm font-bold text-white hover:bg-[#163761]"
        >
          <ArrowLeft size={16} />
          <span>Browse Available Cars</span>
        </Link>
      </div>
    );
  }
  return <CarDetail car={car} />;
}

// Retained for shared use by Interactive.tsx tools without rendering on CarDetail page
export function LoanWidget({ price }: { price: number }) {
  const [down, setDown] = useState(20);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(10.5);
  const principal = price * (1 - down / 100);
  const payment = monthlyPayment(principal, rate, years * 12);
  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
      <h2 className="font-semibold text-navy">Estimate a loan</h2>
      <label className="mt-3 block text-sm text-ink">Down payment {down}%
        <input className="mt-1 w-full" type="range" min={0} max={60} value={down} onChange={(event) => setDown(Number(event.target.value))} />
      </label>
      <label className="mt-3 block text-sm text-ink">Tenure {years} years
        <input className="mt-1 w-full" type="range" min={1} max={7} value={years} onChange={(event) => setYears(Number(event.target.value))} />
      </label>
      <label className="mt-3 block text-sm text-ink">Interest {rate}%
        <input className="mt-1 w-full" type="range" min={7} max={16} step={0.1} value={rate} onChange={(event) => setRate(Number(event.target.value))} />
      </label>
      <p className="mt-4 text-sm text-ink">Indicative EMI</p>
      <p className="text-2xl font-semibold text-navy">{formatInr(Math.round(payment))}<span className="text-sm font-medium text-ink"> / month</span></p>
      <p className="mt-2 text-xs text-ink">A planning figure only. The lender confirms the rate.</p>
    </div>
  );
}
