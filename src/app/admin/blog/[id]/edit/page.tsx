import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import AdminBlogForm from "@/components/AdminBlogForm";

export const dynamic = "force-dynamic";

interface EditBlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBlogPage({
  params,
}: EditBlogPageProps) {
  const { id } = await params;

  const post = await prisma.blogPost.findUnique({
    where: {
      id,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin/blog"
          className="text-sm text-slate-500 transition hover:text-white"
        >
          ← Blog
        </Link>

        <div className="mb-8 mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Rizcent Admin
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Edit Article
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Update the article content, publishing settings and information.
          </p>
        </div>

        <AdminBlogForm
          post={{
            id: post.id,
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            category: post.category,
            author: post.author,
            date: post.date,
            readTime: post.readTime,
            featured: post.featured,
            tags: post.tags,
            content: post.content,
            published: post.published,
          }}
        />
      </div>
    </main>
  );
}