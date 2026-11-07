# Website estimator — pricing proposal for review

Status: **proposed, not approved for customer publication**. Currency: PHP.

The calculator and request flow are complete on the `codex/website-estimator` branch. Keep this version on a review deployment until the rate card is agreed. The page, printable summary, download and email draft all identify these as proposed rates. There is no checkout, binding quotation, billing or service activation.

## Proposed base rates

| Item | One-time | Monthly |
| --- | ---: | ---: |
| Website build, 1 page, tailored starting layout | ₱18,000–₱28,000 | None selected |
| Website rental, 1 page | ₱5,000–₱8,000 | ₱2,500–₱4,500 |
| Each additional page, either service | ₱2,500–₱4,000 | — |
| Bespoke visual direction | ₱15,000–₱25,000 | — |
| Polish supplied copy, per page | ₱500–₱1,000 | — |
| Write copy, per page | ₱1,500–₱2,500 | — |
| Technical care, build projects only | — | ₱1,500–₱2,500 |
| Technical care and content updates, build projects only | — | ₱3,500–₱6,000 |

The rental range budgets for standard hosting and routine technical care. It does not add the optional care fee a second time. Hosting limits, rental terms, ownership, support workload and content update allowances must be defined in the formal quotation. A 12-month cost illustration is **not** a minimum contract term.

## Proposed features

| Feature | One-time |
| --- | ---: |
| Inquiry form provider integration | ₱3,000–₱5,000 |
| Existing booking tool integration | ₱4,000–₱8,000 |
| Catalogue, up to 20 items, without checkout | ₱5,000–₱10,000 |
| Blog setup with up to 3 starter posts | ₱6,000–₱10,000 |
| Migrate content from up to 10 existing pages | ₱5,000–₱10,000 |
| Second language, supplied translations, per page | ₱1,500–₱2,500 |
| Checkout, customer accounts, custom systems | Separate quotation |

The blog setup assumes supplied content; copywriting selected by page does not include separately authored blog posts. Integration setup is not the same as an active software subscription. All requested integrations need feasibility review. The current Sterlings site itself does not provide these customer services automatically.

## Useful examples

| Configuration | Setup | Monthly | First 12 months |
| --- | ---: | ---: | ---: |
| 1-page build, supplied content, no extras | ₱18,000–₱28,000 | None selected | ₱18,000–₱28,000 |
| 5-page build, supplied content, no extras | ₱28,000–₱44,000 | None selected | ₱28,000–₱44,000 |
| 5-page rental, supplied content, no extras | ₱15,000–₱24,000 | ₱2,500–₱4,500 | ₱45,000–₱78,000 |

These are proposed budgeting assumptions, not researched market statistics or previously approved company prices. They separate delivery work from ongoing service and keep custom systems out of a misleading automatic total. Domain purchase/renewal, paid providers, applicable taxes, photography, branding and translation are excluded. Hosting is separately quoted for a one-time build.

## Publishing the approved rates

1. Agree the service scope, ranges and exclusions above. Edit `estimate-pricing.js`, the sole rate source, as needed.
2. Update its `version` and set `status` to `approved` only when approval is recorded. The interface and all outputs then change to indicative-estimate wording automatically.
3. Remove the review-only `noindex,nofollow` metadata from `estimate.html` if the customer page should be indexed.
4. Run `node --test tests/estimate-model.test.cjs`, adapting fixed expectations to any approved rate changes. Check the browser request, printing and mobile flow.
5. Merge to the production branch and verify the deployed page. Do not describe it as an automatic binding quotation.

## Technical and data behavior

- Plain HTML/CSS/JavaScript, no extra infrastructure or paid dependency.
- Pure arithmetic and normalization are in `estimate-model.js`; UI code is in `estimate.js`.
- URL values are allowlisted. Prices are recalculated from the current rate card, never trusted from links or saved state.
- No contact details in saved choices or share links. Local saving is opt-in. Reset removes saved choices.
- The full request can be copied or viewed even when a device cannot open an email app. No message is sent by the page.
- More than 20 pages, custom systems and rush timelines mark the result as a priced portion, with unpriced work listed explicitly.

## Verification completed November 8, 2026

- Nine Node tests pass, including 2,268 representative pricing combinations, required unpriced features, duplicate feature removal, malformed input, URL round trips and Manila date formatting.
- Chromium browser checks pass for interactive prices, rental/care separation, custom scope flags, opt-in saving, reset, shared selections, no stored/shared contact information, clipboard-denial fallback, downloaded text, print/PDF output, prepared email content and keyboard selection. No messages were sent.
- No horizontal overflow on the estimator, homepage or Showroom at 320, 390, 768, 960, 1024, 1200 and 1440 CSS pixels. Mobile menu and the no-JavaScript inquiry fallback were checked.
- These checks used Chromium with mobile viewport emulation, not physical iOS or Android devices. No payment, customer hosting or subscription fulfillment was tested or activated.
