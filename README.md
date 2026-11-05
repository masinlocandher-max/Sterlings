# THE STERLINGS
**Digital Spaces, Thoughtfully Made.**  
*A place online, built around you.*

This repository implements the working frontend of THE STERLINGS, a digital spaces business. It replaces the initial planning-only repository with a responsive corporate website and a browser-based website studio.


## Showroom and navigation (2026-11-05)

- showroom.html: interactive public Showroom with four fictional sample brands and selectable live website previews, with desktop/mobile viewport toggles.
- showroom-preview.html: individual shareable demo sites, selected with a whitelisted space query parameter: atelier, residence, business, portfolio.
- showroom.js and showroom-preview.js: client-only selection and preview controls, with no customer account requirement.
- showroom.css and showroom-preview.css: responsive concept designs for creative practice, boutique hospitality, professional services, and personal photography.
- Navigation: proper desktop Solutions dropdown; mobile overlay menu with focus support, Escape-to-close, link-close, outside-click dismissal, and background scroll lock.
- Showroom conversion: Discuss this design opens the homepage inquiry with the chosen concept prefilled. The inquiry remains an email-app handoff; no backend submission is implied.
- No emoji-based interface decoration: symbol-style ornaments replaced with CSS details or SVGs.

**Preview URLs**
- /showroom.html
- /showroom.html?concept=residence
- /showroom-preview.html?space=atelier
- /showroom-preview.html?space=residence
- /showroom-preview.html?space=business
- /showroom-preview.html?space=portfolio

Showroom examples are original marketing demonstrations, not customer references or purchased, production-ready rental templates.

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