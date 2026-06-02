/* ==========================================================
   OUTFLO — ENVIRONMENT DRILL VIEW
   File: app/dev/environment/drill/main/view/EnvironmentDrillView.tsx
   Scope: View composition for dev-only Environment pings drill prototype
   Last Updated:
   - ms: 1780412455093
   - iso: 2026-06-02T15:00:55.093Z
   - note: create Environment pings drill prototype view
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    EnvironmentPingsDrill,
    EnvironmentPingsProofRow,
} from "../internal/environment-drill.types";
import EnvironmentDrillHeader from "./EnvironmentDrillHeader";
import EnvironmentDrillProofTable from "./EnvironmentDrillProofTable";
import EnvironmentDrillSentence from "./EnvironmentDrillSentence";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentDrillViewProps = {
    drill: EnvironmentPingsDrill;
    proofRows: EnvironmentPingsProofRow[];
    windPercent: number;
    errorMessage: string | null;
    onWindPercentChange: (value: number) => void;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentDrillView({
    drill,
    proofRows,
    windPercent,
    errorMessage,
    onWindPercentChange,
}: EnvironmentDrillViewProps) {
    return (
        <main
            style={{
                minHeight: "100svh",
                padding: "24px 16px 40px",
                color: "var(--text-primary)",
                background: "var(--bg-primary)",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: 760,
                    margin: "0 auto",
                    display: "grid",
                    gap: 18,
                }}
            >
                <EnvironmentDrillHeader
                    drill={drill}
                    windPercent={windPercent}
                    onWindPercentChange={onWindPercentChange}
                />

                {errorMessage ? (
                    <section
                        style={{
                            padding: 14,
                            borderRadius: 18,
                            border: "1px solid var(--border-subtle)",
                            background: "var(--bg-secondary)",
                        }}
                    >
                        <p style={{ margin: 0, fontSize: 13, opacity: 0.72 }}>
                            {errorMessage}
                        </p>
                    </section>
                ) : null}

                <EnvironmentDrillSentence drill={drill} />

                <section
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        gap: 12,
                    }}
                >
                    <article
                        style={{
                            padding: 16,
                            borderRadius: 22,
                            border: "1px solid var(--border-subtle)",
                            background: "var(--bg-secondary)",
                        }}
                    >
                        <div style={{ fontSize: 12, opacity: 0.58 }}>
                            Pings
                        </div>
                        <div
                            style={{
                                marginTop: 8,
                                fontSize: 38,
                                lineHeight: 1,
                                fontWeight: 700,
                            }}
                        >
                            {drill.pingCount}
                        </div>
                        <div
                            style={{
                                marginTop: 8,
                                fontSize: 12,
                                opacity: 0.58,
                            }}
                        >
                            of {drill.totalPingCount} total
                        </div>
                    </article>

                    <article
                        style={{
                            padding: 16,
                            borderRadius: 22,
                            border: "1px solid var(--border-subtle)",
                            background: "var(--bg-secondary)",
                        }}
                    >
                        <div style={{ fontSize: 12, opacity: 0.58 }}>
                            Wind
                        </div>
                        <div
                            style={{
                                marginTop: 8,
                                fontSize: 38,
                                lineHeight: 1,
                                fontWeight: 700,
                            }}
                        >
                            {Math.round(windPercent)}%
                        </div>
                        <div
                            style={{
                                marginTop: 8,
                                fontSize: 12,
                                opacity: 0.58,
                            }}
                        >
                            Begin → Now
                        </div>
                    </article>
                </section>

                <EnvironmentDrillProofTable rows={proofRows} />
            </div>
        </main>
    );
}