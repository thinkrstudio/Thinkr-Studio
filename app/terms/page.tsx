import Link from "next/link";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Terms of Service — Thinkr Studio",
  description: "The terms and conditions governing your use of Thinkr Studio services.",
};

const sections = [
  {
    title: "1. Services",
    body: [
      "Thinkr Studio ('we', 'us', 'our') provides web design, web development, brand identity, motion design, and digital strategy services ('Services') to clients ('you', 'your') as agreed in individual project proposals or statements of work.",
      "The scope, timeline, and deliverables for each project are defined in a separate project proposal or agreement signed by both parties. These Terms govern the broader relationship between Thinkr Studio and its clients and apply to all projects unless otherwise superseded by a specific written agreement.",
    ],
  },
  {
    title: "2. Project Engagement",
    body: [
      "Work begins only after a written project proposal has been accepted and any required deposit has been received. Verbal instructions or email requests do not constitute an authorised change of scope.",
      "Any changes to the agreed scope of work must be submitted in writing and may result in revised timelines and additional fees. We will provide a written estimate for any scope changes before proceeding.",
    ],
  },
  {
    title: "3. Payment Terms",
    body: [
      "Unless otherwise stated in your project proposal, our standard payment schedule is: 50% deposit upon project commencement and 50% upon project completion prior to final delivery or launch.",
      "Invoices are due within 14 days of issue. Late payments beyond 30 days may incur a late fee of 1.5% per month on the outstanding balance. We reserve the right to pause or suspend active work on any project where payment is overdue.",
      "All prices are quoted exclusive of applicable taxes. Clients are responsible for any taxes applicable in their jurisdiction.",
    ],
  },
  {
    title: "4. Intellectual Property",
    body: [
      "Upon receipt of full payment, all final deliverables created specifically for your project are assigned to you. This includes design files, source code, and brand assets produced as part of the agreed scope.",
      "We retain ownership of all preliminary concepts, drafts, and explorations not selected for final delivery. We also retain the right to use completed work in our portfolio and marketing materials unless you request otherwise in writing at the time of project completion.",
      "Third-party assets (stock photography, licensed fonts, icon libraries, open-source libraries) are subject to their own licence terms. We will inform you of any third-party licences that require your attention.",
    ],
  },
  {
    title: "5. Client Responsibilities",
    body: [
      "Timely and accurate provision of content, feedback, and approvals is essential to keeping projects on schedule. Delays caused by late feedback or missing assets may result in revised delivery dates.",
      "You are responsible for ensuring that any materials, copy, or content you provide to us do not infringe the intellectual property rights of third parties, and that you have the necessary rights to use them.",
      "You are responsible for obtaining any required legal or regulatory approvals for your final product, including but not limited to privacy policy requirements, accessibility compliance, and industry-specific regulations.",
    ],
  },
  {
    title: "6. Revisions",
    body: [
      "The number of revision rounds included in each project phase is specified in your project proposal. Revisions beyond the agreed number will be billed at our standard hourly rate.",
      "A 'revision' means a refinement of an approved direction. A change in direction, a new concept, or a fundamental change to previously approved work constitutes a scope change and will be treated accordingly.",
    ],
  },
  {
    title: "7. Timelines and Delivery",
    body: [
      "We will provide estimated timelines in your project proposal. These are good-faith estimates based on the information available at the time of writing. Final timelines depend on timely feedback and approvals from both parties.",
      "We are not liable for delays caused by factors outside our reasonable control, including delayed client feedback, third-party service outages, or force majeure events.",
    ],
  },
  {
    title: "8. Confidentiality",
    body: [
      "Both parties agree to keep confidential any non-public information shared during the course of the engagement and not to disclose it to third parties without prior written consent, except as required by law.",
      "This obligation of confidentiality continues for a period of two years following the completion or termination of the project.",
    ],
  },
  {
    title: "9. Warranties and Limitation of Liability",
    body: [
      "We warrant that we will perform our Services with reasonable skill and care, and that our deliverables will conform to the agreed specifications at the time of delivery.",
      "We do not warrant that a completed website will achieve any specific commercial outcome, search engine ranking, or conversion rate. Results depend on many factors outside our control.",
      "To the maximum extent permitted by applicable law, our total liability to you for any claim arising out of or in connection with our Services shall not exceed the total fees paid by you for the specific project giving rise to the claim.",
      "We are not liable for any indirect, incidental, or consequential damages, including loss of profit, loss of data, or business interruption.",
    ],
  },
  {
    title: "10. Termination",
    body: [
      "Either party may terminate a project engagement with 14 days' written notice. In the event of termination, you are liable for payment of all work completed up to the date of termination, calculated on a pro-rata basis against the total project fee.",
      "We reserve the right to terminate immediately and without notice if payment is overdue by more than 30 days, or if you engage in conduct that we reasonably determine to be abusive, unlawful, or harmful.",
      "Upon termination, any work in progress will be delivered in its current state. Transfer of ownership of any partially completed work is conditional on full payment for work completed to date.",
    ],
  },
  {
    title: "11. Governing Law",
    body: [
      "These Terms are governed by and construed in accordance with the laws of Bangladesh. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Bangladesh.",
    ],
  },
  {
    title: "12. Changes to These Terms",
    body: [
      "We may update these Terms from time to time. We will notify existing clients of material changes via email. Continued engagement with our Services following notice of changes constitutes acceptance of the updated Terms.",
      "These Terms were last updated in April 2026.",
    ],
  },
];

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-cream/45 text-base leading-relaxed">
            These terms govern your engagement with Thinkr Studio. Please read them carefully before starting a project with us.
            If you have any questions, email us at{" "}
            <a href="mailto:thinkrstudiobd@gmail.com" className="text-ember hover:underline">thinkrstudiobd@gmail.com</a>.
          </p>
          <p className="text-cream/28 text-sm mt-4">Last updated: April 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 px-6 md:px-10 lg:px-16 bg-cream">
        <div className="max-w-3xl mx-auto">
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
            <h3 className="font-display font-bold text-cream text-xl mb-3">Questions about these Terms?</h3>
            <p className="text-cream/55 text-sm leading-relaxed mb-5">
              We're happy to walk through any of this with you before you commit to working with us. Reach out and we'll respond within 24 hours.
            </p>
            <a
              href="mailto:thinkrstudiobd@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ember text-cream font-semibold text-sm hover:bg-ember-dark transition-colors duration-200"
            >
              Contact us
            </a>
          </div>

          <div className="mt-10 pt-10 border-t border-forest/10 flex flex-wrap gap-6 text-sm text-forest/40">
            <Link href="/privacy" className="hover:text-forest/70 transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-forest/70 transition-colors">Back to Home</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
