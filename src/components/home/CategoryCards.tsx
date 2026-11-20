"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export interface CategoryCardItem {
  body: string;
  image: string;
  count?: number;
}

export function CategoryCards({ items }: { items: CategoryCardItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    let raf1 = 0;
    let raf2 = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          raf1 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => {
              setVisible(true);
            });
          });
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-category-cards-grid
      className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5"
    >
      {items.map(({ body, image }, index) => (
        <div
          key={body}
          data-category-card={body}
          style={{ transitionDelay: visible ? `${index * 150}ms` : "0ms" }}
          className={`h-full category-card-reveal ${visible ? "is-visible" : ""}`}
        >
          <Link
            href={`/inventory?body=${body}`}
            className="group flex h-full flex-col items-center justify-between rounded-xl border border-line/60 bg-white px-5 pb-7 pt-8 text-center shadow-[0_2px_16px_rgba(26,55,96,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(26,55,96,0.10)]"
          >
            <div className="flex h-24 w-full items-center justify-center sm:h-28">
              <Image
                src={image}
                alt={body}
                width={600}
                height={260}
                className="max-h-full w-full max-w-[170px] object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <p className="text-[15px] font-semibold text-navy">{body}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
