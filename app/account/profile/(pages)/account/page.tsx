/* ==========================================================
   OUTFLO — ACCOUNT PAGE
   File: app/account/profile/(pages)/account/page.tsx
   Scope: Server route entry for account information surface
   Last Updated:
   - ms: 1779306395650
   - iso: 2026-05-20T19:46:35.650Z
   - note: pass required account page data into account controller
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { supabaseServer } from "@/lib/supabase/server";

import AccountController from "./main/internal/AccountController";
import type { AccountPageData } from "./main/internal/account.types";

/* ------------------------------
   Helpers
-------------------------------- */
function getAccountNumber(userId: string) {
   return userId.slice(0, 8).toUpperCase();
}

function getMemberSince(createdAt: string | undefined) {
   if (!createdAt) return "Unknown";

   return new Intl.DateTimeFormat("en", {
      month: "long",
      year: "numeric",
   }).format(new Date(createdAt));
}

/* ------------------------------
   Page
-------------------------------- */
export default async function Page() {
   const supabase = await supabaseServer();

   const {
      data: { user },
   } = await supabase.auth.getUser();

   const accountData: AccountPageData = {
      accountName:
         user?.user_metadata?.full_name ??
         user?.email?.split("@")[0] ??
         "Outflō account",
      username: user?.email?.split("@")[0] ?? null,
      email: user?.email ?? "Unknown",
      phone: user?.phone ?? null,
      accountNumber: user ? getAccountNumber(user.id) : "UNKNOWN",
      epochMs: Date.now(),
      memberSince: getMemberSince(user?.created_at),
   };

   return <AccountController data={accountData} />;
}