import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/user-auth";
import { prisma } from "@/lib/prisma";

export default async function MyRequestsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const requests = await prisma.quoteRequest.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Account
            </p>

            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              My Requests
            </h1>

            <p className="mt-3 max-w-2xl text-slate-600">
              View the project and quote requests you have submitted to
              Rizcent Technologies.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex w-fit items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold !text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Start a Request
          </Link>
        </div>

        {/* Empty State */}
        {requests.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
              📋
            </div>

            <h2 className="mt-6 text-2xl font-black text-slate-950">
              No requests yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
              You haven&apos;t submitted any quote requests yet. Start a
              project with Rizcent and your requests will appear here.
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold !text-white transition hover:bg-slate-800"
            >
              Start Your Project
            </Link>
          </div>
        ) : (
          /* Request List */
          <div className="space-y-5">
            {requests.map((request) => (
              <div
                key={request.id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                {/* Request Header */}
                <div className="border-b border-slate-200 bg-slate-950 px-6 py-5 sm:px-7">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
                        Project Request
                      </p>

                      <h2 className="mt-1 text-xl font-black !text-white">
                        {request.projectName}
                      </h2>
                    </div>

                    <div className="rounded-full bg-blue-600 px-3 py-1.5 text-xs font-bold !text-white">
                      Quote Request
                    </div>
                  </div>
                </div>

                {/* Request Details */}
                <div className="p-6 sm:p-7">
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Project Type */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Project Type
                      </p>

                      <p className="mt-1 font-bold text-slate-900">
                        {request.projectType}
                      </p>
                    </div>

                    {/* Timeline */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Timeline
                      </p>

                      <p className="mt-1 font-bold text-slate-900">
                        {request.timeline}
                      </p>
                    </div>

                    {/* Budget */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Budget
                      </p>

                      <p className="mt-1 font-bold text-slate-900">
                        {request.budget || "Not specified"}
                      </p>
                    </div>

                    {/* Services */}
                    <div className="sm:col-span-2 lg:col-span-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Services
                      </p>

                      <p className="mt-1 font-bold text-slate-900">
                        {request.services}
                      </p>
                    </div>

                    {/* Company */}
                    {request.company && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Company
                        </p>

                        <p className="mt-1 font-bold text-slate-900">
                          {request.company}
                        </p>
                      </div>
                    )}

                    {/* Phone */}
                    {request.phone && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Phone
                        </p>

                        <p className="mt-1 font-bold text-slate-900">
                          {request.phone}
                        </p>
                      </div>
                    )}

                    {/* Submitted */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Submitted
                      </p>

                      <p className="mt-1 font-bold text-slate-900">
                        {new Intl.DateTimeFormat("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }).format(new Date(request.createdAt))}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Project Description
                    </p>

                    <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                      {request.description}
                    </p>
                  </div>

                  {/* Contact Information */}
                  <div className="mt-5 flex flex-col gap-2 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Submitted By
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {request.name}
                      </p>

                      <p className="text-sm text-slate-500">
                        {request.email}
                      </p>
                    </div>

                    <span className="text-xs font-medium text-slate-400">
                      Request ID: {request.id}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}