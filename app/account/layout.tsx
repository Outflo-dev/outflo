/* ==========================================================
   OUTFLO — ACCOUNT NAMESPACE LAYOUT
   File: app/account/layout.tsx
   Scope: Protect /account/* and apply persisted app preferences
   Last Updated:
   - ms: 1778018872799
   - iso: 2026-05-05T22:07:52.799Z
   - note: apply persisted theme preference to account surfaces
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------
   Types
-------------------------------- */
type PreferenceRow = {
  theme_preference: string | null;
};

/* ------------------------------
   Layout Gate
-------------------------------- */
export default async function AccountLayout({
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

  return children;
}