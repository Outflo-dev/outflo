/* ==========================================================
   OUTFLO — AUTH TEST API
   File: app/api/auth-test/route.ts
   Scope: Diagnose server-readable Supabase auth state in API route context
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
   Helpers
-------------------------------- */
function redactCookieNames(cookieNames: string[]) {
    return cookieNames.map((name) => {
        if (name.startsWith("sb-")) {
            return name;
        }

        return name;
    });
}

/* ------------------------------
   GET Handler
-------------------------------- */
export async function GET() {
    const cookieStore = await cookies();
    const cookieNames = cookieStore.getAll().map((cookie) => cookie.name);

    const supabase = await supabaseServer();

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    return NextResponse.json({
        connected: true,

        request: {
            cookie_count: cookieNames.length,
            cookie_names: redactCookieNames(cookieNames),
            has_sb_cookie: cookieNames.some((name) => name.startsWith("sb-")),
            has_auth_token_cookie: cookieNames.some((name) =>
                name.includes("auth-token")
            ),
        },

        auth: {
            has_user: Boolean(user),
            user_id: user?.id ?? null,
            email: user?.email ?? null,
            error: error?.message ?? null,
        },

        runtime: {
            node_env: process.env.NODE_ENV,
            vercel_env: process.env.VERCEL_ENV ?? null,
        },
    });
}
