"use client";

/* ==========================================================
   OUTFLO — PROFILE AVATAR CLIENT WRITE
   File: app/account/profile/internal/avatar/profile-avatar.client.ts
   Scope: Own client-side avatar upload and avatar preference save transport
   Last Updated:
   - ms: 1778540064130
   - iso: 2026-05-11T22:54:24.130Z
   - note: clarify saved avatar URL result and remove unused error helper
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { supabaseBrowser } from "@/lib/supabase/client";

/* ------------------------------
   Types
-------------------------------- */
type SaveProfileAvatarInput = {
    blob: Blob;
};

export type SaveProfileAvatarResult =
    | {
        ok: true;
        avatarUrl: string;
    }
    | {
        ok: false;
        message: string;
        diagnostics?: unknown;
    };

/* ------------------------------
   Helpers
-------------------------------- */
async function readResponseBody(response: Response) {
    const text = await response.text();

    if (!text) return null;

    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
}

/* ------------------------------
   Client Write
-------------------------------- */
export async function saveProfileAvatar({
    blob,
}: SaveProfileAvatarInput): Promise<SaveProfileAvatarResult> {
    const supabase = supabaseBrowser();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return {
            ok: false,
            message: "Unable to load authenticated user.",
            diagnostics: {
                user_error: userError?.message ?? null,
                has_user: Boolean(user),
            },
        };
    }

    const filePath = `${user.id}/avatar-${Date.now()}.jpg`;

    const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, blob, {
            contentType: "image/jpeg",
            upsert: true,
        });

    if (uploadError) {
        return {
            ok: false,
            message: uploadError.message,
        };
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    const avatarUrl = data.publicUrl;

    const response = await fetch("/api/profile/avatar", {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            avatar_url: avatarUrl,
            avatar_mode: "image",
        }),
    });

    if (!response.ok) {
        return {
            ok: false,
            message: "Unable to save avatar.",
            diagnostics: await readResponseBody(response),
        };
    }

    return {
        ok: true,
        avatarUrl,
    };
}