import Link from "next/link";

import Container from "../ui/Container";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#080b14] px-7 py-16 text-center shadow-2xl shadow-slate-950/10 sm:px-12 lg:px-20 lg:py-24">
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 -top-40 h-[420px] w-[420px] rounded-full bg-indigo-600/20 blur-[120px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -right-32 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[120px]"
          />

          {/* Subtle grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />

          {/* Top light */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent"
          />

          <div className="relative z-10">
            {/* Brand mark */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] border border-indigo-300/20 bg-gradient-to-br from-indigo-500 to-indigo-700 text-xl font-bold text-white shadow-xl shadow-indigo-500/20">
              R
            </div>

            {/* Eyebrow */}
            <div className="mt-7 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              Build with Rizcent
            </div>

            {/* Heading */}
            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
              Have a technology

              <span className="block bg-gradient-to-r from-indigo-300 via-white to-cyan-300 bg-clip-text text-transparent">
                challenge to solve?
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
              Partner with Rizcent Technologies to design, build and secure
              digital solutions that support your business objectives and
              scale with your organization.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {/* Primary */}
              <Link
                href="/request-quote"
                className="group relative inline-flex min-h-[50px] items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500 hover:text-white hover:shadow-2xl hover:shadow-indigo-500/25 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:ring-offset-2 focus:ring-offset-[#080b14]"
              >
                {/* Shine */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />

                <span className="relative z-10 whitespace-nowrap text-slate-950 transition-colors duration-300 group-hover:text-white">
                  Discuss Your Project
                </span>

                <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 text-xs text-slate-950 transition-all duration-300 group-hover:bg-white group-hover:text-indigo-600">
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Link>

              {/* Secondary */}
              <Link
                href="/contact"
                className="group relative inline-flex min-h-[50px] items-center justify-center gap-3 overflow-hidden rounded-full border border-white/15 bg-white/[0.05] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400/40 hover:bg-white/[0.09] hover:shadow-xl hover:shadow-indigo-950/20 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
              >
                <span className="relative z-10 whitespace-nowrap text-white">
                  Talk to Our Team
                </span>

                <span className="relative z-10 text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-indigo-300">
                  →
                </span>
              </Link>
            </div>

            {/* Trust line */}
            <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/[0.07] pt-7">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="h-1 w-1 rounded-full bg-indigo-400" />
                Software Engineering
              </div>

              <div className="hidden h-3 w-px bg-white/10 sm:block" />

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="h-1 w-1 rounded-full bg-cyan-400" />
                Digital Products
              </div>

              <div className="hidden h-3 w-px bg-white/10 sm:block" />

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                Cybersecurity &amp; Cloud
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}