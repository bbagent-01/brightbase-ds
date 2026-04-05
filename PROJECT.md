# Brightbase Design System v2

## Summary
A visual design system generator and editor. Pick foundation colors, fonts, and spacing — it generates cascading token scales, lets you assign semantic tokens, configure component styles (buttons, cards, inputs), and exports to CSS/DTCG JSON. Everything updates in real time via CSS custom properties. Live at https://ds3.bbase.ai.

## Tech Stack
- **Framework:** Next.js 16 + React 19 (static export)
- **State:** Zustand 5 with persist middleware (localStorage, versioned migrations)
- **Color math:** chroma-js 3 (Oklch color space for perceptual uniformity)
- **CSS:** Tailwind v4 (editor chrome only) + CSS custom properties `--bb-*` (preview/components)
- **Deploy:** GitHub Actions → Cloudflare Pages, auto-deploy on push to main
- **Repo:** bbagent-01/brightbase-ds

## File Structure
```
src/
├── app/
│   ├── page.jsx                    # Root — renders EditorLayout
│   ├── layout.jsx                  # Google Fonts imports
│   └── globals.css                 # Editor theme + ALL .bb-* component CSS classes
│
├── lib/
│   ├── tokens/
│   │   ├── defaults.js             # All default token values, semantic groups, style modes, component token shapes
│   │   └── store.js                # Zustand store — state, actions, persist v7, undo/redo (50 states)
│   ├── color/
│   │   ├── scales.js               # generateScale() — Oklch 11-step scale from hex
│   │   └── contrast.js             # WCAG contrast ratio checker
│   ├── export/
│   │   ├── css.js                  # generateCSS() — resolved or referenced mode
│   │   └── dtcg.js                 # generateDTCG() — W3C Design Tokens format
│   └── persistence/
│       └── storage.js              # downloadJSON, uploadJSON, copyToClipboard
│
├── components/
│   ├── editor/
│   │   ├── EditorLayout.jsx        # Header bar + sidebar + preview layout
│   │   ├── Sidebar.jsx             # Tabbed (Tokens | Components) + collapsible sections
│   │   ├── controls/
│   │   │   ├── ColorPicker.jsx
│   │   │   ├── FontSelect.jsx      # Dropdown with pangram font previews
│   │   │   ├── ScaleStepPicker.jsx # Popup picker for scale color references
│   │   │   └── SliderControl.jsx
│   │   └── sections/
│   │       ├── StyleModeSection.jsx     # Rectilinear/Bento/Soft/Rounded presets (Tokens tab)
│   │       ├── ColorSection.jsx         # Foundation colors + scales + semantic tokens + gradients
│   │       ├── TypographySection.jsx    # Fonts, sizes, weights, line heights, letter spacing
│   │       ├── SpacingSection.jsx       # Base unit + derived scale
│   │       ├── BorderSection.jsx        # Base radius + multipliers + shadow presets
│   │       ├── ButtonStyleSection.jsx   # Per-variant bg/text/border/hover × light/dark (Components tab)
│   │       ├── CardStyleSection.jsx     # bg/border/shadow/title/body × light/dark
│   │       ├── InputStyleSection.jsx    # bg/text/border/focus/placeholder × light/dark
│   │       ├── ElementStyleSection.jsx  # (unused — element gradient dropdowns, may remove)
│   │       └── GradientSection.jsx      # (unused — gradients moved into ColorSection)
│   │
│   └── preview/
│       ├── PreviewPanel.jsx         # Full preview: palette, semantic, gradients, type, spacing, atoms (light+dark), molecules
│       ├── TokenStyleInjector.jsx   # Store → <style> tag with --bb-* vars (the bridge)
│       ├── ProofCard.jsx            # Card using .bb-card class
│       ├── ProofButton.jsx
│       ├── atoms/
│       │   ├── Button.jsx           # .bb-btn .bb-btn-{variant} .bb-btn-{size}
│       │   ├── Input.jsx            # .bb-input with labels, hints, errors
│       │   ├── Badge.jsx            # .bb-badge-{variant}
│       │   └── Toggle.jsx           # .bb-toggle switch
│       └── molecules/
│           ├── NavBar.jsx
│           ├── FeatureBlock.jsx
│           ├── StatsBlock.jsx
│           ├── Testimonial.jsx
│           └── PricingCard.jsx
```

## Architecture

### Token Cascade
```
Foundation Colors (hex)
    ↓ generateScale() via chroma-js Oklch
11-step Color Scales (primary-50 through primary-950)
    ↓ assigned by user
Semantic Tokens (bg-primary → accent-50)
    ↓ resolved by TokenStyleInjector
CSS Custom Properties (--bb-bg-primary: #hex)
    ↓ consumed by
Component CSS Classes (.bb-card, .bb-btn-primary)
```

### Key Design Patterns

1. **Two-layer styling:** Editor chrome uses Tailwind (`text-editor-text-muted`). Preview components use ONLY `--bb-*` CSS variables. Zero leakage between them.

2. **No resolution in React:** The Zustand store holds flat key-value maps with string references (like `'primary-500'`). Only `TokenStyleInjector` resolves refs to hex values and injects them as CSS vars. Components never call the store directly for colors.

3. **Token resolution chain:** `resolve(ref)` handles: scale refs (`primary-500` → hex), semantic refs (`bg-card` → scale ref → hex), gradient refs (`gradient-primary` → `linear-gradient(...)`), and literals (`transparent`, `null`).

4. **Component tokens:** Buttons, cards, and inputs each have their own token set with light + dark variants. CSS classes use `--bb-btn-primary-bg`, `--bb-card-bg`, `--bb-input-text`, etc. Dark context uses `.bb-dark` parent class to swap to `--bb-btn-dark-primary-bg` etc.

5. **Undo/redo:** Every action calls `_pushHistory()` which snapshots the entire state (excluding computed scales). 50-state buffer.

6. **Persist with migration:** localStorage key `bb-ds-config`, version 7. `partialize` excludes computed scales and undo history. `migrate()` handles schema upgrades. `onRehydrateStorage` recomputes scales.

### Store State Shape (all persisted except `scales`, `_history`, `_future`)
```
foundationColors    — { primary: '#hex', secondary: '#hex', ... }
scales              — { 'primary-50': '#hex', ... } (computed, not persisted)
semantic            — { 'bg-primary': 'accent-50', ... }
typography          — { headingFont, bodyFont, monoFont, baseSize, weights, lineHeights, tracking }
spacing             — { base, sectionPadding, containerPadding, componentGap, maxWidth }
borders             — { radius, cardMult, containerMult, buttonMult, inputMult, shadow }
gradients           — { 'gradient-primary': { angle: 180, stops: ['primary-300', 'primary-600'] } }
elementGradients    — { card: null, container: null }
buttonTokens        — { primary: { bg, text, border, hoverBg, hoverText, hoverBorder }, ... }
buttonTokensDark    — same shape, dark variants
buttonTransition    — { duration: 0.15, easing: 'ease' }
cardTokens          — { bg, borderColor, borderWidth, shadow, titleColor, bodyColor }
cardTokensDark      — same shape, dark variants
inputTokens         — { bg, text, borderColor, borderWidth, focusBorderColor, placeholderColor, labelColor }
inputTokensDark     — same shape, dark variants
```

## Local Development
```bash
cd ~/Dropbox/Claude/Projects/brightbase-ds
npm run dev     # http://localhost:3000
npm run build   # static export to /out
```

## Deployment
- **Host:** Cloudflare Pages (static)
- **Domain:** ds3.bbase.ai (CNAME → brightbase-ds.pages.dev)
- **CI:** GitHub Actions on push to main → `npm ci && npm run build` → `wrangler pages deploy out`
- **Repo:** github.com/bbagent-01/brightbase-ds

## Current State (Phase 3.5b complete — April 2026)

### What's Working
- Full token engine with cascading color scales (Oklch), semantic assignments, WCAG contrast
- Dynamic semantic tokens (add/remove per group), dark background + dark text tokens
- Typography controls: 7 fonts, base size, weights, line heights, letter spacing (eyebrow/heading/body)
- Spacing scale with base unit multiplier
- Cascading border radius (base × multipliers for card/container/button/input)
- Gradient system: auto-generated per foundation color, editable stops/angles, selectable as button/card fills
- Button component tokens: 4 variants × full hover states (bg/text/border) × light/dark × gradient bg support × transition controls
- Card component tokens: bg (solid/gradient), border, shadow, title/body colors × light/dark
- Input component tokens: bg, text, border, focus, placeholder, label × light/dark
- Style modes: Rectilinear, Bento, Soft, Rounded (one-click presets with undo)
- Dark preview section: buttons + cards + inputs on dark background
- Export: CSS (resolved + referenced), DTCG JSON, config save/load
- Atoms: Button, Input, Badge, Toggle
- Molecules: NavBar, FeatureBlock, StatsBlock, Testimonial, PricingCard
- Undo/redo (50 states) with Cmd+Z/Cmd+Shift+Z
- localStorage persistence with versioned migrations

### Planned Next
- Full dark mode toggle (mode-aware semantic tokens with `data-theme` export)
- Badge/Toggle component tokens
- Organism/section components (Hero, Feature Grid, Pricing, FAQ, CTA, Footer)
- Page builder + iframe preview
- Tailwind v4 `@theme` config export
- Figma Variables JSON export
- Component code export (copy-paste HTML + CSS)
