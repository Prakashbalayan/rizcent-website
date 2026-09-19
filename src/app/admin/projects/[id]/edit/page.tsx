import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import AdminProjectForm from "@/components/AdminProjectForm";

interface EditProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin/projects"
          className="text-sm text-slate-500 transition hover:text-white"
        >
          ← Projects
        </Link>

        <div className="mb-8 mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Rizcent Admin
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Edit Project
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Update the project information displayed on your website.
          </p>
        </div>

        <AdminProjectForm
          project={{
            id: project.id,
            slug: project.slug,
            title: project.title,
            category: project.category,
            shortDescription: project.shortDescription,
            description: project.description,
            technologies: project.technologies,
            services: project.services,
            year: project.year,
            clientType: project.clientType,
            imageUrl: project.imageUrl,
            featured: project.featured,
            challenge: project.challenge,
            solution: project.solution,
            results: project.results,
          }}
        />
      </div>
    </main>
  );
}