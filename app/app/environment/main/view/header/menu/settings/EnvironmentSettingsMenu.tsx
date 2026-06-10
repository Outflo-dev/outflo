"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT SETTINGS MENU
   File: app/app/environment/main/view/header/menu/settings/EnvironmentSettingsMenu.tsx
   Scope: Own Environment header menu state, trigger, placement, and row composition
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: restore self-contained Environment header menu ownership
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";

import MarkFrame from "@/components/system/primitives/marks/frame/MarkFrame";
import EnvironmentMark from "@/components/system/primitives/marks/icons/EnvironmentMark";
import SettingsMark from "@/components/system/primitives/marks/icons/SettingsMark";
import UnitsMark from "@/components/system/primitives/marks/icons/UnitsMark";
import MenuCardFrame from "@/components/system/surfaces/card/types/menu/MenuCardFrame";

import EnvironmentMenuButton from "../../internal/EnvironmentMenuButton";
import {
    ENVIRONMENT_SETTINGS_HREF,
    ENVIRONMENT_SETTINGS_MENU_LABELS,
    ENVIRONMENT_SETTINGS_MENU_UNITS,
    type EnvironmentSettingsMenuUnit,
} from "./environment-settings-menu.rows";

/* ------------------------------
   Styles
-------------------------------- */
const ROOT_STYLE: CSSProperties = {
    position: "relative",
};

const MENU_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 0,
    padding: "6px 4px",
};

const ROW_STYLE: CSSProperties = {
    width: "100%",
    minHeight: 50,
    display: "grid",
    gridTemplateColumns: "38px 44px minmax(0, 1fr)",
    alignItems: "center",
    columnGap: 4,
    padding: "0 10px",
    border: 0,
    borderRadius: 18,
    background: "transparent",
    color: "var(--text-primary)",
    font: "inherit",
    textDecoration: "none",
    cursor: "pointer",
    WebkitAppearance: "none",
    appearance: "none",
};

const ACTIVE_ROW_STYLE: CSSProperties = {
    background: "var(--surface-soft)",
};

const MARK_ROW_STYLE: CSSProperties = {
    ...ROW_STYLE,
    gridTemplateColumns: "44px minmax(0, 1fr)",
};

const CHECK_STYLE: CSSProperties = {
    minWidth: 28,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    lineHeight: 1,
};

const UNIT_STYLE: CSSProperties = {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: "-0.04em",
};

const LABEL_STYLE: CSSProperties = {
    fontSize: 18,
    lineHeight: 1,
    letterSpacing: "-0.03em",
};

const DIVIDER_STYLE: CSSProperties = {
    height: 1,
    margin: "6px 10px",
    background: "color-mix(in srgb, var(--text-primary) 12%, transparent)",
};

/* ------------------------------
   Helpers
-------------------------------- */
function MenuDivider() {
    return <div style={DIVIDER_STYLE} />;
}

function MenuMarkRow({
    children,
    icon,
    href,
    onClick,
}: {
    children: ReactNode;
    icon: ReactNode;
    href?: string;
    onClick?: () => void;
}) {
    const content = (
        <>
            <MarkFrame>{icon}</MarkFrame>
            <span style={LABEL_STYLE}>{children}</span>
        </>
    );

    if (href) {
        return (
            <Link href={href} style={MARK_ROW_STYLE}>
                {content}
            </Link>
        );
    }

    return (
        <button type="button" style={MARK_ROW_STYLE} onClick={onClick}>
            {content}
        </button>
    );
}

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentSettingsMenu() {
    const [open, setOpen] = useState(false);
    const [selectedUnit, setSelectedUnit] =
        useState<EnvironmentSettingsMenuUnit>("fahrenheit");

    return (
        <div style={ROOT_STYLE}>
            <EnvironmentMenuButton
                onOpenMenu={() => setOpen((current) => !current)}
            />

            {open ? (
                <MenuCardFrame align="right" width={292}>
                    <div style={MENU_STYLE}>
                        <MenuMarkRow icon={<SettingsMark />}>
                            {ENVIRONMENT_SETTINGS_MENU_LABELS.editSettings}
                        </MenuMarkRow>

                        <MenuDivider />

                        {ENVIRONMENT_SETTINGS_MENU_UNITS.map((row) => {
                            const active = selectedUnit === row.unit;

                            return (
                                <button
                                    key={row.unit}
                                    type="button"
                                    style={
                                        active
                                            ? { ...ROW_STYLE, ...ACTIVE_ROW_STYLE }
                                            : ROW_STYLE
                                    }
                                    onClick={() => setSelectedUnit(row.unit)}
                                >
                                    <span style={CHECK_STYLE}>
                                        {active ? "✓" : ""}
                                    </span>
                                    <span style={UNIT_STYLE}>{row.mark}</span>
                                    <span style={LABEL_STYLE}>{row.label}</span>
                                </button>
                            );
                        })}

                        <MenuDivider />

                        <MenuMarkRow icon={<UnitsMark />}>
                            {ENVIRONMENT_SETTINGS_MENU_LABELS.units}
                        </MenuMarkRow>

                        <MenuDivider />

                        <MenuMarkRow
                            href={ENVIRONMENT_SETTINGS_HREF}
                            icon={<EnvironmentMark />}
                        >
                            {ENVIRONMENT_SETTINGS_MENU_LABELS.environmentSettings}
                        </MenuMarkRow>
                    </div>
                </MenuCardFrame>
            ) : null}
        </div>
    );
}