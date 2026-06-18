/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT PROVIDER UTILS
   File: app/api/environment/context/pull/internal/environment-context-provider.utils.ts
   Scope: Own provider normalization helpers
   Last Updated:
   - ms: 1781741862076
   - iso: 2026-06-18T00:17:42.076Z
   - note: split Environment runtime ownership while preserving behavior
   ========================================================== */

export function toNumber(value: unknown): number | null {
    if (typeof value === "number" && Number.isFinite(value)) return value;

    if (typeof value === "string") {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : null;
    }

    return null;
}

export function toInteger(value: unknown): number | null {
    const numberValue = toNumber(value);
    return numberValue === null ? null : Math.trunc(numberValue);
}

export function toBooleanFromDay(value: unknown): boolean | null {
    if (value === 1) return true;
    if (value === 0) return false;
    if (value === true) return true;
    if (value === false) return false;
    return null;
}

export function firstArrayValue(value: unknown): unknown {
    return Array.isArray(value) ? value[0] ?? null : null;
}

export function arrayValue(value: unknown): unknown[] {
    return Array.isArray(value) ? value : [];
}

export function kmhToMps(value: number | null): number | null {
    return value === null ? null : value / 3.6;
}