"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// srcH is the real pixel height of the full-page screenshot.
// panY is how far the image translates up on hover — chosen so we
// see roughly the middle-third of the page, not just a tiny shift.
const PROJECTS = [
  {
    id:    "01",
    name:  "Space Perfumes",
    type:  "E-Commerce",
    year:  "2025",
    desc:  "A luxury fragrance storefront — dark, cinematic, and built to move high-end product with every scroll.",
    image: "/Space-perfumes.png",
    href:  "https://spaceperfumes.com",
    srcW:  1920,
    srcH:  7692,
    panY:  "-32%",
    col:   "wide",
  },
  {
    id:    "02",
    name:  "Khan's Authentic HVAC",
    type:  "Service",
    year:  "2025",
    desc:  "A B2B service site that positions an industrial HVAC brand as the authority in climate engineering.",
    image: "/khans.png",
    href:  "https://khanshvac.com",
    srcW:  1920,
    srcH:  3393,
    panY:  "-18%",
    col:   "narrow",
  },
  {
    id:    "03",
    name:  "Forever",
    type:  "E-Commerce",
    year:  "2025",
    desc:  "A premium streetwear brand — dark, minimal, and built to make every drop feel like a cultural event.",
    image: "/Forever.png",
    href:  "https://forever-ten-lime.vercel.app/",
    srcW:  1920,
    srcH:  8516,
    panY:  "-36%",
    col:   "narrow",
  },
  {
    id:    "04",
    name:  "Sphere Connect",
    type:  "SaaS",
    year:  "2024",
    desc:  "A BPO & operations platform that turns service complexity into a clean, confidence-building web presence.",
    image: "/Sphere-connect.png",
    href:  "https://sphereconnect.io",
    srcW:  1920,
    srcH:  3200,
    panY:  "-22%",
    col:   "wide",
  },
] as const;

type Project = (typeof PROJECTS)[number];

// ─── Minimal browser bar ─────────────────────────────────────────
// Just a thin strip — enough to frame it as a website, not a photo.
function BrowserBar({ name }: { name: string }) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "") + ".com";
  return (
    <div
      className="flex-shrink-0 flex items-center gap-2 px-3"
      style={{
        height:     26,
        background: "rgba(20,20,20,0.92)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Traffic dots */}
      {["#ff5f57","#febc2e","#28c840"].map(c => (
        <span key={c} style={{ width:7, height:7, borderRadius:"50%", background:c, flexShrink:0 }} />
      ))}
      {/* URL pill */}
      <div
        className="flex items-center gap-1.5 px-2 rounded"
        style={{ flex:1, height:14, background:"rgba(255,255,255,0.07)", overflow:"hidden" }}
      >
        <span style={{ width:5, height:5, borderRadius:"50%", background:"#2fa843", flexShrink:0 }} />
        <span style={{ fontSize:9, color:"rgba(255,255,255,0.38)", letterSpacing:"0.03em", whiteSpace:"nowrap" }}>
          {slug}
        </span>
      </div>
    </div>
  );
}

// ─── Single project card ──────────────────────────────────────────
function ProjectCard({
  project,
  cardH,
  index,
}: {
  project: Project;
  cardH:   number;
  index:   number;
}) {
  const ref    = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      ref={ref}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.1, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer block"
      style={{
        height:     cardH,
        border:     "1px solid rgba(56,69,49,0.12)",
        boxShadow:  hovered
          ? "0 28px 60px -12px rgba(56,69,49,0.28)"
          : "0 8px 24px -8px rgba(56,69,49,0.12)",
        transition: "box-shadow 0.45s ease",
        willChange: "transform",
      }}
    >
      {/* ── Screenshot with pan effect ──────────────────────── */}
      <div className="absolute inset-0 overflow-hidden flex flex-col">
        <BrowserBar name={project.name} />

        {/* Image pan wrapper */}
        <div className="relative flex-1 overflow-hidden">
          <motion.div
            className="w-full"
            animate={{ y: hovered ? project.panY : "0%" }}
            transition={{ duration: 1.45, ease: EASE }}
          >
            <Image
              src={project.image}
              alt={project.name}
              width={project.srcW}
              height={project.srcH}
              quality={90}
              priority={index < 2}
              sizes="(max-width: 768px) 100vw, 55vw"
              style={{ display:"block", width:"100%", height:"auto" }}
            />
          </motion.div>

          {/* Gradient overlay — always visible, deepens on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.38) 36%, transparent 60%)",
              opacity:    hovered ? 1 : 0.85,
            }}
          />
        </div>
      </div>

      {/* ── Ghost number ─────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute top-4 right-5 font-display font-black leading-none select-none pointer-events-none transition-opacity duration-500"
        style={{
          fontSize:  "clamp(4rem, 6vw, 6rem)",
          color:     "rgba(255,255,255,0.055)",
          opacity:   hovered ? 1 : 0,
        }}
      >
        {project.id}
      </div>

      {/* ── Info bar ─────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-10"
        style={{ zIndex: 10 }}
      >
        {/* Type + year */}
        <div className="flex items-center justify-between mb-2.5">
          <span
            className="text-[0.6rem] font-semibold tracking-[0.16em] uppercase px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(193,105,52,0.18)",
              color:      "#c16934",
              border:     "1px solid rgba(193,105,52,0.28)",
            }}
          >
            {project.type}
          </span>
          <span
            className="font-mono"
            style={{ color:"rgba(255,255,255,0.28)", fontSize:"0.65rem" }}
          >
            {project.id} · {project.year}
          </span>
        </div>

        {/* Name */}
        <h3
          className="font-display font-black text-white leading-tight tracking-tight mb-1.5"
          style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.65rem)" }}
        >
          {project.name}
        </h3>

        {/* Description — slides in on hover */}
        <motion.p
          className="text-white/50 text-xs leading-relaxed"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.3, ease: EASE }}
          style={{ maxWidth: "34ch" }}
        >
          {project.desc}
        </motion.p>
      </div>

      {/* ── Bottom ember accent line ──────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 h-[2px] transition-all duration-700"
        style={{
          background: "linear-gradient(90deg, #c16934, rgba(193,105,52,0.2))",
          width:      hovered ? "100%" : "0%",
        }}
      />
    </motion.a>
  );
}

// ─── Section ──────────────────────────────────────────────────────
export default function FeaturedWork() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true, margin: "-80px" });

  // Derived card heights based on source aspect ratio.
  // Tall sources (>5000px) get a taller card so the pan is dramatic.
  const cardH = (p: Project) => p.srcH > 5000 ? 500 : 380;

  // Row 1: wide (58%) + narrow (42%) — Space Perfumes first
  // Row 2: narrow (42%) + wide (58%) — flips the balance
  const row1 = [PROJECTS[0], PROJECTS[1]] as const;
  const row2 = [PROJECTS[2], PROJECTS[3]] as const;

  return (
    <section
      id="work"
      className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-cream-dark overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Section header ──────────────────────────────────── */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20"
        >
          <div>
            <div className="overflow-hidden mb-3">
              <motion.span
                className="block text-[0.68rem] tracking-[0.18em] uppercase text-ember font-semibold"
                initial={{ y: "100%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 0.7, ease: EASE }}
              >
                Selected Work
              </motion.span>
            </div>

            <div
              className="font-display font-black text-forest leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
            >
              {["Work that", "speaks for itself."].map((line, i) => (
                <div key={line} className="overflow-hidden pb-[0.12em]">
                  <motion.span
                    className={`block ${i === 1 ? "italic" : ""}`}
                    initial={{ y: "108%" }}
                    animate={inView ? { y: "0%" } : {}}
                    transition={{ duration: 0.85, delay: 0.1 + i * 0.1, ease: EASE }}
                  >
                    {line}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-forest/55 hover:text-ember transition-colors duration-200 cursor-pointer"
            >
              Start a project
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* ── Row 1: wide | narrow ────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-[1.38fr_1fr] gap-4 md:gap-5 mb-4 md:mb-5">
          <ProjectCard project={row1[0]} cardH={cardH(row1[0])} index={0} />
          <ProjectCard project={row1[1]} cardH={cardH(row1[1])} index={1} />
        </div>

        {/* ── Row 2: narrow | wide ────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.38fr] gap-4 md:gap-5">
          <ProjectCard project={row2[0]} cardH={cardH(row2[0])} index={2} />
          <ProjectCard project={row2[1]} cardH={cardH(row2[1])} index={3} />
        </div>

      </div>
    </section>
  );
}
