# Homepage reference fidelity and verification

November 4, 2026. The latest desktop/mobile image supplied by the user is the active design specification. This supersedes the earlier editor-focused homepage.

## Visual review

Compared the supplied reference directly with browser-rendered desktop and phone screenshots using image inspection. The desktop was reviewed at 1086 CSS pixels, with a 390 CSS pixel phone viewport. A same-origin review wrapper displayed native page viewports at a reduced visual scale for the final combined screenshot. The wrapper is excluded from production and removed after review.

| Reference feature | Final implementation |
| --- | --- |
| Header | Original horizontal logo, Solutions dropdown, Templates, Pricing, About, Contact and Get Started. Phone menu replaces desktop links. |
| Architectural hero | Ivory sculptural left field, warm oak/window photograph on the right, headline with italic second line, original promise and two CTAs. Desktop hero is approximately 335px high at reference width. |
| Typography | Self-hosted Playfair Display, including its real italic face, and Inter. Uppercase tracked section labels, compact serif service headings. |
| Four solutions | Self-Service Websites, Website Rental, Managed Websites and Digital Business Solutions; four textured cards on desktop, compact linked rows on phones. |
| Process | Choose / Customize / Launch with matching outline icon metaphors, side-by-side on desktop and mobile. |
| Benefits | Horizontal warm benefit strip on desktop; four icon labels with separators on phones. |
| Templates | Three photographic cards on desktop and one on mobile; previous/next controls cycle actual template-preview links. Names match Business Pro, Creative Studio and Brand Space. |
| Quote and closing | Editorial quote layout and brand attribution, followed by a dark sculptural closing banner. No invented endorsement or rating. |
| Logo | User-supplied raster master is unchanged and proportionally cropped for display. No unrelated emblem or redesigned monogram. |
| Mobile | Logo/menu, compact hero with architectural strip, four solution rows, process icons, benefit row, single template carousel and rounded dark closing. |

The architectural and template photographs were recreated as separate production assets; they are not the identical pixels from the composite reference. Font rendering and responsive dimensions also vary by browser. The final implementation closely follows the composition without representing a literal pixel-perfect copy.

## Above-the-fold copy comparison

All requested navigation labels, THE STERLINGS eyebrow, “Digital Spaces, Thoughtfully Made.” headline, “A place online, built around you.” promise, supporting sentence, Get Started and Explore Solutions actions, and the Our Solutions heading match the reference. No extra headline, badge, metrics or product claims were added above the fold.

## Deliberate content differences

- The unverified Isabel Ramos endorsement, customer portrait, five-star rating and “Trusted by growing brands” wording are replaced with THE STERLINGS brand promise and original monogram.
- A compact footer links to My workspace, Privacy and About this preview.
- Pricing and contact pages explain the current preview's limits rather than inventing prices, contact details or delivered enquiries.

## Checks

- Production build succeeded; all seven existing persistence, export safety and template-default tests passed.
- Desktop Solutions menu opens and Escape dismisses it.
- Template carousel advances and reverses; Business Pro opens the matching template dialog.
- Pricing, About and Contact navigation render their intended pages.
- Get Started opens the existing project brief flow.
- The 390px phone menu opens; selecting Pricing navigates and closes it.
- The final 1086px desktop and 390px phone review canvases have no horizontal content overflow.
- Browser screenshot includes loaded logo, fonts and photographic assets. Browser-extension metadata warnings are unrelated to application code.

The prior functional verification of the editor, saved drafts and brief review is retained in QA.md. Download completion and authenticated hosted workflows have the same limitations recorded there. No backend billing, customer login or public customer-site publishing was introduced by this UI change.

Final browser evidence: screenshots/home-desktop-mobile.jpg.
