import type { Metadata } from "next";
import { KeyRound, CircleDollarSign, ArrowLeftRight, Warehouse } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "About Us | Happy Cars",
  description:
    "Established in 2010, Happy Cars is a multi-brand pre-owned car showroom in Kundapura committed to making every car-buying and selling experience simple, transparent, and trustworthy.",
};

interface AboutService {
  number: string;
  name: string;
  icon: typeof KeyRound;
  description: string;
}

const services: AboutService[] = [
  {
    number: "01",
    name: "Buying",
    icon: KeyRound,
    description:
      "Wide selection of quality-inspected multi-brand pre-owned cars with verified documents and clear history.",
  },
  {
    number: "02",
    name: "Selling",
    icon: CircleDollarSign,
    description:
      "Quick, transparent car valuation and prompt payment processing without middlemen or hidden deductions.",
  },
  {
    number: "03",
    name: "Exchange",
    icon: ArrowLeftRight,
    description:
      "Trade in your current car seamlessly with fair ramp inspection and apply its value towards your upgrade.",
  },
  {
    number: "04",
    name: "Park & Sell",
    icon: Warehouse,
    description:
      "Display your vehicle on our prime showroom floor along NH 66 while we manage inquiries and paperwork.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* 1. TOP BANNER: Matching Contact Us hero pattern 1:1 with wide landscape photo */}
      <PageHero
        eyebrow="ABOUT US"
        title="Driven by Trust, Built on"
        titleHighlight="Happiness"
        subtitle="Driving trust and delivering happiness across coastal Karnataka since 2010."
        backgroundImage="/images/about-hero-landscape.jpg"
        className="min-h-[380px] sm:min-h-[440px] md:min-h-[480px] lg:min-h-[520px] xl:min-h-[560px]"
        imagePosition="object-[70%_center] sm:object-[65%_center] lg:object-[center_right]"
      />

      {/* 2. WHITE CONTENT SECTION */}
      <section className="bg-white py-14 sm:py-20 md:py-24">
        <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
          {/* Main heading and introduction */}
          <div className="max-w-4xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-navy leading-tight">
              Driving Trust.{" "}
              <span className="text-[#B38728]">Delivering Happiness.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-ink/80">
              Established in 2010, Happy Cars is a multi-brand pre-owned car
              showroom committed to making every car-buying and selling experience
              simple, transparent and trustworthy. We bring together a wide range
              of pre-owned vehicles and provide customers with convenient solutions
              for buying, selling, exchanging and parking their cars for sale. At
              Happy Cars, we believe every journey deserves the right car and every
              customer deserves a reliable experience.
            </p>
          </div>

          {/* 3. MISSION & VISION: Editorial layout side by side */}
          <div className="mt-14 sm:mt-18 pt-10 sm:pt-14 border-t border-gray-200">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-14">
              {/* 01 / Mission */}
              <div className="space-y-3">
                <span className="text-xs font-semibold tracking-widest text-[#B38728] uppercase">
                  Mission
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-navy">
                  Our Mission
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-ink/80">
                  To empower car buyers and sellers with an honest, transparent,
                  and dependable automotive marketplace. Every vehicle is
                  rigorously inspected and fairly valued, giving our customers
                  enduring peace of mind on every journey.
                </p>
              </div>

              {/* 02 / Vision */}
              <div className="space-y-3 md:border-l md:border-gray-200 md:pl-10 lg:pl-14">
                <span className="text-xs font-semibold tracking-widest text-[#B38728] uppercase">
                  Vision
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-navy">
                  Our Vision
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-ink/80">
                  To be coastal Karnataka&apos;s most trusted and preferred
                  multi-brand pre-owned vehicle showroom—setting the benchmark
                  for vehicle quality, ethical dealings, and lifetime customer
                  relationships.
                </p>
              </div>
            </div>
          </div>

          {/* 4. OUR SERVICES: "Four Ways We Help You" */}
          <div className="mt-16 sm:mt-22 pt-10 sm:pt-14 border-t border-gray-200">
            <div className="mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-navy">
                Four Ways We Help You
              </h2>

            </div>

            {/* 4 service cards in 2-column, 2-row grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {services.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className="flex flex-col justify-between rounded-2xl bg-[#F8FAFC] border border-slate-200/80 p-6 sm:p-8 transition-all hover:border-slate-300 hover:shadow-sm"
                  >
                    <div>
                      {/* Tile Header: Icon & Number */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-slate-200/80 shadow-xs">
                          <Icon className="h-5 w-5 text-[#B38728]" />
                        </div>
                        <span className="text-sm font-semibold tracking-wider text-ink/40">
                          {item.number}
                        </span>
                      </div>

                      {/* Service Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-navy">
                        {item.name}
                      </h3>

                      {/* Service Description */}
                      <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink/75">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
