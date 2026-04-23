import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { name, email, company, services, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const servicesText = services?.length ? services.join(", ") : "None selected";

  try {
    await transporter.sendMail({
      from: `"Thinkr Studio" <${process.env.GMAIL_USER}>`,
      to: "thinkrstudiobd@gmail.com",
      replyTo: email,
      subject: `New inquiry from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
          <h2 style="margin-bottom:4px;">New project inquiry</h2>
          <p style="color:#666;margin-top:0;">Someone filled out the contact form on Thinkr Studio.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#999;width:120px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#999;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#e05a2b;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#999;">Company</td><td style="padding:8px 0;">${company || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#999;">Services</td><td style="padding:8px 0;">${servicesText}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
          <p style="color:#999;margin-bottom:6px;">Message</p>
          <p style="background:#f9f9f9;padding:16px;border-radius:8px;white-space:pre-wrap;">${message}</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("[contact] sendMail error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
