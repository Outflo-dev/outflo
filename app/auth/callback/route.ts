/* ==========================================================
   OUTFLO — AUTH CALLBACK ROUTE
   File: app/auth/callback/route.ts
   Scope: Exchange auth code for Supabase session
   Last Updated:
   - ms: 1778071498197
   - iso: 2026-05-06T12:44:58.197Z
   - note: add callback diagnostics for production auth exchange
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

   console.log("AUTH CALLBACK HIT", {
      hasCode: Boolean(code),
      origin: url.origin,
      pathname: url.pathname,
   });

   if (!code) {
      return NextResponse.redirect(new URL("/login", url));
   }

   const supabase = await supabaseServer();

   const { error } = await supabase.auth.exchangeCodeForSession(code);

   console.log("AUTH EXCHANGE RESULT", {
      error: error?.message ?? null,
   });

   if (error) {
      return NextResponse.redirect(new URL("/login", url));
   }

   return NextResponse.redirect(new URL("/", url));
}