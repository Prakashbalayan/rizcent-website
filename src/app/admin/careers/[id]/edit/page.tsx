import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import AdminCareerForm from "@/components/AdminCareerForm";

interface EditCareerPageProps {
  params: Promise<{
    id: string;
  }>;
}

function parseJsonArray(value: string): string[] {
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

export const dynamic = "force-dynamic";

export default async function EditCareerPage({
  params,
}: EditCareerPageProps) {
  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: {
      id,
    },
  });

  if (!job) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <Link
            href="/admin/careers"
            className="text-sm text-slate-500 transition hover:text-white"
          >
            ← Careers
          </Link>

          <div className="mt-8">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              Rizcent Admin
            </div>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Edit Job
            </h1>

            <p className="mt-4 max-w-2xl text-slate-400">
              Update the details, requirements and publishing settings
              for this career opportunity.
            </p>
          </div>
        </header>

        <AdminCareerForm
          mode="edit"
          initialData={{
            id: job.id,
            slug: job.slug,
            title: job.title,
            department: job.department,
            location: job.location,
            type: job.type,
            experience: job.experience,
            description: job.description,
            responsibilities: parseJsonArray(
              job.responsibilities
            ),
            requirements: parseJsonArray(job.requirements),
            niceToHave: parseJsonArray(job.niceToHave),
            featured: job.featured,
            published: job.published,
          }}
        />
      </div>
    </main>
  );
}