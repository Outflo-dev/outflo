"use client";

/* ==========================================================
   OUTFLO — TOGGLE ACTION
   File: components/system/actions/toggle/ToggleAction.tsx
   Scope: Own reusable toggle action boundary and delegate visual state to ToggleFrame
   Last Updated:
   - ms: 1779283695954
   - iso: 2026-05-20T13:28:15.954Z
   - note: add reusable toggle action primitive for environment controls
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import ToggleFrame from "./ToggleFrame";

/* ------------------------------
   Types
-------------------------------- */
type ToggleActionProps = {
    checked: boolean;
    onClick?: () => void;
    disabled?: boolean;
    ariaLabel: string;
    title?: string;
    style?: CSSProperties;
};

/* ------------------------------
   Constants
-------------------------------- */
const BUTTON_STYLE: CSSProperties = {
    appearance: "none",
    border: "none",
    padding: 0,
    margin: 0,
    background: "transparent",
    cursor: "pointer",
    lineHeight: 0,
};

/* ------------------------------
   Component
-------------------------------- */
export default function ToggleAction({
    checked,
    onClick,
    disabled = false,
    ariaLabel,
    title,
    style,
}: ToggleActionProps) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={ariaLabel}
            title={title}
            disabled={disabled}
            onClick={onClick}
            style={{
                ...BUTTON_STYLE,
                cursor: disabled ? "default" : "pointer",
                ...style,
            }}
        >
            <ToggleFrame checked={checked} disabled={disabled} />
        </button>
    );
}