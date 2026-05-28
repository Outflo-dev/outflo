/* ==========================================================
   OUTFLO — ENVIRONMENT LIVE TEST PAGE
   File: app/account/profile/(pages)/environment/live-test/page.tsx
   Scope: Temporary dev monitor for OwnTracks Environment movement
   Status: DEV ONLY — remove or replace with real Records surface later
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";
import EnvironmentLiveTestHeader from "./header/EnvironmentLiveTestHeader";
import { createAdminClient } from "@/lib/supabase/admin";

/* ------------------------------
   Runtime
-------------------------------- */
export const dynamic = "force-dynamic";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentSnapshotRow = {
    id: string;
    user_id: string;
    moment_ms: number | null;
    location_precision: string | null;
    lat: number | null;
    lng: number | null;
    pressure_hpa: number | null;
    elevation_m: number | null;
    observation_type: string | null;
    capture_mode: string | null;
    source_mode: string | null;
    source_payload_ref: string | null;
    created_at: string | null;
};

type EnvironmentEmitterEventRow = {
    id: string;
    provider: string | null;
    device_id: string | null;
    event_type: string | null;
    event_ms: number | null;
    received_ms: number | null;
    lat: number | null;
    lon: number | null;
    accuracy_m: number | null;
    altitude_m: number | null;
    pressure_kpa: number | null;
    battery_pct: number | null;
    trigger: string | null;
    tracker_id: string | null;
};

/* ------------------------------
   Page
-------------------------------- */
export default async function EnvironmentLiveTestPage() {
    const supabase = createAdminClient();

    const { data: snapshotData } = await supabase
        .from("environment_snapshots")
        .select(
            "id,user_id,moment_ms,location_precision,lat,lng,pressure_hpa,elevation_m,observation_type,capture_mode,source_mode,source_payload_ref,created_at"
        )
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

    const { data: eventsData } = await supabase
        .from("environment_emitter_events")
        .select(
            "id,provider,device_id,event_type,event_ms,received_ms,lat,lon,accuracy_m,altitude_m,pressure_kpa,battery_pct,trigger,tracker_id"
        )
        .eq("provider", "owntracks")
        .order("received_ms", { ascending: false })
        .limit(8);

    const snapshot = snapshotData as unknown as EnvironmentSnapshotRow | null;
    const events = (eventsData ?? []) as unknown as EnvironmentEmitterEventRow[];
    const latestEvent = events[0] ?? null;

    return (
        <main
            style={{
                minHeight: "100svh",
                padding: "24px",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
                fontFamily: "var(--font-sans)",
            }}
        >


            <section
                style={{
                    maxWidth: 720,
                    margin: "0 auto",
                    display: "grid",
                    gap: 16,
                }}
            >

                <EnvironmentLiveTestHeader />

                <header>
                    <p style={{ margin: 0, opacity: 0.6, fontSize: 12 }}>
                        DEV ONLY · auto-refreshes every 10s
                    </p>

                    <h1 style={{ margin: "6px 0 0", fontSize: 28 }}>
                        Environment Live Test
                    </h1>

                    <p style={{ margin: "8px 0 0", opacity: 0.72 }}>
                        OwnTracks → MQTT → Outflō → snapshot/events
                    </p>
                </header>

                <Card title="Current snapshot">
                    {snapshot ? (
                        <Grid>
                            <Field label="Moment ms" value={snapshot.moment_ms} />
                            <Field label="Lat" value={snapshot.lat} />
                            <Field label="Lng" value={snapshot.lng} />
                            <Field
                                label="Precision"
                                value={snapshot.location_precision}
                            />
                            <Field
                                label="Pressure hPa"
                                value={snapshot.pressure_hpa}
                            />
                            <Field
                                label="Elevation m"
                                value={snapshot.elevation_m}
                            />
                            <Field label="Capture" value={snapshot.capture_mode} />
                            <Field label="Source" value={snapshot.source_mode} />
                            <Field label="Created" value={snapshot.created_at} />
                            <Field
                                label="Payload ref"
                                value={snapshot.source_payload_ref}
                            />
                        </Grid>
                    ) : (
                        <Empty>No snapshot found.</Empty>
                    )}
                </Card>

                <Card title="Latest event">
                    {latestEvent ? (
                        <Grid>
                            <Field label="Device" value={latestEvent.device_id} />
                            <Field label="Event ms" value={latestEvent.event_ms} />
                            <Field
                                label="Received ms"
                                value={latestEvent.received_ms}
                            />
                            <Field label="Lat" value={latestEvent.lat} />
                            <Field label="Lon" value={latestEvent.lon} />
                            <Field
                                label="Accuracy m"
                                value={latestEvent.accuracy_m}
                            />
                            <Field
                                label="Altitude m"
                                value={latestEvent.altitude_m}
                            />
                            <Field
                                label="Pressure kPa"
                                value={latestEvent.pressure_kpa}
                            />
                            <Field
                                label="Battery"
                                value={latestEvent.battery_pct}
                            />
                            <Field label="Trigger" value={latestEvent.trigger} />
                            <Field label="Tracker" value={latestEvent.tracker_id} />
                        </Grid>
                    ) : (
                        <Empty>No events found.</Empty>
                    )}
                </Card>

                <Card title="Recent events">
                    {events.length > 0 ? (
                        <div style={{ display: "grid", gap: 10 }}>
                            {events.map((event) => (
                                <div
                                    key={event.id}
                                    style={{
                                        padding: 12,
                                        borderRadius: 14,
                                        border: "1px solid var(--border-subtle)",
                                        background: "var(--bg-secondary)",
                                    }}
                                >
                                    <div style={{ fontSize: 13, opacity: 0.72 }}>
                                        {event.device_id ?? "unknown device"} ·{" "}
                                        {event.tracker_id ?? "—"} ·{" "}
                                        {event.trigger ?? "—"}
                                    </div>

                                    <div style={{ marginTop: 4, fontSize: 15 }}>
                                        {event.lat ?? "—"}, {event.lon ?? "—"}
                                    </div>

                                    <div
                                        style={{
                                            marginTop: 4,
                                            fontSize: 12,
                                            opacity: 0.6,
                                        }}
                                    >
                                        event_ms: {event.event_ms ?? "—"} ·
                                        received_ms: {event.received_ms ?? "—"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Empty>No recent events found.</Empty>
                    )}
                </Card>
            </section>
        </main>
    );
}

/* ------------------------------
   Local Components
-------------------------------- */
function Card({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <section
            style={{
                padding: 16,
                borderRadius: 22,
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-elevated, var(--bg-secondary))",
            }}
        >
            <h2 style={{ margin: "0 0 12px", fontSize: 18 }}>{title}</h2>
            {children}
        </section>
    );
}

function Grid({ children }: { children: ReactNode }) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 10,
            }}
        >
            {children}
        </div>
    );
}

function Field({
    label,
    value,
}: {
    label: string;
    value: string | number | null;
}) {
    return (
        <div
            style={{
                padding: 10,
                borderRadius: 14,
                background: "var(--bg-secondary)",
            }}
        >
            <div style={{ fontSize: 11, opacity: 0.58 }}>{label}</div>

            <div
                style={{
                    marginTop: 4,
                    fontSize: 14,
                    overflowWrap: "anywhere",
                }}
            >
                {value ?? "—"}
            </div>
        </div>
    );
}

function Empty({ children }: { children: ReactNode }) {
    return <p style={{ margin: 0, opacity: 0.64 }}>{children}</p>;
}