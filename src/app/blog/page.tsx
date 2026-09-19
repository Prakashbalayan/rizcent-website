import type { Metadata } from "next";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights from Rizcent Technologies on software development, web development, SaaS, cloud and cybersecurity.",
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: {
      published: true,
    },
    orderBy: [
      {
        featured: "desc",
      },
      {
        date: "desc",
      },
    ],
  });

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              Rizcent Insights
            </p>

            <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Ideas for building better technology.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Practical insights on software development, web applications,
              SaaS platforms, cloud technology and cybersecurity.
            </p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="rounded-[30px] border border-slate-200 px-6 py-20 text-center">
              <h2 className="text-2xl font-bold text-slate-950">
                Articles coming soon
              </h2>

              <p className="mt-3 text-slate-600">
                We are currently preparing our latest insights.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-slate-200/60"
                >
                  {/* Visual */}
                  <div className="relative flex h-56 items-center justify-center overflow-hidden bg-slate-950">
                    <div className="absolute h-48 w-48 rounded-full bg-blue-600/20 blur-3xl transition duration-500 group-hover:bg-blue-500/30" />

                    <div className="relative flex h-24 w-24 items-center justify-center rounded-[24px] border border-blue-400/20 bg-slate-900 shadow-2xl">
                      <span className="text-3xl font-bold text-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur">
                      {post.category}
                    </span>

                    {post.featured && (
                      <span className="absolute right-5 top-5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-950">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-7">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="mt-4 text-xl font-bold leading-7 tracking-tight text-slate-950">
                      {post.title}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {post.excerpt}
                    </p>

                    <div className="mt-6 font-semibold text-blue-600 transition group-hover:translate-x-1">
                      Read Article →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 sm:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="rounded-[36px] bg-blue-600 px-7 py-16 text-center text-white sm:px-12 lg:px-20">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">
              Work with Rizcent
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold sm:text-5xl">
              Have a technology project in mind?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-blue-100">
              Let&apos;s discuss your requirements and find the right approach
              for building your product.
            </p>

            <Link
              href="/request-quote"
              className="mt-8 inline-flex rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-blue-600 transition hover:bg-slate-100"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}