"use client";

/* ==========================================================
   OUTFLO — PROFILE CONTROLLER
   ========================================================== */

import { useEffect, useState } from "react";
import ProfileSurface from "@/components/domains/profile/surfaces/ProfileSurface";
import CardSheet from "@/components/system/surfaces/card/CardSheet";

export default function ProfileController({
  show,
  direction,
  fullName,
  username,
  avatarUrl,
  initial,
  epochMs,
}: {
  show: boolean;
  direction: "up" | "down";
  fullName: string;
  username: string | null;
  avatarUrl: string | null;
  initial: string;
  epochMs: number;
}) {
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    function handleOpen() {
      setSheetOpen(true);
    }

    window.addEventListener("outflo:profile-sheet-open", handleOpen);

    return () => {
      window.removeEventListener("outflo:profile-sheet-open", handleOpen);
    };
  }, []);

  return (
    <>
      <ProfileSurface
        show={show}
        direction={direction}
        fullName={fullName}
        username={username}
        avatarUrl={avatarUrl}
        initial={initial}
        epochMs={epochMs}
      />

      <CardSheet show={sheetOpen} onClose={() => setSheetOpen(false)}>
        <div style={{ padding: 20 }}>
          <h3 style={{ margin: 0, marginBottom: 12 }}>Card Sheet</h3>
          <p style={{ margin: 0, opacity: 0.8 }}>
            This is the first live system sheet on profile.
          </p>
        </div>
      </CardSheet>
    </>
  );
}