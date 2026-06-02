/* ==========================================================
   OUTFLO — ENVIRONMENT DRILL PROOF TABLE
   File: app/dev/environment/drill/main/view/EnvironmentDrillProofTable.tsx
   Scope: Proof table for dev-only Environment pings drill prototype
   Last Updated:
   - ms: 1780412455093
   - iso: 2026-06-02T15:00:55.093Z
   - note: create Environment pings drill prototype proof table
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { EnvironmentPingsProofRow } from "../internal/environment-drill.types";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentDrillProofTableProps = {
    rows: EnvironmentPingsProofRow[];
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentDrillProofTable({
    rows,
}: EnvironmentDrillProofTableProps) {
    return (
        <section
            style={{
                display: "grid",
                gap: 12,
            }}
        >
            <div>
                <h2
                    style={{
                        margin: 0,
                        fontSize: 18,
                        lineHeight: 1.1,
                        letterSpacing: "-0.03em",
                    }}
                >
                    Proof
                </h2>

                <p
                    style={{
                        margin: "6px 0 0",
                        fontSize: 12,
                        opacity: 0.58,
                    }}
                >
                    Rows included in the current wound window.
                </p>
            </div>

            <div
                style={{
                    overflowX: "auto",
                    borderRadius: 22,
                    border: "1px solid var(--border-subtle)",
                    background: "var(--bg-secondary)",
                }}
            >
                <table
                    style={{
                        width: "100%",
                        minWidth: 860,
                        borderCollapse: "collapse",
                        fontSize: 12,
                    }}
                >
                    <thead>
                        <tr>
                            <th style={headerCellStyle}>Time</th>
                            <th style={headerCellStyle}>Motion</th>
                            <th style={headerCellStyle}>Accuracy</th>
                            <th style={headerCellStyle}>Battery</th>
                            <th style={headerCellStyle}>Conn</th>
                            <th style={headerCellStyle}>Rain</th>
                            <th style={headerCellStyle}>AQI</th>
                            <th style={headerCellStyle}>Context Age</th>
                            <th style={headerCellStyle}>Lat/Lng</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.length > 0 ? (
                            rows.map((row) => (
                                <tr key={row.id}>
                                    <td style={bodyCellStyle}>{row.timeLabel}</td>
                                    <td style={bodyCellStyle}>{row.motionLabel}</td>
                                    <td style={bodyCellStyle}>{row.accuracyLabel}</td>
                                    <td style={bodyCellStyle}>{row.batteryLabel}</td>
                                    <td style={bodyCellStyle}>
                                        {row.connectionLabel}
                                    </td>
                                    <td style={bodyCellStyle}>{row.rainLabel}</td>
                                    <td style={bodyCellStyle}>{row.aqiLabel}</td>
                                    <td style={bodyCellStyle}>
                                        {row.contextAgeLabel}
                                    </td>
                                    <td style={bodyCellStyle}>{row.latLngLabel}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={9}
                                    style={{
                                        ...bodyCellStyle,
                                        padding: 18,
                                        opacity: 0.58,
                                    }}
                                >
                                    No Environment pings inside this wound window.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

/* ------------------------------
   Styles
-------------------------------- */
const headerCellStyle = {
    padding: "12px 14px",
    textAlign: "left",
    fontWeight: 600,
    opacity: 0.62,
    borderBottom: "1px solid var(--border-subtle)",
    whiteSpace: "nowrap",
} as const;

const bodyCellStyle = {
    padding: "12px 14px",
    borderBottom: "1px solid var(--border-subtle)",
    whiteSpace: "nowrap",
} as const;