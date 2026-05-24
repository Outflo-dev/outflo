/* ==========================================================
   OUTFLO — SYSTEMS ROOT
   File: app/app/systems/page.tsx
   Scope: Render authenticated read-only Systems launcher
   Last Updated:
   - ms: 1778611632761
   - iso: 2026-05-12T18:47:12.761Z
   - note: consolidate systems atmosphere and surface glow consumption
   ========================================================== */

export const dynamic = "force-dynamic";

/* ------------------------------
   Imports
-------------------------------- */
import type React from "react";
import Link from "next/link";

import Avatar from "@/components/system/primitives/display/avatar/Avatar";
import EpochTicker from "@/components/system/primitives/display/clocks/EpochTicker";
import AppFrame from "@/components/system/shell/app/AppFrame";

import {
  getFullName,
  getUsername,
} from "@/app/account/profile/internal/profile.selectors";

import { supabaseServer } from "@/lib/supabase/server";
import { getOrCreateUserEpochMs } from "@/lib/time/user-epoch";

/* ------------------------------
   Types
-------------------------------- */
type IdentityRow = {
  first_name: string;
  last_name: string | null;
  username: string | null;
  avatar_url: string | null;
};

type TileProps = {
  href: string;
  label: string;
  detail: string;
  enabled: boolean;
};

type ControlButtonProps = {
  href: string;
  label: string;
};

type SectionLabelProps = {
  children: React.ReactNode;
};

/* ------------------------------
   Constants
-------------------------------- */
const SYSTEMS_PAGE_STYLE: React.CSSProperties = {
  minHeight: "100svh",
  background: "var(--glow-atmosphere)",
  color: "var(--text-primary)",
  padding:
    "calc(env(safe-area-inset-top) + 18px) 0px max(32px, env(safe-area-inset-bottom))",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "100%",
};

const SYSTEMS_STACK_STYLE: React.CSSProperties = {
  width: "100%",
  display: "grid",
  rowGap: 26,
  boxSizing: "border-box",
};

const HEADER_STYLE: React.CSSProperties = {
  display: "grid",
  rowGap: 18,
};

const HEADER_TOP_STYLE: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
};

const EYEBROW_STYLE: React.CSSProperties = {
  fontSize: "var(--text-xs)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--text-tertiary)",
};

const PROFILE_LINK_STYLE: React.CSSProperties = {
  textDecoration: "none",
};

const HERO_STACK_STYLE: React.CSSProperties = {
  display: "grid",
  rowGap: 8,
};

const HERO_TITLE_STYLE: React.CSSProperties = {
  fontSize: "clamp(42px, 9vw, 62px)",
  fontWeight: 700,
  letterSpacing: "-0.055em",
  lineHeight: 0.92,
};

const HERO_COPY_STYLE: React.CSSProperties = {
  maxWidth: 420,
  fontSize: "var(--text-sm)",
  lineHeight: 1.45,
  color: "var(--text-secondary)",
};

const SURFACE_STYLE: React.CSSProperties = {
  border: "1px solid var(--border-soft)",
  background:
    "linear-gradient(180deg, var(--surface-soft), var(--surface-muted))",
  borderRadius: 28,
  boxShadow: "var(--glow-surface), var(--glow-ring)",
  boxSizing: "border-box",
};

const STATUS_CARD_STYLE: React.CSSProperties = {
  ...SURFACE_STYLE,
  padding: 18,
  display: "grid",
  rowGap: 6,
};

const STATUS_LABEL_STYLE: React.CSSProperties = {
  fontSize: "var(--text-xs)",
  color: "var(--text-tertiary)",
};

const STATUS_VALUE_STYLE: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 650,
  letterSpacing: "-0.03em",
  lineHeight: 1,
  fontVariantNumeric: "tabular-nums",
};

const SECTION_STACK_STYLE: React.CSSProperties = {
  display: "grid",
  rowGap: 14,
};

const TILE_GRID_STYLE: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 14,
};

const SECTION_LABEL_STYLE: React.CSSProperties = {
  fontSize: "var(--text-xs)",
  fontWeight: 650,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--text-tertiary)",
};

const TILE_BASE_STYLE: React.CSSProperties = {
  ...SURFACE_STYLE,
  textDecoration: "none",
  color: "var(--text-primary)",
  padding: "22px 20px",
  minHeight: 132,
  display: "grid",
  alignContent: "space-between",
};

const TILE_TEXT_STACK_STYLE: React.CSSProperties = {
  display: "grid",
  rowGap: 6,
};

const TILE_LABEL_STYLE: React.CSSProperties = {
  fontSize: "var(--header-md)",
  fontWeight: 700,
  letterSpacing: "-0.03em",
};

const TILE_DETAIL_STYLE: React.CSSProperties = {
  fontSize: "var(--text-xs)",
  lineHeight: 1.35,
  color: "var(--text-tertiary)",
};

const TILE_ACTION_STYLE: React.CSSProperties = {
  fontSize: "var(--text-xs)",
  color: "var(--text-secondary)",
};

const CONTROL_NAV_STYLE: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-start",
  gap: 8,
  flexWrap: "wrap",
  paddingTop: 2,
};

const CONTROL_BUTTON_STYLE: React.CSSProperties = {
  color: "var(--text-primary)",
  textDecoration: "none",
  fontSize: "var(--text-xs)",
  border: "1px solid var(--border-soft)",
  background: "var(--surface-soft)",
  borderRadius: 999,
  boxShadow: "var(--glow-ring)",
  padding: "9px 14px",
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

  const epochMs = await getOrCreateUserEpochMs();

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
    <main style={SYSTEMS_PAGE_STYLE}>
      <AppFrame>
        <section style={SYSTEMS_STACK_STYLE}>
          <header style={HEADER_STYLE}>
            <div style={HEADER_TOP_STYLE}>
              <div style={EYEBROW_STYLE}>Systems</div>

              <Link href="/account/profile" style={PROFILE_LINK_STYLE}>
                <Avatar
                  size="md"
                  value={avatarValue}
                  src={identity.avatar_url}
                  alt={fullName}
                />
              </Link>
            </div>

            <div style={HERO_STACK_STYLE}>
              <div style={HERO_TITLE_STYLE}>Outflō</div>

              <div style={HERO_COPY_STYLE}>
                Substrates, tools, and system surfaces.
              </div>
            </div>
          </header>

          <div style={STATUS_CARD_STYLE}>
            <div style={STATUS_LABEL_STYLE}>System running</div>

            <div style={STATUS_VALUE_STYLE}>
              <EpochTicker epochMs={epochMs} size="md" />
            </div>
          </div>

          <div style={SECTION_STACK_STYLE}>
            <SectionLabel>Substrates</SectionLabel>

            <div style={TILE_GRID_STYLE}>
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
                href="/account/profile/environment/live-test"
                label="Environment"
                detail="Live OwnTracks test"
                enabled
              />
            </div>
          </div>

          <div style={SECTION_STACK_STYLE}>
            <SectionLabel>Tools</SectionLabel>

            <div style={TILE_GRID_STYLE}>
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

          <nav aria-label="System navigation" style={CONTROL_NAV_STYLE}>
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
function SectionLabel({ children }: SectionLabelProps) {
  return <div style={SECTION_LABEL_STYLE}>{children}</div>;
}

/* ------------------------------
   Tile
-------------------------------- */
function Tile({ href, label, detail, enabled }: TileProps) {
  const style: React.CSSProperties = {
    ...TILE_BASE_STYLE,
    opacity: enabled ? 1 : 0.35,
    boxShadow: enabled ? TILE_BASE_STYLE.boxShadow : "var(--glow-ring)",
    pointerEvents: enabled ? "auto" : "none",
  };

  const content = (
    <>
      <div style={TILE_TEXT_STACK_STYLE}>
        <div style={TILE_LABEL_STYLE}>{label}</div>

        <div style={TILE_DETAIL_STYLE}>{detail}</div>
      </div>

      <div style={TILE_ACTION_STYLE}>{enabled ? "Open" : "Soon"}</div>
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
function ControlButton({ href, label }: ControlButtonProps) {
  return (
    <Link href={href} style={CONTROL_BUTTON_STYLE}>
      {label}
    </Link>
  );
}