/* ==========================================================
   OUTFLO — APP PROFILE REDIRECT (LEGACY)
   File: app/app/profile/page.tsx
   Scope: Redirect legacy /app/profile to account profile hub
   ========================================================== */

import { redirect } from "next/navigation";

export default function AppProfileRedirect() {
  redirect("/account/profile");
}