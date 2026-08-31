"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteCareerButtonProps {
  id: string;
  title: string;
}

export default function DeleteCareerButton({
  id,
  title,
}: DeleteCareerButtonProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(`/api/admin/careers/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to delete job."
        );
      }

      router.refresh();
    } catch (error) {
      console.error("DELETE_CAREER_ERROR:", error);

      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to delete job."
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="rounded-full border border-red-400/20 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}