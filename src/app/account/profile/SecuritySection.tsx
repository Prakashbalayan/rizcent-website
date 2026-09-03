"use client";

import { useState } from "react";

export default function SecuritySection() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleLogoutAll() {
    const confirmed = window.confirm(
      "Sign out all other devices? Your current device will remain signed in.",
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "/api/auth/logout-all",
        {
          method: "POST",
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message ||
            "Unable to sign out other devices.",
        );
        return;
      }

      setMessage(
        data.message ||
          "All other devices have been signed out successfully.",
      );
    } catch {
      setError(
        "Something went wrong. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-950 px-6 py-7 sm:px-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xl shadow-lg">
            🛡️
          </div>

          <div>
            <h2 className="text-xl font-black !text-white sm:text-2xl">
              Account Security
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Manage your account security and active
              sessions.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* Success */}
        {message && (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-800">
              ✓ {message}
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Security items */}
        <div className="space-y-4">
          {/* Password */}
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm ring-1 ring-slate-200">
                🔑
              </div>

              <div>
                <p className="font-bold text-slate-950">
                  Password
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Your account is protected by a securely
                  hashed password.
                </p>
              </div>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Protected
            </span>
          </div>

          {/* Session */}
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm ring-1 ring-slate-200">
                💻
              </div>

              <div>
                <p className="font-bold text-slate-950">
                  Current Session
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  This device is currently signed in to your
                  account.
                </p>
              </div>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Active
            </span>
          </div>

          {/* All other sessions */}
          <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg">
                🌐
              </div>

              <div>
                <p className="font-bold text-slate-950">
                  Other Devices
                </p>

                <p className="mt-1 max-w-xl text-sm leading-5 text-slate-500">
                  Sign out all other browsers and devices
                  connected to your Rizcent account. Your
                  current device will remain signed in.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogoutAll}
              disabled={loading}
              className="w-full shrink-0 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold !text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {loading
                ? "Signing Out..."
                : "Sign Out Other Devices"}
            </button>
          </div>
        </div>

        {/* Security recommendations */}
        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="font-bold text-blue-950">
            🔒 Security Recommendations
          </p>

          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-sm text-blue-800">
              <span className="font-bold text-emerald-600">
                ✓
              </span>
              Use a unique password for your account.
            </div>

            <div className="flex items-center gap-2 text-sm text-blue-800">
              <span className="font-bold text-emerald-600">
                ✓
              </span>
              Never share your password or reset link.
            </div>

            <div className="flex items-center gap-2 text-sm text-blue-800">
              <span className="font-bold text-emerald-600">
                ✓
              </span>
              Sign out other devices if you suspect
              unauthorized access.
            </div>

            <div className="flex items-center gap-2 text-sm text-blue-800">
              <span className="font-bold text-emerald-600">
                ✓
              </span>
              Keep your recovery email address accessible.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}