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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} isLast={i === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Orange arrow badge that sits in the gap between two cards.
function FlowArrow({ className, rotate = 0 }: { className: string; rotate?: number }) {
  return (
    <span
      aria-hidden
      className={`absolute z-10 h-8 w-8 items-center justify-center rounded-full bg-ember text-white ring-4 ring-white ${className}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" style={{ transform: `rotate(${rotate}deg)` }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
      </svg>
    </span>
  );
}

// Arrows show the order: one row of four on desktop (→ → →); on smaller screens
// two per row, so the end of a row points diagonally down to the next one (→ ↙ →).
const RIGHT  = "top-1/2 -translate-y-1/2 -right-6 md:-right-[26px]";
const CORNER = "-left-6 -bottom-6 md:-left-[26px] md:-bottom-[26px]";

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
  const endOfRow = index % 2 === 1;

  return (
    <div className="relative">
      <motion.div
        ref={ref}
        className="group relative h-full p-4 md:p-7 border border-ink/10 rounded-2xl bg-white hover:border-ember/35 transition-colors duration-300 cursor-default overflow-hidden"
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-4 md:mb-7">
          <span className="font-display text-5xl md:text-[4.5rem] font-black leading-none text-ink/[0.07] group-hover:text-ember/12 transition-colors duration-300 select-none">
            {step.number}
          </span>
          <span className="text-[0.7rem] md:text-[0.65rem] text-ink/50 bg-ink/5 px-2 md:px-2.5 py-1 rounded-full mt-1 font-medium tracking-wide whitespace-nowrap">
            {step.duration}
          </span>
        </div>

        <h3 className="font-display text-base md:text-xl font-bold text-ink mb-2 md:mb-3 leading-tight">
          {step.title}
        </h3>
        <p className="text-ink/70 text-sm leading-snug md:leading-relaxed">
          {step.description}
        </p>

        {/* Accent underline */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-ember/55 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </motion.div>

      {!isLast && !endOfRow && <FlowArrow className={`flex ${RIGHT}`} />}
      {!isLast && endOfRow && (
        <>
          <FlowArrow className={`hidden lg:flex ${RIGHT}`} />
          <FlowArrow className={`flex lg:hidden ${CORNER}`} rotate={135} />
        </>
      )}
    </div>
  );
}
