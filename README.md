# THE STERLINGS

## November 8, 2026: website estimate review page

`estimate.html` adds a responsive website estimator for project builds and rental inquiries. Visitors choose website type, page count, design direction, copy help, features, care, domain needs and timing. Costs update with an itemized one-time/monthly breakdown and a first-year illustration. Custom systems, checkout, rush work and sites over 20 pages require a separate quotation and are not silently included in a fixed total.

Visitors can print/save PDF, download a text summary, save non-personal choices on their device, share an allowlisted configuration link, or prepare a quotation email. Preparing the email does not send it. Contact details and project notes are never saved to local storage or included in share links.

**Pricing is proposed for review, not approved for customer publication.** The page and every generated output retain that status. Keep this branch on a review deployment until rates are agreed. See `docs/estimate-pricing-review.md` for proposed rates, example totals, exclusions and the publication checklist. `estimate-pricing.js` is the single rate card; `estimate-model.js` contains pure calculations.

Run arithmetic and input validation checks with `node --test tests/estimate-model.test.cjs`.

## November 6, 2026: digital presence positioning and visitor clarity

The corporate homepage is now structured around a plain-language offer:

**The Sterlings helps individuals, first-time portfolio creators, freelancers, professionals, small business owners and organizations establish a digital presence through digital spaces and practical digital solutions.**

Changes:
- New first-fold message: "Build your digital presence" plus audience-specific examples and direct links to the Studio or inquiry.
- "Who we help" section: four visitor pathways with preselected contact inquiry types.
- Three service modes: self-service Studio (browser-based HTML export today); website rental (inquiry / quote only); managed websites (individually scoped and quoted).
- Dedicated explanation of digital spaces (sites/portfolios/presentations) and digital solutions (useful features such as inquiries/catalogs/appointment requests, subject to feasibility and agreement).
- Updated process, plain-language FAQ, visible current business contact email and detailed inquiry handoff disclaimer.
- Public privacy.html with accurate operational details about email handoff, local browser drafts, external assets and absent checkout.
- Unified main-site and Showroom menus; no decorative emoji or upward-arrow CTA glyphs.

Commercial truth: the public site does not support payment, customer accounts, automatic rental subscription or one-click publishing. The Studio currently supports preview, draft storage in the browser and HTML export. No service pricing or domain ownership terms have been invented. Named staff, company registration evidence, real case studies and final customer contracts remain unpublished until independently confirmed.

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