import Link from "next/link";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const capabilities = [
  "Web Applications",
  "SaaS Platforms",
  "Mobile Applications",
  "Custom Software",
  "REST & GraphQL APIs",
  "E-commerce Platforms",
  "Cloud Applications",
  "Maintenance & Support",
];

const metrics = [
  {
    value: "01",
    label: "Product",
  },
  {
    value: "02",
    label: "Engineering",
  },
  {
    value: "03",
    label: "Scale",
  },
];

export default function SoftwareDevelopment() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
      {/* Subtle background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-indigo-500/[0.04] blur-[120px]"
      />

      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* Content */}
          <div>
            <SectionHeading
              eyebrow="Software development"
              title="From idea to production-ready product."
              description="We help startups and businesses turn ideas into reliable, scalable digital products with modern engineering practices."
            />

            {/* Capabilities */}
            <div className="mt-10 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {capabilities.map((item, index) => (
                <div
                  key={item}
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 transition-all duration-300 hover:border-indigo-200 hover:bg-white hover:shadow-sm"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-950 text-[10px] font-bold text-white transition-colors duration-300 group-hover:bg-indigo-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Link */}
            <Link
              href="/services/software-development"
              className="group mt-9 inline-flex items-center text-sm font-semibold text-slate-950"
            >
              Explore software development

              <span className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-xs transition-all duration-300 group-hover:translate-x-1 group-hover:border-indigo-200 group-hover:bg-indigo-600 group-hover:text-white">
                →
              </span>
            </Link>
          </div>

          {/* Product visual */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-[50px] bg-indigo-500/[0.04] blur-3xl"
            />

            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-[#080b14] p-4 shadow-2xl shadow-slate-900/10 sm:p-5">
              {/* Browser top */}
              <div className="flex items-center gap-2 border-b border-white/[0.06] pb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />

                <div className="ml-4 flex h-7 flex-1 items-center rounded-lg border border-white/[0.06] bg-white/[0.03] px-3">
                  <span className="text-[9px] text-slate-600">
                    rizcent.app / dashboard
                  </span>
                </div>
              </div>

              <div className="grid gap-3 pt-4 sm:grid-cols-[150px_1fr]">
                {/* Sidebar */}
                <div className="hidden rounded-2xl border border-white/[0.05] bg-white/[0.025] p-3 sm:block">
                  <div className="mb-7 flex items-center gap-2 px-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500 text-[10px] font-bold text-white">
                      R
                    </div>

                    <div className="h-2 w-14 rounded-full bg-white/20" />
                  </div>

                  <div className="space-y-1.5">
                    {[
                      "Overview",
                      "Projects",
                      "Analytics",
                      "Team",
                      "Settings",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className={`rounded-lg px-3 py-2 text-[9px] ${
                          index === 0
                            ? "bg-indigo-500/10 text-indigo-300"
                            : "text-slate-600"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dashboard */}
                <div className="rounded-2xl border border-white/[0.05] bg-white/[0.025] p-4 sm:p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[9px] uppercase tracking-[0.16em] text-slate-600">
                        Overview
                      </div>

                      <div className="mt-2 text-lg font-semibold text-white">
                        Product performance
                      </div>
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-xs text-indigo-300">
                      ↗
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="relative mt-6 h-44 overflow-hidden rounded-xl border border-white/[0.05] bg-black/20 p-4">
                    <div className="absolute inset-0 opacity-30">
                      <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:32px_32px]" />
                    </div>

                    <div className="relative flex h-full items-end gap-2">
                      {[32, 48, 40, 62, 55, 72, 64, 86, 76, 94].map(
                        (height, index) => (
                          <div
                            key={index}
                            className="group/bar relative flex h-full flex-1 items-end"
                          >
                            <div
                              className="w-full rounded-t-md bg-gradient-to-t from-indigo-600/30 to-indigo-400/80 transition-all duration-500 group-hover/bar:from-indigo-500/50 group-hover/bar:to-cyan-300"
                              style={{ height: `${height}%` }}
                            />
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-3"
                      >
                        <div className="text-sm font-semibold text-white">
                          {metric.value}
                        </div>

                        <div className="mt-1 text-[9px] uppercase tracking-wider text-slate-600">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-400/10 bg-emerald-400/[0.04] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />

                  <span className="text-[10px] font-medium text-emerald-300">
                    Systems operational
                  </span>
                </div>

                <span className="text-[9px] text-slate-600">
                  Production
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}