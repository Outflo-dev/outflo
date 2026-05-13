/* ==========================================================
   OUTFLO — PROFILE DISPLAY API
   File: app/api/profile/display/route.ts
   Scope: Persist authenticated user display preferences
   Last Updated:
   - ms: 1778611632761
   - iso: 2026-05-12T18:47:12.761Z
   - note: add text scale and glow preference write path
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { NextResponse } from "next/server";

import { DEFAULT_THEME_PREFERENCE } from "@/lib/app-state/theme-preference";
import { isGlowPreference } from "@/lib/app-state/glow-preference";
import { isTextScale } from "@/lib/app-state/text-scale";
import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------
   Types
-------------------------------- */
type DisplayRequestBody = {
    text_scale?: unknown;
    glow_preference?: unknown;
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
    theme_preference: DEFAULT_THEME_PREFERENCE,
} as const;

/* ------------------------------
   Helpers
-------------------------------- */
async function readDisplayRequestBody(req: Request): Promise<DisplayRequestBody> {
    try {
        const body = await req.json();

        if (!body || typeof body !== "object") {
            return {};
        }

        return body as DisplayRequestBody;
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

    const body = await readDisplayRequestBody(req);
    const textScale = body.text_scale;
    const glowPreference = body.glow_preference;

    if (!isTextScale(textScale)) {
        return NextResponse.json(
            { error: "Invalid text_scale." },
            { status: 400 }
        );
    }

    if (!isGlowPreference(glowPreference)) {
        return NextResponse.json(
            { error: "Invalid glow_preference." },
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
                text_scale: textScale,
                glow_preference: glowPreference,
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
        text_scale: textScale,
        glow_preference: glowPreference,
        updated_at: updatedAt,
    });

    if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
}