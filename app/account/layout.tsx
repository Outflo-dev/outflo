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
import { resolveThemePreference } from "@/lib/app-state/theme-preference";
import AppTheme from "@/components/system/shell/app/AppTheme";

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

  const { data: preferences } = await supabase
    .from("user_preferences")
    .select("theme_preference")
    .eq("user_id", user.id)
    .maybeSingle<PreferenceRow>();

  const themePreference = resolveThemePreference(preferences?.theme_preference);

  return <AppTheme themePreference={themePreference}>{children}</AppTheme>;
}