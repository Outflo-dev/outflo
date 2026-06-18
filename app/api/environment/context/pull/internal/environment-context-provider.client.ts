/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT PROVIDER CLIENT
   File: app/api/environment/context/pull/internal/environment-context-provider.client.ts
   Scope: Own provider HTTP fetch and JSON parsing
   Last Updated:
   - ms: 1781741862076
   - iso: 2026-06-18T00:17:42.076Z
   - note: split Environment runtime ownership while preserving behavior
   ========================================================== */

import type { ProviderResult } from "./environment-context-provider.types";

export async function readJson(url: URL): Promise<ProviderResult> {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            accept: "application/json",
        },
        cache: "no-store",
    });

    const text = await response.text();

    let json: any = null;

    try {
        json = text.length > 0 ? JSON.parse(text) : null;
    } catch {
        json = {
            parse_error: true,
            body: text,
        };
    }

    return {
        ok: response.ok,
        status: response.status,
        url: url.toString(),
        json,
    };
}