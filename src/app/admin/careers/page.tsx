import Link from "next/link";

import { prisma } from "@/lib/prisma";
import DeleteCareerButton from "@/components/DeleteCareerButton";

export const dynamic = "force-dynamic";

export default async function AdminCareersPage() {
  const jobs = await prisma.job.findMany({
    orderBy: [
      {
        featured: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  const featuredJobs = jobs.filter((job) => job.featured);
  const publishedJobs = jobs.filter((job) => job.published);

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

          <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                Rizcent Admin
              </div>

              <h1 className="mt-3 text-5xl font-bold tracking-tight">
                Careers
              </h1>

              <p className="mt-4 max-w-2xl text-slate-400">
                Create, edit and manage the career opportunities displayed
                on your Rizcent website.
              </p>
            </div>

            <Link
              href="/admin/careers/new"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              + New Job
            </Link>
          </div>
        </header>

        {/* Stats */}
        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Total Jobs
            </div>

            <div className="mt-3 text-3xl font-bold">
              {jobs.length}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Featured
            </div>

            <div className="mt-3 text-3xl font-bold">
              {featuredJobs.length}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Published
            </div>

            <div className="mt-3 text-3xl font-bold">
              {publishedJobs.length}
            </div>
          </div>
        </section>

        {/* Jobs */}
        <section className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]">
          <div className="border-b border-white/10 px-6 py-6 sm:px-8">
            <h2 className="text-xl font-bold">
              All Positions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {jobs.length} position{jobs.length === 1 ? "" : "s"}{" "}
              currently available.
            </p>
          </div>

          {jobs.length === 0 ? (
            <div className="px-6 py-20 text-center sm:px-8">
              <div className="text-xl font-semibold">
                No jobs yet
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Create your first career opportunity.
              </p>

              <Link
                href="/admin/careers/new"
                className="mt-6 inline-flex rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold transition hover:bg-blue-500"
              >
                Create Job
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="px-6 py-7 transition hover:bg-white/[0.02] sm:px-8"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    {/* Main */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-blue-400">
                          {job.department}
                        </span>

                        {job.featured && (
                          <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
                            Featured
                          </span>
                        )}

                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                            job.published
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-slate-500/10 text-slate-500"
                          }`}
                        >
                          {job.published ? "Published" : "Draft"}
                        </span>
                      </div>

                      <h3 className="mt-4 text-2xl font-bold text-white">
                        {job.title}
                      </h3>

                      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                        {job.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <span className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-slate-400">
                          {job.location}
                        </span>

                        <span className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-slate-400">
                          {job.type}
                        </span>

                        <span className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-slate-400">
                          {job.experience}
                        </span>
                      </div>

                      <div className="mt-5 text-xs text-slate-600">
                        /careers/{job.slug}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 flex-wrap gap-3">
                      <Link
                        href={`/careers/${job.slug}`}
                        target="_blank"
                        className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
                      >
                        View
                      </Link>

                      <Link
                        href={`/admin/careers/${job.id}/edit`}
                        className="rounded-full border border-blue-400/20 bg-blue-500/10 px-5 py-2.5 text-sm font-semibold text-blue-400 transition hover:bg-blue-500/20"
                      >
                        Edit
                      </Link>

                      <DeleteCareerButton
                        id={job.id}
                        title={job.title}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}