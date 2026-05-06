/* ==========================================================
   OUTFLO — AUTH SESSION ROUTE
   File: app/auth/session/route.ts
   Scope: Exchange browser access token for server-readable Supabase cookies
   Last Updated:
   - ms: 1778071498197
   - iso: 2026-05-06T12:44:58.197Z
   - note: add password sign-in session sync route
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------
   POST Handler
-------------------------------- */
export async function POST(request: Request) {
    const { access_token, refresh_token } = await request.json();

    if (!access_token || !refresh_token) {
        return NextResponse.json(
            { error: "Missing session tokens." },
            { status: 400 }
        );
    }

    const supabase = await supabaseServer();

    const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json({ ok: true });
}