import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ServiceHero from "@/components/services/ServiceHero";
import { prisma } from "@/lib/prisma";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;

  const service = await prisma.service.findUnique({
    where: {
      slug,
    },
  });

  if (!service || !service.published) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailsPage({
  params,
}: ServicePageProps) {
  const { slug } = await params;

  const service = await prisma.service.findUnique({
    where: {
      slug,
    },
  });

  if (!service || !service.published) {
    notFound();
  }

  const features = parseList(service.features);
  const process = parseList(service.process);

  return (
    <main className="bg-white">
      {/* Hero */}
      <div className="relative bg-slate-950">
        <div className="relative z-20 mx-auto max-w-7xl px-5 pt-8 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
          >
            ← Back to Services
          </Link>
        </div>

        <ServiceHero
          eyebrow={service.category}
          title={service.title}
          description={service.shortDescription}
          accent={service.category.toLowerCase().includes("security") ? "cyan" : "blue"}
        />
      </div>

      {/* Description */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Overview
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Built around your requirements.
          </h2>

          <div className="mt-7 whitespace-pre-line text-lg leading-8 text-slate-600">
            {service.description}
          </div>
        </div>
      </section>

      {/* Features */}
      {features.length > 0 && (
        <section className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                What We Deliver
              </div>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Everything you need to move forward.
              </h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={`${feature}-${index}`}
                  className="rounded-[28px] border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-950">
                    {feature}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {process.length > 0 && (
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                Our Process
              </div>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                A clear path from idea to delivery.
              </h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {process.map((step, index) => (
                <div
                  key={`${step}-${index}`}
                  className="relative rounded-[28px] border border-slate-200 bg-white p-7"
                >
                  <div className="text-sm font-bold text-blue-600">
                    Step {String(index + 1).padStart(2, "0")}
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-slate-950">
                    {step}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="rounded-[36px] bg-blue-600 px-7 py-16 text-center text-white sm:px-12 lg:px-20">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">
              Start your project
            </div>

            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold sm:text-5xl">
              Ready to build something better?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-blue-100">
              Let&apos;s discuss your requirements and find the right
              technology solution for your business.
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

function parseList(value: string): string[] {
  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => String(item).trim())
        .filter(Boolean);
    }
  } catch {
    // Fall back to newline/comma-separated values.
  }

  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}