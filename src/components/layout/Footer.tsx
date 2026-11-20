"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin, Phone } from "lucide-react";

/* 1. Authentic Facebook Brand Icon: Original Blue (#1877F2) circle with white 'f' */
function FacebookBrandIcon({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <circle cx="18" cy="18" r="18" fill="#1877F2" />
      <path
        fill="#FFFFFF"
        d="M23.5 18H20v10h-4V18h-3v-3.5h3v-2.3c0-3 1.8-4.7 4.5-4.7 1.3 0 2.4.1 2.7.1v3.2h-1.9c-1.4 0-1.8.7-1.8 1.8v1.9h3.6L23.5 18z"
      />
    </svg>
  );
}

/* 2. Authentic Instagram Brand Icon: Original Gradient (purple, pink, orange, yellow) with white glyph */
function InstagramBrandIcon({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="ig-gradient-footer" cx="30%" cy="105%" r="125%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="10%" stopColor="#fdf497" />
          <stop offset="35%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="36" height="36" rx="9" fill="url(#ig-gradient-footer)" />
      <rect x="9.5" y="9.5" width="17" height="17" rx="4.5" stroke="#FFFFFF" strokeWidth="2" fill="none" />
      <circle cx="18" cy="18" r="4.2" stroke="#FFFFFF" strokeWidth="2" fill="none" />
      <circle cx="22.5" cy="13.5" r="1.1" fill="#FFFFFF" />
    </svg>
  );
}

/* 3. Authentic YouTube Brand Icon: Official Red (#FF0000) with centered white play triangle */
function YoutubeBrandIcon({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect width="36" height="36" rx="9" fill="#FF0000" />
      <path fill="#FFFFFF" d="M15.5 13.8v8.4L22.5 18l-7-4.2z" />
    </svg>
  );
}

/* 4. Authentic WhatsApp Brand Icon: Original Green (#25D366) with white speech bubble outline & handset */
function WhatsAppBrandIcon({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="24" fill="#25D366" />
      <g transform="translate(9.36, 9.36) scale(1.22)">
        <path
          fill="#FFFFFF"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.2.3-.778.978-.954 1.179-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.135-.135.301-.351.452-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.527-.075-.15-.678-1.634-.928-2.238-.244-.588-.492-.508-.678-.518l-.577-.01c-.2 0-.527.075-.803.376s-1.054 1.029-1.054 2.508c0 1.48 1.079 2.909 1.229 3.109.15.2 2.124 3.243 5.145 4.548.719.31 1.28.496 1.718.635.722.23 1.378.197 1.9.12.58-.088 1.78-.727 2.03-1.429.25-.702.25-1.304.175-1.43-.075-.125-.276-.201-.577-.351zM12.042 21.672h-.008a9.63 9.63 0 0 1-4.912-1.341l-.352-.209-3.652.957.974-3.56-.229-.364a9.637 9.637 0 0 1-1.477-5.118c0-5.32 4.33-9.65 9.657-9.65 2.58 0 5.006 1.006 6.83 2.833a9.605 9.605 0 0 1 2.825 6.828c0 5.323-4.33 9.654-9.656 9.654zm0-18.006c-4.607 0-8.356 3.749-8.356 8.356 0 1.472.386 2.909 1.118 4.176l-1.19 4.347 4.45-1.168a8.337 8.337 0 0 0 3.978 1.002h.005c4.606 0 8.354-3.75 8.354-8.357 0-2.232-.87-4.33-2.45-5.908a8.326 8.326 0 0 0-5.909-2.448z"
        />
      </g>
    </svg>
  );
}

function GooglePlayBadge() {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Get it on Google Play"
      className="inline-flex cursor-pointer items-center gap-3 rounded-lg border border-white/20 bg-black/60 px-3.5 py-2 text-white shadow-md transition-all hover:border-white/40 hover:bg-black/90 focus:outline-none focus:ring-1 focus:ring-gold"
    >
      <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#4285F4" d="M3.6 1.8c-.3.3-.5.8-.5 1.5v17.4c0 .7.2 1.2.5 1.5l.1.1 9.8-9.8v-.2L3.7 1.7l-.1.1z" />
        <path fill="#EA4335" d="M16.8 15.6l-3.3-3.3v-.2l3.3-3.3.1.1 3.9 2.2c1.1.6 1.1 1.6 0 2.3l-3.9 2.2-.1-.1z" />
        <path fill="#FBBC04" d="M13.5 12.3L3.6 22.2c.4.4 1 .5 1.7.1l11.5-6.5-3.3-3.5z" />
        <path fill="#34A853" d="M13.5 12.1l3.3-3.5L5.3 2.1c-.7-.4-1.3-.3-1.7.1l9.9 9.9z" />
      </svg>
      <div className="flex flex-col text-left">
        <span className="text-[10px] font-semibold tracking-wider text-white/75 uppercase leading-none">
          GET IT ON
        </span>
        <span className="text-sm font-bold tracking-tight text-white leading-tight">
          Google Play
        </span>
      </div>
    </div>
  );
}

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/browse-cars", label: "Browse Cars" },
  { href: "/about", label: "About Us" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact Us" },
  { href: "/privacy-policy", label: "Privacy Policy" },
] as const;

export function Footer() {
  const copyrightRef = useRef<HTMLDivElement>(null);
  const [bottomOffset, setBottomOffset] = useState<number>(24);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (copyrightRef.current) {
            const rect = copyrightRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const defaultBottom = window.innerWidth >= 640 ? 24 : 20;
            const gapAboveLine = 16;

            if (rect.top < viewportHeight) {
              const distanceFromBottom = viewportHeight - rect.top;
              setBottomOffset(Math.max(defaultBottom, distanceFromBottom + gapAboveLine));
            } else {
              setBottomOffset(defaultBottom);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <footer className="bg-navy-deep text-white">
      <div className="container-page py-14">
        {/* Main Content Grid: Balanced 4 columns across desktop */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-12 items-start">
          {/* Part 1: Happy Cars */}
          <div>
            <Link href="/" className="inline-block" aria-label="Happy Cars Home">
              <div className="inline-block rounded-xl bg-white p-2.5 shadow-sm">
                <Image
                  src="/logo.png"
                  alt="Happy Cars"
                  width={183}
                  height={109}
                  priority={false}
                  className="h-auto w-[183px] max-w-full object-contain"
                />
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
              Drive your dream car with confidence. Quality pre-owned vehicles, trusted service and a smooth buying experience.
            </p>
          </div>

          {/* Part 2: Quick Links with golden '>' chevron icons */}
          <div>
            <p className="text-sm font-bold tracking-wider text-white uppercase">QUICK LINKS</p>
            <ul className="mt-4 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2.5 text-white/80 transition-colors hover:text-gold"
                  >
                    <ChevronRight
                      size={14}
                      strokeWidth={2.5}
                      className="shrink-0 text-gold transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Part 3: Get the App */}
          <div>
            <p className="text-sm font-bold tracking-wider text-white uppercase">GET THE APP</p>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              Download our app for a better car-buying experience.
            </p>
            <div className="mt-4">
              <GooglePlayBadge />
            </div>
          </div>

          {/* Part 4: Contact Us */}
          <div>
            <p className="text-sm font-bold tracking-wider text-white uppercase">CONTACT US</p>
            <ul className="mt-4 space-y-3.5 text-sm text-white/80">
              <li className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F5C34B] text-[#1a3760]">
                  <Phone size={14} className="text-[#1a3760]" />
                </div>
                <a
                  href="tel:+918904805777"
                  className="font-medium text-white transition-colors hover:text-gold"
                >
                  +91 89048 05777
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F5C34B] text-[#1a3760] mt-0.5">
                  <MapPin size={14} className="text-[#1a3760]" />
                </div>
                <span className="leading-relaxed text-white/75">
                  Abharan Showroom, Taluk, Near, NH 66, Kundapura, Thekkatte, Karnataka 576231
                </span>
              </li>
            </ul>

            {/* Social Icons (Facebook, Instagram & YouTube) */}
            <div className="mt-4 flex items-center gap-2.5">
              <a
                href="https://www.facebook.com/happy.cars.568/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex transition-transform hover:scale-110"
              >
                <FacebookBrandIcon className="h-7 w-7 drop-shadow-xs" />
              </a>
              <a
                href="https://www.instagram.com/happycarskundapura/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex transition-transform hover:scale-110"
              >
                <InstagramBrandIcon className="h-7 w-7 drop-shadow-xs" />
              </a>
              <a
                href="https://www.youtube.com/@Happycarskundapura"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="inline-flex transition-transform hover:scale-110"
              >
                <YoutubeBrandIcon className="h-7 w-7 drop-shadow-xs" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div ref={copyrightRef} className="border-t border-white/10">
        <div className="container-page py-6 text-center text-xs text-white/70 sm:text-sm">
          <p>
            © 2026 <span className="font-semibold text-[#F5C34B]">Happy Cars</span>. All Rights Reserved. | Designed & Developed by{" "}
            <a
              href="https://d-apps.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#F5C34B] transition-colors hover:text-white hover:underline"
            >
              D-apps
            </a>{" "}

          </p>
        </div>
      </div>

      {/* Fixed Floating WhatsApp Action Button (stops above copyright line) */}
      <a
        href="https://wa.me/918904805777"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
        style={{ bottom: `${bottomOffset}px` }}
        className="fixed right-5 sm:right-6 z-50 flex items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
      >
        <WhatsAppBrandIcon className="h-13 w-13 sm:h-14 sm:w-14" />
      </a>
    </footer>
  );
}
