# Dabbat — Fixed Light Editorial Homepage

This version fixes the unstyled homepage by restoring the complete global stylesheet and keeping
the full-bleed 16:9 editorial hero.

## Run
1. Open this folder in VS Code.
2. Run `npm install`
3. Run `npm run dev`

## Important files
- `src/index.css` — complete global + hero CSS
- `src/main.tsx` — imports `./index.css`
- `src/pages/Home.tsx` — full-bleed hero component
- `src/components/Header.tsx` — real Dabbat logo
- `public/dabbat-logo.png` — logo
- `public/images/hero-editorial.svg` — hero image
