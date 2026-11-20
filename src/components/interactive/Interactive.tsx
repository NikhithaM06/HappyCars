"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useShowroom } from "@/context/ShowroomContext";
import { formatInr } from "@/lib/format";
import { faqs } from "@/data/content";
import { getCars, getProducts } from "@/services/catalog";
import { LoanWidget } from "@/components/cars/CarDetail";
import { showroom } from "@/data/site";

export function ProductGrid() {
  const products = getProducts();
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const categories = ["All", ...new Set(products.map((item) => item.category))];
  const visible = products
    .filter((item) => category === "All" || item.category === category)
    .sort((a, b) => (sort === "price" ? a.price - b.price : b.rating - a.rating));

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-sm font-semibold ${category === item ? "bg-navy text-white" : "bg-mist text-navy"}`}>{item}</button>
          ))}
        </div>
        <select className="input !w-auto" value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products">
          <option value="featured">Top rated</option>
          <option value="price">Price: low to high</option>
        </select>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((product) => (
          <article key={product.slug} className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            <Link href={`/shop/${product.slug}`} className="relative block aspect-square bg-mist">
              <Image src={product.image} alt={product.name} fill className="object-cover" sizes="280px" />
            </Link>
            <div className="p-4">
              <p className="text-xs uppercase tracking-wider text-ink">{product.category}</p>
              <h2 className="mt-1 font-semibold text-navy"><Link href={`/shop/${product.slug}`}>{product.name}</Link></h2>
              <p className="mt-2 font-semibold text-navy">{formatInr(product.price)}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ProductDetail({ slug }: { slug: string }) {
  const product = getProducts().find((item) => item.slug === slug);
  const { addToCart } = useShowroom();
  const [added, setAdded] = useState(false);
  if (!product) return <p className="text-navy">This accessory is not in the sample shop.</p>;
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-mist">
        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="50vw" />
      </div>
      <div>
        <p className="text-sm uppercase tracking-wider text-ink">{product.category}</p>
        <h1 className="mt-2 text-4xl font-semibold text-navy">{product.name}</h1>
        <p className="mt-3 text-2xl font-semibold text-navy">{formatInr(product.price)}</p>
        <p className="mt-4 leading-7 text-ink">{product.description}</p>
        <ul className="mt-4 space-y-1 text-sm text-navy">
          {product.details.map((detail) => <li key={detail}>• {detail}</li>)}
        </ul>
        <button
          type="button"
          className="mt-6 rounded-xl bg-gold px-6 py-3 font-semibold text-navy"
          onClick={() => {
            addToCart(product.slug);
            setAdded(true);
          }}
        >
          Add to cart
        </button>
        {added && <p className="mt-3 text-sm text-navy">Added. <Link className="underline" href="/cart">View cart</Link></p>}
      </div>
    </div>
  );
}

export function CartView() {
  const { cart, setQty, removeFromCart } = useShowroom();
  const products = getProducts();
  const lines = cart.map((line) => ({ ...line, product: products.find((item) => item.slug === line.slug) })).filter((line) => line.product);
  const total = lines.reduce((sum, line) => sum + line.product!.price * line.qty, 0);
  if (lines.length === 0) return <p className="text-ink">Your cart is empty. <Link className="font-semibold text-navy" href="/shop">Browse accessories</Link>.</p>;
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
      <ul className="space-y-4">
        {lines.map((line) => (
          <li key={line.slug} className="flex gap-4 rounded-2xl border border-line p-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-mist">
              <Image src={line.product!.image} alt="" fill className="object-cover" sizes="96px" />
            </div>
            <div className="flex-1">
              <Link href={`/shop/${line.slug}`} className="font-semibold text-navy">{line.product!.name}</Link>
              <p className="text-sm text-ink">{formatInr(line.product!.price)}</p>
              <div className="mt-2 flex items-center gap-2">
                <button type="button" className="h-8 w-8 rounded-lg bg-mist" onClick={() => setQty(line.slug, line.qty - 1)}>-</button>
                <span>{line.qty}</span>
                <button type="button" className="h-8 w-8 rounded-lg bg-mist" onClick={() => setQty(line.slug, line.qty + 1)}>+</button>
                <button type="button" className="ml-3 text-sm text-navy underline" onClick={() => removeFromCart(line.slug)}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <aside className="h-max rounded-3xl bg-mist p-6">
        <p className="text-sm text-ink">Subtotal</p>
        <p className="text-3xl font-semibold text-navy">{formatInr(total)}</p>
        <p className="mt-2 text-xs text-ink">Sample checkout. No payment is taken.</p>
        <Link href="/checkout" className="mt-4 inline-flex rounded-xl bg-gold px-5 py-3 font-semibold text-navy">Checkout</Link>
      </aside>
    </div>
  );
}

export function CheckoutForm() {
  const { cart, clearCart } = useShowroom();
  const router = useRouter();
  const products = getProducts();
  const total = cart.reduce((sum, line) => {
    const product = products.find((item) => item.slug === line.slug);
    return sum + (product ? product.price * line.qty : 0);
  }, 0);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const order = `HC${Date.now().toString().slice(-6)}`;
    sessionStorage.setItem("happy-cars-order", JSON.stringify({ order, total }));
    clearCart();
    router.push("/order-complete");
  };

  if (cart.length === 0) return <p className="text-ink">Add an accessory before checkout.</p>;

  return (
    <form onSubmit={onSubmit} className="grid max-w-3xl gap-4 md:grid-cols-2">
      <label><span className="label">First name</span><input required className="input" name="first" /></label>
      <label><span className="label">Last name</span><input required className="input" name="last" /></label>
      <label className="md:col-span-2"><span className="label">Email</span><input required type="email" className="input" /></label>
      <label className="md:col-span-2"><span className="label">Address</span><input required className="input" /></label>
      <label><span className="label">City</span><input required className="input" defaultValue="Bengaluru" /></label>
      <label><span className="label">PIN</span><input required pattern="[0-9]{6}" className="input" /></label>
      <p className="md:col-span-2 text-lg font-semibold text-navy">To pay on connection: {formatInr(total)}</p>
      <button className="rounded-xl bg-gold px-5 py-3 font-semibold text-navy md:col-span-2" type="submit">Place sample order</button>
    </form>
  );
}

export function OrderComplete() {
  const [order, setOrder] = useState<{ order: string; total: number } | null>(null);
  useEffect(() => {
    const raw = sessionStorage.getItem("happy-cars-order");
    if (!raw) return;
    setOrder(JSON.parse(raw) as { order: string; total: number });
  }, []);
  return (
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-4xl font-semibold text-navy">Order noted</h1>
      <p className="mt-3 text-ink">
        {order ? `Reference ${order.order} for ${formatInr(order.total)}.` : "Your sample order was recorded in this session."} Nothing has been charged.
      </p>
      <Link href="/shop" className="mt-6 inline-flex rounded-xl bg-gold px-5 py-3 font-semibold text-navy">Back to the shop</Link>
    </div>
  );
}

export function CompareTable() {
  const { compare, clearCompare } = useShowroom();
  const cars = useMemo(() => getCars().filter((car) => compare.includes(car.slug)), [compare]);
  if (cars.length === 0) return <p className="text-ink">Add up to three cars from the inventory using the compare icon.</p>;
  const rows: { label: string; value: (car: (typeof cars)[number]) => string }[] = [
    { label: "Price", value: (car) => formatInr(car.price) },
    { label: "Year", value: (car) => String(car.year) },
    { label: "Mileage", value: (car) => `${car.mileage.toLocaleString("en-IN")} km` },
    { label: "Fuel", value: (car) => car.fuel },
    { label: "Gearbox", value: (car) => car.transmission },
    { label: "Body", value: (car) => car.body },
    { label: "Owners", value: (car) => String(car.owners) },
    { label: "Location", value: (car) => car.location },
  ];
  return (
    <div>
      <button type="button" onClick={clearCompare} className="mb-4 text-sm font-semibold text-navy underline">Clear comparison</button>
      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-mist text-navy">
            <tr>
              <th className="p-4"> </th>
              {cars.map((car) => <th key={car.id} className="p-4"><Link href={`/cars/${car.slug}`}>{car.title}</Link></th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-line">
                <th className="p-4 font-semibold text-navy">{row.label}</th>
                {cars.map((car) => <td key={car.id} className="p-4 text-ink">{row.value(car)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function CalculatorPage() {
  const [price, setPrice] = useState(1500000);
  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr]">
      <label className="block">
        <span className="label">On-road budget (INR)</span>
        <input className="input" type="number" min={100000} value={price} onChange={(event) => setPrice(Number(event.target.value))} />
      </label>
      <LoanWidget price={price || 0} />
    </div>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form
        className="space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
          event.currentTarget.reset();
        }}
      >
        <label className="block"><span className="label">Name</span><input required className="input" /></label>
        <label className="block"><span className="label">Email</span><input required type="email" className="input" /></label>
        <label className="block"><span className="label">Phone</span><input className="input" /></label>
        <label className="block"><span className="label">Message</span><textarea required className="input min-h-32" /></label>
        <button className="rounded-xl bg-gold px-5 py-3 font-semibold text-navy" type="submit">Send message</button>
        {sent && <p role="status" className="text-sm text-navy">Message stored for this demo. Nothing was sent to a server.</p>}
      </form>
      <div className="rounded-3xl bg-navy p-6 text-white">
        <h2 className="text-2xl font-semibold">Visit the floor</h2>
        <p className="mt-3 text-white/80">{showroom.address}</p>
        <p className="mt-2">{showroom.phone}</p>
        <p>{showroom.email}</p>
        <ul className="mt-4 space-y-1 text-sm text-white/80">
          {showroom.hours.map((hour) => <li key={hour.days}>{hour.days}: {hour.time}</li>)}
        </ul>
        <div className="mt-6 h-48 rounded-2xl bg-[radial-gradient(circle_at_30%_40%,#f5c34b_0_8px,transparent_9px),linear-gradient(160deg,#16315a,#0a2357)]" aria-hidden="true" />
      </div>
    </div>
  );
}

export function FaqList() {
  const [open, setOpen] = useState(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-line rounded-3xl border border-line bg-white">
      {faqs.map((item, index) => (
        <div key={item.question}>
          <button type="button" className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-navy" aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}>
            {item.question}
            <span>{open === index ? "–" : "+"}</span>
          </button>
          {open === index && <p className="px-5 pb-4 text-sm leading-6 text-ink">{item.answer}</p>}
        </div>
      ))}
    </div>
  );
}

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const { login, register } = useShowroom();
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (mode === "login") {
      const result = login(String(data.get("email")), String(data.get("password")));
      if (!result.ok) {
        setError(result.reason || "Could not sign in.");
        return;
      }
      router.push("/dashboard");
      return;
    }
    const password = String(data.get("password"));
    if (password !== String(data.get("confirm"))) {
      setError("Passwords do not match.");
      return;
    }
    const result = register({
      firstName: String(data.get("first")),
      lastName: String(data.get("last")),
      email: String(data.get("email")),
      password,
    });
    if (!result.ok) {
      setError(result.reason || "Could not create the account.");
      return;
    }
    router.push("/dashboard");
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-3 rounded-3xl border border-line bg-white p-6 shadow-card">
      {mode === "register" && (
        <div className="grid gap-3 sm:grid-cols-2">
          <label><span className="label">First name</span><input name="first" required className="input" /></label>
          <label><span className="label">Last name</span><input name="last" required className="input" /></label>
        </div>
      )}
      <label className="block"><span className="label">Email</span><input name="email" type="email" required className="input" /></label>
      <label className="block"><span className="label">Password</span><input name="password" type="password" required minLength={6} className="input" /></label>
      {mode === "register" && <label className="block"><span className="label">Confirm password</span><input name="confirm" type="password" required minLength={6} className="input" /></label>}
      {error && <p className="text-sm text-navy">{error}</p>}
      <button className="w-full rounded-xl bg-gold py-3 font-semibold text-navy" type="submit">{mode === "login" ? "Login" : "Create account"}</button>
      {mode === "login" && <p className="text-xs text-ink">Demo account: demo@happycars.example / happy123</p>}
      <p className="text-sm text-ink">
        {mode === "login" ? <Link href="/register" className="font-semibold text-navy">Create an account</Link> : <Link href="/login" className="font-semibold text-navy">Already registered? Login</Link>}
      </p>
    </form>
  );
}
