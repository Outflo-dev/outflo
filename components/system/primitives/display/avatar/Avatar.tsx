import type { CSSProperties } from "react";
import { getAvatarCharacter, getAvatarGradient } from "./AvatarGradient";

type AvatarProps = {
  value: string;
  size?: number;
  style?: CSSProperties;
};

export default function Avatar({
  value,
  size = 56,
  style,
}: AvatarProps) {
  const char = getAvatarCharacter(value);
  const gradient = getAvatarGradient(char);

  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
        background: gradient.background,
        color: gradient.color,
        fontFamily: "var(--font-family-base)",
        fontWeight: varFontWeightSemibold(),
        fontSize: Math.round(size * 0.42),
        lineHeight: 1,
        userSelect: "none",
        ...style,
      }}
    >
      {char}
    </div>
  );
}

function varFontWeightSemibold(): number {
  return 600;
}