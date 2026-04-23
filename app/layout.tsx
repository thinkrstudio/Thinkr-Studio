import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PreloaderProvider } from "@/lib/preloader-context";
import Preloader from "@/components/layout/Preloader";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Thinkr Studio — Design with purpose, build with motion",
  description:
    "Thinkr Studio transforms brands with websites that tell stories, delight users, and boost growth.",
  keywords: ["web agency", "design studio", "web development", "brand design", "motion design"],
  openGraph: {
    title: "Thinkr Studio — Design with purpose, build with motion",
    description:
      "Thinkr Studio transforms brands with websites that tell stories, delight users, and boost growth.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-cream text-forest antialiased overflow-x-hidden">
        <PreloaderProvider>
          <Preloader />
          <Navbar />
          <main>{children}</main>
        </PreloaderProvider>
      </body>
    </html>
  );
}
