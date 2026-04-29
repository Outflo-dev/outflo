/* ==========================================================
   OUTFLO — COLORS CONFIG
   File: components/system/primitives/colors/colors.config.ts
   Scope: Semantic color mapping layer over global CSS tokens
   Last Updated:
   - ms: 1777409000000
   - iso: 2026-04-28T16:43:20.000Z
   - note: rename color primitive to colors and align semantic export naming
   ========================================================== */

/* ------------------------------
   Colors
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
    subtle: "var(--border-subtle)",
    soft: "var(--border-soft)",
    row: "var(--border-row)",
  },

  accent: {
    danger: {
      surface: "var(--danger-surface)",
      text: "var(--danger-text)",
      border: "var(--danger-border)",
    },
  },
} as const;