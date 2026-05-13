// app/account/profile/internal/ProfileThemePanel.tsx

"use client";

/* ==========================================================
   OUTFLO — PROFILE THEME PANEL
   File: app/account/profile/internal/ProfileThemePanel.tsx
   Scope: Theme and display controls rendered inside ProfileCard
   Last Updated:
   - ms: 1778611632761
   - iso: 2026-05-12T18:47:12.761Z
   - note: persist theme text scale and glow preferences on selection
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import { useRef, useState } from "react";

import { emitDisplayPreferences } from "@/lib/app-state/display-preferences";
import type { GlowPreference } from "@/lib/app-state/glow-preference";
import { isGlowPreference } from "@/lib/app-state/glow-preference";
import type { TextScale } from "@/lib/app-state/text-scale";
import { isTextScale } from "@/lib/app-state/text-scale";
import type { ThemePreference } from "@/lib/app-state/theme-preference";
import { isThemePreference } from "@/lib/app-state/theme-preference";
import { emitThemePreference } from "@/components/system/shell/app/AppTheme";

import { saveProfileDisplayPreferences } from "./display/profile-display.client";
import { saveProfileThemePreference } from "./theme/profile-theme.client";

/* ------------------------------
   Types
-------------------------------- */
type ThemeName = ThemePreference;
type SaveStatus = "idle" | "saving" | "error";

type ThemeOption = {
  key: ThemeName;
  title: string;
  meta: string;
};

type TextScaleOption = {
  key: TextScale;
  title: string;
};

type GlowOption = {
  key: GlowPreference;
  title: string;
};

/* ------------------------------
   Constants
-------------------------------- */
const THEMES: ThemeOption[] = [
  { key: "dark", title: "Dark", meta: "Deep system surface" },
  { key: "light", title: "Light", meta: "Clean daylight surface" },
  { key: "dawn", title: "Dawn", meta: "Soft morning palette" },
  { key: "day", title: "Day", meta: "Bright active palette" },
  { key: "dusk", title: "Dusk", meta: "Warm evening palette" },
  { key: "night", title: "Night", meta: "Low-light orbit palette" },
  { key: "funky", title: "Funky", meta: "High personality mode" },
];

const TEXT_SCALES: TextScaleOption[] = [
  { key: "compact", title: "Compact" },
  { key: "standard", title: "Standard" },
  { key: "large", title: "Large" },
];

const GLOW_OPTIONS: GlowOption[] = [
  { key: "matte", title: "Matte" },
  { key: "soft", title: "Soft" },
  { key: "full", title: "Full" },
];

const PANEL_STYLE: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 18,
  padding: "2px 2px 8px",
};

const GROUP_STYLE: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const GROUP_LABEL_STYLE: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--text-tertiary)",
  paddingLeft: 2,
};

const PREVIEW_CARD_STYLE: CSSProperties = {
  minHeight: 112,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: 16,
  border: "1px solid var(--border-soft)",
  borderRadius: 22,
  background: "var(--surface-muted)",
  boxShadow: "var(--glow-surface)",
  padding: 16,
};

const PREVIEW_TOP_STYLE: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 14,
};

const PREVIEW_TEXT_STYLE: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 3,
  minWidth: 0,
};

const PREVIEW_TITLE_STYLE: CSSProperties = {
  fontSize: "var(--text-md)",
  fontWeight: 700,
  color: "var(--text-primary)",
};

const PREVIEW_META_STYLE: CSSProperties = {
  fontSize: "var(--text-xs)",
  color: "var(--text-tertiary)",
};

const PREVIEW_ORB_STYLE: CSSProperties = {
  width: 44,
  height: 44,
  borderRadius: 999,
  border: "1px solid var(--border-soft)",
  background: "var(--surface-soft)",
  boxShadow: "var(--glow-surface)",
  flexShrink: 0,
};

const PREVIEW_LINES_STYLE: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const PREVIEW_LINE_STYLE: CSSProperties = {
  height: 8,
  borderRadius: 999,
  background: "var(--surface-soft)",
};

const PREVIEW_SHORT_LINE_STYLE: CSSProperties = {
  ...PREVIEW_LINE_STYLE,
  width: "52%",
};

const PREVIEW_LONG_LINE_STYLE: CSSProperties = {
  ...PREVIEW_LINE_STYLE,
  width: "82%",
};

const SWATCH_GRID_STYLE: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 10,
};

const SWATCH_BUTTON_STYLE: CSSProperties = {
  minHeight: 58,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  border: "1px solid var(--border-soft)",
  borderRadius: 18,
  background: "var(--surface-muted)",
  color: "var(--text-primary)",
  padding: "0 12px",
  cursor: "pointer",
  textAlign: "left",
};

const SWATCH_BUTTON_ACTIVE_STYLE: CSSProperties = {
  ...SWATCH_BUTTON_STYLE,
  background: "var(--surface-soft)",
  boxShadow: "var(--glow-surface)",
};

const SWATCH_TEXT_STYLE: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  minWidth: 0,
};

const SWATCH_TITLE_STYLE: CSSProperties = {
  fontSize: "var(--text-sm)",
  fontWeight: 700,
  color: "var(--text-primary)",
};

const SWATCH_META_STYLE: CSSProperties = {
  fontSize: "var(--text-xs)",
  color: "var(--text-tertiary)",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const SWATCH_DOT_STYLE: CSSProperties = {
  width: 22,
  height: 22,
  borderRadius: 999,
  border: "1px solid var(--border-soft)",
  background: "var(--surface-soft)",
  boxShadow: "var(--glow-surface)",
  flexShrink: 0,
};

const STATUS_STYLE: CSSProperties = {
  fontSize: "var(--text-xs)",
  color: "var(--text-tertiary)",
  paddingLeft: 2,
};

const SEGMENT_GROUP_STYLE: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 6,
  border: "1px solid var(--border-soft)",
  borderRadius: 20,
  background: "var(--surface-muted)",
  padding: 6,
};

const SEGMENT_STYLE: CSSProperties = {
  minHeight: 42,
  border: 0,
  borderRadius: 15,
  background: "transparent",
  color: "var(--text-tertiary)",
  fontSize: "var(--text-sm)",
  fontWeight: 700,
  cursor: "pointer",
};

const SEGMENT_ACTIVE_STYLE: CSSProperties = {
  ...SEGMENT_STYLE,
  background: "var(--surface-soft)",
  color: "var(--text-primary)",
  boxShadow: "var(--glow-surface)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileThemePanel() {
  const themeSaveSequenceRef = useRef(0);
  const displaySaveSequenceRef = useRef(0);

  const [activeTheme, setActiveTheme] = useState<ThemeName>(() => {
    if (typeof document === "undefined") {
      return "dark";
    }

    const theme = document.documentElement.dataset.theme || "dark";

    return isThemePreference(theme) ? theme : "dark";
  });

  const [activeScale, setActiveScale] = useState<TextScale>(() => {
    if (typeof document === "undefined") {
      return "compact";
    }

    const scale = document.documentElement.dataset.textScale || "compact";

    return isTextScale(scale) ? scale : "compact";
  });

  const [activeGlowPreference, setActiveGlowPreference] =
    useState<GlowPreference>(() => {
      if (typeof document === "undefined") {
        return "soft";
      }

      const glow = document.documentElement.dataset.glow || "soft";

      return isGlowPreference(glow) ? glow : "soft";
    });

  const [themeSaveStatus, setThemeSaveStatus] = useState<SaveStatus>("idle");
  const [displaySaveStatus, setDisplaySaveStatus] =
    useState<SaveStatus>("idle");

  const currentTheme =
    THEMES.find((theme) => theme.key === activeTheme) ?? THEMES[0];

  async function handleThemeChange(theme: ThemeName) {
    if (theme === activeTheme && themeSaveStatus !== "error") return;

    const saveSequence = themeSaveSequenceRef.current + 1;
    themeSaveSequenceRef.current = saveSequence;

    setActiveTheme(theme);
    setThemeSaveStatus("saving");
    emitThemePreference(theme);

    const result = await saveProfileThemePreference(theme);

    if (themeSaveSequenceRef.current !== saveSequence) return;

    if (!result.ok) {
      setThemeSaveStatus("error");
      return;
    }

    setThemeSaveStatus("idle");
  }

  async function handleDisplayPreferenceChange(
    nextScale: TextScale,
    nextGlowPreference: GlowPreference
  ) {
    if (
      nextScale === activeScale &&
      nextGlowPreference === activeGlowPreference &&
      displaySaveStatus !== "error"
    ) {
      return;
    }

    const saveSequence = displaySaveSequenceRef.current + 1;
    displaySaveSequenceRef.current = saveSequence;

    const previousScale = activeScale;
    const previousGlowPreference = activeGlowPreference;

    setActiveScale(nextScale);
    setActiveGlowPreference(nextGlowPreference);
    setDisplaySaveStatus("saving");

    emitDisplayPreferences({
      textScale: nextScale,
      glowPreference: nextGlowPreference,
    });

    const result = await saveProfileDisplayPreferences({
      textScale: nextScale,
      glowPreference: nextGlowPreference,
    });

    if (displaySaveSequenceRef.current !== saveSequence) return;

    if (!result.ok) {
      setActiveScale(previousScale);
      setActiveGlowPreference(previousGlowPreference);
      setDisplaySaveStatus("error");

      emitDisplayPreferences({
        textScale: previousScale,
        glowPreference: previousGlowPreference,
      });

      return;
    }

    setDisplaySaveStatus("idle");
  }

  function handleTextScaleChange(scale: TextScale) {
    void handleDisplayPreferenceChange(scale, activeGlowPreference);
  }

  function handleGlowPreferenceChange(glowPreference: GlowPreference) {
    void handleDisplayPreferenceChange(activeScale, glowPreference);
  }

  return (
    <div style={PANEL_STYLE}>
      <section style={GROUP_STYLE}>
        <div style={GROUP_LABEL_STYLE}>Preview</div>

        <div style={PREVIEW_CARD_STYLE}>
          <div style={PREVIEW_TOP_STYLE}>
            <div style={PREVIEW_TEXT_STYLE}>
              <div style={PREVIEW_TITLE_STYLE}>{currentTheme.title}</div>
              <div style={PREVIEW_META_STYLE}>{currentTheme.meta}</div>
            </div>

            <div style={PREVIEW_ORB_STYLE} />
          </div>

          <div style={PREVIEW_LINES_STYLE}>
            <div style={PREVIEW_LONG_LINE_STYLE} />
            <div style={PREVIEW_SHORT_LINE_STYLE} />
          </div>
        </div>
      </section>

      <section style={GROUP_STYLE}>
        <div style={GROUP_LABEL_STYLE}>Theme</div>

        <div style={SWATCH_GRID_STYLE}>
          {THEMES.map((theme) => {
            const active = theme.key === activeTheme;

            return (
              <button
                key={theme.key}
                type="button"
                aria-pressed={active}
                onClick={() => handleThemeChange(theme.key)}
                style={
                  active ? SWATCH_BUTTON_ACTIVE_STYLE : SWATCH_BUTTON_STYLE
                }
              >
                <div style={SWATCH_TEXT_STYLE}>
                  <div style={SWATCH_TITLE_STYLE}>{theme.title}</div>
                  <div style={SWATCH_META_STYLE}>{theme.meta}</div>
                </div>

                <div style={SWATCH_DOT_STYLE} />
              </button>
            );
          })}
        </div>

        <div style={STATUS_STYLE}>
          {themeSaveStatus === "saving"
            ? "Saving theme"
            : themeSaveStatus === "error"
              ? "Theme preview is active. Tap again to retry save."
              : "Theme saves on selection"}
        </div>
      </section>

      <section style={GROUP_STYLE}>
        <div style={GROUP_LABEL_STYLE}>Text Scale</div>

        <div style={SEGMENT_GROUP_STYLE}>
          {TEXT_SCALES.map((scale) => {
            const active = scale.key === activeScale;

            return (
              <button
                key={scale.key}
                type="button"
                aria-pressed={active}
                onClick={() => handleTextScaleChange(scale.key)}
                style={active ? SEGMENT_ACTIVE_STYLE : SEGMENT_STYLE}
              >
                {scale.title}
              </button>
            );
          })}
        </div>
      </section>

      <section style={GROUP_STYLE}>
        <div style={GROUP_LABEL_STYLE}>Glow</div>

        <div style={SEGMENT_GROUP_STYLE}>
          {GLOW_OPTIONS.map((glow) => {
            const active = glow.key === activeGlowPreference;

            return (
              <button
                key={glow.key}
                type="button"
                aria-pressed={active}
                onClick={() => handleGlowPreferenceChange(glow.key)}
                style={active ? SEGMENT_ACTIVE_STYLE : SEGMENT_STYLE}
              >
                {glow.title}
              </button>
            );
          })}
        </div>

        <div style={STATUS_STYLE}>
          {displaySaveStatus === "saving"
            ? "Saving display"
            : displaySaveStatus === "error"
              ? "Display preview is active. Tap again to retry save."
              : "Display saves on selection"}
        </div>
      </section>
    </div>
  );
}