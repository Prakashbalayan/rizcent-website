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
    <section className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              {eyebrow}
            </div>

            <h2 className="mt-4 max-w-xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {title}
            </h2>
          </div>

          <div>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              {description}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {points.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    ✓
                  </span>

                  <span className="text-sm font-medium leading-6 text-slate-700">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}