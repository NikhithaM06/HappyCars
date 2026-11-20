"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { CarCard } from "@/components/cars/CarCard";
import { SectionHeading } from "@/components/ui/PageHero";
import { getCars } from "@/services/catalog";

const brandOrder = [
  "Maruti Suzuki",
  "Hyundai",
  "Tata",
  "Toyota",
  "Kia",
  "Honda",
  "Mahindra",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Skoda",
  "Volvo",
] as const;

const brandLogos: Record<string, string> = {
  "Maruti Suzuki": "/brands/maruti-suzuki.png",
  Hyundai: "/brands/hyundai.png",
  Tata: "/brands/tata.png",
  Toyota: "/brands/toyota.png",
  Kia: "/brands/kia.png",
  Honda: "/brands/honda.png",
  Mahindra: "/brands/mahindra.png",
  BMW: "/brands/bmw.png",
  "Mercedes-Benz": "/brands/mercedes-benz.png",
  Audi: "/brands/audi.png",
  Skoda: "/brands/skoda.png",
  Volvo: "/brands/volvo.png",
};

export function FeaturedListings() {
  const allCars = useMemo(() => getCars(), []);
  const cars = useMemo(() => allCars.filter((car) => car.featured), [allCars]);
  const brands = useMemo(() => {
    const available = new Set(allCars.map((car) => car.make));
    return brandOrder.filter((make) => available.has(make));
  }, [allCars]);
  const brandRowRef = useRef<HTMLDivElement>(null);
  const visible = useMemo(() => cars.slice(0, 6), [cars]);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollBrands = (direction: -1 | 1) => {
    if (!brandRowRef.current) return;
    const el = brandRowRef.current;
    const scrollAmount = el.clientWidth;
    el.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    const el = brandRowRef.current;
    if (!el) return;
    const updateScrollState = () => {
      setCanScrollLeft(el.scrollLeft > 6);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 6);
    };
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [brands]);

  return (
    <>
      <div className="container-page pt-14 pb-6 md:pt-16">
        <SectionHeading eyebrow="" title="Featured listings" text="" />
      </div>

      {/* Browse by Brand — full-width edge-to-edge section */}
      <section className="w-full bg-[#F1F5FA] py-8 sm:py-10" aria-label="Browse by Brand">
        <div className="container-page">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-semibold tracking-tight text-navy sm:text-2xl">Browse by Brand</h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-1.5 md:flex">
                <button
                  type="button"
                  onClick={() => scrollBrands(-1)}
                  disabled={!canScrollLeft}
                  aria-label="Scroll brands left"
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink shadow-[0_2px_8px_rgba(20,45,75,0.06)] transition-all ${
                    canScrollLeft
                      ? "cursor-pointer hover:bg-white hover:text-navy hover:shadow-md"
                      : "cursor-not-allowed opacity-40"
                  }`}
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollBrands(1)}
                  disabled={!canScrollRight}
                  aria-label="Scroll brands right"
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink shadow-[0_2px_8px_rgba(20,45,75,0.06)] transition-all ${
                    canScrollRight
                      ? "cursor-pointer hover:bg-white hover:text-navy hover:shadow-md"
                      : "cursor-not-allowed opacity-40"
                  }`}
                >
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
              </div>
              <Link
                href="/browse-cars"
                className="text-sm font-semibold text-[#9a7b2c] transition-colors hover:text-navy"
              >
                View all
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              ref={brandRowRef}
              className="flex flex-nowrap items-center gap-3 overflow-x-auto py-3 sm:gap-4 lg:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory scroll-smooth"
            >
              {brands.map((make) => (
                <Link
                  key={make}
                  href={`/browse-cars?make=${encodeURIComponent(make)}`}
                  aria-label={`Browse ${make} cars`}
                  title={`Browse ${make} cars`}
                  className="group flex shrink-0 cursor-pointer flex-col items-center justify-center focus:outline-none snap-start w-[calc((100%-36px)/4)] sm:w-[calc((100%-80px)/6)] lg:w-[calc((100%-168px)/8)]"
                >
                  <span
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFFFFF] p-2.5 transition-all duration-200 sm:h-20 sm:w-20 sm:p-3.5 lg:h-24 lg:w-24 lg:p-4 shadow-[0_4px_18px_rgba(20,45,75,0.08)] group-hover:-translate-y-1 group-hover:shadow-[0_8px_24px_rgba(20,45,75,0.12)] group-hover:ring-2 group-hover:ring-gold"
                  >
                    <Image
                      src={brandLogos[make]}
                      alt={`${make} logo`}
                      width={72}
                      height={54}
                      unoptimized
                      className="max-h-9 w-auto max-w-[44px] object-contain transition-transform duration-200 group-hover:scale-105 sm:max-h-12 sm:max-w-[58px] lg:max-h-14 lg:max-w-[68px]"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pt-10 pb-16 md:pt-12 md:pb-20">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </>
  );
}
