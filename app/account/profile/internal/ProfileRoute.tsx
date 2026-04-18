"use client";

/* ==========================================================
   OUTFLO — PROFILE ROUTE
   File: app/account/profile/internal/ProfileRoute.tsx
   Scope: Route-level handoff into profile controller
   Last Updated:
   - ms: 1776471084070
   - iso: 2026-04-18T00:11:24.070Z
   - note: stripped route layer, delegating full ownership to controller
   ========================================================== */

import ProfileController from "./ProfileController";
import type { ProfileRouteProps } from "./profile.types";

export default function ProfileRoute(props: ProfileRouteProps) {
  return <ProfileController {...props} />;
}