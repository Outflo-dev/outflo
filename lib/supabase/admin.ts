/* ==========================================================
   OUTFLO — SUPABASE ADMIN CLIENT
   File: lib/supabase/admin.ts
   Scope: Create service-role Supabase client for system-level server operations

   Last Touched:
   - unix_ms: 1774733974979
   - iso_utc: 2026-03-28T21:39:34.979Z
   - human: 2026-03-28 21:39:34.979 UTC
   - reason: introduce admin client for system-level Supabase access after ingest split and schema hardening
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import { createClient } from "@supabase/supabase-js";

/* ------------------------------
   Contract
-------------------------------- */

function getAdminEnv(): {
  url: string;
  serviceRoleKey: string;
} {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Missing Supabase admin environment variables");
  }

  return { url, serviceRoleKey };
}

/* ------------------------------
   Exports
-------------------------------- */

export function createAdminClient() {
  const { url, serviceRoleKey } = getAdminEnv();

  return createClient(url, serviceRoleKey);
}