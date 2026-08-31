import Link from "next/link";

import AdminCareerForm from "@/components/AdminCareerForm";

export default function NewCareerPage() {
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
              Create Job
            </h1>

            <p className="mt-4 max-w-2xl text-slate-400">
              Add a new career opportunity to the Rizcent website.
            </p>
          </div>
        </header>

        <AdminCareerForm mode="create" />
      </div>
    </main>
  );
}