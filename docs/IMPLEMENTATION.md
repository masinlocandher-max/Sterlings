# THE STERLINGS website, first release

The approved brand direction is the 15-page identity presentation created on November 4, 2026. The standalone supplied THE STERLINGS logo is authoritative. Older Sterling Group or teal concepts are superseded.

## Implemented

- Responsive homepage, solutions, template gallery, rental, managed website and digital solutions pages.
- How-it-works page, project brief flow, privacy explanation and preview information.
- Four template styles with previews, a local editor and a workspace for drafts.
- Editable headline, description, action, about, services, contact and theme.
- Local draft persistence with failure feedback, search and explicit deletion.
- Standalone HTML export with embedded fonts and image. No server is needed to view the downloaded website.
- Project brief download. The brief is never represented as a sent inquiry or confirmed order.

## Intentional first-release differences from the visual concepts

The navigation says **Workspace**, rather than Sign in, because this version has no customer authentication. The editor says **Download website**, rather than Publish, because live publishing is not connected. The dashboard shows actual local drafts, without invented published sites, billing data or account activity. Template examples are illustrative.

## Not connected

Customer accounts, cloud sync, hosted customer sites, domains, payments, email delivery, managed service fulfillment and production pricing. Browser storage is not authentication. Do not sell these as live features. Review and approve commercial and privacy terms before opening the service publicly. The review deployment is private and excluded from indexing.

## Source and publishing

GitHub repository: `masinlocandher-max/Sterlings`. The source remains in this repository. The `.openai/hosting.json` manifest identifies the private review deployment. Keep that project ID on later updates. All paths in `scripts/prepare-routes.mjs` receive an HTML entry point for static-host direct navigation. Unknown URLs serve a route-aware not-found screen.

Run `npm ci`, `npm test`, `npm run build`. Use `npm run dev` for development. Use the managed preview command in the hosted development environment. Never commit credentials or local runtime data.

## Design tokens

Onyx #282723; taupe #8A7A67; sand #C9B8A3; ivory #F5EFE6; cloud #FBF9F6; champagne #C8A063. Body text uses onyx and a darker muted neutral for readability. Playfair Display and Inter are self-hosted. The supplied logo image is displayed proportionally with a layout crop, not redrawn. The original remains in `public/assets/logo-master.jpg`.

## Asset provenance

Logo: user supplied. Editorial and product illustrations: generated for this project using the supplied brand direction. Hero product asset uses the homepage presentation as reference. Website template photograph is a generated ceramic still life. These are not photographs of a real office, customer or deployed product. Files are transcoded to WebP without semantic editing for delivery. Fonts originate from the official Google Fonts repository, with accompanying OFL license files.

## Data boundary

Drafts are stored under `sterlings.drafts.v1` in localStorage, limited to 50 per device. Invalid and unsupported data is ignored safely. No advertising or analytics scripts are included. Exported HTML escapes user content and permits only HTTP(S), mailto, tel and section links. Project brief input exists only in memory until downloaded. No remote submission occurs.
