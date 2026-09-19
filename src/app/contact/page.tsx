import type { Metadata } from "next";

import ContactForm from "@/components/ContactForm";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Rizcent Technologies for software development, web development, SaaS and cybersecurity services.",
};

export default function ContactPage() {
  return (
    <main className="overflow-hidden bg-white">
      {/* =====================================================================
          HERO
      ===================================================================== */}
      <section className="relative overflow-hidden bg-[#080b14] text-white">
        {/* Ambient lighting */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-indigo-600/[0.12] blur-[140px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 -right-40 h-[520px] w-[520px] rounded-full bg-cyan-500/[0.08] blur-[140px]"
        />

        {/* Grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* Top light */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent"
        />

        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300 backdrop-blur-xl">
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" />
              </span>

              Contact Rizcent
            </div>

            {/* Heading */}
            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[76px]">
              Let&apos;s build
              <span className="block text-slate-500">
                something
              </span>

              <span className="block bg-gradient-to-r from-indigo-300 via-white to-cyan-300 bg-clip-text text-transparent">
                meaningful.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              Have a project, business challenge or technology requirement?
              Tell us what you&apos;re working on and let&apos;s start a
              conversation.
            </p>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/[0.07] pt-7">
              {[
                "Software Engineering",
                "Cybersecurity",
                "Cloud Technology",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs font-medium text-slate-500"
                >
                  <span className="h-1 w-1 rounded-full bg-indigo-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom edge */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" />
      </section>

      {/* =====================================================================
          CONTACT INFORMATION + FORM
      ===================================================================== */}
      <section className="relative bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          {/* -----------------------------------------------------------------
              INFORMATION
          ----------------------------------------------------------------- */}
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
              Get in touch
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              We&apos;d love to hear from you.
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              Whether you&apos;re starting a new product, improving an
              existing system or looking to strengthen your cybersecurity,
              our team is ready to understand your requirements.
            </p>

            {/* Contact details */}
            <div className="mt-10 space-y-7">
              {/* Email */}
              <div className="group">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Email
                </div>

                <a
                  href="mailto:info@rizcent.io"
                  className="mt-2 block font-semibold text-slate-950"
                >
                  info@rizcent.io
                </a>
              </div>

              {/* Phone */}
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Phone
                </div>

                <a
                  href="tel:+91 89406 31913"
                  className="mt-2 block font-semibold text-slate-950"
                >
                  +91 89406 31913
                </a>
              </div>

              {/* Location */}
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Location
                </div>

                <p className="mt-2 font-semibold text-slate-950">
                  India
                </p>
              </div>

              {/* Hours */}
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Business Hours
                </div>

                <p className="mt-2 font-semibold text-slate-950">
                  Monday – Friday
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  9:00 AM – 6:00 PM
                </p>
              </div>
            </div>

            {/* Project enquiry card */}
            <div className="relative mt-10 overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 p-6 sm:p-7">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-500/[0.06] blur-3xl"
              />

              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-sm font-bold text-indigo-600">
                    R
                  </div>

                  <div>
                    <div className="font-semibold text-slate-950">
                      Need a detailed project discussion?
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Use our project enquiry form to share your
                      requirements, budget and expected timeline.
                    </p>
                  </div>
                </div>

                {/* NO HOVER EFFECT */}
                <div className="mt-6">
                  <Button
                    href="/request-quote"
                    variant="dark"
                  >
                    Request a Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              FORM
          ----------------------------------------------------------------- */}
          <div className="relative">
            {/* Form glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 rounded-[40px] bg-indigo-500/[0.04] blur-3xl"
            />

            <div className="relative rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10">
              {/* Form header */}
              <div className="border-b border-slate-100 pb-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  Project enquiry
                </div>

                <div className="mt-5 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Send us a message
                </div>

                <p className="mt-2 max-w-lg text-sm leading-6 text-slate-600">
                  Tell us about your project and our team will get back to
                  you with the next steps.
                </p>
              </div>

              {/* Contact form */}
              <div className="pt-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FAQ
      ===================================================================== */}
      <section className="relative overflow-hidden bg-[#f7f8fc] py-20 sm:py-24">
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/[0.05] blur-[100px]"
        />

        <div className="relative mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
              FAQ
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Common questions
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
              A few things businesses commonly ask before starting a
              technology project with us.
            </p>
          </div>

          {/* FAQ items */}
          <div className="mt-12 space-y-4">
            <details className="group rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold text-slate-950">
                <span>
                  What happens after I contact you?
                </span>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500">
                  +
                </span>
              </summary>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
                We review your requirements and contact you to understand
                the project, goals, scope and next steps.
              </p>
            </details>

            <details className="group rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold text-slate-950">
                <span>
                  Can you work with an existing application?
                </span>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500">
                  +
                </span>
              </summary>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
                Yes. We can work with existing applications, APIs,
                infrastructure and codebases depending on the project
                requirements.
              </p>
            </details>

            <details className="group rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold text-slate-950">
                <span>
                  Do you work with startups?
                </span>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500">
                  +
                </span>
              </summary>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
                Yes. We can help startups with MVP development, SaaS
                products, websites, mobile applications and technology
                planning.
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}