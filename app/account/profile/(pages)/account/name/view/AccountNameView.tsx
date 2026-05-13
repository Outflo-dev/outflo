"use client";

/* ==========================================================
   OUTFLO — ACCOUNT NAME VIEW
   File: app/account/profile/(pages)/account/name/view/AccountNameView.tsx
   Scope: Render account name drilldown form
   Last Updated:
   - ms: 1778701972789
   - iso: 2026-05-13T19:52:52.789Z
   - note: compose name-owned header and account name edit form
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, FormEvent } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import PillButton from "@/components/system/shell/buttons/types/pill/PillButton";
import AccountNameHeader from "../header/AccountNameHeader";

/* ------------------------------
   Types
-------------------------------- */
type AccountNameViewProps = {
    firstName: string;
    lastName: string;
    error: string | null;
    isSaving: boolean;
    onBack: () => void;
    onFirstNameChange: (value: string) => void;
    onLastNameChange: (value: string) => void;
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

const FIELD_STACK_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 14,
};

const FIELD_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 8,
};

const LABEL_STYLE: CSSProperties = {
    color: "var(--text-secondary)",
};

const INPUT_STYLE: CSSProperties = {
    width: "100%",
    minHeight: 52,
    boxSizing: "border-box",
    border: "1px solid var(--border-soft)",
    borderRadius: 18,
    background: "var(--surface-muted)",
    color: "var(--text-primary)",
    padding: "0 16px",
    font: "inherit",
    outline: "none",
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
export default function AccountNameView({
    firstName,
    lastName,
    error,
    isSaving,
    onBack,
    onFirstNameChange,
    onLastNameChange,
    onSubmit,
}: AccountNameViewProps) {
    return (
        <section style={SURFACE_STYLE}>
            <AccountNameHeader onBack={onBack} />

            <form style={FORM_STYLE} onSubmit={onSubmit}>
                <div style={FIELD_STACK_STYLE}>
                    <label style={FIELD_STYLE}>
                        <Text as="span" type="label" style={LABEL_STYLE}>
                            First name
                        </Text>

                        <input
                            value={firstName}
                            onChange={(event) => onFirstNameChange(event.target.value)}
                            autoComplete="given-name"
                            style={INPUT_STYLE}
                        />
                    </label>

                    <label style={FIELD_STYLE}>
                        <Text as="span" type="label" style={LABEL_STYLE}>
                            Last name
                        </Text>

                        <input
                            value={lastName}
                            onChange={(event) => onLastNameChange(event.target.value)}
                            autoComplete="family-name"
                            style={INPUT_STYLE}
                        />
                    </label>
                </div>

                <Text as="p" type="meta" style={NOTE_STYLE}>
                    You can leave this blank. Username remains the required account handle.
                </Text>

                {error ? (
                    <Text as="p" type="meta" style={ERROR_STYLE}>
                        {error}
                    </Text>
                ) : null}

                <div style={ACTION_ROW_STYLE}>
                    <PillButton type="submit" disabled={isSaving}>
                        {isSaving ? "Updating…" : "Update name"}
                    </PillButton>
                </div>
            </form>
        </section>
    );
}