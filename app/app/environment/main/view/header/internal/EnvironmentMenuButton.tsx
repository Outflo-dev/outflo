// app/app/environment/main/view/header/internal/EnvironmentMenuButton.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT MENU BUTTON
   File: app/app/environment/main/view/header/internal/EnvironmentMenuButton.tsx
   Scope: Own Environment header menu affordance inside header action group
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: consume reusable MenuMark primitive
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import IconButton from "@/components/system/shell/buttons/types/icon/IconButton";
import MenuMark from "@/components/system/primitives/marks/icons/MenuMark";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentMenuButtonProps = {
    onOpenMenu?: () => void;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentMenuButton({
    onOpenMenu,
}: EnvironmentMenuButtonProps) {
    return (
        <IconButton
            ariaLabel="Open Environment menu"
            onClick={onOpenMenu}
            size="lg"
            tone="plain"
        >
            <MenuMark />
        </IconButton>
    );
}