/* ==========================================================
   OUTFLO — PROFILE HUB PAGE
   File: app/account/profile/page.tsx
   Scope: Render the canonical profile hub for account navigation
   Last Updated:
   - ms: 1774830366184
   - iso: 2026-03-30T00:26:06.184Z
   - note: pass 3 — left alignment, refined edit button, social row, footer alignment, sign-out placement
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";

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
  { label: "Invite Friends", href: "/account/profile/invite" },
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
  pageTop: 24,
  sectionGap: 24,
  stackGap: 16,
  textGap: 12,
  tightGap: 8,
  pageBottom: 40,
  textPrimary: "var(--text-primary)",
  textSecondary: "rgba(255, 254, 250, 0.72)",
  textTertiary: "rgba(255, 254, 250, 0.52)",
  borderSoft: "rgba(255, 254, 250, 0.08)",
  borderRow: "rgba(255, 254, 250, 0.06)",
  surfaceSoft: "rgba(255, 254, 250, 0.04)",
  dangerSoft: "rgba(255, 80, 80, 0.10)",
  dangerBorder: "rgba(255, 80, 80, 0.25)",
  dangerText: "rgba(255, 120, 120, 0.9)",
} as const;

/* ------------------------------
   Helpers
-------------------------------- */
function getDisplayName(user: {
  email?: string | null;
  user_metadata?: Record<string, unknown>;
}) {
  const metadataName =
    typeof user.user_metadata?.display_name === "string"
      ? user.user_metadata.display_name.trim()
      : "";

  if (metadataName) return metadataName;
  if (user.email) return user.email.split("@")[0];
  return "Outflo User";
}

function getUsername(user: { user_metadata?: Record<string, unknown> }) {
  const raw =
    typeof user.user_metadata?.username === "string"
      ? user.user_metadata.username.trim().replace(/^@+/, "")
      : "";

  return raw ? `@${raw}` : "@username";
}

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "O";
}

function getGradientForLetter(letter: string) {
  const gradients = [
    "linear-gradient(135deg, #0f172a 0%, #2563eb 100%)",
    "linear-gradient(135deg, #111827 0%, #7c3aed 100%)",
    "linear-gradient(135deg, #172554 0%, #0ea5e9 100%)",
    "linear-gradient(135deg, #1f2937 0%, #14b8a6 100%)",
    "linear-gradient(135deg, #312e81 0%, #ec4899 100%)",
    "linear-gradient(135deg, #3f3f46 0%, #f59e0b 100%)",
  ] as const;

  const index = letter.charCodeAt(0) % gradients.length;
  return gradients[index];
}

/* ------------------------------
   Component
-------------------------------- */
export default async function ProfilePage() {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getUser();

  const user = data.user!;

  const displayName = getDisplayName(user);
  const username = getUsername(user);
  const initial = getInitial(displayName);
  const avatarBackground = getGradientForLetter(initial);

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
           UI: Profile — Identity
        -------------------------------- */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: UI.stackGap,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: UI.stackGap,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: UI.tightGap,
                flexShrink: 0,
              }}
            >
              <Link
                href="/account/profile/edit"
                aria-label="Edit profile photo"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  textDecoration: "none",
                  color: UI.textPrimary,
                  background: avatarBackground,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {initial}
              </Link>

              <Link
                href="/account/profile/edit"
                style={{
                  minHeight: 32,
                  padding: "0 12px",
                  borderRadius: 999,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  color: UI.textPrimary,
                  background: UI.surfaceSoft,
                  border: `1px solid ${UI.borderSoft}`,
                  fontSize: 12,
                  lineHeight: 1,
                }}
              >
                Edit Profile
              </Link>
            </div>

            <div
              style={{
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                gap: UI.tightGap,
                paddingTop: 4,
              }}
            >
              <h1
                style={{
                  margin: 0,
                  color: UI.textPrimary,
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: 1.4,
                }}
              >
                {displayName}
              </h1>

              <p
                style={{
                  margin: 0,
                  color: UI.textSecondary,
                  fontSize: 12,
                }}
              >
                {username}
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------
           UI: Profile — Navigation
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
                  padding: "0 16px",
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