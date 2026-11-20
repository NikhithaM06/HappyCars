import type { Metadata } from "next";
import Link from "next/link";
import { Star, ExternalLink } from "lucide-react";
import { testimonials } from "@/data/content";

export const metadata: Metadata = {
  title: "Testimonials | Happy Cars",
  description:
    "Read genuine customer reviews and testimonials from Happy Cars Kundapura. Trusted multi-brand pre-owned car dealership since 2010.",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating
              ? "fill-gold text-gold"
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-navy-deep">
        <div className="container-page py-14 md:py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
            Trust Built Through Every Delivery
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Real Stories. Real Customers. Real Trust.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/70">
            Since 2010, Happy Cars has helped hundreds of customers find their perfect
            pre-owned vehicle. Here is what they have to say about their experience.
          </p>

          {/* Aggregate rating */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < 4
                      ? "fill-gold text-gold"
                      : i === 4
                        ? "fill-gold/50 text-gold/50"
                        : "fill-gray-300 text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-white">4.4 / 5</span>
            <span className="text-sm text-white/50">— 110+ reviews</span>
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="bg-mist py-14 md:py-16">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <figure
                key={item.name}
                className="flex flex-col rounded-2xl bg-white p-6 shadow-card"
              >
                {/* Rating */}
                <StarRating rating={item.rating} />

                {/* Review text */}
                <blockquote className="mt-3 flex-1 text-sm leading-6 text-ink">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                {/* Footer */}
                <figcaption className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                  <div>
                    <p className="font-semibold text-navy">{item.name}</p>
                    <div className="flex items-center gap-2 text-xs text-ink">
                      <span>{item.role}</span>
                      {item.date && (
                        <>
                          <span className="text-gray-300">·</span>
                          <span>{item.date}</span>
                        </>
                      )}
                    </div>
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

          {/* Link to Google */}
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-ink/60">
              Want to read more? Visit our business listing on Google.
            </p>
            <a
              href="https://www.google.com/search?q=Happy+Cars+Kundapura+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-deep"
            >
              Read All Google Reviews
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
