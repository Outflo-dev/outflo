/* ==========================================================
   OUTFLO — PROFILE HUB PAGE
   File: app/account/profile/page.tsx
   Scope: Render the canonical profile hub for account navigation
   Last Updated:
   - ms: 1774830366184
   - iso: 2026-03-30T00:26:06.184Z
   - note: rewrite page structure for readable section boundaries and precise top-block control
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import type { ReactNode } from "react";

/* ------------------------------
   Constants
-------------------------------- */
const HUB_ITEMS = [
  { label: "Account", href: "/account/profile/account" },
  { label: "Environment", href: "/account/profile/environment" },
  { label: "Money", href: "/account/profile/money" },
  { label: "Privacy", href: "/account/profile/privacy" },
  { label: "Notifications", href: "/account/profile/notifications" },
  { label: "Records", href: "/account/profile/records" },
  { label: "Support", href: "/account/profile/support" },
] as const;

const FOOTER_ITEMS = [
  { label: "Privacy Notice", href: "/account/profile/privacy" },
  { label: "Terms of Service", href: "/account/profile/support" },
  { label: "References", href: "/account/profile/records" },
] as const;

const SOCIAL_ITEMS = [
  { label: "X", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "GitHub", href: "#" },
] as const;

const UI = {
  pageTop: 16,
  pageBottom: 40,
  sectionGap: 24,
  stackGap: 16,
  textGap: 12,
  topBlockGap: 26,
  actionRowGap: 18,

  textPrimary: "var(--text-primary)",
  textSecondary: "rgba(255, 254, 250, 0.72)",
  textTertiary: "rgba(255, 254, 250, 0.52)",

  borderSoft: "rgba(255, 254, 250, 0.08)",
  borderRow: "rgba(255, 254, 250, 0.06)",

  surfaceSoft: "rgba(255, 254, 250, 0.04)",
  iconSurface: "rgba(255,255,255,0.08)",
  pillSurface: "rgba(255,255,255,0.14)",

  dangerSoft: "rgba(255, 80, 80, 0.10)",
  dangerBorder: "rgba(255, 80, 80, 0.25)",
  dangerText: "rgba(255, 120, 120, 0.9)",

  avatarYellow: "#F6D84C",
  inviteGreen: "#00D54B",
} as const;

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

function CircleIcon({
  children,
  size = 72,
  background = UI.iconSurface,
  color = UI.textPrimary,
}: {
  children: ReactNode;
  size?: number;
  background?: string;
  color?: string;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        background,
        color,
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------
   Component
-------------------------------- */
export default async function ProfilePage() {
  const supabase = await supabaseServer();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Unable to load authenticated user for profile page.");
  }

  const { data: identity, error: identityError } = await supabase
    .from("user_identity_assets")
    .select("first_name, last_name, username, avatar_url")
    .eq("user_id", user.id)
    .single<IdentityRow>();

  if (identityError || !identity) {
    throw new Error("Unable to load user identity assets for profile page.");
  }

  const fullName = getFullName(identity.first_name, identity.last_name);
  const username = getUsername(identity.username);
  const initial = getInitial(fullName);

  return (
    <main
      style={{
        minHeight: "100vh",
        paddingTop: UI.pageTop,
        paddingBottom: UI.pageBottom,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 640,
          margin: "0 auto",
        }}
      >
        {/* ------------------------------
           UI: Profile — Top Shell
        -------------------------------- */}
        <section
          style={{
            padding: "0 8px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {/* ------------------------------
   UI: Profile — Header Bar
-------------------------------- */}
<div
  style={{
  position: "sticky",
  top: -1,
  zIndex: 10,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "black",
  marginLeft: -8,
  marginRight: -8,
  paddingLeft: 8,
  paddingRight: 8,
  marginBottom: 4,
}}
>
  <Link
    href="/app/home"
    aria-label="Close profile"
    style={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      display: "grid",
      placeItems: "center",
      textDecoration: "none",
      color: UI.textPrimary,
      background: UI.iconSurface,
      fontSize: 22,
      lineHeight: 1,
      flexShrink: 0,
    }}
  >
    ×
  </Link>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
    }}
  >
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        background: UI.iconSurface,
        color: UI.textPrimary,
        fontSize: 18,
        lineHeight: 1,
        flexShrink: 0,
      }}
    >
      ⌁
    </div>

    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        background: UI.iconSurface,
        color: UI.textPrimary,
        fontSize: 18,
        lineHeight: 1,
        flexShrink: 0,
      }}
    >
      ↗
    </div>
  </div>
</div>

{/* ------------------------------
   UI: Profile — Avatar
-------------------------------- */}
<div
  style={{
    position: "relative",
    width: 92,
    height: 92,
  }}
>
  <Link
    href="/account/profile/edit"
    aria-label="Edit profile photo"
    style={{
      width: 88,
      height: 88,
      borderRadius: "50%",
      display: "grid",
      placeItems: "center",
      textDecoration: "none",
      color: "#fff",
      background: "linear-gradient(135deg, #5b21b6 0%, #7c3aed 45%, #c084fc 100%)",
      fontSize: 34,
      fontWeight: 700,
      letterSpacing: -0.8,
      overflow: "hidden",
      flexShrink: 0,
    }}
  >
    {identity.avatar_url ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={identity.avatar_url}
        alt={fullName}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    ) : (
      initial
    )}
  </Link>

  <Link
    href="/account/profile/edit"
    aria-label="Add a profile photo"
    style={{
      position: "absolute",
      right: 0,
      bottom: 0,
      width: 30,
      height: 30,
      borderRadius: "50%",
      display: "grid",
      placeItems: "center",
      textDecoration: "none",
      color: UI.textPrimary,
      background: "#111111",
      border: "1px solid #000",
      fontSize: 13,
      fontWeight: 700,
      lineHeight: 1,
      zIndex: 1,
    }}
  >
    +
  </Link>
</div>

         {/* ------------------------------
              UI: Profile — Name
            -------------------------------- */}
<div>
  <h1
    style={{
      margin: 0,
      color: UI.textPrimary,
      fontSize: 26,
      fontWeight: 700,
      letterSpacing: -1.4,
      lineHeight: 0.98,
    }}
  >
    {fullName}
  </h1>
</div>

{/* ------------------------------
   UI: Profile — Identity Pills
-------------------------------- */}
<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  }}
>
  {username ? (
    <div
      style={{
        height: 32,
        padding: "0 16px",
        borderRadius: 999,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.10)",
        color: UI.textPrimary,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: -0.2,
        lineHeight: 1,
        userSelect: "text",
        WebkitUserSelect: "text",
      }}
    >
      {username}
    </div>
  ) : null}

  <Link
    href="/account/profile/edit"
    style={{
      height: 32,
      padding: "0 16px",
      borderRadius: 999,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
      background: "rgba(255,255,255,0.10)",
      color: UI.textPrimary,
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: -0.2,
      lineHeight: 1,
    }}
  >
    Edit
  </Link>
</div>

          {/* ------------------------------
             UI: Profile — Primary Actions
          -------------------------------- */}

        </section>

        {/* ------------------------------
           UI: Profile — Settings List
        -------------------------------- */}
        <section
          style={{
            marginTop: UI.sectionGap,
            borderTop: `1px solid ${UI.borderSoft}`,
          }}
        >
          <nav aria-label="Profile navigation">
            {HUB_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  minHeight: 56,
                  padding: "0 8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textDecoration: "none",
                  color: UI.textPrimary,
                  borderBottom: `1px solid ${UI.borderRow}`,
                }}
              >
                <span style={{ fontSize: 14 }}>{item.label}</span>
                <span style={{ fontSize: 12, color: UI.textTertiary }}>›</span>
              </Link>
            ))}
          </nav>
        </section>

        {/* ------------------------------
           UI: Profile — Social
        -------------------------------- */}
        <section
          style={{
            marginTop: UI.sectionGap,
            padding: "0 16px",
            display: "flex",
            gap: 16,
          }}
        >
          {SOCIAL_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                fontSize: 12,
                color: UI.textSecondary,
                textDecoration: "none",
              }}
            >
              {item.label}
            </Link>
          ))}
        </section>

        {/* ------------------------------
           UI: Profile — Footer
        -------------------------------- */}
        <section
          style={{
            marginTop: UI.sectionGap,
            padding: "0 16px",
            color: UI.textTertiary,
            fontSize: 11,
            lineHeight: 1.6,
          }}
        >
          <p style={{ margin: 0 }}>
            Outflō is a personal telemetry system. It begins at a precise
            moment, and records what leaves you across money, time, and
            environment.
          </p>

          <p style={{ margin: `${UI.textGap}px 0 0` }}>
            Outflō does not hold funds, is not a bank, does not manufacture
            financial products, and does not execute transactions. It simply
            records events as they occur.
          </p>

          <p style={{ margin: `${UI.textGap}px 0 0` }}>
            <Link href={FOOTER_ITEMS[0].href}>{FOOTER_ITEMS[0].label}</Link> ·{" "}
            <Link href={FOOTER_ITEMS[1].href}>{FOOTER_ITEMS[1].label}</Link> ·{" "}
            <Link href={FOOTER_ITEMS[2].href}>{FOOTER_ITEMS[2].label}</Link>
          </p>
        </section>

        {/* ------------------------------
           UI: Profile — Sign Out
        -------------------------------- */}
        <section
          style={{
            marginTop: UI.sectionGap,
            padding: "0 16px",
          }}
        >
          <Link
            href="/logout"
            style={{
              minHeight: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 999,
              textDecoration: "none",
              fontSize: 13,
              color: UI.dangerText,
              background: UI.dangerSoft,
              border: `1px solid ${UI.dangerBorder}`,
            }}
          >
            Sign Out
          </Link>
        </section>
      </div>
    </main>
  );
}