import Image from "next/image";
import Link from "next/link";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-white/80">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-gold">
                {item.label}
              </Link>
            ) : (
              <span className="text-white">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  title,
  titleHighlight,
  subtitle,
  items,
  backgroundImage,
  eyebrow,
  className,
  imagePosition,
}: {
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  items?: { label: string; href?: string }[];
  backgroundImage?: string;
  eyebrow?: string;
  className?: string;
  imagePosition?: string;
}) {
  return (
    <section
      className={`relative overflow-hidden bg-[#070f23] text-white flex items-center ${
        className || "min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]"
      }`}
    >
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt={title}
            fill
            priority
            sizes="100vw"
            className={`object-cover ${
              imagePosition || "object-[70%_center] md:object-[65%_center] lg:object-center"
            }`}
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
      )}

      {/* Hero Content */}
      <div className="container-page relative z-10 w-full py-14 sm:py-16 lg:py-20">
        <div className="max-w-[620px]">
          {eyebrow ? (
            <div className="mb-3">
              <span className="text-xs font-bold tracking-[0.2em] text-white/90 uppercase">
                {eyebrow}
              </span>
            </div>
          ) : items && items.length > 0 ? (
            <div className="mb-4">
              <Breadcrumbs items={items} />
            </div>
          ) : null}

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[54px] leading-tight">
            {title}
            {titleHighlight && (
              <>
                {" "}
                <span className="text-[#F4C34E]">{titleHighlight}</span>
              </>
            )}
          </h1>

          {subtitle && (
            <p className="mt-3.5 text-base sm:text-lg text-white/90 font-normal leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  light = false,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  light?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className={`text-sm font-semibold uppercase tracking-[0.16em] ${light ? "text-gold" : "text-gold-dark"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-2 text-3xl font-semibold tracking-tight md:text-4xl ${light ? "text-white" : "text-navy"}`}>
        {title}
      </h2>
      {text && <p className={`mt-3 text-base leading-7 ${light ? "text-white/70" : "text-ink"}`}>{text}</p>}
    </div>
  );
}
