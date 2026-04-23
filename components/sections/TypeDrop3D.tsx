"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const WORDS = [
  { text: "Think.", color: "#ffeed4", justify: "flex-start", enterDelay: 0.0,  exitDelay: 0.7  },
  { text: "Build.", color: "#c16934", justify: "center",     enterDelay: 0.75, exitDelay: 0.35 },
  { text: "Grow.",  color: "#ffeed4", justify: "flex-end",   enterDelay: 1.5,  exitDelay: 0.0  },
];

// Heavy, weighted ease — accelerates into the drop, decelerates on land
const FALL_EASE: [number, number, number, number] = [0.22, 0.0, 0.0, 1.0];
// Ease-in for the exit — accelerates upward and vanishes
const RISE_EASE: [number, number, number, number] = [0.4, 0.0, 1.0, 0.6];

export default function TypeDrop3D() {
  const ref    = useRef<HTMLDivElement>(null);
  // once: false so the animation resets every time the section leaves and re-enters view
  const inView = useInView(ref, { once: false, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="relative bg-forest overflow-hidden py-10 md:py-16 px-6 md:px-10 lg:px-16"
    >
      {/* Deep amber glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(193,105,52,0.12) 0%, transparent 70%)",
        }}
      />

      {/* 3D stage — tight perspective for dramatic foreshortening */}
      <div
        className="relative max-w-[1400px] mx-auto"
        style={{ perspective: "420px", perspectiveOrigin: "50% 50%", transformStyle: "preserve-3d" }}
      >
        {WORDS.map(({ text, color, justify, enterDelay, exitDelay }) => (
          <div key={text} className="flex overflow-visible" style={{ justifyContent: justify }}>
            <motion.span
              className="block font-display font-black tracking-[-0.04em] leading-[0.85]"
              style={{
                color,
                fontSize:           "clamp(6.5rem, 18vw, 17rem)",
                transformOrigin:    "center center",
                display:            "block",
                textShadow:         `0 30px 80px rgba(0,0,0,0.55), 0 6px 20px rgba(0,0,0,0.4)`,
                willChange:         "transform",
                backfaceVisibility: "hidden",
              }}
              initial={{ rotateX: -118, y: -220, opacity: 0, scale: 0.88 }}
              animate={
                inView
                  ? {
                      // keyframes: roll forward, slight overshoot, settle
                      rotateX: [-118, 8,  -3, 0],
                      y:       [-220, 18, -7, 0],
                      opacity: [0,    1,   1, 1],
                      scale:   [0.88, 1.03, 0.99, 1],
                    }
                  : { rotateX: -118, y: -220, opacity: 0, scale: 0.88 }
              }
              transition={
                inView
                  ? {
                      duration: 1.9,
                      delay:    enterDelay,
                      times:    [0, 0.62, 0.82, 1],
                      ease:     [FALL_EASE, [0.34, 1.3, 0.64, 1], [0.4, 0, 0.2, 1]],
                      opacity:  { duration: 0.18, delay: enterDelay, ease: "linear" },
                    }
                  : {
                      duration: 0.65,
                      delay:    exitDelay,
                      ease:     RISE_EASE,
                      opacity:  { duration: 0.25, delay: exitDelay, ease: "linear" },
                    }
              }
            >
              {text}
            </motion.span>
          </div>
        ))}

        {/* Label — appears after everything settles, fades out immediately on exit */}
        <motion.div
          className="mt-8 md:mt-12 flex items-center gap-5"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={
            inView
              ? { duration: 0.8, delay: 3.1 }
              : { duration: 0.25, delay: 0 }
          }
        >
          <div className="flex-1 h-px bg-cream/10" />
          <span className="text-[0.62rem] tracking-[0.22em] uppercase text-ember/70 font-semibold whitespace-nowrap">
            Thinkr Studio — Est. 2025
          </span>
          <div className="flex-1 h-px bg-cream/10" />
        </motion.div>
      </div>
    </section>
  );
}
