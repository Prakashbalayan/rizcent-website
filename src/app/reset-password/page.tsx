"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const passwordRequirements = [
  "At least 8 characters",
  "One uppercase letter",
  "One lowercase letter",
  "One number",
  "One special character",
  "No spaces",
];

function validatePassword(password: string) {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push(
      "Password must contain at least one uppercase letter.",
    );
  }

  if (!/[a-z]/.test(password)) {
    errors.push(
      "Password must contain at least one lowercase letter.",
    );
  }

  if (!/[0-9]/.test(password)) {
    errors.push(
      "Password must contain at least one number.",
    );
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push(
      "Password must contain at least one special character.",
    );
  }

  if (/\s/.test(password)) {
    errors.push("Password must not contain spaces.");
  }

  return errors;
}

function getPasswordStrength(password: string) {
  if (!password) {
    return {
      score: 0,
      label: "Enter a password",
    };
  }

  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) {
    return {
      score: 1,
      label: "Weak",
    };
  }

  if (score <= 4) {
    return {
      score: 2,
      label: "Medium",
    };
  }

  return {
    score: 3,
    label: "Strong",
  };
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] =
    useState<string[]>([]);

  const passwordErrors = useMemo(
    () => validatePassword(password),
    [password],
  );

  const passwordStrength = useMemo(
    () => getPasswordStrength(password),
    [password],
  );

  const passwordsMatch =
    confirmPassword.length > 0 &&
    password === confirmPassword;

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setValidationErrors([]);

    if (!token) {
      setError(
        "This password reset link is invalid. Please request a new one.",
      );
      return;
    }

    if (passwordErrors.length > 0) {
      setValidationErrors(passwordErrors);
      setError("Please fix the password requirements.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message ||
            "Unable to reset your password.",
        );

        if (Array.isArray(data.errors)) {
          setValidationErrors(data.errors);
        }

        return;
      }

      setSuccess(
        data.message ||
          "Your password has been reset successfully.",
      );

      setPassword("");
      setConfirmPassword("");
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
      <div className="mx-auto flex min-h-[80vh] max-w-lg items-center justify-center">
        <div className="w-full rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-2xl ring-1 ring-cyan-400/20">
              🔑
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              Reset Password
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Create a new secure password for your
              Rizcent account.
            </p>
          </div>

          {/* Success */}
          {success && (
            <div className="mb-6 rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-300">
              <p className="font-semibold">
                Password Reset Successful
              </p>

              <p className="mt-1">{success}</p>
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
              {/* New password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  New Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    placeholder="Create a strong password"
                    required
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 pr-14 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current,
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>

                {/* Strength */}
                {password && (
                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        Password strength
                      </span>

                      <span
                        className={`text-xs font-semibold ${
                          passwordStrength.label ===
                          "Strong"
                            ? "text-emerald-400"
                            : passwordStrength.label ===
                                "Medium"
                              ? "text-amber-400"
                              : "text-red-400"
                        }`}
                      >
                        {passwordStrength.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      {[1, 2, 3].map((level) => (
                        <div
                          key={level}
                          className={`h-1.5 rounded-full transition ${
                            passwordStrength.score >=
                            level
                              ? passwordStrength.label ===
                                "Strong"
                                ? "bg-emerald-400"
                                : passwordStrength.label ===
                                    "Medium"
                                  ? "bg-amber-400"
                                  : "bg-red-400"
                              : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Requirements */}
                <div className="mt-4 rounded-xl border border-white/10 bg-slate-900/50 p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Password Requirements
                  </p>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {passwordRequirements.map(
                      (requirement) => {
                        let passed = false;

                        if (
                          requirement ===
                          "At least 8 characters"
                        ) {
                          passed =
                            password.length >= 8;
                        }

                        if (
                          requirement ===
                          "One uppercase letter"
                        ) {
                          passed =
                            /[A-Z]/.test(password);
                        }

                        if (
                          requirement ===
                          "One lowercase letter"
                        ) {
                          passed =
                            /[a-z]/.test(password);
                        }

                        if (
                          requirement ===
                          "One number"
                        ) {
                          passed =
                            /[0-9]/.test(password);
                        }

                        if (
                          requirement ===
                          "One special character"
                        ) {
                          passed =
                            /[^A-Za-z0-9]/.test(
                              password,
                            );
                        }

                        if (
                          requirement ===
                          "No spaces"
                        ) {
                          passed =
                            password.length > 0 &&
                            !/\s/.test(password);
                        }

                        return (
                          <div
                            key={requirement}
                            className={`flex items-center gap-2 text-xs ${
                              passed
                                ? "text-emerald-400"
                                : "text-slate-500"
                            }`}
                          >
                            <span className="w-4 text-center">
                              {passed ? "✓" : "○"}
                            </span>

                            <span>
                              {requirement}
                            </span>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Confirm New Password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(
                        event.target.value,
                      );
                      setError("");
                    }}
                    placeholder="Re-enter your password"
                    required
                    autoComplete="new-password"
                    className={`w-full rounded-xl border bg-slate-900/80 px-4 py-3 pr-14 text-white outline-none transition placeholder:text-slate-500 focus:ring-2 ${
                      confirmPassword.length > 0
                        ? passwordsMatch
                          ? "border-emerald-400/40 focus:border-emerald-400/50 focus:ring-emerald-400/10"
                          : "border-red-400/40 focus:border-red-400/50 focus:ring-red-400/10"
                        : "border-white/10 focus:border-cyan-400/50 focus:ring-cyan-400/10"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) => !current,
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                  >
                    {showConfirmPassword
                      ? "🙈"
                      : "👁️"}
                  </button>
                </div>

                {confirmPassword.length > 0 && (
                  <p
                    className={`mt-2 text-xs ${
                      passwordsMatch
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {passwordsMatch
                      ? "✓ Passwords match"
                      : "✕ Passwords do not match"}
                  </p>
                )}
              </div>

              {/* Validation errors */}
              {validationErrors.length > 0 && (
                <div className="rounded-xl border border-red-400/20 bg-red-500/10 p-4">
                  <p className="mb-2 text-sm font-semibold text-red-300">
                    Please fix the following:
                  </p>

                  <ul className="space-y-1">
                    {validationErrors.map(
                      (validationError) => (
                        <li
                          key={validationError}
                          className="text-xs text-red-300"
                        >
                          • {validationError}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-cyan-500 px-5 py-3.5 font-semibold !text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Resetting Password..."
                  : "Reset Password"}
              </button>
            </form>
          )}

          {/* Success login button */}
          {success && (
            <Link
              href="/login"
              className="block w-full rounded-xl bg-cyan-500 px-5 py-3.5 text-center font-semibold !text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
            >
              Continue to Sign In
            </Link>
          )}

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