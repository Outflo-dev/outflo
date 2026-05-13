"use client";

/* ==========================================================
   OUTFLO — ACCOUNT ORBIT HANDLE VIEW
   File: app/account/profile/(pages)/account/orbithandle/view/AccountOrbitHandleView.tsx
   Scope: Render account Orbit handle drilldown form
   Last Updated:
   - ms: 1778701972789
   - iso: 2026-05-13T19:52:52.789Z
   - note: add isolated Orbit handle edit surface
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, FormEvent } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import PillButton from "@/components/system/shell/buttons/types/pill/PillButton";
import AccountOrbitHandleHeader from "../header/AccountOrbitHandleHeader";

/* ------------------------------
   Types
-------------------------------- */
type AccountOrbitHandleViewProps = {
    orbitHandle: string;
    error: string | null;
    isSaving: boolean;
    onBack: () => void;
    onOrbitHandleChange: (value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

/* ------------------------------
   Constants
-------------------------------- */
const SURFACE_STYLE: CSSProperties = {
    width: "100%",
    display: "grid",
    rowGap: 34,
};

const FORM_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 22,
};

const FIELD_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 8,
};

const LABEL_STYLE: CSSProperties = {
    color: "var(--text-secondary)",
};

const INPUT_WRAP_STYLE: CSSProperties = {
    width: "100%",
    minHeight: 52,
    boxSizing: "border-box",
    border: "1px solid var(--border-soft)",
    borderRadius: 18,
    background: "var(--surface-muted)",
    color: "var(--text-primary)",
    padding: "0 16px",
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    alignItems: "center",
    columnGap: 2,
};

const PREFIX_STYLE: CSSProperties = {
    color: "var(--text-tertiary)",
};

const INPUT_STYLE: CSSProperties = {
    width: "100%",
    minWidth: 0,
    border: "none",
    background: "transparent",
    color: "var(--text-primary)",
    font: "inherit",
    outline: "none",
};

const PREVIEW_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 6,
    border: "1px solid var(--border-soft)",
    borderRadius: 18,
    background: "var(--surface-muted)",
    padding: 16,
};

const PREVIEW_LABEL_STYLE: CSSProperties = {
    color: "var(--text-tertiary)",
};

const PREVIEW_VALUE_STYLE: CSSProperties = {
    color: "var(--text-secondary)",
    overflowWrap: "anywhere",
};

const NOTE_STYLE: CSSProperties = {
    color: "var(--text-tertiary)",
};

const ERROR_STYLE: CSSProperties = {
    color: "var(--danger-text)",
};

const ACTION_ROW_STYLE: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 12,
    paddingTop: 4,
};

/* ------------------------------
   Component
-------------------------------- */
export default function AccountOrbitHandleView({
    orbitHandle,
    error,
    isSaving,
    onBack,
    onOrbitHandleChange,
    onSubmit,
}: AccountOrbitHandleViewProps) {
    const cleanHandle = orbitHandle.trim().replace(/^@+/, "").toLowerCase();
    const accountLink = cleanHandle
        ? `outflo.xyz/${cleanHandle}`
        : "outflo.xyz/your-handle";

    return (
        <section style={SURFACE_STYLE}>
            <AccountOrbitHandleHeader onBack={onBack} />

            <form style={FORM_STYLE} onSubmit={onSubmit}>
                <label style={FIELD_STYLE}>
                    <Text as="span" type="label" style={LABEL_STYLE}>
                        Orbit handle
                    </Text>

                    <div style={INPUT_WRAP_STYLE}>
                        <Text as="span" type="label" style={PREFIX_STYLE}>
                            @
                        </Text>

                        <input
                            value={orbitHandle}
                            onChange={(event) =>
                                onOrbitHandleChange(event.target.value)
                            }
                            autoComplete="username"
                            autoCapitalize="none"
                            spellCheck={false}
                            style={INPUT_STYLE}
                        />
                    </div>
                </label>

                <div style={PREVIEW_STYLE}>
                    <Text as="span" type="label" style={PREVIEW_LABEL_STYLE}>
                        Account link
                    </Text>

                    <Text as="p" type="meta" style={PREVIEW_VALUE_STYLE}>
                        {accountLink}
                    </Text>
                </div>

                <Text as="p" type="meta" style={NOTE_STYLE}>
                    Use letters, numbers, dots, or underscores. Orbit handles
                    must be unique.
                </Text>

                {error ? (
                    <Text as="p" type="meta" style={ERROR_STYLE}>
                        {error}
                    </Text>
                ) : null}

                <div style={ACTION_ROW_STYLE}>
                    <PillButton type="submit" disabled={isSaving}>
                        {isSaving ? "Updating…" : "Update handle"}
                    </PillButton>
                </div>
            </form>
        </section>
    );
}