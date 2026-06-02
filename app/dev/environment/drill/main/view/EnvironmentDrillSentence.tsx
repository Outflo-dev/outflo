/* ==========================================================
   OUTFLO — ENVIRONMENT DRILL SENTENCE
   File: app/dev/environment/drill/main/view/EnvironmentDrillSentence.tsx
   Scope: Living sentence for dev-only Environment pings drill prototype
   Last Updated:
   - ms: 1780412455093
   - iso: 2026-06-02T15:00:55.093Z
   - note: create Environment pings drill prototype sentence
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { EnvironmentPingsDrill } from "../internal/environment-drill.types";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentDrillSentenceProps = {
    drill: EnvironmentPingsDrill;
};

/* ------------------------------
   Helpers
-------------------------------- */
function formatMs(ms: number | null) {
    if (typeof ms !== "number" || !Number.isFinite(ms)) return "—";

    return new Date(ms).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentDrillSentence({
    drill,
}: EnvironmentDrillSentenceProps) {
    return (
        <section
            style={{
                padding: 18,
                borderRadius: 26,
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-secondary)",
            }}
        >
            <p
                style={{
                    margin: 0,
                    fontSize: 20,
                    lineHeight: 1.35,
                    letterSpacing: "-0.03em",
                }}
            >
                {drill.sentence}
            </p>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                    marginTop: 14,
                    fontSize: 12,
                    opacity: 0.62,
                }}
            >
                <span>First: {formatMs(drill.firstPingMs)}</span>
                <span>Last: {formatMs(drill.lastPingMs)}</span>
            </div>
        </section>
    );
}