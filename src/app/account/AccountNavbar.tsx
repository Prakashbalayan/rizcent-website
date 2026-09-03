"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AccountNavbarProps {
  userName: string;
}

export default function AccountNavbar({
  userName,
}: AccountNavbarProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      router.push("/");
      router.refresh();
    } catch {
      setLoading(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-black tracking-tight text-slate-950"
        >
          RIZCENT
          <span className="text-blue-600">.</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/account"
            className="text-sm font-semibold text-slate-700 transition hover:text-blue-600"
          >
            Dashboard
          </Link>

          <Link
            href="/account/profile"
            className="text-sm font-semibold text-slate-700 transition hover:text-blue-600"
          >
            Profile
          </Link>

          <Link
            href="/account/quotes"
            className="text-sm font-semibold text-slate-700 transition hover:text-blue-600"
          >
            My Requests
          </Link>
        </nav>

        {/* User + Logout */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-xs font-medium text-slate-500">
              Signed in as
            </p>

            <p className="max-w-32 truncate text-sm font-bold text-slate-900">
              {userName}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold !text-slate-900 transition hover:border-red-300 hover:bg-red-50 hover:!text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing out..." : "Sign Out"}
          </button>
        </div>
      </div>
    </header>
  );
}