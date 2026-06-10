/* ==========================================================
   OUTFLO — PROFILE ENVIRONMENT API
   File: app/api/profile/environment/route.ts
   Scope: Persist authenticated user environment preferences
   Last Updated:
   - ms: 1781096852713
   - iso: 2026-06-10T13:07:32.713Z
   - note: delegate environment preference patch resolution to internal resolver
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { NextResponse } from "next/server";

import { DEFAULT_USER_PREFERENCES } from "@/lib/app-state/environment/environment-preferences";
import { supabaseServer } from "@/lib/supabase/server";

import {
    ENVIRONMENT_PREFERENCE_SELECT_COLUMNS,
    readEnvironmentRequestBody,
    resolveEnvironmentPreferencePatch,
    type EnvironmentPreferenceRow,
} from "./internal/environment-preference-patch";

/* ------------------------------
   PATCH Handler
-------------------------------- */
export async function PATCH(req: Request) {
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

    const body = await readEnvironmentRequestBody(req);

    const { data: existingPreference, error: readError } = await supabase
        .from("user_preferences")
        .select(ENVIRONMENT_PREFERENCE_SELECT_COLUMNS.join(","))
        .eq("user_id", user.id)
        .maybeSingle<EnvironmentPreferenceRow>();

    if (readError) {
        return NextResponse.json(
            { error: readError.message },
            { status: 500 }
        );
    }

    const patch = resolveEnvironmentPreferencePatch({
        body,
        existing: existingPreference ?? null,
    });

    if (!patch.ok) {
        return NextResponse.json(
            { error: patch.error },
            { status: 400 }
        );
    }

    const updatedAt = new Date().toISOString();

    const payload = {
        ...patch.payload,
        updated_at: updatedAt,
    };

    if (existingPreference) {
        const { error: updateError } = await supabase
            .from("user_preferences")
            .update(payload)
            .eq("user_id", user.id);

        if (updateError) {
            return NextResponse.json(
                { error: updateError.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ ok: true });
    }

    const { error: insertError } = await supabase
        .from("user_preferences")
        .insert({
            user_id: user.id,
            ...DEFAULT_USER_PREFERENCES,
            ...payload,
            updated_at: updatedAt,
        });

    if (insertError) {
        return NextResponse.json(
            { error: insertError.message },
            { status: 500 }
        );
    }

    return NextResponse.json({ ok: true });
}