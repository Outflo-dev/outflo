/* ==========================================================
   OUTFLO — PROFILE THEME API
   File: app/api/profile/theme/route.ts
   Scope: Persist authenticated user theme preference
   Last Updated:
   - ms: 1778033477722
   - iso: 2026-05-06T02:11:17.722Z
   - note: add PATCH auth diagnostics for mobile session hydration
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isThemePreference } from "@/lib/app-state/theme-preference";
import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------
   Route
-------------------------------- */
export async function PATCH(req: Request) {
    const cookieStore = await cookies();
    const cookieNames = cookieStore.getAll().map((cookie) => cookie.name);

    const supabase = await supabaseServer();

    const {
        data: { user: cookieUser },
        error: cookieUserError,
    } = await supabase.auth.getUser();

    let user = cookieUser;

    const authorization = req.headers.get("authorization");
    const token = authorization?.startsWith("Bearer ")
        ? authorization.slice("Bearer ".length)
        : null;

    let tokenUserErrorMessage: string | null = null;

    if (!user && token) {
        const {
            data: { user: tokenUser },
            error: tokenUserError,
        } = await supabase.auth.getUser(token);

        user = tokenUser;
        tokenUserErrorMessage = tokenUserError?.message ?? null;
    }

    if (!user) {
        return NextResponse.json(
            {
                error: "Unauthorized",
                diagnostics: {
                    cookie_count: cookieNames.length,
                    cookie_names: cookieNames,
                    has_sb_cookie: cookieNames.some((name) =>
                        name.startsWith("sb-")
                    ),
                    has_auth_token_cookie: cookieNames.some((name) =>
                        name.includes("auth-token")
                    ),
                    has_authorization_header: Boolean(authorization),
                    has_bearer_token: Boolean(token),
                    cookie_user_error: cookieUserError?.message ?? null,
                    token_user_error: tokenUserErrorMessage,
                },
            },
            { status: 401 }
        );
    }

    const body = await req.json();
    const themePreference = body.theme_preference;

    if (!isThemePreference(themePreference)) {
        return NextResponse.json(
            { error: "Invalid theme_preference." },
            { status: 400 }
        );
    }

    const { error } = await supabase.from("user_preferences").upsert(
        {
            user_id: user.id,
            theme_preference: themePreference,
            updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
    );

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
}