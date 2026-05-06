"use client";

/* ==========================================================
   OUTFLŌ — APP SHELL
   File: components/system/shell/app/AppShell.tsx
   Scope: Global shell owning frame navigation visibility layered surface root and route swipe
   Last Updated:
   - ms: 1778018872799
   - iso: 2026-05-05T22:07:52.799Z
   - note: remove theme application from app shell
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import Link from "next/link";
import { ReactNode, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSwipe } from "@/hooks/use-swipe";
import { APP_SHELL } from "./app-shell.constants";

/* ------------------------------
   Types
-------------------------------- */
type AppShellProps = {
  children: ReactNode;
};

/* ------------------------------
   Routes
-------------------------------- */
const ROUTES = ["/", "/app/systems", "app/app/time"] as const;

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
function idxOf(pathname: string) {
  const i = ROUTES.indexOf(pathname as (typeof ROUTES)[number]);
  return i === -1 ? 0 : i;
}

/* ------------------------------
   Component
-------------------------------- */
export default function AppShell({ children }: AppShellProps) {
  const router = useRouter();
  const pathname = usePathname();

  const hideNav =
    pathname.startsWith("/app/money/receipts/") ||
    pathname.startsWith("/account/profile");

  const showNav = !hideNav;

  const { left, right } = useMemo(() => {
    const i = idxOf(pathname);
    const left = ROUTES[Math.min(i + 1, ROUTES.length - 1)];
    const right = ROUTES[Math.max(i - 1, 0)];
    return { left, right };
  }, [pathname]);

  const swipe = useSwipe(
    () => {
      if (!hideNav && pathname !== left) router.push(left);
    },
    () => {
      if (!hideNav && pathname !== right) router.push(right);
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
      {children}
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

              <Pill href="/app/time" active={pathname === "/app/app/time"} label="Time" />
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