import Link from "next/link";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [
    projectCount,
    serviceCount,
    blogCount,
    careerCount,
    contactCount,
    quoteCount,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.blogPost.count(),
    prisma.job.count(),
    prisma.contactMessage.count(),
    prisma.quoteRequest.count(),
  ]);

  const [publishedServices, publishedBlogs, publishedJobs] =
    await Promise.all([
      prisma.service.count({
        where: {
          published: true,
        },
      }),
      prisma.blogPost.count({
        where: {
          published: true,
        },
      }),
      prisma.job.count({
        where: {
          published: true,
        },
      }),
    ]);

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-10">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
            Rizcent Admin
          </div>

          <div className="mt-3 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Dashboard
              </h1>

              <p className="mt-4 max-w-2xl text-slate-400">
                Manage your website content, projects, services, careers
                and incoming enquiries.
              </p>
            </div>

            <Link
              href="/"
              target="_blank"
              className="inline-flex w-fit rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              View Website →
            </Link>
          </div>
        </header>

        {/* Content Stats */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold">
              Website Content
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current content stored in your database.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              href="/admin/projects"
              label="Projects"
              value={projectCount}
              description="Portfolio projects"
            />

            <DashboardCard
              href="/admin/services"
              label="Services"
              value={serviceCount}
              description={`${publishedServices} published`}
            />

            <DashboardCard
              href="/admin/blog"
              label="Blog Posts"
              value={blogCount}
              description={`${publishedBlogs} published`}
            />

            <DashboardCard
              href="/admin/careers"
              label="Careers"
              value={careerCount}
              description={`${publishedJobs} published`}
            />
          </div>
        </section>

        {/* Leads */}
        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-xl font-bold">
              Enquiries
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Messages and project enquiries received through the website.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <DashboardCard
              href="/admin/leads"
              label="Contact Messages"
              value={contactCount}
              description="Contact enquiries"
            />

            <DashboardCard
              href="/admin/leads"
              label="Quote Requests"
              value={quoteCount}
              description="Project enquiries"
            />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-xl font-bold">
              Quick Actions
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <QuickAction
              href="/admin/projects/new"
              title="New Project"
              description="Add a portfolio project"
            />

            <QuickAction
              href="/admin/services/new"
              title="New Service"
              description="Add a new service"
            />

            <QuickAction
              href="/admin/blog/new"
              title="New Blog Post"
              description="Publish a new article"
            />

            <QuickAction
              href="/admin/careers/new"
              title="New Job"
              description="Create a career opportunity"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

interface DashboardCardProps {
  href: string;
  label: string;
  value: number;
  description: string;
}

function DashboardCard({
  href,
  label,
  value,
  description,
}: DashboardCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-[24px] border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-white/[0.05]"
    >
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </div>

      <div className="mt-4 text-4xl font-bold text-white">
        {value}
      </div>

      <div className="mt-2 text-sm text-slate-500">
        {description}
      </div>

      <div className="mt-5 text-sm font-semibold text-blue-400 transition group-hover:text-blue-300">
        Manage →
      </div>
    </Link>
  );
}

interface QuickActionProps {
  href: string;
  title: string;
  description: string;
}

function QuickAction({
  href,
  title,
  description,
}: QuickActionProps) {
  return (
    <Link
      href={href}
      className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-blue-400/20 hover:bg-white/[0.05]"
    >
      <div className="text-lg font-bold text-white">
        {title}
      </div>

      <div className="mt-2 text-sm text-slate-500">
        {description}
      </div>
    </Link>
  );
}