"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { TECH_ICONS } from "@/lib/tech-icons";

const SPEED = 0.09; // ring rotation, radians per second

// Film grain — fractal noise tile, layered over the dark stage.
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")";

// Embossed logo + faint red/cyan fringe for the chromatic-aberration look.
const ICON_FILTER = [
  "drop-shadow(0 -1px 0 rgba(255,255,255,0.35))",
  "drop-shadow(0 1.5px 1px rgba(0,0,0,0.85))",
  "drop-shadow(-1.2px 0 0 rgba(255,60,110,0.28))",
  "drop-shadow(1.2px 0 0 rgba(60,200,255,0.28))",
].join(" ");

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef    = useRef<HTMLDivElement>(null);
  const coinRefs   = useRef<(HTMLDivElement | null)[]>([]);

  // Coins orbit the headline on an ellipse. Each one tilts with its position and is
  // lit from the top-left, so coins on the far side fall into shadow. Transforms are
  // written straight to the DOM each frame — no React re-renders while animating.
  useEffect(() => {
    const section = sectionRef.current;
    const ring    = ringRef.current;
    if (!section || !ring) return;

    const coins  = coinRefs.current;
    const N      = coins.length;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rx = 0, ry = 0;
    let angle = 0, last = 0, raf = 0;
    let px = 0, py = 0, tx = 0, ty = 0; // pointer parallax (smoothed / target)

    const render = () => {
      px += (tx - px) * 0.05;
      py += (ty - py) * 0.05;
      ring.style.transform = `rotateX(${-py * 8}deg) rotateY(${px * 10}deg)`;

      coins.forEach((el, i) => {
        if (!el) return;
        const th = angle + (i / N) * Math.PI * 2 - Math.PI / 2;
        const c = Math.cos(th), s = Math.sin(th);
        const light = (1 - (c + s) / Math.SQRT2) / 2; // 1 = top-left, 0 = bottom-right
        el.style.transform =
          `translate3d(${c * rx}px, ${s * ry}px, ${(light - 0.5) * 140}px) ` +
          `rotateY(${c * 34}deg) rotateX(${-s * 26}deg) rotateZ(${c * s * 20}deg)`;
        el.style.filter = `brightness(${0.22 + light * 1.0})`;
      });
    };

    const measure = () => {
      const w = section.clientWidth, h = section.clientHeight;
      const mobile = w < 768;
      const coin = Math.round(Math.min(190, Math.max(72, Math.min(w, h) * (mobile ? 0.2 : 0.15))));
      ring.style.setProperty("--coin", `${coin}px`);
      const base = Math.min(w, h) * 0.4;
      rx = mobile ? w * 0.48 : base * 1.1;
      ry = mobile ? h * 0.36 : base * 0.92;
      render();
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      angle += dt * SPEED;
      render();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    };

    const ro = new ResizeObserver(measure);
    ro.observe(section);
    measure();

    // Only animate while the section is on screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(raf);
        if (entry.isIntersecting && !reduce) {
          last = performance.now();
          raf = requestAnimationFrame(tick);
        }
      },
      { rootMargin: "100px" },
    );
    io.observe(section);
    if (!reduce) section.addEventListener("pointermove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      section.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stack"
      className="relative h-[780px] md:h-[940px] overflow-hidden bg-[#0a0a0a] text-white"
      style={{ perspective: "1400px" }}
    >
      {/* ── Stage lighting ─────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(255,255,255,0.09), transparent 70%)",
            "radial-gradient(ellipse 28% 7% at 50% 93%, rgba(255,255,255,0.07), transparent 100%)",
            "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.7) 100%)",
          ].join(", "),
        }}
      />

      {/* ── Coin ring ──────────────────────────────────────── */}
      <div
        ref={ringRef}
        aria-hidden
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        {TECH_ICONS.map((icon, i) => (
          <div
            key={icon.name}
            ref={(el) => { coinRefs.current[i] = el; }}
            title={icon.name}
            className="absolute left-1/2 top-1/2 will-change-transform"
            style={{
              width:          "var(--coin, 150px)",
              height:         "var(--coin, 150px)",
              marginLeft:     "calc(var(--coin, 150px) / -2)",
              marginTop:      "calc(var(--coin, 150px) / -2)",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="relative h-full w-full rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 32% 28%, #767676 0%, #4a4a4a 38%, #2c2c2c 72%, #1c1c1c 100%)",
                boxShadow: [
                  "inset 0 2px 2px rgba(255,255,255,0.22)",
                  "inset 0 -8px 16px rgba(0,0,0,0.55)",
                  "0 0 0 1px rgba(255,255,255,0.06)",
                  "0 6px 0 #151515",
                  "0 26px 50px rgba(0,0,0,0.7)",
                ].join(", "),
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="absolute inset-[27%]"
                style={{ fill: "#a3a3a3", filter: ICON_FILTER }}
              >
                <path d={icon.path} />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Grain sits above the coins so they share the same film texture. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      {/* ── Centre copy ────────────────────────────────────── */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <span className="mb-6 font-mono text-xs md:text-[0.65rem] uppercase tracking-[0.3em] text-paper/50">
          Our Stack
        </span>

        <h2
          className="font-display font-normal uppercase leading-[1.12] tracking-[0.04em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          style={{ fontSize: "clamp(1.55rem, 3.1vw, 2.6rem)" }}
        >
          <span className="font-bold">Design</span>
          <span className="mx-2 font-light text-ember">×</span>
          <span className="font-bold">Code</span> for brands
          <br />
          that need to perform
        </h2>

        <p className="mt-5 max-w-md text-lg md:text-[0.95rem] leading-snug md:leading-relaxed text-paper/70 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          Every Thinkr site runs on a modern, proven stack: fast to load, easy to scale and built to move.
        </p>

        <Link
          href="#contact"
          className="group relative mt-9 inline-block border border-paper/15 px-7 py-4 font-mono text-sm md:text-xs font-bold uppercase tracking-[0.08em] text-paper transition-colors duration-300 hover:border-ember hover:bg-ember/10"
        >
          {[
            "left-0 top-0 -translate-x-1/2 -translate-y-1/2",
            "right-0 top-0 translate-x-1/2 -translate-y-1/2",
            "left-0 bottom-0 -translate-x-1/2 translate-y-1/2",
            "right-0 bottom-0 translate-x-1/2 translate-y-1/2",
          ].map((corner) => (
            <span
              key={corner}
              aria-hidden
              className={`absolute ${corner} text-[10px] leading-none text-ember`}
            >
              +
            </span>
          ))}
          Start a project
        </Link>

        <ul className="sr-only">
          {TECH_ICONS.map((icon) => (
            <li key={icon.name}>{icon.name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
