"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CarCard } from "@/components/cars/CarCard";
import { useShowroom } from "@/context/ShowroomContext";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import {
  MILEAGE_OPTIONS,
  PAGE_SIZE,
  PRICE_OPTIONS,
  SORT_OPTIONS,
  applyCarFilters,
  paginate,
  uniqueSorted,
} from "@/lib/format";
import type { Car, CarFilters } from "@/lib/types";
import { areas } from "@/data/content";
import { getCars } from "@/services/catalog";

function readFilters(params: URLSearchParams): CarFilters {
  return {
    q: params.get("q") || "",
    make: params.get("make") || "",
    model: params.get("model") || "",
    body: params.get("body") || "",
    fuel: params.get("fuel") || "",
    transmission: params.get("transmission") || "",
    price: params.get("price") || "",
    year: params.get("year") || "",
    mileage: params.get("mileage") || "",
    color: params.get("color") || "",
    sort: params.get("sort") || "newest",
    page: params.get("page") || "1",
  };
}

export function InventoryExplorer({ mapMode = false }: { mapMode?: boolean }) {
  const params = useSearchParams();
  const router = useRouter();
  const filters = readFilters(new URLSearchParams(params.toString()));
  const { userListings, ready } = useShowroom();
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [advanced, setAdvanced] = useState(false);
  const [activeArea, setActiveArea] = useState("");

  const catalog = useMemo(() => {
    const base = getCars();
    const extra = ready ? userListings : [];
    const merged = [...extra, ...base.filter((car) => !extra.some((item) => item.slug === car.slug))];
    return merged;
  }, [ready, userListings]);

  const filtered = applyCarFilters(
    catalog.filter((car) => !activeArea || car.location === activeArea),
    filters,
  );
  const page = paginate(filtered, Number(filters.page) || 1, mapMode ? 6 : PAGE_SIZE);

  const update = (patch: Partial<CarFilters>) => {
    const next = new URLSearchParams(params.toString());
    Object.entries({ ...patch, page: patch.page ?? "1" }).forEach(([key, value]) => {
      if (!value) next.delete(key);
      else next.set(key, value);
    });
    router.replace(`${mapMode ? "/inventory/map" : "/inventory"}?${next.toString()}`, { scroll: false });
  };

  return (
    <div className={mapMode ? "grid gap-6 lg:grid-cols-[1fr_0.9fr]" : "space-y-6"}>
      <div>
        <FilterBar
          cars={catalog}
          filters={filters}
          advanced={advanced}
          onToggle={() => setAdvanced((value) => !value)}
          onChange={update}
          layout={layout}
          onLayout={setLayout}
          total={filtered.length}
          mapMode={mapMode}
        />
        {page.items.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-line p-10 text-center">
            <p className="text-lg font-semibold text-navy">No cars match those filters.</p>
            <button type="button" className="mt-3 text-sm font-semibold text-navy underline" onClick={() => router.push(mapMode ? "/inventory/map" : "/inventory")}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className={`mt-6 grid gap-5 ${layout === "grid" && !mapMode ? "md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
            {page.items.map((car) => (
              <div key={car.id} onMouseEnter={() => mapMode && setActiveArea(car.location)}>
                <CarCard car={car} layout={layout === "list" || mapMode ? "list" : "grid"} />
              </div>
            ))}
          </div>
        )}
        {page.totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: page.totalPages }, (_, index) => index + 1).map((number) => (
              <button
                key={number}
                type="button"
                onClick={() => update({ page: String(number) })}
                className={`h-10 w-10 rounded-xl text-sm font-semibold ${number === page.page ? "bg-gold text-navy" : "bg-mist text-navy"}`}
              >
                {number}
              </button>
            ))}
          </div>
        )}
      </div>
      {mapMode && <AreaMap cars={filtered} active={activeArea} onSelect={setActiveArea} />}
    </div>
  );
}

function FilterBar({
  cars,
  filters,
  advanced,
  onToggle,
  onChange,
  layout,
  onLayout,
  total,
  mapMode,
}: {
  cars: Car[];
  filters: CarFilters;
  advanced: boolean;
  onToggle: () => void;
  onChange: (patch: Partial<CarFilters>) => void;
  layout: "grid" | "list";
  onLayout: (layout: "grid" | "list") => void;
  total: number;
  mapMode: boolean;
}) {
  const makes = uniqueSorted(cars.map((car) => car.make));
  const models = uniqueSorted(cars.filter((car) => !filters.make || car.make === filters.make).map((car) => car.model));
  const bodies = uniqueSorted(cars.map((car) => car.body));
  const colors = uniqueSorted(cars.map((car) => car.color));
  const years = uniqueSorted(cars.map((car) => String(car.year))).reverse();

  return (
    <div className="rounded-2xl border border-line bg-white p-4 shadow-card">
      <div className="grid gap-3 md:grid-cols-3">
        <input className="input" placeholder="Search make, model, area" value={filters.q} onChange={(event) => onChange({ q: event.target.value })} />
        <select className="input" value={filters.make} onChange={(event) => onChange({ make: event.target.value, model: "" })}>
          <option value="">Any make</option>
          {makes.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select className="input" value={filters.model} onChange={(event) => onChange({ model: event.target.value })}>
          <option value="">Any model</option>
          {models.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      {advanced && (
        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <select className="input" value={filters.body} onChange={(event) => onChange({ body: event.target.value })}>
            <option value="">Any body</option>
            {bodies.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select className="input" value={filters.fuel} onChange={(event) => onChange({ fuel: event.target.value })}>
            <option value="">Any fuel</option>
            {["Petrol", "Diesel", "Hybrid", "Electric"].map((item) => <option key={item}>{item}</option>)}
          </select>
          <select className="input" value={filters.transmission} onChange={(event) => onChange({ transmission: event.target.value })}>
            <option value="">Any gearbox</option>
            {["Automatic", "Manual"].map((item) => <option key={item}>{item}</option>)}
          </select>
          <select className="input" value={filters.price} onChange={(event) => onChange({ price: event.target.value })}>
            {PRICE_OPTIONS.map((item) => <option key={item.label} value={item.value}>{item.label}</option>)}
          </select>
          <select className="input" value={filters.year} onChange={(event) => onChange({ year: event.target.value })}>
            <option value="">Any year from</option>
            {years.map((item) => <option key={item} value={item}>{item} onwards</option>)}
          </select>
          <select className="input" value={filters.mileage} onChange={(event) => onChange({ mileage: event.target.value })}>
            {MILEAGE_OPTIONS.map((item) => <option key={item.label} value={item.value}>{item.label}</option>)}
          </select>
          <select className="input" value={filters.color} onChange={(event) => onChange({ color: event.target.value })}>
            <option value="">Any colour</option>
            {colors.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
      )}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onToggle} className="inline-flex items-center gap-2 text-sm font-semibold text-navy">
            <SlidersHorizontal size={16} /> {advanced ? "Hide filters" : "More filters"}
          </button>
          <p className="text-sm text-ink">{total} cars</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="input !w-auto" aria-label="Sort" value={filters.sort} onChange={(event) => onChange({ sort: event.target.value, page: filters.page })}>
            {SORT_OPTIONS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
          {!mapMode && (
            <div className="flex rounded-xl border border-line p-1">
              <button type="button" aria-label="Grid" onClick={() => onLayout("grid")} className={`rounded-lg p-2 ${layout === "grid" ? "bg-navy text-white" : "text-navy"}`}><LayoutGrid size={16} /></button>
              <button type="button" aria-label="List" onClick={() => onLayout("list")} className={`rounded-lg p-2 ${layout === "list" ? "bg-navy text-white" : "text-navy"}`}><List size={16} /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AreaMap({ cars, active, onSelect }: { cars: Car[]; active: string; onSelect: (area: string) => void }) {
  const counts = new Map<string, number>();
  cars.forEach((car) => counts.set(car.location, (counts.get(car.location) || 0) + 1));
  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-3xl bg-[#d7e3ea]">
      <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #fff 0 18%, transparent 19%), radial-gradient(circle at 70% 40%, #c5d5c8 0 22%, transparent 23%), linear-gradient(#c3d4de, #e7eef2)" }} />
      <p className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy">Bengaluru floor map</p>
      {areas.map((area) => {
        const count = counts.get(area.name) || 0;
        if (!count) return null;
        return (
          <button
            key={area.name}
            type="button"
            onClick={() => onSelect(active === area.name ? "" : area.name)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-2 text-xs font-semibold shadow-card ${active === area.name ? "bg-gold text-navy" : "bg-navy text-white"}`}
            style={{ left: `${area.x}%`, top: `${area.y}%` }}
          >
            {area.name} · {count}
          </button>
        );
      })}
    </div>
  );
}
