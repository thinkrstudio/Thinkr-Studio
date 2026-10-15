// "What we do" — shown on the homepage and linked to each /services page.

export interface Service {
  key:         string;
  title:       string;
  href:        string;
  description: string;
  tags:        string[];
}

export const SERVICES: Service[] = [
  {
    key:         "web-development",
    title:       "Web Design & Development",
    href:        "/services/web-development",
    description: "Fast, conversion-focused websites built on Next.js. No templates, no cutting corners. Sites that perform from the moment they go live.",
    tags:        ["Next.js", "React", "CMS Integration", "Performance"],
  },
  {
    key:         "brand-identity",
    title:       "Brand & Identity",
    href:        "/services/brand-identity",
    description: "Your visual identity is the first thing people judge, before they read a word. We make sure it says exactly the right thing, instantly.",
    tags:        ["Logo Design", "Brand Strategy", "Style Guides", "Visual Identity"],
  },
  {
    key:         "motion-interaction",
    title:       "Motion & Interaction",
    href:        "/services/motion-interaction",
    description: "The difference between a website and an experience. We use animation to guide attention and build trust, not just to impress.",
    tags:        ["Framer Motion", "GSAP", "Lottie", "3D Experiences"],
  },
  {
    key:         "digital-strategy",
    title:       "Digital Strategy & Growth",
    href:        "/services/digital-strategy",
    description: "Pretty doesn't pay the bills. We tie every design decision to your goals and track what actually moves the needle.",
    tags:        ["CRO", "Analytics", "SEO Architecture", "Growth Design"],
  },
];
