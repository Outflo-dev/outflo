"use client";

/* ==========================================================
   OUTFLO — TOGGLE FRAME
   File: components/system/actions/toggle/ToggleFrame.tsx
   Scope: Render reusable toggle switch visual state with no action ownership
   Last Updated:
   - ms: 1779283695954
   - iso: 2026-05-20T13:28:15.954Z
   - note: add reusable toggle visual primitive for environment controls
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type ToggleFrameProps = {
    checked: boolean;
    disabled?: boolean;
    style?: CSSProperties;
};

/* ------------------------------
   Constants
-------------------------------- */
const FRAME_STYLE: CSSProperties = {
    width: 48,
    height: 28,
    display: "inline-flex",
    alignItems: "center",
    border: "1px solid var(--border-soft)",
    borderRadius: 999,
    padding: 2,
    background: "var(--surface-muted)",
    boxSizing: "border-box",
};

const DOT_STYLE: CSSProperties = {
    width: 22,
    height: 22,
    borderRadius: 999,
    background: "var(--text-tertiary)",
    transition: "transform 180ms ease, background 180ms ease",
};

const CHECKED_DOT_STYLE: CSSProperties = {
    transform: "translateX(20px)",
    background: "var(--text-primary)",
};

const DISABLED_STYLE: CSSProperties = {
    opacity: 0.42,
};

/* ------------------------------
   Component
-------------------------------- */
export default function ToggleFrame({
    checked,
    disabled = false,
    style,
}: ToggleFrameProps) {
    return (
        <span
            style={{
                ...FRAME_STYLE,
                ...(disabled ? DISABLED_STYLE : undefined),
                ...style,
            }}
        >
            <span
                style={{
                    ...DOT_STYLE,
                    ...(checked ? CHECKED_DOT_STYLE : undefined),
                }}
            />
        </span>
    );
}