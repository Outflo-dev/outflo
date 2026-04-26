"use client";

/* ==========================================================
   OUTFLO — TEXT PRIMITIVE
   File: components/system/primitives/display/type/Text.tsx
   Scope: Render text through centralized typography role configuration
   Last Updated:
   - ms: 1777217175814
   - iso: 2026-04-26T15:26:15.814Z
   - note: add typography primitive with centralized type config for profile extraction
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { TYPE_STYLES } from "./type.config";
import type { TextProps } from "./type.types";

/* ------------------------------
   Component
-------------------------------- */
export default function Text({
  as: Component = "span",
  type,
  children,
  className,
  style,
}: TextProps) {
  return (
    <Component
      className={className}
      style={{
        margin: 0,
        ...TYPE_STYLES[type],
        ...style,
      }}
    >
      {children}
    </Component>
  );
}