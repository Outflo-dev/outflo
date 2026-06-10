"use client";

/* ==========================================================
   OUTFLO — MENU CARD
   File: components/system/surfaces/card/types/menu/MenuCard.tsx
   Scope: Own reusable menu card rows and action layout
   Last Updated:
   - ms: 1781096852713
   - iso: 2026-06-10T13:07:32.713Z
   - note: introduce reusable small menu card composition
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";

import MenuCardFrame from "./MenuCardFrame";

/* ------------------------------
   Types
-------------------------------- */
export type MenuCardRow = {
    label: string;
    href?: string;
    right?: ReactNode;
    active?: boolean;
    onClick?: () => void;
};

type MenuCardProps = {
    rows: MenuCardRow[];
    align?: "left" | "right";
};

/* ------------------------------
   Styles
-------------------------------- */
const ROW_STYLE: CSSProperties = {
    width: "100%",
    minHeight: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
    padding: "0 12px",
    borderRadius: 18,
    border: 0,
    background: "transparent",
    color: "var(--text-primary)",
    font: "inherit",
    fontSize: 14,
    textDecoration: "none",
    cursor: "pointer",
};

const ACTIVE_ROW_STYLE: CSSProperties = {
    background: "color-mix(in srgb, var(--text-primary) 8%, transparent)",
};

const RIGHT_STYLE: CSSProperties = {
    opacity: 0.55,
    fontSize: 13,
};

/* ------------------------------
   Component
-------------------------------- */
export default function MenuCard({
    rows,
    align = "right",
}: MenuCardProps) {
    return (
        <MenuCardFrame align={align}>
            {rows.map((row) => {
                const style = row.active
                    ? { ...ROW_STYLE, ...ACTIVE_ROW_STYLE }
                    : ROW_STYLE;

                const content = (
                    <>
                        <span>{row.label}</span>
                        {row.right ? (
                            <span style={RIGHT_STYLE}>{row.right}</span>
                        ) : null}
                    </>
                );

                if (row.href) {
                    return (
                        <Link key={row.label} href={row.href} style={style}>
                            {content}
                        </Link>
                    );
                }

                return (
                    <button
                        key={row.label}
                        type="button"
                        style={style}
                        onClick={row.onClick}
                    >
                        {content}
                    </button>
                );
            })}
        </MenuCardFrame>
    );
}