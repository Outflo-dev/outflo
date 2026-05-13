/* ==========================================================
   OUTFLO — ACCOUNT ORBIT HANDLE PAGE
   File: app/account/profile/(pages)/account/orbithandle/page.tsx
   Scope: Server route entry for account Orbit handle drilldown data handoff
   Last Updated:
   - ms: 1778701972789
   - iso: 2026-05-13T19:52:52.789Z
   - note: add account Orbit handle drilldown route
   ========================================================== */

export const dynamic = "force-dynamic";

/* ------------------------------
   Imports
-------------------------------- */
import { supabaseServer } from "@/lib/supabase/server";
import AccountOrbitHandleController from "./internal/AccountOrbitHandleController";

/* ------------------------------
   Types
-------------------------------- */
type IdentityRow = {
    username: string | null;
};

/* ------------------------------
   Helpers
-------------------------------- */
function cleanOrbitHandle(value: string | null) {
    return value?.trim().replace(/^@+/, "") ?? "";
}

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
        .select("username")
        .eq("user_id", user.id)
        .maybeSingle<IdentityRow>();

    if (identityError) {
        throw new Error("Unable to load account Orbit handle.");
    }

    return (
        <AccountOrbitHandleController
            orbitHandle={cleanOrbitHandle(identity?.username ?? null)}
        />
    );
}