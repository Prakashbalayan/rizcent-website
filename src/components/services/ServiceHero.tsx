import Link from "next/link";

interface ServiceHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  accent?: string;
}

export default function ServiceHero({
  eyebrow,
  title,
  description,
  accent = "blue",
}: ServiceHeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background glow */}
      <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.035]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Content */}
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-300">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              {eyebrow}
            </div>

            <h1 className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {title}
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              {description}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/request-quote"
                className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Start a Project
                <span className="ml-2">→</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-slate-700 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950"
              >
                Talk to Us
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden min-h-[380px] lg:block">
            {/* Outer ring */}
            <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/20" />

            {/* Middle ring */}
            <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/20" />

            {/* Glow */}
            <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl" />

            {/* Center */}
            <div className="absolute left-1/2 top-1/2 flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[36px] border border-blue-400/30 bg-slate-900 shadow-2xl shadow-blue-500/20">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold">
                  R
                </div>

                <div className="mt-4 text-lg font-bold">
                  Rizcent
                </div>

                <div className="mt-1 text-xs text-slate-400">
                  Technologies
                </div>
              </div>
            </div>

            {/* Floating card 1 */}
            <div className="absolute left-0 top-16 rounded-2xl border border-slate-700 bg-slate-900/90 p-4 shadow-xl backdrop-blur">
              <div className="text-xs text-slate-500">
                Engineering
              </div>

              <div className="mt-1 text-sm font-semibold">
                Build
              </div>
            </div>

            {/* Floating card 2 */}
            <div className="absolute bottom-16 right-0 rounded-2xl border border-slate-700 bg-slate-900/90 p-4 shadow-xl backdrop-blur">
              <div className="text-xs text-slate-500">
                Security
              </div>

              <div className="mt-1 text-sm font-semibold">
                Protect
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}