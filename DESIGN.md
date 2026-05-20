# Boxting Labs — Design System

> **Status** v1.0 · **Updated** May 19, 2026
> **Sources of truth** `brand/assets/*.svg` for marks · this file for tokens
> **Render** `index.html` (live brand guide built from these specs)

This document is the portable specification of the Boxting Labs brand. Every
ecosystem — web, iOS, Android, Figma, LaTeX, Slack, anywhere — should be able
to reproduce the brand by consuming this file. If something here disagrees
with what's in code, **this file wins**.

---

## 1. Identity

|                           |                                                                                           |
| ------------------------- | ----------------------------------------------------------------------------------------- |
| **Name**                  | Boxting Labs                                                                              |
| **Short name**            | boxting                                                                                   |
| **Tagline**               | _Pack big ideas into small boxes._                                                        |
| **Mission**               | A software & AI studio building developer tools, infrastructure, and research prototypes. |
| **Personality**           | Playful, approachable, technical, honest. An engineer who slept well.                     |
| **Domain (illustrative)** | `boxtinglabs.com`                                                                         |
| **Founded**               | 2026 · Lima, Peru                                                                         |

---

## 2. Logo system

The logo is a **folded cube** — an isometric box with two facets carved out.
The wordmark is **`boxting`** set in DM Sans Bold with **`LABS`** as a
tracked-out tag underneath.

### 2.1 Variants

| ID                  | Variant                                      | Use                                                        |
| ------------------- | -------------------------------------------- | ---------------------------------------------------------- |
| `mark-color`        | Cube · orange body, cream cutouts            | **Default.** Light backgrounds.                            |
| `mark-ink`          | Cube · ink body, white cutouts               | Monochrome print, embossing, watermarks.                   |
| `mark-white`        | Cube · white body, ink cutouts               | Dark surfaces, photography, merch.                         |
| `mark-flat-orange`  | Single-color orange silhouette               | Sub-24 px sizes, die-cuts, stickers.                       |
| `mark-flat-ink`     | Single-color ink silhouette                  | Favicons, OG cards, dev-tool toolbars.                     |
| `mark-flat-white`   | Single-color white silhouette                | Tiny on dark, lower-thirds, t-shirts.                      |
| `lockup-vertical`   | Cube above wordmark                          | Square contexts: app icon, poster, deck cover.             |
| `lockup-horizontal` | Cube left of wordmark                        | Wide contexts: site header, email signature, slide footer. |
| `wordmark`          | `boxting` + `LABS`, no cube                  | When the cube is already established.                      |
| `app-icon`          | Cube on rounded-square orange                | iOS/Android home screens.                                  |
| `avatar-round`      | Cube on orange disc                          | Twitter, GitHub, LinkedIn, Slack.                          |
| `favicon`           | Compact rounded-square cube, 32 px-optimized | Browser tab strip.                                         |

All variants exist in **SVG**, **PNG** (1×/2×/4×), and **PDF** under
`brand/assets/` and downloadable from the live brand guide.

### 2.2 Construction

- Cube viewBox: `0 0 144 159` (≈ 1:1.10 portrait).
- App-icon viewBox: `0 0 512 512`, corner radius `115` (= 22.5 % — matches iOS).
- Avatar viewBox: `0 0 512 512`, full circle.
- Favicon viewBox: `0 0 32 32`, corner radius `6`.

### 2.3 Clear space

Reserve a margin equal to **`x`** — the height of the cube's top facet
(~25 % of the mark height) — around the logo on every side. More is fine.
Less is not.

### 2.4 Minimum size

| Variant                | Min width                           |
| ---------------------- | ----------------------------------- |
| Color/ink/white cube   | **24 px** (digital) · 8 mm (print)  |
| Flat single-color cube | **16 px** (digital) · 5 mm (print)  |
| Horizontal lockup      | **96 px** (digital) · 25 mm (print) |
| Vertical lockup        | **64 px** (digital) · 18 mm (print) |

Below these sizes, swap to the flat variant.

### 2.5 Don'ts

- ❌ Stretch, skew, or rotate the mark.
- ❌ Place the color mark on saturated non-brand colors.
- ❌ Add drop shadows, glows, or 3D effects.
- ❌ Re-color the mark or apply gradients.
- ❌ Substitute the wordmark typeface.
- ❌ Reduce mark opacity to "soften" it.

---

## 3. Color

### 3.1 Primary

| Token          | HEX       | RGB           | OKLCH             | CMYK          | Role                                                    |
| -------------- | --------- | ------------- | ----------------- | ------------- | ------------------------------------------------------- |
| `color/orange` | `#FE5D1C` | `254 93 28`   | `67.7% 0.18 41.5` | `0 73 91 0`   | Hero blocks, primary CTAs, the mark itself.             |
| `color/ink`    | `#0F1B2D` | `15 27 45`    | `20.2% 0.03 256`  | `87 76 56 68` | Text, wordmark, dark surfaces. Cool — never pure black. |
| `color/cream`  | `#F8F3EB` | `248 243 235` | `96.2% 0.011 80`  | `2 4 8 0`     | Warm surface. Preferred over white for backgrounds.     |

### 3.2 Accents

| Token        | HEX       | RGB          | OKLCH            | Role                                      |
| ------------ | --------- | ------------ | ---------------- | ----------------------------------------- |
| `color/sky`  | `#2B5CE6` | `43 92 230`  | `55.6% 0.21 263` | Links, info, data viz. Pairs with orange. |
| `color/mint` | `#4FA98A` | `79 169 138` | `65.0% 0.10 162` | Success, growth, "shipped" states.        |
| `color/plum` | `#6E2F66` | `110 47 102` | `36.8% 0.10 339` | Editorial accents, premium tiers.         |

### 3.3 Neutrals

| Token         | HEX                   | Role                                        |
| ------------- | --------------------- | ------------------------------------------- |
| `color/paper` | `#FFFDF9`             | Default page surface (slightly warm white). |
| `color/sand`  | `#ECE5D5`             | Dividers, soft cards.                       |
| `color/steel` | `#4A5468`             | Body copy on cream.                         |
| `color/fog`   | `#8A92A1`             | Captions, helper text.                      |
| `color/line`  | `rgba(15,27,45,0.10)` | Hairline borders.                           |

### 3.4 Orange ramp (extended, for charts & states)

| Token              | HEX       | Use                                |
| ------------------ | --------- | ---------------------------------- |
| `color/orange-100` | `#FFDCC8` | Subtle hover surfaces.             |
| `color/orange-300` | `#FF8D5C` | Hover variant of primary.          |
| `color/orange-700` | `#D63F00` | Pressed/active variant of primary. |

### 3.5 Semantic mapping

| Role                 | Light theme  | Dark theme                      |
| -------------------- | ------------ | ------------------------------- |
| Page background      | `paper`      | `ink`                           |
| Surface              | `cream`      | `#1A2638`                       |
| Text                 | `ink`        | `cream`                         |
| Muted text           | `steel`      | `fog`                           |
| Primary action       | `orange`     | `orange`                        |
| Primary action hover | `orange-700` | `orange-300`                    |
| Link                 | `sky`        | `sky` (lightened to `#7AA2F0`)  |
| Success              | `mint`       | `mint` (lightened to `#7CC6A8`) |
| Danger               | `#C03030`    | `#E66565`                       |
| Border               | `line`       | `rgba(248,243,235,0.10)`        |

### 3.6 Contrast (WCAG)

| Foreground / Background | Ratio    | Pass                                                              |
| ----------------------- | -------- | ----------------------------------------------------------------- |
| `ink` on `paper`        | 17.1 : 1 | AAA                                                               |
| `ink` on `cream`        | 16.0 : 1 | AAA                                                               |
| `ink` on `orange`       | 5.9 : 1  | AA · AAA large                                                    |
| `paper` on `orange`     | 3.0 : 1  | **AA large only** — don't set small body text in white on orange. |
| `paper` on `ink`        | 17.1 : 1 | AAA                                                               |

---

## 4. Typography

### 4.1 Type family

| Role                               | Family      | License     | Source                                                    |
| ---------------------------------- | ----------- | ----------- | --------------------------------------------------------- |
| Display, headings, UI, body        | **DM Sans** | SIL OFL 1.1 | [Google Fonts](https://fonts.google.com/specimen/DM+Sans) |
| Code, captions, metadata, eyebrows | **DM Mono** | SIL OFL 1.1 | [Google Fonts](https://fonts.google.com/specimen/DM+Mono) |

Web import:

```html
<link
  href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

System fallback stack:

```css
--sans: 'DM Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
--mono: 'DM Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
```

### 4.2 Weights in use

| Weight       | Use                                   |
| ------------ | ------------------------------------- |
| 400 Regular  | Body copy, paragraphs.                |
| 500 Medium   | UI labels, buttons, mono captions.    |
| 600 SemiBold | H3, table headers, emphasized labels. |
| 700 Bold     | H1 / H2 / Display, wordmark.          |

### 4.3 Type scale

| Role    | Family · Weight | Size / Line        | Tracking | Use                       |
| ------- | --------------- | ------------------ | -------- | ------------------------- |
| Display | DM Sans 700     | 80 / 80            | −0.045em | Hero pages, deck covers.  |
| H1      | DM Sans 700     | 48 / 52            | −0.035em | Section openers.          |
| H2      | DM Sans 600     | 32 / 40            | −0.025em | Sub-section headings.     |
| H3      | DM Sans 600     | 22 / 30            | −0.020em | Card titles.              |
| Body    | DM Sans 400     | 17 / 26            | −0.005em | Paragraphs.               |
| Small   | DM Sans 400     | 14 / 20            | 0        | Helper text.              |
| Caption | DM Mono 400     | 13 / 18, UPPERCASE | +0.06em  | Eyebrows, tags, metadata. |
| Code    | DM Mono 400     | 14 / 22            | 0        | Inline + block code.      |

### 4.4 Type rules

- Never go below 24 px on slides, 12 pt on print, 14 px in body UI.
- Headlines use `text-wrap: balance`; body uses `text-wrap: pretty`.
- Bold orange for accent words sparingly — at most one per heading.
- The wordmark always uses DM Sans 700 with **−10 px** letter-spacing at
  200 px. `LABS` uses **+11 px** letter-spacing at 60 px.

---

## 5. Spacing, radius, shadows

### 5.1 Spacing scale (8 px base)

| Token      | Value  |
| ---------- | ------ |
| `space/1`  | 4 px   |
| `space/2`  | 8 px   |
| `space/3`  | 12 px  |
| `space/4`  | 16 px  |
| `space/5`  | 24 px  |
| `space/6`  | 32 px  |
| `space/7`  | 48 px  |
| `space/8`  | 64 px  |
| `space/9`  | 96 px  |
| `space/10` | 128 px |

### 5.2 Radius

| Token             | Value   | Use                          |
| ----------------- | ------- | ---------------------------- |
| `radius/sm`       | 6 px    | Buttons, inputs, chips.      |
| `radius/md`       | 10 px   | Small cards, code blocks.    |
| `radius/lg`       | 18 px   | Cards, panels, hero blocks.  |
| `radius/xl`       | 28 px   | Marketing surfaces.          |
| `radius/full`     | 9999 px | Avatars, pills.              |
| `radius/app-icon` | 22.5 %  | App-icon mask (matches iOS). |

### 5.3 Shadow

| Token           | Value                                                            |
| --------------- | ---------------------------------------------------------------- |
| `shadow/1`      | `0 1px 2px rgba(15,27,45,0.06)`                                  |
| `shadow/2`      | `0 4px 12px rgba(15,27,45,0.08)`                                 |
| `shadow/3`      | `0 20px 40px rgba(15,27,45,0.12), 0 2px 6px rgba(15,27,45,0.06)` |
| `shadow/orange` | `0 8px 24px rgba(254,93,28,0.30)`                                |

### 5.4 Motion

| Token             | Value                                 | Use                   |
| ----------------- | ------------------------------------- | --------------------- |
| `motion/quick`    | `120ms cubic-bezier(0.4, 0, 0.2, 1)`  | Hover, focus.         |
| `motion/base`     | `220ms cubic-bezier(0.4, 0, 0.2, 1)`  | Default transitions.  |
| `motion/entrance` | `360ms cubic-bezier(0.16, 1, 0.3, 1)` | Modal, drawer, toast. |

---

## 6. Iconography

- Stroke: **1.75 px** on a **24 px** grid; rounded caps, rounded joins.
- Color: `ink` by default, never `orange` (orange is reserved for the mark).
- Pair with [Lucide](https://lucide.dev) or [Phosphor (light/regular)](https://phosphoricons.com)
  for ad-hoc UI.
- Don't draw illustrations in SVG by hand — use real photography or
  hire an illustrator.

---

## 7. Voice & tone

Boxting Labs sounds like an engineer who slept well: direct, concrete,
occasionally funny. Never breathless, never corporate.

### 7.1 Four principles

1. **Plain.** Short sentences. Common words. If a fifteen-year-old can't
   parse it, rewrite it.
2. **Specific.** Names, numbers, examples. _"Ships in 200 ms"_ beats
   _"blazing fast"_ every time.
3. **Warm.** We're peers, not vendors. Contractions are fine. Jokes are
   fine if they're not at anyone's expense.
4. **Honest.** Show the seams. Beta means beta. _"We don't know yet"_ is
   an answer.

### 7.2 Do / don't

| ✅ Do                                                                                                            | ❌ Don't                                                                                               |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| "Boxting Studio compiles your project on every save. First build takes ~4s; incremental builds land under 80ms." | "Leverage our cutting-edge platform to revolutionize your workflow with industry-leading performance." |
| "This is a beta. Things will break. We log every crash and read every report."                                   | "We're thrilled to announce that we're launching the future of intelligent systems."                   |
| "Open the file. Press ⌘S. Done."                                                                                 | "Simply navigate to the relevant document and execute the save operation."                             |

### 7.3 Spelling & grammar

- US English.
- Oxford comma: yes.
- Em-dashes: sparingly — once a paragraph, max.
- Sentence case for headings, never Title Case for Marketing Reasons.
- Numbers: spell out one through nine; numerals from 10. Always numerals
  with units (`5 ms`, `2 GB`).

---

## 8. Photography

- **Real things in real light.** Window light at ~45°. No flash.
- **Real environments.** Desks with cables. Kitchen tables. The actual
  office. Tidy, not staged.
- **Crop tight.** The 80 % crop is usually the right one.
- **No AI faces.** No stock office handshakes. No abstract gradients
  pretending to be ideas.
- Treat the orange as a directional accent within the frame, not a wash.

---

## 9. Patterns

Patterns are always built from **the cube silhouette** — never from
abstract shapes. Four canonical patterns:

| Pattern          | Use                                     |
| ---------------- | --------------------------------------- |
| Iso · cream      | Default. Slide backgrounds, packaging.  |
| Iso · ink        | Inverse. Dark slides, terminal screens. |
| Stripes · orange | Hero blocks. Social cards.              |
| Grid · dev       | Developer surfaces, docs covers.        |

Generators live in `brand/brand.js` (`patternIsometric`, `patternStripes`,
`patternGrid`). Density is configurable — keep tiles ≥ 96 px on screen
or the cube becomes a smudge.

---

## 10. File naming

```
boxting-{component}-{variant}[-{theme}].{ext}

boxting-mark-color.svg
boxting-mark-ink.svg
boxting-mark-white.svg
boxting-mark-orange-flat.svg
boxting-mark-ink-flat.svg
boxting-mark-white-flat.svg
boxting-lockup-vertical.svg
boxting-lockup-vertical-ink.svg
boxting-lockup-vertical-white.svg
boxting-lockup-horizontal.svg
boxting-lockup-horizontal-ink.svg
boxting-lockup-horizontal-white.svg
boxting-wordmark.svg
boxting-wordmark-white.svg
boxting-wordmark-orange.svg
boxting-app-icon.svg
boxting-app-icon-ink.svg
boxting-avatar.svg
boxting-favicon.svg
```

Multipliers append `@2x` / `@4x` before the extension.

---

## 11. Cross-ecosystem snippets

### 11.1 CSS custom properties

```css
:root {
  /* Brand */
  --color-orange: #fe5d1c;
  --color-orange-700: #d63f00;
  --color-orange-300: #ff8d5c;
  --color-orange-100: #ffdcc8;
  --color-ink: #0f1b2d;
  --color-cream: #f8f3eb;
  --color-paper: #fffdf9;
  --color-sand: #ece5d5;
  --color-steel: #4a5468;
  --color-fog: #8a92a1;

  /* Accents */
  --color-sky: #2b5ce6;
  --color-mint: #4fa98a;
  --color-plum: #6e2f66;

  /* Type */
  --font-sans: 'DM Sans', system-ui, -apple-system, sans-serif;
  --font-mono: 'DM Mono', ui-monospace, Menlo, monospace;

  /* Spacing (8px base) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 18px;
  --radius-xl: 28px;

  /* Shadow */
  --shadow-1: 0 1px 2px rgba(15, 27, 45, 0.06);
  --shadow-2: 0 4px 12px rgba(15, 27, 45, 0.08);
  --shadow-3: 0 20px 40px rgba(15, 27, 45, 0.12), 0 2px 6px rgba(15, 27, 45, 0.06);
}
```

### 11.2 Tailwind config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        orange: {
          100: '#FFDCC8',
          300: '#FF8D5C',
          DEFAULT: '#FE5D1C',
          700: '#D63F00',
        },
        ink: '#0F1B2D',
        cream: '#F8F3EB',
        paper: '#FFFDF9',
        sand: '#ECE5D5',
        steel: '#4A5468',
        fog: '#8A92A1',
        sky: '#2B5CE6',
        mint: '#4FA98A',
        plum: '#6E2F66',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: { lg: '18px', xl: '28px' },
      boxShadow: {
        1: '0 1px 2px rgba(15,27,45,0.06)',
        2: '0 4px 12px rgba(15,27,45,0.08)',
        3: '0 20px 40px rgba(15,27,45,0.12), 0 2px 6px rgba(15,27,45,0.06)',
      },
    },
  },
};
```

### 11.3 Design tokens (W3C draft JSON)

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "color": {
    "orange": { "$value": "#FE5D1C", "$type": "color" },
    "ink": { "$value": "#0F1B2D", "$type": "color" },
    "cream": { "$value": "#F8F3EB", "$type": "color" },
    "sky": { "$value": "#2B5CE6", "$type": "color" },
    "mint": { "$value": "#4FA98A", "$type": "color" },
    "plum": { "$value": "#6E2F66", "$type": "color" }
  },
  "font": {
    "sans": { "$value": "DM Sans, system-ui, sans-serif", "$type": "fontFamily" },
    "mono": { "$value": "DM Mono, ui-monospace, monospace", "$type": "fontFamily" }
  },
  "space": {
    "1": { "$value": "4px", "$type": "dimension" },
    "2": { "$value": "8px", "$type": "dimension" },
    "3": { "$value": "12px", "$type": "dimension" },
    "4": { "$value": "16px", "$type": "dimension" },
    "5": { "$value": "24px", "$type": "dimension" },
    "6": { "$value": "32px", "$type": "dimension" }
  }
}
```

### 11.4 Swift / iOS

```swift
import SwiftUI

extension Color {
  static let brandOrange = Color(red: 254/255, green: 93/255, blue: 28/255)
  static let brandInk    = Color(red: 15/255,  green: 27/255, blue: 45/255)
  static let brandCream  = Color(red: 248/255, green: 243/255, blue: 235/255)
  static let brandSky    = Color(red: 43/255,  green: 92/255, blue: 230/255)
  static let brandMint   = Color(red: 79/255,  green: 169/255, blue: 138/255)
}

extension Font {
  static func dmSans(_ size: CGFloat, weight: Font.Weight = .regular) -> Font {
    .custom("DMSans-\(weight.rawName)", size: size)
  }
}
```

### 11.5 Kotlin / Android (Compose)

```kotlin
import androidx.compose.ui.graphics.Color

object Brand {
  val Orange = Color(0xFFFE5D1C)
  val Ink    = Color(0xFF0F1B2D)
  val Cream  = Color(0xFFF8F3EB)
  val Sky    = Color(0xFF2B5CE6)
  val Mint   = Color(0xFF4FA98A)
  val Plum   = Color(0xFF6E2F66)
}
```

### 11.6 Markdown / GitHub README

```markdown
<p align="center">
  <img src="brand/assets/lockup-vertical.svg" height="160" alt="Boxting Labs">
</p>

# Boxting Labs

Pack big ideas into small boxes.
```

### 11.7 LaTeX

```latex
% preamble
\usepackage{graphicx}
\definecolor{boxtingOrange}{HTML}{FE5D1C}
\definecolor{boxtingInk}{HTML}{0F1B2D}

% include the logo
\includegraphics[width=3cm]{brand/assets/lockup-horizontal.pdf}

% vector via the `svg` package (requires Inkscape on PATH)
\usepackage{svg}
\includesvg[width=3cm]{brand/assets/mark-color}
```

### 11.8 Figma variables (manual seed)

Create a **collection** named `Boxting / 1.0` with two modes (Light / Dark).
Seed it with the **token names** from §3 and §5. The `color/orange` token
maps to `#FE5D1C` in both modes; semantic tokens (`text/default`,
`surface/page`) swap per §3.5.

---

## 12. Folder structure

```
.
├── index.html                  ← live brand guide (built from this file)
└── brand/
    ├── design.md               ← you are here
    ├── styles.css              ← CSS tokens + brand-guide styles
    ├── brand.js                ← SVG generators + download wiring
    └── assets/
        ├── source-mark.svg     ← original uploaded source
        ├── mark-color.svg
        ├── mark-ink.svg
        ├── mark-white.svg
        ├── mark-flat-orange.svg
        └── mark-orange-on-light.svg
```

All other variants (lockups, wordmarks, app icons, favicons, avatars) are
generated on demand by `brand/brand.js` from the same path data, then
exported as SVG / PNG / PDF / ZIP from the live brand guide. To add them
as static files, open `index.html`, click each download, and drop the
results into `brand/assets/`.

---

## 13. Changelog

| Version | Date       | Notes                                                                                          |
| ------- | ---------- | ---------------------------------------------------------------------------------------------- |
| 1.0     | 2026-05-19 | Initial brand identity: marks, lockups, palette, type, voice, patterns, mockups, download kit. |
