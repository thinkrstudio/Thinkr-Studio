"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { WHATSAPP, WHATSAPP_ICON_PATH } from "@/lib/contact";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SERVICES = [
  { id: "website", label: "Website" },
  { id: "ads",     label: "Meta Ads" },
];

// Decides which pricing brochure is emailed back: Bangladesh gets BDT, everyone else CAD.
const LOCATIONS = [
  { id: "ca",    label: "Canada" },
  { id: "bd",    label: "Bangladesh" },
  { id: "other", label: "Elsewhere" },
];

type FormData = {
  name: string;
  email: string;
  company: string;
  services: string[];
  location: string;
  message: string;
};

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });

  const [form,      setForm]      = useState<FormData>({ name: "", email: "", company: "", services: [], location: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  function toggle(id: string) {
    setForm(p => ({
      ...p,
      services: p.services.includes(id) ? p.services.filter(s => s !== id) : [...p.services, id],
    }));
  }

  const valid = form.name.trim() && form.email.includes("@") && form.location && form.message.trim().length > 10;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-ink overflow-hidden py-24 md:py-32 px-6 md:px-10 lg:px-16"
    >
      {/* Ambient */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[700px] h-[700px] rounded-full bg-ember/[0.07] blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-paper/[0.025] blur-[120px]" />
        <motion.div
          className="absolute top-1/2 right-14 -translate-y-1/2 w-72 h-72 rounded-full border border-paper/[0.04] hidden lg:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 right-14 -translate-y-1/2 w-48 h-48 rounded-full border border-ember/[0.07] hidden lg:block"
          animate={{ rotate: -360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-20 items-start">

          {/* ── Left: headline + context ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <span className="block text-sm md:text-[0.67rem] tracking-[0.2em] uppercase text-paper/60 font-semibold mb-5">
              Start a Project
            </span>
            <h2
              className="font-display font-bold md:font-normal uppercase text-paper leading-[0.95] md:leading-[0.9] tracking-[-0.02em] md:tracking-[-0.035em] mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 4.8rem)" }}
            >
              Let&apos;s build<br />
              something real.
            </h2>
            <p className="text-paper/60 text-lg md:text-base leading-snug md:leading-relaxed mb-10 max-w-sm">
              Tell us about your project. We'll get back within 24 hours — with real thoughts, not a template reply.
            </p>

            {/* Trust signals */}
            <div className="space-y-4">
              {[
                { icon: "↗", text: "No commitment required" },
                { icon: "◎", text: "Response within 24 hours" },
                { icon: "✦", text: "Real reply, not a sales script" },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full border border-paper/10 flex items-center justify-center text-ember text-xs flex-shrink-0">
                    {item.icon}
                  </span>
                  <span className="text-paper/60 text-base md:text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp — for people who'd rather message than fill in a form */}
            <div className="mt-10 border-t border-paper/10 pt-8">
              <p className="mb-4 text-sm md:text-xs font-semibold uppercase tracking-[0.14em] text-paper/50">
                Prefer WhatsApp?
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                {WHATSAPP.map((w) => (
                  <a
                    key={w.region}
                    href={w.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full border border-paper/15 py-2.5 pl-3 pr-5 transition-colors duration-200 hover:border-[#25D366] hover:bg-[#25D366]/10"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                        <path d={WHATSAPP_ICON_PATH} />
                      </svg>
                    </span>
                    <span className="leading-tight">
                      <span className="block text-xs md:text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-paper/50">{w.region}</span>
                      <span className="block text-base md:text-sm font-medium text-paper">{w.display}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: form ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.14, ease: EASE }}
          >
            {submitted ? (
              <motion.div
                className="rounded-2xl border border-paper/[0.07] p-10 flex flex-col items-center text-center gap-6"
                style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.02) 100%)" }}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <motion.div
                  className="w-14 h-14 rounded-full bg-ember/12 border border-ember/25 flex items-center justify-center"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-ember" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </motion.div>
                <div>
                  <h3 className="font-display font-black text-paper text-2xl mb-2">You're in.</h3>
                  <p className="text-paper/48 text-sm leading-relaxed max-w-xs">
                    Our pricing brochure is on its way to{" "}
                    <span className="text-paper/70 font-medium">{form.email}</span>.
                    We&apos;ll review your project and reply within 24 hours.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-paper/[0.07] p-8 md:p-10 space-y-5"
                style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.02) 100%)" }}
              >
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Your name *">
                    <input
                      type="text"
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      className={INPUT}
                      required
                    />
                  </Field>
                  <Field label="Email *">
                    <input
                      type="email"
                      placeholder="jane@company.com"
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      className={INPUT}
                      required
                    />
                  </Field>
                </div>

                {/* Company */}
                <Field label="Company / Brand">
                  <input
                    type="text"
                    placeholder="Acme Inc."
                    value={form.company}
                    onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
                    className={INPUT}
                  />
                </Field>

                {/* Location — picks the brochure (and currency) we email back */}
                <Field label="Where are you based? *">
                  <div role="radiogroup" className="flex flex-wrap gap-2 mt-0.5">
                    {LOCATIONS.map(l => {
                      const on = form.location === l.id;
                      return (
                        <button
                          key={l.id}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          onClick={() => setForm(p => ({ ...p, location: l.id }))}
                          className={`px-4 py-2 rounded-full text-sm md:text-[0.75rem] font-semibold border transition-all duration-200 cursor-pointer ${
                            on
                              ? "border-ember/60 bg-ember/12 text-paper"
                              : "border-paper/[0.1] bg-paper/[0.04] text-paper/42 hover:border-paper/22 hover:text-paper/65"
                          }`}
                        >
                          {l.label}
                        </button>
                      );
                    })}
                  </div>
                </Field>

                {/* Services */}
                <Field label="What are you after?">
                  <div className="flex flex-wrap gap-2 mt-0.5">
                    {SERVICES.map(s => {
                      const on = form.services.includes(s.id);
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => toggle(s.id)}
                          className={`px-4 py-2 rounded-full text-sm md:text-[0.75rem] font-semibold border transition-all duration-200 cursor-pointer ${
                            on
                              ? "border-ember/60 bg-ember/12 text-paper"
                              : "border-paper/[0.1] bg-paper/[0.04] text-paper/42 hover:border-paper/22 hover:text-paper/65"
                          }`}
                        >
                          {s.label}
                        </button>
                      );
                    })}
                  </div>
                </Field>

                {/* Message */}
                <Field label="Tell us about your project *">
                  <textarea
                    rows={5}
                    placeholder="What's the challenge you're trying to solve? The more specific, the better."
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className={`${INPUT} resize-none leading-relaxed`}
                    required
                  />
                </Field>

                {/* Submit */}
                {error && (
                  <p className="text-red-400 text-xs">{error}</p>
                )}
                <div className="flex items-center justify-between pt-1 gap-4">
                  <p className="text-paper/50 text-sm md:text-xs leading-snug">
                    No commitment. We'll reply within 24 hours.
                  </p>
                  <button
                    type="submit"
                    disabled={!valid || loading}
                    className={`flex-shrink-0 inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm tracking-wide transition-all duration-200 ${
                      valid && !loading
                        ? "bg-ember text-paper hover:bg-ember-dark hover:scale-[1.04] active:scale-95 cursor-pointer"
                        : "bg-paper/[0.07] text-paper/22 cursor-not-allowed"
                    }`}
                  >
                    {loading ? "Sending…" : "Send it"}
                    {!loading && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

const INPUT = "w-full bg-paper/[0.06] border border-paper/[0.1] rounded-xl px-4 py-3 text-paper placeholder-paper/30 text-base md:text-sm outline-none focus:border-ember/50 focus:bg-paper/[0.08] transition-all duration-200";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-paper/60 text-xs md:text-[0.67rem] tracking-[0.13em] uppercase font-semibold">{label}</span>
      {children}
    </div>
  );
}
