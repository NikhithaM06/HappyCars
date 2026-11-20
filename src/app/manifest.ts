import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Happy Cars",
    short_name: "Happy Cars",
    description: "Premium used-car showroom in Bengaluru.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1A3760",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
