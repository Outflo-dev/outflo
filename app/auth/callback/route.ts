/* ==========================================================
   OUTFLO — AUTH CALLBACK (API)
   File: app/auth/callback/route.ts
   Scope: Handles auth code exchange and session creation
   Last Updated:
   - ms: 1778018872799
   - iso: 2026-05-05T22:07:52.799Z
   - note: redirect authenticated callback into app runtime
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------
   GET Handler
-------------------------------- */
export async function GET(request: Request) {
   const url = new URL(request.url);
   const code = url.searchParams.get("code");

   if (!code) {
      return NextResponse.redirect(new URL("/login", url));
   }

   const supabase = await supabaseServer();
   await supabase.auth.exchangeCodeForSession(code);

   return NextResponse.redirect(new URL("/app/systems", url));
}