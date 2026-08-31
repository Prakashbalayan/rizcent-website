import Link from "next/link";
import Container from "../ui/Container";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  {
    label: "Software Development",
    href: "/services/software-development",
  },
  {
    label: "Web Development",
    href: "/services/web-development",
  },
  {
    label: "Cybersecurity",
    href: "/services/cybersecurity",
  },
  {
    label: "Penetration Testing",
    href: "/services/penetration-testing",
  },
  {
    label: "Cloud Security",
    href: "/services/cloud-security",
  },
];

const resourceLinks = [
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Request a Quote", href: "/request-quote" },
];

const socials = [
  {
    label: "LinkedIn",
    short: "in",
    href: "#",
  },
  {
    label: "X",
    short: "X",
    href: "#",
  },
  {
    label: "GitHub",
    short: "GH",
    href: "#",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#070a12] text-white">
      {/* Background effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="footer-glow-one absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-indigo-500/[0.08] blur-[120px]" />

        <div className="footer-glow-two absolute -right-40 top-1/3 h-[420px] w-[420px] rounded-full bg-cyan-400/[0.05] blur-[120px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40" />
      </div>

      <Container className="relative">
        {/* Top CTA */}
        <div className="border-b border-white/[0.07] py-16 sm:py-20">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                <span className="footer-status h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Available for projects
              </div>

              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                Let&apos;s build something
                <span className="block text-slate-500">
                  worth building.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                Have an idea, product or security challenge? Let&apos;s
                discuss how we can turn it into a reliable digital solution.
              </p>
            </div>

            <Link
              href="/request-quote"
              className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-500/25 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:ring-offset-2 focus:ring-offset-[#080b14]"
            >
              <span className="whitespace-nowrap text-slate-950 transition-colors duration-300 group-hover:text-white">
                Start a Project
              </span>

              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 text-sm text-slate-950 transition-all duration-300 group-hover:bg-white group-hover:text-indigo-600">
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </Link>
          </div>
        </div>

        {/* Main footer */}
        <div className="grid gap-14 py-14 sm:py-16 lg:grid-cols-[1.6fr_1fr_1.4fr_1fr] lg:gap-10">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.06] shadow-xl transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-indigo-400/30 group-hover:bg-indigo-500/10">
                <span className="relative z-10 text-sm font-bold">
                  R
                </span>

                <span className="absolute -right-3 -top-3 h-8 w-8 rounded-full bg-indigo-500/30 blur-xl transition-all duration-500 group-hover:bg-cyan-400/40" />
              </div>

              <div className="leading-none">
                <div className="text-[18px] font-bold tracking-[-0.035em]">
                  Rizcent
                </div>

                <div className="mt-1.5 text-[8px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Technologies
                </div>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-500">
              Building digital products and helping businesses secure their
              technology through modern engineering and practical
              cybersecurity.
            </p>

            {/* Socials */}
            <div className="mt-7 flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-[10px] font-semibold text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-white"
                >
                  {social.short}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <FooterColumn
            title="Company"
            links={companyLinks}
          />

          {/* Services */}
          <FooterColumn
            title="Services"
            links={serviceLinks}
          />

          {/* Resources */}
          <FooterColumn
            title="Resources"
            links={resourceLinks}
          />
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.07] py-7">
          <div className="flex flex-col gap-5 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p>
                © {year} Rizcent Technologies. All Rights Reserved.
              </p>

              <p className="text-slate-700">
                Built with care by{" "}
                <span className="font-medium text-slate-500">
                  Rizcent Technologies
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link
                href="/privacy-policy"
                className="transition-colors duration-200 hover:text-slate-300"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="transition-colors duration-200 hover:text-slate-300"
              >
                Terms
              </Link>

              <Link
                href="/cookie-policy"
                className="transition-colors duration-200 hover:text-slate-300"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* Animation styles */}
      <style>{`
        .footer-glow-one {
          animation: footerGlowOne 10s ease-in-out infinite;
        }

        .footer-glow-two {
          animation: footerGlowTwo 12s ease-in-out infinite;
        }

        .footer-status {
          animation: footerPulse 2.5s ease-in-out infinite;
        }

        @keyframes footerGlowOne {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(35px, 20px, 0);
          }
        }

        @keyframes footerGlowTwo {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(-25px, 30px, 0);
          }
        }

        @keyframes footerPulse {
          0%,
          100% {
            opacity: 0.45;
            transform: scale(0.9);
          }

          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-glow-one,
          .footer-glow-two,
          .footer-status {
            animation: none;
          }
        }
      `}</style>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        {title}
      </h3>

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center text-sm text-slate-500 transition-colors duration-200 hover:text-white"
            >
              <span>{link.label}</span>

              <span className="ml-1.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}