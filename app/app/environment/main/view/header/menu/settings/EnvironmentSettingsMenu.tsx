"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT SETTINGS MENU
   File: app/app/environment/main/view/header/menu/settings/EnvironmentSettingsMenu.tsx
   Scope: Own Environment header menu state, trigger, placement, and preference actions
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: wire temperature unit menu to persisted Environment preference action
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { updateEnvironmentTemperatureUnitAction } from "@/lib/app-state/environment/environment-preferences.actions";
import type { TemperatureUnit } from "@/lib/app-state/environment/environment-units";
import MarkFrame from "@/components/system/primitives/marks/frame/MarkFrame";
import EnvironmentMark from "@/components/system/primitives/marks/icons/EnvironmentMark";
import SettingsMark from "@/components/system/primitives/marks/icons/SettingsMark";
import UnitsMark from "@/components/system/primitives/marks/icons/UnitsMark";
import MenuCardFrame from "@/components/system/surfaces/card/types/menu/MenuCardFrame";

import EnvironmentHeaderUtilityAction from "../../primitives/EnvironmentHeaderUtilityAction";
import {
    ENVIRONMENT_SETTINGS_HREF,
    ENVIRONMENT_SETTINGS_MENU_LABELS,
    ENVIRONMENT_SETTINGS_MENU_UNITS,
} from "./environment-settings-menu.rows";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentSettingsMenuProps = {
    temperatureUnit: TemperatureUnit;
};

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
    gridTemplateColumns: "38px 66px minmax(0, 1fr)",
    alignItems: "center",
    justifyItems: "start",
    columnGap: 4,
    padding: "0 10px",
    border: 0,
    borderRadius: 18,
    background: "transparent",
    color: "var(--text-primary)",
    font: "inherit",
    textAlign: "left",
    textDecoration: "none",
    cursor: "pointer",
    WebkitAppearance: "none",
    appearance: "none",
};

const ACTIVE_ROW_STYLE: CSSProperties = {
    background: "var(--surface-soft)",
};

const DISABLED_ROW_STYLE: CSSProperties = {
    opacity: 0.58,
    pointerEvents: "none",
};

const MARK_ROW_STYLE: CSSProperties = {
    ...ROW_STYLE,
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
            <span style={CHECK_STYLE} />
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

function isActiveTemperatureUnit(
    currentUnit: TemperatureUnit,
    rowUnit: Exclude<TemperatureUnit, "system">
): boolean {
    if (currentUnit === rowUnit) {
        return true;
    }

    return currentUnit === "system" && rowUnit === "fahrenheit";
}

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentSettingsMenu({
    temperatureUnit,
}: EnvironmentSettingsMenuProps) {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [pending, startTransition] = useTransition();

    function handleSelectUnit(unit: Exclude<TemperatureUnit, "system">) {
        startTransition(async () => {
            await updateEnvironmentTemperatureUnitAction(unit);
            setOpen(false);
            router.refresh();
        });
    }

    return (
        <div style={ROOT_STYLE}>
            <EnvironmentHeaderUtilityAction
                active={open}
                onPress={() => setOpen((current) => !current)}
            />

            {open ? (
                <MenuCardFrame align="right" width={292}>
                    <div style={MENU_STYLE}>
                        <MenuMarkRow icon={<SettingsMark />}>
                            {ENVIRONMENT_SETTINGS_MENU_LABELS.editSettings}
                        </MenuMarkRow>

                        <MenuDivider />

                        {ENVIRONMENT_SETTINGS_MENU_UNITS.map((row) => {
                            const active = isActiveTemperatureUnit(
                                temperatureUnit,
                                row.unit
                            );

                            return (
                                <button
                                    key={row.unit}
                                    type="button"
                                    style={
                                        active
                                            ? {
                                                ...ROW_STYLE,
                                                ...ACTIVE_ROW_STYLE,
                                                ...(pending ? DISABLED_ROW_STYLE : null),
                                            }
                                            : {
                                                ...ROW_STYLE,
                                                ...(pending ? DISABLED_ROW_STYLE : null),
                                            }
                                    }
                                    onClick={() => handleSelectUnit(row.unit)}
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