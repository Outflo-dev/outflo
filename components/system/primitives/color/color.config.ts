/* ==========================================================
   OUTFLO — COLOR CONFIG
   File: components/system/primitives/color/color.config.ts
   Scope: Semantic color mapping layer over global CSS tokens
   Last Updated:
   - ms: 1777217175814
   - iso: 2026-04-26T15:26:15.814Z
   - note: add semantic color mapping for system-wide usage
   ========================================================== */

/* ------------------------------
   COLOR (Semantic Mapping)
-------------------------------- */
export const COLOR = {
  text: {
    primary: "var(--text-primary)",
    secondary: "var(--text-secondary)",
    tertiary: "var(--text-tertiary)",
  },

  surface: {
    base: "var(--bg-primary)",
    soft: "var(--surface-soft)",
    muted: "var(--surface-muted)",
    icon: "var(--surface-icon)",
  },

  border: {
    soft: "var(--border-soft)",
    row: "var(--border-row)",
  },

  accent: {
    danger: {
      bg: "var(--danger-surface)",
      text: "var(--danger-text)",
      border: "var(--danger-border)",
    },
  },
} as const;