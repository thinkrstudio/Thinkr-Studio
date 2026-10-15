import type { Metadata } from "next";
import { Familjen_Grotesk } from "next/font/google";
import "./globals.css";
import { PreloaderProvider } from "@/lib/preloader-context";
import Preloader from "@/components/layout/Preloader";
import Navbar from "@/components/layout/Navbar";

// One family for headings and body — closest free match to Founders Grotesk.
const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  variable: "--font-familjen",
  display: "swap",
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
    <html lang="en" className={familjen.variable}>
      <body className="bg-white text-ink antialiased overflow-x-hidden">
        <PreloaderProvider>
          <Preloader />
          <Navbar />
          <main>{children}</main>
        </PreloaderProvider>
      </body>
    </html>
  );
}
