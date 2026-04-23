"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Brand & Identity",
    description:
      "Your visual identity is the first thing people judge — before they read a word. We make sure it says exactly the right thing, instantly.",
    tags: ["Logo Design", "Brand Strategy", "Style Guides", "Visual Identity"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Web Design & Development",
    description:
      "Fast, conversion-focused websites built on Next.js. No templates, no cutting corners. Sites that perform from the moment they go live.",
    tags: ["Next.js", "React", "CMS Integration", "Performance"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Motion & Interaction",
    description:
      "The difference between a website and an experience. We use animation to guide attention and build trust — not just to impress.",
    tags: ["Framer Motion", "GSAP", "Lottie", "3D Experiences"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Digital Strategy & Growth",
    description:
      "Pretty doesn't pay the bills. We tie every design decision to your goals and track what actually moves the needle.",
    tags: ["CRO", "Analytics", "SEO Architecture", "Growth Design"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
  },
];

export default function Services() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <div>
            <motion.span
              className="block text-[0.68rem] tracking-[0.18em] uppercase text-ember font-semibold mb-3"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              What We Do
            </motion.span>
            <motion.h2
              className="font-display font-black text-forest leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              Built to<br />
              <span className="italic text-ember">perform.</span>
            </motion.h2>
          </div>
          <motion.p
            className="text-forest/55 text-sm md:text-base leading-relaxed max-w-[260px]"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Every service is tied to a real business outcome. We don't decorate — we solve problems.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {services.map((svc, i) => (
            <ServiceCard key={svc.number} service={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="group relative p-7 md:p-9 border border-forest/10 rounded-2xl bg-cream overflow-hidden cursor-default transition-colors duration-350 hover:bg-forest hover:border-forest"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      {/* Ghost number */}
      <span
        aria-hidden
        className="absolute top-5 right-6 font-display text-[5.5rem] font-black leading-none select-none text-forest/[0.05] group-hover:text-cream/[0.05] transition-colors duration-350"
      >
        {service.number}
      </span>

      {/* Icon pill */}
      <div className="w-10 h-10 rounded-xl bg-ember/12 group-hover:bg-ember/22 flex items-center justify-center text-ember mb-6 transition-colors duration-350 flex-shrink-0">
        {service.icon}
      </div>

      {/* Text */}
      <h3 className="font-display text-[1.4rem] font-bold text-forest group-hover:text-cream leading-tight mb-3 transition-colors duration-350">
        {service.title}
      </h3>
      <p className="text-forest/58 group-hover:text-cream/58 text-sm leading-relaxed mb-5 transition-colors duration-350">
        {service.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="text-[0.68rem] px-2.5 py-1 rounded-full border border-forest/14 group-hover:border-cream/18 text-forest/48 group-hover:text-cream/48 transition-colors duration-350 tracking-wide"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-ember/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  );
}
