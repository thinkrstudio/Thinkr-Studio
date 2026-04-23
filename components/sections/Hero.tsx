"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePreloader } from "@/lib/preloader-context";
import HeroAnimation from "./HeroAnimation";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const headlineLines = [
  { text: "Design with", italic: false },
  { text: "purpose,",    italic: true  },
  { text: "build with",  italic: false },
  { text: "motion.",     italic: true  },
];

const stats = [
  { value: "10+",  label: "Projects delivered" },
  { value: "100%", label: "Client retention" },
  { value: "2 yr", label: "Crafting experiences" },
];

function useFadeUp(isLoaded: boolean, delay: number) {
  return {
    initial:    { opacity: 0, y: 28 },
    animate:    isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { duration: 0.8, delay, ease: EASE },
  } as const;
}

export default function Hero() {
  const containerRef         = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isLoaded }         = usePreloader();

  const { scrollYProgress } = useScroll({
    target:  containerRef,
    offset: ["start start", "end start"],
  });

  const y       = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden bg-cream"
    >
      {/* Ambient gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute -top-20 -left-40 w-[700px] h-[700px] rounded-full bg-ember/7 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-forest/5 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] rounded-full bg-cream-dark/60 blur-[70px]" />
      </div>

      {/* Decorative vertical rule */}
      <div className="absolute top-0 left-1/2 w-px h-28 bg-gradient-to-b from-transparent via-forest/15 to-transparent" aria-hidden />

      {/* Ghost year */}
      <motion.div
        aria-hidden
        className="absolute right-6 md:right-12 top-24 font-display font-black text-forest/[0.04] select-none leading-none pointer-events-none"
        style={{ fontSize: "clamp(6rem, 14vw, 12rem)" }}
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.6, delay: 1.0, ease: "easeOut" }}
      >
        2026
      </motion.div>

      {/* ── Main content with parallax ── */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-10 lg:px-16 pt-28 pb-24"
        style={{ y: prefersReducedMotion ? undefined : y, opacity }}
      >
        {/* Two-column: gap-0, left column carries its own right padding */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">

          {/* LEFT COLUMN — fills to centre, padding acts as the breathing room */}
          <div className="flex flex-col pr-0 lg:pr-12 xl:pr-16">
            {/* Badge */}
            <motion.div className="mb-6" {...useFadeUp(isLoaded, 0.05)}>
              <span className="inline-flex items-center gap-2.5 px-4 py-2 bg-forest/7 border border-forest/12 rounded-full text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-forest/60">
                <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse-dot" />
                Web Agency — Est. 2025
              </span>
            </motion.div>

            {/* Headline — larger clamp fills the column */}
            <div
              className="mb-7 font-display font-black text-forest leading-[0.88] tracking-[-0.03em]"
              style={{ fontSize: "clamp(3.2rem, 5.2vw, 6.4rem)" }}
              aria-label="Design with purpose, build with motion."
              role="heading"
              aria-level={1}
            >
              {headlineLines.map((line, i) => (
                <div key={line.text} className="overflow-hidden pb-[0.15em]">
                  <motion.span
                    className={`block ${line.italic ? "italic text-ember" : ""}`}
                    initial={{ y: "108%" }}
                    animate={isLoaded ? { y: "0%" } : { y: "108%" }}
                    transition={{ duration: 0.92, delay: 0.06 + i * 0.12, ease: EASE }}
                  >
                    {line.text}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* CTAs — anchored directly under headline */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 mb-7"
              {...useFadeUp(isLoaded, 0.54)}
            >
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-ember text-cream rounded-full text-sm font-semibold tracking-wide cursor-pointer transition-all duration-200 hover:bg-ember-dark hover:scale-[1.04] active:scale-95"
              >
                Start a Project
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-forest/25 text-forest rounded-full text-sm font-semibold tracking-wide cursor-pointer transition-all duration-200 hover:border-forest/60 hover:bg-forest/5 active:scale-95"
              >
                See Our Work
              </Link>
            </motion.div>

            {/* Description — no max-w cap so it stretches across the column */}
            <motion.p
              className="text-base text-forest/55 leading-relaxed mb-10 md:mb-14"
              {...useFadeUp(isLoaded, 0.64)}
            >
              We build brand-forward websites that turn first impressions into real business. Fast, focused, and built to work as hard as you do.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex items-center gap-8 md:gap-12"
              {...useFadeUp(isLoaded, 0.78)}
            >
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-display text-[2rem] md:text-[2.6rem] font-black text-forest leading-none tracking-tight">
                    {s.value}
                  </span>
                  <span className="text-[0.68rem] text-forest/40 mt-1 tracking-wide leading-snug max-w-[80px]">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Animation — dominant hero asset */}
          <div className="hidden lg:flex items-center justify-center">
            <HeroAnimation />
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-[0.6rem] tracking-[0.2em] uppercase text-forest/35 font-medium">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-forest/25 to-transparent"
          animate={{ scaleY: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
