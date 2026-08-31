import type { Metadata } from "next";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore software, web, SaaS, mobile and cybersecurity projects built by Rizcent Technologies.",
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [
      {
        featured: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="max-w-4xl">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              Our Projects
            </div>

            <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Technology built to solve real problems.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Explore selected projects where we have helped businesses
              build software, digital products and secure technology
              solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {projects.length === 0 ? (
            <div className="rounded-[30px] border border-slate-200 px-6 py-20 text-center">
              <h2 className="text-2xl font-bold text-slate-950">
                Projects coming soon
              </h2>

              <p className="mt-3 text-slate-600">
                Our project portfolio is currently being updated.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project, index) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-slate-200/60"
                >
                  {/* Visual */}
                  <div className="relative flex h-64 items-center justify-center overflow-hidden bg-slate-950">
                    <div className="absolute h-56 w-56 rounded-full bg-blue-600/20 blur-3xl transition duration-500 group-hover:bg-blue-500/30" />

                    <div className="relative flex h-32 w-32 items-center justify-center rounded-[28px] border border-blue-400/20 bg-slate-900 shadow-2xl">
                      <span className="text-4xl font-bold text-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur">
                      {project.category}
                    </div>

                    {project.featured && (
                      <div className="absolute right-6 top-6 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-950">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-7 sm:p-8">
                    <div className="flex items-start justify-between gap-5">
                      <div className="min-w-0">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                          {project.title}
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          {project.shortDescription}
                        </p>
                      </div>

                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition group-hover:bg-blue-600 group-hover:text-white">
                        →
                      </span>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {parseList(project.technologies)
                        .slice(0, 4)
                        .map((technology) => (
                          <span
                            key={technology}
                            className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
                          >
                            {technology}
                          </span>
                        ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                      <span className="text-sm text-slate-500">
                        {project.year}
                      </span>

                      <span className="text-sm font-semibold text-blue-600">
                        View Project →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="rounded-[36px] bg-blue-600 px-7 py-16 text-center text-white sm:px-12 lg:px-20">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">
              Start a Project
            </div>

            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold sm:text-5xl">
              Have an idea you want to build?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-blue-100">
              Tell us about your requirements and we&apos;ll help you find
              the right technology approach.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/request-quote"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-blue-600 transition hover:bg-slate-100"
              >
                Request a Quote →
              </Link>

              <Link
                href="/contact"
                className="rounded-full border border-blue-400/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function parseList(value: string): string[] {
  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => String(item).trim())
        .filter(Boolean);
    }
  } catch {
    return value
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}