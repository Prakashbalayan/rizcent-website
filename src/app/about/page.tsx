import type { Metadata } from "next";
import Link from "next/link";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Rizcent Technologies, our mission, vision and approach to software development and cybersecurity.",
};

const beliefs = [
  {
    number: "01",
    title: "Technology should solve problems",
    description:
      "We believe technology should make businesses faster, safer and more efficient. We focus on practical solutions rather than unnecessary complexity.",
  },
  {
    number: "02",
    title: "Security belongs from day one",
    description:
      "Security should not be added after a product is built. We consider security throughout architecture, development, deployment and maintenance.",
  },
  {
    number: "03",
    title: "Good engineering lasts",
    description:
      "We build with maintainability, scalability and reliability in mind so products can continue evolving as businesses grow.",
  },
  {
    number: "04",
    title: "Partnership creates better products",
    description:
      "The best results happen when technical teams and business teams work together with clear communication and shared goals.",
  },
];

const expertise = [
  {
    number: "01",
    title: "Software Engineering",
    description:
      "Modern web applications, SaaS platforms, APIs and custom software.",
    icon: "⌘",
  },
  {
    number: "02",
    title: "Cybersecurity",
    description:
      "Security assessments, penetration testing, application security and security consulting.",
    icon: "◇",
  },
  {
    number: "03",
    title: "Cloud Technology",
    description:
      "Cloud architecture, deployment, infrastructure and security-focused solutions.",
    icon: "◌",
  },
  {
    number: "04",
    title: "Product Development",
    description:
      "Turning business ideas into usable, scalable and production-ready digital products.",
    icon: "↗",
  },
];

const process = [
  {
    number: "01",
    title: "Understand",
    description:
      "We learn about your business, users, goals and technical requirements.",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "We define the right architecture, scope, technology and delivery approach.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "We develop, test and refine the solution using modern engineering practices.",
  },
  {
    number: "04",
    title: "Grow",
    description:
      "We help maintain, improve, secure and scale the product as your business evolves.",
  },
];

const stats = [
  {
    value: "01",
    label: "Technology-first mindset",
  },
  {
    value: "02",
    label: "Security-first approach",
  },
  {
    value: "03",
    label: "Business-focused delivery",
  },
  {
    value: "04",
    label: "Long-term partnership",
  },
];

const whyRizcent = [
  "Modern technology stack",
  "Security-conscious engineering",
  "Scalable architecture",
  "Clear communication",
  "Practical solutions",
  "Long-term support",
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative min-h-[700px] overflow-hidden bg-[#070a12] text-white">
        {/* Ambient lighting */}
        <div
          aria-hidden="true"
          className="hero-glow hero-glow-one pointer-events-none absolute"
        />

        <div
          aria-hidden="true"
          className="hero-glow hero-glow-two pointer-events-none absolute"
        />

        <div
          aria-hidden="true"
          className="hero-glow hero-glow-three pointer-events-none absolute"
        />

        {/* Security grid */}
        <div
          aria-hidden="true"
          className="hero-grid pointer-events-none absolute -inset-[72px]"
        />

        {/* Subtle radial center */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.025] blur-[100px]"
        />

        <Container className="relative">
          <div className="grid min-h-[700px] items-center gap-16 py-24 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Copy */}
            <div className="relative z-10">
              <div className="hero-fade-up inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300 backdrop-blur-xl">
                <span className="hero-status-dot relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
                About Rizcent
              </div>

              <h1 className="hero-fade-up hero-fade-up-delay-1 mt-7 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[76px]">
                Technology
                <span className="block text-slate-500">built with</span>
                <span className="block bg-gradient-to-r from-indigo-300 via-white to-cyan-300 bg-clip-text text-transparent">
                  purpose.
                </span>
              </h1>

              <p className="hero-fade-up hero-fade-up-delay-2 mt-8 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                Rizcent Technologies is a technology company focused on
                building modern digital products and helping businesses
                strengthen their cybersecurity.
              </p>

              <div className="hero-fade-up hero-fade-up-delay-3 mt-9 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="hero-button-shine group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-500 hover:text-white hover:shadow-2xl hover:shadow-indigo-500/20"
                >
                  <span className="relative z-10 text-slate-950 group-hover:text-white">
                    Talk to Our Team
                  </span>

                  <span className="relative z-10 text-slate-950 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">
                    →
                  </span>
                </Link>

                <Link
                  href="/services"
                  className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08]"
                >
                  <span className="relative z-10 text-white">
                    Explore Services
                  </span>

                  <span className="relative z-10 text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">
                    →
                  </span>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="hero-fade-up hero-fade-up-delay-4 mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/[0.07] pt-7">
                {[
                  "Software Engineering",
                  "Cybersecurity",
                  "Cloud Technology",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-xs font-medium text-slate-500"
                  >
                    <span className="h-1 w-1 rounded-full bg-indigo-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Security visual */}
            <div className="relative hidden lg:block">
              <div className="relative mx-auto aspect-square max-w-[500px]">
                {/* Outer rings */}
                <div className="absolute inset-4 rounded-full border border-white/[0.05]" />

                <div className="absolute inset-16 rounded-full border border-indigo-400/[0.12]" />

                <div className="absolute inset-28 rounded-full border border-cyan-400/[0.10]" />

                {/* Rotating orbit */}
                <div className="hero-orbit absolute inset-10">
                  <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-indigo-400 shadow-[0_0_20px_rgba(129,140,248,0.8)]" />

                  <div className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.8)]" />
                </div>

                {/* Secondary orbit */}
                <div className="hero-orbit-reverse absolute inset-20 rounded-full border border-dashed border-indigo-300/[0.08]" />

                {/* Ambient center */}
                <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.08] blur-3xl" />

                {/* Core */}
                <div className="hero-glass hero-float-slow absolute left-1/2 top-1/2 flex h-56 w-56 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[42px] shadow-2xl shadow-indigo-950/40">
                  <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-[24px] border border-indigo-300/20 bg-gradient-to-br from-indigo-500 to-indigo-700 text-3xl font-bold shadow-xl shadow-indigo-500/20">
                    R
                    <div className="absolute inset-x-0 top-0 h-px bg-white/30" />
                  </div>

                  <div className="mt-5 text-lg font-semibold tracking-tight">
                    Rizcent
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    Secure Technology
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
                    <span className="hero-status-dot relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Systems protected
                  </div>
                </div>

                {/* Security card */}
                <div className="hero-float absolute left-0 top-20 w-40 rounded-2xl border border-white/[0.08] bg-[#0c111d]/90 p-4 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-slate-600">
                      Security
                    </span>

                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                  </div>

                  <div className="mt-3 text-sm font-semibold">Protected</div>

                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="hero-progress h-full w-[86%] rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
                  </div>
                </div>

                {/* Engineering card */}
                <div className="hero-float-slow absolute bottom-20 right-0 w-44 rounded-2xl border border-white/[0.08] bg-[#0c111d]/90 p-4 shadow-2xl backdrop-blur-xl">
                  <div className="text-[10px] uppercase tracking-[0.15em] text-slate-600">
                    Engineering
                  </div>

                  <div className="mt-3 text-sm font-semibold">
                    Production Ready
                  </div>

                  <div className="mt-3 flex gap-1">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <span
                        key={item}
                        className="hero-bar h-5 flex-1 rounded-sm bg-indigo-500/20"
                        style={{
                          animationDelay: `${item * 120}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Scan line */}
                <div className="hero-scan-line pointer-events-none absolute inset-x-12 top-0" />

                {/* Floating nodes */}
                <span className="hero-pulse absolute right-20 top-12 h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_20px_rgba(129,140,248,0.8)]" />

                <span className="hero-pulse-delay absolute bottom-28 left-20 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.8)]" />
              </div>
            </div>
          </div>
        </Container>

        {/* Bottom edge */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" />
      </section>

      {/* =========================================================
          INTRODUCTION
      ========================================================= */}
      <section className="bg-white py-24 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionHeading
              eyebrow="Who we are"
              title="A technology partner for ambitious businesses."
            />

            <div className="space-y-6 text-base leading-8 text-slate-600 sm:text-lg">
              <p>
                Rizcent Technologies was built around a simple idea:
                businesses should be able to use technology without having to
                compromise on quality, security or long-term maintainability.
              </p>

              <p>
                We work across software development and cybersecurity, helping
                organizations create digital products while reducing the risks
                that come with modern technology.
              </p>

              <p>
                From an early-stage product idea to an established application
                that needs modernization or security improvements, our approach
                is focused on understanding the real problem first and then
                building the right solution.
              </p>

              <div className="border-l-2 border-indigo-500 pl-6 pt-2">
                <p className="font-semibold leading-7 text-slate-950">
                  Build better technology.
                  <br />
                  Protect what you build.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          MISSION + VISION
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#f7f8fc] py-24 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-indigo-500/[0.05] blur-[100px]"
        />

        <Container className="relative">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Mission */}
            <div className="group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100/50 sm:p-10">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-500/[0.04] blur-3xl transition duration-500 group-hover:bg-indigo-500/[0.08]" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-lg font-bold text-indigo-600 ring-1 ring-indigo-100">
                  M
                </div>

                <div className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
                  Our Mission
                </div>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
                  Make technology more useful, secure and accessible.
                </h2>

                <p className="mt-5 text-base leading-7 text-slate-600">
                  Our mission is to help businesses use technology confidently
                  by delivering practical software solutions and security
                  expertise that create real business value.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="group relative overflow-hidden rounded-[32px] bg-[#080c16] p-8 text-white shadow-2xl shadow-slate-950/10 sm:p-10">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-indigo-500/[0.12] blur-[80px]" />

              <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-cyan-500/[0.07] blur-[80px]" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500 text-lg font-bold shadow-lg shadow-indigo-500/20">
                  V
                </div>

                <div className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-300">
                  Our Vision
                </div>

                <h2 className="mt-4 text-3xl font-bold tracking-tight">
                  A digital world where businesses can build with confidence.
                </h2>

                <p className="mt-5 text-base leading-7 text-slate-300">
                  We want to become a trusted technology partner for businesses
                  that value engineering quality, security and long-term
                  thinking.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          WHAT WE BELIEVE
      ========================================================= */}
      <section className="bg-white py-24 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="What we believe"
            title="Principles that guide how we build."
            description="Our principles influence the way we approach products, engineering, security and client relationships."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {beliefs.map((belief) => (
              <div
                key={belief.number}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-2xl hover:shadow-slate-200/60"
              >
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-indigo-500/[0.04] blur-2xl transition duration-500 group-hover:bg-indigo-500/[0.09]" />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600 ring-1 ring-indigo-100">
                      {belief.number}
                    </div>

                    <span className="text-3xl text-slate-200 transition duration-300 group-hover:text-indigo-200">
                      +
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-slate-950">
                    {belief.title}
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                    {belief.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================
          EXPERTISE
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#080c16] py-24 text-white sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/3 top-0 h-96 w-96 rounded-full bg-indigo-600/[0.08] blur-[120px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/[0.05] blur-[100px]"
        />

        <Container className="relative">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/[0.06] px-4 py-2 text-sm font-semibold text-indigo-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Our expertise
              </div>

              <h2 className="mt-6 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Engineering and security under one roof.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                We bring software engineering and cybersecurity together so
                businesses can build digital products with security considered
                from the beginning.
              </p>

              <div className="mt-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                <span className="h-px w-10 bg-indigo-400/40" />
                Build · Secure · Scale
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {expertise.map((item) => (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.035] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-indigo-400/30 hover:bg-white/[0.055]"
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/[0.07] blur-2xl transition group-hover:bg-indigo-500/[0.14]" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/[0.08] text-lg text-indigo-300">
                        {item.icon}
                      </div>

                      <div className="text-xs font-bold text-indigo-400">
                        {item.number}
                      </div>
                    </div>

                    <h3 className="mt-6 text-xl font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          HOW WE WORK
      ========================================================= */}
      <section className="bg-white py-24 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="Simple process. Clear communication."
            description="We keep projects focused by breaking complex technology work into clear stages."
            centered
          />

          <div className="relative mt-16">
            <div
              aria-hidden="true"
              className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent lg:block"
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((item) => (
                <div
                  key={item.number}
                  className="group relative rounded-3xl border border-slate-200 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-200/50"
                >
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50 text-sm font-bold text-indigo-600">
                    {item.number}
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>

                  <div className="mt-6 h-1 w-8 rounded-full bg-indigo-500 transition-all duration-300 group-hover:w-14" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          STATS / DIFFERENTIATORS
      ========================================================= */}
      <section className="border-y border-slate-200 bg-[#f7f8fc]">
        <Container>
          <div className="grid divide-y divide-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="group px-6 py-11 text-center transition-colors duration-300 hover:bg-white"
              >
                <div className="text-3xl font-bold tracking-tight text-indigo-600 transition-transform duration-300 group-hover:-translate-y-1">
                  {stat.value}
                </div>

                <div className="mx-auto mt-3 h-px w-8 bg-indigo-200 transition-all duration-300 group-hover:w-12 group-hover:bg-indigo-500" />

                <div className="mt-3 text-sm font-medium text-slate-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================
          WHY RIZCENT
      ========================================================= */}
      <section className="bg-white py-24 sm:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-[36px] bg-[#080c16] p-8 text-white shadow-2xl shadow-slate-950/10 sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-indigo-500/[0.10] blur-[100px]" />

            <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-cyan-500/[0.06] blur-[100px]" />

            <div className="relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Why Rizcent
                </div>

                <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
                  Build with confidence from the beginning.
                </h2>

                <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
                  Whether you're launching a new product or improving an
                  existing system, we combine engineering discipline, security
                  awareness and business thinking to create technology that can
                  grow with you.
                </p>

                <Link
                  href="/services"
                  className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white"
                >
                  Explore our capabilities
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>

              <div className="grid gap-3">
                {whyRizcent.map((item, index) => (
                  <div
                    key={item}
                    className="group flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-5 py-4 transition-all duration-300 hover:border-indigo-400/30 hover:bg-white/[0.06]"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold shadow-lg shadow-indigo-500/20">
                      {index + 1}
                    </span>

                    <span className="text-sm font-medium text-slate-200">
                      {item}
                    </span>

                    <span className="ml-auto text-slate-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-indigo-300">
                      →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="bg-white pb-24 sm:pb-28">
        <Container>
          <div className="relative overflow-hidden rounded-[36px] bg-indigo-600 px-7 py-16 text-center text-white shadow-2xl shadow-indigo-600/15 sm:px-12 lg:px-20">
            <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-[100px]" />

            <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-cyan-300/10 blur-[90px]" />

            <div className="relative">
              <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                Let's build together
              </div>

              <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Let's build something meaningful.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">
                Have a product idea, technical challenge or security
                requirement? Let's start a conversation.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/request-quote"
                  className="group inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-indigo-600 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-50 hover:shadow-xl"
                >
                  <span className="text-indigo-600">
                    Start a Project
                  </span>

                  <span className="ml-2 text-indigo-600 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                  <span className="text-white">
                    Contact Us
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}