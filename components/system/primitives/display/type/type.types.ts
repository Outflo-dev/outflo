/* ==========================================================
   OUTFLO — TYPE TYPES
   File: components/system/primitives/display/type/type.types.ts
   Scope: Define typography primitive contract and supported text roles
   Last Updated:
   - ms: 1777217175814
   - iso: 2026-04-26T15:26:15.814Z
   - note: add typography primitive with centralized type config for profile extraction
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ElementType } from "react";

/* ------------------------------
   Types
-------------------------------- */
export type TextType =
  | "display"
  | "label"
  | "meta"
  | "pill"
  | "numeric"
  | "clock";


export type TextElement =
  | "h1"
  | "h2"
  | "h3"
  | "p"
  | "span"
  | "div";

export type TextProps<T extends ElementType = TextElement> = {
  as?: T;
  type: TextType;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};