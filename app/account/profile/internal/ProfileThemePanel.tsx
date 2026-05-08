// app/account/profile/internal/ProfileThemePanel.tsx

"use client";

/* ==========================================================
   OUTFLO — PROFILE THEME PANEL
   File: app/account/profile/internal/ProfileThemePanel.tsx
   Scope: Theme controls rendered inside ProfileCard
   Last Updated:
   - ms: 1778071498197
   - iso: 2026-05-06T12:44:58.197Z
   - note: persist theme immediately on selection
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useEffect, useRef, useState } from "react";
import type { ThemePreference } from "@/lib/app-state/theme-preference";
import { isThemePreference } from "@/lib/app-state/theme-preference";
import { emitThemePreference } from "@/components/system/shell/app/AppTheme";
import { saveProfileThemePreference } from "./theme/profile-theme.client";

/* ------------------------------
   Types
-------------------------------- */
type ThemeName = ThemePreference;
type TextScale = "small" | "standard" | "large";
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
  { key: "small", title: "Small" },
  { key: "standard", title: "Standard" },
  { key: "large", title: "Large" },
];

const PANEL_STYLE: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 18,
  padding: "2px 2px 8px",
};

const GROUP_STYLE: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const GROUP_LABEL_STYLE: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--text-tertiary)",
  paddingLeft: 2,
};

const PREVIEW_CARD_STYLE: React.CSSProperties = {
  minHeight: 112,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: 16,
  border: "1px solid var(--border-soft)",
  borderRadius: 22,
  background: "var(--surface-muted)",
  padding: 16,
};

const PREVIEW_TOP_STYLE: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 14,
};

const PREVIEW_TEXT_STYLE: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 3,
  minWidth: 0,
};

const PREVIEW_TITLE_STYLE: React.CSSProperties = {
  fontSize: 17,
  fontWeight: 700,
  color: "var(--text-primary)",
};

const PREVIEW_META_STYLE: React.CSSProperties = {
  fontSize: 12,
  color: "var(--text-tertiary)",
};

const PREVIEW_ORB_STYLE: React.CSSProperties = {
  width: 44,
  height: 44,
  borderRadius: 999,
  border: "1px solid var(--border-soft)",
  background: "var(--surface-soft)",
  boxShadow: "0 0 32px var(--glow-primary)",
  flexShrink: 0,
};

const PREVIEW_LINES_STYLE: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const PREVIEW_LINE_STYLE: React.CSSProperties = {
  height: 8,
  borderRadius: 999,
  background: "var(--surface-soft)",
};

const PREVIEW_SHORT_LINE_STYLE: React.CSSProperties = {
  ...PREVIEW_LINE_STYLE,
  width: "52%",
};

const PREVIEW_LONG_LINE_STYLE: React.CSSProperties = {
  ...PREVIEW_LINE_STYLE,
  width: "82%",
};

const SWATCH_GRID_STYLE: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 10,
};

const SWATCH_BUTTON_STYLE: React.CSSProperties = {
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

const SWATCH_BUTTON_ACTIVE_STYLE: React.CSSProperties = {
  ...SWATCH_BUTTON_STYLE,
  background: "var(--surface-soft)",
};

const SWATCH_TEXT_STYLE: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  minWidth: 0,
};

const SWATCH_TITLE_STYLE: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  color: "var(--text-primary)",
};

const SWATCH_META_STYLE: React.CSSProperties = {
  fontSize: 11,
  color: "var(--text-tertiary)",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const SWATCH_DOT_STYLE: React.CSSProperties = {
  width: 22,
  height: 22,
  borderRadius: 999,
  border: "1px solid var(--border-soft)",
  background: "var(--surface-soft)",
  flexShrink: 0,
};

const STATUS_STYLE: React.CSSProperties = {
  fontSize: 12,
  color: "var(--text-tertiary)",
  paddingLeft: 2,
};

const SEGMENT_GROUP_STYLE: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 6,
  border: "1px solid var(--border-soft)",
  borderRadius: 20,
  background: "var(--surface-muted)",
  padding: 6,
};

const SEGMENT_STYLE: React.CSSProperties = {
  minHeight: 42,
  border: 0,
  borderRadius: 15,
  background: "transparent",
  color: "var(--text-tertiary)",
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
};

const SEGMENT_ACTIVE_STYLE: React.CSSProperties = {
  ...SEGMENT_STYLE,
  background: "var(--surface-soft)",
  color: "var(--text-primary)",
};

/* ------------------------------
   Helpers
-------------------------------- */
function applyTextScale(scale: TextScale) {
  document.documentElement.dataset.textScale = scale;
  window.localStorage.setItem("outflo-text-scale", scale);
}

function isTextScale(value: string): value is TextScale {
  return TEXT_SCALES.some((scale) => scale.key === value);
}

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileThemePanel() {
  const saveSequenceRef = useRef(0);

  const [activeTheme, setActiveTheme] = useState<ThemeName>("dark");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [activeScale, setActiveScale] = useState<TextScale>("standard");

  const currentTheme =
    THEMES.find((theme) => theme.key === activeTheme) ?? THEMES[0];

  useEffect(() => {
    const theme = document.documentElement.dataset.theme || "dark";

    const scale =
      document.documentElement.dataset.textScale ||
      window.localStorage.getItem("outflo-text-scale") ||
      "standard";

    if (isThemePreference(theme)) {
      setActiveTheme(theme);
    }

    if (isTextScale(scale)) {
      setActiveScale(scale);
    }
  }, []);

  async function handleThemeChange(theme: ThemeName) {
    if (theme === activeTheme && saveStatus !== "error") return;

    const saveSequence = saveSequenceRef.current + 1;
    saveSequenceRef.current = saveSequence;

    setActiveTheme(theme);
    setSaveStatus("saving");
    emitThemePreference(theme);

    const result = await saveProfileThemePreference(theme);

    if (saveSequenceRef.current !== saveSequence) return;

    if (!result.ok) {
      setSaveStatus("error");
      return;
    }

    setSaveStatus("idle");
  }

  function handleTextScaleChange(scale: TextScale) {
    applyTextScale(scale);
    setActiveScale(scale);
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
          {saveStatus === "saving"
            ? "Saving theme"
            : saveStatus === "error"
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
    </div>
  );
}