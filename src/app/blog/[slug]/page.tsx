import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

function parseTags(tags: string): string[] {
  try {
    const parsed = JSON.parse(tags);

    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function parseContent(content: string): BlogSection[] {
  try {
    const parsed = JSON.parse(content);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter(
        (section): section is BlogSection =>
          typeof section === "object" &&
          section !== null &&
          Array.isArray(section.paragraphs)
      )
      .map((section) => ({
        heading:
          typeof section.heading === "string"
            ? section.heading
            : undefined,
        paragraphs: section.paragraphs.filter(
          (paragraph): paragraph is string =>
            typeof paragraph === "string"
        ),
      }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await prisma.blogPost.findFirst({
    where: {
      slug,
      published: true,
    },
  });

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  const tags = parseTags(post.tags);

  return {
    title: post.title,
    description: post.excerpt,
    keywords: tags,
  };
}

export default async function BlogArticlePage({
  params,
}: BlogPageProps) {
  const { slug } = await params;

  const post = await prisma.blogPost.findFirst({
    where: {
      slug,
      published: true,
    },
  });

  if (!post) {
    notFound();
  }

  const tags = parseTags(post.tags);
  const content = parseContent(post.content);

  // Get related published articles.
  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      published: true,
      NOT: {
        id: post.id,
      },
    },
    orderBy: [
      {
        featured: "desc",
      },
      {
        date: "desc",
      },
    ],
    take: 3,
  });

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
          >
            ← Back to Blog
          </Link>

          <div className="mt-10">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 font-semibold text-blue-300">
                {post.category}
              </span>

              <span className="text-slate-600">•</span>

              <span className="text-slate-400">
                {post.date}
              </span>

              <span className="text-slate-600">•</span>

              <span className="text-slate-400">
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              {post.excerpt}
            </p>

            {/* Author */}
            <div className="mt-8 text-sm text-slate-500">
              By{" "}
              <span className="font-medium text-slate-300">
                {post.author}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          {content.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
              <p className="text-slate-600">
                Article content is currently unavailable.
              </p>
            </div>
          ) : (
            <div className="space-y-14">
              {content.map((section, index) => (
                <section key={`${section.heading ?? "section"}-${index}`}>
                  {section.heading && (
                    <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                      {section.heading}
                    </h2>
                  )}

                  <div className={section.heading ? "mt-5" : ""}>
                    {section.paragraphs.map(
                      (paragraph, paragraphIndex) => (
                        <p
                          key={paragraphIndex}
                          className="mt-5 text-lg leading-8 text-slate-600 first:mt-0"
                        >
                          {paragraph}
                        </p>
                      )
                    )}
                  </div>
                </section>
              ))}
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-16 border-t border-slate-200 pt-8">
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Tags
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back */}
          <div className="mt-12">
            <Link
              href="/blog"
              className="inline-flex rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              ← View All Articles
            </Link>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              More Insights
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              You may also like
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group rounded-[28px] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >
                  <div className="text-sm font-semibold text-blue-600">
                    {relatedPost.category}
                  </div>

                  <h3 className="mt-4 text-xl font-bold leading-7 text-slate-950">
                    {relatedPost.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {relatedPost.excerpt}
                  </p>

                  <div className="mt-6 text-sm font-semibold text-blue-600 transition group-hover:translate-x-1">
                    Read Article →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="rounded-[36px] bg-blue-600 px-7 py-16 text-center text-white sm:px-12 lg:px-20">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">
              Work with us
            </div>

            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold sm:text-5xl">
              Have a technology project in mind?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-blue-100">
              Let&apos;s discuss your idea and find the right technology
              solution for your business.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/request-quote"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-blue-600 transition hover:bg-slate-100"
              >
                Request a Quote →
              </Link>

              <Link
                href="/contact"
                className="rounded-full border border-blue-400/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
