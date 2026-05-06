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
   Constants
-------------------------------- */
const DEFAULT_USER_PREFERENCES = {
    base_currency: "USD",
    time_display: "auto",
    location_mode: "device",
    manual_city: null,
    weather_mode: "on",
} as const;

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

    let body: unknown;

    try {
        body = await req.json();
    } catch {
        return NextResponse.json(
            { error: "Invalid JSON body." },
            { status: 400 }
        );
    }

    const themePreference =
        body && typeof body === "object" && "theme_preference" in body
            ? body.theme_preference
            : null;

    if (!isThemePreference(themePreference)) {
        return NextResponse.json(
            { error: "Invalid theme_preference." },
            { status: 400 }
        );
    }

    const updatedAt = new Date().toISOString();

    const { error: updateError, count } = await writeSupabase
        .from("user_preferences")
        .update(
            {
                theme_preference: themePreference,
                updated_at: updatedAt,
            },
            { count: "exact" }
        )
        .eq("user_id", user.id);

    if (updateError) {
        return NextResponse.json(
            { error: updateError.message },
            { status: 500 }
        );
    }

    if (count === 0) {
        const { error: insertError } = await writeSupabase
            .from("user_preferences")
            .insert({
                user_id: user.id,
                ...DEFAULT_USER_PREFERENCES,
                theme_preference: themePreference,
                updated_at: updatedAt,
            });

        if (insertError) {
            return NextResponse.json(
                { error: insertError.message },
                { status: 500 }
            );
        }
    }

    return NextResponse.json({ ok: true });
}
