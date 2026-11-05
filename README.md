# THE STERLINGS
**Digital Spaces, Thoughtfully Made.**  
*A place online, built around you.*

This repository implements the working frontend of THE STERLINGS, a digital spaces business. It replaces the initial planning-only repository with a responsive corporate website and a browser-based website studio.


## Showroom and navigation (2026-11-05 — redesigned)

The Showroom keeps the Sterlings corporate identity in its surrounding interface, but previews are four **independent fictional brand worlds**, each with its own code and visual system:

- demos/morrow.html — Morrow Atelier: experimental brutalism, acid yellow-green, black, oversized Archivo typography, staggered case-study layout.
- demos/casa.html — Casa Solenne: cobalt blue, coral, coastal photography, playful Fraunces typography, hospitality-first immersive hero and rooms.
- demos/northline.html — Northline Partners: dark teal and mint, Manrope and IBM Plex Mono, abstract strategic diagram, structured expertise accordions, no invented performance metrics.
- demos/isla.html — Isla Frames: black and violet, oversized Bebas Neue typography, full-bleed photography, asymmetric journal grid, accessible image lightbox.

These examples have distinct typography, page architecture, interactions, and color palettes, intentionally *unlike* The Sterlings' warm taupe, ivory and architectural identity.

The showroom.html interface embeds each actual demo via an iframe and supports desktop/mobile preview, a full-page link, and a contextual Discuss this design inquiry. showroom.js manages selection. Old shared showroom-preview.html?space=... links redirect to new pages. All are fictional demonstrations, not production rental templates, customer references, or real client businesses.

Navigation includes a desktop Solutions dropdown and a mobile drawer with backdrop, keyboard support, Escape-to-close, and body scroll locking. Decorative emoji-like elements are not used.

**Direct preview URLs:**
- /showroom.html
- /demos/morrow.html
- /demos/casa.html
- /demos/northline.html
- /demos/isla.html

**Operational note:** The pages use Google Fonts and remote Unsplash images. For production reliability and appropriate commercial usage rights, replace externally hosted demo imagery with reviewed, hosted assets.


## Service models and pricing (proposed)

The homepage `#solutions` section presents two service models. They replace the earlier three paths (build it yourself / rent a website / managed website).

| | Sterling Studio (self-service) | Sterling Concierge (managed) |
|---|---|---|
| Monthly | From ₱799 (up to ₱2,499) | From ₱4,999 (up to ₱14,999+) |
| Setup fee | None | From ₱4,999 |
| Editing | Client | Client + Sterling |
| Content updates | Client | Defined monthly allowance |
| Support | Standard | Priority |

- **These prices are proposed, not validated.** Confirm them before public marketing.
- **Studio is labelled "Hosted plans opening soon".** The browser editor works today; hosting, checkout and publishing do not. The Studio card's main action opens the existing editor. Remove the label only once hosted plans can actually be bought.
- **Define the Concierge "monthly update allowance"** (hours or number of changes) before selling it.
- Plan anchors: `#studio-plan`, `#concierge-plan`, `#compare`. The inquiry form options are `Sterling Studio (self-service)` and `Sterling Concierge (managed)`; plan buttons and Showroom links preselect them.

## Delivered features

- index.html: responsive corporate website based on the supplied Sterlings homepage concept, with solutions, service positioning, process, studio explanation, and inquiry form.
- studio.html: functional local-first editor with three templates, editable identity, copy, services, color, optional HTTPS photograph, and public contact details.
- studio.js: live iframe preview, desktop/mobile modes, browser-local draft persistence, undo/redo, HTML export, and publishing-inquiry email handoff.
- styles.css and studio.css: responsive architectural styling, typography, navigation, accessible interactions, and reduced-motion support.
- site.js: mobile navigation, effects, service inquiry selection, and prepared email draft handoff.
- logo-symbol.svg: simplified SVG trace of the existing S symbol from the approved user-supplied logo variation sheet. For perfect production lockups, substitute the original vector master.

## Capabilities and limitations — do not misrepresent

**Working now**
- Visitors can learn about the services, navigate the site, start an inquiry in their own email client, and use a browser-local Studio.
- Studio users can customize a starter website, preview it, save drafts in localStorage, undo/redo, and download a standalone HTML website.

**Not yet provided**
- User authentication, cloud accounts, server-based drafts, published hosting, managed deployments of customer websites, rental subscriptions, automated billing, site analytics, email server delivery, or customer dashboards.
- Studio's Ask about publishing button opens an email draft. It does NOT publish a website.
- Inquiry forms open the visitor's own email application. They do NOT send mail directly from a backend; the visitor must send the email in their mail app. The fallback copies inquiry content.

## Interim contact routing

site.js and studio.js currently direct inquiries to fmbandco@gmail.com as an **interim owner-controlled business inbox**, not a verified THE STERLINGS-specific address. Replace the emailForInquiries and inquiryInbox constants once a dedicated Sterling mailbox is confirmed. Do not claim an invented company inbox.

## Deployment

This is a static site. No bundler, database, paid API key, build script, or runtime environment variable is required.

Deploy the repository main branch to a Vercel **Other/static** project with the repository root as the working directory. The root page is index.html. The editor is at /studio.html. Connect a verified custom domain when appropriate.

## Quality checks before public marketing

1. Confirm official company domain and company-owned contact mailbox.
2. Replace traced brand monogram with the original approved vector master if available.
3. Test home and Studio on iOS, Android, tablet, and desktop browsers.
4. Test external font/photo availability and host assets locally for reliability.
5. Confirm inquiries can be delivered; replace mailto handoff with a consent-aware backend if direct submission is required.
6. Obtain appropriate approval for legal terms/privacy practices before collecting/storing customer data.
7. Complete authentication, customer hosting, payment, renewals, and support systems before advertising a full self-service rental SaaS.

## Functional test

1. Open index.html. Test navigation, mobile menu, all calls to action, solution selection, and form validation.
2. Submit inquiry form; confirm the local email client opens a prepared draft. Sending stays under the visitor's control.
3. Open studio.html. Change identity, heading, services, and color. Preview should update.
4. Switch desktop/mobile preview; export HTML and open it as a standalone file.
5. Reload Studio; confirm draft persists in the same browser.
6. Test undo, redo, template selection, and reset.

The Studio does not send entered data to a server; drafts are stored locally in the user's browser. External fonts and photos may make network requests to their respective providers.

© THE STERLINGS.