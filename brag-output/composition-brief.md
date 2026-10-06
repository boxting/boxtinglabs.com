# Hyperframes Composition Brief: Boxting Labs

## Objective
A 5s seamless GIF-style loop for LinkedIn. No title card.

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4` (+ `brag.gif`)
- Format: landscape 1920x1080, 30fps
- Duration: 5s (user override)

## Source Material
- Project root: repo root
- Files read: `src/i18n/ui.ts` (hero copy), `public/svg/frames/{agent,server,web}.svg`, `assets/og/og-image-es.svg`, `DESIGN.md`, `tools/brand-images.mjs`
- Copy that must appear verbatim:
  - El software se adapta a tu proceso.
  - No al revés.
  - Agente IA · Disponible 24/7 / Servidor · AWS · GCP / Web · Apps y plataformas
  - boxtinglabs.com

## Creative Direction
- Tone: polished, quiet premium loop
- Hook: the headline types itself while the agent card answers
- Avoid: generic SaaS language, abstract filler, a redesign of the brand

## Visual Identity
- Background #08090B with ambient glows; text #F8F3EB; accent #FE5D1C→#FF8D5C; mint #7CD6B4; sky #7DA3FF
- Instrument Serif (display), DM Sans, DM Mono, all self-hosted in `assets/fonts/`

## Storyboard
See `brag-plan.md` (single 5s scene).

## Audio
Intentional silence (GIF-style, autoplays muted).
