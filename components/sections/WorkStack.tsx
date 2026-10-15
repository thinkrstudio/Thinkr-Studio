"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { WorkProjectWithMedia } from "@/lib/work";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DESKTOP = "(min-width: 768px)";

// Stacking only runs on desktop — on phones each card is taller than the screen.
function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(DESKTOP);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(DESKTOP).matches,
    () => false,
  );
}

// Rough perceived-brightness check so placeholder text stays readable on any tint.
function isDark(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b < 150;
}

type PanelStyle = {
  scale?:   MotionValue<number>;
  /** White wash over a covered card. */
  fade?:    MotionValue<number>;
  /** Full fade-out, used by the intro. */
  opacity?: MotionValue<number>;
};

// ─── Stacking ────────────────────────────────────────────────────────────────
// The intro and every card are sticky panels, so each new panel slides up over the
// last. While a panel is being covered it shrinks a little and fades toward white.
// The intro is shorter than a screen so the first card is already rising into view
// beneath its heading — no empty band between the hero and the first project.
const INTRO_VH = 0.7; // keep in sync with the intro panel's md:h-[70vh]

function StackPanel({
  progress,
  range,
  covered,
  className,
  panelRef,
  children,
}: {
  progress:  MotionValue<number>;
  /** Slice of the section's scroll progress during which this panel is covered. */
  range:     [number, number];
  covered:   boolean;
  className: string;
  /** Card panels stick on phones too; the section measures them through this ref. */
  panelRef?: (el: HTMLDivElement | null) => void;
  children:  (style: PanelStyle) => React.ReactNode;
}) {
  const scale   = useTransform(progress, range, [1, 0.9]);
  const fade    = useTransform(progress, range, [0, 0.7]);
  const opacity = useTransform(progress, range, [1, 0]);

  return (
    <div ref={panelRef} className={`${panelRef ? "sticky" : "md:sticky"} md:top-0 ${className}`}>
      {children(covered ? { scale, fade, opacity } : {})}
    </div>
  );
}

// ─── Card media ──────────────────────────────────────────────────────────────
// Hover effects key off the card's `group`, since the card-wide link sits on top.
function CardMedia({
  project,
  eager,
  videoRef,
}: {
  project:  WorkProjectWithMedia;
  eager:    boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  const sizes = "(max-width: 768px) 100vw, 45vw";

  if (!project.image) {
    const dark = isDark(project.tint);
    return (
      <div
        className="absolute inset-0 flex items-center justify-center px-6 text-center"
        style={{ background: project.tint, color: dark ? "rgba(255,255,255,0.9)" : "#111111" }}
      >
        <span className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight">{project.name}</span>
      </div>
    );
  }

  return (
    <>
      <Image
        src={project.image}
        alt={`${project.name}: ${project.tags[0]}`}
        fill
        sizes={sizes}
        loading={eager ? "eager" : undefined}
        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
      />
      {project.hoverImage && (
        <Image
          src={project.hoverImage}
          alt=""
          aria-hidden
          fill
          sizes={sizes}
          className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
      {project.video && (
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
    </>
  );
}

// ─── Project card ────────────────────────────────────────────────────────────
// Sized from the viewport height (width capped at 1.5× the height) so it reads as a
// card, not a banner, on wide screens. The whole card links to the project, with a
// round "View" bubble trailing the pointer in place of the cursor.
function ProjectCard({
  project,
  index,
  style,
}: {
  project: WorkProjectWithMedia;
  index:   number;
  style:   PanelStyle;
}) {
  const cardRef  = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const bx = useSpring(mx, { stiffness: 500, damping: 40, mass: 0.4 });
  const by = useSpring(my, { stiffness: 500, damping: 40, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const k = el.offsetWidth / r.width; // undo the stacking scale
    mx.set((e.clientX - r.left) * k);
    my.set((e.clientY - r.top) * k);
  };
  const onEnter = () => {
    setHover(true);
    const v = videoRef.current;
    if (v) { v.currentTime = 0; v.play().catch(() => {}); }
  };
  const onLeave = () => {
    setHover(false);
    videoRef.current?.pause();
  };

  const linkLabel = project.ongoing ? "View preview" : "Visit site";

  return (
    <div className="flex h-full items-start justify-center pb-4 md:pt-24">
      <motion.article
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{ scale: style.scale, transformOrigin: "50% 0%" }}
        className={`group relative w-full overflow-hidden rounded-2xl bg-paper-dark md:h-[calc(100vh-7.5rem)] md:max-w-[calc((100vh-7.5rem)*1.5)] ${project.href ? "md:cursor-none" : ""}`}
      >
        <div className="grid h-full grid-cols-1 md:grid-cols-2 gap-6 md:gap-[3vh] p-3 md:p-[2.4vh]">
          <div className="relative aspect-[3/2] md:aspect-auto md:h-full overflow-hidden rounded-xl">
            <CardMedia project={project} eager={index < 1} videoRef={videoRef} />
            {project.ongoing && (
              <span className="absolute left-4 top-4 z-[1] inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-ink backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse-dot" />
                Ongoing
              </span>
            )}
          </div>

          <div className="flex flex-col px-2 pb-3 text-center md:text-left md:px-0 md:pt-[2vh] md:pb-0 md:pr-[2vh]">
            <div className="md:my-auto">
              <p className="mb-3 md:mb-[1.6vh] text-sm md:text-[clamp(0.72rem,1.7vh,0.95rem)] font-medium uppercase text-ink">
                The brief:
              </p>
              <h3
                className="font-display font-bold uppercase leading-[0.98] md:leading-[0.95] tracking-[-0.01em] md:tracking-[-0.02em] text-ink text-[1.65rem] md:text-[clamp(1.7rem,5.4vh,3.6rem)]"
              >
                {project.headline}
              </h3>
              <p className="mx-auto md:mx-0 mt-5 md:mt-[3vh] max-w-[46ch] text-lg md:text-[clamp(0.85rem,1.85vh,1.05rem)] leading-snug md:leading-relaxed text-ink/75">
                {project.story}
              </p>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm md:text-xs font-semibold uppercase tracking-[0.06em] text-ink">
                  {project.name}
                  {project.client && <span className="font-medium text-ink/50"> for {project.client}</span>}
                </p>
                <p className="mt-1 text-[0.8rem] md:text-[0.65rem] uppercase tracking-[0.12em] text-ink/45">
                  {project.tags.join(" · ")} · {project.year}
                </p>
              </div>
              {project.href && (
                <span className="shrink-0 border-b border-ink pb-0.5 text-sm font-medium uppercase text-ink transition-colors duration-200 group-hover:border-ember group-hover:text-ember">
                  {linkLabel}
                </span>
              )}
            </div>
          </div>
        </div>

        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${linkLabel}: ${project.name}`}
            className="absolute inset-0 z-10"
          />
        )}

        {/* White wash while covered: driven by scroll progress on desktop, by the section's effect on phones. */}
        <motion.div
          aria-hidden
          data-fade
          style={style.fade ? { opacity: style.fade } : undefined}
          className="pointer-events-none absolute inset-0 z-10 bg-white opacity-0"
        />

        {project.href && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-20 -ml-[38px] -mt-[38px] hidden md:flex h-[76px] w-[76px] items-center justify-center rounded-full bg-white/55 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-ink shadow-lg backdrop-blur-md"
            style={{ x: bx, y: by }}
            initial={false}
            animate={{ scale: hover ? 1 : 0, opacity: hover ? 1 : 0 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {project.ongoing ? "Preview" : "View"}
          </motion.div>
        )}
      </motion.article>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function WorkStack({ projects }: { projects: WorkProjectWithMedia[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isDesktop  = useIsDesktop();
  const reduce     = useReducedMotion();
  const animate    = isDesktop && !reduce;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  // Scroll distance, in viewports: the intro, plus one per card after the first.
  // Card i sticks once the intro and i earlier cards have scrolled past.
  const span  = INTRO_VH + projects.length - 1;
  const slice = (from: number): [number, number] => [from / span, Math.min(1, (from + 1) / span)];

  // Phones: cards differ in height, so each one sticks where its bottom meets the
  // bottom of the screen (or just under the header if it's short enough), then
  // shrinks and fades as the next card slides over it.
  const cardPanels = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const panels = cardPanels.current.filter((p): p is HTMLDivElement => !!p);
    const parts  = panels.map((p) => ({
      article: p.querySelector("article"),
      fade:    p.querySelector<HTMLElement>("[data-fade]"),
    }));

    if (isDesktop) {
      panels.forEach((p, i) => {
        p.style.top = "";
        if (parts[i].article) parts[i].article!.style.transform = "";
      });
      return;
    }

    const tops: number[] = [];
    let raf = 0;

    const update = () => {
      raf = 0;
      if (reduce) return;
      const vh = window.innerHeight;
      panels.forEach((_, i) => {
        const next = panels[i + 1];
        let t = 0;
        if (next) {
          const top = next.getBoundingClientRect().top;
          t = Math.min(1, Math.max(0, (vh - top) / Math.max(1, vh - tops[i + 1])));
        }
        const { article, fade } = parts[i];
        if (article) {
          article.style.transformOrigin = "50% 0%";
          article.style.transform = t ? `scale(${1 - 0.08 * t})` : "";
        }
        if (fade) fade.style.opacity = String(0.7 * t);
      });
    };

    const layout = () => {
      const vh = window.innerHeight;
      panels.forEach((p, i) => {
        tops[i] = Math.min(72, vh - p.offsetHeight);
        p.style.top = `${tops[i]}px`;
      });
      update();
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const ro = new ResizeObserver(layout);
    panels.forEach((p) => ro.observe(p));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout);
    layout();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
    };
  }, [isDesktop, reduce, projects.length]);

  return (
    <section ref={sectionRef} id="work" className="relative bg-white px-4 md:px-8">
      {/* Intro — the first card slides up over it. */}
      <StackPanel
        progress={scrollYProgress}
        range={[0, INTRO_VH / span]}
        covered={animate}
        className="md:h-[70vh]"
      >
        {(style) => (
          <motion.div
            style={{ scale: style.scale, opacity: style.opacity }}
            className="flex flex-col items-center text-center pt-12 pb-10 md:h-full md:pt-28 md:pb-0"
          >
            <motion.p
              className="mb-6 text-sm md:text-xs font-medium uppercase text-ink/60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Recent &amp; Ongoing Work
              <sup className="ml-1 text-[0.6rem] text-ember">{projects.length}</sup>
            </motion.p>
            <motion.h2
              className="font-display font-bold uppercase leading-[0.95] md:leading-[0.92] tracking-[-0.02em] md:tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(2rem, 6vw, 5.75rem)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              Work that
              <br />
              speaks for itself.
            </motion.h2>
          </motion.div>
        )}
      </StackPanel>

      {projects.map((p, i) => (
        <StackPanel
          key={p.slug}
          progress={scrollYProgress}
          range={slice(INTRO_VH + i)}
          covered={animate && i < projects.length - 1}
          className="md:h-screen"
          panelRef={(el) => { cardPanels.current[i] = el; }}
        >
          {(style) => <ProjectCard project={p} index={i} style={style} />}
        </StackPanel>
      ))}

      <div className="h-6 md:h-0" />
    </section>
  );
}

