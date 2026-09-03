import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/user-auth";
import AccountNavbar from "./AccountNavbar";

interface AccountLayoutProps {
  children: ReactNode;
}

export default async function AccountLayout({
  children,
}: AccountLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AccountNavbar userName={user.name} />

      <main>{children}</main>
    </div>
  );
}