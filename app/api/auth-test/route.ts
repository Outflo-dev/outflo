/* ==========================================================
   OUTFLO — AUTH TEST API
   File: app/api/auth-test/route.ts
   Scope: Diagnose server-readable auth state in API route context
   Last Updated:
   - ms: 1778071498197
   - iso: 2026-05-06T12:44:58.197Z
   - note: restore safe auth diagnostics route for production session debugging
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------
   GET Handler
-------------------------------- */
export async function GET() {
    const cookieStore = await cookies();
    const cookieNames = cookieStore.getAll().map((cookie) => cookie.name);

    const supabase = await supabaseServer();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    const {
        data: { session },
        error: sessionError,
    } = await supabase.auth.getSession();

    return NextResponse.json({
        connected: true,
        cookie_count: cookieNames.length,
        cookie_names: cookieNames,
        has_sb_cookie: cookieNames.some((name) => name.startsWith("sb-")),
        has_auth_token_cookie: cookieNames.some((name) =>
            name.includes("auth-token")
        ),
        has_user: Boolean(user),
        has_session: Boolean(session),
        has_access_token: Boolean(session?.access_token),
        user_error: userError?.message ?? null,
        session_error: sessionError?.message ?? null,
    });
}
