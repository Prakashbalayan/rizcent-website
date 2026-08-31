"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type BlogPost = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  tags: string;
  content: string;
  published: boolean;
};

interface AdminBlogFormProps {
  post?: BlogPost;
}

const emptyPost: BlogPost = {
  slug: "",
  title: "",
  excerpt: "",
  category: "",
  author: "Rizcent Technologies",
  date: new Date().toISOString().slice(0, 10),
  readTime: "",
  featured: false,
  tags: "",
  content: JSON.stringify(
    [
      {
        heading: "",
        paragraphs: [""],
      },
    ],
    null,
    2
  ),
  published: true,
};

export default function AdminBlogForm({
  post,
}: AdminBlogFormProps) {
  const router = useRouter();

  const [form, setForm] = useState<BlogPost>(
    post
      ? {
          ...post,
          tags: formatTags(post.tags),
          content: formatContent(post.content),
        }
      : emptyPost
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isEditing = Boolean(post?.id);

  function updateField<K extends keyof BlogPost>(
    field: K,
    value: BlogPost[K]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function slugify(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function handleTitleChange(value: string) {
    setForm((current) => ({
      ...current,
      title: value,
      slug:
        current.slug === "" || current.slug === slugify(current.title)
          ? slugify(value)
          : current.slug,
    }));
  }

  function validateContent() {
    try {
      const parsed = JSON.parse(form.content);

      if (!Array.isArray(parsed)) {
        return "Content must be a JSON array.";
      }

      return "";
    } catch {
      return "Content JSON is invalid. Please check the format.";
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!form.slug.trim()) {
      setError("Slug is required.");
      return;
    }

    if (!form.excerpt.trim()) {
      setError("Excerpt is required.");
      return;
    }

    if (!form.category.trim()) {
      setError("Category is required.");
      return;
    }

    if (!form.author.trim()) {
      setError("Author is required.");
      return;
    }

    const contentError = validateContent();

    if (contentError) {
      setError(contentError);
      return;
    }

    setSaving(true);

    try {
      const url = isEditing
        ? `/api/admin/blog/${post?.id}`
        : "/api/admin/blog";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          slug: slugify(form.slug),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to save blog post."
        );
      }

      setSuccess(
        isEditing
          ? "Blog post updated successfully."
          : "Blog post created successfully."
      );

      if (!isEditing) {
        setTimeout(() => {
          router.push("/admin/blog");
          router.refresh();
        }, 700);
      } else {
        router.refresh();
      }
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
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* Messages */}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          {success}
        </div>
      )}

      {/* Basic Information */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white">
            Basic Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Main information displayed for the article.
          </p>
        </div>

        <div className="grid gap-6">
          <Field
            label="Title"
            required
            value={form.title}
            onChange={handleTitleChange}
            placeholder="Why Businesses Need Modern Software"
          />

          <Field
            label="Slug"
            required
            value={form.slug}
            onChange={(value) =>
              updateField("slug", slugify(value))
            }
            placeholder="why-businesses-need-modern-software"
            hint="Used in the article URL."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Field
              label="Category"
              required
              value={form.category}
              onChange={(value) =>
                updateField("category", value)
              }
              placeholder="Software Development"
            />

            <Field
              label="Author"
              required
              value={form.author}
              onChange={(value) =>
                updateField("author", value)
              }
              placeholder="Rizcent Technologies"
            />
          </div>

          <Field
            label="Excerpt"
            required
            value={form.excerpt}
            onChange={(value) =>
              updateField("excerpt", value)
            }
            placeholder="Short description of the article..."
            textarea
            rows={4}
          />
        </div>
      </section>

      {/* Publishing */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white">
            Publishing
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Control when and how the article appears.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Field
            label="Publication Date"
            required
            value={form.date}
            onChange={(value) =>
              updateField("date", value)
            }
            type="date"
          />

          <Field
            label="Read Time"
            required
            value={form.readTime}
            onChange={(value) =>
              updateField("readTime", value)
            }
            placeholder="6 min read"
          />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Toggle
            label="Published"
            description="Show this article publicly."
            checked={form.published}
            onChange={(value) =>
              updateField("published", value)
            }
          />

          <Toggle
            label="Featured"
            description="Highlight this article."
            checked={form.featured}
            onChange={(value) =>
              updateField("featured", value)
            }
          />
        </div>
      </section>

      {/* Tags */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white">
            Tags
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Separate multiple tags with commas.
          </p>
        </div>

        <Field
          label="Tags"
          value={form.tags}
          onChange={(value) =>
            updateField("tags", value)
          }
          placeholder="Software, Business, Digital Transformation"
        />
      </section>

      {/* Content */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white">
            Article Content
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Add article sections using the JSON structure below.
          </p>
        </div>

        <textarea
          value={form.content}
          onChange={(event) =>
            updateField("content", event.target.value)
          }
          rows={24}
          spellCheck={false}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 font-mono text-sm leading-6 text-slate-300 outline-none transition placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
          placeholder={`[
  {
    "heading": "Introduction",
    "paragraphs": [
      "First paragraph...",
      "Second paragraph..."
    ]
  }
]`}
        />

        <p className="mt-3 text-xs text-slate-600">
          Content must be valid JSON.
        </p>
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-400 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : isEditing
              ? "Update Article"
              : "Create Article"}
        </button>
      </div>
    </form>
  );
}

/* ---------------------------------- */
/* Field */
/* ---------------------------------- */

function Field({
  label,
  value,
  onChange,
  placeholder,
  hint,
  required = false,
  textarea = false,
  rows = 4,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300">
        {label}

        {required && (
          <span className="ml-1 text-blue-400">
            *
          </span>
        )}
      </label>

      {textarea ? (
        <textarea
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          rows={rows}
          className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
        />
      )}

      {hint && (
        <p className="mt-2 text-xs text-slate-600">
          {hint}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------- */
/* Toggle */
/* ---------------------------------- */

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-white/10 bg-black/20 p-4 transition hover:border-white/20">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange(event.target.checked)
        }
        className="mt-1 h-4 w-4 accent-blue-600"
      />

      <span>
        <span className="block text-sm font-medium text-slate-300">
          {label}
        </span>

        <span className="mt-1 block text-xs leading-5 text-slate-600">
          {description}
        </span>
      </span>
    </label>
  );
}

/* ---------------------------------- */
/* Helpers */
/* ---------------------------------- */

function formatTags(value: string) {
  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed.join(", ");
    }
  } catch {
    // Already plain text.
  }

  return value || "";
}

function formatContent(value: string) {
  try {
    return JSON.stringify(
      JSON.parse(value),
      null,
      2
    );
  } catch {
    return value || "[]";
  }
}