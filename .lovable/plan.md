# WhatsApp AI Automation — Frontend

Your backend exists; this project is an empty template. Plan: build the public frontend first with a dark "green aurora" look inspired by wareplyai.com — same energy, not a copy — then wire it to your API once you share the endpoints.

## Visual direction

- **Background (the signature):** near-black canvas (`oklch(0.16 0.02 160)`) with a wide radial emerald glow rising from the lower center, two large soft organic blobs bleeding in from the left and right edges, and thin curved hairlines arcing through them. Built with layered CSS radial gradients plus one inline SVG blob layer, so it scales and stays crisp — no image assets. Subtle grain overlay to kill gradient banding.
- **Differentiators from the reference:** blobs sit lower and asymmetric (heavy left, light right), the glow is a single vertical column rather than a full wash, and accent green leans slightly teal (`#22e08a`) instead of WhatsApp green, with a secondary lime for highlights.
- **Type:** Space Grotesk for headings (tight tracking, large weights), DM Sans for body. Numbers and API snippets in JetBrains Mono.
- **Components:** floating pill navbar with border glow, glowing primary CTA, bordered stat strip, glass cards with 1px hairline borders, floating status pills ("AI replied · 0.4s") anchored to the hero.
- **Motion:** staggered hero entrance, slow drift on the background blobs, hover lift on cards. All disabled under `prefers-reduced-motion`.

## Pages in this pass

1. `/` — landing: hero + stats, how it works (3 steps), message-type showcase, live chat mock, use cases, pricing, FAQ, footer.
2. `/login` and `/register` — split-screen auth on the same background, forms only (no submit logic yet).

## Technical notes

- Tokens (`--background`, `--primary`, `--accent`, glow/blob gradients, shadows) defined in `src/styles.css` as oklch; no hardcoded colors in components.
- Background implemented once as `<AuroraBackground />` in `src/components/`, reused across routes.
- Fonts loaded via `<link>` in `src/routes/__root.tsx`.
- Per-route `head()` with unique title/description/og tags.
- No backend calls yet — forms and stats use static content.

## Next step after this

Share your API base URL and endpoints (auth, sessions/QR, send message, analytics) and I'll build the dashboard and wire everything up.
