/* ==========================================================
   OUTFLO — TOOLS NAMESPACE LAYOUT
   File: app/tools/layout.tsx
   Scope: Protect /tools/* and render tool routes inside the app shell
   Last Updated:
   - ms: 1778107087301
   - iso: 2026-05-06T22:38:07.301Z
   - note: wrap protected tool routes in app shell
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import AppShell from "@/components/system/shell/app/AppShell";
import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------
   Types
-------------------------------- */
type ToolsLayoutProps = {
  children: ReactNode;
};

/* ------------------------------
   Layout Gate
-------------------------------- */
export default async function ToolsLayout({ children }: ToolsLayoutProps) {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Logged out → redirect to Portal
  if (!user) {
    redirect("/");
  }

  return <AppShell>{children}</AppShell>;
}