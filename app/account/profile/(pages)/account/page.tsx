/* ==========================================================
   OUTFLO — ACCOUNT PAGE
   File: app/account/profile/(pages)/account/page.tsx
   Scope: Server route entry for account information surface
   Last Updated:
   - ms: 1779407770945
   - iso: 2026-05-21T23:56:10.945Z
   - note: read canonical account number from profiles table
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

   const { data: profile } = user
      ? await supabase
         .from("profiles")
         .select("account_number")
         .eq("id", user.id)
         .maybeSingle()
      : { data: null };

   const accountData: AccountPageData = {
      accountName:
         user?.user_metadata?.full_name ??
         user?.email?.split("@")[0] ??
         "Outflō account",
      username: user?.email?.split("@")[0] ?? null,
      email: user?.email ?? "Unknown",
      phone: user?.phone ?? null,
      accountNumber: profile?.account_number ?? "UNKNOWN",
      epochMs: Date.now(),
      memberSince: getMemberSince(user?.created_at),
   };

   return <AccountController {...accountData} />;
}