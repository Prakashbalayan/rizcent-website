"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import {
  PASSWORD_MIN_LENGTH,
  validatePassword,
} from "@/lib/password-policy";
import { getSafeRedirect } from "@/lib/safe-redirect";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectParam = searchParams.get("redirect");

  const redirectTo = useMemo(
    () => getSafeRedirect(redirectParam, "/account"),
    [redirectParam],
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const passwordValidation = useMemo(
    () => validatePassword(password),
    [password],
  );

  const passwordChecks = [
    {
      label: `At least ${PASSWORD_MIN_LENGTH} characters`,
      valid:
        password.length >= PASSWORD_MIN_LENGTH,
    },
    {
      label: "One uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "One lowercase letter",
      valid: /[a-z]/.test(password),
    },
    {
      label: "One number",
      valid: /[0-9]/.test(password),
    },
    {
      label: "One special character",
      valid: /[^A-Za-z0-9]/.test(password),
    },
    {
      label: "No spaces",
      valid: password.length > 0 && !/\s/.test(password),
    },
  ];

  const passwordStrength = useMemo(() => {
    if (!password) {
      return {
        label: "Enter a password",
        percentage: 0,
      };
    }

    const passedChecks = passwordChecks.filter(
      (check) => check.valid,
    ).length;

    if (passedChecks <= 2) {
      return {
        label: "Weak",
        percentage: 33,
      };
    }

    if (passedChecks <= 4) {
      return {
        label: "Medium",
        percentage: 66,
      };
    }

    return {
      label: "Strong",
      percentage: 100,
    };
  }, [password, passwordChecks]);

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const passwordsDoNotMatch =
    confirmPassword.length > 0 &&
    password !== confirmPassword;

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!passwordValidation.valid) {
      setError(
        "Please make sure your password meets all security requirements.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message ||
            "Unable to create your account. Please try again.",
        );
        return;
      }

      setSuccess(
        "Account created successfully. Redirecting...",
      );

      router.push(redirectTo);
      router.refresh();
    } catch (requestError) {
      console.error(
        "REGISTER_PAGE_ERROR:",
        requestError,
      );

      setError(
        "Something went wrong. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-lg items-center justify-center">
        <div className="w-full">
          {/* Brand */}
          <div className="mb-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-xl font-black !text-white shadow-lg shadow-blue-600/20">
                R
              </span>

              <span className="text-xl font-black !text-white">
                Rizcent
              </span>
            </Link>

            <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
              Customer Portal
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight !text-white sm:text-4xl">
              Create your account
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Create a secure Rizcent account to manage your
              projects and quote requests.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-bold !text-white"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Your full name"
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm !text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold !text-white"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm !text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold !text-white"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword ? "text" : "password"
                    }
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Create a strong password"
                    required
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-12 text-sm !text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    disabled={loading}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>

                {/* Strength */}
                <div className="mt-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">
                      Password strength
                    </span>

                    <span
                      className={`text-xs font-bold ${
                        passwordStrength.percentage === 100
                          ? "text-emerald-400"
                          : passwordStrength.percentage >=
                              66
                            ? "text-yellow-400"
                            : password
                              ? "text-red-400"
                              : "text-slate-500"
                      }`}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all duration-300"
                      style={{
                        width: `${passwordStrength.percentage}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Password checklist */}
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {passwordChecks.map((check) => (
                    <div
                      key={check.label}
                      className="flex items-center gap-2"
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                          check.valid
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-slate-800 text-slate-500"
                        }`}
                      >
                        {check.valid ? "✓" : "•"}
                      </span>

                      <span
                        className={`text-xs ${
                          check.valid
                            ? "text-emerald-400"
                            : "text-slate-500"
                        }`}
                      >
                        {check.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-bold !text-white"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(
                        event.target.value,
                      )
                    }
                    placeholder="Enter your password again"
                    required
                    disabled={loading}
                    className={`w-full rounded-xl border bg-slate-950 px-4 py-3 pr-12 text-sm !text-white outline-none transition placeholder:text-slate-500 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                      passwordsDoNotMatch
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : passwordsMatch
                          ? "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/20"
                          : "border-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) => !current,
                      )
                    }
                    disabled={loading}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>

                {passwordsMatch && (
                  <p className="mt-2 text-xs font-semibold text-emerald-400">
                    ✓ Passwords match
                  </p>
                )}

                {passwordsDoNotMatch && (
                  <p className="mt-2 text-xs font-semibold text-red-400">
                    Passwords do not match
                  </p>
                )}
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300"
                >
                  {error}
                </div>
              )}

              {/* Success */}
              {success && (
                <div
                  role="status"
                  className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300"
                >
                  {success}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-black !text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 hover:shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>
            </form>

            {/* Login */}
            <div className="mt-7 border-t border-slate-800 pt-6 text-center">
              <p className="text-sm text-slate-400">
                Already have an account?{" "}
                <Link
                  href={
                    redirectTo !== "/account"
                      ? `/login?redirect=${encodeURIComponent(
                          redirectTo,
                        )}`
                      : "/login"
                  }
                  className="font-bold text-blue-400 transition hover:text-blue-300"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          {/* Back */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm font-semibold text-slate-500 transition hover:text-slate-300"
            >
              ← Back to Rizcent
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}