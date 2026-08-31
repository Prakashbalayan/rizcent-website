import Link from "next/link";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const services = [
  {
    number: "01",
    title: "Software Development",
    description:
      "We design and build modern web applications, SaaS platforms, APIs and custom software for growing businesses.",
    href: "/services/software-development",
    label: "Build",
  },
  {
    number: "02",
    title: "Cybersecurity",
    description:
      "We identify vulnerabilities, strengthen security controls and help businesses reduce their technology risk.",
    href: "/services/cybersecurity",
    label: "Protect",
  },
  {
    number: "03",
    title: "Cloud Solutions",
    description:
      "We build reliable cloud infrastructure and help teams deploy, scale and secure modern applications.",
    href: "/services/cloud-security",
    label: "Scale",
  },
  {
    number: "04",
    title: "Technology Consulting",
    description:
      "We help businesses make better technology decisions through practical architecture, security and engineering guidance.",
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

      <Container className="relative">
        {/* Heading */}
        <SectionHeading
          eyebrow="What we do"
          title="Technology solutions built around your business."
          description="From product development to cybersecurity, we combine engineering, design and security to solve real business problems."
        />

        {/* Services */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-[30px] border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.number}
              href={service.href}
              className="group relative flex min-h-[390px] flex-col bg-white p-7 transition-all duration-500 hover:bg-[#0b0f19] sm:p-8"
            >
              {/* Top */}
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 transition-all duration-500 group-hover:border-white/10 group-hover:bg-white/10 group-hover:text-white">
                  {service.number}
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 transition-colors group-hover:text-slate-600">
                  {service.label}
                </span>
              </div>

              {/* Content */}
              <div className="mt-auto">
                <div className="mb-5 h-px w-8 bg-indigo-500 transition-all duration-500 group-hover:w-14" />

                <h3 className="max-w-[240px] text-xl font-semibold tracking-tight text-slate-950 transition-colors duration-500 group-hover:text-white">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500 transition-colors duration-500 group-hover:text-slate-400">
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

              {/* Hover glow */}
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-indigo-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
            </Link>
          ))}
        </div>

        {/* Bottom statement */}
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center">
          <p className="max-w-xl text-sm leading-6 text-slate-500">
            One technology partner for building, securing and scaling your
            digital business.
          </p>

          <Link
            href="/services"
            className="group inline-flex items-center text-sm font-semibold text-slate-900"
          >
            View all services
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}