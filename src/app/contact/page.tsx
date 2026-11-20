import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Mail, Navigation, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Happy Cars Kundapura showroom. Call, email, or visit our showroom on NH 66.",
};

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Happy+cars+kundapura/@13.5607955,74.7012474,17z/data=!3m1!4b1!4m6!3m5!1s0x3bbc914e8673ebf9:0x97f9c85b946ff04e!8m2!3d13.5607955!4d74.7012474!16s%2Fg%2F11h717lx87?hl=en-IN&entry=ttu&g_ep=EgoyMDI2MTExNi4wIKXMDSoASAFQAw%3D%3D";

const EMBED_MAP_URL =
  "https://maps.google.com/maps?q=13.5607955,74.7012474&hl=en&z=15&output=embed";

const OPENING_SCHEDULE = [
  { day: "Monday", hours: "9:00 AM – 7:00 PM", isClosed: false },
  { day: "Tuesday", hours: "9:00 AM – 7:00 PM", isClosed: false },
  { day: "Wednesday", hours: "9:00 AM – 7:00 PM", isClosed: false },
  { day: "Thursday", hours: "9:00 AM – 7:00 PM", isClosed: false },
  { day: "Friday", hours: "9:00 AM – 7:00 PM", isClosed: false },
  { day: "Saturday", hours: "9:00 AM – 7:00 PM", isClosed: false },
  { day: "Sunday", hours: "Closed", isClosed: true },
];

export default function ContactPage() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#070f23] text-white flex items-center min-h-[380px] sm:min-h-[440px] md:min-h-[480px] lg:min-h-[520px] xl:min-h-[560px]">
        {/* Multi-car showroom background - clean photograph with zero text or logos */}
        <div className="absolute inset-0">
          <Image
            src="/images/contact-hero-entrance.jpg"
            alt="Happy Cars showroom entrance and billboard"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_68%] sm:object-[center_62%] lg:object-[right_55%]"
          />
          {/* Subtle deep navy overlay ensuring high contrast for text while keeping cars clearly visible */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, rgba(7,15,35,0.92) 0%, rgba(7,15,35,0.80) 35%, rgba(7,15,35,0.40) 65%, rgba(7,15,35,0.15) 100%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none lg:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(7,15,35,0.85) 0%, rgba(7,15,35,0.50) 60%, rgba(7,15,35,0.35) 100%)",
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="container-page relative z-10 w-full py-14 sm:py-16 lg:py-20">
          <div className="max-w-[620px]">
            <div className="mb-3">
              <span className="text-xs font-bold tracking-[0.2em] text-white/90 uppercase">
                CONTACT US
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[54px] leading-tight">
              Get in <span className="text-[#F4C34E]">Touch</span>
            </h1>

            <p className="mt-3.5 text-base sm:text-lg text-white/90 font-normal leading-relaxed">
              We are happy to help you find the right car.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN TWO-COLUMN CONTACT SECTION */}
      <section className="bg-[#f5f7fb] py-12 sm:py-16 md:py-20">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 items-stretch">
            {/* 2A. LEFT: CONTACT INFORMATION CARD */}
            <div className="lg:col-span-5 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 md:p-9 shadow-[0_10px_35px_rgba(16,43,92,0.06)] flex flex-col justify-between">
              {/* Contact Information List */}
              <div className="space-y-6 sm:space-y-7">
                {/* 1. Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fef5e4] text-[#9a7b2c]">
                    <Phone size={20} className="fill-[#9a7b2c]/20" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Phone
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-2.5">
                      <a
                        href="tel:+918904805777"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#fdeecb] px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#102B5C] transition-colors hover:bg-[#F4C34E]"
                      >
                        <Phone size={13} className="shrink-0" />
                        <span>+91 89048 05777</span>
                      </a>
                      <a
                        href="tel:+918904806777"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#fdeecb] px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#102B5C] transition-colors hover:bg-[#F4C34E]"
                      >
                        <span>+91 89048 06777</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 2. Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fef5e4] text-[#9a7b2c]">
                    <Mail size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email
                    </p>
                    <a
                      href="mailto:sales@happycars.example"
                      className="mt-1 block text-sm sm:text-base font-bold text-[#102B5C] transition-colors hover:text-[#9a7b2c]"
                    >
                      sales@happycars.example
                    </a>
                  </div>
                </div>

                {/* 3. Opening hours */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fef5e4] text-[#9a7b2c]">
                    <Clock size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Opening hours
                    </p>
                    <div className="mt-2.5 rounded-2xl bg-slate-50/90 border border-slate-100 p-3 sm:p-3.5">
                      <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                        {OPENING_SCHEDULE.map((item) => (
                          <div
                            key={item.day}
                            className="flex items-center justify-between py-1.5 first:pt-0 last:pb-0"
                          >
                            <span
                              className={
                                item.isClosed
                                  ? "font-medium text-slate-500"
                                  : "font-medium text-slate-700"
                              }
                            >
                              {item.day}
                            </span>
                            {item.isClosed ? (
                              <span className="inline-flex items-center rounded-md bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-600 border border-rose-100">
                                Closed
                              </span>
                            ) : (
                              <span className="font-semibold text-[#102B5C]">
                                {item.hours}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2B. RIGHT: GOOGLE MAPS PANEL */}
            <div className="lg:col-span-7 relative min-h-[460px] sm:min-h-[520px] rounded-3xl overflow-hidden border border-slate-200/80 bg-slate-100 shadow-[0_10px_35px_rgba(16,43,92,0.06)]">
              {/* Google Maps Iframe Embed */}
              <iframe
                title="Happy Cars Kundapura Showroom Location"
                src={EMBED_MAP_URL}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />

              {/* Floating Google Maps Location Card (Overlay matching reference design) */}
              <div className="absolute top-4 left-4 z-10 max-w-[310px] sm:max-w-[340px] rounded-2xl bg-white p-4 shadow-lg border border-slate-100 pointer-events-auto">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-[#102B5C] text-sm leading-tight">
                      Happy Cars Kundapura
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 leading-snug">
                      Abharan Showroom, Taluk, Near, NH 66, Kundapura, Thekkatte, Karnataka 576231
                    </p>
                  </div>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Get Directions on Google Maps"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1877F2]/10 text-[#1877F2] transition-colors hover:bg-[#1877F2] hover:text-white"
                  >
                    <Navigation size={16} className="rotate-45 fill-current" />
                  </a>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-xs">
                  <div className="flex items-center gap-1 font-semibold text-amber-500">
                    <span>4.5</span>
                    <span className="text-amber-400">★★★★★</span>
                  </div>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    View larger map
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
