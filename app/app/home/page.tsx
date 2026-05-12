/* ==========================================================
   OUTFLO — APP HOME REDIRECT (LEGACY)
   File: app/app/home/page.tsx
   Scope: Redirect legacy app home route to canonical Systems launcher
   Last Updated:
   - ms: 1778540064130
   - iso: 2026-05-11T22:54:24.130Z
   - note: remove redirect chain and point legacy home directly to systems
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { redirect } from "next/navigation";

/* ------------------------------
   Page
-------------------------------- */
export default function AppHomePage() {
   redirect("/app/systems");
}