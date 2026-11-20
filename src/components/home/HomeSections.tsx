"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BadgeCheck, Star } from "lucide-react";
import { CarCard } from "@/components/cars/CarCard";
import { CategoryCards } from "@/components/home/CategoryCards";
import { SectionHeading } from "@/components/ui/PageHero";
import { testimonials } from "@/data/content";
import { getCars } from "@/services/catalog";

export function Categories() {
  const cars = getCars();
  const categories = [
    { body: "SUV", image: "/categories/suv.png" },
    { body: "Sedan", image: "/categories/sedan.png" },
    { body: "Hatchback", image: "/categories/hatchback.png" },
    { body: "MPV", image: "/categories/mpv.png" },
    { body: "Coupe", image: "/categories/coupe.png" },
  ] as const;

  const items = categories.map(({ body, image }) => ({
    body,
    image,
    count: cars.filter((car) => car.body === body).length,
  }));

  return (
    <section className="mt-12 bg-[#f8f9fa] py-14 md:py-16">
      <div className="container-page">
        <CategoryCards items={items} />
      </div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#021c44] text-white">
      {/* Showroom Background Image without baked-in text */}
      <div className="absolute inset-0">
        <Image
          src="/images/home-banner-clean.jpg"
          alt="Happy Cars Showroom with certified pre-owned cars"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-[75%_center] md:object-right lg:object-center"
        />
        {/* Dark navy overlay gradient ensuring clear text contrast while showing the cars */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(2,28,68,0.98) 0%, rgba(2,28,68,0.92) 42%, rgba(2,28,68,0.65) 58%, rgba(2,28,68,0.12) 76%, rgba(2,28,68,0) 100%)",
          }}
        />
      </div>

      {/* Actual HTML Text Content (Crawlable & Accessible) */}
      <div className="container-page relative z-10 py-14 sm:py-18 md:py-20 lg:py-24">
        <div className="max-w-xl md:max-w-2xl">
          {/* Yellow accent bar */}
          <div className="w-12 h-1 bg-[#F4C34E] mb-3 sm:mb-4 rounded-full" />

          {/* HTML Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-[1.15]">
            <span className="block">Driving Trust.</span>
            <span className="block">
              Delivering <span className="text-[#F4C34E]">Happiness.</span>
            </span>
          </h1>

          {/* HTML Description Paragraph */}
          <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base leading-relaxed text-slate-200/90 max-w-lg">
            Established in 2010, Happy Cars is a multi-brand pre-owned car
            showroom committed to making every car-buying and selling experience
            simple, transparent and trustworthy.
          </p>
        </div>
      </div>
    </section>
  );
}

export function PopularListings() {
  const cars = getCars().filter((car) => car.popular).slice(0, 3);
  return (
    <section className="bg-navy py-16">
      <div className="container-page">
        <SectionHeading light eyebrow="Asked for often" title="Popular listings" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}

const statsData = [
  { target: 1800, suffix: "+", label: "Total Cars", format: true },
  { target: 160, suffix: "", label: "Available", format: false },
  { target: 12, suffix: "", label: "Reserved", format: false },
  { target: 1, suffix: "", label: "Sold", format: false },
];

export function Stats() {
  const containerRef = useRef<HTMLElement>(null);
  const [values, setValues] = useState<string[]>(["0", "0", "0", "0"]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setValues(["1,800+", "160", "12", "1"]);
      return;
    }

    let rafId = 0;
    let observer: IntersectionObserver | null = null;

    const startCounting = () => {
      const duration = 1800; // ~1.8 seconds smooth progression
      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth cubic ease-out
        const ease = 1 - Math.pow(1 - progress, 3);

        const currentValues = statsData.map((item) => {
          if (progress >= 1) {
            return item.format
              ? `${item.target.toLocaleString("en-US")}${item.suffix}`
              : `${item.target}${item.suffix}`;
          }
          const currentNumber = Math.round(ease * item.target);
          if (currentNumber === 0) return "0";
          return item.format
            ? `${currentNumber.toLocaleString("en-US")}${item.suffix}`
            : `${currentNumber}${item.suffix}`;
        });

        setValues(currentValues);

        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        }
      };

      rafId = requestAnimationFrame(step);
    };

    if (typeof IntersectionObserver === "undefined") {
      startCounting();
      return;
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (observer) {
            observer.disconnect();
            observer = null;
          }
          startCounting();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);

    return () => {
      if (observer) observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={containerRef} className="container-page grid gap-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
      {statsData.map((item, index) => (
        <div key={item.label} className="text-center">
          <p className="text-4xl font-semibold text-navy">{values[index]}</p>
          <p className="mt-1 text-sm text-ink">{item.label}</p>
        </div>
      ))}
    </section>
  );
}

export function Testimonials() {
  const featured = testimonials.filter((t) => t.featured).slice(0, 3);

  return (
    <section className="bg-mist py-16">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-dark">
            Real Customer Experiences
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-navy md:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-base leading-7 text-ink">
            Every car has a story. Every happy customer makes ours special.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-card"
            >
              {/* Star rating */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < item.rating
                        ? "fill-gold text-gold"
                        : "fill-gray-200 text-gray-200"
                    }
                  />
                ))}
              </div>

              <blockquote className="mt-3 flex-1 text-sm leading-6 text-ink">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                <div>
                  <p className="font-semibold text-navy">{item.name}</p>
                  <p className="text-xs text-ink">{item.role}</p>
                </div>
                {item.source && (
                  <span className="rounded-full bg-navy/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-navy/60">
                    {item.source}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Google aggregate + link */}
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2 text-sm text-ink">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < 4
                      ? "fill-gold text-gold"
                      : i === 4
                        ? "fill-gold/50 text-gold/50"
                        : "fill-gray-200 text-gray-200"
                  }
                />
              ))}
            </div>
            <span className="font-medium text-navy">4.4 / 5</span>
            <span className="text-ink/60">&mdash; 110+ reviews on Google &amp; Justdial</span>
          </div>
          <Link
            href="/testimonials"
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-navy shadow-sm transition-all hover:bg-gold-dark hover:shadow-md"
          >
            More Reviews
          </Link>
        </div>
      </div>
    </section>
  );
}

export function TrustRow() {
  return (
    <div className="container-page -mt-2 flex items-center gap-2 pb-2 text-sm text-ink">
      <BadgeCheck size={16} className="text-navy" />
      Prices include the inspection findings we would mention out loud.
    </div>
  );
}
