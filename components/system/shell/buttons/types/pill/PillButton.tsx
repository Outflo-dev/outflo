/* ==========================================================
   OUTFLO — PILL BUTTON
   ========================================================== */

import type { CSSProperties, ReactNode } from "react";
import PillButtonFrame from "./PillButtonFrame";

type Variant = "default" | "signOut";

type Props = {
  children: ReactNode;
  onClick: () => void;
  variant?: Variant;
  disabled?: boolean;
  ariaLabel?: string;
  title?: string;
  type?: "button" | "submit" | "reset";
  style?: CSSProperties;
};

const RESET: CSSProperties = {
  appearance: "none",
  border: "none",
  padding: 0,
  margin: 0,
  background: "transparent",
  cursor: "pointer",
};

export default function PillButton({
  children,
  onClick,
  variant = "default",
  disabled = false,
  ariaLabel,
  title,
  type = "button",
  style,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={title}
      style={RESET}
    >
      <PillButtonFrame variant={variant} style={style}>
        {children}
      </PillButtonFrame>
    </button>
  );
}