"use client";

/* ==========================================================
   OUTFLO — PROFILE ACCOUNT SECTION
   File: app/account/profile/view/ProfileAccountSection.tsx
   Scope: Render the primary account navigation list for the profile route
   Last Updated:
   - ms: 1778720709456
   - iso: 2026-05-14T01:05:09.456Z
   - note: add quiet profile menu marks and larger chevron rhythm
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import Link from "next/link";

import Chevron from "@/components/system/primitives/navigation/chevron/Chevron";
import Text from "@/components/system/primitives/display/type/Text";
import { COLOR } from "@/components/system/primitives/color/color.config";
import type { ProfileMenuMarkKind } from "../internal/profile.types";

/* ------------------------------
   Types
-------------------------------- */
type ProfileAccountItem = {
  label: string;
  href: string;
  description?: string;
  mark: ProfileMenuMarkKind;
};

type ProfileAccountSectionProps = {
  items: readonly ProfileAccountItem[];
  sectionGap: number;
};

/* ------------------------------
   Constants
-------------------------------- */
const NAV_STYLE: CSSProperties = {};

const ROW_STYLE: CSSProperties = {
  minHeight: 78,
  display: "grid",
  gridTemplateColumns: "52px 1fr auto",
  alignItems: "center",
  columnGap: 20,
  textDecoration: "none",
  color: COLOR.text.primary,
};

const ROW_DIVIDER_STYLE: CSSProperties = {
  borderBottom: `1px solid ${COLOR.border.row}`,
};

const MARK_WRAP_STYLE: CSSProperties = {
  width: 34,
  height: 34,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: COLOR.text.primary,
};

const TEXT_WRAP_STYLE: CSSProperties = {
  minWidth: 0,
  display: "grid",
  rowGap: 5,
};

const LABEL_STYLE: CSSProperties = {
  color: COLOR.text.primary,
};

const DESCRIPTION_STYLE: CSSProperties = {
  color: COLOR.text.secondary,
};

const CHEVRON_WRAP_STYLE: CSSProperties = {
  minWidth: 34,
  minHeight: 34,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "flex-end",
  color: COLOR.text.secondary,
};

const MARK_ICON_STYLE: CSSProperties = {
  display: "block",
};

/* ------------------------------
   Marks
-------------------------------- */
function ProfileMenuMark({ mark }: { mark: ProfileMenuMarkKind }) {
  if (mark === "account") return <AccountMark />;
  if (mark === "flows") return <FlowsMark />;
  if (mark === "settings") return <SettingsMark />;
  if (mark === "records") return <RecordsMark />;

  return <SupportMark />;
}

function AccountMark() {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={MARK_ICON_STYLE}
    >
      <circle cx="11" cy="8" r="3.2" />
      <path d="M5.6 18.1c.9-3 2.8-4.5 5.4-4.5s4.5 1.5 5.4 4.5" />
    </svg>
  );
}

function FlowsMark() {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={MARK_ICON_STYLE}
    >
      <path d="M4.5 13.5c2.8 2.8 6.2 2.8 9 0s2.8-6.2 0-9" />
      <path d="M17.5 8.5c-2.8-2.8-6.2-2.8-9 0s-2.8 6.2 0 9" />
      <path d="M15.5 4.5h-2.8v2.8" />
      <path d="M6.5 17.5h2.8v-2.8" />
    </svg>
  );
}

function SettingsMark() {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={MARK_ICON_STYLE}
    >
      <circle cx="11" cy="11" r="3.3" />
      <path d="M11 3.5v2" />
      <path d="M11 16.5v2" />
      <path d="M18.5 11h-2" />
      <path d="M5.5 11h-2" />
    </svg>
  );
}

function RecordsMark() {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={MARK_ICON_STYLE}
    >
      <path d="M7 4.5h8a1.5 1.5 0 0 1 1.5 1.5v11.5l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2-2 1.2V6A1.5 1.5 0 0 1 7 4.5Z" />
      <path d="M8 9h6" />
      <path d="M8 12h5" />
    </svg>
  );
}

function SupportMark() {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={MARK_ICON_STYLE}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M9.2 8.9a2 2 0 1 1 3.2 1.6c-.8.6-1.4 1.1-1.4 2.1" />
      <path d="M11 15.5h.01" />
    </svg>
  );
}

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileAccountSection({
  items,
  sectionGap,
}: ProfileAccountSectionProps) {
  return (
    <section
      style={{
        marginTop: sectionGap,
      }}
    >
      <div
        style={{
          display: "grid",
          rowGap: 6,
          marginBottom: 18,
        }}
      >
        <Text as="h1" type="label" style={{ color: COLOR.text.primary }}>
          Profile
        </Text>

        <Text type="meta" style={{ color: COLOR.text.secondary }}>
          Identity, controls, and system surfaces.
        </Text>
      </div>

      <nav aria-label="Profile navigation" style={NAV_STYLE}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                ...ROW_STYLE,
                ...(isLast ? null : ROW_DIVIDER_STYLE),
              }}
            >
              <span style={MARK_WRAP_STYLE} aria-hidden="true">
                <ProfileMenuMark mark={item.mark} />
              </span>

              <span style={TEXT_WRAP_STYLE}>
                <Text type="label" style={LABEL_STYLE}>
                  {item.label}
                </Text>

                {item.description ? (
                  <Text type="meta" style={DESCRIPTION_STYLE}>
                    {item.description}
                  </Text>
                ) : null}
              </span>

              <span style={CHEVRON_WRAP_STYLE} aria-hidden="true">
                <Chevron
                  direction="right"
                  color="currentColor"
                  strokeWidth={1.95}
                />
              </span>
            </Link>
          );
        })}
      </nav>
    </section>
  );
}