/* ==========================================================
   OUTFLO — TEXT BUTTON FRAME
   File: components/system/shell/buttons/types/text/TextButtonFrame.tsx
   Scope: Structural text-button shell with no interaction ownership
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";
import ButtonBase from "../../base/ButtonBase";

/* ------------------------------
   Types
-------------------------------- */
type TextButtonFrameProps = {
  children: ReactNode;
  style?: CSSProperties;
};

/* ------------------------------
   Constants
-------------------------------- */
const FRAME_STYLE: CSSProperties = {
  minHeight: 40,
  padding: "0 14px",
  borderRadius: 999,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  color: "var(--text-primary, #FFFEFA)",
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 1,
  textDecoration: "none",
  whiteSpace: "nowrap",
};

/* ------------------------------
   Component
-------------------------------- */
export default function TextButtonFrame({
  children,
  style,
}: TextButtonFrameProps) {
  return (
    <ButtonBase
      style={{
        ...FRAME_STYLE,
        ...style,
      }}
    >
      {children}
    </ButtonBase>
  );
}