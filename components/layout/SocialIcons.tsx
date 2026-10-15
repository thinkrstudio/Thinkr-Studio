import { SOCIALS, WHATSAPP, WHATSAPP_ICON_PATH } from "@/lib/contact";

// Plain glyphs in a row, no circles — the way OIC shows theirs.
// WhatsApp opens the Bangladesh number; both numbers are listed as text alongside.
export default function SocialIcons({ className = "" }: { className?: string }) {
  const icons = [
    ...SOCIALS,
    { label: "WhatsApp", href: WHATSAPP[0].href, path: WHATSAPP_ICON_PATH },
  ];

  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {icons.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="text-white transition-opacity duration-200 hover:opacity-60"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
            <path d={s.path} />
          </svg>
        </a>
      ))}
    </div>
  );
}
