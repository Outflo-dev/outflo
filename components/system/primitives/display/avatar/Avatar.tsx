"use client";

/* ==========================================================
   OUTFLO — AVATAR PRIMITIVE
   File: components/system/primitives/display/avatar/Avatar.tsx
   Scope: Canonical avatar display primitive (fixed size, image + gradient fallback)
   Last Updated:
   - ms: 1776829285772
   - iso: 2026-04-22T03:41:25.772Z
   - note: lock avatar to single canonical size (88px) and own full display logic
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import { getAvatarCharacter, getAvatarGradient } from "./AvatarGradient";

/* ------------------------------
   Types
-------------------------------- */
type AvatarProps = {
  value: string;
  src?: string | null;
  alt?: string;
  style?: CSSProperties;
};

/* ------------------------------
   Constants
-------------------------------- */
const AVATAR_SIZE = 88;

/* ------------------------------
   Component
-------------------------------- */
export default function Avatar({
  value,
  src,
  alt,
  style,
}: AvatarProps) {
  const char = getAvatarCharacter(value);
  const gradient = getAvatarGradient(char);

  return (
    <div
      aria-hidden="true"
      style={{
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: "50%",
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
        background: gradient.background,
        color: gradient.color,
        fontFamily: "var(--font-family-base)",
        fontWeight: 600,
        fontSize: Math.round(AVATAR_SIZE * 0.42),
        lineHeight: 1,
        userSelect: "none",
        ...style,
      }}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? value}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        char
      )}
    </div>
  );
}