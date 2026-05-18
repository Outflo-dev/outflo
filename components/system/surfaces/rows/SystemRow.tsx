"use client";

/* ==========================================================
   OUTFLO — SYSTEM ROW
   File: components/system/surfaces/rows/SystemRow.tsx
   Scope: Render reusable row grammar with mark, text stack, and right affordance
   Last Updated:
   - ms: 1779058286512
   - iso: 2026-05-17T22:51:26.512Z
   - note: extract shared account/profile row grammar into system surface
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";

import Text from "@/components/system/primitives/display/type/Text";

/* ------------------------------
   Types
-------------------------------- */
type SystemRowProps = {
    href?: string;
    mark: ReactNode;
    label: ReactNode;
    value?: ReactNode;
    right?: ReactNode;
    style?: CSSProperties;
};

/* ------------------------------
   Constants
-------------------------------- */
const ROW_STYLE: CSSProperties = {
    minHeight: "var(--system-row-min-height)",
    display: "grid",
    gridTemplateColumns: "var(--system-row-mark-column) 1fr auto",
    alignItems: "center",
    columnGap: "var(--system-row-column-gap)",
    textDecoration: "none",
    color: "inherit",
};

const MARK_SLOT_STYLE: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
};

const TEXT_STACK_STYLE: CSSProperties = {
    minWidth: 0,
    display: "grid",
    rowGap: "var(--system-row-text-gap)",
};

const LABEL_STYLE: CSSProperties = {
    color: "var(--text-primary)",
};

const VALUE_STYLE: CSSProperties = {
    color: "var(--text-secondary)",
    overflowWrap: "anywhere",
};

const RIGHT_STYLE: CSSProperties = {
    maxWidth: "var(--system-row-right-max-width)",
    textAlign: "right",
    color: "var(--text-secondary)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function SystemRow({
    href,
    mark,
    label,
    value,
    right,
    style,
}: SystemRowProps) {
    const content = (
        <>
            <div style={MARK_SLOT_STYLE}>
                {mark}
            </div>

            <div style={TEXT_STACK_STYLE}>
                <Text as="h3" type="label" style={LABEL_STYLE}>
                    {label}
                </Text>

                {value ? (
                    typeof value === "string" ? (
                        <Text as="p" type="meta" style={VALUE_STYLE}>
                            {value}
                        </Text>
                    ) : (
                        value
                    )
                ) : null}
            </div>

            {right ? (
                <div style={RIGHT_STYLE}>
                    {typeof right === "string" ? (
                        <Text as="p" type="meta">
                            {right}
                        </Text>
                    ) : (
                        right
                    )}
                </div>
            ) : null}
        </>
    );

    if (href) {
        return (
            <Link href={href} style={{ ...ROW_STYLE, ...style }}>
                {content}
            </Link>
        );
    }

    return (
        <article style={{ ...ROW_STYLE, ...style }}>
            {content}
        </article>
    );
}