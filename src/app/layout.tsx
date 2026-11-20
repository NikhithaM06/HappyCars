import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShowroomProvider } from "@/context/ShowroomContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
      <body className={`${inter.variable} antialiased`}>
        <ShowroomProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ShowroomProvider>
      </body>
    </html>
  );
}
