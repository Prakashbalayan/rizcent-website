"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export type ProjectFormData = {
  id?: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  technologies: string;
  services: string;
  year: string;
  clientType: string;
  featured: boolean;
  challenge: string;
  solution: string;
  results: string;
};

type Props = {
  project?: ProjectFormData;
};

const emptyProject: ProjectFormData = {
  slug: "",
  title: "",
  category: "",
  shortDescription: "",
  description: "",
  technologies: "",
  services: "",
  year: new Date().getFullYear().toString(),
  clientType: "",
  featured: false,
  challenge: "",
  solution: "",
  results: "",
};

export default function AdminProjectForm({ project }: Props) {
  const router = useRouter();

  const [form, setForm] = useState<ProjectFormData>(
    project ?? emptyProject
  );

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const isEditing = Boolean(project?.id);

  function updateField<K extends keyof ProjectFormData>(
    field: K,
    value: ProjectFormData[K]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function createSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function handleTitleChange(value: string) {
    updateField("title", value);

    if (!isEditing || !form.slug) {
      updateField("slug", createSlug(value));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const url = isEditing
        ? `/api/admin/projects/${form.id}`
        : "/api/admin/projects";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong."
        );
      }

      setMessage(data.message);

      setTimeout(() => {
        router.push("/admin/projects");
        router.refresh();
      }, 600);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Basic Information */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            Basic Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Main information displayed on your project.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <Field
            label="Project Title"
            value={form.title}
            onChange={handleTitleChange}
            required
          />

          <Field
            label="Slug"
            value={form.slug}
            onChange={(value) =>
              updateField("slug", createSlug(value))
            }
            placeholder="business-management-platform"
            required
          />

          <Field
            label="Category"
            value={form.category}
            onChange={(value) =>
              updateField("category", value)
            }
            placeholder="Software Development"
            required
          />

          <Field
            label="Year"
            value={form.year}
            onChange={(value) =>
              updateField("year", value)
            }
            required
          />

          <Field
            label="Client Type"
            value={form.clientType}
            onChange={(value) =>
              updateField("clientType", value)
            }
            placeholder="Business Platform"
            required
          />

          <div className="flex items-center rounded-xl border border-white/10 bg-black/20 px-4">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) =>
                  updateField(
                    "featured",
                    event.target.checked
                  )
                }
                className="h-4 w-4 rounded border-white/20 bg-slate-900"
              />

              <span className="text-sm font-medium">
                Featured Project
              </span>
            </label>
          </div>

        </div>

        <div className="mt-5">
          <TextArea
            label="Short Description"
            value={form.shortDescription}
            onChange={(value) =>
              updateField("shortDescription", value)
            }
            rows={3}
            required
          />
        </div>

        <div className="mt-5">
          <TextArea
            label="Full Description"
            value={form.description}
            onChange={(value) =>
              updateField("description", value)
            }
            rows={5}
            required
          />
        </div>
      </section>

      {/* Technology */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            Technology & Services
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Separate multiple values with commas.
          </p>
        </div>

        <div className="space-y-5">
          <TextArea
            label="Technologies"
            value={form.technologies}
            onChange={(value) =>
              updateField("technologies", value)
            }
            placeholder="Next.js, TypeScript, Node.js, PostgreSQL"
            rows={3}
            required
          />

          <TextArea
            label="Services"
            value={form.services}
            onChange={(value) =>
              updateField("services", value)
            }
            placeholder="Software Development, Web Development, API Development"
            rows={3}
            required
          />
        </div>
      </section>

      {/* Project Details */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            Project Details
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Explain the challenge, solution and project results.
          </p>
        </div>

        <div className="space-y-5">

          <TextArea
            label="Challenge"
            value={form.challenge}
            onChange={(value) =>
              updateField("challenge", value)
            }
            rows={5}
            required
          />

          <TextArea
            label="Solution"
            value={form.solution}
            onChange={(value) =>
              updateField("solution", value)
            }
            rows={5}
            required
          />

          <TextArea
            label="Results"
            value={form.results}
            onChange={(value) =>
              updateField("results", value)
            }
            placeholder={
              "Centralized business workflows\nImproved operational visibility\nReduced manual processes\nScalable technical foundation"
            }
            rows={7}
            required
          />

          <p className="text-xs text-slate-600">
            Put each result on a separate line.
          </p>

        </div>
      </section>

      {/* Messages */}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {message && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          {message}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : isEditing
              ? "Save Changes"
              : "Create Project"}
        </button>

      </div>

    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </span>

      <input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500/50"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </span>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="w-full resize-y rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500/50"
      />
    </label>
  );
}