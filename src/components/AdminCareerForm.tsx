"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface CareerFormData {
  id?: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  featured: boolean;
  published: boolean;
}

interface AdminCareerFormProps {
  initialData?: CareerFormData;
  mode?: "create" | "edit";
}

const emptyForm: CareerFormData = {
  slug: "",
  title: "",
  department: "",
  location: "India / Remote",
  type: "Full-time",
  experience: "",
  description: "",
  responsibilities: [""],
  requirements: [""],
  niceToHave: [""],
  featured: false,
  published: true,
};

export default function AdminCareerForm({
  initialData,
  mode = "create",
}: AdminCareerFormProps) {
  const router = useRouter();

  const [form, setForm] = useState<CareerFormData>(
    initialData ?? emptyForm
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function updateField<K extends keyof CareerFormData>(
    field: K,
    value: CareerFormData[K]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updateArray(
    field: "responsibilities" | "requirements" | "niceToHave",
    index: number,
    value: string
  ) {
    setForm((current) => {
      const updated = [...current[field]];
      updated[index] = value;

      return {
        ...current,
        [field]: updated,
      };
    });
  }

  function addArrayItem(
    field: "responsibilities" | "requirements" | "niceToHave"
  ) {
    setForm((current) => ({
      ...current,
      [field]: [...current[field], ""],
    }));
  }

  function removeArrayItem(
    field: "responsibilities" | "requirements" | "niceToHave",
    index: number
  ) {
    setForm((current) => {
      const updated = current[field].filter(
        (_, itemIndex) => itemIndex !== index
      );

      return {
        ...current,
        [field]: updated.length > 0 ? updated : [""],
      };
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      ...form,
      responsibilities: form.responsibilities
        .map((item) => item.trim())
        .filter(Boolean),
      requirements: form.requirements
        .map((item) => item.trim())
        .filter(Boolean),
      niceToHave: form.niceToHave
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      const endpoint =
        mode === "edit" && form.id
          ? `/api/admin/careers/${form.id}`
          : "/api/admin/careers";

      const response = await fetch(endpoint, {
        method: mode === "edit" ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to save job."
        );
      }

      setSuccess(
        mode === "edit"
          ? "Job updated successfully."
          : "Job created successfully."
      );

      if (mode === "create") {
        setForm(emptyForm);
      }

      router.refresh();

      if (mode === "create") {
        setTimeout(() => {
          router.push("/admin/careers");
        }, 700);
      }
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to save job."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* Basic Information */}
      <section className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <div className="mb-7">
          <h2 className="text-xl font-bold text-white">
            Basic Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Main information about the position.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Field
            label="Job Title"
            required
            value={form.title}
            onChange={(value) =>
              updateField("title", value)
            }
            placeholder="Senior Full Stack Developer"
          />

          <Field
            label="Slug"
            required
            value={form.slug}
            onChange={(value) =>
              updateField("slug", value)
            }
            placeholder="senior-full-stack-developer"
          />

          <Field
            label="Department"
            required
            value={form.department}
            onChange={(value) =>
              updateField("department", value)
            }
            placeholder="Engineering"
          />

          <Field
            label="Location"
            required
            value={form.location}
            onChange={(value) =>
              updateField("location", value)
            }
            placeholder="India / Remote"
          />

          <SelectField
            label="Employment Type"
            value={form.type}
            options={[
              "Full-time",
              "Part-time",
              "Contract",
              "Internship",
            ]}
            onChange={(value) =>
              updateField("type", value)
            }
          />

          <Field
            label="Experience"
            required
            value={form.experience}
            onChange={(value) =>
              updateField("experience", value)
            }
            placeholder="3+ years"
          />
        </div>

        <div className="mt-6">
          <TextArea
            label="Job Description"
            required
            value={form.description}
            onChange={(value) =>
              updateField("description", value)
            }
            placeholder="Describe the role and what the candidate will work on..."
            rows={6}
          />
        </div>
      </section>

      {/* Responsibilities */}
      <ArraySection
        title="Responsibilities"
        description="What the person will be responsible for."
        items={form.responsibilities}
        field="responsibilities"
        onChange={updateArray}
        onAdd={addArrayItem}
        onRemove={removeArrayItem}
      />

      {/* Requirements */}
      <ArraySection
        title="Requirements"
        description="Required skills and qualifications."
        items={form.requirements}
        field="requirements"
        onChange={updateArray}
        onAdd={addArrayItem}
        onRemove={removeArrayItem}
      />

      {/* Nice to Have */}
      <ArraySection
        title="Nice to Have"
        description="Additional skills that are beneficial but not mandatory."
        items={form.niceToHave}
        field="niceToHave"
        onChange={updateArray}
        onAdd={addArrayItem}
        onRemove={removeArrayItem}
      />

      {/* Publishing */}
      <section className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <div className="mb-7">
          <h2 className="text-xl font-bold text-white">
            Publishing
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Control how this job appears on the careers page.
          </p>
        </div>

        <div className="space-y-5">
          <Toggle
            label="Featured Job"
            description="Show this job as a featured opening."
            checked={form.featured}
            onChange={(checked) =>
              updateField("featured", checked)
            }
          />

          <Toggle
            label="Published"
            description="Published jobs are visible on the public careers page."
            checked={form.published}
            onChange={(checked) =>
              updateField("published", checked)
            }
          />
        </div>
      </section>

      {/* Messages */}
      {error && (
        <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-300">
          {success}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.push("/admin/careers")}
          className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving
            ? "Saving..."
            : mode === "edit"
              ? "Save Changes"
              : "Create Job"}
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
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-300">
        {label}
        {required && (
          <span className="ml-1 text-blue-400">*</span>
        )}
      </label>

      <input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 5,
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
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-300">
        {label}
        {required && (
          <span className="ml-1 text-blue-400">*</span>
        )}
      </label>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="w-full resize-y rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-300">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function ArraySection({
  title,
  description,
  items,
  field,
  onChange,
  onAdd,
  onRemove,
}: {
  title: string;
  description: string;
  items: string[];
  field:
    | "responsibilities"
    | "requirements"
    | "niceToHave";
  onChange: (
    field:
      | "responsibilities"
      | "requirements"
      | "niceToHave",
    index: number,
    value: string
  ) => void;
  onAdd: (
    field:
      | "responsibilities"
      | "requirements"
      | "niceToHave"
  ) => void;
  onRemove: (
    field:
      | "responsibilities"
      | "requirements"
      | "niceToHave",
    index: number
  ) => void;
}) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <div className="mb-7">
        <h2 className="text-xl font-bold text-white">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={`${field}-${index}`}
            className="flex gap-3"
          >
            <input
              value={item}
              onChange={(event) =>
                onChange(
                  field,
                  index,
                  event.target.value
                )
              }
              placeholder={`${title} item ${index + 1}`}
              className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500"
            />

            <button
              type="button"
              onClick={() =>
                onRemove(field, index)
              }
              className="shrink-0 rounded-2xl border border-red-400/10 px-4 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onAdd(field)}
        className="mt-5 rounded-full border border-blue-400/20 bg-blue-500/10 px-5 py-2.5 text-sm font-semibold text-blue-400 transition hover:bg-blue-500/20"
      >
        + Add Item
      </button>
    </section>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-5 rounded-2xl border border-white/10 bg-slate-900/50 p-5">
      <div>
        <div className="text-sm font-semibold text-white">
          {label}
        </div>

        <div className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </div>
      </div>

      <input
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange(event.target.checked)
        }
        className="h-5 w-5 shrink-0 accent-blue-600"
      />
    </label>
  );
}