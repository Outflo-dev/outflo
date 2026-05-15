"use client";

/* ==========================================================
   OUTFLO — AVATAR PRIMITIVE
   File: components/system/primitives/display/avatar/Avatar.tsx
   Scope: Canonical avatar display primitive (image + gradient fallback with size variants)
   Last Updated:
   - ms: 1777481701125
   - iso: 2026-04-29T16:55:01.125Z
   - note: add size variants while preserving default (88px)
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import { getAvatarCharacter, getAvatarGradient } from "./AvatarGradient";

/* ------------------------------
   Types
-------------------------------- */
type AvatarSize = "sm" | "md" | "lg";

type AvatarProps = {
  value: string;
  src?: string | null;
  alt?: string;
  size?: AvatarSize;
  style?: CSSProperties;
};

/* ------------------------------
   Constants
-------------------------------- */
const AVATAR_SIZE: Record<AvatarSize, number> = {
  sm: 34,
  md: 56,
  lg: 99,
};

/* ------------------------------
   Component
-------------------------------- */
export default function Avatar({
  value,
  src,
  alt,
  size = "lg",
  style,
}: AvatarProps) {
  const avatarSize = AVATAR_SIZE[size];

  const char = getAvatarCharacter(value);
  const gradient = getAvatarGradient(char);

  return (
    <div
      aria-hidden="true"
      style={{
        width: avatarSize,
        height: avatarSize,
        borderRadius: "50%",
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
        background: gradient.background,
        color: gradient.color,
        fontFamily: "var(--font-family-base)",
        fontWeight: 600,
        fontSize: Math.round(avatarSize * 0.42),
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