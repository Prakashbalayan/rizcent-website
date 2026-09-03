"use client";

import { FormEvent, useMemo, useState } from "react";

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

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [validationErrors, setValidationErrors] =
    useState<string[]>([]);

  const passwordErrors = useMemo(
    () => validatePassword(newPassword),
    [newPassword],
  );

  const passwordStrength = useMemo(
    () => getPasswordStrength(newPassword),
    [newPassword],
  );

  const passwordsMatch =
    confirmPassword.length > 0 &&
    newPassword === confirmPassword;

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setValidationErrors([]);

    if (!currentPassword) {
      setError("Please enter your current password.");
      return;
    }

    if (passwordErrors.length > 0) {
      setValidationErrors(passwordErrors);
      setError("Please fix the new password requirements.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setError(
        "Your new password must be different from your current password.",
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/auth/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message ||
            "Unable to change your password.",
        );

        if (Array.isArray(data.errors)) {
          setValidationErrors(data.errors);
        }

        return;
      }

      setSuccess(
        data.message ||
          "Your password has been changed successfully.",
      );

      setCurrentPassword("");
      setNewPassword("");
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
    <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-950 px-6 py-7 sm:px-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xl shadow-lg">
            🔐
          </div>

          <div>
            <h2 className="text-xl font-black !text-white sm:text-2xl">
              Change Password
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Update your account password and keep your
              account secure.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-6 sm:p-8">
        {success && (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-800">
              ✓ {success}
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Current Password */}
        <div>
          <label
            htmlFor="currentPassword"
            className="mb-2 block text-sm font-bold text-slate-800"
          >
            Current Password
          </label>

          <div className="relative">
            <input
              id="currentPassword"
              type={
                showCurrentPassword
                  ? "text"
                  : "password"
              }
              value={currentPassword}
              onChange={(event) => {
                setCurrentPassword(event.target.value);
                setError("");
              }}
              placeholder="Enter your current password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-14 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />

            <button
              type="button"
              onClick={() =>
                setShowCurrentPassword(
                  (current) => !current,
                )
              }
              aria-label={
                showCurrentPassword
                  ? "Hide current password"
                  : "Show current password"
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-sm text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {showCurrentPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="mt-5">
          <label
            htmlFor="newPassword"
            className="mb-2 block text-sm font-bold text-slate-800"
          >
            New Password
          </label>

          <div className="relative">
            <input
              id="newPassword"
              type={
                showNewPassword ? "text" : "password"
              }
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value);
                setError("");
              }}
              placeholder="Create a new password"
              autoComplete="new-password"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-14 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />

            <button
              type="button"
              onClick={() =>
                setShowNewPassword(
                  (current) => !current,
                )
              }
              aria-label={
                showNewPassword
                  ? "Hide new password"
                  : "Show new password"
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-sm text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {showNewPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Strength */}
          {newPassword && (
            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  Password strength
                </span>

                <span
                  className={`text-xs font-bold ${
                    passwordStrength.label === "Strong"
                      ? "text-emerald-600"
                      : passwordStrength.label ===
                          "Medium"
                        ? "text-amber-600"
                        : "text-red-600"
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
                      passwordStrength.score >= level
                        ? passwordStrength.label ===
                          "Strong"
                          ? "bg-emerald-500"
                          : passwordStrength.label ===
                              "Medium"
                            ? "bg-amber-500"
                            : "bg-red-500"
                        : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Requirements */}
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-3 text-xs font-black uppercase tracking-wider text-slate-500">
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
                    passed = newPassword.length >= 8;
                  }

                  if (
                    requirement ===
                    "One uppercase letter"
                  ) {
                    passed = /[A-Z]/.test(
                      newPassword,
                    );
                  }

                  if (
                    requirement ===
                    "One lowercase letter"
                  ) {
                    passed = /[a-z]/.test(
                      newPassword,
                    );
                  }

                  if (
                    requirement === "One number"
                  ) {
                    passed = /[0-9]/.test(
                      newPassword,
                    );
                  }

                  if (
                    requirement ===
                    "One special character"
                  ) {
                    passed =
                      /[^A-Za-z0-9]/.test(
                        newPassword,
                      );
                  }

                  if (
                    requirement === "No spaces"
                  ) {
                    passed =
                      newPassword.length > 0 &&
                      !/\s/.test(newPassword);
                  }

                  return (
                    <div
                      key={requirement}
                      className={`flex items-center gap-2 text-xs font-medium ${
                        passed
                          ? "text-emerald-600"
                          : "text-slate-500"
                      }`}
                    >
                      <span className="w-4 text-center">
                        {passed ? "✓" : "○"}
                      </span>

                      <span>{requirement}</span>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mt-5">
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-bold text-slate-800"
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
              placeholder="Re-enter your new password"
              autoComplete="new-password"
              className={`w-full rounded-xl border bg-slate-50 px-4 py-3 pr-14 text-slate-950 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                confirmPassword.length > 0
                  ? passwordsMatch
                    ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/10"
                    : "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                  : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
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
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-sm text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {confirmPassword.length > 0 && (
            <p
              className={`mt-2 text-xs font-semibold ${
                passwordsMatch
                  ? "text-emerald-600"
                  : "text-red-600"
              }`}
            >
              {passwordsMatch
                ? "✓ Passwords match"
                : "✕ Passwords do not match"}
            </p>
          )}
        </div>

        {/* API validation errors */}
        {validationErrors.length > 0 && (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="mb-2 text-sm font-bold text-red-800">
              Please fix the following:
            </p>

            <ul className="space-y-1">
              {validationErrors.map(
                (validationError) => (
                  <li
                    key={validationError}
                    className="text-xs text-red-700"
                  >
                    • {validationError}
                  </li>
                ),
              )}
            </ul>
          </div>
        )}

        {/* Security note */}
        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <p className="text-sm font-bold text-blue-950">
            🔒 Security Notice
          </p>

          <p className="mt-1 text-xs leading-5 text-blue-800">
            Changing your password will sign out other
            active sessions on your account. Your current
            device will remain signed in.
          </p>
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={() => {
            const form =
              document.getElementById(
                "change-password-form",
              ) as HTMLFormElement | null;

            form?.requestSubmit();
          }}
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-bold !text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Changing Password..."
            : "Change Password"}
        </button>

        {/* Hidden form wrapper */}
        <form
          id="change-password-form"
          onSubmit={handleSubmit}
          className="hidden"
        >
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}