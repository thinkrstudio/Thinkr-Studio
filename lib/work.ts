// ─────────────────────────────────────────────────────────────────────────────
// Work / portfolio data
//
// Media lives in /public/work and is matched by `slug` — no paths needed here:
//   public/work/<slug>.jpg         main image (3:2 landscape) — .jpg .jpeg .png .webp .avif
//   public/work/<slug>-hover.jpg   optional — crossfades in on hover
//   public/work/<slug>.mp4         optional — plays on hover (.mp4 or .webm)
// Until a main image exists, the card shows a tinted placeholder.
// ─────────────────────────────────────────────────────────────────────────────

export type WorkCategory = "web" | "brand";

export interface WorkProject {
  slug:     string;
  name:     string;
  category: WorkCategory;
  tags:     string[];
  year:     string;
  /** Shown as "for <client>" — e.g. work made for an employer or agency. */
  client?:  string;
  /** Live URL. Omit to render the card without a link. */
  href?:    string;
  /** Placeholder / loading background colour. */
  tint:     string;
  /** The brief, as an outcome — the card's big headline ("The brief: …"). */
  headline: string;
  /** Two or three sentences on what we did. */
  story:    string;
  /** Also list this project in the "Featured Clients" section. */
  featured?: boolean;
}

export interface WorkProjectWithMedia extends WorkProject {
  image?:      string;
  hoverImage?: string;
  video?:      string;
  ongoing:     boolean;
}

// Projects still on a Vercel preview URL haven't launched on their own domain
// yet, so they're automatically marked "Ongoing".
export const isOngoing = (p: WorkProject) => !!p.href && /vercel\.app/i.test(p.href);

export const WORK: WorkProject[] = [
  {
    slug:     "space-perfumes",
    name:     "Space Perfumes",
    category: "web",
    tags:     ["E-Commerce", "Web Design", "Development"],
    year:     "2025",
    href:     "https://www.spaceperfumes.com",
    tint:     "#1a1712",
    headline: "Turn authentic decants into a cinematic storefront.",
    story:
      "Space Perfumes came to us for a storefront worthy of the fragrances they sell. We designed and developed a dark, cinematic e-commerce experience for their authentic decants, built to showcase high-end product and make buying feel effortless.",
    featured: true,
  },
  {
    slug:     "khans-hvac",
    name:     "Khan's Authentic HVAC",
    category: "web",
    tags:     ["B2B Service", "Web Design", "Development"],
    year:     "2025",
    href:     "https://www.khanshvac.com",
    tint:     "#0b1a3a",
    headline: "Position an HVAC firm as the authority in climate control.",
    story:
      "Khan's Authentic HVAC Systems needed a digital presence that matched the scale of their engineering work. We designed and built a B2B website that presents their industrial and commercial HVAC services with clarity, positioning them as the authority in climate control.",
    featured: true,
  },
  {
    slug:     "forever",
    name:     "Forever",
    category: "web",
    tags:     ["Streetwear", "E-Commerce", "Web Design"],
    year:     "2025",
    href:     "https://forever-ten-lime.vercel.app/",
    tint:     "#7a3412",
    headline: "Make every streetwear drop feel like a cultural event.",
    story:
      "Forever is a premium streetwear label that wants every drop to feel like a cultural event. We're crafting a bold, editorial e-commerce experience, with oversized type and cinematic imagery, that matches the brand's attitude.",
    featured: true,
  },
  {
    slug:     "boideshik-banik",
    name:     "Boideshik Banik",
    category: "web",
    tags:     ["Wholesale", "E-Commerce", "Web Design"],
    year:     "2026",
    href:     "https://boideshik-banik-2.vercel.app/",
    tint:     "#e4dacb",
    headline: "Make factory-direct wholesale simple for shop owners.",
    story:
      "Boideshik Banik supplies factory-direct electronics to shop owners across Bangladesh. We're building a clean wholesale storefront that makes browsing the catalogue, checking prices and requesting quotes fast and simple.",
    featured: true,
  },
  {
    slug:     "watch-studio",
    name:     "Watch Studio",
    category: "web",
    tags:     ["Luxury", "E-Commerce", "Web Design"],
    year:     "2026",
    href:     "https://watch-studio-beta.vercel.app/",
    tint:     "#efe6d6",
    headline: "Sell fine timepieces with the calm of an atelier.",
    story:
      "Watch Studio sells luxury timepieces finished by hand. We're designing a warm, editorial storefront that presents each model like a piece of jewellery, with detail views that reward a closer look.",
  },
  {
    slug:     "cathedral-attire",
    name:     "Cathedral Attire",
    category: "web",
    tags:     ["Streetwear", "E-Commerce", "Web Design"],
    year:     "2026",
    href:     "https://cathedral-attire.vercel.app/",
    tint:     "#0d0d0d",
    headline: "Give a gothic streetwear label a voice as loud as its clothes.",
    story:
      "Cathedral Attire is a streetwear label built on bold graphics and a loud attitude. We're building an e-commerce experience with oversized type, neon accents and drop-led merchandising to match.",
  },
  {
    slug:     "armor-bright",
    name:     "Armor Bright",
    category: "web",
    tags:     ["Home Services", "Lead Generation", "Web Design"],
    year:     "2026",
    href:     "https://armor-bright.vercel.app/",
    tint:     "#0b1424",
    headline: "Turn permanent roofline lighting into a must-have upgrade.",
    story:
      "Armor Bright installs permanent, app-controlled roofline lighting. We're building a lead-generation site that shows the product at its best, hidden by day and brilliant by night, and turns visitors into free-estimate requests.",
  },
  {
    slug:     "waterline-voice",
    name:     "Waterline Voice",
    category: "web",
    tags:     ["SaaS", "Landing Page", "Web Design"],
    year:     "2026",
    href:     "https://www.waterlinevoice.com/",
    tint:     "#0f172a",
    headline: "Stop plumbers losing jobs to voicemail.",
    story:
      "Waterline Voice answers the calls plumbers miss and texts them the job in about a minute. We designed and built a landing page that tells the missed-call story clearly and turns visiting plumbers into sign-ups.",
  },

  // Brand & ad work uses the same shape, e.g.:
  // {
  //   slug:     "obby-summer-campaign",
  //   name:     "Summer Campaign",
  //   client:   "Obby",
  //   category: "brand",
  //   tags:     ["Social Ads", "Campaign"],
  //   year:     "2025",
  //   tint:     "#e8e2d6",
  //   headline: "…",
  //   story:    "…",
  // },
];
