/* ==========================================================
   OUTFLO — PROFILE INVITE PAGE (v1)
   File: app/account/profile/invite/page.tsx
   Scope: Render the invite drill-down placeholder page

   Last Touched:
   - unix_ms: 1775666271526
   - iso_utc: 2026-04-08T16:37:51.526Z
   - human: 2026-04-08 16:37:51.526 UTC
   - reason: initial invite surface (profile header wiring)
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import Link from "next/link";

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileInvitePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "24px 20px 40px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 28,
            lineHeight: 1.1,
            fontWeight: 700,
            color: "#ffffff",
          }}
        >
          Invite
        </h1>

        <p
          style={{
            margin: "12px 0 0",
            maxWidth: 560,
            fontSize: 15,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.68)",
          }}
        >
          Invite someone into Outflō. This surface will hold simple sharing and
          referral flows as the account layer expands.
        </p>

        <div style={{ marginTop: 24 }}>
          <Link
            href="/account/profile"
            style={{
              color: "rgba(255,255,255,0.82)",
              textDecoration: "none",
            }}
          >
            ← Back to Profile
          </Link>
        </div>
      </div>
    </main>
  );
}