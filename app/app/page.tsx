/* ==========================================================
   OUTFLO — APP ROOT REDIRECT
   File: app/app/page.tsx
   Scope: Redirect authenticated app root to canonical Systems launcher
   Last Updated:
   - ms: 1778467797659
   - iso: 2026-05-11T02:49:57.659Z
   - note: make app root redirect-only to systems launcher
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { redirect } from "next/navigation";

/* ------------------------------
   Page
-------------------------------- */
export default function AppRootPage() {
  redirect("/app/systems");
}