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
  title: "Thinkr Studio | Websites & Meta Ads",
  description:
    "Thinkr Studio designs and builds websites that win enquiries, and sets up and runs Facebook and Instagram ads that bring the right people to them.",
  keywords: ["web design", "website development", "Meta ads", "Facebook ads", "Instagram ads", "landing page"],
  openGraph: {
    title: "Thinkr Studio | Websites & Meta Ads",
    description:
      "Websites that win enquiries, and Meta ads that bring the right people to them.",
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
