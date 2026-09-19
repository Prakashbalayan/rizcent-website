import Link from "next/link";

interface ServiceCTAProps {
  title?: string;
  description?: string;
}

export default function ServiceCTA({
  title = "Ready to build something better?",
  description = "Tell us what you're building, what you're trying to solve, or where you need help.",
}: ServiceCTAProps) {
  return (
    <section className="relative overflow-hidden bg-[#f7f9fc] py-20 sm:py-24 lg:py-28">
      {/* Outer background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-180px] top-[-160px] h-[420px] w-[420px] rounded-full bg-indigo-200/30 blur-[110px]" />
        <div className="absolute bottom-[-180px] right-[-140px] h-[460px] w-[460px] rounded-full bg-cyan-200/30 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.045) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="group relative overflow-hidden rounded-[32px] border border-indigo-200/20 bg-[#080d1d] shadow-[0_35px_100px_rgba(15,23,42,0.22)] sm:rounded-[40px]">
          {/* Animated gradient border */}
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(120deg,transparent_20%,rgba(99,102,241,0.5),rgba(34,211,238,0.45),transparent_80%)] opacity-60 blur-[1px]" />

          {/* Inner panel */}
          <div className="relative m-px overflow-hidden rounded-[31px] bg-[#080d1d] sm:rounded-[39px]">
            {/* Main background glow */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-[-240px] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
              <div className="absolute bottom-[-260px] left-[8%] h-[430px] w-[430px] rounded-full bg-cyan-500/15 blur-[120px]" />
              <div className="absolute bottom-[-280px] right-[4%] h-[460px] w-[460px] rounded-full bg-blue-600/15 blur-[130px]" />

              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
                  backgroundSize: "42px 42px",
                }}
              />

              <div className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.055] sm:h-[600px] sm:w-[600px]" />

              <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035] sm:h-[820px] sm:w-[820px]" />

              <div className="absolute left-[12%] top-[18%] h-1 w-1 rounded-full bg-cyan-300 shadow-[0_0_18px_5px_rgba(103,232,249,0.55)]" />
              <div className="absolute right-[16%] top-[28%] h-1.5 w-1.5 rounded-full bg-indigo-300 shadow-[0_0_20px_6px_rgba(129,140,248,0.45)]" />
              <div className="absolute bottom-[22%] left-[20%] h-1 w-1 rounded-full bg-blue-300 shadow-[0_0_18px_5px_rgba(147,197,253,0.45)]" />
            </div>

            {/* Premium corner accents */}
            <div className="absolute left-5 top-5 h-12 w-12 border-l border-t border-cyan-300/40 sm:left-8 sm:top-8 sm:h-16 sm:w-16" />
            <div className="absolute right-5 top-5 h-12 w-12 border-r border-t border-indigo-300/40 sm:right-8 sm:top-8 sm:h-16 sm:w-16" />
            <div className="absolute bottom-5 left-5 h-12 w-12 border-b border-l border-indigo-300/40 sm:bottom-8 sm:left-8 sm:h-16 sm:w-16" />
            <div className="absolute bottom-5 right-5 h-12 w-12 border-b border-r border-cyan-300/40 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16" />

            <div className="relative mx-auto max-w-4xl px-6 py-14 text-center text-white sm:px-12 sm:py-20 lg:px-20 lg:py-24">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-300 sm:text-xs">
                  Let&apos;s work together
                </span>
              </div>

              {/* Heading */}
              <h2 className="mx-auto mt-7 max-w-3xl text-3xl font-semibold leading-[1.12] tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
                {title}
              </h2>

              {/* Gradient divider */}
              <div className="mx-auto mt-8 flex items-center justify-center gap-2">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-indigo-400/70 sm:w-16" />
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.8)]" />
                <span className="h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 via-blue-400 to-cyan-400 shadow-[0_0_18px_rgba(96,165,250,0.4)] sm:w-24" />
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.8)]" />
                <span className="h-px w-10 bg-gradient-to-l from-transparent to-indigo-400/70 sm:w-16" />
              </div>

              {/* Description */}
              <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-slate-300 sm:text-lg sm:leading-8">
                {description}
              </p>

              {/* CTA buttons */}
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/request-quote"
                  className="group/button inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-slate-950 shadow-[0_14px_35px_rgba(255,255,255,0.12)] transition-all duration-300 hover:-translate-y-1 hover:bg-slate-100 hover:shadow-[0_20px_45px_rgba(255,255,255,0.2)] sm:w-auto"
                >
                  <span>Request a Quote</span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-white transition-transform duration-300 group-hover/button:translate-x-1">
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 10h11M10 5l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="group/button inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.055] px-7 py-4 text-sm font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/[0.1] hover:shadow-[0_14px_35px_rgba(34,211,238,0.08)] sm:w-auto"
                >
                  <span>Contact Us</span>

                  <span className="text-lg leading-none text-cyan-300 transition-transform duration-300 group-hover/button:translate-x-1 group-hover/button:-translate-y-0.5">
                    ↗
                  </span>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 border-t border-white/10 pt-7">
                <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4 text-xs text-slate-400 sm:text-sm">
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.65)]" />
                    Clear communication
                  </span>

                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.65)]" />
                    Security-first approach
                  </span>

                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.65)]" />
                    Built for long-term growth
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 