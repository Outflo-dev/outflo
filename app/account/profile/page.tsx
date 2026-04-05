/* ==========================================================
   OUTFLO — PROFILE HUB PAGE
   File: app/account/profile/page.tsx
   Scope: Render the canonical profile hub for account navigation
   Last Updated:
   - ms: 1774830366184
   - iso: 2026-03-30T00:26:06.184Z
   - note: wire identity block to user_identity_assets and align top profile actions
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
  pillSurface: "rgba(255, 254, 250, 0.10)",
  pillBorder: "rgba(255, 254, 250, 0.10)",
  iconSurface: "rgba(255, 254, 250, 0.08)",
  dangerSoft: "rgba(255, 80, 80, 0.10)",
  dangerBorder: "rgba(255, 80, 80, 0.25)",
  dangerText: "rgba(255, 120, 120, 0.9)",
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

function getGradientForLetter(letter: string) {
  const gradients = [
    "linear-gradient(135deg, #f5d94a 0%, #f5d94a 100%)",
    "linear-gradient(135deg, #f5d94a 0%, #f5d94a 100%)",
    "linear-gradient(135deg, #f5d94a 0%, #f5d94a 100%)",
  ] as const;

  const index = letter.charCodeAt(0) % gradients.length;
  return gradients[index];
}

function CircleIcon({
  children,
  size = 56,
}: {
  children: React.ReactNode;
  size?: number;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        background: UI.iconSurface,
        border: `1px solid ${UI.borderSoft}`,
        color: UI.textPrimary,
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
            padding: "0 16px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link
              href="/app/home"
              aria-label="Close profile"
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                textDecoration: "none",
                color: UI.textPrimary,
                background: UI.iconSurface,
                border: `1px solid ${UI.borderSoft}`,
                fontSize: 28,
                lineHeight: 1,
              }}
            >
              ×
            </Link>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  background: UI.iconSurface,
                  border: `1px solid ${UI.borderSoft}`,
                  color: UI.textPrimary,
                  fontSize: 22,
                }}
              >
                ⌁
              </div>

              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  background: UI.iconSurface,
                  border: `1px solid ${UI.borderSoft}`,
                  color: UI.textPrimary,
                  fontSize: 24,
                }}
              >
                ↗
              </div>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              width: 104,
              height: 104,
            }}
          >
            <Link
              href="/account/profile/edit"
              aria-label="Edit profile photo"
              style={{
                width: 104,
                height: 104,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                textDecoration: "none",
                color: "#000",
                background: avatarBackground,
                fontSize: 44,
                fontWeight: 600,
                overflow: "hidden",
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
                right: -2,
                bottom: -2,
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                textDecoration: "none",
                color: UI.textPrimary,
                background: "rgba(20,20,20,1)",
                border: `1px solid ${UI.borderSoft}`,
                fontSize: 18,
                lineHeight: 1,
              }}
            >
              📷
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <h1
              style={{
                margin: 0,
                color: UI.textPrimary,
                fontSize: 44,
                fontWeight: 600,
                letterSpacing: -1.5,
                lineHeight: 1.05,
              }}
            >
              {fullName}
            </h1>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              {username ? (
                <div
                  style={{
                    minHeight: 44,
                    padding: "0 18px",
                    borderRadius: 999,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: UI.pillSurface,
                    border: `1px solid ${UI.pillBorder}`,
                    color: UI.textPrimary,
                    fontSize: 16,
                    fontWeight: 600,
                    userSelect: "text",
                    WebkitUserSelect: "text",
                  }}
                >
                  {username} <span style={{ marginLeft: 8, fontSize: 14 }}>⌄</span>
                </div>
              ) : null}

              <Link
                href="/account/profile/edit"
                style={{
                  minHeight: 44,
                  padding: "0 18px",
                  borderRadius: 999,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  background: UI.pillSurface,
                  border: `1px solid ${UI.pillBorder}`,
                  color: UI.textPrimary,
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                Edit profile
              </Link>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                paddingTop: 8,
              }}
            >
              <Link
                href="/account/profile/edit"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  textDecoration: "none",
                  color: UI.textPrimary,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    minWidth: 0,
                  }}
                >
                  <CircleIcon size={64}>
                    <span style={{ fontSize: 24 }}>📷</span>
                  </CircleIcon>

                  <div
                    style={{
                      minWidth: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: UI.textPrimary,
                        lineHeight: 1.2,
                      }}
                    >
                      Add a profile photo
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: UI.textSecondary,
                        lineHeight: 1.35,
                      }}
                    >
                      Help people find you
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    color: UI.textPrimary,
                    fontSize: 30,
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  ›
                </div>
              </Link>

              <Link
                href="/account/profile/invite"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  textDecoration: "none",
                  color: UI.textPrimary,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      background: "#19ff19",
                      color: "#000",
                      fontSize: 34,
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    +
                  </div>

                  <div
                    style={{
                      minWidth: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: UI.textPrimary,
                        lineHeight: 1.2,
                      }}
                    >
                      Invite friends
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: UI.textSecondary,
                        lineHeight: 1.35,
                      }}
                    >
                      Get $15
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    color: UI.textPrimary,
                    fontSize: 30,
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  ›
                </div>
              </Link>
            </div>
          </div>
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