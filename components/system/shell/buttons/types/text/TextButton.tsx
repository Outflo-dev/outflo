/* ==========================================================
   OUTFLO — TEXT BUTTON
   File: components/system/shell/buttons/types/text/TextButton.tsx
   Scope: Canonical interactive text button on the text-button stem
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";
import TextButtonFrame from "./TextButtonFrame";

/* ------------------------------
   Types
-------------------------------- */
type TextButtonProps = {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  title?: string;
  type?: "button" | "submit" | "reset";
  style?: CSSProperties;
};

/* ------------------------------
   Constants
-------------------------------- */
const BUTTON_RESET_STYLE: CSSProperties = {
  appearance: "none",
  background: "transparent",
  border: "none",
  padding: 0,
  margin: 0,
  cursor: "pointer",
};

/* ------------------------------
   Component
-------------------------------- */
export default function TextButton({
  children,
  onClick,
  disabled = false,
  ariaLabel,
  title,
  type = "button",
  style,
}: TextButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={title}
      style={BUTTON_RESET_STYLE}
    >
      <TextButtonFrame style={style}>{children}</TextButtonFrame>
    </button>
  );
}