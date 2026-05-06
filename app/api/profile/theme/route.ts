/* ==========================================================
   OUTFLO — PROFILE THEME API
   File: app/api/profile/theme/route.ts
   Scope: Persist authenticated user theme preference
   Last Updated:
   - ms: 1778071498197
   - iso: 2026-05-06T12:44:58.197Z
   - note: add cookie diagnostics to theme auth seam
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { isThemePreference } from "@/lib/app-state/theme-preference";
import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------
   PATCH Handler
-------------------------------- */
export async function PATCH(req: Request) {
    const cookieStore = await cookies();

    const cookieNames = cookieStore
        .getAll()
        .map((cookie) => cookie.name);

    const supabase = await supabaseServer();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return NextResponse.json(
            {
                error: "Unauthorized",
                diagnostics: {
                    cookie_count: cookieNames.length,
                    cookie_names: cookieNames,
                    has_sb_cookie: cookieNames.some((name) =>
                        name.startsWith("sb-")
                    ),
                    user_error: userError?.message ?? null,
                    has_user: Boolean(user),
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

    const { error } = await supabase.from("user_preferences").upsert(
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