"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote:   "Thinkr didn't just deliver a website — they gave us an asset that actively converts. Our organic leads doubled in 3 months post-launch. Their thinking is genuinely different from any agency we've worked with.",
    author:  "Mustafa Daiyan",
    role:    "Founder & CEO",
    company: "Space Perfumes",
    initials:"MD",
  },
  {
    quote:   "I've worked with a dozen agencies. Thinkr is the only one that understood our brand better than we did after the discovery phase. The final result was beyond what we imagined was possible.",
    author:  "Kamrul Islam Khan",
    role:    "Head of Marketing",
    company: "Khan's Authentic HVAC Systems",
    initials:"KK",
  },
  {
    quote:   "The animations alone set us apart from every competitor at our next investor pitch. They kept asking about our website. Thinkr made our brand feel like a billion-dollar company.",
    author:  "Umid Khan",
    role:    "Co-Founder",
    company: "Forever",
    initials:"UK",
  },
];

export default function Testimonials() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-cream-dark overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="mb-14 md:mb-18">
          <motion.span
            className="block text-[0.68rem] tracking-[0.18em] uppercase text-ember font-semibold mb-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Client Stories
          </motion.span>
          <motion.h2
            className="font-display font-black text-forest leading-[0.92] tracking-tight"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            Clients who<br />
            <span className="italic text-ember">trusted us.</span>
          </motion.h2>
        </div>

        {/* Main testimonial area */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-14 items-start">
          {/* Quote */}
          <div>
            {/* Large quotation mark */}
            <svg
              aria-hidden
              className="w-10 h-8 text-ember/35 mb-6"
              viewBox="0 0 48 36"
              fill="currentColor"
            >
              <path d="M0 36V22.5C0 14.1 5.4 7.2 16.2 1.8L19.8 6.6C15 9 12 12.6 10.8 17.4H18V36H0ZM30 36V22.5C30 14.1 35.4 7.2 46.2 1.8L49.8 6.6C45 9 42 12.6 40.8 17.4H48V36H30Z" />
            </svg>

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={`quote-${active}`}
                className="font-display text-[1.45rem] md:text-[1.7rem] font-semibold text-forest leading-[1.25] tracking-tight mb-8"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                "{testimonials[active].quote}"
              </motion.blockquote>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`author-${active}`}
                className="flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-11 h-11 rounded-full bg-forest flex items-center justify-center text-cream text-xs font-bold flex-shrink-0">
                  {testimonials[active].initials}
                </div>
                <div>
                  <p className="font-semibold text-forest text-sm leading-snug">
                    {testimonials[active].author}
                  </p>
                  <p className="text-forest/45 text-xs mt-0.5">
                    {testimonials[active].role} · {testimonials[active].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation cards */}
          <div className="flex flex-row lg:flex-col gap-3">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`p-4 rounded-xl border text-left flex-1 lg:flex-none transition-all duration-200 cursor-pointer ${
                  active === i
                    ? "border-ember bg-ember/8 shadow-sm"
                    : "border-forest/10 hover:border-forest/25"
                }`}
              >
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="w-7 h-7 rounded-full bg-forest flex items-center justify-center text-cream text-[0.6rem] font-bold flex-shrink-0">
                    {t.initials}
                  </div>
                  <p className="text-xs font-semibold text-forest truncate leading-tight">
                    {t.author}
                  </p>
                </div>
                <p className="text-forest/38 text-[0.68rem] truncate pl-9">
                  {t.company}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
