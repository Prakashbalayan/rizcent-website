import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/user-auth";

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-semibold text-indigo-600">
            CUSTOMER ACCOUNT
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Welcome, {user.name}
          </h1>

          <p className="mt-3 text-slate-600">
            Manage your profile, projects and enquiries.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Link
            href="/account/profile"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              👤
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-950">
              Profile
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              View and manage your account information.
            </p>

            <span className="mt-5 inline-block text-sm font-semibold text-indigo-600">
              Manage Profile →
            </span>
          </Link>

          <Link
            href="/account/quotes"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              📋
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-950">
              My Requests
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              View your project quote requests and enquiries.
            </p>

            <span className="mt-5 inline-block text-sm font-semibold text-indigo-600">
              View Requests →
            </span>
          </Link>

          <Link
            href="/request-quote"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              +
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-950">
              Start a Project
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Tell us about your next digital project.
            </p>

            <span className="mt-5 inline-block text-sm font-semibold text-indigo-600">
              Request a Quote →
            </span>
          </Link>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-950">
            Account Information
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Name
              </p>

              <p className="mt-1 text-sm font-medium text-slate-800">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Email
              </p>

              <p className="mt-1 text-sm font-medium text-slate-800">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}