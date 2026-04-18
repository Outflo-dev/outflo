/* ==========================================================
   OUTFLO — PILL BUTTON LINK
   ========================================================== */

import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import PillButtonFrame from "./PillButtonFrame";

type Variant = "default" | "signOut";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  ariaLabel?: string;
  title?: string;
  style?: CSSProperties;
  prefetch?: boolean;
};

const RESET: CSSProperties = {
  textDecoration: "none",
  display: "inline-flex",
};

export default function PillButtonLink({
  href,
  children,
  variant = "default",
  ariaLabel,
  title,
  style,
  prefetch,
}: Props) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      title={title}
      prefetch={prefetch}
      style={RESET}
    >
      <PillButtonFrame variant={variant} style={style}>
        {children}
      </PillButtonFrame>
    </Link>
  );
}