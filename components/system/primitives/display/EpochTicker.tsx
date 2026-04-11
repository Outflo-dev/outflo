"use client";

import { useEffect, useState } from "react";

export default function EpochTicker({ epochMs }: { epochMs: number }) {
  const [nowMs, setNowMs] = useState(0);

  useEffect(() => {
    const update = () => setNowMs(Date.now());

    update(); // run once immediately

    const interval = setInterval(update, 50);
    return () => clearInterval(interval);
  }, []);

  if (nowMs === 0) {
    return (
      <div
        style={{
          fontSize: 11,
          color: "#FFFEFA",
          letterSpacing: "0.08em",
        }}
      >
        0000000000000
      </div>
    );
  }

  const value = nowMs - epochMs;
  const formatted = String(value).padStart(13, "0");

  return (
    <div
      style={{
        fontSize: 11,
        color: "#FFFEFA",
        letterSpacing: "0.08em",
      }}
    >
      {formatted}
    </div>
  );
}