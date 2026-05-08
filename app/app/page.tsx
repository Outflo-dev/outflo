/* ==========================================================
   OUTFLO — APP ROOT
   File: app/app/page.tsx
   Scope: Render authenticated controls doorway
   Last Updated:
   - ms: 1778204100000
   - iso: 2026-05-08T01:35:00.000Z
   - note: add top-right authenticated avatar and align systems surface to app shell rhythm
   ========================================================== */

export const dynamic = "force-dynamic";

/* ------------------------------
   Imports
-------------------------------- */
import type React from "react";
import Link from "next/link";

import AppFrame from "@/components/system/shell/app/AppFrame";
import Avatar from "@/components/system/primitives/display/avatar/Avatar";

import { supabaseServer } from "@/lib/supabase/server";

import {
  getFullName,
  getUsername,
} from "@/app/account/profile/internal/profile.selectors";

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
   Page
-------------------------------- */
export default async function AppRootPage() {
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
    .select("first_name, last_name, username, avatar_url")
    .eq("user_id", user.id)
    .single<IdentityRow>();

  if (identityError || !identity) {
    throw new Error("Unable to load identity.");
  }

  const fullName = getFullName(identity.first_name, identity.last_name);
  const username = getUsername(identity.username);

  const avatarValue = username ?? fullName ?? "O";

  return (
    <main
      style={{
        minHeight: "100svh",
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        padding:
          "calc(env(safe-area-inset-top) + 18px) 0px max(32px, env(safe-area-inset-bottom))",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      <AppFrame>
        <section
          style={{
            width: "100%",
            display: "grid",
            rowGap: 20,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Link
              href="/account/profile"
              style={{
                textDecoration: "none",
              }}
            >
              <Avatar
                size="md"
                value={avatarValue}
                src={identity.avatar_url}
                alt={fullName}
              />
            </Link>
          </div>

          <div style={{ display: "grid", rowGap: 8 }}>
            <div
              style={{
                fontSize: 13,
                color: "var(--text-tertiary)",
              }}
            >
              Outflō
            </div>

            <div
              style={{
                fontSize: 34,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              Systems
            </div>

            <div
              style={{
                fontSize: 13,
                color: "var(--text-tertiary)",
              }}
            >
              Runtime doorway
            </div>
          </div>

          <div
            style={{
              border: "1px solid var(--border-soft)",
              background: "var(--surface-muted)",
              borderRadius: 24,
              padding: "18px",
              display: "grid",
              rowGap: 6,
            }}
          >
            <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>
              System running
            </div>

            <div
              style={{
                fontSize: 24,
                fontWeight: 650,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              1390:23:03
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 14,
            }}
          >
            <Tile href="/app/money" label="Money" enabled />
            <Tile href="/app/time" label="Time" enabled />
            <Tile href="/app/weather" label="Weather" enabled={false} />
            <Tile href="/app/environment" label="Environment" enabled={false} />
          </div>

          <nav
            aria-label="Control navigation"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: 8,
              flexWrap: "wrap",
              paddingTop: 2,
            }}
          >
            <ControlButton href="/account/profile" label="Profile" />
            <ControlButton href="/app/systems" label="Systems" />
            <ControlButton href="/" label="Portal" />
          </nav>
        </section>
      </AppFrame>
    </main>
  );
}

/* ------------------------------
   Tile
-------------------------------- */
function Tile({
  href,
  label,
  enabled,
}: {
  href: string;
  label: string;
  enabled: boolean;
}) {
  const style: React.CSSProperties = {
    textDecoration: "none",
    color: "var(--text-primary)",
    border: "1px solid var(--border-soft)",
    background: "var(--surface-soft)",
    borderRadius: 24,
    padding: "20px 18px",
    height: 132,
    display: "grid",
    alignContent: "space-between",
    opacity: enabled ? 1 : 0.38,
    pointerEvents: enabled ? "auto" : "none",
    boxSizing: "border-box",
  };

  const content = (
    <>
      <div style={{ fontSize: 20, fontWeight: 650 }}>{label}</div>

      <div style={{ fontSize: 13, color: "var(--text-tertiary)" }}>
        {enabled ? "Open" : "Soon"}
      </div>
    </>
  );

  if (!enabled) {
    return <div style={style}>{content}</div>;
  }

  return (
    <Link href={href} style={style}>
      {content}
    </Link>
  );
}

/* ------------------------------
   Control Button
-------------------------------- */
function ControlButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        color: "var(--text-primary)",
        textDecoration: "none",
        fontSize: 13,
        border: "1px solid var(--border-soft)",
        background: "var(--surface-soft)",
        borderRadius: 999,
        padding: "9px 14px",
      }}
    >
      {label}
    </Link>
  );
}