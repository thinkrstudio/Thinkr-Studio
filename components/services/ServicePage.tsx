import Link from "next/link";
import type { Service } from "@/lib/services";
import { ADS, EXCLUSIONS, WEBSITE_TIERS } from "@/lib/pricing";
import { WHATSAPP } from "@/lib/contact";
import Footer from "@/components/sections/Footer";

// Shared layout for /services/<slug>: same editorial black & white system as the
// homepage. Packages are listed without prices; the pricing brochure is emailed
// when someone fills in the contact form.

const H2 = "font-display font-bold md:font-normal uppercase text-ink leading-[0.95] md:leading-[0.9] tracking-[-0.02em] md:tracking-[-0.035em]";
const H2_SIZE = { fontSize: "clamp(2rem, 5vw, 4.25rem)" };

function Bullets({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className={`relative pl-5 text-base md:text-[0.95rem] leading-snug ${dark ? "text-white/80" : "text-ink/80"}`}>
          <span className="absolute left-0 top-[0.45em] h-2 w-2 rounded-full bg-ember" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Packages({ kind }: { kind: "web" | "ads" }) {
  const blocks =
    kind === "web"
      ? WEBSITE_TIERS.map((t) => ({ name: t.name, summary: t.summary, features: t.features, note: "One-time" }))
      : [
          { name: ADS.setup.name,   summary: "Everything needed to get your ads live.", features: ADS.setup.features,   note: "One-time" },
          { name: ADS.monthly.name, summary: "We run and improve your ads every month.", features: ADS.monthly.features, note: "Monthly" },
        ];

  return (
    <section className="px-6 md:px-10 lg:px-16 py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <h2 className={H2} style={H2_SIZE}>{kind === "web" ? "Packages" : "How it's priced"}</h2>
          <p className="max-w-sm text-lg md:text-[0.95rem] leading-snug md:leading-relaxed text-ink/70">
            Fixed prices in CAD or BDT. Fill in the contact form and our pricing brochure lands in your inbox straight away.
          </p>
        </div>

        <div className={`grid grid-cols-1 gap-4 md:gap-5 ${kind === "web" ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
          {blocks.map((b, i) => (
            <div key={b.name} className="flex flex-col rounded-2xl bg-paper-dark p-6 md:p-8">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tabular-nums text-ember">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-xs font-medium uppercase text-ink/55">{b.note}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold uppercase leading-none tracking-[-0.01em] text-ink">{b.name}</h3>
              <p className="mt-3 mb-6 text-base md:text-[0.95rem] leading-snug text-ink/70">{b.summary}</p>
              <Bullets items={b.features} />
            </div>
          ))}
        </div>

        {kind === "ads" && (
          <div className="mt-5 rounded-2xl border-[1.5px] border-ink p-6 md:p-8">
            <p className="mb-4 text-sm md:text-xs font-semibold uppercase tracking-[0.12em] text-ink">Not included</p>
            <Bullets items={EXCLUSIONS} />
          </div>
        )}

        <Link
          href="/#contact"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-ember px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ember-dark"
        >
          Get our pricing
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

export default function ServicePage({ service, number, kind }: { service: Service; number: string; kind: "web" | "ads" }) {
  const { page } = service;

  return (
    <>
      {/* ── Hero ── */}
      <section className="px-6 md:px-10 lg:px-16 pt-36 md:pt-44 pb-16 md:pb-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <Link href="/#services" className="inline-flex items-center gap-2 text-sm md:text-xs font-medium uppercase text-ink/60 transition-colors hover:text-ember">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            All services
          </Link>
          <p className="mt-10 text-sm md:text-xs font-semibold uppercase tracking-[0.14em] text-ember">Service {number}</p>
          <h1
            className="mt-3 font-display font-bold md:font-normal uppercase text-ink leading-[0.95] md:leading-[0.88] tracking-[-0.02em] md:tracking-[-0.035em]"
            style={{ fontSize: "clamp(2.4rem, 6.4vw, 6rem)" }}
          >
            {service.title}
          </h1>
          <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="max-w-2xl text-lg md:text-xl leading-snug text-ink/75">{page.lede}</p>
            <Link
              href="/#contact"
              className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-ember px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ember-dark"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="px-6 md:px-10 lg:px-16 py-20 md:py-28 bg-white border-t border-ink/10">
        <div className="max-w-7xl mx-auto">
          <h2 className={`${H2} mb-10 md:mb-14`} style={H2_SIZE}>What&apos;s included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-ink/12">
            {page.included.map((item, i) => (
              <div key={item.title} className="border-b border-ink/12 py-7 sm:pr-8">
                <span className="text-xs font-semibold tabular-nums text-ember">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-xl md:text-2xl font-bold leading-tight text-ink">{item.title}</h3>
                <p className="mt-2 text-base md:text-[0.95rem] leading-snug text-ink/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Packages kind={kind} />

      {/* ── How it works ── */}
      <section className="px-6 md:px-10 lg:px-16 py-20 md:py-28 bg-ink text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className={`${H2} text-white mb-10 md:mb-14`} style={H2_SIZE}>How it works</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {page.steps.map((s, i) => (
              <div key={s.title} className="border-t-[1.5px] border-white/25 pt-4">
                <span className="text-xs font-semibold tabular-nums text-ember">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-xl font-bold uppercase leading-tight">{s.title}</h3>
                <p className="mt-2 text-sm md:text-[0.95rem] leading-snug text-white/70">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-t border-white/12 pt-10">
            <p className="font-display text-2xl md:text-3xl font-bold uppercase leading-tight">Ready to start?</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/#contact" className="inline-flex items-center justify-center rounded-full bg-ember px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ember-dark">
                Get our pricing
              </Link>
              {WHATSAPP.map((w) => (
                <a
                  key={w.region}
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white"
                >
                  WhatsApp {w.region}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
