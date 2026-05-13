"use client";

/* ==========================================================
   OUTFLO — PROFILE ACCOUNT CONTROLLER
   File: app/account/profile/(pages)/account/internal/AccountController.tsx
   Scope: Own account drilldown motion and navigation orchestration
   Last Updated:
   - ms: 1778645071428
   - iso: 2026-05-13T04:04:31.428Z
   - note: hand account hero and tile model to account view
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import { useState } from "react";
import Motion, {
   MOTION_DURATION_MS,
} from "@/components/system/primitives/motion/Motion";
import AppFrame from "@/components/system/shell/app/AppFrame";
import AccountView from "../view/AccountView";
import { getAccountModel } from "./account.sections";
import type { AccountPageData } from "./account.types";

/* ------------------------------
   Constants
-------------------------------- */
const MAIN_STYLE: CSSProperties = {
   minHeight: "100svh",
   padding:
      "calc(env(safe-area-inset-top) + 18px) 0px max(32px, env(safe-area-inset-bottom))",
   background: "var(--bg-primary)",
   color: "var(--text-primary)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function AccountController(props: AccountPageData) {
   const [show, setShow] = useState(true);
   const [direction, setDirection] = useState<"left" | "right">("left");

   const model = getAccountModel(props);

   function handleBack() {
      setDirection("right");
      setShow(false);

      window.setTimeout(() => {
         window.history.back();
      }, MOTION_DURATION_MS);
   }

   return (
      <Motion show={show} direction={direction}>
         <main style={MAIN_STYLE}>
            <AppFrame>
               <AccountView model={model} onBack={handleBack} />
            </AppFrame>
         </main>
      </Motion>
   );
}