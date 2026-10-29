// ─────────────────────────────────────────────────────────────────────────────
// Pricing — the single source for the brochures and the contact-form auto-reply.
// After editing, rebuild the PDFs:  npm run brochures
// No imports here: scripts/build-brochures.mjs loads this file directly with Node.
// ─────────────────────────────────────────────────────────────────────────────

export type Region = "ca" | "bd";

export const REGIONS: Record<Region, { name: string; currency: string; file: string }> = {
  ca: { name: "Canada",     currency: "CAD", file: "thinkr-pricing-canada.pdf" },
  bd: { name: "Bangladesh", currency: "BDT", file: "thinkr-pricing-bangladesh.pdf" },
};

export function formatPrice(region: Region, amount: number) {
  return region === "ca"
    ? `$${amount.toLocaleString("en-US")}`
    : `BDT ${amount.toLocaleString("en-US")}`;
}

export interface Tier {
  name:     string;
  summary:  string;
  price:    Record<Region, number>;
  features: string[];
}

export const WEBSITE_TIERS: Tier[] = [
  {
    name:    "Landing Page",
    summary: "One focused page that turns visitors into enquiries.",
    price:   { ca: 300, bd: 15000 },
    features: [
      "Single-page website, up to 5 sections",
      "Mobile-friendly and fast-loading",
      "Contact form and WhatsApp button",
      "Basic SEO setup",
      "1 round of revisions",
      "Delivered in about 1 week",
    ],
  },
  {
    name:    "Multi-page Basic",
    summary: "A complete website for an established small business.",
    price:   { ca: 500, bd: 30000 },
    features: [
      "Up to 5 pages",
      "Everything in Landing Page",
      "Google Maps and social links",
      "Google Analytics setup",
      "2 rounds of revisions",
      "Delivered in about 2 weeks",
    ],
  },
  {
    name:    "Custom Themed",
    summary: "A fully custom design built around your brand.",
    price:   { ca: 1000, bd: 65000 },
    features: [
      "Up to 10 pages, designed from scratch",
      "Custom animations and interactions",
      "Everything in Multi-page Basic",
      "Advanced SEO setup",
      "3 rounds of revisions",
      "Delivered in about 3–4 weeks",
    ],
  },
];

export const ADS = {
  title:   "Meta Ads",
  summary: "Facebook and Instagram advertising, set up and run for you.",
  setup: {
    name:     "Setup",
    note:     "one-time",
    price:    { ca: 500, bd: 12000 } as Record<Region, number>,
    features: [
      "Meta Business Suite and ad account setup",
      "Meta Pixel and conversion tracking",
      "Audience and competitor research",
      "Landing page included",
      "First campaign built and launched",
    ],
  },
  monthly: {
    name:     "Monthly management",
    note:     "per month",
    price:    { ca: 300, bd: 5000 } as Record<Region, number>,
    features: [
      "Static ad creatives (no video)",
      "Campaign management and optimisation",
      "Monthly performance report",
    ],
  },
};

export const EXCLUSIONS = [
  "Ad budget: paid directly to Meta, separate from our fees",
  "Domain name registration and renewal",
];

export const PRICES_AS_OF = "October 2026";
