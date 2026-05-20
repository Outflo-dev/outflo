"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTROL CONTROLLER
   File: app/account/profile/(pages)/environment/[area]/EnvironmentControlController.tsx
   Scope: Own environment category control drilldown motion
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add inert switch controls for environment categories
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import { useState } from "react";

import Motion, {
    MOTION_DURATION_MS,
} from "@/components/system/primitives/motion/Motion";
import Text from "@/components/system/primitives/display/type/Text";
import Chevron from "@/components/system/primitives/navigation/chevron/Chevron";
import AppFrame from "@/components/system/shell/app/AppFrame";
import TextButton from "@/components/system/shell/buttons/types/text/TextButton";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentControlControllerProps = {
    area: string;
};

type ControlModel = {
    title: string;
    copy: string;
    controls: string[];
};

/* ------------------------------
   Constants
-------------------------------- */
const MAIN_STYLE: CSSProperties = {
    minHeight: "100svh",
    padding:
        "calc(env(safe-area-inset-top) + 18px) 0px max(32px, env(safe-area-inset-bottom))",
    background: "var(--bg-primary)",
    color: "var(--text-primary)",
};

const SURFACE_STYLE: CSSProperties = {
    width: "100%",
    display: "grid",
    rowGap: 38,
};

const HEADER_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 18,
};

const NAV_STYLE: CSSProperties = {
    position: "sticky",
    top: -1,
    zIndex: 10,
    minHeight: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    background: "var(--bg-primary)",
    paddingTop: 10,
    paddingBottom: 12,
    marginBottom: -6,
};

const ACTION_STYLE: CSSProperties = {
    width: 44,
    height: 44,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
};

const INTRO_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 8,
    paddingTop: 4,
};

const TITLE_STYLE: CSSProperties = {
    fontSize: "var(--header-lg)",
    fontWeight: "var(--font-weight-bold)",
    letterSpacing: "-0.045em",
    lineHeight: 1,
    color: "var(--text-primary)",
};

const COPY_STYLE: CSSProperties = {
    maxWidth: 460,
    fontSize: "var(--text-sm)",
    lineHeight: 1.45,
    color: "var(--text-secondary)",
};

const LIST_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 0,
};

const CONTROL_ROW_STYLE: CSSProperties = {
    minHeight: 76,
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "center",
    borderBottom: "1px solid var(--border-soft)",
};

const SWITCH_STYLE: CSSProperties = {
    width: 48,
    height: 28,
    border: "1px solid var(--border-soft)",
    borderRadius: 999,
    background: "var(--surface-muted)",
    position: "relative",
};

const SWITCH_DOT_STYLE: CSSProperties = {
    width: 22,
    height: 22,
    borderRadius: 999,
    background: "var(--text-tertiary)",
    position: "absolute",
    top: 2,
    left: 2,
};

/* ------------------------------
   Model
-------------------------------- */
function getControlModel(area: string): ControlModel {
    if (area === "environment") {
        return {
            title: "Environment",
            copy: "Control user-specific environment participation.",
            controls: ["Environment participation"],
        };
    }

    if (area === "location") {
        return {
            title: "Location",
            copy: "Control the spatial context Environment is allowed to use.",
            controls: ["Location participation", "Manual city", "Device location", "Location precision"],
        };
    }

    if (area === "capture") {
        return {
            title: "Capture",
            copy: "Control whether Environment may write records.",
            controls: ["Moment capture", "Continuous capture"],
        };
    }

    if (area === "sun") {
        return {
            title: "Sun",
            copy: "Control astronomical environment signals.",
            controls: ["Sun signal", "Altitude", "Azimuth", "Daylight state"],
        };
    }

    if (area === "precipitation") {
        return {
            title: "Precipitation",
            copy: "Control precipitation environment signals.",
            controls: ["Precipitation signal", "Rain", "Accumulation", "Probability"],
        };
    }

    if (area === "weather") {
        return {
            title: "Weather",
            copy: "Control atmospheric environment signals.",
            controls: ["Weather signal", "Temperature", "Humidity", "Wind", "Pressure"],
        };
    }

    if (area === "air-quality") {
        return {
            title: "Air quality",
            copy: "Control air quality environment signals.",
            controls: ["Air quality signal", "AQI", "PM2.5", "PM10", "Ozone"],
        };
    }

    if (area === "snapshots") {
        return {
            title: "Snapshots",
            copy: "Environment records will appear here once capture is active.",
            controls: [],
        };
    }

    return {
        title: "Receipt links",
        copy: "Receipt-linked environment context will appear here once active.",
        controls: [],
    };
}

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentControlController({
    area,
}: EnvironmentControlControllerProps) {
    const [show, setShow] = useState(true);
    const [direction, setDirection] = useState<"left" | "right">("left");

    const model = getControlModel(area);

    function handleBack() {
        setDirection("right");
        setShow(false);

        window.setTimeout(() => {
            window.history.back();
        }, MOTION_DURATION_MS);
    }

    return (
        <Motion show={show} direction={direction}>
            <main style={MAIN_STYLE}>
                <AppFrame>
                    <section style={SURFACE_STYLE}>
                        <header style={HEADER_STYLE}>
                            <div style={NAV_STYLE}>
                                <TextButton
                                    onClick={handleBack}
                                    ariaLabel="Return to environment"
                                    title="Return to environment"
                                    style={ACTION_STYLE}
                                >
                                    <Chevron
                                        direction="left"
                                        size="var(--chevron-size-md)"
                                        color="var(--text-primary)"
                                    />
                                </TextButton>
                            </div>

                            <div style={INTRO_STYLE}>
                                <Text as="h1" type="display" style={TITLE_STYLE}>
                                    {model.title}
                                </Text>

                                <Text as="p" type="meta" style={COPY_STYLE}>
                                    {model.copy}
                                </Text>
                            </div>
                        </header>

                        <section style={LIST_STYLE}>
                            {model.controls.length > 0 ? (
                                model.controls.map((control) => (
                                    <div key={control} style={CONTROL_ROW_STYLE}>
                                        <Text as="h3" type="label">
                                            {control}
                                        </Text>

                                        <span aria-hidden="true" style={SWITCH_STYLE}>
                                            <span style={SWITCH_DOT_STYLE} />
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <Text as="p" type="meta" style={COPY_STYLE}>
                                    No records yet.
                                </Text>
                            )}
                        </section>
                    </section>
                </AppFrame>
            </main>
        </Motion>
    );
}