"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Footer from "@/components/sections/Footer";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const deliverables = [
  { title: "Logo Suite", desc: "Primary, secondary, and icon marks. Versions for every context — print, digital, dark, light." },
  { title: "Brand Strategy", desc: "Positioning, tone of voice, and the story that makes your brand worth remembering." },
  { title: "Colour & Typography", desc: "A palette and type system that feels intentional and stays consistent at every touchpoint." },
  { title: "Brand Guidelines", desc: "A comprehensive document your team can actually use — not a PDF that sits in a folder." },
  { title: "Visual Identity System", desc: "Patterns, textures, icons, and graphic elements that extend your brand beyond the logo." },
  { title: "Social & Digital Assets", desc: "Profile images, banners, post templates — everything you need to show up consistently online." },
];

const process = [
  { step: "01", title: "Research", desc: "We study your market, competitors, and audience before putting pen to paper. Good design starts with good strategy." },
  { step: "02", title: "Strategy", desc: "We define your positioning, tone, and visual direction. This becomes the brief we design against." },
  { step: "03", title: "Concept", desc: "We present two or three distinct visual directions — not fifty logo options to overwhelm you." },
  { step: "04", title: "Refine", desc: "You give feedback. We refine. We repeat until the concept is exactly right." },
  { step: "05", title: "Build", desc: "We develop the full brand system from the approved concept — every asset, every format." },
  { step: "06", title: "Deliver", desc: "You receive organised files, usage guidelines, and a handover call so you know exactly what you have." },
];

const pillars = [
  {
    title: "First impressions are permanent.",
    desc: "Visitors form an opinion of your brand in under 50 milliseconds. A weak identity signals a weak business. A strong one signals trust — before you've said a word.",
  },
  {
    title: "Consistency builds trust.",
    desc: "A brand that looks different everywhere feels unreliable. A cohesive identity across every touchpoint quietly tells your audience: this team has their act together.",
  },
  {
    title: "Brand is a business asset.",
    desc: "Strong brands command higher prices, attract better clients, and grow faster. Your visual identity isn't a cost — it's an investment with compounding returns.",
  },
];

export default function BrandIdentityPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-forest-dark overflow-hidden pt-36 pb-28 px-6 md:px-10 lg:px-16">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 right-1/4 w-[600px] h-[600px] rounded-full bg-ember/[0.07] blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-cream/[0.02] blur-[100px]" />
        </div>

        <div ref={heroRef} className="relative z-10 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <Link href="/#services" className="inline-flex items-center gap-2 text-cream/38 text-xs tracking-[0.15em] uppercase mb-8 hover:text-cream/60 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              All Services
            </Link>
          </motion.div>

          <motion.span className="block text-[0.67rem] tracking-[0.2em] uppercase text-ember font-semibold mb-4" initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.1 }}>
            Service — 02
          </motion.span>

          <motion.h1
            className="font-display font-black text-cream leading-[0.9] tracking-tight mb-7"
            style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            Your brand,<br />
            <span className="italic text-ember">built to be remembered.</span>
          </motion.h1>

          <motion.p
            className="text-cream/55 text-lg leading-relaxed max-w-xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          >
            Before your copy. Before your pricing. Before your pitch — your brand makes a first impression.
            We craft visual identities that resonate on sight and hold up under pressure.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.35 }}>
            <Link href="/#contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ember text-cream font-semibold text-sm hover:bg-ember-dark transition-colors duration-200">
              Start a project
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Why brand matters ────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionLabel label="Why It Matters" />
          <h2 className="font-display font-black text-forest leading-tight tracking-tight mb-16" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            Identity is strategy.<br />
            <span className="italic text-ember">Not decoration.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <FadeCard key={p.title} delay={i * 0.1}>
                <div className="p-8 rounded-2xl bg-forest h-full">
                  <div className="w-8 h-[2px] bg-ember mb-6" />
                  <h3 className="font-display font-bold text-cream text-xl leading-snug mb-4">{p.title}</h3>
                  <p className="text-cream/50 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </FadeCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deliverables ─────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-cream-muted">
        <div className="max-w-7xl mx-auto">
          <SectionLabel label="What You Get" />
          <h2 className="font-display font-black text-forest leading-tight tracking-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            A complete brand system.<br />
            <span className="italic text-ember">Not just a logo.</span>
          </h2>
          <p className="text-forest/55 text-base leading-relaxed max-w-lg mb-16">
            A logo without a system falls apart the moment it's applied. We build complete identities that work everywhere.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {deliverables.map((item, i) => (
              <FadeCard key={item.title} delay={i * 0.07}>
                <div className="p-7 rounded-2xl border border-forest/10 bg-cream h-full hover:border-ember/30 transition-colors duration-300">
                  <h3 className="font-display font-bold text-forest text-lg mb-2">{item.title}</h3>
                  <p className="text-forest/55 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-forest">
        <div className="max-w-7xl mx-auto">
          <SectionLabel label="Our Process" light />
          <h2 className="font-display font-black text-cream leading-tight tracking-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            Strategy first.<br />
            <span className="italic text-ember">Design second.</span>
          </h2>
          <p className="text-cream/50 text-base leading-relaxed max-w-lg mb-16">
            We don't open Illustrator until we understand your business. Every creative decision we make is grounded in strategy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {process.map((step, i) => (
              <FadeCard key={step.step} delay={i * 0.07}>
                <div className="p-7 rounded-2xl border border-cream/[0.08] h-full">
                  <span className="block font-display text-[3rem] font-black text-cream/[0.06] leading-none mb-4">{step.step}</span>
                  <h3 className="font-display font-bold text-cream text-xl mb-2">{step.title}</h3>
                  <p className="text-cream/50 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </FadeCard>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
      <Footer />
    </>
  );
}

function SectionLabel({ label, light }: { label: string; light?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.span ref={ref} className={`block text-[0.67rem] tracking-[0.2em] uppercase font-semibold mb-4 text-ember`} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
      {label}
    </motion.span>
  );
}

function FadeCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-forest-dark">
      <div ref={ref} className="max-w-3xl mx-auto text-center">
        <motion.h2 className="font-display font-black text-cream leading-tight tracking-tight mb-5" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, ease: EASE }}>
          Ready to build a brand<br />
          <span className="italic text-ember">people remember?</span>
        </motion.h2>
        <motion.p className="text-cream/50 text-base leading-relaxed mb-10" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.15 }}>
          Tell us where you are and where you want to be. We'll take care of the gap.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.25 }}>
          <Link href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-ember text-cream font-semibold text-sm hover:bg-ember-dark transition-colors duration-200">
            Start a conversation
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
