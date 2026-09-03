import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/user-auth";

import ChangePasswordForm from "./ChangePasswordForm";
import SecuritySection from "./SecuritySection";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <section className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Account
          </p>

          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Your Profile
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            View your account information and manage your
            Rizcent profile.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Card Header */}
          <div className="border-b border-slate-200 bg-slate-950 px-6 py-8 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              {/* Avatar */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-black !text-white shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="text-2xl font-black !text-white">
                  {user.name}
                </h2>

                <p className="mt-1 text-sm text-slate-300">
                  Rizcent customer account
                </p>
              </div>
            </div>
          </div>

          {/* Information */}
          <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
            {/* Full Name */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Full Name
              </p>

              <p className="mt-2 break-words text-lg font-bold text-slate-950">
                {user.name}
              </p>
            </div>

            {/* Email */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Email Address
              </p>

              <p className="mt-2 break-words text-lg font-bold text-slate-950">
                {user.email}
              </p>
            </div>

            {/* Account Created */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Member Since
              </p>

              <p className="mt-2 text-lg font-bold text-slate-950">
                {new Intl.DateTimeFormat("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).format(new Date(user.createdAt))}
              </p>
            </div>

            {/* Account Status */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Account Status
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                <span className="text-lg font-bold text-slate-950">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <ChangePasswordForm />

        {/* Account Security */}
        <SecuritySection />

        {/* Security Notice */}
        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="font-bold text-blue-950">
            🔒 Account Security
          </p>

          <p className="mt-1 text-sm leading-6 text-blue-800">
            Keep your password private and use a unique
            password for your Rizcent account. If you believe
            your account has been compromised, change your
            password immediately.
          </p>
        </div>
      </div>
    </section>
  );
}