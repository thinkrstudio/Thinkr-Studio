import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { EMAIL } from "@/lib/contact";
import { ADS, REGIONS, WEBSITE_TIERS, formatPrice, type Region } from "@/lib/pricing";

// Form input goes into an HTML email, so escape it — otherwise a visitor could
// inject markup or links into the message we receive.
const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const LOCATION_LABELS: Record<string, string> = { ca: "Canada", bd: "Bangladesh", other: "Elsewhere" };

// Bangladesh gets BDT pricing; Canada and everyone else get CAD.
const regionFor = (location: string): Region => (location === "bd" ? "bd" : "ca");

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name || !body.email || !body.message || !LOCATION_LABELS[body.location]) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email))) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const name     = escapeHtml(body.name);
  const email    = escapeHtml(body.email);
  const company  = escapeHtml(body.company);
  const message  = escapeHtml(body.message);
  const location = LOCATION_LABELS[body.location];
  const services: string[] = Array.isArray(body.services) ? body.services.map(escapeHtml) : [];

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const servicesText = services.length ? services.join(", ") : "None selected";

  // 1. The inquiry, to us.
  try {
    await transporter.sendMail({
      from: `"Thinkr Studio" <${process.env.GMAIL_USER}>`,
      to: EMAIL,
      replyTo: String(body.email),
      subject: `New inquiry from ${String(body.name)} (${location})`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
          <h2 style="margin-bottom:4px;">New project inquiry</h2>
          <p style="color:#666;margin-top:0;">Someone filled out the contact form on Thinkr Studio.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#999;width:120px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#999;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#e05a2b;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#999;">Based in</td><td style="padding:8px 0;">${location}</td></tr>
            <tr><td style="padding:8px 0;color:#999;">Company</td><td style="padding:8px 0;">${company || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#999;">Services</td><td style="padding:8px 0;">${servicesText}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
          <p style="color:#999;margin-bottom:6px;">Message</p>
          <p style="background:#f9f9f9;padding:16px;border-radius:8px;white-space:pre-wrap;">${message}</p>
          <p style="color:#999;font-size:12px;margin-top:20px;">They were sent the ${REGIONS[regionFor(body.location)].currency} pricing brochure.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("[contact] sendMail error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  // 2. The pricing brochure, to them. Their message is deliberately not echoed back,
  //    so the form can't be used to relay arbitrary text to someone else's inbox.
  //    A failure here is logged but doesn't fail the request: the inquiry reached us.
  try {
    const region   = regionFor(body.location);
    const r        = REGIONS[region];
    const pdfUrl   = `${new URL(request.url).origin}/brochures/${r.file}`;
    const firstName = escapeHtml(String(body.name).trim().split(/\s+/)[0].slice(0, 40));

    const pdf = await fetch(pdfUrl).then((res) => (res.ok ? res.arrayBuffer() : null)).catch(() => null);

    const row = (label: string, value: string) =>
      `<tr><td style="padding:6px 0;color:#444;">${label}</td><td style="padding:6px 0;text-align:right;font-weight:600;">${value}</td></tr>`;

    await transporter.sendMail({
      from: `"Thinkr Studio" <${process.env.GMAIL_USER}>`,
      to: String(body.email),
      replyTo: EMAIL,
      subject: `Thinkr Studio pricing (${r.name}, ${r.currency})`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111;">
          <p style="font-size:22px;font-weight:700;margin:0 0 20px;">Thinkr<span style="color:#c16934;">.</span></p>
          <p>Hi ${firstName},</p>
          <p>Thanks for getting in touch. We'll read your message and reply within 24 hours.</p>
          <p>In the meantime, here's our pricing${pdf ? " (the full brochure is attached)" : ""}:</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">
            ${WEBSITE_TIERS.map((t) => row(t.name, formatPrice(region, t.price[region]))).join("")}
            ${row(`${ADS.title}: ${ADS.setup.name}`, formatPrice(region, ADS.setup.price[region]))}
            ${row(`${ADS.title}: ${ADS.monthly.name}`, `${formatPrice(region, ADS.monthly.price[region])} / month`)}
          </table>
          <p style="color:#666;font-size:13px;">Prices are in ${r.currency}. Ad budget and domain registration are not included.</p>
          <p><a href="${pdfUrl}" style="color:#c16934;">Download the pricing brochure (PDF)</a></p>
          <p style="margin-top:28px;">Thinkr Studio<br /><a href="https://www.thinkrstudio.com" style="color:#111;">thinkrstudio.com</a></p>
        </div>
      `,
      attachments: pdf ? [{ filename: r.file, content: Buffer.from(pdf), contentType: "application/pdf" }] : [],
    });
  } catch (err) {
    console.error("[contact] brochure email error:", err);
  }

  return NextResponse.json({ ok: true });
}
