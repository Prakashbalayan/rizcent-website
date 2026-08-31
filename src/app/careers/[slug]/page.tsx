import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

interface CareerPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: CareerPageProps): Promise<Metadata> {
  const { slug } = await params;

  const job = await prisma.job.findUnique({
    where: {
      slug,
    },
  });

  if (!job || !job.published) {
    return {
      title: "Position Not Found",
    };
  }

  return {
    title: `${job.title} | Careers`,
    description: job.description,
  };
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
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export default async function CareerDetailsPage({
  params,
}: CareerPageProps) {
  const { slug } = await params;

  const job = await prisma.job.findUnique({
    where: {
      slug,
    },
  });

  if (!job || !job.published) {
    notFound();
  }

  const responsibilities = parseList(job.responsibilities);
  const requirements = parseList(job.requirements);
  const niceToHave = parseList(job.niceToHave);

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
          >
            ← Back to Careers
          </Link>

          <div className="mt-10 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
                {job.department}
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                {job.type}
              </span>

              {job.featured && (
                <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950">
                  Featured
                </span>
              )}
            </div>

            <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {job.title}
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              {job.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-400">
              <span>{job.location}</span>
              <span>{job.experience}</span>
              <span>{job.type}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* Content */}
            <div className="space-y-14">
              {/* Responsibilities */}
              <section>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                  The Role
                </div>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Responsibilities
                </h2>

                <div className="mt-7 space-y-4">
                  {responsibilities.map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="flex gap-4"
                    >
                      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
                        ✓
                      </div>

                      <p className="text-lg leading-8 text-slate-600">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Requirements */}
              <section>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                  What You Bring
                </div>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Requirements
                </h2>

                <div className="mt-7 space-y-4">
                  {requirements.map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="flex gap-4"
                    >
                      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                        ✓
                      </div>

                      <p className="text-lg leading-8 text-slate-600">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Nice to Have */}
              {niceToHave.length > 0 && (
                <section>
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                    Bonus
                  </div>

                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                    Nice to Have
                  </h2>

                  <div className="mt-7 space-y-4">
                    {niceToHave.map((item, index) => (
                      <div
                        key={`${item}-${index}`}
                        className="flex gap-4"
                      >
                        <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                          +
                        </div>

                        <p className="text-lg leading-8 text-slate-600">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Apply Card */}
            <aside>
              <div className="sticky top-8 rounded-[30px] border border-slate-200 bg-slate-50 p-7">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Interested?
                </div>

                <h2 className="mt-4 text-2xl font-bold text-slate-950">
                  Join Rizcent
                </h2>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Think this role is a good fit? Get in touch with our team
                  and tell us about yourself.
                </p>

                <Link
                  href={`/contact?job=${encodeURIComponent(job.title)}`}
                  className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Apply for this Position →
                </Link>

                <Link
                  href="/careers"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
                >
                  View Other Positions
                </Link>

                <div className="mt-7 border-t border-slate-200 pt-6">
                  <div className="space-y-4 text-sm">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Department
                      </div>

                      <div className="mt-1 font-medium text-slate-800">
                        {job.department}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Location
                      </div>

                      <div className="mt-1 font-medium text-slate-800">
                        {job.location}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Experience
                      </div>

                      <div className="mt-1 font-medium text-slate-800">
                        {job.experience}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            More Opportunities
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Looking for another opportunity?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
            Explore our other open positions and find a role that matches
            your skills and interests.
          </p>

          <Link
            href="/careers"
            className="mt-8 inline-flex rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            View All Positions →
          </Link>
        </div>
      </section>
    </main>
  );
}