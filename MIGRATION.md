# Base44 removal — Dressed By Priv

This site was migrated off the Base44 platform so it can deploy as a plain static Vite/React site on Cloudflare Pages.

## What changed

- Removed `@base44/sdk` and `@base44/vite-plugin` from `package.json` and `vite.config.js`. Added a plain `@` → `src` path alias in `vite.config.js` (the base44 plugin used to provide this — without it, the build fails to resolve any `@/...` import).
- Deleted the Base44 auth wrapper and all five auth pages, since they only gated access via Base44's login system: `src/api/base44Client.js`, `src/lib/app-params.js`, `src/lib/AuthContext.jsx`, `src/lib/authReturnTo.js`, `src/components/AuthLayout.jsx`, `src/components/GoogleIcon.jsx`, `src/components/ProtectedRoute.jsx`, `src/components/UserNotRegisteredError.jsx`, `src/pages/Login.jsx`, `src/pages/Register.jsx`, `src/pages/ForgotPassword.jsx`, `src/pages/ResetPassword.jsx`, `src/pages/OAuthConsent.jsx`. Removed the `AuthProvider`/loading/error branching from `App.jsx` — it now renders the `Layout` + routes directly.
- Rewrote `src/lib/PageNotFound.jsx` to drop the Base44 `auth.me()` admin-note lookup.
- **Product data**: `Home.jsx`, `Shop.jsx`, and `ProductDetail.jsx` all fetched live from Base44's `Product` entity (`list` for the homepage/shop grids, `filter({ slug })` plus a related-by-category `filter` on the detail page), and the export contained only the entity schema — no actual product records, and no per-product photography, only the site's editorial/campaign imagery in `src/lib/images.js`. I built `src/data/products.js` as a static replacement with 7 placeholder products (one per category: Dresses, Sets, Workwear, Occasion, Cocktail, Tops, Outerwear), reusing the existing editorial imagery for photos, with the same `list`/`filter` call shape the Base44 SDK used — so the three consuming pages only needed their import swapped, no other logic changed.
- Removed the `base44/` entity-schema folder and `.env.local` (`VITE_BASE44_APP_ID`) — no longer needed.
- `index.html`: removed the Base44 favicon link and the `/manifest.json` reference (no manifest file exists in this export).
- Regenerated `package-lock.json` from scratch against the trimmed `package.json`.

## ⚠️ Placeholder product data — read before launch

`src/data/products.js` has 7 placeholder products (one per category). Names, descriptions, and colours are invented, and every product **price is set to 0 on purpose** so it can't be mistaken for a real number. Open that file and replace the placeholders with your real inventory before launch — and swap in real product photography, since the placeholders currently reuse the site's editorial images.

## Still pointing at Base44's image CDN

All imagery in `src/lib/images.js` (hero, editorial break, final CTA, Priv Edit, Worn By You) and the occasion tiles in `src/components/sections/TheEdit.jsx` still point at `media.base44.com` — this migration didn't touch image hosting. The site will keep working as long as that CDN stays up; if you want full independence from Base44, re-host these images yourself and update those two files. The image-optimization helpers in `src/components/ui/image.jsx` / `image-helpers.js` still special-case `media.base44.com` and `static.wixstatic.com` URLs for resizing — that's harmless (no SDK dependency, just URL string matching) and falls back to a plain `<img>` for any other host.

## Verified

- `npm install` regenerates a clean lock file with no Base44 packages.
- `npm run build` succeeds with no errors.
- Whole-tree import scan from `src/main.jsx`: 37 reachable files, all resolve.

## Deploy to Cloudflare Pages

| Setting | Value |
|---|---|
| Framework preset | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Root directory | `/` |

No environment variables needed.
