/* ==========================================================
   OUTFLO — APP SHELL CONSTANTS
   File: components/system/shell/app/app-shell.constants.ts
   Scope: Single source of truth for app frame width and horizontal gutter
   Last Updated:
   - ms: 1776803564726
   - iso: 2026-04-21T20:32:44.726Z
   - note: centralize shell and frame sizing into one shared system lever
   ========================================================== */

export const APP_SHELL = {
  maxWidth: "min(100%, 600px)",
  gutterX: 12,
} as const;