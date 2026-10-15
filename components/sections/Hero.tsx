"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePreloader } from "@/lib/preloader-context";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Editorial statement — each line slides up from its own mask after the preloader.
const LINES = ["We design & build", "brand-forward websites", "that grow businesses"];

export default function Hero() {
  const { isLoaded } = usePreloader();

  const fadeUp = (delay: number) => ({
    initial:    { opacity: 0, y: 16 },
    animate:    isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section id="home" className="relative bg-white px-6 md:px-10 lg:px-16 pt-36 md:pt-44 pb-10 md:pb-14">
      <div className="max-w-7xl mx-auto">
        <h1
          className="font-display font-normal uppercase text-ink leading-[0.86] tracking-[-0.035em]"
          style={{ fontSize: "clamp(2.4rem, 6.4vw, 6rem)" }}
        >
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={isLoaded ? { y: "0%" } : { y: "105%" }}
                transition={{ duration: 0.95, delay: 0.05 + i * 0.1, ease: EASE }}
              >
                {line}
                {i === LINES.length - 1 && <span className="text-ember">.</span>}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <motion.p
            className="text-sm md:text-xs font-medium uppercase leading-[1.3] text-ink/70"
            {...fadeUp(0.45)}
          >
            Designed to engage
            <br />
            Built to perform
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-3" {...fadeUp(0.55)}>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-ember text-white rounded-full text-sm font-semibold tracking-wide cursor-pointer transition-all duration-200 hover:bg-ember-dark hover:scale-[1.04] active:scale-95"
            >
              Start a Project
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="#work"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-ink/25 text-ink rounded-full text-sm font-semibold tracking-wide cursor-pointer transition-all duration-200 hover:border-ink/60 hover:bg-ink/5 active:scale-95"
            >
              See Our Work
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
