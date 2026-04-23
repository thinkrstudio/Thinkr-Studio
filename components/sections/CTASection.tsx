"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-24 md:py-40 px-6 md:px-10 lg:px-16 bg-forest relative overflow-hidden">
      {/* Ambient orb */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-ember/5 blur-[200px] pointer-events-none"
      />

      {/* Rotating rings (decorative) */}
      <motion.div
        aria-hidden
        className="absolute top-1/2 right-20 -translate-y-1/2 w-72 h-72 rounded-full border border-cream/[0.05] hidden lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/2 right-20 -translate-y-1/2 w-52 h-52 rounded-full border border-ember/[0.09] hidden lg:block"
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.span
          className="block text-[0.68rem] tracking-[0.18em] uppercase text-ember font-semibold mb-5"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Start Your Project
        </motion.span>

        <motion.h2
          className="font-display font-black text-cream leading-[0.9] tracking-tight mb-8"
          style={{ fontSize: "clamp(3rem, 7.5vw, 7rem)" }}
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          Ready to build<br />
          <span className="italic text-ember">something great?</span>
        </motion.h2>

        <motion.p
          className="text-cream/55 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.24 }}
        >
          Tell us about your project. We'll get back within 24 hours with ideas, a proposed approach, and a transparent quote.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.34 }}
        >
          <Link
            href="mailto:hello@thinkrstudio.com"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-ember text-cream rounded-full font-semibold text-sm tracking-wide cursor-pointer transition-all duration-200 hover:bg-ember-dark hover:scale-[1.04] active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            hello@thinkrstudio.com
          </Link>
          <Link
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 border border-cream/18 text-cream rounded-full font-semibold text-sm tracking-wide cursor-pointer transition-all duration-200 hover:border-cream/45 hover:bg-cream/[0.06] active:scale-95"
          >
            Book a Discovery Call
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        <motion.p
          className="mt-10 text-cream/25 text-xs tracking-wide"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          No commitment. No pitch decks. Just a real conversation about what's possible.
        </motion.p>
      </div>
    </section>
  );
}
