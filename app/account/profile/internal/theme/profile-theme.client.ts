// app/account/profile/internal/theme/profile-theme.client.ts

"use client";

/* ==========================================================
   OUTFLO — PROFILE THEME CLIENT WRITE
   File: app/account/profile/internal/theme/profile-theme.client.ts
   Scope: Own client-side profile theme preference save transport
   Last Updated:
   - ms: 1778071498197
   - iso: 2026-05-06T12:44:58.197Z
   - note: extract profile theme write transport from render panel
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ThemePreference } from "@/lib/app-state/theme-preference";
import { supabaseBrowser } from "@/lib/supabase/client";

/* ------------------------------
   Types
-------------------------------- */
export type SaveProfileThemePreferenceResult =
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

    return "Theme save failed.";
}

/* ------------------------------
   Client Write
-------------------------------- */
export async function saveProfileThemePreference(
    themePreference: ThemePreference
): Promise<SaveProfileThemePreferenceResult> {
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
        response = await fetch("/api/profile/theme", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(accessToken
                    ? { Authorization: `Bearer ${accessToken}` }
                    : {}),
            },
            body: JSON.stringify({
                theme_preference: themePreference,
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
