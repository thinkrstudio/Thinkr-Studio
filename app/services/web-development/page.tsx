"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Footer from "@/components/sections/Footer";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const deliverables = [
  { title: "Landing Pages", desc: "High-converting single pages built for campaigns, products, or launches." },
  { title: "Full Web Apps", desc: "Complex, multi-page applications with authentication, dashboards, and dynamic data." },
  { title: "E-commerce Stores", desc: "Custom storefronts that sell — built with performance and conversion in mind." },
  { title: "Portfolio & Brochure Sites", desc: "Sites that showcase your work and turn visitors into inquiries." },
  { title: "Startup Websites", desc: "From zero to live in weeks. Built to scale as your company grows." },
  { title: "Redesigns", desc: "We take your existing site and rebuild it properly — faster, cleaner, more effective." },
];

const stack = [
  { name: "Next.js", desc: "Our primary framework. Fast by default, SEO-ready out of the box." },
  { name: "React", desc: "Component-driven UI that's maintainable and scalable long after launch." },
  { name: "TypeScript", desc: "Type-safe code that catches errors before they reach your users." },
  { name: "Tailwind CSS", desc: "Utility-first styling that keeps designs consistent and build times short." },
  { name: "Framer Motion", desc: "Production-grade animations that make your site feel alive." },
  { name: "Headless CMS", desc: "Sanity, Contentful, or similar — so your team can edit content without us." },
];

const process = [
  { step: "01", title: "Discover", desc: "We dig into your goals, audience, and competitors before writing a single line of code. Strategy first." },
  { step: "02", title: "Wireframe", desc: "Low-fidelity layouts map out the user flow and content hierarchy. We align here before investing in polish." },
  { step: "03", title: "Design", desc: "High-fidelity mockups in Figma. Every screen, every state, every interaction — reviewed and approved." },
  { step: "04", title: "Build", desc: "We build in Next.js with clean, documented code. No shortcuts, no spaghetti." },
  { step: "05", title: "Launch", desc: "We handle deployment, domain setup, performance audits, and cross-device testing." },
  { step: "06", title: "Optimise", desc: "Post-launch, we monitor metrics and make data-informed improvements." },
];

export default function WebDevelopmentPage() {
  const heroRef   = useRef<HTMLDivElement>(null);
  const bodyInView = useInView(heroRef, { once: true });

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-forest-dark overflow-hidden pt-36 pb-28 px-6 md:px-10 lg:px-16">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 left-1/3 w-[600px] h-[600px] rounded-full bg-ember/[0.08] blur-[140px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-cream/[0.025] blur-[100px]" />
        </div>

        <div ref={heroRef} className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={bodyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Link href="/#services" className="inline-flex items-center gap-2 text-cream/38 text-xs tracking-[0.15em] uppercase mb-8 hover:text-cream/60 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              All Services
            </Link>
          </motion.div>

          <motion.span
            className="block text-[0.67rem] tracking-[0.2em] uppercase text-ember font-semibold mb-4"
            initial={{ opacity: 0 }}
            animate={bodyInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Service — 01
          </motion.span>

          <motion.h1
            className="font-display font-black text-cream leading-[0.9] tracking-tight mb-7"
            style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
            initial={{ opacity: 0, y: 40 }}
            animate={bodyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            Websites that<br />
            <span className="italic text-ember">perform.</span>
          </motion.h1>

          <motion.p
            className="text-cream/55 text-lg leading-relaxed max-w-xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={bodyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          >
            We build fast, conversion-focused websites on Next.js. No templates. No page builders.
            Just purpose-built code that loads instantly and turns visitors into customers.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={bodyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ember text-cream font-semibold text-sm hover:bg-ember-dark transition-colors duration-200"
            >
              Start a project
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── What we build ────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionLabel label="What We Build" />
          <h2 className="font-display font-black text-forest leading-tight tracking-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            Every type of web project.<br />
            <span className="italic text-ember">Done properly.</span>
          </h2>
          <p className="text-forest/55 text-base leading-relaxed max-w-lg mb-16">
            Whether you need a single landing page or a full-featured web application, we approach every project with the same rigour.
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
            No surprises.<br />
            <span className="italic text-ember">Just results.</span>
          </h2>
          <p className="text-cream/50 text-base leading-relaxed max-w-lg mb-16">
            Our process is built around one thing: reducing risk. You'll always know where we are and what's next.
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

      {/* ── Tech stack ───────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionLabel label="Tech Stack" />
          <h2 className="font-display font-black text-forest leading-tight tracking-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            The tools behind<br />
            <span className="italic text-ember">the results.</span>
          </h2>
          <p className="text-forest/55 text-base leading-relaxed max-w-lg mb-16">
            We don't pick tools for hype. Every choice in our stack is justified by performance, maintainability, and long-term value for your business.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stack.map((item, i) => (
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

      {/* ── CTA ──────────────────────────────────────────────── */}
      <CtaSection />
      <Footer />
    </>
  );
}

function SectionLabel({ label, light }: { label: string; light?: boolean }) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.span
      ref={ref}
      className={`block text-[0.67rem] tracking-[0.2em] uppercase font-semibold mb-4 ${light ? "text-ember" : "text-ember"}`}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {label}
    </motion.span>
  );
}

function FadeCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function CtaSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-forest-dark">
      <div ref={ref} className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="font-display font-black text-cream leading-tight tracking-tight mb-5"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: EASE }}
        >
          Ready to build something<br />
          <span className="italic text-ember">worth visiting?</span>
        </motion.h2>
        <motion.p
          className="text-cream/50 text-base leading-relaxed mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Tell us about your project. We'll respond within 24 hours with honest thoughts — not a sales script.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-ember text-cream font-semibold text-sm hover:bg-ember-dark transition-colors duration-200"
          >
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
