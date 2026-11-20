"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Car, CartLine, RegisteredUser, SessionUser, ShowroomState } from "@/lib/types";

const STORAGE_KEY = "happy-cars-showroom";

const empty: ShowroomState = {
  favorites: [],
  compare: [],
  cart: [],
  userListings: [],
  session: null,
  users: [],
};

const DEMO_USER: RegisteredUser = {
  firstName: "Nikhitha",
  lastName: "Demo",
  email: "demo@happycars.example",
  password: "happy123",
};

type Store = ShowroomState & {
  ready: boolean;
  toggleFavorite: (slug: string) => void;
  toggleCompare: (slug: string) => { ok: boolean; reason?: string };
  clearCompare: () => void;
  addToCart: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  addListing: (car: Car) => void;
  removeListing: (slug: string) => void;
  register: (user: RegisteredUser) => { ok: boolean; reason?: string };
  login: (email: string, password: string) => { ok: boolean; reason?: string };
  logout: () => void;
};

const ShowroomContext = createContext<Store | null>(null);

export function ShowroomProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ShowroomState>(empty);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ShowroomState>;
        setState({ ...empty, ...parsed });
      }
    } catch {
      setState(empty);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, ready]);

  const store = useMemo<Store>(() => {
    return {
      ...state,
      ready,
      toggleFavorite: (slug) => {
        setState((current) => ({
          ...current,
          favorites: current.favorites.includes(slug)
            ? current.favorites.filter((item) => item !== slug)
            : [...current.favorites, slug],
        }));
      },
      toggleCompare: (slug) => {
        let result: { ok: boolean; reason?: string } = { ok: true };
        setState((current) => {
          if (current.compare.includes(slug)) {
            return { ...current, compare: current.compare.filter((item) => item !== slug) };
          }
          if (current.compare.length >= 3) {
            result = { ok: false, reason: "You can compare up to three cars." };
            return current;
          }
          return { ...current, compare: [...current.compare, slug] };
        });
        return result;
      },
      clearCompare: () => setState((current) => ({ ...current, compare: [] })),
      addToCart: (slug) => {
        setState((current) => {
          const existing = current.cart.find((line) => line.slug === slug);
          const cart: CartLine[] = existing
            ? current.cart.map((line) => (line.slug === slug ? { ...line, qty: line.qty + 1 } : line))
            : [...current.cart, { slug, qty: 1 }];
          return { ...current, cart };
        });
      },
      setQty: (slug, qty) => {
        setState((current) => ({
          ...current,
          cart:
            qty <= 0
              ? current.cart.filter((line) => line.slug !== slug)
              : current.cart.map((line) => (line.slug === slug ? { ...line, qty } : line)),
        }));
      },
      removeFromCart: (slug) => {
        setState((current) => ({ ...current, cart: current.cart.filter((line) => line.slug !== slug) }));
      },
      clearCart: () => setState((current) => ({ ...current, cart: [] })),
      addListing: (car) => {
        setState((current) => ({
          ...current,
          userListings: [car, ...current.userListings.filter((item) => item.slug !== car.slug)],
        }));
      },
      removeListing: (slug) => {
        setState((current) => ({
          ...current,
          userListings: current.userListings.filter((item) => item.slug !== slug),
          favorites: current.favorites.filter((item) => item !== slug),
          compare: current.compare.filter((item) => item !== slug),
        }));
      },
      register: (user) => {
        const email = user.email.trim().toLowerCase();
        if (state.users.some((item) => item.email === email) || email === DEMO_USER.email) {
          return { ok: false, reason: "An account with that email already exists." };
        }
        const next: RegisteredUser = { ...user, email };
        const session: SessionUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          email,
        };
        setState((current) => ({ ...current, users: [...current.users, next], session }));
        return { ok: true };
      },
      login: (email, password) => {
        const normalized = email.trim().toLowerCase();
        const known = [DEMO_USER, ...state.users].find((item) => item.email === normalized);
        if (!known || known.password !== password) {
          return { ok: false, reason: "Those details do not match an account on this device." };
        }
        setState((current) => ({
          ...current,
          session: { firstName: known.firstName, lastName: known.lastName, email: known.email },
        }));
        return { ok: true };
      },
      logout: () => setState((current) => ({ ...current, session: null })),
    };
  }, [state, ready]);

  return <ShowroomContext.Provider value={store}>{children}</ShowroomContext.Provider>;
}

export function useShowroom() {
  const context = useContext(ShowroomContext);
  if (!context) throw new Error("useShowroom must be used within ShowroomProvider");
  return context;
}
