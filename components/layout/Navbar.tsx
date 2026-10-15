"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { EMAIL, WHATSAPP } from "@/lib/contact";
import SocialIcons from "./SocialIcons";

const navLinks = [
  { label: "Work",     href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Process",  href: "/#process" },
  { label: "About",    href: "/#about" },
];

// Phone menu: big primary links, small secondary ones at the bottom (OIC-style).
const menuPrimary = [
  { label: "Work",            href: "/#work" },
  { label: "Services",        href: "/#services" },
  { label: "About",           href: "/#about" },
  { label: "Start a Project", href: "/#contact" },
];
const menuSecondary = [
  { label: "Process", href: "/#process" },
  { label: "Reviews", href: "/#testimonials" },
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
        className="fixed top-0 left-0 right-0 z-50 px-5 md:px-10 max-md:mix-blend-difference"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <div
          className={`flex items-center justify-between py-4 px-1 md:px-6 mt-3 rounded-2xl transition-all duration-500 ${
            scrolled
              ? "md:bg-ink/96 md:backdrop-blur-md md:shadow-xl md:shadow-ink/20"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="group cursor-pointer">
            <span
              className={`font-display text-[1.6rem] font-black tracking-tight leading-none transition-colors duration-300 max-md:text-white ${
                scrolled ? "text-paper" : "text-ink"
              }`}
            >
              Thinkr<span className="md:text-ember">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`relative text-sm font-medium tracking-wide group transition-colors duration-200 hover:text-ember ${
                  scrolled ? "text-paper/75" : "text-ink/65"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-ember transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="/#contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-ember text-paper cursor-pointer transition-all duration-200 hover:bg-ember-dark hover:scale-[1.04] active:scale-95"
          >
            Start a Project
          </Link>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 cursor-pointer text-white"
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

      {/* Phone menu — black panel from the right */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              aria-hidden
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-40 flex w-[85%] max-w-sm flex-col bg-black px-8 pt-28 pb-10 text-white md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <nav className="flex flex-col gap-4">
                {menuPrimary.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="font-display text-[2.1rem] font-medium leading-[1.05] transition-colors duration-200 hover:text-ember"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-6 text-sm font-medium uppercase">
                <div className="flex flex-col gap-3">
                  {menuSecondary.map((link) => (
                    <Link key={link.label} href={link.href} onClick={() => setIsOpen(false)} className="hover:text-ember">
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <a href={`mailto:${EMAIL}`} className="break-all hover:text-ember">{EMAIL}</a>
                  {WHATSAPP.map((w) => (
                    <a key={w.region} href={w.href} target="_blank" rel="noopener noreferrer" className="hover:text-ember">
                      WhatsApp {w.region}: {w.display}
                    </a>
                  ))}
                </div>
                <SocialIcons />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
