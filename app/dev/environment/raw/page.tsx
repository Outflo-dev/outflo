/* ==========================================================
   OUTFLO — RAW ENVIRONMENT RECEIPTS PAGE
   File: app/dev/environment/raw/page.tsx
   Scope: Dev-only raw Environment substrate view
   ========================================================== */

import { supabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type JsonRecord = Record<string, unknown>;

function formatMs(ms: number | null) {
    if (!ms) return "—";
    return new Date(ms).toLocaleString();
}

function formatValue(value: unknown) {
    if (value === null || value === undefined) return "—";
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
}

function pretty(value: unknown) {
    return JSON.stringify(value, null, 2);
}

export default async function RawEnvironmentPage() {
    const supabase = await supabaseServer();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return (
            <main style={{ padding: 24, fontFamily: "monospace" }}>
                <h1>Environment Raw</h1>
                <p>Unauthorized.</p>
            </main>
        );
    }

    const [{ data: snapshot }, { data: emitterEvents }, { data: contextEvents }] =
        await Promise.all([
            supabase
                .from("environment_snapshots")
                .select("*")
                .eq("user_id", user.id)
                .maybeSingle(),

            supabase
                .from("environment_emitter_events")
                .select("*")
                .eq("user_id", user.id)
                .order("event_ms", { ascending: false })
                .limit(200),

            supabase
                .from("environment_context_events")
                .select("*")
                .eq("user_id", user.id)
                .order("pulled_at_ms", { ascending: false })
                .limit(50),
        ]);

    return (
        <main
            style={{
                padding: 20,
                fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: 12,
                lineHeight: 1.4,
                background: "#080808",
                color: "#f2f2f2",
                minHeight: "100vh",
            }}
        >
            <h1 style={{ margin: "0 0 8px" }}>🧾 Environment Raw Receipts</h1>

            <p style={{ margin: "0 0 20px", color: "#aaa" }}>
                OwnTracks pings · Mateo pulls · current snapshot · no polish
            </p>

            <section style={{ marginBottom: 28 }}>
                <h2>🌍 Current Snapshot</h2>

                <pre
                    style={{
                        whiteSpace: "pre-wrap",
                        padding: 12,
                        background: "#111",
                        border: "1px solid #333",
                        borderRadius: 8,
                        overflowX: "auto",
                    }}
                >
                    {pretty(snapshot)}
                </pre>
            </section>

            <section style={{ marginBottom: 28 }}>
                <h2>🛰️ OwnTracks Pings</h2>

                <div style={{ display: "grid", gap: 8 }}>
                    {(emitterEvents ?? []).map((event: JsonRecord) => {
                        const raw = (event.raw ?? {}) as JsonRecord;
                        const motion = raw.motionactivities;

                        return (
                            <details
                                key={String(event.id)}
                                style={{
                                    background: "#111",
                                    border: "1px solid #333",
                                    borderRadius: 8,
                                    padding: 10,
                                }}
                            >
                                <summary style={{ cursor: "pointer" }}>
                                    <span>🧾 {formatValue(event.id)}</span>
                                    {" | "}
                                    <span>time {formatMs(event.event_ms as number | null)}</span>
                                    {" | "}
                                    <span>
                                        📍 {formatValue(event.lat)}, {formatValue(event.lon)}
                                    </span>
                                    {" | "}
                                    <span>🎯 acc {formatValue(event.accuracy_m)}m</span>
                                    {" | "}
                                    <span>🔋 {formatValue(event.battery_pct)}%</span>
                                    {" | "}
                                    <span>📶 {formatValue(event.connection)}</span>
                                    {" | "}
                                    <span>trigger {formatValue(event.trigger)}</span>
                                    {" | "}
                                    <span>motion {formatValue(motion)}</span>
                                </summary>

                                <pre
                                    style={{
                                        whiteSpace: "pre-wrap",
                                        marginTop: 10,
                                        padding: 10,
                                        background: "#050505",
                                        border: "1px solid #222",
                                        borderRadius: 6,
                                        overflowX: "auto",
                                    }}
                                >
                                    {pretty(event)}
                                </pre>
                            </details>
                        );
                    })}
                </div>
            </section>

            <section>
                <h2>🌦️ Mateo / Open-Meteo Pulls</h2>

                <div style={{ display: "grid", gap: 8 }}>
                    {(contextEvents ?? []).map((event: JsonRecord) => (
                        <details
                            key={String(event.id)}
                            style={{
                                background: "#111",
                                border: "1px solid #333",
                                borderRadius: 8,
                                padding: 10,
                            }}
                        >
                            <summary style={{ cursor: "pointer" }}>
                                <span>🧾 {formatValue(event.id)}</span>
                                {" | "}
                                <span>
                                    pulled {formatMs(event.pulled_at_ms as number | null)}
                                </span>
                                {" | "}
                                <span>
                                    📍 {formatValue(event.input_lat)},{" "}
                                    {formatValue(event.input_lng)}
                                </span>
                                {" | "}
                                <span>🌡️ {formatValue(event.temperature_c)}°C</span>
                                {" | "}
                                <span>🌫️ AQI {formatValue(event.us_aqi)}</span>
                                {" | "}
                                <span>☀️ UV {formatValue(event.uv_index)}</span>
                                {" | "}
                                <span>CO {formatValue(event.carbon_monoxide)}</span>
                            </summary>

                            <pre
                                style={{
                                    whiteSpace: "pre-wrap",
                                    marginTop: 10,
                                    padding: 10,
                                    background: "#050505",
                                    border: "1px solid #222",
                                    borderRadius: 6,
                                    overflowX: "auto",
                                }}
                            >
                                {pretty(event)}
                            </pre>
                        </details>
                    ))}
                </div>
            </section>
        </main>
    );
}