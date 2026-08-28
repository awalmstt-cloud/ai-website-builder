/**
 * Signature background: near-black canvas, a single vertical emerald glow column,
 * two asymmetric organic blobs bleeding in from the edges, and thin arc hairlines.
 */
export function AuroraBackground() {
  return (
    <div aria-hidden className="grain pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base wash */}
      <div className="absolute inset-0 bg-background" />

      {/* vertical glow column rising from lower centre */}
      <div
        className="absolute inset-x-0 bottom-[-20%] h-[110%]"
        style={{
          background:
            "radial-gradient(58% 46% at 50% 82%, var(--glow) 0%, transparent 72%)",
        }}
      />

      {/* organic blobs */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="blobL" cx="30%" cy="60%" r="70%">
            <stop offset="0%" stopColor="oklch(0.78 0.19 158)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="oklch(0.5 0.14 165)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="blobR" cx="70%" cy="40%" r="70%">
            <stop offset="0%" stopColor="oklch(0.7 0.16 150)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="oklch(0.45 0.12 168)" stopOpacity="0" />
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

        {/* hairline arcs */}
        <g fill="none" stroke="oklch(0.85 0.16 158)" strokeOpacity="0.16">
          <path d="M-100 900C120 620 300 420 700 380s740 120 900 420" />
          <path d="M-60 980C200 700 420 520 760 500s660 180 820 460" />
          <path d="M120 1000C300 780 520 640 800 620" strokeOpacity="0.1" />
        </g>
      </svg>

      {/* top vignette so the nav floats over dark */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-background to-transparent" />
    </div>
  );
}
