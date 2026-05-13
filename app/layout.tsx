/* ==========================================================
   OUTFLO — ROOT LAYOUT
   File: app/layout.tsx
   Scope: Global frame, metadata, viewport contract, and theme runtime
   Last Updated:
   - ms: 1778018872799
   - iso: 2026-05-05T22:07:52.799Z
   - note: apply persisted theme preference across all route namespaces
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { supabaseServer } from "@/lib/supabase/server";
import { resolveDisplayPreferences } from "@/lib/app-state/display-preferences";
import { resolveThemePreference } from "@/lib/app-state/theme-preference";
import AppDisplayPreferences from "@/components/system/shell/app/AppDisplayPreferences";
import AppTheme from "@/components/system/shell/app/AppTheme";
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
   Types
-------------------------------- */
type PreferenceRow = {
  theme_preference: string | null;
  text_scale: string | null;
  glow_preference: string | null;
};

/* ------------------------------
   Constants
-------------------------------- */
const BODY_STYLE: React.CSSProperties = {
  minHeight: "100dvh",
  width: "100%",
  overflowX: "hidden",
  background: "var(--bg-primary)",
  color: "var(--text-primary)",
};

/* ------------------------------
   Layout
-------------------------------- */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let themePreference = resolveThemePreference(null);
  let displayPreferences = resolveDisplayPreferences(null);

  if (user) {
    const { data: preferences } = await supabase
      .from("user_preferences")
      .select("theme_preference, text_scale, glow_preference")
      .eq("user_id", user.id)
      .maybeSingle<PreferenceRow>();

    themePreference = resolveThemePreference(preferences?.theme_preference);
    displayPreferences = resolveDisplayPreferences(preferences);
  }

  return (
    <html
      lang="en"
      className={ibmPlexSans.className}
      data-theme={themePreference}
      data-text-scale={displayPreferences.textScale}
      data-glow={displayPreferences.glowPreference}
    >
      <body style={BODY_STYLE}>
        <AppTheme themePreference={themePreference}>
          <AppDisplayPreferences
            textScale={displayPreferences.textScale}
            glowPreference={displayPreferences.glowPreference}
          >
            {children}
          </AppDisplayPreferences>
        </AppTheme>
      </body>
    </html>
  );
}