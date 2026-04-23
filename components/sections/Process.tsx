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
    <section id="process" className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="flex flex-col md:flex-row md:items-end gap-6 mb-14 md:mb-20">
          <div>
            <motion.span
              className="block text-[0.68rem] tracking-[0.18em] uppercase text-ember font-semibold mb-3"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              How We Work
            </motion.span>
            <motion.h2
              className="font-display font-black text-forest leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              Brief to live<br />
              <span className="italic text-ember">in weeks.</span>
            </motion.h2>
          </div>
          <motion.p
            className="text-forest/55 text-sm md:text-base leading-relaxed max-w-[240px] md:mb-1"
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
      className="group relative p-7 border border-forest/10 rounded-2xl bg-cream hover:border-ember/35 transition-colors duration-300 cursor-default overflow-hidden"
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      {/* Connector (desktop only) */}
      {!isLast && (
        <div
          aria-hidden
          className="hidden lg:block absolute top-10 -right-2.5 w-5 h-px bg-forest/12 z-10"
        />
      )}

      {/* Top row */}
      <div className="flex items-start justify-between mb-7">
        <span className="font-display text-[4.5rem] font-black leading-none text-forest/[0.07] group-hover:text-ember/12 transition-colors duration-300 select-none">
          {step.number}
        </span>
        <span className="text-[0.65rem] text-forest/38 bg-forest/5 px-2.5 py-1 rounded-full mt-1 font-medium tracking-wide">
          {step.duration}
        </span>
      </div>

      <h3 className="font-display text-xl font-bold text-forest mb-3 leading-tight">
        {step.title}
      </h3>
      <p className="text-forest/55 text-sm leading-relaxed">
        {step.description}
      </p>

      {/* Accent underline */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-ember/55 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  );
}
