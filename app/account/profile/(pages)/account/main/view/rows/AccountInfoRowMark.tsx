"use client";

/* ==========================================================
   OUTFLO — ACCOUNT INFO ROW MARK
   File: app/account/profile/(pages)/account/view/rows/AccountInfoRowMark.tsx
   Scope: Resolve account row mark primitives from account row mark kinds
   Last Updated:
   - ms: 1779058286512
   - iso: 2026-05-17T22:51:26.512Z
   - note: consume generic system mark icons from marks/icons
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import EmailMark from "@/components/system/primitives/marks/icons/EmailMark";
import HandleMark from "@/components/system/primitives/marks/icons/HandleMark";
import NumberMark from "@/components/system/primitives/marks/icons/NumberMark";
import PersonMark from "@/components/system/primitives/marks/icons/PersonMark";
import StatusMark from "@/components/system/primitives/marks/icons/StatusMark";
import TimeMark from "@/components/system/primitives/marks/icons/TimeMark";

import type { AccountMarkKind } from "../../internal/account.types";

/* ------------------------------
   Types
-------------------------------- */
type AccountInfoRowMarkProps = {
    mark: AccountMarkKind;
};

/* ------------------------------
   Component
-------------------------------- */
export default function AccountInfoRowMark({
    mark,
}: AccountInfoRowMarkProps) {
    if (mark === "person") return <PersonMark />;
    if (mark === "handle") return <HandleMark />;
    if (mark === "number") return <NumberMark />;
    if (mark === "email") return <EmailMark />;
    if (mark === "time") return <TimeMark />;

    return <StatusMark />;
}