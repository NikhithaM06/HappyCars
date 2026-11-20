import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShowroomProvider } from "@/context/ShowroomContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://happycars.example"),
  title: {
    default: "Happy Cars | Premium used car showroom in Bengaluru",
    template: "%s | Happy Cars",
  },
  description:
    "Inspected used and certified cars in Indiranagar. Search the floor, compare cars, estimate a loan, and enquire with Happy Cars.",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "Happy Cars",
    description: "A premium used-car showroom in Bengaluru with inspected cars and plain pricing.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ShowroomProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ShowroomProvider>
      </body>
    </html>
  );
}
