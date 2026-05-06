/* ==========================================================
   OUTFLO — APP NAMESPACE LAYOUT
   File: app/app/layout.tsx
   Scope: Protect /app/* and pass persisted app preferences into shell
   Last Updated:
   - ms: 1777946575170
   - iso: 2026-05-05T02:02:55.170Z
   - note: validate persisted theme preference before app shell handoff
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { resolveThemePreference } from "@/lib/app-state/theme-preference";
import ScreenTimeMount from "./ScreenTimeMount";
import AppShell from "@/components/system/shell/app/AppShell";

/* ------------------------------
   Types
-------------------------------- */
type PreferenceRow = {
  theme_preference: string | null;
};

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