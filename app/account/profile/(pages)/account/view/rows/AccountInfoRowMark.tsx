"use client";

/* ==========================================================
   OUTFLO — ACCOUNT INFO ROW MARK
   File: app/account/profile/(pages)/account/view/rows/AccountInfoRowMark.tsx
   Scope: Resolve account row mark primitives
   ========================================================== */

import AccountEmailMark from "@/components/system/primitives/marks/account/AccountEmailMark";
import AccountHandleMark from "@/components/system/primitives/marks/account/AccountHandleMark";
import AccountNumberMark from "@/components/system/primitives/marks/account/AccountNumberMark";
import AccountPersonMark from "@/components/system/primitives/marks/account/AccountPersonMark";
import AccountStatusMark from "@/components/system/primitives/marks/account/AccountStatusMark";
import AccountTimeMark from "@/components/system/primitives/marks/account/AccountTimeMark";
import type { AccountMarkKind } from "../../internal/account.types";

export default function AccountInfoRowMark({
    mark,
}: {
    mark: AccountMarkKind;
}) {
    if (mark === "person") return <AccountPersonMark />;
    if (mark === "handle") return <AccountHandleMark />;
    if (mark === "number") return <AccountNumberMark />;
    if (mark === "email") return <AccountEmailMark />;
    if (mark === "time") return <AccountTimeMark />;

    return <AccountStatusMark />;
}