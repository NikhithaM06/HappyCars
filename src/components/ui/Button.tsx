import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const styles = {
  gold: "bg-gold text-navy hover:bg-gold-dark",
  navy: "bg-navy text-white hover:bg-navy-deep",
  outline: "border border-navy/15 bg-white text-navy hover:border-gold",
  ghost: "bg-transparent text-navy hover:bg-mist",
};

export function Button({
  children,
  variant = "gold",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof styles }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "gold",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof styles;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
