"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface CarImageGalleryProps {
  images: string[];
  title: string;
}

export function CarImageGallery({ images = [], title }: CarImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const total = images.length;

  // Reset to first slide if images prop changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  // Accessibility check for prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      if (mediaQuery.matches) {
        setIsPlaying(false);
        setIsUserPaused(true);
      }
      const listener = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
        if (e.matches) {
          setIsPlaying(false);
          setIsUserPaused(true);
        }
      };
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  const nextImage = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevImage = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      setIsUserPaused(!next);
      return next;
    });
  };

  // Automatic sliding timer (4.5 seconds)
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (total > 1 && isPlaying && !isHovered && !isUserPaused && !prefersReducedMotion) {
      timerRef.current = setInterval(() => {
        nextImage();
      }, 2800);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [total, isPlaying, isHovered, isUserPaused, prefersReducedMotion, nextImage]);

  // Mobile Touch Swipe Handlers
  const minSwipeDistance = 40;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevImage();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextImage();
    } else if (e.key === " ") {
      e.preventDefault();
      togglePlayPause();
    }
  };

  // Fallback: 0 images
  if (total === 0) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
        <p className="text-sm font-medium">No vehicle photographs available</p>
      </div>
    );
  }

  // Single image: graceful display without redundant navigation controls
  if (total === 1) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-900 border border-slate-200/80 shadow-sm">
        <Image
          src={images[0]}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 860px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="relative select-none focus:outline-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={`${title} image gallery`}
    >
      {/* Main Viewport Container */}
      <div
        className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-900 border border-slate-200/80 shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Horizontal sliding track */}
        <div
          className="flex h-full w-full"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: prefersReducedMotion ? "none" : "transform 500ms cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          {images.map((src, index) => (
            <div key={src + index} className="relative h-full w-full shrink-0">
              <Image
                src={src}
                alt={`${title} - View ${index + 1} of ${total}`}
                fill
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 860px"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Previous Arrow Button (Left) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          aria-label="Previous vehicle image"
          className="absolute left-2.5 sm:left-4 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all duration-200 active:scale-95 shadow-md border border-white/15 focus:outline-none focus:ring-2 focus:ring-[#F4C34E] cursor-pointer"
        >
          <ChevronLeft size={22} className="sm:size-6" />
        </button>

        {/* Next Arrow Button (Right) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          aria-label="Next vehicle image"
          className="absolute right-2.5 sm:right-4 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all duration-200 active:scale-95 shadow-md border border-white/15 focus:outline-none focus:ring-2 focus:ring-[#F4C34E] cursor-pointer"
        >
          <ChevronRight size={22} className="sm:size-6" />
        </button>

        {/* Pause/Play Button (Top Right) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            togglePlayPause();
          }}
          aria-label={isPlaying ? "Pause automatic sliding" : "Play automatic sliding"}
          title={isPlaying ? "Pause automatic sliding" : "Play automatic sliding"}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-1.5 rounded-full bg-black/55 hover:bg-black/80 text-white backdrop-blur-md px-3 py-1.5 text-xs font-semibold shadow-sm border border-white/15 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-1 focus:ring-[#F4C34E] cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause size={12} className="fill-white" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play size={12} className="fill-white ml-0.5" />
              <span>Play</span>
            </>
          )}
        </button>

        {/* Image Counter (Bottom Right inside gallery) */}
        <div
          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold tracking-wider text-white backdrop-blur-md shadow-sm border border-white/10 select-none"
          aria-live="polite"
        >
          {currentIndex + 1}/{total}
        </div>
      </div>
    </div>
  );
}
