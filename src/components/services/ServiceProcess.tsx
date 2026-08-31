interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ServiceProcessProps {
  title?: string;
  description?: string;
  steps: ProcessStep[];
}

export default function ServiceProcess({
  title = "A clear process from start to finish.",
  description = "We use a structured process to keep projects focused, transparent and aligned with your goals.",
  steps,
}: ServiceProcessProps) {
  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Our process
            </div>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {title}
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              {description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-7"
              >
                <div className="text-sm font-bold text-blue-600">
                  {step.number}
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-950">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}