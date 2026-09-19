import Link from "next/link";
import { prisma } from "@/lib/prisma";

import DeleteProjectButton from "@/components/DeleteProjectButton";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
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

  const featuredProjects = projects.filter(
    (project) => project.featured
  );

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <header className="mb-8">

          <Link
            href="/admin/dashboard"
            className="text-sm text-slate-500 transition hover:text-white"
          >
            ← Dashboard
          </Link>

          <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                Rizcent Admin
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                Projects
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                Create, edit and manage the projects displayed in your
                Rizcent portfolio.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">

              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3">
                <p className="text-[10px] uppercase tracking-wider text-slate-600">
                  Projects
                </p>

                <p className="mt-1 text-xl font-semibold">
                  {projects.length}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3">
                <p className="text-[10px] uppercase tracking-wider text-slate-600">
                  Featured
                </p>

                <p className="mt-1 text-xl font-semibold">
                  {featuredProjects.length}
                </p>
              </div>

              <Link
                href="/admin/projects/new"
                className="inline-flex items-center rounded-xl bg-black px-5 py-3 text-sm font-semibold text-blue-600 transition hover:blue-slate-200"
              >
                + New Project
              </Link>

            </div>

          </div>
        </header>

        {/* Projects */}
        <section className="overflow-hidden rounded-2xl border border-blue-500/10 bg-white/[0.03]">

          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="font-semibold">
              All Projects
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Projects are stored directly in your PostgreSQL database.
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="px-6 py-20 text-center">

              <h3 className="text-lg font-semibold">
                No projects yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Create your first portfolio project.
              </p>

              <Link
                href="/admin/projects/new"
                className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950"
              >
                Create Project
              </Link>

            </div>
          ) : (
            <div className="divide-y divide-white/10">

              {projects.map((project) => (
                <article
                  key={project.id}
                  className="p-6 transition hover:bg-white/[0.02]"
                >

                  <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-400 ring-1 ring-blue-500/20">
                          {project.category}
                        </span>

                        {project.featured && (
                          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-950">
                            Featured
                          </span>
                        )}

                        <span className="text-xs text-slate-600">
                          {project.year}
                        </span>

                      </div>

                      <h3 className="mt-4 text-2xl font-bold">
                        {project.title}
                      </h3>

                      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                        {project.shortDescription}
                      </p>

                      <p className="mt-3 text-xs text-slate-600">
                        /projects/{project.slug}
                      </p>

                    </div>

                    <div className="flex shrink-0 flex-wrap gap-2">

                      <Link
                        href={`/projects/${project.slug}`}
                        target="_blank"
                        className="rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
                      >
                        View
                      </Link>

                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                      >
                        Edit
                      </Link>

                      <DeleteProjectButton
                        id={project.id}
                        title={project.title}
                      />

                    </div>

                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">

                    <Info
                      label="Client Type"
                      value={project.clientType}
                    />

                    <Info
                      label="Technologies"
                      value={`${project.technologies.split(",").filter(Boolean).length} technologies`}
                    />

                    <Info
                      label="Services"
                      value={`${project.services.split(",").filter(Boolean).length} services`}
                    />

                  </div>

                </article>
              ))}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">

      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
        {label}
      </p>

      <p className="mt-2 text-sm font-medium text-slate-300">
        {value}
      </p>

    </div>
  );
}