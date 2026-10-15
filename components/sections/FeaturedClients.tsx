import { WORK, isOngoing } from "@/lib/work";
import { findMedia, LOGO_EXTS } from "@/lib/find-media";

// Logos live in /public/clients/<slug>.svg|png|webp and are shown in monochrome.
// Until one exists, the client name is set as a simple wordmark.
export default function FeaturedClients() {
  const clients = WORK.filter((p) => p.featured).map((p) => ({
    ...p,
    logo:    findMedia("clients", p.slug, LOGO_EXTS),
    ongoing: isOngoing(p),
  }));

  if (clients.length === 0) return null;

  return (
    <section id="clients" className="py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2
          className="font-display font-bold md:font-normal uppercase text-ink leading-[0.95] md:leading-[0.9] tracking-[-0.02em] md:tracking-[-0.035em] mb-12 md:mb-20"
          style={{ fontSize: "clamp(2rem, 5.6vw, 5.25rem)" }}
        >
          Featured Clients
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
          {clients.map((c) => (
            <article key={c.slug} className="flex flex-col">
              <div className="h-14 mb-7 flex items-center">
                {c.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element -- logos are mixed SVG/PNG with unknown aspect ratios
                  <img
                    src={c.logo}
                    alt={c.name}
                    className="max-h-12 max-w-[180px] w-auto object-contain brightness-0 opacity-85"
                  />
                ) : (
                  <span className="font-display text-2xl font-bold uppercase tracking-[-0.02em] leading-none text-ink">
                    {c.name}
                  </span>
                )}
              </div>

              <p className="text-lg md:text-[0.95rem] leading-snug md:leading-relaxed text-ink/75 mb-8">
                {c.story}
              </p>

              {c.href && (
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto self-start inline-flex items-center rounded-full bg-ink px-4 py-2 md:px-3.5 md:py-1.5 text-xs md:text-[0.62rem] font-semibold uppercase tracking-[0.04em] text-white transition-colors duration-200 hover:bg-ember"
                >
                  {c.ongoing ? "View preview" : "View work"}
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
