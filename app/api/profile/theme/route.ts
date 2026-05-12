/* ==========================================================
   OUTFLO — PROFILE THEME API
   File: app/api/profile/theme/route.ts
   Scope: Persist authenticated user theme preference
   Last Updated:
   - ms: 1778540064130
   - iso: 2026-05-11T22:54:24.130Z
   - note: prevent theme writes from overwriting unrelated user preferences
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { NextResponse } from "next/server";

import { isThemePreference } from "@/lib/app-state/theme-preference";
import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------
   Types
-------------------------------- */
type ThemeRequestBody = {
    theme_preference?: unknown;
};

type PreferenceRow = {
    user_id: string;
};

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
   Helpers
-------------------------------- */
async function readThemeRequestBody(req: Request): Promise<ThemeRequestBody> {
    try {
        const body = await req.json();

        if (!body || typeof body !== "object") {
            return {};
        }

        return body as ThemeRequestBody;
    } catch {
        return {};
    }
}

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

    const body = await readThemeRequestBody(req);
    const themePreference = body.theme_preference;

    if (!isThemePreference(themePreference)) {
        return NextResponse.json(
            { error: "Invalid theme_preference." },
            { status: 400 }
        );
    }

    const updatedAt = new Date().toISOString();

    const { data: existingPreference, error: readError } = await supabase
        .from("user_preferences")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle<PreferenceRow>();

    if (readError) {
        return NextResponse.json({ error: readError.message }, { status: 500 });
    }

    if (existingPreference) {
        const { error: updateError } = await supabase
            .from("user_preferences")
            .update({
                theme_preference: themePreference,
                updated_at: updatedAt,
            })
            .eq("user_id", user.id);

        if (updateError) {
            return NextResponse.json({ error: updateError.message }, { status: 500 });
        }

        return NextResponse.json({ ok: true });
    }

    const { error: insertError } = await supabase.from("user_preferences").insert({
        user_id: user.id,
        ...DEFAULT_USER_PREFERENCES,
        theme_preference: themePreference,
        updated_at: updatedAt,
    });

    if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
}