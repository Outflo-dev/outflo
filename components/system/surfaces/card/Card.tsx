"use client";

/* ==========================================================
   OUTFLO — CARD
   File: components/system/surfaces/card/Card.tsx
   Scope: Canonical card surface boundary for contained system content
   Last Updated:
   - ms: 1777251655
   - iso: 2026-04-26T21:00:55.000Z
   - note: rewrite card as token-only system surface primitive
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

/* ------------------------------
   Types
-------------------------------- */
type CardProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
};

type CardComponent = <T extends ElementType = "div">(
  props: CardProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof CardProps<T>>
) => React.ReactElement | null;

/* ------------------------------
   Constants
-------------------------------- */
const CARD_STYLE = {
  width: "100%",
  boxSizing: "border-box",
  borderRadius: "var(--card-radius)",
  border: "1px solid var(--card-border)",
  background: "var(--card-bg)",
  padding: "var(--card-padding)",
} as const;

/* ------------------------------
   Component
-------------------------------- */
const Card: CardComponent = ({
  as,
  children,
  className,
  ...rest
}) => {
  const Component = as ?? "div";

  return (
    <Component
      className={className}
      style={CARD_STYLE}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Card;