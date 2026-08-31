import Link from "next/link";
import { prisma } from "@/lib/prisma";

import DeleteBlogButton from "@/components/DeleteBlogButton";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: [
      {
        featured: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <header className="mb-8">
          <Link
            href="/admin/dashboard"
            className="text-sm text-slate-500 transition hover:text-white"
          >
            ← Dashboard
          </Link>

          <div className="mt-6 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                Rizcent Admin
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                Blog
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                Create, edit and manage your website articles.
              </p>
            </div>

            <Link
              href="/admin/blog/new"
              className="inline-flex w-fit items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-slate-200"
            >
              + New Article
            </Link>
          </div>
        </header>

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <Stat
            label="Total Articles"
            value={posts.length}
          />

          <Stat
            label="Published"
            value={posts.filter((post) => post.published).length}
          />

          <Stat
            label="Featured"
            value={posts.filter((post) => post.featured).length}
          />
        </div>

        {/* Posts */}
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">

          <div className="border-b border-white/10 px-5 py-5 sm:px-6">
            <h2 className="font-semibold">
              All Articles
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {posts.length} article{posts.length === 1 ? "" : "s"} in database
            </p>
          </div>

          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="divide-y divide-white/10">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="p-5 transition hover:bg-white/[0.02] sm:p-6"
                >
                  <div className="flex flex-col justify-between gap-6 lg:flex-row">

                    {/* Content */}
                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-400 ring-1 ring-blue-500/20">
                          {post.category}
                        </span>

                        {post.featured && (
                          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-black">
                            Featured
                          </span>
                        )}

                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                            post.published
                              ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20"
                          }`}
                        >
                          {post.published ? "Published" : "Draft"}
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-semibold text-white">
                        {post.title}
                      </h3>

                      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                        {post.excerpt}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-600">
                        <span>
                          Author: {post.author}
                        </span>

                        <span>
                          {post.date}
                        </span>

                        <span>
                          {post.readTime}
                        </span>

                        <span>
                          /blog/{post.slug}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {getTags(post.tags).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg bg-white/5 px-2.5 py-1 text-[11px] text-slate-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 flex-row gap-2 lg:flex-col">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="inline-flex items-center justify-center rounded-lg border border-white/10 px-4 py-2.5 text-xs font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
                      >
                        Edit
                      </Link>

                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="inline-flex items-center justify-center rounded-lg border border-white/10 px-4 py-2.5 text-xs font-medium text-slate-400 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
                      >
                        View
                      </Link>

                      <DeleteBlogButton
                        id={post.id}
                        title={post.title}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}

function getTags(value: string): string[] {
  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed
        .map(String)
        .map((tag) => tag.trim())
        .filter(Boolean);
    }
  } catch {
    // Fall back to comma-separated tags.
  }

  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-xs uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-2 text-3xl font-semibold">
        {value}
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="px-6 py-20 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-xl">
        +
      </div>

      <h3 className="mt-5 font-semibold">
        No articles yet
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
        Create your first blog article to start publishing content.
      </p>

      <Link
        href="/admin/blog/new"
        className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-slate-200"
      >
        Create Article
      </Link>
    </div>
  );
}