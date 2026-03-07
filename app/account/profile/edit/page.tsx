/* ==========================================================
   OUTFLO — ACCOUNT PROFILE EDIT PAGE
   File: app/account/profile/edit/page.tsx
   Scope: Load authenticated profile editor for identity and environment preferences
   ========================================================== */

import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import ProfileClient from "../ProfileClient";

/* ------------------------------
   Page
-------------------------------- */
export default async function AccountProfileEditPage() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: identity } = await supabase
    .from("user_identity_assets")
    .select("display_name, username, avatar_url, gallery_urls")
    .eq("user_id", user.id)
    .maybeSingle();

  const { data: preferences } = await supabase
    .from("user_preferences")
    .select(
      "base_currency, time_display, location_mode, manual_city, weather_mode"
    )
    .eq("user_id", user.id)
    .maybeSingle();

  return (
    <ProfileClient
      initialIdentity={{
        display_name: identity?.display_name ?? "",
        username: identity?.username ?? "",
        avatar_url: identity?.avatar_url ?? "",
        gallery_urls: identity?.gallery_urls ?? [],
      }}
      initialPreferences={{
        base_currency: preferences?.base_currency ?? "USD",
        time_display: preferences?.time_display ?? "auto",
        location_mode: preferences?.location_mode ?? "device",
        manual_city: preferences?.manual_city ?? "",
        weather_mode: preferences?.weather_mode ?? "on",
      }}
    />
  );
}