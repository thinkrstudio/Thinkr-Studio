"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { SERVICES, type Service } from "@/lib/services";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function ServiceRow({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: EASE }}
    >
      <Link
        href={service.href}
        className="group grid grid-cols-1 md:grid-cols-[4rem_1fr_1.1fr] gap-x-6 gap-y-3 border-t border-ink/12 py-8 md:py-10 cursor-pointer"
      >
        <span className="text-xs font-medium tabular-nums text-ink/40 md:pt-3">
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3
          className="font-display font-normal leading-[1] tracking-[-0.02em] text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2"
          style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.75rem)" }}
        >
          {service.title}
        </h3>

        <div>
          <p className="text-lg md:text-[0.95rem] leading-snug md:leading-relaxed text-ink/70">{service.description}</p>
          <p className="mt-3 text-[0.8rem] md:text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/40">
            {service.tags.join(" · ")}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 border-b border-ink/30 pb-0.5 text-sm md:text-xs font-semibold uppercase tracking-[0.06em] text-ink transition-colors duration-200 group-hover:border-ember group-hover:text-ember">
            Find out more
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ──────────────────────────────────────────── */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <motion.h2
            className="font-display font-bold md:font-normal uppercase leading-[0.95] md:leading-[0.9] tracking-[-0.02em] md:tracking-[-0.035em] text-ink"
            style={{ fontSize: "clamp(2rem, 5.6vw, 5.25rem)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: EASE }}
          >
            What We Do
          </motion.h2>
          <motion.p
            className="max-w-sm text-lg md:text-[0.95rem] leading-snug md:leading-relaxed text-ink/70"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Every service is tied to a real business outcome. We don&apos;t decorate, we solve problems.
          </motion.p>
        </div>

        {/* ── List ────────────────────────────────────────────── */}
        <div className="border-b border-ink/12">
          {SERVICES.map((s, i) => (
            <ServiceRow key={s.key} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
