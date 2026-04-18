/* ==========================================================
   OUTFLO — PILL BUTTON FRAME
   ========================================================== */

import type { CSSProperties, ReactNode } from "react";
import ButtonBase from "../../base/ButtonBase";

type Variant = "default" | "signOut";

type Props = {
  children: ReactNode;
  variant?: Variant;
  style?: CSSProperties;
};

const BASE: CSSProperties = {
  minHeight: 40,
  padding: "0 16px",
  borderRadius: 999,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 1,
};

const VARIANTS: Record<Variant, CSSProperties> = {
  default: {
    background: "rgba(255,255,255,0.08)",
    color: "var(--text-primary)",
  },
  signOut: {
    background: "rgba(255,255,255,0.04)",
    color: "rgba(255,255,255,0.6)",
  },
};

export default function PillButtonFrame({
  children,
  variant = "default",
  style,
}: Props) {
  return (
    <ButtonBase
      style={{
        ...BASE,
        ...VARIANTS[variant],
        ...style,
      }}
    >
      {children}
    </ButtonBase>
  );
}