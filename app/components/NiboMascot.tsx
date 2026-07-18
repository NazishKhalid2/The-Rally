type NiboMascotProps = {
  color?: "navy" | "purple";
  size?: number;
};

const palette = {
  navy: { light: "#5B72D6", dark: "#1B2A4A" },
  purple: { light: "#B49CF5", dark: "#7C5CFC" },
};

export default function NiboMascot({
  color = "navy",
  size = 110,
}: NiboMascotProps) {
  const c = palette[color];
  const gradId = `nibo-grad-${color}`;

  return (
    <svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 120 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.light} />
          <stop offset="100%" stopColor={c.dark} />
        </linearGradient>
      </defs>

      {/* sparkle */}
      <path
        d="M97 12 L99 18 L105 20 L99 22 L97 28 L95 22 L89 20 L95 18 Z"
        fill="#FFD86B"
      />

      {/* ears */}
      <circle cx="34" cy="32" r="13" fill={`url(#${gradId})`} />
      <circle cx="86" cy="32" r="13" fill={`url(#${gradId})`} />

      {/* waving arm */}
      <path
        d="M92 78 C108 70 113 54 106 43"
        stroke={c.dark}
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="106" cy="43" r="7" fill={c.dark} />

      {/* body */}
      <path
        d="M60 22 C89 22 99 56 99 80 C99 109 84 130 60 130
           C36 130 21 109 21 80 C21 56 31 22 60 22 Z"
        fill={`url(#${gradId})`}
      />

      {/* blush */}
      <ellipse cx="40" cy="90" rx="7" ry="4.5" fill="#F5A9B8" opacity="0.65" />
      <ellipse cx="80" cy="90" rx="7" ry="4.5" fill="#F5A9B8" opacity="0.65" />

      {/* eyes */}
      <circle cx="45" cy="78" r="5.5" fill="#1A1A2E" />
      <circle cx="47" cy="76" r="1.4" fill="white" />
      <circle cx="75" cy="78" r="5.5" fill="#1A1A2E" />
      <circle cx="77" cy="76" r="1.4" fill="white" />

      {/* mouth */}
      <path
        d="M51 92 Q60 98 69 92"
        stroke="#7A3B4A"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}