interface ServiceOverviewProps {
  eyebrow?: string;
  title: string;
  description: string;
  points: string[];
}

export default function ServiceOverview({
  eyebrow = "Overview",
  title,
  description,
  points,
}: ServiceOverviewProps) {
  return (
    <section className="relative overflow-hidden bg-[#f7f9fc] py-24 sm:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-140px] top-[-120px] h-80 w-80 rounded-full bg-indigo-200/25 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-100px] h-96 w-96 rounded-full bg-cyan-200/20 blur-3xl" />

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
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
          {/* Left content */}
          <div className="relative">
            <div className="absolute -left-5 top-1 h-16 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-cyan-400" />

            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/80 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-600 shadow-sm backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              {eyebrow}
            </div>

            <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-[54px]">
              {title}
            </h2>

            <div className="mt-7 h-1 w-20 rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400" />
          </div>

          {/* Right content */}
          <div>
            <div className="rounded-[28px] border border-slate-200/90 bg-white/80 p-7 shadow-[0_15px_45px_rgba(15,23,42,0.045)] backdrop-blur-xl sm:p-9">
              <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                {description}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {points.map((point, index) => (
                  <div
                    key={point}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-50/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:bg-white hover:shadow-[0_12px_30px_rgba(79,70,229,0.08)]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-xs font-bold text-white shadow-md shadow-indigo-200 transition-transform duration-300 group-hover:scale-110">
                        ✓
                      </span>

                      <span className="pt-0.5 text-sm font-semibold leading-6 text-slate-700 transition-colors duration-300 group-hover:text-indigo-700">
                        {point}
                      </span>
                    </div>

                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500 group-hover:w-full" />

                    <span className="absolute right-3 top-3 text-[10px] font-bold text-slate-300 transition-colors duration-300 group-hover:text-indigo-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom information */}
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 px-1 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Reliable execution
              </span>

              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                Security-first mindset
              </span>

              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                Built for growth
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}