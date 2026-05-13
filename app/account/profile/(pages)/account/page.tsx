/* ==========================================================
   OUTFLO — PROFILE ACCOUNT PAGE
   File: app/account/profile/(pages)/account/page.tsx
   Scope: Server route entry for account identity data handoff
   Last Updated:
   - ms: 1778645071428
   - iso: 2026-05-13T04:04:31.428Z
   - note: replace placeholder account drilldown with real account data handoff
   ========================================================== */

export const dynamic = "force-dynamic";

/* ------------------------------
   Imports
-------------------------------- */
import { supabaseServer } from "@/lib/supabase/server";
import { getOrCreateUserEpochMs } from "@/lib/time/user-epoch";
import AccountController from "./internal/AccountController";
import { getFullName, getUsername } from "../../internal/profile.selectors";

/* ------------------------------
   Types
-------------------------------- */
type IdentityRow = {
   first_name: string;
   last_name: string | null;
   username: string | null;
};

type ProfileRow = {
   email: string;
   account_number: string;
   created_at: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default async function Page() {
   const supabase = await supabaseServer();

   const {
      data: { user },
      error: userError,
   } = await supabase.auth.getUser();

   if (userError || !user) {
      throw new Error("Unable to load authenticated user.");
   }

   const epochMs = await getOrCreateUserEpochMs();

   const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("email, account_number, created_at")
      .eq("id", user.id)
      .maybeSingle<ProfileRow>();

   if (profileError || !profile) {
      throw new Error("Unable to load account profile.");
   }

   const { data: identity, error: identityError } = await supabase
      .from("user_identity_assets")
      .select("first_name, last_name, username")
      .eq("user_id", user.id)
      .maybeSingle<IdentityRow>();

   if (identityError) {
      throw new Error("Unable to load account identity.");
   }

   const accountName = identity
      ? getFullName(identity.first_name, identity.last_name)
      : "Outflō account";

   const username = getUsername(identity?.username ?? null);

   return (
      <AccountController
         accountName={accountName}
         username={username}
         email={profile.email}
         accountNumber={profile.account_number}
         epochMs={epochMs}
         memberSince={profile.created_at}
      />
   );
}