import Link from "next/link";
import { EMAIL, WHATSAPP } from "@/lib/contact";
import SocialIcons from "@/components/layout/SocialIcons";

const footerLinks = [
  { label: "Work",     href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Process",  href: "/#process" },
  { label: "About",    href: "/#about" },
  { label: "Contact",  href: "/#contact" },
];

// Compact, OIC-style: logo, one list of links, contact details, plain social glyphs, legal.
export default function Footer() {
  return (
    <footer className="bg-ink-dark px-6 md:px-10 lg:px-16 pt-14 pb-10 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1.2fr] gap-10 md:gap-12">
          <div>
            <Link href="/" className="font-display text-[2.75rem] md:text-[3.5rem] font-black tracking-tight leading-none">
              Thinkr<span className="text-ember">.</span>
            </Link>
            <p className="mt-4 max-w-xs text-base md:text-sm leading-relaxed text-white/55">
              Brand-forward websites built to work hard for your business.
            </p>
          </div>

          <nav>
            <ul className="space-y-3 text-sm font-medium uppercase">
              {footerLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors duration-200 hover:text-ember">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-6">
            <div className="space-y-2 text-sm font-medium uppercase">
              <a href={`mailto:${EMAIL}`} className="block break-all transition-colors duration-200 hover:text-ember">
                {EMAIL}
              </a>
              {WHATSAPP.map((w) => (
                <a
                  key={w.region}
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors duration-200 hover:text-ember"
                >
                  WhatsApp {w.region}: {w.display}
                </a>
              ))}
            </div>
            <SocialIcons />
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-t border-white/10 pt-6 text-xs font-medium uppercase text-white/55">
          <div className="flex flex-col md:flex-row gap-3 md:gap-6">
            <Link href="/privacy" className="transition-colors duration-200 hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors duration-200 hover:text-white">Terms of Service</Link>
          </div>
          <p>© 2026 Thinkr Studio</p>
        </div>
      </div>
    </footer>
  );
}
