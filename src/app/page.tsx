import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroSearch } from "@/components/home/HeroSearch";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import {
  Categories,
  CtaBanner,
  Stats,
  Testimonials,
} from "@/components/home/HomeSections";

export const metadata: Metadata = {
  title: "Happy Cars",
  description: "Search inspected used, certified, and low-kilometre cars at the Happy Cars showroom in Indiranagar.",
};

export default function HomePage() {
  return (
    <>
      <section className="relative">
        <div className="relative overflow-hidden bg-[#07090d] text-white lg:flex lg:min-h-[650px] lg:items-center xl:min-h-[680px]">
          {/* Desktop full-bleed showroom & black BMW background */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <div className="absolute inset-y-0 right-0 w-[90%] xl:w-[88%]">
              <Image
                src="/images/hero-happycars-showroom.jpg"
                alt="Black BMW sedan with Happy Cars plate in a luxury showroom overlooking city skyline and mountains at dusk"
                fill
                priority
                unoptimized
                className="object-cover object-[center_52%]"
              />
              <div
                className="absolute inset-y-0 left-0 w-48"
                style={{
                  background:
                    "linear-gradient(90deg, #07090d 0%, rgba(7,9,13,0.88) 42%, rgba(7,9,13,0) 100%)",
                }}
              />
            </div>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, #07090d 0%, #07090d 20%, rgba(7,9,13,0.85) 35%, rgba(7,9,13,0.3) 50%, rgba(7,9,13,0) 65%)",
              }}
            />
          </div>

          {/* Left-aligned Hero Content */}
          <div className="container-page relative z-10 pt-12 pb-6 sm:pt-14 sm:pb-8 lg:pt-20 lg:pb-40">
            <div className="max-w-[520px]">
              <div className="mb-4">
                <span className="text-[11px] font-semibold tracking-[0.22em] text-zinc-200/90 uppercase sm:text-xs">
                  Premium Car Dealership
                </span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-white uppercase leading-[1.04] sm:text-5xl lg:text-[56px] xl:text-[62px]">
                <span className="block">Drive Your</span>
                <span className="block">
                  <span className="text-[#F4C34E]">Dream</span> Car
                </span>
              </h1>

              <p className="mt-5 max-w-[430px] text-base leading-relaxed text-zinc-300 sm:text-[17px]">
                Explore our premium collection of vehicles and find the perfect car that matches your lifestyle.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
                <Link
                  href="/browse-cars"
                  className="inline-flex items-center justify-center rounded-lg bg-[#F4C34E] px-6 py-3.5 text-sm font-semibold text-[#102B5C] shadow-[0_10px_24px_rgba(244,195,78,0.25)] transition hover:bg-[#DDAA32] sm:px-7"
                >
                  <span>Browse Cars</span>
                </Link>
                <Link
                  href="/browse-cars?action=enquiry"
                  className="inline-flex items-center justify-center rounded-lg border border-[#F4C34E] bg-black/45 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xs transition hover:border-[#F4C34E] hover:bg-[#F4C34E] hover:text-[#102B5C] sm:px-7"
                >
                  <span>Send a Vehicle Enquiry</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile & Tablet prominent showroom car view */}
          <div className="relative h-[280px] w-full sm:h-[370px] md:h-[440px] lg:hidden">
            <Image
              src="/images/hero-happycars-showroom.jpg"
              alt="Black BMW sedan with Happy Cars plate in a luxury showroom overlooking city skyline and mountains at dusk"
              fill
              priority
              unoptimized
              className="object-cover object-[56%_50%]"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #07090d 0%, rgba(7,9,13,0) 10%, rgba(7,9,13,0) 90%, #07090d 100%)",
              }}
            />
          </div>
          <div className="h-20 bg-[#07090d] lg:hidden" aria-hidden="true" />
        </div>
        <div className="container-page relative z-10 -mt-20">
          <HeroSearch />
        </div>
      </section>
      <Categories />
      <FeaturedListings />
      <CtaBanner />
      <Stats />
      <Testimonials />
    </>
  );
}
