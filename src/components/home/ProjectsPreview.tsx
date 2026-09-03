import Link from "next/link";

import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const projects = [
  {
    category: "FinTech",
    title: "Financial Management Platform",
    description:
      "A scalable digital platform designed to simplify financial operations and provide real-time business insights.",
    technologies: ["Next.js", "Node.js", "PostgreSQL"],
  },
  {
    category: "SaaS",
    title: "Business Operations Platform",
    description:
      "A centralized SaaS platform helping teams manage workflows, users and business operations.",
    technologies: ["React", "Python", "PostgreSQL"],
  },
  {
    category: "Cybersecurity",
    title: "Security Assessment Platform",
    description:
      "A security-focused platform designed to help teams track vulnerabilities, findings and remediation.",
    technologies: ["Next.js", "API", "Cloud"],
  },
];

export default function ProjectsPreview() {
  return (
    <section className="relative overflow-hidden bg-[#f3f5f9] py-24 sm:py-28 lg:py-36">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          top-20
          h-96
          w-96
          rounded-full
          bg-indigo-200/30
          blur-[130px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-0
          h-96
          w-96
          rounded-full
          bg-cyan-200/25
          blur-[130px]
        "
      />

      {/* Subtle background grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-40
          [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)]
          [background-size:72px_72px]
          [mask-image:linear-gradient(to_bottom,black,transparent)]
        "
      />

      <Container>
        {/* Section header */}
        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Selected Work"
            title="Projects built to solve real problems."
            description="A glimpse into the kind of digital products and technology solutions we create."
          />

          <Link
            href="/projects"
            className="
              group
              inline-flex
              shrink-0
              items-center
              gap-3
              self-start
              rounded-full
              border
              border-slate-200
              bg-white/80
              px-5
              py-3
              text-sm
              font-semibold
              !text-slate-900
              shadow-[0_8px_30px_rgba(15,23,42,0.04)]
              backdrop-blur-xl
              transition
              duration-300
              hover:-translate-y-0.5
              hover:border-indigo-200
              hover:bg-white
              hover:text-indigo-600
              lg:self-end
            "
          >
            View all projects
            <span className="text-lg transition duration-300 group-hover:translate-x-1">
              ↗
            </span>
          </Link>
        </div>

        {/* Project cards */}
        <div className="relative mt-14 grid gap-6 lg:mt-16 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Link
              key={project.title}
              href="/projects"
              className="
                group
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-slate-200/80
                bg-white
                shadow-[0_18px_60px_rgba(15,23,42,0.045)]
                transition
                duration-500
                hover:-translate-y-2
                hover:border-indigo-200
                hover:shadow-[0_30px_90px_rgba(79,70,229,0.12)]
              "
            >
              {/* Project visual */}
              <div className="relative h-72 overflow-hidden bg-[#090d1c] p-6 sm:h-80">
                {/* Grid */}
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    inset-0
                    opacity-40
                    [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)]
                    [background-size:42px_42px]
                  "
                />

                {/* Color glow */}
                <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-indigo-600/20 blur-[90px] transition duration-700 group-hover:bg-indigo-500/30" />

                <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-cyan-500/10 blur-[90px] transition duration-700 group-hover:bg-cyan-400/20" />

                {/* Decorative circles */}
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/[0.06] transition duration-700 group-hover:scale-125" />

                <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/[0.06]" />

                {/* Top metadata */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="rounded-full border border-indigo-300/20 bg-indigo-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-200 backdrop-blur-xl">
                    {project.category}
                  </span>

                  <span className="text-xs font-semibold tracking-[0.18em] text-slate-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Dashboard mockup */}
                <div className="absolute inset-x-6 bottom-6 top-24">
                  <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-500 group-hover:border-indigo-300/20">
                    {/* Browser header */}
                    <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-300/70" />
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-300/70" />
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/70" />

                      <span className="ml-3 h-2 flex-1 rounded-full bg-white/[0.08]" />
                    </div>

                    {/* Dashboard content */}
                    <div className="mt-4 grid grid-cols-[0.8fr_1.2fr] gap-3">
                      <div className="space-y-3">
                        <div className="h-3 w-16 rounded-full bg-white/10" />
                        <div className="h-16 rounded-xl border border-white/[0.05] bg-white/[0.045]" />
                        <div className="h-10 rounded-xl border border-white/[0.05] bg-indigo-400/10" />
                        <div className="h-10 rounded-xl border border-white/[0.05] bg-white/[0.045]" />
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="h-14 rounded-xl bg-indigo-500/20" />
                          <div className="h-14 rounded-xl bg-cyan-400/10" />
                        </div>

                        <div className="relative h-24 overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.035]">
                          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-indigo-500/20 to-transparent" />

                          <div className="absolute bottom-5 left-4 right-4 flex items-end gap-2">
                            <span className="h-6 flex-1 rounded-t bg-indigo-300/40" />
                            <span className="h-10 flex-1 rounded-t bg-indigo-300/60" />
                            <span className="h-8 flex-1 rounded-t bg-cyan-300/50" />
                            <span className="h-14 flex-1 rounded-t bg-indigo-300/70" />
                            <span className="h-11 flex-1 rounded-t bg-cyan-300/60" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Small active indicator */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
                      Live System
                    </div>
                  </div>
                </div>
              </div>

              {/* Project content */}
              <div className="p-7 sm:p-8">
                <div className="flex items-start justify-between gap-5">
                  <h3 className="max-w-[240px] text-xl font-semibold leading-tight tracking-[-0.035em] text-slate-950 transition duration-300 group-hover:text-indigo-600">
                    {project.title}
                  </h3>

                  <span
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-slate-200
                      bg-slate-50
                      text-lg
                      text-slate-700
                      transition
                      duration-300
                      group-hover:border-indigo-600
                      group-hover:bg-indigo-600
                      group-hover:text-white
                    "
                  >
                    ↗
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-500">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mt-7 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="
                        rounded-full
                        border
                        border-slate-200
                        bg-slate-50
                        px-3
                        py-1.5
                        text-[11px]
                        font-medium
                        text-slate-600
                        transition
                        duration-300
                        group-hover:border-indigo-100
                        group-hover:bg-indigo-50/60
                      "
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                {/* Bottom action */}
                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    View Case Study
                  </span>

                  <span className="h-px w-12 bg-gradient-to-r from-indigo-500 to-transparent transition duration-500 group-hover:w-24" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}