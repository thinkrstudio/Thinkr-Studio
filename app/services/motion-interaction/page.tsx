"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Footer from "@/components/sections/Footer";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const deliverables = [
  { title: "Scroll Animations", desc: "Elements that reveal, transform, and respond as users move through your content — guiding attention naturally." },
  { title: "Page Transitions", desc: "Seamless navigation between pages that feels like a native app, not a document." },
  { title: "Micro-interactions", desc: "Hover states, button feedback, form responses. The small moments that add up to a polished product." },
  { title: "Loading & Skeleton States", desc: "Animated states that reduce perceived wait time and keep users engaged while content loads." },
  { title: "3D Experiences", desc: "Three.js or Spline-powered 3D elements that make a product demo or hero section impossible to ignore." },
  { title: "Animated Data Visualisation", desc: "Charts and diagrams that come alive — turning complex data into something worth watching." },
];

const principles = [
  {
    title: "Motion should have a job.",
    desc: "Every animation we build has a purpose: direct attention, communicate hierarchy, confirm an action, or signal a state change. If it doesn't do one of these things, we cut it.",
  },
  {
    title: "Performance is non-negotiable.",
    desc: "A beautiful animation that tanks your Lighthouse score is a net negative. We build on the GPU compositor layer, avoid layout thrashing, and test on real devices.",
  },
  {
    title: "Subtlety is craft.",
    desc: "The best motion design is the kind users feel but don't consciously notice. Restraint takes more skill than spectacle — and it serves users better.",
  },
];

const tools = [
  { name: "Framer Motion", desc: "Our primary animation library for React. Declarative, powerful, and battle-tested in production." },
  { name: "GSAP", desc: "For complex timeline-based sequences and scroll-driven animations that need fine-grained control." },
  { name: "Three.js", desc: "WebGL-powered 3D graphics in the browser. Used for hero experiences and product showcases." },
  { name: "Lottie", desc: "JSON-based vector animations from After Effects. Lightweight, scalable, and perfect for UI illustrations." },
  { name: "CSS Animations", desc: "For simple, performance-critical effects. When CSS can do the job, we don't add a library." },
  { name: "Spline", desc: "No-code 3D scene integration for interactive backgrounds and decorative 3D elements." },
];

export default function MotionInteractionPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-forest-dark overflow-hidden pt-36 pb-28 px-6 md:px-10 lg:px-16">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-ember/[0.07] blur-[130px]" />
          <div className="absolute bottom-10 right-10 w-[350px] h-[350px] rounded-full bg-cream/[0.025] blur-[100px]" />
          <motion.div
            className="absolute top-1/2 right-16 -translate-y-1/2 w-64 h-64 rounded-full border border-cream/[0.04] hidden lg:block"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 right-16 -translate-y-1/2 w-40 h-40 rounded-full border border-ember/[0.08] hidden lg:block"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
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
            Service — 03
          </motion.span>

          <motion.h1
            className="font-display font-black text-cream leading-[0.9] tracking-tight mb-7"
            style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            Animation that<br />
            <span className="italic text-ember">earns its place.</span>
          </motion.h1>

          <motion.p
            className="text-cream/55 text-lg leading-relaxed max-w-xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          >
            Motion isn't decoration. Done right, it guides attention, confirms actions, and builds trust.
            We treat every animation as a deliberate design decision — not a finishing touch.
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

      {/* ── Philosophy ───────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionLabel label="Our Philosophy" />
          <h2 className="font-display font-black text-forest leading-tight tracking-tight mb-16" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            Purposeful motion.<br />
            <span className="italic text-ember">Always.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <FadeCard key={p.title} delay={i * 0.1}>
                <div className="p-8 rounded-2xl border border-forest/10 h-full hover:border-ember/30 transition-colors duration-300">
                  <div className="w-8 h-[2px] bg-ember mb-6" />
                  <h3 className="font-display font-bold text-forest text-xl leading-snug mb-4">{p.title}</h3>
                  <p className="text-forest/55 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </FadeCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deliverables ─────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-forest">
        <div className="max-w-7xl mx-auto">
          <SectionLabel label="What We Create" light />
          <h2 className="font-display font-black text-cream leading-tight tracking-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            From subtle polish<br />
            <span className="italic text-ember">to full spectacle.</span>
          </h2>
          <p className="text-cream/50 text-base leading-relaxed max-w-lg mb-16">
            We work across the full spectrum of motion — from a well-timed button hover to a hero section that stops scrolling.
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

      {/* ── Tools ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionLabel label="Tools & Libraries" />
          <h2 className="font-display font-black text-forest leading-tight tracking-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            The right tool<br />
            <span className="italic text-ember">for every motion.</span>
          </h2>
          <p className="text-forest/55 text-base leading-relaxed max-w-lg mb-16">
            We choose our animation tools based on the specific requirements of each project — performance, complexity, and maintainability all factor in.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((item, i) => (
              <FadeCard key={item.name} delay={i * 0.06}>
                <div className="flex gap-4 p-6 rounded-xl border border-forest/10 hover:border-ember/30 transition-colors duration-300">
                  <div className="w-2 h-2 rounded-full bg-ember mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-forest text-sm mb-1">{item.name}</h3>
                    <p className="text-forest/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
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
          Ready to bring your site<br />
          <span className="italic text-ember">to life?</span>
        </motion.h2>
        <motion.p className="text-cream/50 text-base leading-relaxed mb-10" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.15 }}>
          Show us what you're building. We'll show you how motion can elevate it.
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
