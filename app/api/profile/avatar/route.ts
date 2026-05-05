/* ==========================================================
   OUTFLO — PROFILE AVATAR API
   File: app/api/profile/avatar/route.ts
   Scope: Persist authenticated user avatar identity fields
   Last Updated:
   - ms: 1777945233407
   - iso: 2026-05-05T01:40:33.407Z
   - note: add isolated avatar persistence route
   ========================================================== */


import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------
   Types
-------------------------------- */
type AvatarMode = "image" | "initial";

type IdentityRow = {
    first_name: string;
    last_name: string | null;
};

/* ------------------------------
   Constants
-------------------------------- */
const AVATAR_MODES = ["image", "initial"] as const;

/* ------------------------------
   Helpers
-------------------------------- */
function isAvatarMode(value: unknown): value is AvatarMode {
    return typeof value === "string" && AVATAR_MODES.includes(value as AvatarMode);
}

function getFallbackFirstName(email: string | undefined) {
    return email?.split("@")[0]?.trim() || "Outflo";
}

/* ------------------------------
   Route
-------------------------------- */
export async function PATCH(req: Request) {
    const supabase = await supabaseServer();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const avatarMode = body.avatar_mode;
    const hasAvatarUrl = Object.prototype.hasOwnProperty.call(body, "avatar_url");

    if (!isAvatarMode(avatarMode)) {
        return NextResponse.json(
            { error: "Invalid avatar_mode" },
            { status: 400 }
        );
    }

    const avatarUrl =
        typeof body.avatar_url === "string" && body.avatar_url.trim()
            ? body.avatar_url.trim()
            : null;

    if (avatarMode === "image" && !avatarUrl) {
        return NextResponse.json(
            { error: "Avatar URL is required for image mode." },
            { status: 400 }
        );
    }

    const { data: identity, error: identityError } = await supabase
        .from("user_identity_assets")
        .select("first_name, last_name")
        .eq("user_id", user.id)
        .maybeSingle<IdentityRow>();

    if (identityError) {
        return NextResponse.json(
            { error: identityError.message },
            { status: 500 }
        );
    }

    const payload: {
        user_id: string;
        first_name: string;
        last_name: string | null;
        avatar_mode: AvatarMode;
        avatar_url?: string | null;
        updated_at: string;
    } = {
        user_id: user.id,
        first_name: identity?.first_name ?? getFallbackFirstName(user.email),
        last_name: identity?.last_name ?? null,
        avatar_mode: avatarMode,
        updated_at: new Date().toISOString(),
    };

    if (hasAvatarUrl) {
        payload.avatar_url = avatarUrl;
    }

    const { error } = await supabase
        .from("user_identity_assets")
        .upsert(payload, { onConflict: "user_id" });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
}