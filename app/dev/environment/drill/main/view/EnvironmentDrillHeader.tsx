/* ==========================================================
   OUTFLO — ENVIRONMENT DRILL HEADER
   File: app/dev/environment/drill/main/view/EnvironmentDrillHeader.tsx
   Scope: Header and wind control for dev-only Environment pings drill prototype
   Last Updated:
   - ms: 1780412455093
   - iso: 2026-06-02T15:00:55.093Z
   - note: create Environment pings drill prototype header
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { EnvironmentPingsDrill } from "../internal/environment-drill.types";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentDrillHeaderProps = {
    drill: EnvironmentPingsDrill;
    windPercent: number;
    onWindPercentChange: (value: number) => void;
};

/* ------------------------------
   Helpers
-------------------------------- */
function formatMs(ms: number | null) {
    if (typeof ms !== "number" || !Number.isFinite(ms)) return "—";

    return new Date(ms).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentDrillHeader({
    drill,
    windPercent,
    onWindPercentChange,
}: EnvironmentDrillHeaderProps) {
    return (
        <header
            style={{
                display: "grid",
                gap: 16,
                padding: "18px 0 4px",
            }}
        >
            <div>
                <p
                    style={{
                        margin: 0,
                        fontSize: 12,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        opacity: 0.54,
                    }}
                >
                    Environment / Substrate Drill
                </p>

                <h1
                    style={{
                        margin: "8px 0 0",
                        fontSize: 34,
                        lineHeight: 1,
                        letterSpacing: "-0.04em",
                    }}
                >
                    Pings
                </h1>
            </div>

            <section
                style={{
                    display: "grid",
                    gap: 10,
                    padding: 16,
                    borderRadius: 24,
                    border: "1px solid var(--border-subtle)",
                    background: "var(--bg-secondary)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 14,
                        fontSize: 12,
                        opacity: 0.68,
                    }}
                >
                    <span>Begin</span>
                    <span>Now</span>
                </div>

                <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={windPercent}
                    onChange={(event) =>
                        onWindPercentChange(Number(event.target.value))
                    }
                    aria-label="Wind Environment window from Begin to Now"
                    style={{
                        width: "100%",
                    }}
                />

                <div
                    style={{
                        display: "grid",
                        gap: 4,
                        fontSize: 12,
                        opacity: 0.62,
                    }}
                >
                    <div>Wind: {Math.round(windPercent)}%</div>
                    <div>Current edge: {formatMs(drill.windMs)}</div>
                </div>
            </section>
        </header>
    );
}