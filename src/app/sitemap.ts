import type { MetadataRoute } from "next";
import { getArticles, getCars, getProducts } from "@/services/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/browse-cars", "/inventory", "/inventory/map", "/about", "/testimonials", "/contact", "/privacy-policy", "/services", "/blog", "/faq", "/compare", "/calculator", "/pricing", "/shop", "/login", "/register", "/terms"].map((path) => ({
    url: `https://happycars.example${path || "/"}`,
    lastModified: new Date(),
  }));
  const cars = getCars().map((car) => ({ url: `https://happycars.example/cars/${car.slug}`, lastModified: new Date(car.createdAt) }));
  const posts = getArticles().map((post) => ({ url: `https://happycars.example/blog/${post.slug}`, lastModified: new Date() }));
  const products = getProducts().map((product) => ({ url: `https://happycars.example/shop/${product.slug}`, lastModified: new Date() }));
  return [...staticRoutes, ...cars, ...posts, ...products];
}
