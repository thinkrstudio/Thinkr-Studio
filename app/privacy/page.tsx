import Link from "next/link";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Privacy Policy — Thinkr Studio",
  description: "How Thinkr Studio collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "1. Who We Are",
    body: [
      "Thinkr Studio is a web design and development studio. We operate the website at thinkrstudio.com and provide Services including web design, web development, brand identity, motion design, and digital strategy.",
      "For the purposes of this Privacy Policy, 'we', 'us', and 'our' refer to Thinkr Studio. 'You' refers to anyone who visits our website or enquires about or engages our Services.",
      "If you have any questions about how we handle your data, please contact us at thinkrstudiobd@gmail.com.",
    ],
  },
  {
    title: "2. What Information We Collect",
    body: [
      "Contact form submissions: When you fill out the contact form on our website, we collect your name, email address, company name (if provided), selected services of interest, and the message you write. This information is used solely to respond to your enquiry.",
      "Email correspondence: If you contact us directly by email, we retain those communications for the purpose of managing our relationship and responding to your requests.",
      "Website analytics: We may collect anonymised usage data about how visitors interact with our website, including pages visited, time spent on pages, and general geographic location (country or region level). This data is collected in aggregate and cannot be used to identify you personally.",
      "We do not collect payment card information directly. Any payments are processed through third-party payment processors that have their own privacy and security policies.",
    ],
  },
  {
    title: "3. How We Use Your Information",
    body: [
      "To respond to your enquiry and, if you become a client, to deliver the Services you have engaged us for.",
      "To communicate with you about your project, including sending invoices, project updates, and requesting approvals.",
      "To improve our website and services based on aggregated, anonymised analytics data.",
      "We do not sell, rent, or share your personal information with third parties for marketing purposes. We do not use your data for automated decision-making or profiling.",
    ],
  },
  {
    title: "4. Legal Basis for Processing",
    body: [
      "We process your personal data on the following legal bases:",
      "Contractual necessity: When you engage our Services, processing your contact and project details is necessary to fulfil our contract with you.",
      "Legitimate interest: We have a legitimate interest in responding to enquiries sent through our contact form and in understanding how our website performs.",
      "Consent: Where we rely on consent as a legal basis, you may withdraw that consent at any time by contacting us at thinkrstudiobd@gmail.com.",
    ],
  },
  {
    title: "5. How Long We Keep Your Data",
    body: [
      "Contact form enquiries that do not result in a project engagement are retained for up to 12 months, after which they are deleted.",
      "Project-related correspondence and files are retained for up to 5 years following project completion for accounting and legal record-keeping purposes.",
      "Analytics data is retained for up to 26 months before being automatically deleted or anonymised.",
    ],
  },
  {
    title: "6. Third-Party Services",
    body: [
      "We use the following third-party services in the operation of our website and business. Each operates under its own privacy policy:",
      "Email delivery (Gmail / Google Workspace): Contact form submissions are forwarded to our email inbox via Google's infrastructure. Google's privacy policy governs the handling of that data in transit.",
      "Website hosting (Vercel): Our website is hosted on Vercel. Vercel may collect server logs and performance data as part of its hosting service.",
      "Analytics: Where we use website analytics tools, data is processed in accordance with that tool's terms of service. We configure analytics tools to anonymise IP addresses where possible.",
      "We take reasonable steps to ensure that any third parties we work with maintain appropriate data protection standards.",
    ],
  },
  {
    title: "7. Cookies",
    body: [
      "Our website may use cookies to support basic functionality and, where analytics are enabled, to understand visitor behaviour. Cookies are small text files stored on your browser.",
      "You can configure your browser to refuse cookies or to alert you when cookies are being sent. Some features of our website may not function correctly if cookies are disabled.",
      "We do not use cookies for advertising or tracking across third-party websites.",
    ],
  },
  {
    title: "8. Your Rights",
    body: [
      "Depending on your jurisdiction, you may have the following rights in relation to your personal data:",
      "Right of access: You may request a copy of the personal data we hold about you.",
      "Right to rectification: You may ask us to correct inaccurate data we hold about you.",
      "Right to erasure: You may ask us to delete your personal data, subject to any legal obligations we have to retain it.",
      "Right to restrict processing: You may ask us to limit how we use your data in certain circumstances.",
      "Right to data portability: Where technically feasible, you may request that we provide your data in a structured, machine-readable format.",
      "To exercise any of these rights, contact us at thinkrstudiobd@gmail.com. We will respond within 30 days.",
    ],
  },
  {
    title: "9. Data Security",
    body: [
      "We take reasonable technical and organisational measures to protect your personal data from unauthorised access, loss, or misuse. These include restricted access to project files, use of secure email, and encrypted storage where applicable.",
      "No method of transmission over the internet is completely secure. While we do our best to protect your data, we cannot guarantee absolute security.",
      "In the event of a data breach that poses a risk to your rights and freedoms, we will notify you and, where required by law, the relevant supervisory authority, as promptly as practicable.",
    ],
  },
  {
    title: "10. Children's Privacy",
    body: [
      "Our website and Services are intended for businesses and adults. We do not knowingly collect personal data from anyone under the age of 16. If we become aware that we have inadvertently received personal data from a minor, we will delete it promptly.",
    ],
  },
  {
    title: "11. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or in applicable law. We will post the updated policy on this page with a revised effective date.",
      "If changes are material, we will notify active clients via email.",
      "This Privacy Policy was last updated in April 2026.",
    ],
  },
  {
    title: "12. Contact",
    body: [
      "For any questions, requests, or concerns about this Privacy Policy or how we handle your data, please contact us at thinkrstudiobd@gmail.com.",
      "We aim to respond to all privacy-related enquiries within 5 business days.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-forest-dark pt-36 pb-20 px-6 md:px-10 lg:px-16">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-cream/38 text-xs tracking-[0.15em] uppercase mb-10 hover:text-cream/60 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </Link>
          <span className="block text-[0.67rem] tracking-[0.2em] uppercase text-ember font-semibold mb-4">Legal</span>
          <h1 className="font-display font-black text-cream leading-tight tracking-tight mb-5" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
            Privacy Policy
          </h1>
          <p className="text-cream/45 text-base leading-relaxed">
            We believe in plain language. This policy explains what data we collect, why we collect it, and how we handle it.
            If anything is unclear, email us at{" "}
            <a href="mailto:thinkrstudiobd@gmail.com" className="text-ember hover:underline">thinkrstudiobd@gmail.com</a>.
          </p>
          <p className="text-cream/28 text-sm mt-4">Last updated: April 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 px-6 md:px-10 lg:px-16 bg-cream">
        <div className="max-w-3xl mx-auto">
          {/* Quick summary */}
          <div className="p-7 rounded-2xl bg-forest mb-14">
            <h2 className="font-display font-bold text-cream text-lg mb-4">The short version</h2>
            <ul className="space-y-2.5">
              {[
                "We collect only what we need to respond to your enquiry or deliver your project.",
                "We never sell your data. Ever.",
                "We don't run advertising or remarketing on our site.",
                "You can ask us to delete your data at any time.",
                "Contact form data stays in our inbox — we don't pipe it to a CRM.",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-ember mt-2 flex-shrink-0" />
                  <span className="text-cream/65 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-display font-bold text-forest text-2xl mb-5">{section.title}</h2>
                <div className="space-y-4">
                  {section.body.map((para, i) => (
                    <p key={i} className="text-forest/65 text-base leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-16 p-8 rounded-2xl bg-forest">
            <h3 className="font-display font-bold text-cream text-xl mb-3">Have a privacy question?</h3>
            <p className="text-cream/55 text-sm leading-relaxed mb-5">
              We'll give you a straight answer, not a boilerplate response. Reach out and we'll respond within a few business days.
            </p>
            <a
              href="mailto:thinkrstudiobd@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ember text-cream font-semibold text-sm hover:bg-ember-dark transition-colors duration-200"
            >
              Get in touch
            </a>
          </div>

          <div className="mt-10 pt-10 border-t border-forest/10 flex flex-wrap gap-6 text-sm text-forest/40">
            <Link href="/terms" className="hover:text-forest/70 transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-forest/70 transition-colors">Back to Home</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
