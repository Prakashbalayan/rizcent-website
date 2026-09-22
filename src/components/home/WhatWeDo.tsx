import Link from "next/link";

import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const services = [
  {
    number: "01",
    title: "Software Development",
    description:
      "Transform ideas into reliable digital products with modern web applications, SaaS platforms, APIs and custom software engineered for performance and scale.",
    href: "/services/software-development",
    label: "Build",
  },
  {
    number: "02",
    title: "Cybersecurity",
    description:
      "Identify vulnerabilities, strengthen security controls and protect applications, infrastructure and data with practical security engineering.",
    href: "/services/cybersecurity",
    label: "Protect",
  },
  {
    number: "03",
    title: "Cloud Solutions",
    description:
      "Design secure and reliable cloud environments that help applications deploy faster, operate efficiently and scale with changing business needs.",
    href: "/services/cloud-security",
    label: "Scale",
  },
  {
    number: "04",
    title: "Technology Consulting",
    description:
      "Turn complex technology challenges into clear decisions with practical guidance across architecture, engineering, cybersecurity and digital strategy.",
    href: "/services/consulting",
    label: "Guide",
  },
];

export default function WhatWeDo() {
  return (
    <section className="relative overflow-hidden bg-[#f5f6f8] py-24 sm:py-28 lg:py-32">
      {/* Background detail */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-180px] top-20 h-[420px] w-[420px] rounded-full bg-indigo-500/[0.045] blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-180px] left-[-160px] h-[380px] w-[380px] rounded-full bg-cyan-400/[0.035] blur-[120px]"
      />

      <Container className="relative">
        {/* Heading */}
        <SectionHeading
          eyebrow="What we do"
          title="Technology that helps your business move forward."
          description="We combine software engineering, cybersecurity, cloud technology and strategic consulting to build, protect and scale modern digital businesses."
        />

        {/* Services */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-[30px] border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.number}
              href={service.href}
              className="group relative flex min-h-[410px] flex-col overflow-hidden bg-white p-7 transition-all duration-500 hover:bg-[#0b0f19] sm:p-8"
            >
              {/* Top */}
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 transition-all duration-500 group-hover:border-white/10 group-hover:bg-white/10 group-hover:text-white">
                  {service.number}
                </div>

                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400 transition-all duration-500 group-hover:border-white/10 group-hover:bg-white/[0.04] group-hover:text-slate-500">
                  {service.label}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 mt-auto">
                {/* Accent */}
                <div className="mb-5 h-px w-8 bg-indigo-500 transition-all duration-500 group-hover:w-16 group-hover:bg-cyan-400" />

                <h3 className="max-w-[250px] text-xl font-semibold tracking-tight text-slate-950 transition-colors duration-500 group-hover:text-white">
                  {service.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-slate-500 transition-colors duration-500 group-hover:text-slate-400">
                  {service.description}
                </p>

                {/* Link */}
                <div className="mt-7 flex items-center text-sm font-semibold text-slate-900 transition-colors duration-500 group-hover:text-white">
                  Explore service

                  <span className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-xs transition-all duration-300 group-hover:translate-x-1 group-hover:border-white/20 group-hover:bg-white group-hover:text-slate-950">
                    →
                  </span>
                </div>
              </div>

              {/* Large background number */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 -right-3 text-[150px] font-bold leading-none tracking-[-0.08em] text-slate-950/[0.025] transition-all duration-500 group-hover:text-white/[0.025]"
              >
                {service.number}
              </div>

              {/* Hover glow */}
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-indigo-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/[0.06] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
            </Link>
          ))}
        </div>

        {/* Bottom statement */}
        <div className="mt-8 flex flex-col justify-between gap-5 border-t border-slate-200 pt-6 sm:flex-row sm:items-center">
          <div>
            <p className="max-w-xl text-sm leading-6 text-slate-500">
              One technology partner for building products, strengthening
              security, modernizing infrastructure and creating a foundation
              for long-term digital growth.
            </p>
          </div>

          <Link
            href="/services"
            className="group inline-flex shrink-0 items-center text-sm font-semibold text-slate-900"
          >
            View all services

            <span className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-xs transition-all duration-300 group-hover:translate-x-1 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white">
              →
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}