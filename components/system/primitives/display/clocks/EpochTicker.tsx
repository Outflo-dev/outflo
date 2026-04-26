"use client";

import { useEffect, useState } from "react";
import Text from "@/components/system/primitives/display/type/Text";

export default function EpochTicker({ epochMs }: { epochMs: number }) {
  const [nowMs, setNowMs] = useState(0);

  useEffect(() => {
    const update = () => setNowMs(Date.now());

    update();
    const interval = setInterval(update, 50);
    return () => clearInterval(interval);
  }, []);

  if (nowMs === 0) {
    return (
      <Text
        type="clock"
        style={{
          color: "var(--text-primary)",
          letterSpacing: "0.08em", // temporary override (we’ll move this)
        }}
      >
        0000000000000
      </Text>
    );
  }

  const value = nowMs - epochMs;
  const formatted = String(value).padStart(13, "0");

  return (
    <Text
      type="clock"
      style={{
        color: "var(--text-primary)",
      }}
    >
      {formatted}
    </Text>
  );
}