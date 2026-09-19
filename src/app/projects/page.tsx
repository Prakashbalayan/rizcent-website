import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore software, web, SaaS, mobile and cybersecurity projects built by Rizcent Technologies.",
};

const projectImages = [
  "/images/projects/Tommyweb.png",
  "/images/projects/Business.png",
  "/images/projects/Api.png",
];

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
              Explore selected projects where we have helped businesses build
              software, digital products and secure technology solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="pointer-events-none absolute left-0 top-20 h-80 w-80 rounded-full bg-blue-100/40 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-100/40 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
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
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => {
                const image =
                  normalizeImagePath(project.imageUrl) ||
                  projectImages[index % projectImages.length];

                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="group relative overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.04)] transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-[0_25px_70px_rgba(15,23,42,0.12)]"
                  >
                    {/* Image Frame */}
                    <div className="relative h-64 overflow-hidden bg-slate-950 sm:h-72">
                      <Image
                        src={image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center transition duration-700 group-hover:scale-105"
                      />

                      {/* Image overlay */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />

                      {/* Animated glow */}
                      <div className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-blue-500/30 blur-3xl transition duration-700 group-hover:bg-cyan-400/40" />

                      {/* Project number */}
                      <div className="absolute bottom-5 left-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-lg font-bold text-white backdrop-blur-xl">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      {/* Category */}
                      <div className="absolute left-6 top-6 max-w-[75%] rounded-full border border-white/20 bg-slate-950/60 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-xl">
                        {project.category}
                      </div>

                      {/* Featured badge */}
                      {project.featured && (
                        <div className="absolute right-6 top-6 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-slate-950 shadow-lg">
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-7">
                      <div className="flex items-start justify-between gap-5">
                        <div className="min-w-0">
                          <h2 className="text-2xl font-bold tracking-tight text-slate-950 transition-colors duration-300 group-hover:text-blue-600">
                            {project.title}
                          </h2>

                          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                            {project.shortDescription}
                          </p>
                        </div>

                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-700 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                          <svg
                            viewBox="0 0 20 20"
                            fill="none"
                            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5"
                            aria-hidden="true"
                          >
                            <path
                              d="M4 10h11M10 5l5 5-5 5"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>

                      {/* Technologies */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {parseList(project.technologies)
                          .slice(0, 4)
                          .map((technology) => (
                            <span
                              key={technology}
                              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors duration-300 group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-blue-700"
                            >
                              {technology}
                            </span>
                          ))}
                      </div>

                      {/* Footer */}
                      <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">
                        <span className="text-sm font-medium text-slate-500">
                          {project.year}
                        </span>

                        <span className="text-sm font-bold text-blue-600">
                          View Project
                          <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden pb-20 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-blue-50/50 to-white" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="group relative overflow-hidden rounded-[36px] border border-blue-200/20 bg-[#081225] px-7 py-16 text-center text-white shadow-[0_30px_90px_rgba(15,23,42,0.18)] sm:px-12 sm:py-20 lg:px-20">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-600/25 blur-[110px]" />

              <div className="absolute bottom-[-220px] left-[10%] h-[360px] w-[360px] rounded-full bg-cyan-500/15 blur-[100px]" />

              <div className="absolute bottom-[-220px] right-[5%] h-[360px] w-[360px] rounded-full bg-indigo-600/20 blur-[100px]" />

              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                  backgroundSize: "42px 42px",
                }}
              />
            </div>

            <div className="relative mx-auto max-w-3xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-200 backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.8)]" />
                Start a Project
              </div>

              <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
                Have an idea you want to build?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-lg">
                Tell us about your requirements and we&apos;ll help you find
                the right technology approach.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/request-quote"
                  className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold !text-blue-700 shadow-[0_14px_35px_rgba(255,255,255,0.12)] transition-all duration-300 hover:-translate-y-1 hover:bg-slate-100 hover:shadow-[0_20px_45px_rgba(255,255,255,0.2)]"
                >
                  Request a Quote
                  <span className="text-lg">→</span>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/20 bg-white/[0.06] px-7 py-4 text-sm font-bold !text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/[0.12]"
                >
                  Contact Us
                  <span className="text-lg text-cyan-300">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function normalizeImagePath(
  value: string | null | undefined
): string {
  if (!value) {
    return "";
  }

  const normalized = value
    .trim()
    .replace(/\\/g, "/")
    .replace(/^\/+/, "/");

  if (
    normalized.startsWith("http://") ||
    normalized.startsWith("https://") ||
    normalized.startsWith("/")
  ) {
    return normalized;
  }

  return `/${normalized}`;
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