import type { Metadata } from "next";

import Image from "next/image";

import Link from "next/link";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore enterprise software engineering, digital product development, cloud technology, and cybersecurity services delivered by Rizcent Technologies.",
};

function normalizeImagePath(
  value: string | null | undefined
): string {
  if (!value) {
    return "";
  }

  const normalized = value
    .trim()
    .replace(/\\/g, "/")
    .replace(/^\/+/, "/");

  if (
    normalized.startsWith("http://") ||
    normalized.startsWith("https://") ||
    normalized.startsWith("/")
  ) {
    return normalized;
  }

  return `/${normalized}`;
}

function parseList(value: string): string[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => String(item).trim())
        .filter(Boolean);
    }
  } catch {
    // Use line-separated or comma-separated values.
  }

  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: {
      published: true,
    },
    orderBy: [
      {
        featured: "desc",
      },
      {
        createdAt: "asc",
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
              Technology Services
            </p>

            <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Engineering technology that moves your business forward.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              We design, build and secure digital solutions that help
              organizations modernize operations, launch products, strengthen
              security and scale with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {services.length === 0 ? (
            <div className="rounded-[30px] border border-slate-200 px-6 py-20 text-center">
              <h2 className="text-2xl font-bold text-slate-950">
                Our services are being updated
              </h2>

              <p className="mt-3 text-slate-600">
                We are currently updating our technology capabilities and
                service portfolio. Please check back soon for more information.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {services.map((service, index) => {
                const imageUrl = normalizeImagePath(service.imageUrl);

                return (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-slate-200/60"
                  >
                    {/* Service Image */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={service.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition duration-700 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 px-8 text-center">
                          <span className="text-2xl font-bold text-white/90 sm:text-3xl">
                            {service.title}
                          </span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

                      {/* Service Number */}
                      <div className="absolute bottom-5 left-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-slate-950/70 text-sm font-bold text-white backdrop-blur">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      {/* Category */}
                      <div className="absolute left-6 top-5 rounded-full border border-white/30 bg-slate-950/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                        {service.category}
                      </div>

                      {/* Featured */}
                      {service.featured && (
                        <div className="absolute right-6 top-5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-950">
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Service Content */}
                    <div className="p-7 sm:p-8">
                      <div className="flex items-start justify-between gap-5">
                        <div>
                          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                            {service.title}
                          </h2>

                          <p className="mt-3 text-sm leading-6 text-slate-600">
                            {service.shortDescription}
                          </p>
                        </div>

                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition group-hover:bg-blue-600 group-hover:text-white">
                          →
                        </span>
                      </div>

                      {/* Features */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {parseList(service.features)
                          .slice(0, 3)
                          .map((feature, featureIndex) => (
                            <span
                              key={`${service.id}-${featureIndex}-${feature}`}
                              className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
                            >
                              {feature}
                            </span>
                          ))}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 sm:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="rounded-[36px] bg-blue-600 px-7 py-16 text-center text-white sm:px-12 lg:px-20">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">
              Build With Rizcent
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold sm:text-5xl">
              Turn your technology goals into measurable outcomes.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-blue-100">
              Whether you are launching a new product, modernizing an existing
              platform or strengthening your security posture, our team can
              help define the right technology strategy and execution path.
            </p>

            <Link
              href="/request-quote"
              className="mt-8 inline-flex rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-blue-600 transition hover:bg-slate-100"
            >
              Discuss Your Requirements →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}