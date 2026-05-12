"use client";

/* ==========================================================
   OUTFLO — PROFILE AVATAR CROP HOOK
   File: app/account/profile/internal/avatar/useProfileAvatarCrop.ts
   Scope: Own profile avatar crop state, save action, and refresh handoff
   Last Updated:
   - ms: 1778540064130
   - iso: 2026-05-11T22:54:24.130Z
   - note: revoke only local crop source URL after avatar save
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useState } from "react";
import { useRouter } from "next/navigation";

import type { MediaCropResult } from "@/components/system/surfaces/media-crop/media-crop.types";
import { saveProfileAvatar } from "./profile-avatar.client";

/* ------------------------------
   Hook
-------------------------------- */
export function useProfileAvatarCrop() {
    const router = useRouter();
    const [cropSourceUrl, setCropSourceUrl] = useState<string | null>(null);

    function handleSelectAvatarFile(file: File) {
        if (cropSourceUrl) {
            URL.revokeObjectURL(cropSourceUrl);
        }

        setCropSourceUrl(URL.createObjectURL(file));
    }

    function handleCancelCrop() {
        if (cropSourceUrl) {
            URL.revokeObjectURL(cropSourceUrl);
        }

        setCropSourceUrl(null);
    }

    async function handleSaveCrop(result: MediaCropResult) {
        const saveResult = await saveProfileAvatar({
            blob: result.blob,
        });

        if (!saveResult.ok) {
            console.error(saveResult.message, saveResult.diagnostics);
            return;
        }

        if (cropSourceUrl) {
            URL.revokeObjectURL(cropSourceUrl);
        }

        setCropSourceUrl(null);
        router.refresh();
    }

    return {
        cropSourceUrl,
        handleSelectAvatarFile,
        handleCancelCrop,
        handleSaveCrop,
    };
}