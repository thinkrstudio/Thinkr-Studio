"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { usePreloader } from "@/lib/preloader-context";

// ─────────────────────────────────────────────────────────────────────────────
// Types & Constants
// ─────────────────────────────────────────────────────────────────────────────
type Phase = 0 | 1 | 2 | 3 | 4;
// 0 = reset · 1 = wireframe · 2 = structure · 3 = design · 4 = motion

const FOREST = "#384531";
const EMBER  = "#c16934";
const CREAM  = "#ffeed4";

const SNAP:  [number, number, number, number] = [0.32, 0.00, 0.15, 1.00];
const ENTER: [number, number, number, number] = [0.22, 1.00, 0.36, 1.00];

// Phase cycle timings (ms from cycle start)
const PHASE_TIMES = [600, 2000, 3400, 4800];
const CYCLE_MS    = 10500;

const PHASE_META: Record<Exclude<Phase, 0>, { label: string; desc: string }> = {
  1: { label: "Wireframe", desc: "Rough layout skeleton" },
  2: { label: "Structure", desc: "Defined layout blueprint" },
  3: { label: "Design",    desc: "Brand colors & polish"  },
  4: { label: "Motion",    desc: "Interactions live"      },
};

// ─────────────────────────────────────────────────────────────────────────────
// Style helpers — dramatically different per phase
// ─────────────────────────────────────────────────────────────────────────────

/** Filled block: ghost sketch → bold outline → solid brand color */
function fill(p: Phase, designBg: string, opacity = 1): React.CSSProperties {
  if (p >= 3) {
    return {
      backgroundColor: designBg,
      opacity,
      boxShadow: "none",
      transition: "background-color 0.65s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s ease, opacity 0.5s ease",
    };
  }
  if (p === 2) {
    // Structure: strong, crisp dark outlines — blueprint mode
    return {
      backgroundColor: "rgba(56,69,49,0.04)",
      opacity,
      boxShadow: "inset 0 0 0 1.5px rgba(56,69,49,0.55)",
      transition: "background-color 0.4s ease, box-shadow 0.4s ease, opacity 0.5s ease",
    };
  }
  if (p === 1) {
    // Wireframe: barely-there sketch outlines
    return {
      backgroundColor: "transparent",
      opacity,
      boxShadow: "inset 0 0 0 1px rgba(56,69,49,0.15)",
      transition: "background-color 0.4s ease, box-shadow 0.4s ease, opacity 0.5s ease",
    };
  }
  return { backgroundColor: "transparent", opacity: 0 };
}

/** Ghost outline block: never fills with solid color */
function outline(p: Phase): React.CSSProperties {
  if (p >= 3) {
    return {
      backgroundColor: "transparent",
      boxShadow: "inset 0 0 0 1.5px rgba(56,69,49,0.30)",
      transition: "box-shadow 0.4s ease",
    };
  }
  if (p === 2) {
    return {
      backgroundColor: "transparent",
      boxShadow: "inset 0 0 0 1.5px rgba(56,69,49,0.45)",
      transition: "box-shadow 0.4s ease",
    };
  }
  return {
    backgroundColor: "transparent",
    boxShadow: "inset 0 0 0 1px rgba(56,69,49,0.12)",
    transition: "box-shadow 0.4s ease",
  };
}

/** Entry animation for each element */
function entry(p: Phase, delay: number) {
  return {
    initial:    { opacity: 0, y: 10 },
    animate:    { opacity: p >= 1 ? 1 : 0, y: p >= 1 ? 0 : 10 },
    transition: { duration: 0.42, delay, ease: SNAP },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// HeroAnimation
// ─────────────────────────────────────────────────────────────────────────────
export default function HeroAnimation() {
  const { isLoaded }         = usePreloader();
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase]    = useState<Phase>(0);
  const wrapRef              = useRef<HTMLDivElement>(null);

  // ── Cursor tilt parallax ─────────────────────────────────────────────────
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 40, damping: 15 });
  const sy = useSpring(my, { stiffness: 40, damping: 15 });
  const rotX = useTransform(sy, [0, 1], [4, -4]);
  const rotY = useTransform(sx, [0, 1], [-6, 6]);

  // ── Looping phase sequencer ───────────────────────────────────────────────
  useEffect(() => {
    if (!isLoaded) return;
    if (prefersReducedMotion) { setPhase(3); return; }

    const timers: ReturnType<typeof setTimeout>[] = [];

    const runCycle = () => {
      timers.forEach(clearTimeout);
      timers.length = 0;
      setPhase(0);
      PHASE_TIMES.forEach((ms, i) => {
        timers.push(setTimeout(() => setPhase((i + 1) as Phase), ms));
      });
      timers.push(setTimeout(runCycle, CYCLE_MS));
    };

    runCycle();
    return () => timers.forEach(clearTimeout);
  }, [isLoaded, prefersReducedMotion]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top)  / r.height);
  };

  const p = phase;

  // ── Dynamic browser-card shadow — grows with fidelity ─────────────────────
  const cardShadow =
    p >= 3
      ? "0 48px 100px rgba(56,69,49,0.20), 0 16px 36px rgba(56,69,49,0.12), 0 0 0 1px rgba(56,69,49,0.07)"
      : p >= 2
      ? "0 24px 56px rgba(56,69,49,0.11), 0 0 0 1px rgba(56,69,49,0.10)"
      : "0 8px 24px rgba(56,69,49,0.06), 0 0 0 1px rgba(56,69,49,0.06)";

  // ── Content-area background ───────────────────────────────────────────────
  // Phase 1: pale ghost   Phase 2: blueprint dot-grid   Phase 3-4: warm cream
  const contentBg = p >= 3
    ? CREAM
    : p === 2
    ? "rgba(220,230,240,0.25)"  // cool blueprint tint
    : "rgba(255,238,212,0.18)"; // barely-there sketch wash

  const contentBgImage =
    p === 2
      ? "radial-gradient(circle, rgba(56,69,49,0.13) 1px, transparent 1px)"
      : "none";

  return (
    <div
      ref={wrapRef}
      className="relative w-full flex flex-col items-center"
      style={{ perspective: "1000px", maxWidth: 560 }}
      onMouseMove={onMove}
      onMouseLeave={() => { mx.set(0.5); my.set(0.5); }}
    >
      {/* Ambient glow — only visible in design+ */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          opacity: p >= 3 ? 1 : 0,
          background:
            "radial-gradient(ellipse 90% 70% at 55% 40%, rgba(193,105,52,0.10) 0%, transparent 65%)",
        }}
      />

      {/* ── Browser Shell ──────────────────────────────────────────────────── */}
      <motion.div
        className="relative w-full"
        style={{
          rotateX:        prefersReducedMotion ? 0 : rotX,
          rotateY:        prefersReducedMotion ? 0 : rotY,
          transformStyle: "preserve-3d",
          willChange:     "transform",
          borderRadius:   14,
          overflow:       "hidden",
          boxShadow:      cardShadow,
          transition:     "box-shadow 0.8s ease",
        }}
        initial={{ opacity: 0, y: 40, scale: 0.93 }}
        animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={{ duration: 1.0, delay: 0.25, ease: ENTER }}
      >
        {/* Browser chrome */}
        <div
          style={{
            height:          38,
            display:         "flex",
            alignItems:      "center",
            paddingInline:   14,
            gap:             7,
            backgroundColor:
              p >= 3
                ? "#2a3324"          // design: dark forest
                : p === 2
                ? "rgba(56,69,49,0.12)"  // structure: visible tint
                : "rgba(56,69,49,0.04)", // wireframe: ghost
            borderBottom: `1px solid ${
              p >= 3
                ? "rgba(255,238,212,0.07)"
                : p === 2
                ? "rgba(56,69,49,0.20)"
                : "rgba(56,69,49,0.07)"
            }`,
            transition: "background-color 0.6s ease, border-color 0.5s ease",
          }}
        >
          {/* Traffic lights */}
          {(["#ff5f57", "#febc2e", "#28c840"] as const).map((c, i) => (
            <div
              key={i}
              style={{
                width:           9,
                height:          9,
                borderRadius:    "50%",
                backgroundColor:
                  p >= 3
                    ? c
                    : p === 2
                    ? "rgba(56,69,49,0.28)"
                    : "rgba(56,69,49,0.10)",
                transition: "background-color 0.5s ease",
              }}
            />
          ))}
          {/* URL bar */}
          <div
            style={{
              flex:            1,
              marginInline:    8,
              height:          18,
              borderRadius:    9,
              backgroundColor:
                p >= 3
                  ? "rgba(255,238,212,0.06)"
                  : p === 2
                  ? "rgba(56,69,49,0.08)"
                  : "rgba(56,69,49,0.04)",
              border: `1px solid ${
                p >= 3
                  ? "rgba(255,238,212,0.06)"
                  : p === 2
                  ? "rgba(56,69,49,0.14)"
                  : "rgba(56,69,49,0.06)"
              }`,
              transition: "all 0.5s ease",
            }}
          />
          {/* Phase badge inside chrome — structure only */}
          <AnimatePresence>
            {p === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontSize:        7,
                  letterSpacing:   "0.12em",
                  textTransform:   "uppercase",
                  color:           "rgba(56,69,49,0.55)",
                  fontFamily:      "system-ui, sans-serif",
                  border:          "0.5px solid rgba(56,69,49,0.22)",
                  padding:         "2px 6px",
                  borderRadius:    3,
                  flexShrink:      0,
                }}
              >
                layout
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Website Content ─────────────────────────────────────────────── */}
        <div
          style={{
            backgroundColor: contentBg,
            backgroundImage: contentBgImage,
            backgroundSize:  p === 2 ? "14px 14px" : "auto",
            padding:         "14px 14px 18px",
            transition:      "background-color 0.7s ease",
            position:        "relative",
            overflow:        "hidden",
          }}
        >
          {/* Animated cursor — motion phase only */}
          <AnimatePresence>
            {p === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 20 }}
              >
                <motion.div
                  style={{
                    position:        "absolute",
                    width:           10,
                    height:          10,
                    borderRadius:    "50%",
                    backgroundColor: EMBER,
                    boxShadow:       `0 0 0 3px rgba(193,105,52,0.22)`,
                  }}
                  animate={{
                    x: [24, 110, 200, 160, 60, 24],
                    y: [50, 20, 80, 140, 160, 50],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Navbar ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 16, position: "relative" }}>
            {/* Annotation — structure phase */}
            <AnimatePresence>
              {p === 2 && (
                <motion.span
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{
                    position: "absolute", top: -9, left: 0,
                    fontSize: 6, letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "rgba(56,69,49,0.45)", fontFamily: "system-ui, sans-serif",
                  }}
                >
                  header
                </motion.span>
              )}
            </AnimatePresence>

            {/* Logo mark */}
            <motion.div {...entry(p, 0.05)} style={{ width: 28, height: 18, borderRadius: 4, flexShrink: 0, ...fill(p, FOREST) }} />
            {([38, 30, 34] as number[]).map((w, i) => (
              <motion.div key={i} {...entry(p, 0.11 + i * 0.06)}
                style={{ width: w, height: 9, borderRadius: 3, ...fill(p, "rgba(56,69,49,0.13)") }}
              />
            ))}
            <div style={{ flex: 1 }} />
            {/* Nav CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: p >= 1 ? 1 : 0,
                y:       p >= 1 ? 0 : 10,
                scale:   p === 4 ? [1, 1.07, 1] : 1,
              }}
              transition={
                p === 4
                  ? {
                      opacity: { duration: 0.42, delay: 0.27, ease: SNAP },
                      y:       { duration: 0.42, delay: 0.27, ease: SNAP },
                      scale:   { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
                    }
                  : { duration: 0.42, delay: 0.27, ease: SNAP }
              }
              style={{ width: 52, height: 20, borderRadius: 10, flexShrink: 0, ...fill(p, EMBER) }}
            />
          </div>

          {/* ── Hero Area ── */}
          <div style={{ display: "flex", gap: 12, marginBottom: 16, position: "relative" }}>
            {/* Annotation — structure */}
            <AnimatePresence>
              {p === 2 && (
                <motion.span
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{
                    position: "absolute", top: -9, left: 0,
                    fontSize: 6, letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "rgba(56,69,49,0.45)", fontFamily: "system-ui, sans-serif",
                  }}
                >
                  hero
                </motion.span>
              )}
            </AnimatePresence>

            {/* Left: copy blocks */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
              <motion.div {...entry(p, 0.14)} style={{ height: 22, width: "80%", borderRadius: 4, ...fill(p, FOREST) }} />
              <motion.div {...entry(p, 0.20)} style={{ height: 22, width: "62%", borderRadius: 4, ...fill(p, EMBER) }} />
              <motion.div {...entry(p, 0.27)} style={{ height: 8, width: "90%", borderRadius: 3, marginTop: 3, ...fill(p, "rgba(56,69,49,0.25)") }} />
              <motion.div {...entry(p, 0.31)} style={{ height: 8, width: "74%", borderRadius: 3, ...fill(p, "rgba(56,69,49,0.18)") }} />
              {/* CTA row */}
              <div style={{ display: "flex", gap: 7, marginTop: 8 }}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: p >= 1 ? 1 : 0,
                    y:       p >= 1 ? 0 : 10,
                    scale:   p === 4 ? [1, 1.08, 1] : 1,
                  }}
                  transition={
                    p === 4
                      ? {
                          opacity: { duration: 0.42, delay: 0.36, ease: SNAP },
                          y:       { duration: 0.42, delay: 0.36, ease: SNAP },
                          scale:   { duration: 2.0, repeat: Infinity, ease: "easeInOut", delay: 1.0 },
                        }
                      : { duration: 0.42, delay: 0.36, ease: SNAP }
                  }
                  style={{ height: 23, width: 72, borderRadius: 12, ...fill(p, EMBER) }}
                />
                <motion.div {...entry(p, 0.41)} style={{ height: 23, width: 62, borderRadius: 12, ...outline(p) }} />
              </div>
            </div>

            {/* Right: visual accent card */}
            <div style={{ width: 90, display: "flex", flexDirection: "column", gap: 7 }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: p >= 1 ? 1 : 0,
                  y:       p >= 1 ? (p === 4 ? [0, -6, 0] : 0) : 10,
                }}
                transition={
                  p === 4
                    ? {
                        opacity: { duration: 0.42, delay: 0.32, ease: SNAP },
                        y:       { duration: 3.0, repeat: Infinity, ease: "easeInOut" },
                      }
                    : { duration: 0.42, delay: 0.32, ease: SNAP }
                }
                style={{ height: 74, borderRadius: 10, ...fill(p, "rgba(193,105,52,0.14)") }}
              />
              <motion.div {...entry(p, 0.38)} style={{ height: 20, borderRadius: 6, ...fill(p, "rgba(56,69,49,0.08)") }} />
            </div>
          </div>

          {/* Section divider */}
          <div
            style={{
              height:          1,
              marginBottom:    12,
              backgroundColor: `rgba(56,69,49,${p >= 2 ? 0.10 : 0.04})`,
              opacity:         p >= 1 ? 1 : 0,
              transition:      "background-color 0.5s ease, opacity 0.5s ease 0.5s",
            }}
          />

          {/* ── Feature Cards Row ── */}
          <div style={{ position: "relative" }}>
            {/* Annotation — structure */}
            <AnimatePresence>
              {p === 2 && (
                <motion.span
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{
                    position: "absolute", top: -9, left: 0,
                    fontSize: 6, letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "rgba(56,69,49,0.45)", fontFamily: "system-ui, sans-serif",
                  }}
                >
                  features
                </motion.span>
              )}
            </AnimatePresence>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
              {[
                { bg: "rgba(56,69,49,0.07)",   acc: FOREST, d: 0.38, fd: 2.3 },
                { bg: "rgba(193,105,52,0.12)", acc: EMBER,  d: 0.44, fd: 2.7 },
                { bg: "rgba(56,69,49,0.07)",   acc: FOREST, d: 0.50, fd: 3.1 },
              ].map(({ bg, acc, d, fd }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: p >= 1 ? 1 : 0,
                    y:       p >= 1 ? (p === 4 ? [0, -4, 0] : 0) : 10,
                  }}
                  transition={
                    p === 4
                      ? {
                          opacity: { duration: 0.42, delay: d, ease: SNAP },
                          y:       { duration: fd, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
                        }
                      : { duration: 0.42, delay: d, ease: SNAP }
                  }
                  style={{
                    height:          70,
                    borderRadius:    8,
                    padding:         "9px 10px",
                    display:         "flex",
                    flexDirection:   "column",
                    justifyContent:  "space-between",
                    ...fill(p, bg),
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width:           18,
                      height:          18,
                      borderRadius:    4,
                      backgroundColor:
                        p >= 3
                          ? acc
                          : p === 2
                          ? "transparent"
                          : "transparent",
                      boxShadow:
                        p >= 3
                          ? "none"
                          : p === 2
                          ? `inset 0 0 0 1.5px rgba(56,69,49,0.50)`
                          : `inset 0 0 0 1px rgba(56,69,49,0.13)`,
                      transition: "background-color 0.5s ease, box-shadow 0.4s ease",
                    }}
                  />
                  {/* Text lines */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {([70, 48] as number[]).map((w, j) => (
                      <div
                        key={j}
                        style={{
                          height:          6,
                          width:           `${w}%`,
                          borderRadius:    2,
                          backgroundColor:
                            p >= 3
                              ? `rgba(56,69,49,${j === 0 ? 0.22 : 0.13})`
                              : "transparent",
                          boxShadow:
                            p < 3
                              ? `inset 0 0 0 1px rgba(56,69,49,${p === 2 ? 0.40 : 0.12})`
                              : "none",
                          transition: "background-color 0.5s ease, box-shadow 0.4s ease",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Footer hint ── */}
          <div
            style={{
              display:    "flex",
              alignItems: "center",
              gap:        8,
              marginTop:  14,
              opacity:    p >= 2 ? 1 : 0,
              transition: "opacity 0.5s ease 0.35s",
            }}
          >
            <div style={{ flex: 1, height: 1, backgroundColor: `rgba(56,69,49,${p >= 3 ? 0.09 : 0.20})`, transition: "background-color 0.5s ease" }} />
            <span
              style={{
                fontSize:      7,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color:         `rgba(56,69,49,${p >= 3 ? 0.35 : 0.30})`,
                fontFamily:    "system-ui, sans-serif",
                transition:    "color 0.5s ease",
                userSelect:    "none",
              }}
            >
              Thinkr Studio
            </span>
            <div style={{ flex: 1, height: 1, backgroundColor: `rgba(56,69,49,${p >= 3 ? 0.09 : 0.20})`, transition: "background-color 0.5s ease" }} />
          </div>
        </div>
      </motion.div>

      {/* ── Phase Indicator ────────────────────────────────────────────────── */}
      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        {/* Progress track */}
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {([1, 2, 3, 4] as Exclude<Phase, 0>[]).map((ph, i) => (
            <div key={ph} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  height:          4,
                  width:           p === ph ? 28 : p > ph ? 10 : 6,
                  borderRadius:    2,
                  backgroundColor: p === ph ? EMBER : p > ph ? "rgba(56,69,49,0.32)" : "rgba(56,69,49,0.10)",
                  transition:      "all 0.45s ease",
                }}
              />
              {i < 3 && (
                <div
                  style={{
                    width:           p > ph ? 16 : 10,
                    height:          1,
                    marginInline:    4,
                    backgroundColor: p > ph ? "rgba(56,69,49,0.20)" : "rgba(56,69,49,0.07)",
                    transition:      "all 0.5s ease",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Current phase chip */}
        <div style={{ height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <AnimatePresence mode="wait">
            {p >= 1 && (
              <motion.div
                key={p}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28 }}
                style={{
                  display:         "flex",
                  alignItems:      "center",
                  gap:             6,
                  padding:         "4px 10px",
                  borderRadius:    12,
                  border:          `1px solid rgba(193,105,52,0.28)`,
                  backgroundColor: "rgba(193,105,52,0.08)",
                }}
              >
                <div
                  style={{
                    width:           5,
                    height:          5,
                    borderRadius:    "50%",
                    backgroundColor: EMBER,
                    flexShrink:      0,
                  }}
                />
                <span
                  style={{
                    fontSize:      10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color:         EMBER,
                    fontFamily:    "system-ui, sans-serif",
                    fontWeight:    700,
                  }}
                >
                  {PHASE_META[p as Exclude<Phase, 0>].label}
                </span>
                <span
                  style={{
                    fontSize:      9,
                    color:         "rgba(56,69,49,0.38)",
                    fontFamily:    "system-ui, sans-serif",
                    borderLeft:    "1px solid rgba(56,69,49,0.15)",
                    paddingLeft:   6,
                  }}
                >
                  {PHASE_META[p as Exclude<Phase, 0>].desc}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
