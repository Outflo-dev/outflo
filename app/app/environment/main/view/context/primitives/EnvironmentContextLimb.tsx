// app/app/environment/main/view/context/primitives/EnvironmentContextLimb.tsx
"use client";

import type { CSSProperties } from "react";

const LIMB_STYLE: CSSProperties = {
    position: "absolute",
    right: -64,
    top: -38,
    width: 210,
    height: 168,
    zIndex: 1,
    pointerEvents: "none",
    borderRadius: "999px 0 0 999px",
    borderLeft: "1px solid var(--environment-context-map-limb)",
    boxShadow: "inset 16px 0 28px var(--environment-context-map-limb-soft)",
    opacity: "var(--environment-context-map-limb-opacity)",
};

export default function EnvironmentContextLimb() {
    return <div style={LIMB_STYLE} aria-hidden="true" />;
}