/**
 * Signature background: near-black canvas, a single vertical emerald glow column,
 * two asymmetric organic blobs bleeding in from the edges, and thin arc hairlines.
 */
export function AuroraBackground() {
  return (
    <div aria-hidden className="grain pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base wash */}
      <div className="absolute inset-0 bg-background" />

      {/* upper glow column — icy white bleeding from the top */}
      <div
        className="absolute inset-x-0 top-[-25%] h-[90%]"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 18%, oklch(0.98 0.015 240 / 42%) 0%, oklch(0.9 0.03 240 / 20%) 34%, transparent 72%)",
        }}
      />

      {/* vertical glow column rising from lower centre — icy white */}
      <div
        className="absolute inset-x-0 bottom-[-20%] h-[110%]"
        style={{
          background:
            "radial-gradient(58% 46% at 50% 82%, oklch(0.99 0.01 240 / 45%) 0%, oklch(0.92 0.03 240 / 22%) 32%, transparent 72%)",
        }}
      />

      {/* organic blobs — icy white over slate */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="blobL" cx="30%" cy="60%" r="70%">
            <stop offset="0%" stopColor="oklch(0.98 0.015 240)" stopOpacity="0.45" />
            <stop offset="45%" stopColor="oklch(0.88 0.03 240)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="oklch(0.7 0.03 250)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="blobR" cx="70%" cy="40%" r="70%">
            <stop offset="0%" stopColor="oklch(0.97 0.02 240)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="oklch(0.68 0.025 250)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="drift-slow" style={{ transformOrigin: "0% 70%" }}>
          <path
            d="M-260 250C-40 130 240 240 300 470c60 230-90 470-330 520-240 50-420-120-430-330C-470 450-350 310-260 250Z"
            fill="url(#blobL)"
          />
        </g>
        <g className="drift-slower" style={{ transformOrigin: "100% 55%" }}>
          <path
            d="M1720 180c210 130 200 430 60 610-140 180-420 210-560 90-140-120-120-380 10-540 130-160 280-290 490-160Z"
            fill="url(#blobR)"
          />
        </g>

        {/* hairline arcs — icy white (upper + lower) */}
        <g fill="none" stroke="oklch(0.96 0.02 240)" strokeOpacity="0.14">
          <path d="M-100 120C200 320 420 220 760 200s640 80 820 320" />
          <path d="M-100 900C120 620 300 420 700 380s740 120 900 420" />
          <path d="M-60 980C200 700 420 520 760 500s660 180 820 460" />
          <path d="M120 1000C300 780 520 640 800 620" strokeOpacity="0.09" />
        </g>
      </svg>

      {/* subtle top vignette so the nav floats but the upper glow still reads */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background/80 to-transparent" />
    </div>
  );
}
