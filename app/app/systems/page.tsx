/* ==========================================================
   OUTFLO — SYSTEMS ROOT
   File: app/app/systems/page.tsx
   Scope: Render authenticated read-only Systems launcher
   Last Updated:
   - ms: 1778467797659
   - iso: 2026-05-11T02:49:57.659Z
   - note: move systems board ownership to canonical launcher and add identity avatar read
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
export default async function SystemsPage() {
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
        background:
          "radial-gradient(circle at top, var(--surface-soft), transparent 34%), var(--bg-primary)",
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
            rowGap: 26,
            boxSizing: "border-box",
          }}
        >
          <header
            style={{
              display: "grid",
              rowGap: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-tertiary)",
                }}
              >
                Systems
              </div>

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

            <div
              style={{
                display: "grid",
                rowGap: 8,
              }}
            >
              <div
                style={{
                  fontSize: "clamp(42px, 9vw, 62px)",
                  fontWeight: 700,
                  letterSpacing: "-0.055em",
                  lineHeight: 0.92,
                }}
              >
                Outflō
              </div>

              <div
                style={{
                  maxWidth: 420,
                  fontSize: 15,
                  lineHeight: 1.45,
                  color: "var(--text-secondary)",
                }}
              >
                Substrates, tools, and system surfaces.
              </div>
            </div>
          </header>

          <div
            style={{
              border: "1px solid var(--border-soft)",
              background:
                "linear-gradient(180deg, var(--surface-soft), var(--surface-muted))",
              borderRadius: 28,
              padding: "18px",
              display: "grid",
              rowGap: 6,
              boxShadow: "0 18px 60px rgba(0,0,0,0.16)",
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

          <div style={{ display: "grid", rowGap: 14 }}>
            <SectionLabel>Substrates</SectionLabel>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 14,
              }}
            >
              <Tile
                href="/app/money"
                label="Money"
                detail="Outflow surface"
                enabled
              />

              <Tile
                href="/app/time"
                label="Time"
                detail="Runtime clock"
                enabled
              />

              <Tile
                href="/app/weather"
                label="Weather"
                detail="Atmospheric substrate"
                enabled={false}
              />

              <Tile
                href="/app/environment"
                label="Environment"
                detail="External state"
                enabled={false}
              />
            </div>
          </div>

          <div style={{ display: "grid", rowGap: 14 }}>
            <SectionLabel>Tools</SectionLabel>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 14,
              }}
            >
              <Tile
                href="/tools/gain"
                label="Gain"
                detail="Daily under-outflow"
                enabled
              />

              <Tile
                href="/tools/compression"
                label="Orbit Money"
                detail="Annualized cadence"
                enabled
              />
            </div>
          </div>

          <nav
            aria-label="System navigation"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: 8,
              flexWrap: "wrap",
              paddingTop: 2,
            }}
          >
            <ControlButton href="/account/profile" label="Profile" />
            <ControlButton href="/" label="Portal" />
          </nav>
        </section>
      </AppFrame>
    </main>
  );
}

/* ------------------------------
   Section Label
-------------------------------- */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 650,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--text-tertiary)",
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------
   Tile
-------------------------------- */
function Tile({
  href,
  label,
  detail,
  enabled,
}: {
  href: string;
  label: string;
  detail: string;
  enabled: boolean;
}) {
  const style: React.CSSProperties = {
    textDecoration: "none",
    color: "var(--text-primary)",
    border: "1px solid var(--border-soft)",
    background:
      "linear-gradient(180deg, var(--surface-soft), var(--surface-muted))",
    borderRadius: 26,
    padding: "22px 20px",
    minHeight: 132,
    display: "grid",
    alignContent: "space-between",
    opacity: enabled ? 1 : 0.35,
    boxShadow: "0 18px 60px rgba(0,0,0,0.18)",
    boxSizing: "border-box",
    pointerEvents: enabled ? "auto" : "none",
  };

  const content = (
    <>
      <div style={{ display: "grid", rowGap: 6 }}>
        <div
          style={{
            fontSize: 21,
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          {label}
        </div>

        <div
          style={{
            fontSize: 13,
            lineHeight: 1.35,
            color: "var(--text-tertiary)",
          }}
        >
          {detail}
        </div>
      </div>

      <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
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