import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import DeleteLeadButton from "@/components/DeleteLeadButton";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LeadDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const [contact, quote] = await Promise.all([
    prisma.contactMessage.findUnique({
      where: {
        id,
      },
    }),

    prisma.quoteRequest.findUnique({
      where: {
        id,
      },
    }),
  ]);

  if (!contact && !quote) {
    notFound();
  }

  const isQuote = Boolean(quote);
  const lead = quote ?? contact!;

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <Link
          href="/admin/leads"
          className="text-sm text-slate-500 transition hover:text-white"
        >
          ← Back to Leads
        </Link>

        {/* Header */}
        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                isQuote
                  ? "bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20"
                  : "bg-white/10 text-slate-300 ring-1 ring-white/10"
              }`}
            >
              {isQuote ? "Quote" : "Contact"}
            </span>

            <span className="text-xs text-slate-600">
              {lead.createdAt.toLocaleString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {lead.name}
          </h1>

          {lead.company && (
            <p className="mt-3 text-slate-400">
              {lead.company}
            </p>
          )}
        </header>

        {/* Contact Information */}
        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <SectionTitle
            number="01"
            title="Contact information"
            description="Information provided by the enquiry."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Info
              label="Full name"
              value={lead.name}
            />

            <Info
              label="Company"
              value={lead.company}
            />

            <Info
              label="Email"
              value={lead.email}
              href={`mailto:${lead.email}`}
            />

            <Info
              label="Phone"
              value={lead.phone}
              href={
                lead.phone
                  ? `tel:${lead.phone}`
                  : undefined
              }
            />
          </div>
        </section>

        {/* Quote Details */}
        {quote && (
          <>
            <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <SectionTitle
                number="02"
                title="Project details"
                description="Requirements and planning information."
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Info
                  label="Project"
                  value={quote.projectName}
                />

                <Info
                  label="Project type"
                  value={formatValue(quote.projectType)}
                />

                <Info
                  label="Timeline"
                  value={formatValue(quote.timeline)}
                />

                <Info
                  label="Budget"
                  value={formatValue(quote.budget)}
                />
              </div>
            </section>

            {/* Services */}
            <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <SectionTitle
                number="03"
                title="Services"
                description="Services requested by the client."
              />

              <div className="mt-7 flex flex-wrap gap-2">
                {quote.services
                  .split(",")
                  .map((service) => service.trim())
                  .filter(Boolean)
                  .map((service) => (
                    <span
                      key={service}
                      className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-sm text-blue-300"
                    >
                      {service}
                    </span>
                  ))}
              </div>
            </section>

            {/* Project Description */}
            <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <SectionTitle
                number="04"
                title="Project description"
                description="Full requirements submitted by the client."
              />

              <div className="mt-7 rounded-xl border border-white/10 bg-black/20 p-5">
                <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                  {quote.description}
                </p>
              </div>
            </section>
          </>
        )}

        {/* Contact Message */}
        {contact && (
          <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <SectionTitle
              number="02"
              title="Message"
              description="Message submitted through the contact form."
            />

            <div className="mt-7 rounded-xl border border-white/10 bg-black/20 p-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                {contact.message}
              </p>
            </div>
          </section>
        )}

        {/* Actions */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="text-sm font-semibold text-white">
            Actions
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {/* Email */}
            <a
              href={`mailto:${lead.email}`}
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-500 hover:text-white"
            >
              Email Client
            </a>

            {/* Call */}
            {lead.phone && (
              <a
                href={`tel:${lead.phone}`}
                className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                Call Client
              </a>
            )}

            {/* Delete */}
            <DeleteLeadButton
              id={lead.id}
              type={isQuote ? "Quote" : "Contact"}
              name={lead.name}
            />

            {/* Back */}
            <Link
              href="/admin/leads"
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
            >
              Back to Leads
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Section Title                                                              */
/* -------------------------------------------------------------------------- */

function SectionTitle({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-bold text-slate-950">
        {number}
      </div>

      <div>
        <h2 className="text-xl font-semibold tracking-tight text-white">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Info                                                                       */
/* -------------------------------------------------------------------------- */

function Info({
  label,
  value,
  href,
}: {
  label: string;
  value?: string | null;
  href?: string;
}) {
  const content = (
    <>
      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-medium text-slate-300">
        {value || "Not provided"}
      </p>
    </>
  );

  if (href && value) {
    return (
      <a
        href={href}
        className="rounded-xl border border-white/10 bg-black/20 p-4 transition hover:border-white/20 hover:bg-white/[0.04]"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      {content}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Format Value                                                               */
/* -------------------------------------------------------------------------- */

function formatValue(value?: string | null) {
  if (!value) {
    return "Not provided";
  }

  return value
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}