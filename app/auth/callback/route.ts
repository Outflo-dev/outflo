/* ==========================================================
   OUTFLO — AUTH CALLBACK ROUTE
   File: app/auth/callback/route.ts
   Scope: Exchange auth code for Supabase session
   Last Updated:
   - ms: 1778071498197
   - iso: 2026-05-06T12:44:58.197Z
   - note: restore working local auth callback exchange flow
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

   return NextResponse.redirect(new URL("/", url));
}