type AvatarGradient = {
  background: string;
  color: string;
};

const PALETTE: AvatarGradient[] = [
  {
    background:
      "linear-gradient(135deg, #6D28D9 0%, #7C3AED 38%, #8B5CF6 68%, #A78BFA 100%)",
    color: "#FFFEFA",
  },
  {
    background:
      "linear-gradient(135deg, #4338CA 0%, #4F46E5 40%, #6366F1 72%, #818CF8 100%)",
    color: "#FFFEFA",
  },
  {
    background:
      "linear-gradient(135deg, #1D4ED8 0%, #2563EB 40%, #3B82F6 72%, #60A5FA 100%)",
    color: "#FFFEFA",
  },
  {
    background:
      "linear-gradient(135deg, #0F766E 0%, #0D9488 40%, #14B8A6 72%, #5EEAD4 100%)",
    color: "#FFFEFA",
  },
  {
    background:
      "linear-gradient(135deg, #047857 0%, #059669 40%, #10B981 72%, #6EE7B7 100%)",
    color: "#FFFEFA",
  },
  {
    background:
      "linear-gradient(135deg, #B45309 0%, #D97706 40%, #F59E0B 72%, #FCD34D 100%)",
    color: "#FFFEFA",
  },
  {
    background:
      "linear-gradient(135deg, #BE123C 0%, #E11D48 40%, #F43F5E 72%, #FDA4AF 100%)",
    color: "#FFFEFA",
  },
  {
    background:
      "linear-gradient(135deg, #9D174D 0%, #BE185D 40%, #DB2777 72%, #F472B6 100%)",
    color: "#FFFEFA",
  },
];

const PURPLE_INDEX = 0;

function normalizeChar(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "•";
  return trimmed[0]!.toUpperCase();
}

function getAlphabetIndex(char: string): number {
  const code = char.charCodeAt(0);

  if (code >= 65 && code <= 90) return code - 65;
  if (code >= 48 && code <= 57) return code - 48;

  return 0;
}

export function getAvatarCharacter(value: string): string {
  return normalizeChar(value);
}

export function getAvatarGradient(value: string): AvatarGradient {
  const char = normalizeChar(value);

  if (char === "E") {
    return PALETTE[PURPLE_INDEX];
  }

  const alphabetIndex = getAlphabetIndex(char);
  const paletteIndex = alphabetIndex % PALETTE.length;

  return PALETTE[paletteIndex];
}