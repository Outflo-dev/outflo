"use client";

/* ==========================================================
   OUTFLO — PROFILE THEME SAVE ACTION
   File: app/account/profile/internal/theme/ProfileThemeSaveAction.tsx
   Scope: Own explicit persistence action for profile theme preference
   Last Updated:
   - ms: 1778071498197
   - iso: 2026-05-06T12:44:58.197Z
   - note: isolate theme save action from theme preview panel
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useState } from "react";
import type { ThemePreference } from "@/lib/app-state/theme-preference";
import { saveProfileThemePreference } from "./profile-theme.client";

/* ------------------------------
   Types
-------------------------------- */
type SaveStatus = "idle" | "saving" | "error";

type ProfileThemeSaveActionProps = {
    draftTheme: ThemePreference;
    savedTheme: ThemePreference;
    saveStatus: SaveStatus;
    setSaveStatus: (status: SaveStatus) => void;
    onSaved: (theme: ThemePreference) => void;
};

/* ------------------------------
   Constants
-------------------------------- */
const SAVE_ROW_STYLE: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
};

const SAVE_BUTTON_STYLE: React.CSSProperties = {
    minHeight: 42,
    border: "1px solid var(--border-soft)",
    borderRadius: 999,
    background: "var(--surface-soft)",
    color: "var(--text-primary)",
    padding: "0 16px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
};

const SAVE_BUTTON_DISABLED_STYLE: React.CSSProperties = {
    ...SAVE_BUTTON_STYLE,
    opacity: 0.42,
    cursor: "not-allowed",
};

const SAVE_STATUS_STYLE: React.CSSProperties = {
    fontSize: 12,
    color: "var(--text-tertiary)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileThemeSaveAction({
    draftTheme,
    savedTheme,
    saveStatus,
    setSaveStatus,
    onSaved,
}: ProfileThemeSaveActionProps) {
    const [saveError, setSaveError] = useState<string | null>(null);
    const dirty = draftTheme !== savedTheme;

    async function handleSaveTheme() {
        if (!dirty || saveStatus === "saving") return;

        setSaveStatus("saving");
        setSaveError(null);

        const result = await saveProfileThemePreference(draftTheme);

        if (!result.ok) {
            setSaveStatus("error");
            setSaveError(result.message);
            return;
        }

        onSaved(draftTheme);
        setSaveStatus("idle");
    }

    return (
        <section>
            <div style={SAVE_ROW_STYLE}>
                <div style={SAVE_STATUS_STYLE}>
                    {saveStatus === "error"
                        ? saveError ?? "Save failed. Preview is still active."
                        : dirty
                            ? "Unsaved theme preview"
                            : "Theme saved"}
                </div>

                <button
                    type="button"
                    disabled={!dirty || saveStatus === "saving"}
                    onClick={handleSaveTheme}
                    style={
                        !dirty || saveStatus === "saving"
                            ? SAVE_BUTTON_DISABLED_STYLE
                            : SAVE_BUTTON_STYLE
                    }
                >
                    {saveStatus === "saving" ? "Saving" : "Save"}
                </button>
            </div>
        </section>
    );
}
