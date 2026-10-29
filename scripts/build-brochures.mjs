// Builds the pricing brochures (one PDF per region) into public/brochures/.
//   npm run brochures
// Prices and copy come from lib/pricing.ts; contact details from lib/contact.ts.
// Uses the locally installed Google Chrome (override with CHROME_PATH).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { REGIONS, WEBSITE_TIERS, ADS, EXCLUSIONS, PRICES_AS_OF, formatPrice } from "../lib/pricing.ts";
import { EMAIL, WHATSAPP } from "../lib/contact.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT  = path.join(ROOT, "public", "brochures");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const list = (items) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;

function html(region) {
  const r = REGIONS[region];
  // The currency is printed under every price, so BDT amounts show just the number.
  const price = (amount) => esc(region === "ca" ? formatPrice(region, amount) : amount.toLocaleString("en-US"));
  // Put the reader's own WhatsApp number first.
  const whatsapp = [...WHATSAPP.filter((w) => w.region === r.name), ...WHATSAPP.filter((w) => w.region !== r.name)];

  const contactRows = `
    <div><span>Web</span>thinkrstudio.com</div>
    <div><span>Email</span>${esc(EMAIL)}</div>
    ${whatsapp.map((w) => `<div><span>WhatsApp ${esc(w.region)}</span>${esc(w.display)}</div>`).join("")}`;

  const tiers = WEBSITE_TIERS.map((t, i) => `
    <div class="tier">
      <div class="tier-head">
        <p class="num">0${i + 1}</p>
        <h3>${esc(t.name)}</h3>
        <p class="summary">${esc(t.summary)}</p>
      </div>
      <div class="tier-price">
        <p class="amount">${price(t.price[region])}</p>
        <p class="unit">${esc(r.currency)} · one-time</p>
      </div>
      <div class="tier-features">${list(t.features)}</div>
    </div>`).join("");

  const adBlock = (b) => `
    <div class="ad">
      <p class="eyebrow">${esc(b.name)}</p>
      <p class="amount">${price(b.price[region])}</p>
      <p class="unit">${esc(r.currency)} · ${esc(b.note)}</p>
      ${list(b.features)}
    </div>`;

  return `<!doctype html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;600;700&display=block" rel="stylesheet">
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: "Familjen Grotesk", system-ui, sans-serif; color: #111; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page { width: 210mm; height: 297mm; padding: 18mm 16mm; position: relative; overflow: hidden; page-break-after: always; display: flex; flex-direction: column; }
  .page:last-child { page-break-after: auto; }
  .ember { color: #c16934; }
  .eyebrow { font-size: 9.5pt; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: #c16934; }
  h2 { font-size: 46pt; font-weight: 400; text-transform: uppercase; letter-spacing: -0.035em; line-height: 0.9; margin: 3mm 0 4mm; }
  .intro { font-size: 11pt; line-height: 1.45; color: #444; max-width: 125mm; }
  ul { list-style: none; }
  li { font-size: 9.5pt; line-height: 1.35; padding-left: 4.5mm; position: relative; margin-bottom: 1.6mm; color: #222; }
  li::before { content: ""; position: absolute; left: 0; top: 1.9mm; width: 1.6mm; height: 1.6mm; border-radius: 50%; background: #c16934; }
  .amount { font-size: 26pt; font-weight: 700; letter-spacing: -0.02em; line-height: 1; }
  .unit { font-size: 8.5pt; text-transform: uppercase; letter-spacing: 0.1em; color: #777; margin-top: 1.5mm; }
  .foot { margin-top: auto; display: flex; justify-content: space-between; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.1em; color: #888; border-top: 1px solid #e5e5e5; padding-top: 4mm; }

  /* Cover */
  .cover { background: #0a0a0a; color: #fff; }
  .logo { font-size: 30pt; font-weight: 700; letter-spacing: -0.03em; }
  .cover-title { margin-top: auto; }
  .cover-title h1 { font-size: 72pt; font-weight: 400; text-transform: uppercase; letter-spacing: -0.04em; line-height: 0.86; }
  .pill { display: inline-block; margin-top: 8mm; border: 1px solid rgba(255,255,255,0.35); border-radius: 999px; padding: 2.2mm 5mm; font-size: 10pt; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; }
  .cover-lede { margin-top: 8mm; font-size: 12pt; line-height: 1.45; color: rgba(255,255,255,0.65); max-width: 120mm; }
  .cover-contact { margin-top: 16mm; display: grid; grid-template-columns: 1fr 1fr; gap: 4mm 10mm; font-size: 10pt; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 7mm; }
  .cover-contact span, .contact-strip span { display: block; font-size: 7.5pt; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.45); margin-bottom: 1mm; }

  /* Websites */
  .tiers { margin-top: 9mm; display: flex; flex-direction: column; gap: 5mm; }
  .tier { display: grid; grid-template-columns: 54mm 38mm 1fr; gap: 6mm; background: #f2f2f0; border-radius: 4mm; padding: 6mm; }
  .tier .num { font-size: 9pt; font-weight: 600; color: #c16934; }
  .tier h3 { font-size: 17pt; font-weight: 700; text-transform: uppercase; letter-spacing: -0.01em; line-height: 1; margin: 2mm 0 2.5mm; }
  .tier .summary { font-size: 9.5pt; line-height: 1.4; color: #555; }
  .tier-price { border-left: 1px solid #ddd; padding-left: 6mm; }

  /* Ads */
  .ads { margin-top: 9mm; display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; }
  .ad { background: #f2f2f0; border-radius: 4mm; padding: 6mm; }
  .ad .amount { margin-top: 3mm; }
  .ad ul { margin-top: 5mm; }
  .excluded { margin-top: 6mm; border: 1.5px solid #111; border-radius: 4mm; padding: 5mm 6mm; }
  .excluded .eyebrow { color: #111; margin-bottom: 3mm; }
  .excluded li::before { background: #111; }
  .steps { margin-top: 9mm; display: grid; grid-template-columns: repeat(4, 1fr); gap: 4mm; }
  .step { border-top: 1.5px solid #111; padding-top: 3mm; }
  .step p:first-child { font-size: 9pt; font-weight: 600; color: #c16934; }
  .step p:last-child { font-size: 9.5pt; line-height: 1.35; margin-top: 1.5mm; }
  .contact-strip { margin-top: 9mm; background: #0a0a0a; color: #fff; border-radius: 4mm; padding: 6mm; display: grid; grid-template-columns: repeat(2, 1fr); gap: 4mm 8mm; font-size: 10pt; }
  .contact-strip .cta { grid-column: 1 / -1; font-size: 16pt; font-weight: 700; text-transform: uppercase; letter-spacing: -0.01em; }
</style></head>
<body>

<section class="page cover">
  <p class="logo">Thinkr<span class="ember">.</span></p>
  <div class="cover-title">
    <h1>Pricing &amp;<br>Packages</h1>
    <span class="pill">${esc(r.name)} · Prices in ${esc(r.currency)}</span>
    <p class="cover-lede">Brand-forward websites and Meta advertising for growing businesses. Clear, fixed prices with no surprises.</p>
  </div>
  <div class="cover-contact">${contactRows}</div>
</section>

<section class="page">
  <p class="eyebrow">01 · Websites</p>
  <h2>Websites</h2>
  <p class="intro">Three packages, from a single landing page to a fully custom site. Every site is mobile-friendly, fast and built to bring you enquiries.</p>
  <div class="tiers">${tiers}</div>
  <div class="foot"><span>Thinkr Studio · ${esc(r.name)}</span><span>Prices in ${esc(r.currency)} as of ${esc(PRICES_AS_OF)}</span></div>
</section>

<section class="page">
  <p class="eyebrow">02 · Digital marketing</p>
  <h2>${esc(ADS.title)}</h2>
  <p class="intro">${esc(ADS.summary)} One setup fee to get you live, then a simple monthly plan.</p>
  <div class="ads">${adBlock(ADS.setup)}${adBlock(ADS.monthly)}</div>
  <div class="excluded">
    <p class="eyebrow">Not included in our prices</p>
    ${list(EXCLUSIONS)}
  </div>
  <div class="steps">
    <div class="step"><p>01</p><p>Tell us about your project</p></div>
    <div class="step"><p>02</p><p>We confirm the package and timeline</p></div>
    <div class="step"><p>03</p><p>We design, build and set up</p></div>
    <div class="step"><p>04</p><p>You launch and start growing</p></div>
  </div>
  <div class="contact-strip">
    <p class="cta">Ready to start? Let&#39;s talk.</p>
    ${contactRows}
  </div>
  <div class="foot"><span>Thinkr Studio · ${esc(r.name)}</span><span>Prices in ${esc(r.currency)} as of ${esc(PRICES_AS_OF)}</span></div>
</section>

</body></html>`;
}

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" },
);
const page = await browser.newPage();
for (const region of Object.keys(REGIONS)) {
  await page.setContent(html(region), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const file = path.join(OUT, REGIONS[region].file);
  await page.pdf({ path: file, format: "A4", printBackground: true, preferCSSPageSize: true });
  console.log("wrote", path.relative(ROOT, file));
}
await browser.close();
