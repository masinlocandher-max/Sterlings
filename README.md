# Sterlings

Digital spaces company — website and UI planning.

This repository starts with visual design proposals. They describe intended experience; they are not a deployed website or a claim of working software.

## Direction

A place online, built around you. Proposed launch formats: professional spaces, portfolios, and business websites. Cinematic warmth, readable layouts, and a straightforward inquiry journey.

## UI concepts

Initial desktop and mobile homepage concepts and implementation notes are being prepared in `design/ui/v1/`.

Company domain, final identity, prices, and delivery capabilities still require confirmation before public launch.

## Website (v1)

A static, dependency-free site lives at the repo root:

- `index.html` — single-page site (hero, approach, spaces, process, philosophy & promise, inquiry)
- `assets/css/styles.css` — design tokens and layout
- `assets/js/main.js` — nav, scroll reveals, inquiry form
- `assets/img/favicon.svg` — arch mark

Open `index.html` in a browser, or deploy the folder to any static host (GitHub Pages, Netlify, Vercel).

### Before launch
- Set the real inquiry address in `assets/js/main.js` (`INQUIRY_EMAIL`, currently a placeholder), or connect a form service.
- **Pricing is proposed, not validated.** Studio (from ₱799/mo) and Concierge (from ₱4,999/mo, setup from ₱4,999) are shown publicly. Confirm before launch.
- **Studio is labelled "Early access"** because the self-service platform (editor, checkout, publishing) is not built yet. Remove the badge and change the Studio CTA once it is live.
- Define the Concierge "monthly update allowance" (e.g. hours or number of changes) before selling it.
- Confirm the company name (Sterling Group vs. Sterlings), domain, and final logo.
