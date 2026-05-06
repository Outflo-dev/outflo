/* ==========================================================
   OUTFLO — LOGOUT ROUTE
   File: app/logout/route.ts
   Scope: Signs user out and returns to Portal (/)
   Last Updated:
   - ms: 1778156400000
   - iso: 2026-05-06T23:00:00.000Z
   - note: disable route caching for destructive logout endpoint
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------
   Route Config
-------------------------------- */
export const dynamic = "force-dynamic";

/* ------------------------------
   GET Handler
-------------------------------- */
export async function GET(request: Request) {
   const supabase = await supabaseServer();

   await supabase.auth.signOut();

   const url = new URL("/", request.url);

   return NextResponse.redirect(url);
}

