import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminLeadFilters from "@/components/AdminLeadFilters";

export const dynamic = "force-dynamic";

type Lead = {
  id: string;
  type: "Contact" | "Quote";
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  projectName?: string;
  projectType?: string;
  timeline?: string;
  services?: string;
  budget?: string | null;
  description: string;
  createdAt: Date;
};

type SearchParams = {
  search?: string;
  type?: string;
};

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const search = params.search?.trim().toLowerCase() ?? "";
  const type = params.type ?? "all";

  const [contacts, quotes] = await Promise.all([
    prisma.contactMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.quoteRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  const leads: Lead[] = [
    ...contacts.map((contact) => ({
      id: contact.id,
      type: "Contact" as const,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      company: contact.company,
      description: contact.message,
      createdAt: contact.createdAt,
    })),

    ...quotes.map((quote) => ({
      id: quote.id,
      type: "Quote" as const,
      name: quote.name,
      email: quote.email,
      phone: quote.phone,
      company: quote.company,
      projectName: quote.projectName,
      projectType: quote.projectType,
      timeline: quote.timeline,
      services: quote.services,
      budget: quote.budget,
      description: quote.description,
      createdAt: quote.createdAt,
    })),
  ].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  const filteredLeads = leads.filter((lead) => {
    if (type !== "all" && lead.type !== type) {
      return false;
    }

    if (!search) {
      return true;
    }

    const searchableText = [
      lead.name,
      lead.email,
      lead.phone,
      lead.company,
      lead.projectName,
      lead.projectType,
      lead.timeline,
      lead.services,
      lead.budget,
      lead.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(search);
  });

  const contactCount = contacts.length;
  const quoteCount = quotes.length;

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <header className="mb-8">
          <Link
            href="/admin/dashboard"
            className="text-sm text-slate-500 transition hover:text-white"
          >
            ← Dashboard
          </Link>

          <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                Rizcent Admin
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                Leads
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                Manage contact enquiries and project quote requests received
                through your website.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Stat
                label="Total"
                value={leads.length}
              />

              <Stat
                label="Contacts"
                value={contactCount}
              />

              <Stat
                label="Quotes"
                value={quoteCount}
              />
            </div>

          </div>
        </header>

        {/* Leads */}
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">

          {/* Search & filters */}
          <AdminLeadFilters />

          {/* Section header */}
          <div className="border-b border-white/10 px-5 py-5 sm:px-6">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">

              <div>
                <h2 className="font-semibold text-white">
                  All enquiries
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {filteredLeads.length}{" "}
                  {filteredLeads.length === 1
                    ? "enquiry"
                    : "enquiries"}{" "}
                  found
                </p>
              </div>

              {(search || type !== "all") && (
                <p className="text-xs text-slate-600">
                  Filtered from {leads.length} total
                </p>
              )}

            </div>
          </div>

          {/* Results */}
          {filteredLeads.length === 0 ? (

            search || type !== "all" ? (

              <div className="px-6 py-20 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-lg text-slate-600">
                  ?
                </div>

                <h3 className="mt-5 font-semibold text-white">
                  No matching enquiries
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  No leads match your current search or filter. Try another
                  search term or remove the filter.
                </p>

              </div>

            ) : (

              <EmptyState />

            )

          ) : (

            <div className="divide-y divide-white/10">

              {filteredLeads.map((lead) => (
                <LeadCard
                  key={`${lead.type}-${lead.id}`}
                  lead={lead}
                />
              ))}

            </div>

          )}

        </section>

      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Lead Card                                                                  */
/* -------------------------------------------------------------------------- */

function LeadCard({ lead }: { lead: Lead }) {
  const isQuote = lead.type === "Quote";

  return (
    <article className="group p-5 transition hover:bg-white/[0.02] sm:p-6">

      {/* Top */}
      <div className="flex flex-col justify-between gap-5 lg:flex-row">

        <div className="min-w-0">

          <div className="flex flex-wrap items-center gap-3">

            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                isQuote
                  ? "bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20"
                  : "bg-white/10 text-slate-300 ring-1 ring-white/10"
              }`}
            >
              {lead.type}
            </span>

            <h3 className="text-lg font-semibold text-white">
              {lead.name}
            </h3>

          </div>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">

            <a
              href={`mailto:${lead.email}`}
              className="text-slate-400 transition hover:text-white"
            >
              {lead.email}
            </a>

            {lead.phone && (
              <a
                href={`tel:${lead.phone}`}
                className="text-slate-400 transition hover:text-white"
              >
                {lead.phone}
              </a>
            )}

            {lead.company && (
              <span className="text-slate-500">
                {lead.company}
              </span>
            )}

          </div>

        </div>

        <time className="shrink-0 text-xs text-slate-600">
          {lead.createdAt.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>

      </div>

      {/* Quote information */}
      {isQuote && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

          <Info
            label="Project"
            value={lead.projectName}
          />

          <Info
            label="Type"
            value={formatValue(lead.projectType)}
          />

          <Info
            label="Timeline"
            value={formatValue(lead.timeline)}
          />

          <Info
            label="Budget"
            value={formatValue(lead.budget)}
          />

        </div>
      )}

      {/* Services */}
      {isQuote && lead.services && (
        <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">

          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
            Services
          </p>

          <div className="mt-3 flex flex-wrap gap-2">

            {lead.services
              .split(",")
              .map((service) => service.trim())
              .filter(Boolean)
              .map((service) => (
                <span
                  key={service}
                  className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-slate-400"
                >
                  {service}
                </span>
              ))}

          </div>

        </div>
      )}

      {/* Description */}
      <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">

        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
          {isQuote ? "Project description" : "Message"}
        </p>

        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">
          {lead.description}
        </p>

      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap gap-2">

        <a
          href={`mailto:${lead.email}`}
          className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
        >
          Email
        </a>

        {lead.phone && (
          <a
            href={`tel:${lead.phone}`}
            className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
          >
            Call
          </a>
        )}

        <Link
          href={`/admin/leads/${lead.id}`}
          className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
        >
          View full enquiry →
        </Link>

      </div>

    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Info                                                                        */
/* -------------------------------------------------------------------------- */

function Info({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">

      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-medium text-slate-300">
        {value || "—"}
      </p>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Stat                                                                        */
/* -------------------------------------------------------------------------- */

function Stat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="min-w-[80px] rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">

      <p className="text-[10px] uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-xl font-semibold text-white">
        {value}
      </p>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Empty State                                                                 */
/* -------------------------------------------------------------------------- */

function EmptyState() {
  return (
    <div className="px-6 py-20 text-center">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-xl text-slate-600">
        —
      </div>

      <h3 className="mt-5 font-semibold text-white">
        No enquiries yet
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
        Contact messages and quote requests will automatically appear here
        when visitors submit your website forms.
      </p>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Format Value                                                                */
/* -------------------------------------------------------------------------- */

function formatValue(value?: string | null) {
  if (!value) {
    return "—";
  }

  return value
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}