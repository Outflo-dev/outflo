/* ==========================================================
   OUTFLO — APP ROOT
   File: app/app/page.tsx
   Scope: Render authenticated app root
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import Link from "next/link";

/* ------------------------------
   Page
-------------------------------- */
export default function AppRootPage() {
  return (
    <main
      style={{
        minHeight: "100svh",
        backgroundColor: "black",
        color: "white",
        display: "grid",
        placeItems: "center",
        padding: "max(24px, 6vh) 0px", // vertical only; global frame owns horizontal
        width: "100%",
      }}
    >
      <section
        style={{
          width: "100%",
          display: "grid",
          rowGap: "clamp(24px, 4vh, 40px)",
          boxSizing: "border-box",
        }}
      >
        {/* Brand */}
        <div style={{ fontSize: 13, opacity: 0.7 }}>Outflō</div>

        {/* App Core */}
        <div style={{ display: "grid", rowGap: 10 }}>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            App
          </div>

          <div style={{ fontSize: 13, opacity: 0.5 }}>
            Authenticated runtime root
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", gap: 16 }}>
          <Link
            href="/app/systems"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: 13,
            }}
          >
            Systems →
          </Link>

          <Link
            href="/account/profile"
            style={{
              color: "white",
              opacity: 0.7,
              textDecoration: "none",
              fontSize: 13,
            }}
          >
            Profile →
          </Link>
        </div>
      </section>
    </main>
  );
}