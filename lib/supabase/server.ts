/* ==========================================================
   OUTFLO — SUPABASE SERVER CLIENT
   File: lib/supabase/server.ts
   Scope: Create the cookie-aware Supabase server client for server-side auth reads and protected writes
   Last Updated:
   - ms: 1778701972789
   - iso: 2026-05-13T19:52:52.789Z
   - note: guard cookie writes when Supabase server client is used from Server Components
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
            try {
              cookieStore.set(name, value, options);
            } catch {
              // Server Components can read cookies but cannot always write them.
              // Route Handlers and Server Actions own cookie mutation.
            }
          });
        },
      },
    }
  );
}






