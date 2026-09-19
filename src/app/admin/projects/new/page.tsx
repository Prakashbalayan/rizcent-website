import Link from "next/link";

import AdminProjectForm from "@/components/AdminProjectForm";

export default function NewProjectPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin/projects"
          className="text-sm text-slate-500 transition hover:text-black"
        >
          ← Projects
        </Link>

        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Rizcent Admin
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Create Project
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Add a new project to your Rizcent Technologies portfolio.
          </p>
        </div>

        <div className="mt-10">
          <AdminProjectForm />
        </div>
      </div>
    </main>
  );
}