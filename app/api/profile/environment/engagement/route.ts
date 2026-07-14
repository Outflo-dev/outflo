/* ==========================================================
   OUTFLO — ENVIRONMENT ENGAGEMENT API
   File: app/api/profile/environment/engagement/route.ts
   Scope: Read and persist authenticated Guide Environment engagement state
   Last Updated:
   - iso: 2026-07-13
   - note: establish narrow ownership for Engagement, Precise, and Capture
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { NextResponse } from "next/server";

import {
    DEFAULT_ENVIRONMENT_ENGAGEMENT_STATE,
    isEnvironmentEngagementState,
    type EnvironmentEngagementState,
} from "@/lib/app-state/environment/environment-engagement";
import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentEngagementRow = {
    engagement_enabled: boolean;
    engagement_mode: EnvironmentEngagementState["mode"];
};

/* ------------------------------
   Authentication
-------------------------------- */
async function getAuthenticatedContext() {
    const supabase = await supabaseServer();

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) {
        return {
            ok: false as const,
            response: NextResponse.json(
                {
                    error: "Unauthorized",
                    auth_error: error?.message ?? null,
                },
                { status: 401 },
            ),
        };
    }

    return {
        ok: true as const,
        supabase,
        user,
    };
}

/* ------------------------------
   GET Handler
-------------------------------- */
export async function GET() {
    const context = await getAuthenticatedContext();

    if (!context.ok) {
        return context.response;
    }

    const { supabase, user } = context;

    const { data, error } = await supabase
        .from("user_preferences")
        .select(
            "engagement_enabled,engagement_mode",
        )
        .eq("user_id", user.id)
        .maybeSingle<EnvironmentEngagementRow>();

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 },
        );
    }

    if (!data) {
        return NextResponse.json({
            engagement:
                DEFAULT_ENVIRONMENT_ENGAGEMENT_STATE,
        });
    }

    return NextResponse.json({
        engagement: {
            enabled: data.engagement_enabled,
            mode: data.engagement_mode,
        } satisfies EnvironmentEngagementState,
    });
}

/* ------------------------------
   PATCH Handler
-------------------------------- */
export async function PATCH(req: Request) {
    const context = await getAuthenticatedContext();

    if (!context.ok) {
        return context.response;
    }

    const { supabase, user } = context;

    let body: unknown;

    try {
        body = await req.json();
    } catch {
        return NextResponse.json(
            { error: "Invalid JSON body." },
            { status: 400 },
        );
    }

    if (!isEnvironmentEngagementState(body)) {
        return NextResponse.json(
            {
                error:
                    "Expected enabled boolean and mode system, precise, or capture.",
            },
            { status: 400 },
        );
    }

    const updatedAt = new Date().toISOString();

    const { error } = await supabase
        .from("user_preferences")
        .upsert(
            {
                user_id: user.id,
                engagement_enabled: body.enabled,
                engagement_mode: body.mode,
                updated_at: updatedAt,
            },
            {
                onConflict: "user_id",
            },
        );

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 },
        );
    }

    return NextResponse.json({
        ok: true,
        engagement: body,
    });
}