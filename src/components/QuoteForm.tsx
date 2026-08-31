"use client";

import { FormEvent, useState } from "react";

const services = [
  "Software Development",
  "Web Development",
  "Mobile Development",
  "SaaS Development",
  "Cybersecurity",
  "Penetration Testing",
  "Security Audit",
  "Cloud Security",
];

export default function QuoteForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function toggleService(service: string) {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service]
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      projectName: String(data.get("projectName") || "").trim(),
      projectType: String(data.get("projectType") || "").trim(),
      timeline: String(data.get("timeline") || "").trim(),
      description: String(data.get("description") || "").trim(),
      services: selectedServices,
      budget: String(data.get("budget") || "").trim(),
      name: String(data.get("name") || "").trim(),
      company: String(data.get("company") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
    };

    if (
      !payload.projectName ||
      !payload.projectType ||
      !payload.timeline ||
      !payload.description ||
      selectedServices.length === 0 ||
      !payload.budget ||
      !payload.name ||
      !payload.email
    ) {
      setError("Please complete all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Something went wrong. Please try again."
        );
      }

      setSuccess(
        "Your project enquiry has been submitted successfully."
      );

      form.reset();
      setSelectedServices([]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

  const labelClass =
    "mb-2.5 block text-sm font-medium text-slate-800";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Project Overview */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.04)] sm:p-8">
        <div className="mb-8 flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
            01
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
              Project overview
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Give us a clear picture of what you want to build.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Project name <span className="text-blue-600">*</span>
            </label>

            <input
              name="projectName"
              required
              placeholder="e.g. Business Management Platform"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Project type <span className="text-blue-600">*</span>
            </label>

            <select
              name="projectType"
              required
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                Select project type
              </option>
              <option value="business-website">Business Website</option>
              <option value="web-application">Web Application</option>
              <option value="mobile-application">
                Mobile Application
              </option>
              <option value="saas-product">SaaS Product</option>
              <option value="software-platform">
                Software Platform
              </option>
              <option value="cybersecurity">Cybersecurity</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>
              Project description <span className="text-blue-600">*</span>
            </label>

            <textarea
              name="description"
              required
              rows={6}
              placeholder="Tell us about your goals, required features, users, integrations and any important requirements..."
              className={`${inputClass} resize-none`}
            />

            <p className="mt-2 text-xs text-slate-400">
              The more detail you provide, the better we can understand your
              project.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.04)] sm:p-8">
        <div className="mb-8 flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
            02
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
              Services required
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Select everything you would like Rizcent to handle.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {services.map((service) => {
            const selected = selectedServices.includes(service);

            return (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className={`group flex items-center justify-between rounded-xl border px-4 py-4 text-left text-sm font-medium transition ${
                  selected
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span>{service}</span>

                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs transition ${
                    selected
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 text-transparent group-hover:border-slate-400"
                  }`}
                >
                  ✓
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Select at least one service.
        </p>
      </section>

      {/* Timeline & Budget */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.04)] sm:p-8">
        <div className="mb-8 flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
            03
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
              Timeline & budget
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Help us understand your expected delivery window and investment.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Expected timeline <span className="text-blue-600">*</span>
            </label>

            <select
              name="timeline"
              required
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                Select timeline
              </option>
              <option value="under-1-month">Under 1 month</option>
              <option value="1-2-months">1–2 months</option>
              <option value="2-4-months">2–4 months</option>
              <option value="4-6-months">4–6 months</option>
              <option value="6-plus-months">6+ months</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>
              Estimated budget <span className="text-blue-600">*</span>
            </label>

            <select
              name="budget"
              required
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                Select budget
              </option>
              <option value="under-1l">Under ₹1 Lakh</option>
              <option value="1-3l">₹1–3 Lakhs</option>
              <option value="3-5l">₹3–5 Lakhs</option>
              <option value="5-10l">₹5–10 Lakhs</option>
              <option value="10-25l">₹10–25 Lakhs</option>
              <option value="25l-plus">₹25 Lakhs+</option>
              <option value="not-sure">Not sure yet</option>
            </select>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.04)] sm:p-8">
        <div className="mb-8 flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
            04
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
              Contact information
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Tell us how our team can reach you.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Full name <span className="text-blue-600">*</span>
            </label>

            <input
              name="name"
              required
              placeholder="Your full name"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Company</label>

            <input
              name="company"
              placeholder="Company name"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Work email <span className="text-blue-600">*</span>
            </label>

            <input
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Phone number</label>

            <input
              name="phone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Status */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
          {success}
        </div>
      )}

      {/* Submit */}
      <div className="flex flex-col items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-slate-950 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:bg-blue-600 hover:shadow-blue-600/20 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-[240px]"
        >
          {loading ? "Submitting..." : "Request a Quote →"}
        </button>

        <p className="text-center text-xs text-slate-400">
          By submitting this form, you agree to be contacted regarding your
          project enquiry.
        </p>
      </div>
    </form>
  );
}