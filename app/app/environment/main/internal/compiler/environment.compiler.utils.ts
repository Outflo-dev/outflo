/* ==========================================================
   OUTFLO — ENVIRONMENT COMPILER UTILS
   File: app/app/environment/main/internal/compiler/environment.compiler.utils.ts
   Scope: Own shared primitive helpers for Environment model compilation
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: create shared compiler utilities before splitting environment.sections.ts
   ========================================================== */

/* ------------------------------
   Public API
-------------------------------- */
export function displayValue(value: unknown, suffix = ""): string {
    if (value === null || value === undefined || value === "") return "—";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (typeof value === "number") return `${roundValue(value)}${suffix}`;
    if (Array.isArray(value)) return formatArray(value);

    return `${String(value)}${suffix}`;
}

export function numberValue(value: unknown): number | null {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }

    if (typeof value === "string") {
        const parsed = Number(value);

        return Number.isFinite(parsed) ? parsed : null;
    }

    return null;
}

export function roundValue(value: number): string {
    if (Number.isInteger(value)) return String(value);

    return String(Math.round(value * 10) / 10);
}

export function formatMs(value: unknown): string {
    const ms = numberValue(value);

    if (!ms) return "—";

    return new Date(ms).toLocaleString();
}

export function formatHeroTime(value: unknown): string {
    const ms = numberValue(value);

    if (!ms) return "—";

    return new Date(ms).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });
}

export function formatForecastHour(value: unknown): string {
    if (typeof value !== "string") return "—";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "—";

    return date.toLocaleTimeString([], {
        hour: "numeric",
    });
}

/* ------------------------------
   Helpers
-------------------------------- */
function formatArray(value: unknown): string {
    if (!Array.isArray(value) || value.length === 0) return "—";

    return value.map(String).join(", ");
}