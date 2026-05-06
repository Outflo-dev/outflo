// app/account/profile/internal/avatar/profile-avatar.client.ts

"use client";

/* ==========================================================
   OUTFLO — PROFILE AVATAR CLIENT WRITE
   File: app/account/profile/internal/avatar/profile-avatar.client.ts
   Scope: Own client-side avatar upload and avatar preference save transport
   Last Updated:
   - ms: 1778071498197
   - iso: 2026-05-06T12:44:58.197Z
   - note: extract avatar write transport from ProfileView
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
        objectUrl: string;
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

function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    if (typeof error === "string") return error;

    return "Avatar save failed.";
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

    const response = await fetch("/api/profile/avatar", {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            avatar_url: data.publicUrl,
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
        objectUrl: data.publicUrl,
    };
}