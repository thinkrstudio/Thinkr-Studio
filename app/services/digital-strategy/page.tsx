"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Footer from "@/components/sections/Footer";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const deliverables = [
  { title: "CRO Audits", desc: "We review your funnel, identify where users drop off, and implement changes that increase conversion rate." },
  { title: "SEO Architecture", desc: "Site structure, internal linking, and technical SEO built in from the start — not bolted on later." },
  { title: "Analytics Setup", desc: "GA4, event tracking, and conversion goals configured so you actually know what's working." },
  { title: "A/B Testing Frameworks", desc: "We set up the infrastructure to test design and copy variations systematically and read results clearly." },
  { title: "Conversion Funnel Design", desc: "Landing pages, onboarding flows, and checkout paths designed around how users actually behave." },
  { title: "Growth Roadmaps", desc: "A prioritised plan of experiments and improvements, ranked by expected impact vs. effort." },
];

const metrics = [
  { stat: "Conversion Rate", desc: "We treat every design decision as a hypothesis and test it against the metric that matters most." },
  { stat: "Bounce Rate", desc: "High bounce rates tell us users aren't finding what they expected. We fix the gap between promise and delivery." },
  { stat: "Time on Site", desc: "Engaged users convert. We design content hierarchy and flows that keep the right people moving forward." },
  { stat: "Organic Traffic", desc: "SEO architecture built into every project means you grow visibility without paying for every click." },
];

const process = [
  { step: "01", title: "Audit", desc: "We analyse your existing site data, funnel performance, and user behaviour before recommending anything." },
  { step: "02", title: "Diagnose", desc: "We identify the highest-leverage problems — the ones that, if fixed, move the most meaningful metrics." },
  { step: "03", title: "Prioritise", desc: "We rank opportunities by impact and effort, so you never waste resources on low-return changes." },
  { step: "04", title: "Design & Build", desc: "We implement changes — from copy tweaks to full page redesigns — with measurement baked in." },
  { step: "05", title: "Measure", desc: "Every change is tracked. We establish baselines and measure against them honestly." },
  { step: "06", title: "Iterate", desc: "Strategy isn't a one-time engagement. We review results, learn, and plan the next round of improvements." },
];

export default function DigitalStrategyPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-forest-dark overflow-hidden pt-36 pb-28 px-6 md:px-10 lg:px-16">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 right-1/3 w-[550px] h-[550px] rounded-full bg-ember/[0.07] blur-[140px]" />
          <div className="absolute bottom-0 left-10 w-[380px] h-[380px] rounded-full bg-cream/[0.02] blur-[100px]" />
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
            Service — 04
          </motion.span>

          <motion.h1
            className="font-display font-black text-cream leading-[0.9] tracking-tight mb-7"
            style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            Design that drives<br />
            <span className="italic text-ember">real results.</span>
          </motion.h1>

          <motion.p
            className="text-cream/55 text-lg leading-relaxed max-w-xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          >
            Pretty doesn't pay the bills. We connect every design decision to your business goals —
            then track whether it worked. Strategy without execution is a slide deck. We do both.
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

      {/* ── What we track ────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionLabel label="What We Measure" />
          <h2 className="font-display font-black text-forest leading-tight tracking-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            Numbers that tell<br />
            <span className="italic text-ember">the real story.</span>
          </h2>
          <p className="text-forest/55 text-base leading-relaxed max-w-lg mb-16">
            Vanity metrics are easy to hit. We focus on the numbers that actually tell you whether your site is working.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {metrics.map((item, i) => (
              <FadeCard key={item.stat} delay={i * 0.08}>
                <div className="flex gap-6 p-7 rounded-2xl border border-forest/10 hover:border-ember/30 transition-colors duration-300">
                  <div className="w-1 rounded-full bg-ember flex-shrink-0 self-stretch" />
                  <div>
                    <h3 className="font-display font-bold text-forest text-xl mb-2">{item.stat}</h3>
                    <p className="text-forest/55 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deliverables ─────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-forest">
        <div className="max-w-7xl mx-auto">
          <SectionLabel label="What We Deliver" light />
          <h2 className="font-display font-black text-cream leading-tight tracking-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            Strategy you can<br />
            <span className="italic text-ember">actually act on.</span>
          </h2>
          <p className="text-cream/50 text-base leading-relaxed max-w-lg mb-16">
            No 40-page reports that sit unread. Everything we deliver is tied to a specific action your team can take.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {deliverables.map((item, i) => (
              <FadeCard key={item.title} delay={i * 0.07}>
                <div className="p-7 rounded-2xl border border-cream/[0.08] h-full hover:border-ember/30 transition-colors duration-300">
                  <h3 className="font-display font-bold text-cream text-lg mb-2">{item.title}</h3>
                  <p className="text-cream/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionLabel label="How We Work" />
          <h2 className="font-display font-black text-forest leading-tight tracking-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            Diagnose first.<br />
            <span className="italic text-ember">Then prescribe.</span>
          </h2>
          <p className="text-forest/55 text-base leading-relaxed max-w-lg mb-16">
            We never recommend changes without understanding why the current situation exists. Every insight earns its place.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {process.map((step, i) => (
              <FadeCard key={step.step} delay={i * 0.07}>
                <div className="p-7 rounded-2xl border border-forest/10 h-full hover:border-ember/30 transition-colors duration-300">
                  <span className="block font-display text-[3rem] font-black text-forest/[0.06] leading-none mb-4">{step.step}</span>
                  <h3 className="font-display font-bold text-forest text-xl mb-2">{step.title}</h3>
                  <p className="text-forest/55 text-sm leading-relaxed">{step.desc}</p>
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
    <motion.span ref={ref} className="block text-[0.67rem] tracking-[0.2em] uppercase font-semibold mb-4 text-ember" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
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
          Let's turn your site into<br />
          <span className="italic text-ember">a growth machine.</span>
        </motion.h2>
        <motion.p className="text-cream/50 text-base leading-relaxed mb-10" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.15 }}>
          Tell us your goals and your current numbers. We'll tell you honestly what we can do about them.
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
