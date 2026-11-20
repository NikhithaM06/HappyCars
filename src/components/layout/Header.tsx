"use client";

import { ChevronRight, Phone, X, Map } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { showroom } from "@/data/site";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/browse-cars", label: "Browse Cars" },
  { href: "/about", label: "About Us" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact Us" },
  { href: "/privacy-policy", label: "Privacy Policy" },
] as const;

function FacebookIcon() {
  return (
    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeAll = () => {
    setMobileMenuOpen(false);
  };

  // Route-based active detection
  const isNavItemActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") {
      return pathname === "/";
    }
    if (href === "/browse-cars") {
      return (
        pathname === "/browse-cars" ||
        pathname.startsWith("/browse-cars/") ||
        pathname.startsWith("/cars") ||
        pathname.startsWith("/inventory")
      );
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAll();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      {/* 1. TOP INFORMATION BAR (Desktop only, hidden at <= 992px) */}
      <div className="header-topbar border-b border-white/10 bg-[#0e2559] text-xs xl:text-sm text-white/95">
        <div className="container-page relative flex items-center justify-between py-2.5">
          {/* Left: Contact number */}
          <div className="flex items-center">
            <a
              href={showroom.phoneHref.startsWith("tel:") ? showroom.phoneHref : `tel:${showroom.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 font-medium transition hover:text-gold shrink-0"
            >
              <Phone size={14} className="shrink-0 text-white/80" />
              <span>{showroom.phone.trim()}</span>
            </a>
          </div>

          {/* Center: Address */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-center pointer-events-auto max-w-[calc(100%-320px)]">
            <Map size={14} className="shrink-0 text-white/80" />
            <span title={showroom.address} className="truncate xl:overflow-visible xl:whitespace-normal">
              {showroom.address}
            </span>
          </div>

          {/* Right empty spacer for structural balance */}
          <div className="w-24 shrink-0" aria-hidden="true" />
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <div className="border-b border-line bg-white">
        <div className="container-page relative flex items-center justify-between gap-4 py-2">
          {/* Logo on the left */}
          <Link href="/" className="flex shrink-0 items-center" onClick={closeAll}>
            <Image
              src="/logo.png"
              alt="Happy Cars"
              width={860}
              height={514}
              priority
              style={{ width: "auto" }}
              className="h-[52px] w-auto object-contain transition-all sm:h-[60px] min-[993px]:h-[78px]"
            />
          </Link>

          {/* Desktop Navigation Links (Visible on > 992px) - Direct links, no dropdowns */}
          <nav className="header-desktop-nav items-center gap-5 xl:gap-7" aria-label="Primary">
            {navItems.map((item) => {
              const isActive = isNavItemActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative py-2 text-[13px] font-semibold tracking-wide transition-colors duration-200 xl:text-sm ${
                    isActive
                      ? "text-gold"
                      : "text-navy hover:text-black"
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Underline: Yellow/Gold underline on hover and active */}
                  <span
                    className={`absolute bottom-0 inset-x-0 h-[2px] rounded-full bg-gold transition-transform duration-300 ease-out origin-center ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>

          {/* Responsive Menu Trigger (<= 992px): Text "Menu" + Hamburger Icon */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="header-mobile-trigger shrink-0 cursor-pointer items-center gap-2 px-1 py-2 text-navy transition-colors hover:text-gold focus:outline-none"
            aria-label="Open mobile menu"
          >
            <span className="text-sm font-semibold text-navy">Menu</span>
            <div className="flex flex-col items-end justify-center gap-1">
              <span className="h-[2px] w-5 rounded-full bg-navy" />
              <span className="h-[2px] w-3.5 rounded-full bg-navy" />
            </div>
          </button>
        </div>
      </div>

      {/* 3. RESPONSIVE NAVIGATION DRAWER (Mobile) - Direct links, no dropdowns */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${mobileMenuOpen ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
          }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Dark Transparent Overlay */}
        <div
          className="fixed inset-0 cursor-pointer bg-black/60 backdrop-blur-2xs"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Sliding Navigation Drawer from Right */}
        <div
          className={`fixed right-0 top-0 bottom-0 z-50 flex w-full max-w-[340px] transform flex-col justify-between overflow-y-auto bg-[#0b224e] p-6 text-white shadow-2xl transition-transform duration-300 ease-in-out sm:max-w-[370px] ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div>
            {/* Top Bar: Existing Logo at top-left & circular close button at top-right */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <Link href="/" onClick={closeAll} className="flex shrink-0 items-center">
                <Image
                  src="/logo.png"
                  alt="Happy Cars"
                  width={320}
                  height={190}
                  priority
                  style={{ width: "auto" }}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10"
                aria-label="Close navigation menu"
              >
                <X size={16} />
              </button>
            </div>

            {/* Direct Vertical Navigation Links */}
            <nav className="mt-3" aria-label="Mobile Primary">
              {navItems.map((item) => {
                const isActive = isNavItemActive(item.href);
                return (
                  <div key={item.href} className="border-b border-white/10">
                    <Link
                      href={item.href}
                      onClick={closeAll}
                      className={`flex items-center justify-between py-3.5 text-sm font-semibold tracking-wide transition-colors ${
                        isActive ? "text-gold font-bold" : "text-white/95 hover:text-gold"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight
                        size={14}
                        className={isActive ? "text-gold" : "text-white/60"}
                      />
                    </Link>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Bottom Contact Details & Social Media Icons */}
          <div className="mt-8 space-y-3.5 border-t border-white/10 pt-6 text-xs text-white/75">
            <div className="flex items-start gap-2.5">
              <Map size={14} className="mt-0.5 shrink-0 text-white/70" />
              <span className="leading-snug">{showroom.address}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={14} className="shrink-0 text-white/70" />
              <a href={showroom.phoneHref} className="transition-colors hover:text-gold">
                {showroom.phone}
              </a>
            </div>
            {/* Social Media Icons Row: Facebook, Instagram, and YouTube */}
            <div className="flex items-center gap-4 pt-3 text-white/70">
              <a
                href="https://www.facebook.com/happy.cars.568/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition-colors hover:text-gold"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.instagram.com/happycarskundapura/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-colors hover:text-gold"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.youtube.com/@Happycarskundapura"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="transition-colors hover:text-gold"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
