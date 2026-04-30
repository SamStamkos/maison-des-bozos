# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (pinned to `pnpm@10.15.0` via `packageManager` in `package.json`). Use it instead of `npm`/`yarn`.

- `pnpm dev` — Vite dev server on port `3000` (auto-opens browser; configured in `vite.config.ts`).
- `pnpm build` — Type-check (`tsc`) **then** Vite build. The `tsc` step has `noEmit: true`, `noUnusedLocals`, and `noUnusedParameters`, so unused imports will fail the build.
- `pnpm preview` — Serve the production `dist/` build locally.

There is no test runner, linter, or formatter configured. TypeScript strict mode is the only static check. Don't add new tooling without asking.

### Image optimization

Raw images live in `public/`. The repo ships an **in-place** image optimizer at `optimize-images.js` (Node + `sharp`) that overwrites originals with mozjpeg-compressed versions at `quality: 80`. It is **not** wired into `package.json` scripts and **does not produce `.webp`** — only re-encodes JPEGs. WebP variants in `public/` were generated separately (see `IMAGE-OPTIMIZATION-GUIDE.md`); when adding new images, generate the matching `.webp` alongside the `.jpg` because the rendering convention assumes both exist (see "Image rendering" below).

`sharp` and `glob` are not in `package.json` — install ad hoc when running the optimizer (`pnpm add -D sharp glob`).

## Architecture

A bilingual (FR/EN) marketing one-pager for a Montréal venue. Single home page composed of stacked sections, plus a `/privacy` route. Vercel-hosted (see `vercel.json` for SPA rewrite + security headers).

### Stack

React 19 + TypeScript + Vite 7 + Tailwind CSS 4 (via `@tailwindcss/vite` plugin — there is **no `tailwind.config.js`**; the theme lives in `@theme { ... }` inside `src/index.css`). GSAP 3 with `ScrollTrigger` for animation. `react-router-dom` v7 for routing. Fathom Analytics (script tag in `index.html`).

### Translation system (non-obvious — read before editing locales)

The app has a **hybrid two-tier translation system** routed through one `t()` function in `src/context/LanguageContext.tsx`:

1. **Plain-string translations** live in `src/locales/{fr,en}.json` and are looked up via dotted-path keys (e.g., `home.concerts.title`). `getNestedValue` walks the nested object.
2. **JSX-formatted translations** live in `src/locales/formatted-translations.tsx`. These contain `<span className="font-bold">…</span>` etc. that JSON can't express. The `t()` function checks `formattedTranslations[key]` **first** and falls back to JSON.

So `t("home.musee.description")` returns a `ReactNode` (JSX), while `t("home.concerts.title")` returns a `string`. Callers cast with `as string` when they need a string for a prop. **If you add a new translation key**, update `src/types/translations.ts` (the `TranslationKeys` union) — that file is hand-maintained, not auto-generated despite the comment.

Language is persisted in `localStorage["language"]`, defaults to `"fr"`. Switching language re-renders the entire app via context.

### Routing & app shell

- `src/main.tsx` mounts `<BrowserRouter>` with `React.StrictMode` (so all effects run twice in dev — be defensive about double-mount side effects).
- `src/App.tsx` is the shell: wraps everything in `LanguageProvider`, renders `<SEO />` and `<StructuredData />` (head-mutating, render-`null` components), then conditionally renders `<LoadingScreen />` or the routed app.
- `<Navigation>` and `<Footer>` are siblings of `<Routes>` — present on all routes.
- The loading screen is **session-gated** via `sessionStorage["hasSeenLoading"]` and only shown on `/`. Navigating to `/privacy` skips it. The curtain animation in `IntroSection` runs on every home-page mount regardless of the loading screen state.

### Animation architecture (critical)

Animations are layered across three mechanisms — know which one a section uses before editing it:

1. **GSAP + ScrollTrigger** (`IntroSection.tsx` only): wrapped in `gsap.context(() => { … })` with `return () => ctx.revert();` for cleanup. Uses `gsap.matchMedia()` to gate desktop-only parallax (`min-width: 768px`). Animates `y`/`scale`/`opacity` (transform-only — never `top`/`left`/`width`). Disables `history.scrollRestoration` and forces `window.scrollTo(0, 0)` on mount.
2. **IntersectionObserver** (`SectionCard.tsx`, `DonationSection.tsx`): one-shot — `observer.disconnect()` fires the moment the element enters viewport, flipping `isInView` which enables the `Typewriter` and triggers a `setTimeout` to reveal descriptions. Re-using the pattern? Match it exactly; both components have identical structure.
3. **CSS transitions** (`SectionWithCarousel.tsx`, `IntroSection.tsx` gallery): plain `setInterval` flips `currentImageIndex`, and Tailwind `transition-opacity` classes crossfade `<picture>` elements stacked with `absolute inset-0`. No GSAP involvement.

`useImageCarousel.ts` exists but is **only used internally by `<ImageCarousel>`** (a clip-path reveal variant). The actual section carousels (`ConcertsSection`, `MuseumSection`) use `<SectionWithCarousel>`'s simpler crossfade — they do **not** import the hook.

All animation timings are centralized in `src/constants/animations.ts` (typed by `src/types/animations.ts`). Edit constants there, not inline.

### Image rendering convention

Every image render uses the same `<picture>` pattern: a WebP `<source>` whose `srcSet` is derived from the JPG path with a regex (`image.replace(/\.(jpg|jpeg)$/i, ".webp")`), then an `<img>` fallback. The **first image of a sequence** gets `loading="eager"` + `fetchPriority="high"`; the rest get `loading="lazy"` + `decoding="async"`. The LCP image (`/intro/intro-1.{webp,jpg}`) is preloaded in `index.html`. Match this pattern when adding new image components — both `.jpg` and `.webp` must exist in `public/`.

Image path constants live in `src/constants/images.ts` (`INTRO_IMAGES`, `CONCERTS_IMAGES`, `MUSEUM_IMAGES`, all `as const`).

### Reduced motion

`useReducedMotion.ts` reads `prefers-reduced-motion` and reactively updates. `IntroSection` checks it and skips the entire GSAP context (hides the curtain instantly via `display: none` and sets `curtainAnimationComplete = true`). New animation code should respect this hook.

### SEO / structured data

`<SEO>` mutates `document.title`, meta tags, `<html lang>`, canonical and `hreflang` links inside a `useEffect` keyed on `language`. It creates missing `<meta>`/`<link>` elements rather than relying on placeholders in `index.html`. `<StructuredData>` injects four JSON-LD schemas (`PerformingArtsTheater`, `Organization`, `WebSite`, `BreadcrumbList`) via `dangerouslySetInnerHTML`. Site-wide constants are in `src/constants/seo.ts` (note: `telephone` and `SITE_INFO.url` contain placeholders).

### Styling

Tailwind 4 with custom theme tokens (`--color-primary: #212122`, `--color-secondary: #bda075`, custom `--ease-out-quad`) defined in `src/index.css` via `@theme`. Local fonts (`Nocturne Mono`) loaded via `@font-face` from `src/fonts/`; Raleway loaded from Google Fonts in `index.html` using the print-media-swap trick for non-blocking CSS. Global `overflow-x: hidden` on `body` — be aware when adding horizontally-positioned elements.

Utility classes `.intro-image`, `.carousel-image`, `.parallax-element` (in `index.css`) apply `will-change: transform, opacity`. Use them on heavily animated nodes; pair with `.animation-complete` to release GPU memory after motion ends.

### Third-party embeds

The `lepointdevente.com` ticket plugin is loaded via `<script>` tag in `index.html` (deferred) and **re-injected by `pages/Home.tsx`** with a `?lang=` query param when language changes — it removes the existing tag first. Buttons that should bind to it use `className="tpos-add-to-cart"` and `data-tpos-group="<event-id>"` (see `SectionCard.tsx`). The data-group IDs (`15097`, `14982`) are hardcoded per section — they're event identifiers in the external ticketing system.

## Notes for future changes

- **`CODE-REVIEW-PROMPT.md`** is a prompt template (formerly `CLAUDE.MD`) the maintainer uses to request structured code reviews — leave it alone unless explicitly asked. It is not project documentation.
- React 19 + StrictMode means effects double-invoke in dev; verify cleanup functions actually undo their setup (especially around `setInterval`, `gsap` tweens, dynamically-injected `<script>` tags).
- Animation cleanup in `IntroSection` works because of `gsap.context()`. If you add new GSAP code outside that context, you must manually `kill()` tweens and ScrollTriggers on unmount.
