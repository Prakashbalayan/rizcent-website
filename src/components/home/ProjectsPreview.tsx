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
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects built to solve real problems."
            description="A glimpse into the kind of digital products and technology solutions we create."
          />

          <Link
            href="/projects"
            className="shrink-0 font-semibold text-blue-600"
          >
            View all projects →
          </Link>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Link
              key={project.title}
              href="/projects"
              className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
            >
              <div className="relative h-64 overflow-hidden bg-slate-950 p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-transparent to-cyan-400/10" />

                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-300">
                      {project.category}
                    </span>

                    <span className="text-sm text-slate-500">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4 backdrop-blur">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-400" />
                      <div className="h-2 flex-1 rounded-full bg-slate-700" />
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="h-12 rounded-lg bg-slate-800" />
                      <div className="h-12 rounded-lg bg-blue-600/30" />
                      <div className="h-12 rounded-lg bg-slate-800" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-7">
                <h3 className="text-xl font-bold text-slate-950">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="mt-7 font-semibold text-blue-600">
                  View case study →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}