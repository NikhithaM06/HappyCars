import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-dark">404</p>
      <h1 className="mt-3 text-5xl font-semibold text-navy">That page has left the floor</h1>
      <p className="mx-auto mt-4 max-w-md text-ink">The address does not match a page in this showroom. The inventory is a better place to continue.</p>
      <Link href="/inventory" className="mt-6 inline-flex rounded-xl bg-gold px-5 py-3 font-semibold text-navy">Browse cars</Link>
    </div>
  );
}
