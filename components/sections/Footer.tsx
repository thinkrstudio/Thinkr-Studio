import Link from "next/link";

const workLinks = [
  { label: "Space Perfumes",            href: "https://spaceperfumes.com" },
  { label: "Khan's Authentic HVAC",     href: "https://khanshvac.com" },
  { label: "Forever",                   href: "https://forever-ten-lime.vercel.app/" },
  { label: "Sphere Connect",            href: "https://sphereconnect.io" },
];

const footerLinks = {
  Services: ["Brand & Identity", "Web Development", "Motion Design", "Digital Strategy"],
  Company:  ["About", "Process", "Blog", "Careers"],
  Connect:  ["Facebook", "Instagram"],
};

const socialIcons = [
  {
    label: "Facebook",
    href:  "https://www.facebook.com/people/Thinkr-Studio/61570999466264/",
    path:  "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "Instagram",
    href:  "https://www.instagram.com/thinkrstudio",
    path:  "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
];

export default function Footer() {
  return (
    <footer className="bg-forest-dark border-t border-cream/[0.06] px-6 md:px-10 lg:px-16 pt-14 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10 mb-14">
          {/* Brand column */}
          <div>
            <span className="font-display text-[2rem] font-black text-cream tracking-tight leading-none">
              Thinkr<span className="text-ember">.</span>
            </span>
            <p className="text-cream/38 text-sm leading-relaxed mt-4 max-w-[240px]">
              No fluff, no bloated process — just brand-forward websites built to work hard for your business.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex gap-2.5">
              {socialIcons.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-cream/10 flex items-center justify-center text-cream/38 hover:text-cream hover:border-cream/28 transition-colors duration-200 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Work column — external project links */}
          <div>
            <p className="text-cream/22 text-[0.64rem] tracking-[0.18em] uppercase mb-4 font-semibold">
              Work
            </p>
            <ul className="space-y-2.5">
              {workLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream/45 text-sm hover:text-cream transition-colors duration-200 cursor-pointer leading-snug"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Remaining link columns */}
          {(Object.entries(footerLinks) as [string, string[]][]).map(([category, items]) => (
            <div key={category}>
              <p className="text-cream/22 text-[0.64rem] tracking-[0.18em] uppercase mb-4 font-semibold">
                {category}
              </p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href={
                        category === "Connect"
                          ? socialIcons.find(s => s.label === item)?.href ?? "#"
                          : "#"
                      }
                      target={category === "Connect" ? "_blank" : undefined}
                      rel={category === "Connect" ? "noopener noreferrer" : undefined}
                      className="text-cream/45 text-sm hover:text-cream transition-colors duration-200 cursor-pointer leading-snug"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-cream/[0.07] mb-7" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-cream/22 text-xs">
          <p>© 2026 Thinkr Studio. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-cream/55 transition-colors duration-200 cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
