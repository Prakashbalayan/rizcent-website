import Container from "../ui/Container";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#080b14] text-white">
      {/* ------------------------------------------------------------------ */}
      {/* Background                                                          */}
      {/* ------------------------------------------------------------------ */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Ambient glows */}
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-glow hero-glow-three" />

        {/* Security grid */}
        <div className="hero-grid absolute inset-0" />

        {/* Top light */}
        <div className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080b14] to-transparent" />
      </div>

      <Container className="relative">
        <div className="grid min-h-[calc(100vh-72px)] items-center gap-16 py-20 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-24 xl:gap-20">
          {/* ---------------------------------------------------------------- */}
          {/* Left Content                                                     */}
          {/* ---------------------------------------------------------------- */}

          <div className="relative z-10 max-w-3xl">
            {/* Eyebrow */}
            <div className="hero-fade-up inline-flex items-center gap-2.5 rounded-full border border-indigo-400/20 bg-indigo-400/[0.07] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-200 backdrop-blur-xl">
              <span className="hero-dot-one relative h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />

              <span>Technology &amp; Cybersecurity</span>
            </div>

            {/* Heading */}
            <h1 className="hero-fade-up-delay mt-7 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl xl:text-[78px]">
              Building digital products.
              <span className="mt-3 block bg-gradient-to-r from-indigo-300 via-indigo-400 to-cyan-300 bg-clip-text text-transparent">
                Securing digital businesses.
              </span>
            </h1>

            {/* Description */}
            <p className="hero-fade-up-delay-2 mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
              Rizcent Technologies builds modern digital products and helps
              businesses protect their technology with practical,
              security-first solutions.
            </p>

            {/* Buttons */}
            <div className="hero-fade-up-delay-3 mt-9 flex flex-wrap gap-3">
              <Button href="/request-quote">
                Start a Project
              </Button>

              <Button href="/services" variant="secondary">
                Explore Services
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="hero-fade-up-delay-4 mt-12 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-white/[0.08] pt-7">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span className="h-1 w-1 rounded-full bg-indigo-400" />

                <span className="font-semibold text-slate-300">
                  Software
                </span>

                <span>Development</span>
              </div>

              <div className="hidden h-4 w-px bg-white/10 sm:block" />

              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span className="h-1 w-1 rounded-full bg-cyan-400" />

                <span className="font-semibold text-slate-300">
                  Cyber
                </span>

                <span>Security</span>
              </div>

              <div className="hidden h-4 w-px bg-white/10 sm:block" />

              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />

                <span className="font-semibold text-slate-300">
                  Cloud
                </span>

                <span>Solutions</span>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Right Cybersecurity Visual                                       */}
          {/* ---------------------------------------------------------------- */}

          <div className="relative hidden lg:block">
            <div className="relative mx-auto aspect-square w-full max-w-[560px]">
              {/* Outer ring */}
              <div
                aria-hidden="true"
                className="absolute inset-5 rounded-full border border-white/[0.055]"
              />

              {/* Middle ring */}
              <div
                aria-hidden="true"
                className="absolute inset-20 rounded-full border border-indigo-400/[0.12]"
              />

              {/* Inner ring */}
              <div
                aria-hidden="true"
                className="absolute inset-32 rounded-full border border-cyan-400/[0.08]"
              />

              {/* Rotating orbit */}
              <div
                aria-hidden="true"
                className="hero-orbit absolute inset-14 rounded-full"
              >
                <span className="hero-dot-one absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-indigo-400 shadow-[0_0_22px_rgba(129,140,248,0.9)]" />

                <span className="hero-dot-two absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.9)]" />
              </div>

              {/* Center ambient glow */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.08] blur-3xl"
              />

              {/* Secondary center glow */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.05] blur-3xl"
              />

              {/* ---------------------------------------------------------------- */}
              {/* Center Core                                                      */}
              {/* ---------------------------------------------------------------- */}

              <div className="hero-float absolute left-1/2 top-1/2 flex h-60 w-60 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[42px] border border-white/10 bg-white/[0.045] shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                {/* Inner border */}
                <div className="pointer-events-none absolute inset-2 rounded-[36px] border border-white/[0.04]" />

                <div className="relative z-10 text-center">
                  {/* Logo */}
                  <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center overflow-hidden rounded-[24px] border border-indigo-300/20 bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700 text-4xl font-bold text-white shadow-[0_15px_40px_rgba(79,70,229,0.28)]">
                    <span className="relative z-10">R</span>

                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-px bg-white/30"
                    />

                    <span
                      aria-hidden="true"
                      className="absolute -right-4 -top-4 h-12 w-12 rounded-full bg-cyan-300/20 blur-xl"
                    />
                  </div>

                  {/* Brand */}
                  <div className="text-xl font-semibold tracking-[-0.02em] text-white">
                    Rizcent
                  </div>

                  {/* Subtitle */}
                  <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                    Secure Technology
                  </div>

                  {/* Status */}
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.05] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-emerald-400">
                    <span className="hero-dot-one h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />

                    Systems protected
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------------------- */}
              {/* Security Card                                                    */}
              {/* ---------------------------------------------------------------- */}

              <div className="hero-float absolute left-0 top-20 w-44 rounded-2xl border border-white/10 bg-[#101522]/90 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500">
                    Security
                  </span>

                  <span className="hero-dot-one h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-sm font-semibold text-emerald-400">
                    ✓
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-white">
                      Protected
                    </div>

                    <div className="mt-0.5 text-[10px] text-slate-600">
                      Security active
                    </div>
                  </div>
                </div>

                {/* Security meter */}
                <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
                </div>

                <div className="mt-2 flex justify-between text-[9px] text-slate-600">
                  <span>Risk</span>
                  <span className="text-emerald-400">Low</span>
                </div>
              </div>

              {/* ---------------------------------------------------------------- */}
              {/* Development Card                                                 */}
              {/* ---------------------------------------------------------------- */}

              <div className="hero-float hero-float-delay absolute bottom-20 right-0 w-48 rounded-2xl border border-white/10 bg-[#101522]/90 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500">
                    Engineering
                  </span>

                  <span className="text-[10px] text-indigo-300">
                    LIVE
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-400/10 text-sm font-semibold text-indigo-300">
                    ↗
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-white">
                      Production Ready
                    </div>

                    <div className="mt-0.5 text-[10px] text-slate-600">
                      Built to scale
                    </div>
                  </div>
                </div>

                {/* Activity bars */}
                <div className="mt-4 flex h-5 items-end gap-1">
                  {[35, 55, 42, 75, 58, 88, 68, 95].map(
                    (height, index) => (
                      <span
                        key={index}
                        className="flex-1 rounded-t-sm bg-indigo-500/40"
                        style={{
                          height: `${height}%`,
                        }}
                      />
                    ),
                  )}
                </div>
              </div>

              {/* ---------------------------------------------------------------- */}
              {/* Floating Nodes                                                    */}
              {/* ---------------------------------------------------------------- */}

              <span
                aria-hidden="true"
                className="hero-dot-one absolute right-20 top-16 h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_20px_rgba(129,140,248,0.8)]"
              />

              <span
                aria-hidden="true"
                className="hero-dot-two absolute bottom-28 left-16 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.8)]"
              />

              <span
                aria-hidden="true"
                className="absolute left-24 top-40 h-1 w-1 rounded-full bg-white/40"
              />

              <span
                aria-hidden="true"
                className="absolute bottom-40 right-24 h-1 w-1 rounded-full bg-indigo-300/50"
              />

              {/* ---------------------------------------------------------------- */}
              {/* Scan Line                                                         */}
              {/* ---------------------------------------------------------------- */}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-16 top-0 h-px overflow-hidden"
              >
                <div className="hero-scan-line h-px w-full bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}