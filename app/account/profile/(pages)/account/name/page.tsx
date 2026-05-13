/* ==========================================================
   OUTFLO — ACCOUNT NAME PAGE
   File: app/account/profile/(pages)/account/name/page.tsx
   Scope: Server route entry for account name drilldown data handoff
   Last Updated:
   - ms: 1778701972789
   - iso: 2026-05-13T19:52:52.789Z
   - note: add account name drilldown route
   ========================================================== */

export const dynamic = "force-dynamic";

/* ------------------------------
   Imports
-------------------------------- */
import { supabaseServer } from "@/lib/supabase/server";
import AccountNameController from "./internal/AccountNameController";

/* ------------------------------
   Types
-------------------------------- */
type IdentityRow = {
    first_name: string | null;
    last_name: string | null;
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

    const { data: identity, error: identityError } = await supabase
        .from("user_identity_assets")
        .select("first_name, last_name")
        .eq("user_id", user.id)
        .maybeSingle<IdentityRow>();

    if (identityError) {
        throw new Error("Unable to load account name.");
    }

    return (
        <AccountNameController
            firstName={identity?.first_name ?? ""}
            lastName={identity?.last_name ?? null}
        />
    );
}