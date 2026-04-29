"use client";

/* ==========================================================
   OUTFLO — PROFILE THEME PANEL
   File: app/account/profile/internal/ProfileThemePanel.tsx
   Scope: Theme content rendered inside BottomCard
   ========================================================== */

import { useEffect, useState } from "react";

/* ------------------------------
   Types
-------------------------------- */
type ThemeName = "dark" | "light" | "funky" | "dawn" | "day" | "dusk" | "night";
type TextScale = "compact" | "standard" | "large";

/* ------------------------------
   Constants
-------------------------------- */
const THEMES: ThemeName[] = ["dark", "light", "funky", "dawn", "day", "dusk", "night"];
const TEXT_SCALES: TextScale[] = ["compact", "standard", "large"];

/* ------------------------------
   Helpers
-------------------------------- */
function applyTheme(theme: ThemeName) {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem("outflo-theme", theme);
}

function applyTextScale(scale: TextScale) {
  document.documentElement.dataset.textScale = scale;
  window.localStorage.setItem("outflo-text-scale", scale);
}

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileControlsPanel() {
  const [activeTheme, setActiveTheme] = useState<ThemeName>("dark");
  const [activeScale, setActiveScale] = useState<TextScale>("compact");

  useEffect(() => {
    const theme =
      document.documentElement.dataset.theme ||
      window.localStorage.getItem("outflo-theme") ||
      "dark";

    const scale =
      document.documentElement.dataset.textScale ||
      window.localStorage.getItem("outflo-text-scale") ||
      "compact";

    if (THEMES.includes(theme as ThemeName)) setActiveTheme(theme as ThemeName);
    if (TEXT_SCALES.includes(scale as TextScale)) setActiveScale(scale as TextScale);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        style={{
          color: "var(--text-primary)",
          fontSize: "var(--text-md)",
          fontWeight: 600,
        }}
      >
        Theme
      </div>

      {THEMES.map((theme) => (
        <button
          key={theme}
          type="button"
          onClick={() => {
            applyTheme(theme);
            setActiveTheme(theme);
          }}
          style={{
            width: "100%",
            minHeight: 48,
            borderRadius: 16,
            border: "1px solid var(--border-soft)",
            background:
              theme === activeTheme
                ? "var(--surface-soft)"
                : "var(--surface-muted)",
            color: "var(--text-primary)",
            textAlign: "left",
            padding: "0 14px",
            cursor: "pointer",
          }}
        >
          {theme}
        </button>
      ))}

      <div
        style={{
          color: "var(--text-primary)",
          fontSize: "var(--text-md)",
          fontWeight: 600,
          marginTop: 10,
        }}
      >
        Text scale
      </div>

      {TEXT_SCALES.map((scale) => (
        <button
          key={scale}
          type="button"
          onClick={() => {
            applyTextScale(scale);
            setActiveScale(scale);
          }}
          style={{
            width: "100%",
            minHeight: 48,
            borderRadius: 16,
            border: "1px solid var(--border-soft)",
            background:
              scale === activeScale
                ? "var(--surface-soft)"
                : "var(--surface-muted)",
            color: "var(--text-primary)",
            textAlign: "left",
            padding: "0 14px",
            cursor: "pointer",
          }}
        >
          {scale}
        </button>
      ))}
    </div>
  );
}