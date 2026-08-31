interface ServiceFeature {
  number: string;
  title: string;
  description: string;
}

interface ServiceFeaturesProps {
  eyebrow?: string;
  title: string;
  description?: string;
  features: ServiceFeature[];
}

export default function ServiceFeatures({
  eyebrow = "What we deliver",
  title,
  description,
  features,
}: ServiceFeaturesProps) {
  return (
    <section className="bg-slate-50 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            {eyebrow}
          </div>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {title}
          </h2>

          {description && (
            <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
              {description}
            </p>
          )}
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="group rounded-[28px] border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50 sm:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600">
                  {feature.number}
                </span>

                <span className="text-2xl text-slate-200 transition group-hover:text-blue-500">
                  +
                </span>
              </div>

              <h3 className="mt-8 text-xl font-bold text-slate-950">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}