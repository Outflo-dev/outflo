/* ==========================================================
   OUTFLO — PROFILE PAGE (ENTRY)
   ========================================================== */

export const dynamic = "force-dynamic";

import { supabaseServer } from "@/lib/supabase/server";
import { getOrCreateUserEpochMs } from "@/lib/time/user-epoch";
import ProfileRoute from "@/components/domains/profile/internal/route/ProfileRoute";

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
   Helpers
-------------------------------- */
function getFullName(firstName: string, lastName: string | null) {
  return [firstName, lastName].filter(Boolean).join(" ").trim();
}

function getUsername(username: string | null) {
  if (!username) return null;
  const clean = username.trim().replace(/^@+/, "");
  return clean ? `@${clean}` : null;
}

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "O";
}

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