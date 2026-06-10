"use client";

/* ==========================================================
   OUTFLO — ICON BUTTON FRAME
   File: components/system/shell/buttons/types/icon/IconButtonFrame.tsx
   Scope: Own reusable icon button visual frame with role-based sizing
   Last Updated:
   - ms: 1780958934391
   - iso: 2026-06-08T22:48:54.391Z
   - note: replace raw icon button sizing with system-owned size and tone roles
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

import ButtonShell from "@/components/system/shell/buttons/base/ButtonBase";
import { GlassShell } from "@/components/system/shell/glass";

/* ------------------------------
   Types
-------------------------------- */
export type IconButtonFrameSize = "sm" | "md" | "lg";

export type IconButtonFrameTone = "plain" | "glass";

type IconButtonFrameProps = {
  children: ReactNode;
  size?: IconButtonFrameSize;
  tone?: IconButtonFrameTone;
  flexShrink?: number;
  style?: CSSProperties;
};

/* ------------------------------
   Constants
-------------------------------- */
const SIZE_STYLES: Record<IconButtonFrameSize, CSSProperties> = {
  sm: {
    width: "var(--icon-button-size-sm, 36px)",
    height: "var(--icon-button-size-sm, 36px)",
  },
  md: {
    width: "var(--icon-button-size-md, 40px)",
    height: "var(--icon-button-size-md, 40px)",
  },
  lg: {
    width: "var(--icon-button-size-lg, 44px)",
    height: "var(--icon-button-size-lg, 44px)",
  },
};

/* ------------------------------
   Component
-------------------------------- */
export default function IconButtonFrame({
  children,
  size = "md",
  tone = "plain",
  flexShrink = 0,
  style,
}: IconButtonFrameProps) {
  const sizeStyle = SIZE_STYLES[size];

  if (tone === "glass") {
    return (
      <GlassShell
        tone="soft"
        shape="pill"
        padding="none"
        style={{
          ...sizeStyle,
          flexShrink,
          ...style,
        }}
      >
        <ButtonShell
          width="100%"
          height="100%"
          borderRadius={999}
          background="transparent"
          color="currentColor"
        >
          {children}
        </ButtonShell>
      </GlassShell>
    );
  }

  return (
    <ButtonShell
      width={sizeStyle.width}
      height={sizeStyle.height}
      borderRadius={999}
      background="transparent"
      color="currentColor"
      border="none"
      flexShrink={flexShrink}
      style={style}
    >
      {children}
    </ButtonShell>
  );
}