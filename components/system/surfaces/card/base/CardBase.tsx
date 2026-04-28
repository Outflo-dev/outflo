"use client";

/* ==========================================================
   OUTFLO — CARD BASE
   File: components/system/surfaces/card/base/CardBase.tsx
   Scope: Lowest reusable card-family container with no visual ownership
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

/* ------------------------------
   Types
-------------------------------- */
type CardBaseProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
};

type CardBaseComponent = <T extends ElementType = "div">(
  props: CardBaseProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof CardBaseProps<T>>
) => React.ReactElement | null;

/* ------------------------------
   Component
-------------------------------- */
const CardBase: CardBaseComponent = ({
  as,
  children,
  ...rest
}) => {
  const Component = as ?? "div";

  return <Component {...rest}>{children}</Component>;
};

export default CardBase;