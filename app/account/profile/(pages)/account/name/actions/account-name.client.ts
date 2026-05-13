"use client";

/* ==========================================================
   OUTFLO — ACCOUNT NAME CLIENT WRITE
   File: app/account/profile/(pages)/account/name/actions/account-name.client.ts
   Scope: Own client-side account name save transport
   Last Updated:
   - ms: 1778701972789
   - iso: 2026-05-13T19:52:52.789Z
   - note: add account name drilldown save transport
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { supabaseBrowser } from "@/lib/supabase/client";
import type {
    SaveAccountNameInput,
    SaveAccountNameResult,
} from "../internal/account-name.types";

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

    return "Account name save failed.";
}

/* ------------------------------
   Client Write
-------------------------------- */
export async function saveAccountName({
    firstName,
    lastName,
}: SaveAccountNameInput): Promise<SaveAccountNameResult> {
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
        response = await fetch("/api/profile/identity/name", {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
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