/* ==========================================================
   OUTFLO — TYPE CONFIG
   File: components/system/primitives/display/type/type.config.ts
   Scope: Centralize typography form values for system text roles
   Last Updated:
   - ms: 1777217175814
   - iso: 2026-04-26T15:26:15.814Z
   - note: add typography primitive with centralized type config for profile extraction
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import type { TextType } from "./type.types";

/* ------------------------------
   Constants
-------------------------------- */
export const TYPE_STYLES: Record<TextType, CSSProperties> = {
  display: {
    fontFamily: "var(--font-family-base)",
    fontSize: 26,
    fontWeight: 700,
    lineHeight: 0.96,
    letterSpacing: -0.8,
  },

  label: {
    fontFamily: "var(--font-family-base)",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.2,
    letterSpacing: -0.1,
  },

  meta: {
    fontFamily: "var(--font-family-base)",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: -0.1,
  },

  pill: {
    fontFamily: "var(--font-family-base)",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: -0.2,
  },

  numeric: {
    fontFamily: "var(--font-family-mono)",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: 0,
  },

  clock: {
    fontFamily: "var(--font-family-mono)",
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: 0.8,
  },
};