/* ==========================================================
   OUTFLO — PROFILE PAGE (ENTRY)
   File: app/account/profile/page.tsx
   Scope: Server route entry for authenticated profile data handoff
   Last Updated:
   - ms: 1776471084070
   - iso: 2026-04-18T00:11:24.070Z
   - note: initial profile spine entry aligned to local page ownership
   ========================================================== */

export const dynamic = "force-dynamic";

/* ------------------------------
   Imports
-------------------------------- */
import { supabaseServer } from "@/lib/supabase/server";
import { getOrCreateUserEpochMs } from "@/lib/time/user-epoch";
import ProfileRoute from "./internal/ProfileRoute";
import { getFullName, getInitial, getUsername } from "./internal/profile.selectors";

/* ------------------------------
   Types
-------------------------------- */
type IdentityRow = {
  first_name: string;
  last_name: string | null;
  username: string | null;
  avatar_url: string | null;
};

/* ------------------------------
   Component
-------------------------------- */
export default async function ProfilePage() {
  const supabase = await supabaseServer();
  const epochMs = await getOrCreateUserEpochMs();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Unable to load authenticated user.");
  }

  const { data: identity, error: identityError } = await supabase
    .from("user_identity_assets")
    .select("first_name, last_name, username, avatar_url")
    .eq("user_id", user.id)
    .single<IdentityRow>();

  if (identityError || !identity) {
    throw new Error("Unable to load identity.");
  }

  const fullName = getFullName(identity.first_name, identity.last_name);
  const username = getUsername(identity.username);
  const initial = getInitial(fullName);

  return (
    <ProfileRoute
      fullName={fullName}
      username={username}
      avatarUrl={identity.avatar_url}
      initial={initial}
      epochMs={epochMs}
    />
  );
}