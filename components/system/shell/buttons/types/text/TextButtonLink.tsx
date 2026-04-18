/* ==========================================================
   OUTFLO — TEXT BUTTON LINK
   File: components/system/shell/buttons/types/text/TextButtonLink.tsx
   Scope: Canonical navigational text button on the text-button stem
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import TextButtonFrame from "./TextButtonFrame";

/* ------------------------------
   Types
-------------------------------- */
type TextButtonLinkProps = {
  href: string;
  children: ReactNode;
  ariaLabel?: string;
  title?: string;
  style?: CSSProperties;
  prefetch?: boolean;
};

/* ------------------------------
   Constants
-------------------------------- */
const LINK_RESET_STYLE: CSSProperties = {
  display: "inline-flex",
  textDecoration: "none",
};

/* ------------------------------
   Component
-------------------------------- */
export default function TextButtonLink({
  href,
  children,
  ariaLabel,
  title,
  style,
  prefetch,
}: TextButtonLinkProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      title={title}
      prefetch={prefetch}
      style={LINK_RESET_STYLE}
    >
      <TextButtonFrame style={style}>{children}</TextButtonFrame>
    </Link>
  );
}