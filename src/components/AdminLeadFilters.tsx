"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AdminLeadFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") ?? "";
  const initialType = searchParams.get("type") ?? "all";

  const [search, setSearch] = useState(initialSearch);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (initialType !== "all") {
      params.set("type", initialType);
    }

    const query = params.toString();

    router.push(
      query ? `/admin/leads?${query}` : "/admin/leads"
    );
  }

  function changeType(type: string) {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (type !== "all") {
      params.set("type", type);
    }

    const query = params.toString();

    router.push(
      query ? `/admin/leads?${query}` : "/admin/leads"
    );
  }

  function clearFilters() {
    setSearch("");
    router.push("/admin/leads");
  }

  return (
    <div className="border-b border-white/10 p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Search */}
        <form
          onSubmit={submit}
          className="flex flex-1 gap-2"
        >
          <div className="relative flex-1">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, email, company or project..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-white/25"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Search
          </button>
        </form>

        {/* Filters */}
        <div className="flex items-center gap-2">

          <FilterButton
            active={initialType === "all"}
            onClick={() => changeType("all")}
          >
            All
          </FilterButton>

          <FilterButton
            active={initialType === "Contact"}
            onClick={() => changeType("Contact")}
          >
            Contacts
          </FilterButton>

          <FilterButton
            active={initialType === "Quote"}
            onClick={() => changeType("Quote")}
          >
            Quotes
          </FilterButton>

          {(search || initialType !== "all") && (
            <button
              type="button"
              onClick={clearFilters}
              className="ml-1 rounded-xl px-3 py-2 text-xs text-slate-500 transition hover:text-white"
            >
              Clear
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-3 py-2 text-xs font-medium transition ${
        active
          ? "bg-white text-slate-950"
          : "border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}