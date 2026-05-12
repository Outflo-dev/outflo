/* ==========================================================
   OUTFLO — APP NAMESPACE LAYOUT
   File: app/app/layout.tsx
   Scope: Protect /app/* and render authenticated app shell
   Last Updated:
   - ms: 1778540064130
   - iso: 2026-05-11T22:54:24.130Z
   - note: remove stale preference handoff declarations from app layout
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type React from "react";
import { redirect } from "next/navigation";

import { supabaseServer } from "@/lib/supabase/server";

import ScreenTimeMount from "./ScreenTimeMount";
import AppShell from "@/components/system/shell/app/AppShell";

/* ------------------------------
   Layout Gate
-------------------------------- */
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <>
      <ScreenTimeMount />
      <AppShell>{children}</AppShell>
    </>
  );
}