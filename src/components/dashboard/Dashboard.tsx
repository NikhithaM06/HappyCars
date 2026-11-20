"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useShowroom } from "@/context/ShowroomContext";
import { CarCard } from "@/components/cars/CarCard";
import { formatInr } from "@/lib/format";
import { images } from "@/data/site";
import { getCars } from "@/services/catalog";
import { messages as seedMessages } from "@/data/content";
import type { Car, MessageThread } from "@/lib/types";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/listings", label: "My listings" },
  { href: "/dashboard/favorites", label: "Saved cars" },
  { href: "/dashboard/messages", label: "Messages" },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { session, ready } = useShowroom();
  return (
    <div className="container-page grid gap-6 py-10 lg:grid-cols-[240px_1fr]">
      <aside className="h-max rounded-3xl bg-navy p-4 text-white">
        <p className="px-3 py-2 text-sm text-white/70">{ready && session ? `${session.firstName} ${session.lastName}` : "Guest browser"}</p>
        <nav className="mt-2 space-y-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={`block rounded-xl px-3 py-2 text-sm ${pathname === link.href ? "bg-gold text-navy" : "hover:bg-white/10"}`}>
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div>{children}</div>
    </div>
  );
}

export function DashboardHome() {
  const { favorites, userListings, session } = useShowroom();
  return (
    <div>
      <h1 className="text-3xl font-semibold text-navy">Hello{session ? `, ${session.firstName}` : ""}</h1>
      <p className="mt-2 text-ink">Your saved cars and listings stay in this browser until a backend account is connected.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          ["Saved cars", favorites.length],
          ["Your listings", userListings.length],
          ["Messages", seedMessages.length],
        ].map(([label, value]) => (
          <div key={String(label)} className="rounded-2xl bg-mist p-5">
            <p className="text-sm text-ink">{label}</p>
            <p className="text-3xl font-semibold text-navy">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProfileForm() {
  const { session, logout } = useShowroom();
  const [saved, setSaved] = useState(false);
  return (
    <form
      className="max-w-xl space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSaved(true);
      }}
    >
      <h1 className="text-3xl font-semibold text-navy">Profile</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block"><span className="label">First name</span><input className="input" defaultValue={session?.firstName || ""} required /></label>
        <label className="block"><span className="label">Last name</span><input className="input" defaultValue={session?.lastName || ""} required /></label>
      </div>
      <label className="block"><span className="label">Email</span><input className="input" type="email" defaultValue={session?.email || ""} required /></label>
      <label className="block"><span className="label">Phone</span><input className="input" placeholder="+91" /></label>
      <button className="rounded-xl bg-gold px-5 py-3 font-semibold text-navy" type="submit">Save profile</button>
      {saved && <p className="text-sm text-navy">Profile kept on this page. Sign-in details stay as they were.</p>}
      {session && <button type="button" onClick={logout} className="block text-sm font-semibold text-navy underline">Log out</button>}
    </form>
  );
}

export function MyListings() {
  const { userListings, removeListing } = useShowroom();
  if (userListings.length === 0) {
    return <p className="text-ink">You have not added a listing in this browser.</p>;
  }
  return (
    <div className="space-y-4">
      {userListings.map((car) => (
        <div key={car.id} className="flex flex-col gap-3 rounded-2xl border border-line p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href={`/cars/${car.slug}`} className="font-semibold text-navy">{car.title}</Link>
            <p className="text-sm text-ink">{formatInr(car.price)} · {car.location}</p>
          </div>
          <button type="button" onClick={() => removeListing(car.slug)} className="text-sm font-semibold text-navy">Remove</button>
        </div>
      ))}
    </div>
  );
}

export function SavedCars() {
  const { favorites } = useShowroom();
  const cars = [...getCars()].filter((car) => favorites.includes(car.slug));
  const { userListings } = useShowroom();
  const extra = userListings.filter((car) => favorites.includes(car.slug) && !cars.some((item) => item.slug === car.slug));
  const all = [...extra, ...cars];
  if (all.length === 0) return <p className="text-ink">Save a car from the inventory to see it here.</p>;
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {all.map((car) => <CarCard key={car.id} car={car} />)}
    </div>
  );
}

export function AddListingForm() {
  const { addListing } = useShowroom();
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get("title") || "").trim();
    const price = Number(data.get("price"));
    const year = Number(data.get("year"));
    const mileage = Number(data.get("mileage"));
    if (!title || price <= 0 || year < 1990 || mileage < 0) {
      setError("Add a title, a price, a year, and mileage.");
      return;
    }
    const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${Date.now()}`;
    const car: Car = {
      id: slug,
      slug,
      title,
      make: String(data.get("make") || "Happy Cars"),
      model: String(data.get("model") || "Listing"),
      year,
      price,
      body: (String(data.get("body") || "SUV") as Car["body"]),
      mileage,
      fuel: (String(data.get("fuel") || "Petrol") as Car["fuel"]),
      transmission: (String(data.get("transmission") || "Automatic") as Car["transmission"]),
      drivetrain: "FWD",
      engine: "See advisor",
      power: "See advisor",
      color: String(data.get("color") || "White"),
      owners: 1,
      seats: 5,
      doors: 5,
      location: String(data.get("location") || "Indiranagar"),
      rating: 5,
      reviews: 0,
      photos: 4,
      videos: 0,
      featured: false,
      popular: false,
      images: [images.cars.creta, images.about, images.cars.city, images.showroom],
      description: String(data.get("description") || "Owner listing added from this browser."),
      features: ["Owner listing"],
      seller: { name: "You", role: "Private listing", phone: "+91 80 4567 8900", email: "hello@happycars.example" },
      createdAt: new Date().toISOString().slice(0, 10),
    };
    addListing(car);
    router.push(`/cars/${slug}`);
  };

  return (
    <form onSubmit={onSubmit} className="grid max-w-3xl gap-4 md:grid-cols-2">
      <label className="md:col-span-2"><span className="label">Title</span><input name="title" className="input" required placeholder="Honda City ZX 2021" /></label>
      <label><span className="label">Make</span><input name="make" className="input" required /></label>
      <label><span className="label">Model</span><input name="model" className="input" required /></label>
      <label><span className="label">Price (INR)</span><input name="price" type="number" min={1} className="input" required /></label>
      <label><span className="label">Year</span><input name="year" type="number" min={1995} max={2026} className="input" required /></label>
      <label><span className="label">Mileage (km)</span><input name="mileage" type="number" min={0} className="input" required /></label>
      <label><span className="label">Body</span>
        <select name="body" className="input">{["SUV", "Sedan", "Hatchback", "MPV", "Coupe"].map((item) => <option key={item}>{item}</option>)}</select>
      </label>
      <label><span className="label">Fuel</span>
        <select name="fuel" className="input">{["Petrol", "Diesel", "Hybrid", "Electric"].map((item) => <option key={item}>{item}</option>)}</select>
      </label>
      <label><span className="label">Gearbox</span>
        <select name="transmission" className="input"><option>Automatic</option><option>Manual</option></select>
      </label>
      <label><span className="label">Colour</span><input name="color" className="input" defaultValue="White" /></label>
      <label><span className="label">Area</span>
        <select name="location" className="input">{["Indiranagar", "Koramangala", "Whitefield", "Hebbal", "Jayanagar", "HSR Layout", "MG Road", "Electronic City"].map((item) => <option key={item}>{item}</option>)}</select>
      </label>
      <label className="md:col-span-2"><span className="label">Description</span><textarea name="description" className="input min-h-28" /></label>
      {error && <p className="md:col-span-2 text-sm text-navy">{error}</p>}
      <button className="rounded-xl bg-gold px-5 py-3 font-semibold text-navy md:col-span-2" type="submit">Publish to this browser</button>
    </form>
  );
}

export function MessageDesk() {
  const [threads, setThreads] = useState<MessageThread[]>(seedMessages);
  const [active, setActive] = useState(seedMessages[0].id);
  const [draft, setDraft] = useState("");
  const thread = threads.find((item) => item.id === active) || threads[0];

  const send = (event: FormEvent) => {
    event.preventDefault();
    if (!draft.trim()) return;
    setThreads((current) =>
      current.map((item) =>
        item.id === thread.id
          ? { ...item, preview: draft, messages: [...item.messages, { from: "me", text: draft, time: "Now" }] }
          : item,
      ),
    );
    setDraft("");
  };

  return (
    <div className="grid overflow-hidden rounded-3xl border border-line md:grid-cols-[240px_1fr]">
      <ul className="border-b border-line md:border-b-0 md:border-r">
        {threads.map((item) => (
          <li key={item.id}>
            <button type="button" onClick={() => setActive(item.id)} className={`w-full px-4 py-3 text-left ${item.id === thread.id ? "bg-mist" : ""}`}>
              <p className="font-semibold text-navy">{item.name}</p>
              <p className="truncate text-sm text-ink">{item.preview}</p>
            </button>
          </li>
        ))}
      </ul>
      <div className="flex min-h-80 flex-col">
        <div className="flex-1 space-y-3 p-4">
          {thread.messages.map((message, index) => (
            <p key={index} className={`max-w-sm rounded-2xl px-4 py-2 text-sm ${message.from === "me" ? "ml-auto bg-navy text-white" : "bg-mist text-navy"}`}>
              {message.text}
              <span className="mt-1 block text-[11px] opacity-70">{message.time}</span>
            </p>
          ))}
        </div>
        <form onSubmit={send} className="flex gap-2 border-t border-line p-3">
          <input className="input" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Write a reply" />
          <button className="rounded-xl bg-gold px-4 font-semibold text-navy" type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
