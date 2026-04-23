"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePreloader } from "@/lib/preloader-context";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const LETTERS  = ["T", "H", "I", "N", "K", "R"] as const;
const EXIT_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

// Timing (ms)
const STAGGER_MS   = 100;                                             // between each letter
const SPRING_MS    = 650;                                             // approx spring settle time
const LAST_DONE_MS = (LETTERS.length - 1) * STAGGER_MS + SPRING_MS; // 1150 ms
const T_DOT        = LAST_DONE_MS + 150;                             // 1300 ms — dot fires
const T_EXIT       = T_DOT + 700;                                    // 2000 ms — curtain splits
const EXIT_DUR_MS  = 840;
const T_UNMOUNT    = T_EXIT + EXIT_DUR_MS + 60;                      // 2900 ms — unmount

type Phase = "entering" | "pulsing" | "exiting";

// ─────────────────────────────────────────────────────────────────────────────
// ThinkrWord — letters + dot
//
// This sub-component is intentionally rendered TWICE: once inside the top
// panel and once inside the bottom panel.  Both instances mount in the same
// React render cycle, so their Framer Motion delays are calculated from the
// same frame — the animations are pixel-perfect in sync, giving the illusion
// of one seamless word that splits at the curtain seam.
// ─────────────────────────────────────────────────────────────────────────────
function ThinkrWord({ phase }: { phase: Phase }) {
  return (
    <div
      className="flex items-baseline justify-center"
      // perspective applied to the group so all letters share the same 3-D space
      style={{ perspective: "800px", perspectiveOrigin: "50% 50%" }}
    >
      {LETTERS.map((letter, i) => (
        <motion.span
          key={i}
          className="font-display font-black text-cream select-none"
          style={{
            fontSize:           "clamp(4.5rem, 13vw, 12rem)",
            lineHeight:         1,
            letterSpacing:      "-0.04em",
            transformOrigin:    "center top",
            willChange:         "transform",
            backfaceVisibility: "hidden",
          }}
          // each letter "drops in" with a weighted 3-D flip — same physics as TypeDrop3D
          initial={{ rotateX: -110, y: -60, opacity: 0 }}
          animate={{ rotateX: 0, y: 0, opacity: 1 }}
          transition={{
            // spring gives a natural thud on landing with a slight overshoot
            type:      "spring",
            stiffness: 280,
            damping:   21,
            delay:     (i * STAGGER_MS) / 1000,
            opacity: {
              type:     "tween",
              duration: 0.14,
              delay:    (i * STAGGER_MS) / 1000,
              ease:     "linear",
            },
          }}
        >
          {letter}
        </motion.span>
      ))}

      {/* Amber dot — appears only after all letters have settled */}
      <motion.span
        className="font-display font-black select-none"
        style={{
          fontSize:   "clamp(4.5rem, 13vw, 12rem)",
          lineHeight: 1,
          color:      "#c16934", // ember
        }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={
          phase === "pulsing"
            ? {
                // bloom in, slight pull-back, settle
                opacity: [0, 1, 0.6, 1],
                scale:   [0.4, 1.28, 0.93, 1],
              }
            : phase === "exiting"
            ? { opacity: 1, scale: 1 }   // hold visible while panels slide
            : { opacity: 0, scale: 0.4 } // hidden during letter drop
        }
        transition={{
          duration: 0.54,
          ease:     "easeOut",
          times:    phase === "pulsing" ? [0, 0.35, 0.70, 1] : undefined,
        }}
      >
        .
      </motion.span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Preloader
// ─────────────────────────────────────────────────────────────────────────────
export default function Preloader() {
  const [phase,     setPhase]     = useState<Phase>("entering");
  const [isMounted, setIsMounted] = useState(true);
  const { setLoaded }             = usePreloader();
  const prefersReducedMotion      = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setLoaded();
      setIsMounted(false);
      return;
    }

    // 1. All letters landed → show dot
    const t1 = setTimeout(() => setPhase("pulsing"), T_DOT);

    // 2. Dot pulsed → split the curtain; hero starts animating underneath
    const t2 = setTimeout(() => {
      setLoaded();
      setPhase("exiting");
    }, T_EXIT);

    // 3. Curtain fully gone → unmount
    const t3 = setTimeout(() => setIsMounted(false), T_UNMOUNT);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [setLoaded, prefersReducedMotion]);

  if (!isMounted) return null;

  // ── Split-panel layout ────────────────────────────────────────────────────
  //
  // The screen is divided into two panels (top 50 vh / bottom 50 vh).
  // Each panel has `overflow: hidden`, which acts as a clip-mask.
  //
  // Inside each panel the ThinkrWord is anchored at the edge that faces the
  // centre seam (the split line at 50 vh from the top of the viewport):
  //
  //   top panel    → text container: `top: 100%`  (= panel's bottom edge = 50 vh)
  //   bottom panel → text container: `top: 0%`    (= panel's top  edge  = 50 vh)
  //
  // `transform: translateY(-50%)` then centres the word block on that edge.
  // The result: both panels display the same word centred on the split line,
  // each showing only its own half — a seamless continuous word.
  //
  // On exit the top panel travels to y = -100% and the bottom to y = +100%,
  // splitting the screen like a theatre curtain.

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none">
      {(["top", "bottom"] as const).map((half) => (
        <motion.div
          key={half}
          className="absolute inset-x-0 bg-forest overflow-hidden"
          style={
            half === "top"
              ? { top: 0,    height: "50vh" }
              : { bottom: 0, height: "50vh" }
          }
          initial={{ y: "0%" }}
          animate={
            phase === "exiting"
              ? { y: half === "top" ? "-100%" : "100%" }
              : { y: "0%" }
          }
          transition={{ duration: EXIT_DUR_MS / 1000, ease: EXIT_EASE }}
        >
          {/* Text anchored at the seam between the two panels */}
          <div
            className="absolute inset-x-0 flex justify-center px-6"
            style={{
              top:       half === "top" ? "100%" : "0%",
              transform: "translateY(-50%)",
            }}
          >
            <ThinkrWord phase={phase} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
