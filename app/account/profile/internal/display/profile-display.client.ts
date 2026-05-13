// app/account/profile/internal/display/profile-display.client.ts

"use client";

/* ==========================================================
   OUTFLO — PROFILE DISPLAY CLIENT WRITE
   File: app/account/profile/internal/display/profile-display.client.ts
   Scope: Own client-side profile display preference save transport
   Last Updated:
   - ms: 1778611632761
   - iso: 2026-05-12T18:47:12.761Z
   - note: add profile display preference write transport
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { GlowPreference } from "@/lib/app-state/glow-preference";
import type { TextScale } from "@/lib/app-state/text-scale";
import { supabaseBrowser } from "@/lib/supabase/client";

/* ------------------------------
   Types
-------------------------------- */
export type SaveProfileDisplayPreferencesInput = {
    textScale: TextScale;
    glowPreference: GlowPreference;
};

export type SaveProfileDisplayPreferencesResult =
    | { ok: true }
    | {
        ok: false;
        status: number;
        message: string;
        diagnostics?: unknown;
    };

/* ------------------------------
   Helpers
-------------------------------- */
async function readResponseBody(response: Response) {
    const text = await response.text();

    if (!text) return null;

    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
}

function getErrorMessage(body: unknown) {
    if (body instanceof Error) return body.message;

    if (typeof body === "string") return body;

    if (
        body &&
        typeof body === "object" &&
        "error" in body &&
        typeof body.error === "string"
    ) {
        return body.error;
    }

    return "Display preference save failed.";
}

/* ------------------------------
   Client Write
-------------------------------- */
export async function saveProfileDisplayPreferences({
    textScale,
    glowPreference,
}: SaveProfileDisplayPreferencesInput): Promise<SaveProfileDisplayPreferencesResult> {
    const supabase = supabaseBrowser();

    let accessToken: string | null = null;
    let sessionErrorMessage: string | null = null;

    try {
        const {
            data: { session },
            error: sessionError,
        } = await supabase.auth.getSession();

        accessToken = session?.access_token ?? null;
        sessionErrorMessage = sessionError?.message ?? null;
    } catch (error) {
        sessionErrorMessage = getErrorMessage(error);
    }

    let response: Response;

    try {
        response = await fetch("/api/profile/display", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(accessToken
                    ? { Authorization: `Bearer ${accessToken}` }
                    : {}),
            },
            body: JSON.stringify({
                text_scale: textScale,
                glow_preference: glowPreference,
            }),
        });
    } catch (error) {
        return {
            ok: false,
            status: 0,
            message: getErrorMessage(error),
            diagnostics: {
                origin: window.location.origin,
                has_token: Boolean(accessToken),
                token_length: accessToken?.length ?? 0,
                session_error: sessionErrorMessage,
            },
        };
    }

    const body = await readResponseBody(response);

    if (!response.ok) {
        return {
            ok: false,
            status: response.status,
            message: getErrorMessage(body),
            diagnostics: {
                origin: window.location.origin,
                has_token: Boolean(accessToken),
                token_length: accessToken?.length ?? 0,
                session_error: sessionErrorMessage,
                response: body,
            },
        };
    }

    return { ok: true };
}