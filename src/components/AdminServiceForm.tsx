"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface ServiceData {
  id?: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  features: string[];
  process: string[];
  featured: boolean;
  published: boolean;
}

interface AdminServiceFormProps {
  service?: ServiceData;
}

export default function AdminServiceForm({
  service,
}: AdminServiceFormProps) {
  const router = useRouter();

  const [slug, setSlug] = useState(service?.slug ?? "");
  const [title, setTitle] = useState(service?.title ?? "");
  const [category, setCategory] = useState(service?.category ?? "");
  const [shortDescription, setShortDescription] = useState(
    service?.shortDescription ?? ""
  );
  const [description, setDescription] = useState(
    service?.description ?? ""
  );
  const [features, setFeatures] = useState(
    service?.features?.join("\n") ?? ""
  );
  const [process, setProcess] = useState(
    service?.process?.join("\n") ?? ""
  );
  const [featured, setFeatured] = useState(
    service?.featured ?? false
  );
  const [published, setPublished] = useState(
    service?.published ?? true
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function handleTitleChange(value: string) {
    setTitle(value);

    if (!service) {
      setSlug(generateSlug(value));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setError("");

    const payload = {
      slug,
      title,
      category,
      shortDescription,
      description,
      features: features
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      process: process
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      featured,
      published,
    };

    try {
      const response = await fetch(
        service
          ? `/api/admin/services/${service.id}`
          : "/api/admin/services",
        {
          method: service ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      router.push("/admin/services");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Field
          label="Title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Software Development"
          required
        />

        <Field
          label="Slug"
          value={slug}
          onChange={setSlug}
          placeholder="software-development"
          required
        />

        <Field
          label="Category"
          value={category}
          onChange={setCategory}
          placeholder="Software Development"
          required
        />

        <div className="flex items-center gap-6 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
          <label className="flex cursor-pointer items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={featured}
              onChange={(event) =>
                setFeatured(event.target.checked)
              }
              className="h-4 w-4"
            />
            Featured
          </label>

          <label className="flex cursor-pointer items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={published}
              onChange={(event) =>
                setPublished(event.target.checked)
              }
              className="h-4 w-4"
            />
            Published
          </label>
        </div>
      </div>

      <Field
        label="Short Description"
        value={shortDescription}
        onChange={setShortDescription}
        placeholder="Short description shown on service cards."
        required
      />

      <TextArea
        label="Description"
        value={description}
        onChange={setDescription}
        placeholder="Detailed service description."
        rows={6}
        required
      />

      <TextArea
        label="Features"
        value={features}
        onChange={setFeatures}
        placeholder={"Custom software applications\nAPI development\nSystem integrations"}
        rows={7}
        help="Enter one feature per line."
      />

      <TextArea
        label="Process"
        value={process}
        onChange={setProcess}
        placeholder={"Discovery & requirements\nArchitecture & planning\nDevelopment\nTesting & deployment"}
        rows={7}
        help="Enter one process step per line."
      />

      <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.push("/admin/services")}
          className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : service
              ? "Save Changes"
              : "Create Service"}
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
      <span className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </span>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows,
  help,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows: number;
  help?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </span>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
      />

      {help && (
        <span className="mt-2 block text-xs text-slate-600">
          {help}
        </span>
      )}
    </label>
  );
}