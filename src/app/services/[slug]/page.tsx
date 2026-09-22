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

  const isSecurity = service.category
    .toLowerCase()
    .includes("security");

  return (
    <main className="rz-service-page">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#070b12] text-white">
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="rz-service-orb rz-service-orb-blue" />
          <div className="rz-service-orb rz-service-orb-cyan" />
          <div className="rz-service-orb rz-service-orb-purple" />

          <div className="rz-service-grid" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.12),transparent_38%)]" />
        </div>

        {/* Top navigation */}
        <div className="relative z-20 mx-auto max-w-7xl px-5 pt-7 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="rz-back-link group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-sm font-medium text-slate-300 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.07] hover:text-white"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-transform duration-300 group-hover:-translate-x-0.5">
              ←
            </span>

            <span>Back to Services</span>
          </Link>
        </div>

        {/* Existing service hero */}
        <div className="relative z-10">
          <ServiceHero
            eyebrow={service.category}
            title={service.title}
            description={service.shortDescription}
            accent={isSecurity ? "cyan" : "blue"}
          />
        </div>

        {/* Bottom transition */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#070b12] to-transparent" />
      </section>

      {/* =========================================================
          SERVICE OVERVIEW
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#f7f9fc] py-24 sm:py-28 lg:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-500/[0.05] blur-[100px]" />
          <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-400/[0.05] blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:items-start lg:gap-24">
            {/* Section label */}
            <div>
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-8 bg-blue-600" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                  Service Overview
                </span>
              </div>

              <div className="mt-7 hidden lg:block">
                <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Rizcent Technologies
                </div>

                <div className="mt-5 h-px w-full bg-slate-200" />

                <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
                  <span>Technology</span>
                  <span>01</span>
                </div>
              </div>
            </div>

            {/* Overview content */}
            <div>
              <h2 className="max-w-4xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl lg:leading-[1.08]">
                Technology solutions aligned to your business objectives.
              </h2>

              <div className="mt-8 h-px w-full bg-gradient-to-r from-slate-300 via-slate-200 to-transparent" />

              <div className="mt-8 max-w-3xl whitespace-pre-line text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
                {service.description}
              </div>

              {/* Small visual indicators */}
              <div className="mt-10 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  Business focused
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                  Technology driven
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Built to scale
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CAPABILITIES
      ========================================================= */}
      {features.length > 0 && (
        <section className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
          {/* Background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-500/[0.035] blur-[120px]" />
            <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.035] blur-[120px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-20">
              <div>
                <div className="inline-flex items-center gap-3">
                  <span className="h-px w-8 bg-cyan-500" />

                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">
                    What We Deliver
                  </span>
                </div>

                <div className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                  Core capabilities
                </div>
              </div>

              <div>
                <h2 className="max-w-4xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl lg:leading-[1.08]">
                  Capabilities designed for real-world requirements.
                </h2>

                <p className="mt-6 max-w-2xl text-base leading-7 text-slate-500">
                  Practical technology capabilities designed around the
                  requirements, scale and security expectations of modern
                  organizations.
                </p>
              </div>
            </div>

            {/* Capability cards */}
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={`${feature}-${index}`}
                  className="rz-capability-card group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-[0_24px_70px_rgba(15,23,42,0.10)]"
                >
                  {/* Hover glow */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-blue-500/[0.08] blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Number */}
                  <div className="relative flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-xs font-bold text-blue-600 transition-all duration-300 group-hover:border-blue-200 group-hover:bg-blue-600 group-hover:text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <span className="text-xs font-medium tracking-widest text-slate-300 transition-colors duration-300 group-hover:text-blue-400">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="relative mt-7 text-xl font-bold tracking-tight text-slate-950">
                    {feature}
                  </h3>

                  {/* Bottom line */}
                  <div className="relative mt-8 h-px w-full overflow-hidden bg-slate-100">
                    <div className="h-full w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 group-hover:w-full" />
                  </div>

                  <div className="relative mt-5 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-400">
                      Capability
                    </span>

                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-xs text-slate-400 transition-all duration-300 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600">
                      →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          DELIVERY PROCESS
      ========================================================= */}
      {process.length > 0 && (
        <section className="relative overflow-hidden bg-[#080d15] py-24 text-white sm:py-28 lg:py-32">
          {/* Background effects */}
          <div className="pointer-events-none absolute inset-0">
            <div className="rz-process-grid" />

            <div className="absolute left-1/4 top-0 h-[450px] w-[450px] rounded-full bg-blue-600/[0.08] blur-[130px]" />

            <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-cyan-500/[0.06] blur-[130px]" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,11,18,0.35)_70%)]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-20">
              <div>
                <div className="inline-flex items-center gap-3">
                  <span className="h-px w-8 bg-cyan-400" />

                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                    Delivery Approach
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Structured delivery
                </div>
              </div>

              <div>
                <h2 className="max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.08]">
                  A structured approach from strategy to delivery.
                </h2>

                <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400">
                  Every engagement follows a clear path designed to keep
                  technology decisions aligned with business requirements.
                </p>
              </div>
            </div>

            {/* Process timeline */}
            <div className="relative mt-16">
              {/* Desktop connecting line */}
              <div className="absolute left-[8%] right-[8%] top-[30px] hidden h-px bg-gradient-to-r from-blue-500/10 via-blue-400/50 to-cyan-400/10 lg:block" />

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                {process.map((step, index) => (
                  <div
                    key={`${step}-${index}`}
                    className="rz-process-card group relative rounded-[24px] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.06]"
                  >
                    {/* Step marker */}
                    <div className="relative z-10 flex h-[60px] w-[60px] items-center justify-center rounded-2xl border border-white/10 bg-[#0c131d] shadow-[0_0_0_6px_rgba(8,13,21,1)] transition-all duration-500 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_0_6px_rgba(8,13,21,1),0_0_30px_rgba(34,211,238,0.12)]">
                      <span className="text-sm font-bold text-cyan-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="mt-7">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Step {String(index + 1).padStart(2, "0")}
                      </div>

                      <h3 className="mt-3 text-lg font-bold leading-7 text-white">
                        {step}
                      </h3>
                    </div>

                    <div className="mt-7 flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-cyan-400" />
                      <span className="text-xs text-slate-500">
                        Rizcent delivery
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#f7f9fc] py-24 sm:py-28 lg:py-32">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="rz-final-cta relative overflow-hidden rounded-[32px] border border-slate-800 bg-[#080d15] px-7 py-16 text-white shadow-[0_30px_100px_rgba(15,23,42,0.18)] sm:px-12 sm:py-20 lg:px-20 lg:py-24">
            {/* CTA background */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-600/[0.18] blur-[100px]" />

              <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-cyan-500/[0.12] blur-[120px]" />

              <div className="rz-cta-grid absolute inset-0 opacity-50" />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.12),transparent_55%)]" />
            </div>

            <div className="relative z-10 mx-auto max-w-4xl text-center">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />

                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  Build With Rizcent
                </span>
              </div>

              <h2 className="mx-auto mt-7 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.08]">
                Ready to turn your technology goals into reality?
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                Share your requirements with our team and let&apos;s define
                the right technology approach to build, modernize, secure, and
                scale your solution.
              </p>

              {/* CTA buttons */}
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/request-quote"
                  className="rz-premium-cta-button group inline-flex items-center justify-center gap-3 rounded-full border border-blue-400/30 bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(37,99,235,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_16px_45px_rgba(37,99,235,0.35)]"
                >
                  <span>Start a Project</span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-cyan-400/[0.06] hover:text-white"
                >
                  <span>Talk to Our Team</span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </Link>
              </div>

              {/* Trust line */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Technology focused
                </span>

                <span className="hidden h-3 w-px bg-white/10 sm:block" />

                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  Security conscious
                </span>

                <span className="hidden h-3 w-px bg-white/10 sm:block" />

                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  Built for scale
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PAGE-SPECIFIC STYLES
      ========================================================= */}
      <style>{`
        .rz-service-page {
          --rz-blue: #2563eb;
          --rz-cyan: #06b6d4;
          --rz-dark: #070b12;
        }

        .rz-service-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 54px 54px;
          mask-image: linear-gradient(
            to bottom,
            black 0%,
            rgba(0,0,0,0.75) 55%,
            transparent 100%
          );
          animation: rzGridMove 18s linear infinite;
        }

        .rz-process-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(circle at center, black, transparent 75%);
        }

        .rz-cta-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 45px 45px;
          mask-image: radial-gradient(circle at center, black, transparent 75%);
        }

        .rz-service-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(90px);
          pointer-events: none;
        }

        .rz-service-orb-blue {
          left: -120px;
          top: 120px;
          width: 360px;
          height: 360px;
          background: rgba(37, 99, 235, 0.12);
          animation: rzOrbFloat 8s ease-in-out infinite;
        }

        .rz-service-orb-cyan {
          right: -140px;
          top: 80px;
          width: 400px;
          height: 400px;
          background: rgba(6, 182, 212, 0.08);
          animation: rzOrbFloat 10s ease-in-out infinite reverse;
        }

        .rz-service-orb-purple {
          left: 45%;
          bottom: -260px;
          width: 420px;
          height: 420px;
          background: rgba(99, 102, 241, 0.06);
          animation: rzOrbFloat 12s ease-in-out infinite;
        }

        .rz-capability-card {
          transform: translateZ(0);
        }

        .rz-process-card {
          transform: translateZ(0);
        }

        .rz-final-cta {
          transform: translateZ(0);
        }

        @keyframes rzGridMove {
          0% {
            transform: translateY(0);
          }

          100% {
            transform: translateY(54px);
          }
        }

        @keyframes rzOrbFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(0, -24px, 0) scale(1.04);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .rz-service-grid,
          .rz-service-orb {
            animation: none !important;
          }

          .rz-capability-card,
          .rz-process-card,
          .rz-final-cta {
            transition: none !important;
          }
        }

        @media (max-width: 640px) {
          .rz-service-grid {
            background-size: 42px 42px;
          }

          .rz-process-grid,
          .rz-cta-grid {
            background-size: 40px 40px;
          }

          .rz-service-orb-blue {
            width: 260px;
            height: 260px;
          }

          .rz-service-orb-cyan {
            width: 280px;
            height: 280px;
          }
        }
      `}</style>
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