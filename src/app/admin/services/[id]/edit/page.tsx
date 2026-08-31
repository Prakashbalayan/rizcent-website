import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import AdminServiceForm from "@/components/AdminServiceForm";

interface EditServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

function parseList(value: string): string[] {
  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item): item is string => typeof item === "string"
      );
    }
  } catch {
    // Fall back to newline/comma-separated values.
  }

  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default async function EditServicePage({
  params,
}: EditServicePageProps) {
  const { id } = await params;

  const service = await prisma.service.findUnique({
    where: {
      id,
    },
  });

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Back */}
        <Link
          href="/admin/services"
          className="text-sm text-slate-500 transition hover:text-white"
        >
          ← Back to Services
        </Link>

        {/* Header */}
        <div className="mt-8">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
            Rizcent Admin
          </div>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Edit Service
          </h1>

          <p className="mt-3 text-slate-400">
            Update the content and visibility settings for{" "}
            <span className="font-medium text-slate-200">
              {service.title}
            </span>
            .
          </p>
        </div>

        {/* Form */}
        <div className="mt-10">
          <AdminServiceForm
            service={{
              id: service.id,
              slug: service.slug,
              title: service.title,
              shortDescription: service.shortDescription,
              description: service.description,
              category: service.category,
              features: parseList(service.features),
              process: parseList(service.process),
              featured: service.featured,
              published: service.published,
            }}
          />
        </div>
      </div>
    </main>
  );
}