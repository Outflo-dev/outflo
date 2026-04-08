/* ==========================================================
   OUTFLO — ROOT LAYOUT
   File: app/layout.tsx
   Scope: Global frame, metadata, and viewport contract
   Last Updated:
   - ms: 1775672111393
   - iso: 2026-04-08T18:15:11.393Z
   - note: replace legacy swipe shell with app shell ownership
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import AppShell from "@/components/navigation/shell/AppShell";
import "./globals.css";

/* ------------------------------
   Fonts
-------------------------------- */
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/* ------------------------------
   Metadata
-------------------------------- */
export const metadata: Metadata = {
  title: "Outflō",
  description: "Returns what leaves you",
  applicationName: "Outflō",
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/favicon.png" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  appleWebApp: {
    capable: true,
    title: "Outflo",
    statusBarStyle: "black-translucent",
  },
};

/* ------------------------------
   Viewport
-------------------------------- */
export const viewport: Viewport = {
  themeColor: "#000000",
};

/* ------------------------------
   Constants
-------------------------------- */
const BODY_STYLE: React.CSSProperties = {
  minHeight: "100dvh",
  width: "100%",
  overflowX: "hidden",
  background: "#000000",
  color: "#FFFEFA",
};

const FRAME_STYLE: React.CSSProperties = {
  minHeight: "100dvh",
  width: "100%",
  background: "#000000",
};

const MAIN_STYLE: React.CSSProperties = {
  width: "100%",
  maxWidth: 520,
  margin: "0 auto",
  paddingTop: 16,
  paddingBottom: 16,
  paddingLeft: "calc(16px + env(safe-area-inset-left))",
  paddingRight: "calc(16px + env(safe-area-inset-right))",
  boxSizing: "border-box",
  background: "#000000",
  color: "#FFFEFA",
};

/* ------------------------------
   Layout
-------------------------------- */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ibmPlexSans.className}>
      <body style={BODY_STYLE}>
        <AppShell>
          <div style={FRAME_STYLE}>
            <main style={MAIN_STYLE}>{children}</main>
          </div>
        </AppShell>
      </body>
    </html>
  );
}