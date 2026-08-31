"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteLeadButtonProps {
  id: string;
  type: "Contact" | "Quote";
  name: string;
}

export default function DeleteLeadButton({
  id,
  type,
  name,
}: DeleteLeadButtonProps) {
  const router = useRouter();

  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete this ${type.toLowerCase()} enquiry from ${name}? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      const response = await fetch(`/api/admin/leads/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to delete enquiry."
        );
      }

      router.push("/admin/leads");
      router.refresh();
    } catch (error) {
      console.error("DELETE_LEAD_ERROR:", error);

      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to delete enquiry."
      );

      setDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/20 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {deleting ? "Deleting..." : "Delete Enquiry"}
    </button>
  );
}