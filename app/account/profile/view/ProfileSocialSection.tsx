"use client";

/* ==========================================================
   OUTFLO — PROFILE SOCIAL SECTION
   File: app/account/profile/view/ProfileSocialSection.tsx
   Scope: Render the profile social links row
   Last Updated:
   - ms: 1776475194844
   - iso: 2026-04-18T01:19:54.844Z
   - note: extract social links row from legacy profile surface into route-owned view
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import Link from "next/link";
import { FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";

/* ------------------------------
   Types
-------------------------------- */
type ProfileSocialSectionProps = {
  sectionGap: number;
  textPrimary: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileSocialSection({
  sectionGap,
  textPrimary,
}: ProfileSocialSectionProps) {
  return (
    <section
      style={{
        marginTop: sectionGap * 1.1,
        padding: "0 16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Link
          href="https://x.com"
          target="_blank"
          style={{
            color: textPrimary,
            display: "inline-flex",
          }}
        >
          <FaXTwitter size={18} />
        </Link>

        <Link
          href="https://instagram.com"
          target="_blank"
          style={{
            color: textPrimary,
            display: "inline-flex",
          }}
        >
          <FaInstagram size={18} />
        </Link>

        <Link
          href="https://github.com"
          target="_blank"
          style={{
            color: textPrimary,
            display: "inline-flex",
          }}
        >
          <FaGithub size={18} />
        </Link>
      </div>
    </section>
  );
}