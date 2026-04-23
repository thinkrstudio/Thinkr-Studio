"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const differentiators = [
  {
    title:       "No bloated timelines",
    description: "Brief to live in weeks, not months. We move fast without cutting corners.",
  },
  {
    title:       "One team, start to finish",
    description: "No handoffs between strategy, design, and dev. One team owns the whole thing.",
  },
  {
    title:       "Built to convert",
    description: "Every layout decision is tied to a business outcome. Beautiful AND effective.",
  },
  {
    title:       "Motion that earns its place",
    description: "Animation that guides attention and builds trust — not just there to look good.",
  },
  {
    title:       "Clean, scalable code",
    description: "Documented and extendable. No rewrites as your business grows.",
  },
  {
    title:       "Always measuring",
    description: "Every launch is wired with analytics. If it doesn't move numbers, we fix it.",
  },
];

export default function WhyUs() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-24 md:py-32 bg-forest relative overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-ember/6 blur-[160px] pointer-events-none"
      />

      <div className="px-6 md:px-10 lg:px-16 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="mb-14 md:mb-20">
          <motion.span
            className="block text-[0.68rem] tracking-[0.18em] uppercase text-ember font-semibold mb-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Why Thinkr
          </motion.span>
          <motion.h2
            className="font-display font-black text-cream leading-[0.92] tracking-tight"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            Not a vendor.<br />
            <span className="italic text-ember">A growth partner.</span>
          </motion.h2>
        </div>

        {/* Body: statement left, grid right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left */}
          <div className="space-y-7">
            <motion.p
              className="text-cream/70 text-lg md:text-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.22 }}
            >
              Most agencies hand you a deliverable and disappear. We stay in it — understanding your business model, your customers, and exactly where your brand is leaving money on the table, before we build a single thing.
            </motion.p>
            <motion.p
              className="text-cream/45 text-base leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.32 }}
            >
              Then we close the gap. With craft, motion, and precision that makes your brand impossible to ignore.
            </motion.p>

            <motion.blockquote
              className="pl-5 border-l-2 border-ember"
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.44 }}
            >
              <p className="font-display text-xl md:text-2xl font-bold italic text-cream/88 leading-snug">
                "We don't just make things look good. We make them work."
              </p>
            </motion.blockquote>
          </div>

          {/* Right — differentiators grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {differentiators.map((item, i) => (
              <motion.div
                key={item.title}
                className="p-5 border border-cream/10 rounded-xl hover:border-ember/35 hover:bg-cream/[0.04] transition-all duration-300 cursor-default"
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.12 + i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-ember mb-3" />
                <h4 className="text-cream font-semibold text-sm mb-1.5 leading-snug">
                  {item.title}
                </h4>
                <p className="text-cream/40 text-xs leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
