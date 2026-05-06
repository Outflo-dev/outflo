/* ==========================================================
   OUTFLO — SUPABASE AUTH MIDDLEWARE
   File: middleware.ts
   Scope: Refresh Supabase SSR auth cookies for server and API route hydration
   Last Updated:
   - ms: 1778033477722
   - iso: 2026-05-06T02:11:17.722Z
   - note: add Supabase SSR middleware session refresh owner
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/* ------------------------------
   Middleware
-------------------------------- */
export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => {
                        request.cookies.set(name, value);
                    });

                    response = NextResponse.next({
                        request,
                    });

                    cookiesToSet.forEach(({ name, value, options }) => {
                        response.cookies.set(name, value, options);
                    });
                },
            },
        }
    );

    await supabase.auth.getUser();

    return response;
}

/* ------------------------------
   Config
-------------------------------- */
export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};