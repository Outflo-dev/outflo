"use client";

import type { ReactNode, CSSProperties } from "react";
import IconButtonShell from "@/components/system/shell/buttons/types/icon/IconButtonFrame";

type IconButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  size?: number;
  style?: CSSProperties;
};

export default function IconButton({
  children,
  onClick,
  ariaLabel,
  size = 40,
  style,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        all: "unset",
        cursor: "pointer",
        display: "inline-flex",
      }}
    >
      <IconButtonShell size={size} style={style}>
        {children}
      </IconButtonShell>
    </button>
  );
}