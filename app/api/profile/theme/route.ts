/* ==========================================================
   OUTFLO — PROFILE THEME API
   File: app/api/profile/theme/route.ts
   Scope: Persist authenticated user theme preference
   Last Updated:
   - ms: 1778156400000
   - iso: 2026-05-06T23:00:00.000Z
   - note: support bearer fallback for mobile auth persistence
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isThemePreference } from "@/lib/app-state/theme-preference";
import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------
   POST Handler
-------------------------------- */
export async function POST(req: Request) {
    const cookieStore = await cookies();

    const cookieNames = cookieStore
        .getAll()
        .map((cookie) => cookie.name);

    const authHeader = req.headers.get("authorization");

    const bearerToken = authHeader?.startsWith("Bearer ")
        ? authHeader.slice("Bearer ".length)
        : null;

    const supabase = await supabaseServer();

    const {
        data: { user: cookieUser },
        error: cookieUserError,
    } = await supabase.auth.getUser();

    let bearerUser = null;
    let bearerUserError: string | null = null;

    if (!cookieUser && bearerToken) {
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser(bearerToken);

        bearerUser = user;

        if (error) {
            bearerUserError = error.message;
        }
    }

    const user = cookieUser ?? bearerUser;

    const writeSupabase = cookieUser
        ? supabase
        : createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                global: {
                    headers: {
                        Authorization: `Bearer ${bearerToken}`,
                    },
                },
            }
        );

    if (!user) {
        return NextResponse.json(
            {
                error: "Unauthorized",
                diagnostics: {
                    cookie_count: cookieNames.length,
                    cookie_names: cookieNames,
                    has_sb_cookie: cookieNames.some((name) =>
                        name.startsWith("sb-")
                    ),
                    has_bearer_token: Boolean(bearerToken),
                    cookie_user_error: cookieUserError?.message ?? null,
                    bearer_user_error: bearerUserError,
                },
            },
            { status: 401 }
        );
    }

    const body = await req.json();

    const themePreference = body.theme_preference;

    if (!isThemePreference(themePreference)) {
        return NextResponse.json(
            { error: "Invalid theme_preference." },
            { status: 400 }
        );
    }

    const { error } = await writeSupabase.from("user_preferences").upsert(
        {
            user_id: user.id,
            theme_preference: themePreference,
            updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
    );

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json({ ok: true });
}