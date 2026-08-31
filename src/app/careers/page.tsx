import type { Metadata } from "next";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Rizcent Technologies and build software, digital products and cybersecurity solutions.",
};

export default async function CareersPage() {
  const jobs = await prisma.job.findMany({
    where: {
      published: true,
    },
    orderBy: [
      {
        featured: "desc",
      },
      {
        createdAt: "asc",
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
              Careers
            </div>

            <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Build the future with us.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Join a technology team building software, digital products and
              cybersecurity solutions for ambitious businesses.
            </p>

            <a
              href="#open-positions"
              className="mt-9 inline-flex rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              View Open Positions →
            </a>
          </div>
        </div>
      </section>

      {/* Why Rizcent */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Why Rizcent
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Work on meaningful technology.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              We believe great products are created by curious people who care
              about quality, technology and the customers they serve.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "01",
                title: "Real Projects",
                text: "Work on practical products and technology challenges.",
              },
              {
                number: "02",
                title: "Learn & Grow",
                text: "Develop your skills through challenging technical work.",
              },
              {
                number: "03",
                title: "Ownership",
                text: "Take responsibility and make meaningful contributions.",
              },
              {
                number: "04",
                title: "Great Team",
                text: "Collaborate with people who care about doing excellent work.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="rounded-[28px] border border-slate-200 p-7"
              >
                <div className="text-sm font-bold text-blue-600">
                  {item.number}
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section
        id="open-positions"
        className="bg-slate-50 py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Open Positions
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Find your next challenge.
            </h2>
          </div>

          {jobs.length === 0 ? (
            <div className="mt-10 rounded-[28px] border border-slate-200 bg-white px-6 py-16 text-center">
              <h3 className="text-2xl font-bold text-slate-950">
                No open positions right now.
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-slate-600">
                We&apos;re not currently hiring for any published positions,
                but we&apos;re always interested in meeting talented people.
              </p>

              <Link
                href="/contact"
                className="mt-7 inline-flex rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Get in Touch →
              </Link>
            </div>
          ) : (
            <div className="mt-10 space-y-4">
              {jobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/careers/${job.slug}`}
                  className="group block rounded-[28px] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg sm:p-8"
                >
                  <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                          {job.department}
                        </span>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                          {job.type}
                        </span>

                        {job.featured && (
                          <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                            Featured
                          </span>
                        )}
                      </div>

                      <h3 className="mt-4 text-2xl font-bold text-slate-950">
                        {job.title}
                      </h3>

                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                        {job.description}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <div className="text-sm text-slate-500">
                        {job.location}
                      </div>

                      <div className="mt-1 text-sm text-slate-500">
                        {job.experience}
                      </div>

                      <div className="mt-5 font-semibold text-blue-600 transition group-hover:translate-x-1">
                        View Position →
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="rounded-[36px] bg-blue-600 px-7 py-16 text-center text-white sm:px-12 lg:px-20">
            <h2 className="text-3xl font-bold sm:text-5xl">
              Don&apos;t see your role?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-blue-100">
              We&apos;re always interested in meeting talented people.
              Introduce yourself and tell us what you can bring to the team.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-blue-600 transition hover:bg-slate-100"
            >
              Get in Touch →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}