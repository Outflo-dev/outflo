/* ==========================================================
   OUTFLO — SUPABASE SERVER CLIENT
   File: lib/supabase/server.ts
   Scope: Create the cookie-aware Supabase server client for server-side auth reads and protected writes
   Last Updated:
   - ms: 1778090000000
   - iso: 2026-05-06T00:00:00.000Z
   - note: clarify server auth cookie ownership for protected mobile writes
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/* ------------------------------
   Client
-------------------------------- */
export async function supabaseServer() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );
}







