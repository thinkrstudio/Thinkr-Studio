// ─────────────────────────────────────────────────────────────────────────────
// What we do: the two services, shown in the homepage list and on each
// /services/<slug> page. Packages and prices themselves live in lib/pricing.ts.
// ─────────────────────────────────────────────────────────────────────────────

export interface ServiceDetail {
  title: string;
  desc:  string;
}

export interface Service {
  key:         string;
  title:       string;
  href:        string;
  /** One or two sentences for the homepage list. */
  description: string;
  tags:        string[];
  page: {
    /** Big line under the page title. */
    lede:     string;
    included: ServiceDetail[];
    steps:    ServiceDetail[];
  };
}

export const SERVICES: Service[] = [
  {
    key:         "web-development",
    title:       "Website Design & Build",
    href:        "/services/web-development",
    description:
      "A website designed around your brand and built to turn visitors into enquiries. Fast, mobile-first and ready for Google from day one.",
    tags:        ["Custom design", "Mobile-first", "SEO-ready", "Fast loading"],
    page: {
      lede:
        "We design and build websites that look like your brand, load fast on any phone and make it easy for visitors to get in touch. From a single landing page to a fully custom site.",
      included: [
        { title: "Design around your brand",  desc: "Layouts, type and colour chosen for your business, not pulled from a template." },
        { title: "Mobile-first build",        desc: "Most of your visitors are on a phone, so every page is built for small screens first." },
        { title: "Fast loading",              desc: "Lean, modern code and optimised images, so pages open quickly and people stay." },
        { title: "Ready for Google",          desc: "Page titles, descriptions and a sitemap set up, so search engines can find you." },
        { title: "Easy to contact you",       desc: "Contact forms and a WhatsApp button wherever a visitor might decide to reach out." },
        { title: "Launch and handover",       desc: "We put the site live, connect your domain and walk you through it." },
      ],
      steps: [
        { title: "Brief",  desc: "A short call about your business, your customers and what the site needs to do." },
        { title: "Design", desc: "We design the pages and share them with you for feedback before any building starts." },
        { title: "Build",  desc: "We build the approved design, make it fast and test it on phones and desktops." },
        { title: "Launch", desc: "Your site goes live on your domain, and we stay on hand for any fixes." },
      ],
    },
  },
  {
    key:         "meta-ads",
    title:       "Meta Ads Setup & Management",
    href:        "/services/meta-ads",
    description:
      "Facebook and Instagram ads, set up properly and managed every month, so your budget reaches people who are likely to buy.",
    tags:        ["Facebook & Instagram", "Pixel tracking", "Static ad creatives", "Monthly reports"],
    page: {
      lede:
        "We set up your Facebook and Instagram advertising the right way, then run it for you every month: designing the ads, managing the campaigns and showing you what your budget is doing.",
      included: [
        { title: "Account setup",           desc: "Meta Business Suite and your ad account set up correctly from the start." },
        { title: "Tracking that works",     desc: "The Meta Pixel installed, so you can see which ads lead to enquiries and sales." },
        { title: "Audience research",       desc: "We work out who your customers are and how to reach them on Facebook and Instagram." },
        { title: "A landing page included", desc: "A focused page for your ads to send people to, so clicks turn into enquiries." },
        { title: "Ads designed for you",    desc: "Static image ads made each month in your brand's look, ready to publish." },
        { title: "Monthly management",      desc: "We watch and adjust your campaigns, then send a clear report every month." },
      ],
      steps: [
        { title: "Set up",   desc: "We set up your accounts and tracking, research your audience and build your landing page." },
        { title: "Launch",   desc: "Your first campaign goes live with ads designed for your brand." },
        { title: "Optimise", desc: "Each month we review results, refresh ads and shift budget to what's working." },
        { title: "Report",   desc: "A plain-language monthly report: what you spent and what it brought in." },
      ],
    },
  },
];
