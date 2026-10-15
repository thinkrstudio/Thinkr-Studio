"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const testimonials = [
  {
    quote:   "Thinkr didn't just deliver a website — they gave us an asset that actively converts. Our organic leads doubled in 3 months post-launch. Their thinking is genuinely different from any agency we've worked with.",
    author:  "Mustafa Daiyan",
    role:    "Founder & CEO",
    company: "Space Perfumes",
  },
  {
    quote:   "I've worked with a dozen agencies. Thinkr is the only one that understood our brand better than we did after the discovery phase. The final result was beyond what we imagined was possible.",
    author:  "Kamrul Islam Khan",
    role:    "Head of Marketing",
    company: "Khan's Authentic HVAC Systems",
  },
  {
    quote:   "The animations alone set us apart from every competitor at our next investor pitch. They kept asking about our website. Thinkr made our brand feel like a billion-dollar company.",
    author:  "Umid",
    role:    "Co-Founder",
    company: "Forever",
  },
  {
    quote:   "Reliable and thoughtful.",
    author:  "Kevin Yoo",
    role:    "Owner",
    company: "Waterline Voice",
  },
];

export default function Testimonials() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  const count = testimonials.length;
  const go    = (step: number) => setActive((i) => (i + step + count) % count);
  const t     = testimonials[active];

  // One big quote at a time, with a counter and arrows to move between clients.
  return (
    <section id="testimonials" className="bg-white text-ink px-6 md:px-10 lg:px-16 py-24 md:py-32">
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <h2
          className="font-display font-bold md:font-normal uppercase leading-[0.95] md:leading-[0.9] tracking-[-0.02em] md:tracking-[-0.035em] mb-12 md:mb-20"
          style={{ fontSize: "clamp(2rem, 5.6vw, 5.25rem)" }}
        >
          What Clients Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.55fr)_minmax(0,2fr)] gap-8 md:gap-12">
          <div>
            <svg aria-hidden className="w-14 md:w-20 text-ink/15" viewBox="0 0 50 36" fill="currentColor">
              <path d="M0 36V22.5C0 14.1 5.4 7.2 16.2 1.8L19.8 6.6C15 9 12 12.6 10.8 17.4H18V36H0ZM30 36V22.5C30 14.1 35.4 7.2 46.2 1.8L49.8 6.6C45 9 42 12.6 40.8 17.4H48V36H30Z" />
            </svg>
          </div>

          <div>
            <div className="min-h-[13rem] md:min-h-[15rem]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={active}
                  className="font-display font-normal leading-[1.25] tracking-[-0.01em]"
                  style={{ fontSize: "clamp(1.45rem, 2.6vw, 2.35rem)" }}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  &ldquo;{t.quote}&rdquo;
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 border-t border-ink/12 pt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm md:text-xs font-semibold uppercase tracking-[0.08em]">{t.author}</p>
                  <p className="mt-1 text-sm md:text-xs text-ink/55">{t.role}, {t.company}</p>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center gap-5">
                <span className="text-sm md:text-xs tabular-nums text-ink/55">
                  {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                </span>
                <div className="flex gap-2">
                  {[
                    { step: -1, label: "Previous testimonial", d: "M15 6l-6 6 6 6" },
                    { step:  1, label: "Next testimonial",     d: "M9 6l6 6-6 6" },
                  ].map((b) => (
                    <button
                      key={b.step}
                      type="button"
                      onClick={() => go(b.step)}
                      aria-label={b.label}
                      className="w-11 h-11 rounded-full border border-ink/20 flex items-center justify-center cursor-pointer transition-colors duration-200 hover:border-ember hover:bg-ember hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={b.d} />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
