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
    <section className="relative overflow-hidden bg-[#f7f9fc] pb-24 sm:pb-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-140px] top-[-120px] h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="absolute bottom-[-160px] right-[-100px] h-96 w-96 rounded-full bg-cyan-200/25 blur-3xl" />

        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.045) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="group relative overflow-hidden rounded-[36px] border border-indigo-300/20 bg-[#0a1020] px-7 py-16 text-center text-white shadow-[0_30px_90px_rgba(15,23,42,0.2)] sm:px-12 sm:py-20 lg:px-20">
          {/* Animated background glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo-600/25 blur-[100px]" />
            <div className="absolute bottom-[-220px] left-[12%] h-[360px] w-[360px] rounded-full bg-cyan-500/15 blur-[100px]" />
            <div className="absolute bottom-[-220px] right-[8%] h-[360px] w-[360px] rounded-full bg-blue-600/20 blur-[100px]" />

            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />

            <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" />
            <div className="absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />
          </div>

          {/* Decorative corner elements */}
          <div className="absolute left-6 top-6 h-10 w-10 border-l border-t border-cyan-300/40" />
          <div className="absolute right-6 top-6 h-10 w-10 border-r border-t border-indigo-300/40" />
          <div className="absolute bottom-6 left-6 h-10 w-10 border-b border-l border-indigo-300/40" />
          <div className="absolute bottom-6 right-6 h-10 w-10 border-b border-r border-cyan-300/40" />

          <div className="relative mx-auto max-w-4xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-300 sm:text-xs">
                Let&apos;s work together
              </span>
            </div>

            {/* Heading */}
            <h2 className="mx-auto mt-7 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-4xl lg:text-6xl">
              {title}
            </h2>

            {/* Gradient accent */}
            <div className="mx-auto mt-7 h-1 w-20 rounded-full bg-gradient-to-r from-indigo-500 via-blue-400 to-cyan-400" />

            {/* Description */}
            <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-slate-300 sm:text-lg sm:leading-8">
              {description}
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/request-quote"
                className="group/button inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-slate-950 shadow-[0_12px_35px_rgba(255,255,255,0.12)] transition-all duration-300 hover:-translate-y-1 hover:bg-slate-100 hover:shadow-[0_18px_45px_rgba(255,255,255,0.18)]"
              >
                <span>Request a Quote</span>

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-white transition-transform duration-300 group-hover/button:translate-x-1">
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-3.5 w-3.5"
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
                className="group/button inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/[0.06] px-7 py-4 text-sm font-bold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/[0.12]"
              >
                <span>Contact Us</span>

                <span className="text-cyan-300 transition-transform duration-300 group-hover/button:translate-x-1">
                  ↗
                </span>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 border-t border-white/10 pt-7 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Clear communication
              </span>

              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                Security-first approach
              </span>

              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                Built for long-term growth
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}