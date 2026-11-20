import { cars as catalogCars } from "@/data/cars";
import { articles } from "@/data/content";
import { products } from "@/data/content";
import type { Car } from "@/lib/types";

/**
 * Read models for the showroom catalog.
 * These functions return local sample data. When the existing backend is
 * connected, replace the bodies of these functions only. Do not add route
 * handlers in this frontend project.
 */
export function getCars(): Car[] {
  return catalogCars;
}

export function getCarBySlug(slug: string): Car | undefined {
  return catalogCars.find((car) => car.slug === slug);
}

export function getArticles() {
  return articles;
}

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getProducts() {
  return products;
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedCars(car: Car, limit = 3) {
  return catalogCars.filter((item) => item.slug !== car.slug && (item.body === car.body || item.make === car.make)).slice(0, limit);
}
