import Link from "next/link";
import AdminServiceForm from "@/components/AdminServiceForm";

export default function NewServicePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin/services"
          className="text-sm text-slate-500 transition hover:text-white"
        >
          ← Back to Services
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
            Rizcent Admin
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Create Service
          </h1>

          <p className="mt-3 text-slate-400">
            Add a new service to your Rizcent Technologies website.
          </p>
        </div>

        <div className="mt-10">
          <AdminServiceForm />
        </div>
      </div>
    </main>
  );
}