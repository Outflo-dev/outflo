/* ==========================================================
   OUTFLO — APP HOME REDIRECT (LEGACY)
   File: app/app/home/page.tsx
   Scope: Redirect legacy /app/home to app root (/app)
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { redirect } from "next/navigation";

/* ------------------------------
   Component
-------------------------------- */
export default function Page() {
  redirect("/app");
}