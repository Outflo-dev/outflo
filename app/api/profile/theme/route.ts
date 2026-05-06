/* ==========================================================
   OUTFLO — PROFILE THEME API
   File: app/api/profile/theme/route.ts
   Scope: Persist authenticated user theme preference
   Last Updated:
   - ms: 1778156400000
   - iso: 2026-05-06T23:00:00.000Z
   - note: restore cookie-auth-only protected theme write path
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { NextResponse } from "next/server";
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
    const supabase = await supabaseServer();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return NextResponse.json(
            {
                error: "Unauthorized",
                auth_error: userError?.message ?? null,
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

    const { error: upsertError } = await supabase
        .from("user_preferences")
        .upsert(
            {
                user_id: user.id,
                ...DEFAULT_USER_PREFERENCES,
                theme_preference: themePreference,
                updated_at: updatedAt,
            },
            {
                onConflict: "user_id",
            }
        );

    if (upsertError) {
        return NextResponse.json(
            { error: upsertError.message },
            { status: 500 }
        );
    }

    return NextResponse.json({ ok: true });
}
