"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number:      "01",
    title:       "Discover",
    description: "A focused conversation about your goals, your users, and what success actually looks like. Clarity before a single pixel gets drawn.",
    duration:    "1–2 wks",
  },
  {
    number:      "02",
    title:       "Design",
    description: "Strategy becomes visual. Brand systems, page layouts, and a motion language you'll approve before we write a line of code.",
    duration:    "2–3 wks",
  },
  {
    number:      "03",
    title:       "Develop",
    description: "Clean, performant code engineered for delight and built to scale. No technical debt, no shortcuts — just work that lasts.",
    duration:    "3–5 wks",
  },
  {
    number:      "04",
    title:       "Deliver",
    description: "We launch, then we watch. Post-launch analytics and structured updates mean your site keeps improving long after go-live.",
    duration:    "Ongoing",
  },
];

export default function Process() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="process" className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="flex flex-col md:flex-row md:items-end gap-6 mb-14 md:mb-20">
          <div>
            <motion.span
              className="block text-sm md:text-[0.68rem] tracking-[0.18em] uppercase text-ink/60 font-semibold mb-3"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              How We Work
            </motion.span>
            <motion.h2
              className="font-display font-bold md:font-normal uppercase text-ink leading-[0.95] md:leading-[0.9] tracking-[-0.02em] md:tracking-[-0.035em]"
              style={{ fontSize: "clamp(2rem, 5.6vw, 5.25rem)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              Brief to live<br />
              in weeks.
            </motion.h2>
          </div>
          <motion.p
            className="text-ink/70 text-lg md:text-base leading-snug md:leading-relaxed max-w-[260px] md:mb-1"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
          >
            No bloated timelines. No six-month waits. Just clear phases and real delivery.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} isLast={i === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[number];
  index: number;
  isLast: boolean;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="group relative p-7 border border-ink/10 rounded-2xl bg-white hover:border-ember/35 transition-colors duration-300 cursor-default overflow-hidden"
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      {/* Connector (desktop only) */}
      {!isLast && (
        <div
          aria-hidden
          className="hidden lg:block absolute top-10 -right-2.5 w-5 h-px bg-ink/12 z-10"
        />
      )}

      {/* Top row */}
      <div className="flex items-start justify-between mb-7">
        <span className="font-display text-[4.5rem] font-black leading-none text-ink/[0.07] group-hover:text-ember/12 transition-colors duration-300 select-none">
          {step.number}
        </span>
        <span className="text-xs md:text-[0.65rem] text-ink/50 bg-ink/5 px-2.5 py-1 rounded-full mt-1 font-medium tracking-wide">
          {step.duration}
        </span>
      </div>

      <h3 className="font-display text-xl font-bold text-ink mb-3 leading-tight">
        {step.title}
      </h3>
      <p className="text-ink/70 text-lg md:text-sm leading-snug md:leading-relaxed">
        {step.description}
      </p>

      {/* Accent underline */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-ember/55 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  );
}
