"use client";

/* ==========================================================
   OUTFLO — CARD SURFACE (v1)
   File: components/system/surfaces/card/Card.tsx
   Scope: Canonical reusable surface shell for contained content

   Last Updated:
   - ms: 1775965829511
   - iso: 2026-04-12T03:50:29.511Z
   - note: initial system card shell for reusable contained surfaces
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ElementType, ReactNode } from "react";

/* ------------------------------
   Types
-------------------------------- */
type CardProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
};

type CardComponent = <T extends ElementType = "div">(
  props: CardProps<T> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof CardProps<T>>
) => React.ReactElement | null;

/* ------------------------------
   Constants
-------------------------------- */
const CARD_STYLE: CSSProperties = {
  width: "100%",
  borderRadius: 20,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "#000000",
  padding: 20,
  boxSizing: "border-box",
};

/* ------------------------------
   Component
-------------------------------- */
const Card: CardComponent = ({
  as,
  children,
  style,
  className,
  ...rest
}) => {
  const Component = as ?? "div";

  return (
    <Component
      className={className}
      style={{
        ...CARD_STYLE,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Card;