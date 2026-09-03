"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch(
        "/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message ||
            "Something went wrong. Please try again.",
        );
        return;
      }

      setSuccess(
        data.message ||
          "If an account exists for this email, a password reset link has been sent.",
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
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <div className="w-full rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-2xl ring-1 ring-cyan-400/20">
              🔐
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              Forgot Password?
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Enter your email address and we&apos;ll help
              you reset your password.
            </p>
          </div>

          {/* Success */}
          {success && (
            <div className="mb-5 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-4 text-sm leading-6 text-emerald-300">
              <div className="mb-1 font-semibold">
                Check your email
              </div>

              {success}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {!success && (
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-cyan-500 px-5 py-3.5 font-semibold !text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Sending..."
                  : "Send Reset Link"}
              </button>
            </form>
          )}

          {/* After success */}
          {success && (
            <Link
              href="/login"
              className="block w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-center text-sm font-semibold !text-white transition hover:bg-white/10"
            >
              Back to Sign In
            </Link>
          )}

          {/* Back to login */}
          {!success && (
            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                ← Back to Sign In
              </Link>
            </div>
          )}

          {/* Home */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-slate-500 transition hover:text-slate-300"
            >
              Back to Rizcent Technologies
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}