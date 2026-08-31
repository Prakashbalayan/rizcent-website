import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: {
      slug,
    },
  });

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailsPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: {
      slug,
    },
  });

  if (!project) {
    notFound();
  }

  const technologies = parseList(project.technologies);
  const services = parseList(project.services);
  const results = parseList(project.results);

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
          >
            ← Back to Projects
          </Link>

          <div className="mt-10 max-w-5xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
                {project.category}
              </span>

              {project.featured && (
                <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950">
                  Featured
                </span>
              )}

              <span className="text-sm text-slate-400">
                {project.year}
              </span>
            </div>

            <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              {project.shortDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-400">
              <span>{project.clientType}</span>
              <span>{project.year}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* Main */}
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                Project Overview
              </div>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                About the project
              </h2>

              <div className="mt-7 space-y-5">
                {project.description
                  .split(/\n\s*\n/)
                  .map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-lg leading-8 text-slate-600"
                    >
                      {paragraph.trim()}
                    </p>
                  ))}
              </div>

              {/* Challenge */}
              <div className="mt-16">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                  The Challenge
                </div>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
                  What needed to be solved
                </h2>

                <p className="mt-6 text-lg leading-8 text-slate-600">
                  {project.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="mt-16">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Our Solution
                </div>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
                  How we approached it
                </h2>

                <p className="mt-6 text-lg leading-8 text-slate-600">
                  {project.solution}
                </p>
              </div>

              {/* Results */}
              {results.length > 0 && (
                <div className="mt-16">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                    Results
                  </div>

                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
                    What we delivered
                  </h2>

                  <div className="mt-7 space-y-4">
                    {results.map((result, index) => (
                      <div
                        key={`${result}-${index}`}
                        className="flex gap-4"
                      >
                        <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                          ✓
                        </div>

                        <p className="text-lg leading-8 text-slate-600">
                          {result}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside>
              <div className="sticky top-8 rounded-[30px] border border-slate-200 bg-slate-50 p-7">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Project Details
                </div>

                <div className="mt-7 space-y-6">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Category
                    </div>

                    <div className="mt-2 font-semibold text-slate-950">
                      {project.category}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Client Type
                    </div>

                    <div className="mt-2 font-semibold text-slate-950">
                      {project.clientType}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Year
                    </div>

                    <div className="mt-2 font-semibold text-slate-950">
                      {project.year}
                    </div>
                  </div>

                  {/* Services */}
                  {services.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Services
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {services.map((service) => (
                          <span
                            key={service}
                            className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-600"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technologies */}
                  {technologies.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Technologies
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-full bg-slate-950 px-3 py-1.5 text-xs font-medium text-white"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/request-quote"
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Start a Project →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Work with Rizcent
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Have a similar project in mind?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
            Tell us what you&apos;re building and we&apos;ll help you plan the
            right technology solution.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/request-quote"
              className="rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Request a Quote →
            </Link>

            <Link
              href="/projects"
              className="rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
            >
              View All Projects
            </Link>
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