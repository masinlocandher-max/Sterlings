# First-build verification

2026-11-04. This is an owner-private working website preview, not a launched subscription service.

## Completed checks

- Node tests: 7/7 passed, covering draft persistence, malformed data, storage failure, HTTP-preview ID generation, export escaping, safe links and template defaults.
- Browser: homepage and template navigation; category filtering; full template dialog; template-to-editor creation; live name/headline/theme changes; desktop/mobile editor toggles; saved draft restoration after reload.
- Browser: 390 × 844 CSS viewport in a same-origin iframe; homepage layout and navigation menu; four-step rental brief with radio choices, text fields and page selection.
- Desktop: no horizontal overflow at 1348px; all homepage images loaded.
- Corrected a crypto.randomUUID dependency that failed on the local HTTP preview, using Web Crypto random bytes as a fallback.
- Scoped preview section IDs so multiple template instances do not share anchor destinations.
- Website export prepares an explicit Save website file link, which was observed in the browser. Export markup, escaping and safe links pass automated checks. The cloud browser did not return a completed file-save event; disk-level download verification remains incomplete.
- Private deployment succeeded. The hosted URL presents the expected ChatGPT sign-in gate to this unauthenticated browser, so authenticated hosted workflows remain unverified.

## Design comparison

Reference: approved homepage desktop/mobile concept from the brand identity presentation.

| Element | Implementation and comparison |
| --- | --- |
| Logo | Original supplied horizontal artwork, cropped with CSS; original symbol and wordmark preserved. |
| Hero | Two-column editorial composition with the same headline and supporting copy; floating product artwork on the right. |
| Typography | Self-hosted Playfair Display and Inter, with generous leading and restrained tracking. |
| Color | Brand palette retained; gold restricted to rules and tiny accents. |
| Choices | Three service paths retain the approved order, titles and short descriptions. |
| Phone layout | Headline, stacked calls to action, then product artwork; menu replaces desktop links. |

## Copy differences and intentional changes

Headline, supporting paragraph, Build my website, Explore managed plans, Choose your way online and the three service descriptions match the approved concept. Workspace replaces Sign in because customer authentication is not connected. The working editor offers Download website rather than an unimplemented Publish action. Placeholder commercial metrics, prices and testimonials are omitted. The rental service leads to a downloadable project brief rather than claiming an order has been sent.

## Boundaries

No customer authentication, payments, server-side draft storage, domain management, email submission or customer-site hosting is implemented. Drafts are saved only in the current browser. The browser checks are not a full cross-device accessibility or performance audit.
