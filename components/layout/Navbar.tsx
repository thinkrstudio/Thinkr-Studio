"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Work",     href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process",  href: "#process" },
  { label: "About",    href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen,   setIsOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-5 md:px-10"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <div
          className={`flex items-center justify-between py-4 px-5 md:px-6 mt-3 rounded-2xl transition-all duration-500 ${
            scrolled
              ? "bg-forest/96 backdrop-blur-md shadow-xl shadow-forest/20"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="group cursor-pointer">
            <span
              className={`font-display text-[1.6rem] font-black tracking-tight leading-none transition-colors duration-300 ${
                scrolled ? "text-cream" : "text-forest"
              }`}
            >
              Thinkr<span className="text-ember">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`relative text-sm font-medium tracking-wide group transition-colors duration-200 hover:text-ember ${
                  scrolled ? "text-cream/75" : "text-forest/65"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-ember transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-ember text-cream cursor-pointer transition-all duration-200 hover:bg-ember-dark hover:scale-[1.04] active:scale-95"
          >
            Start a Project
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className={`md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 cursor-pointer ${
              scrolled || isOpen ? "text-cream" : "text-forest"
            }`}
          >
            <motion.span
              className="w-6 h-0.5 bg-current block origin-center"
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-current block"
              animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-current block origin-center"
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-forest flex flex-col items-center justify-center gap-10"
            initial={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 95% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-display text-[2.8rem] font-black text-cream hover:text-ember transition-colors duration-200 cursor-pointer leading-tight"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <Link
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="px-8 py-3.5 bg-ember text-cream rounded-full text-base font-semibold cursor-pointer hover:bg-ember-dark transition-colors duration-200"
              >
                Start a Project
              </Link>
            </motion.div>

            {/* Bottom contact line */}
            <motion.p
              className="absolute bottom-10 text-cream/25 text-xs tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              hello@thinkrstudio.com
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
