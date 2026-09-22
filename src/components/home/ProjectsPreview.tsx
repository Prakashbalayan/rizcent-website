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
    description: "Business-focused solutions",
  },
  {
    value: "02",
    label: "Engineering",
    description: "Modern technical architecture",
  },
  {
    value: "03",
    label: "Scale",
    description: "Built for long-term growth",
  },
];

export default function SoftwareDevelopment() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-indigo-500/[0.045] blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan-400/[0.035] blur-[130px]"
      />

      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}
          <div>
            <SectionHeading
              eyebrow="Software engineering"
              title="Build digital products that are ready for what comes next."
              description="From early-stage ideas to complex business platforms, we design and engineer reliable digital products with a strong focus on performance, scalability, security and long-term maintainability."
            />

            {/* Supporting statement */}
            <div className="mt-7 max-w-xl border-l-2 border-indigo-500 pl-5">
              <p className="text-sm leading-6 text-slate-600">
                We combine product thinking with modern engineering to turn
                complex requirements into technology that is practical,
                scalable and built for real-world use.
              </p>
            </div>

            {/* Capabilities */}
            <div className="mt-10">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  What we build
                </span>

                <span className="text-xs font-medium text-slate-400">
                  08 capabilities
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {capabilities.map((item, index) => (
                  <div
                    key={item}
                    className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white hover:shadow-lg hover:shadow-indigo-950/[0.05]"
                  >
                    {/* Hover accent */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-0 bg-gradient-to-b from-indigo-500 to-cyan-400 transition-all duration-300 group-hover:w-0.5"
                    />

                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-[9px] font-bold text-white transition-all duration-300 group-hover:bg-indigo-600 group-hover:shadow-lg group-hover:shadow-indigo-600/20">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="flex-1 text-sm font-semibold text-slate-700 transition-colors group-hover:text-slate-950">
                      {item}
                    </span>

                    <span className="text-xs text-slate-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-indigo-500">
                      →
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/services/software-development"
              className="group mt-9 inline-flex items-center gap-3 text-sm font-semibold text-slate-950"
            >
              <span>Explore software development</span>

              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-xs transition-all duration-300 group-hover:translate-x-1 group-hover:border-indigo-200 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-600/20">
                →
              </span>
            </Link>
          </div>

          {/* =====================================================
              RIGHT PRODUCT VISUAL
          ===================================================== */}
          <div className="relative">
            {/* Outer glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-10 rounded-[60px] bg-gradient-to-br from-indigo-500/[0.07] via-transparent to-cyan-400/[0.05] blur-3xl"
            />

            {/* Main application frame */}
            <div className="relative overflow-hidden rounded-[34px] border border-slate-800 bg-[#070a12] p-3 shadow-2xl shadow-slate-950/20 sm:p-4">
              {/* Top browser bar */}
              <div className="flex items-center gap-2 border-b border-white/[0.06] pb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />

                <div className="ml-3 flex h-8 flex-1 items-center rounded-xl border border-white/[0.06] bg-white/[0.025] px-3">
                  <span className="text-[9px] text-slate-500">
                    app.rizcent.tech / workspace
                  </span>

                  <span className="ml-auto flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                    <span className="text-[8px] font-medium text-emerald-400">
                      LIVE
                    </span>
                  </span>
                </div>
              </div>

              {/* Application layout */}
              <div className="grid gap-3 pt-4 sm:grid-cols-[155px_1fr]">
                {/* Sidebar */}
                <div className="hidden rounded-2xl border border-white/[0.05] bg-white/[0.025] p-3 sm:block">
                  <div className="mb-7 flex items-center gap-2 px-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-[10px] font-bold text-white shadow-lg shadow-indigo-600/20">
                      R
                    </div>

                    <div>
                      <div className="text-[9px] font-semibold text-white">
                        RIZCENT
                      </div>
                      <div className="mt-0.5 text-[7px] text-slate-600">
                        TECHNOLOGY
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {[
                      "Overview",
                      "Projects",
                      "Analytics",
                      "Team",
                      "Security",
                      "Settings",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-[9px] transition-colors ${
                          index === 0
                            ? "bg-indigo-500/10 font-medium text-indigo-300"
                            : "text-slate-600"
                        }`}
                      >
                        <span>{item}</span>

                        {index === 0 && (
                          <span className="h-1 w-1 rounded-full bg-indigo-400" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Sidebar status */}
                  <div className="mt-8 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.035] p-3">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />

                      <span className="text-[8px] font-medium text-emerald-300">
                        All systems operational
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dashboard */}
                <div className="rounded-2xl border border-white/[0.05] bg-white/[0.025] p-4 sm:p-5">
                  {/* Dashboard heading */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                        Workspace
                      </div>

                      <div className="mt-2 text-lg font-semibold tracking-tight text-white">
                        Product performance
                      </div>

                      <div className="mt-1 text-[9px] text-slate-600">
                        Real-time application overview
                      </div>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-400/10 bg-indigo-500/[0.08] text-xs text-indigo-300">
                      ↗
                    </div>
                  </div>

                  {/* Main chart */}
                  <div className="relative mt-6 h-48 overflow-hidden rounded-2xl border border-white/[0.05] bg-black/20 p-4">
                    {/* Grid */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-30"
                    >
                      <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:32px_32px]" />
                    </div>

                    {/* Chart labels */}
                    <div className="absolute left-4 top-4 text-[8px] uppercase tracking-wider text-slate-600">
                      Growth
                    </div>

                    <div className="absolute right-4 top-4 text-[9px] font-semibold text-emerald-400">
                      +24.8%
                    </div>

                    {/* Chart */}
                    <div className="relative flex h-full items-end gap-2 pt-7">
                      {[32, 48, 40, 62, 55, 72, 64, 86, 76, 94].map(
                        (height, index) => (
                          <div
                            key={index}
                            className="group/bar relative flex h-full flex-1 items-end"
                          >
                            <div
                              className="w-full rounded-t-md bg-gradient-to-t from-indigo-600/30 via-indigo-500/60 to-cyan-300/90 transition-all duration-500 group-hover/bar:from-indigo-500/50 group-hover/bar:to-cyan-200"
                              style={{ height: `${height}%` }}
                            />
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {metrics.map((metric, index) => (
                      <div
                        key={metric.label}
                        className="group rounded-xl border border-white/[0.05] bg-white/[0.025] p-3 transition-all duration-300 hover:border-indigo-400/10 hover:bg-white/[0.04]"
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-semibold text-white">
                            {metric.value}
                          </div>

                          <span className="text-[8px] text-slate-700">
                            0{index + 1}
                          </span>
                        </div>

                        <div className="mt-1 text-[9px] font-medium uppercase tracking-wider text-slate-600">
                          {metric.label}
                        </div>

                        <div className="mt-1.5 hidden text-[8px] leading-4 text-slate-700 sm:block">
                          {metric.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Production status */}
              <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-400/10 bg-emerald-400/[0.04] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                  </span>

                  <span className="text-[10px] font-medium text-emerald-300">
                    Production systems operational
                  </span>
                </div>

                <span className="text-[9px] font-medium text-slate-600">
                  SECURE / ONLINE
                </span>
              </div>
            </div>

            {/* Floating top badge */}
            <div className="absolute -right-4 -top-5 hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl shadow-slate-900/10 sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-sm text-indigo-600">
                  ✦
                </div>

                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                    Engineering
                  </div>

                  <div className="mt-0.5 text-xs font-bold text-slate-900">
                    Built to scale
                  </div>
                </div>
              </div>
            </div>

            {/* Floating security badge */}
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl shadow-slate-900/10 sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-sm text-emerald-600">
                  ✓
                </div>

                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                    Security
                  </div>

                  <div className="mt-0.5 text-xs font-bold text-slate-900">
                    Security-first
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}