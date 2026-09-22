import Link from "next/link";

import Container from "../ui/Container";

const securityServices = [
  {
    title: "Penetration Testing",
    description:
      "Identify exploitable vulnerabilities across applications, networks and infrastructure before they can be leveraged by real-world attackers.",
  },

  {
    title: "Security Audits",
    description:
      "Assess applications, infrastructure, configurations and security controls to identify gaps and strengthen your overall security posture.",
  },

  {
    title: "API Security",
    description:
      "Secure APIs against authentication, authorization, access-control and business-logic vulnerabilities across the application lifecycle.",
  },

  {
    title: "Cloud Security",
    description:
      "Strengthen cloud environments through secure configurations, identity controls, workload protection and continuous security practices.",
  },
];

export default function Cybersecurity() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-28">
      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />

      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-300">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              Cybersecurity
            </div>

            <h2 className="max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
              Secure by design.
              <span className="block text-blue-400">
                Resilient by default.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Security is an essential part of building and operating modern
              technology. We help organizations identify risk, protect critical
              systems and integrate security across applications, cloud
              infrastructure and development environments.
            </p>

            <Link
              href="/services/cybersecurity"
              className="mt-8 inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Explore cybersecurity
              <span className="ml-2">→</span>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {securityServices.map((service, index) => (
              <div
                key={service.title}
                className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7 transition hover:border-blue-500/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  0{index + 1}
                </div>

                <h3 className="mt-6 text-xl font-bold">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {service.description}
                </p>

                <div className="mt-6 h-px bg-slate-800" />

                <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Security-first approach
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}