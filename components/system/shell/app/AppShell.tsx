"use client";

/* ==========================================================
   OUTFLŌ — APP SHELL
   File: components/system/shell/app/AppShell.tsx
   Scope: Global shell owning frame navigation visibility layered surface root and route swipe
   Last Updated:
   - ms: 1778467797659
   - iso: 2026-05-11T02:49:57.659Z
   - note: delegate route visual handoff to app route transition owner
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type React from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useSwipe } from "@/hooks/use-swipe";
import { APP_SHELL } from "./app-shell.constants";
import AppRouteTransition from "./AppRouteTransition";

/* ------------------------------
   Types
-------------------------------- */
type AppShellProps = {
  children: ReactNode;
};

/* ------------------------------
   Routes
-------------------------------- */
const ROUTES = ["/", "/app/systems", "/app/time"] as const;

/* ------------------------------
   Constants
-------------------------------- */
const NAV_WRAP_STYLE: React.CSSProperties = {
  position: "fixed",
  left: 0,
  right: 0,
  bottom: "calc(18px + env(safe-area-inset-bottom))",
  zIndex: 50,
  display: "flex",
  justifyContent: "center",
  pointerEvents: "none",
};

const NAV_INNER_STYLE: React.CSSProperties = {
  width: "100%",
  maxWidth: APP_SHELL.maxWidth,
  paddingLeft: `calc(${APP_SHELL.gutterX}px + env(safe-area-inset-left))`,
  paddingRight: `calc(${APP_SHELL.gutterX}px + env(safe-area-inset-right))`,
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
};

const PILL_GROUP_STYLE: React.CSSProperties = {
  pointerEvents: "auto",
  display: "flex",
  gap: 10,
  padding: "10px 12px",
  borderRadius: 999,
  border: "1px solid var(--border-soft)",
  background: "var(--surface-muted)",
  backdropFilter: "blur(10px)",
};

const LAYER_ROOT_STYLE: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 40,
  pointerEvents: "none",
};

/* ------------------------------
   Helpers
-------------------------------- */
function isSwipeRoute(pathname: string) {
  return ROUTES.includes(pathname as (typeof ROUTES)[number]);
}

function idxOf(pathname: string) {
  return ROUTES.indexOf(pathname as (typeof ROUTES)[number]);
}

/* ------------------------------
   Component
-------------------------------- */
export default function AppShell({ children }: AppShellProps) {
  const router = useRouter();
  const pathname = usePathname();

  const canRouteSwipe = isSwipeRoute(pathname);

  const hideNav =
    pathname === "/app" ||
    pathname === "/app/systems" ||
    pathname === "/tools/compression" ||
    pathname.startsWith("/app/money/receipts/") ||
    pathname.startsWith("/account/profile");

  const showNav = !hideNav;
  const disableRouteSwipe = !canRouteSwipe || pathname.startsWith("/tools");

  const { left, right } = useMemo(() => {
    const i = idxOf(pathname);

    return {
      left: ROUTES[Math.min(i + 1, ROUTES.length - 1)],
      right: ROUTES[Math.max(i - 1, 0)],
    };
  }, [pathname]);

  const swipe = useSwipe(
    () => {
      if (!hideNav && !disableRouteSwipe && pathname !== left) {
        router.push(left);
      }
    },
    () => {
      if (!hideNav && !disableRouteSwipe && pathname !== right) {
        router.push(right);
      }
    }
  );

  return (
    <div
      {...swipe}
      style={{
        minHeight: "100dvh",
        width: "100%",
        overflowX: "clip",
        position: "relative",
        touchAction: "pan-y",
      }}
    >
      <div id="surface-layer-root" style={LAYER_ROOT_STYLE} />

      <AppRouteTransition pathname={pathname}>{children}</AppRouteTransition>

      {showNav ? (
        <nav style={NAV_WRAP_STYLE}>
          <div style={NAV_INNER_STYLE}>
            <div style={PILL_GROUP_STYLE}>
              <Pill href="/" active={pathname === "/"} label="Portal" />

              <Pill
                href="/app/systems"
                active={pathname === "/app/systems"}
                label="Systems"
              />

              <Pill
                href="/app/time"
                active={pathname === "/app/time"}
                label="Time"
              />
            </div>
          </div>
        </nav>
      ) : null}
    </div>
  );
}

/* ------------------------------
   Subcomponents
-------------------------------- */
function Pill({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        color: "var(--text-primary)",
        fontSize: 12,
        opacity: active ? 1 : 0.55,
        padding: "8px 12px",
        borderRadius: 999,
        border: active
          ? "1px solid var(--border-soft)"
          : "1px solid transparent",
        background: active ? "var(--surface-soft)" : "transparent",
      }}
    >
      {label}
    </Link>
  );
}