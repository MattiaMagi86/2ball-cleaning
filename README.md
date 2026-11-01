# 2Ball Cleaning — one-page website

A complete, responsive one-page site for **2Ball Cleaning**, a residential and commercial cleaning service based in Summerside, Prince Edward Island. Rated 5.0 across 33 Google reviews.

Built with semantic HTML5, CSS3 and vanilla JavaScript. No frameworks, no build step, no runtime dependencies.

---

## Run the site locally

From this folder:

```bash
python3 -m http.server 8765
```

Then open <http://localhost:8765/>.

Any static server works. For example:

```bash
npx serve .
```

Opening `index.html` directly with `file://` will load, but the local font files and form behaviour are best tested through a server.

---

## Project structure

```
.
├── index.html              # All page sections, SEO metadata and quote modal
├── css/
│   └── styles.css          # Design system, components, responsive rules, motion
├── js/
│   └── main.js             # Navigation, reveals, modal, validation, form submission
├── assets/
│   ├── fonts/              # Self-hosted Space Grotesk + Manrope (variable woff2)
│   ├── images/             # Optimised local WebP photography + OG image
│   └── logo/               # Official badge (WebP), Apple icon, supplied original
├── favicon.png
└── README.md
```

No image or font is hot-linked. Everything needed to render the page is stored in this folder.

---

## Design system

The palette is derived from the official badge: the navy outer ring, the mid-blue field and its pale-sky highlights. The previous warm ivory/teal/yellow scheme has been removed entirely.

| Token | Value | Use |
| --- | --- | --- |
| Ink | `#0C1B2E` | Text, Why 2Ball band, footer |
| Navy | `#1B2E5A` | Contact band, step numbers, deep accents |
| Brand blue | `#2E8FC0` | Logo-matched accent, eyebrow dots, hero headline accent |
| Button blue | `#1C7BA6` | Primary CTAs with white text |
| Sky | `#A9DAF0` | Links and CTAs on dark sections |
| Cool white | `#F2F7FA` | Page background |
| Paper | `#FBFDFF` | Alternating sections |
| Mist | `#EAF5FB` | Google reviews band |
| Muted | `#56697C` | Body copy on light backgrounds |
| Star gold | `#E3A008` | Google review stars |

The brand accent resolves through `--accent` / `--accent-deep` / `--accent-light`; on dark bands the light variant is used so links and buttons keep their contrast. Primary buttons are deep blue on light sections and pale sky on the Why and Contact bands.

Type is set in **Space Grotesk** (display) and **Manrope** (body), both self-hosted from the Google Fonts OFL release. Display sizes use `clamp()` so the hero scales from mobile to large desktop without hard breakpoints.

The full design system lives in the custom properties at the top of `css/styles.css`.

---

## Verified content (and sources)

The original site at <https://2ballcleaning.site/> is a GoDaddy one-pager containing only the company name, the line “Clean Spaces, Happy Places”, a contact form and an email sign-up. It does **not** publish services, a phone number, an email address, an address, prices, reviews or a logo image.

To avoid inventing details, the redesign uses only information confirmed by 2Ball Cleaning’s own pages and listings:

| Detail used | Source |
| --- | --- |
| Company name, “Clean Spaces, Happy Places”, professional cleaning positioning | <https://2ballcleaning.site/> |
| Standard Cleaning, Deep Cleaning, Move-In/Move-Out Cleaning; preferred date and time; property address; room details | The company’s own booking form: <https://form.jotform.com/261204382762050> |
| Standard, Deep, Move-In/Move-Out, Carpet & Upholstery Cleaning, Floor Stripping & Waxing; the work included in each service | Supplied by 2Ball Cleaning for this redesign (service sheet) |
| Phone `(902) 916-9536` | Yelp listing, and repeated in the company’s Facebook posts that link to `2ballcleaning.site` |
| WhatsApp link (`https://wa.me/19029169536`) in the footer | Requested by 2Ball Cleaning; it opens a chat on the same verified business number |
| Summerside, PEI base and surrounding-area service | Yelp listing, Instagram bio (“Summerside, PE”), Facebook posts for Summerside and Wellington jobs |
| Street address `454 MacEwen Rd, Summerside, PE C1N 6E9`; 5.0 rating from 33 reviews; quoted review text | The company’s Google Business Profile, “2 ball Cleaning Services” |
| Business hours: Mon–Sat 8:00 am – 5:00 pm, Sunday closed | The company’s GoDaddy site, <https://site-ymotohhdg.godaddysites.com/> (contact section) |
| Official logo and photographs from real jobs | The company’s GoDaddy site, <https://site-ymotohhdg.godaddysites.com/> (gallery “Our recent cleaning projects”), plus the logo file supplied by 2Ball |
| Residential and commercial cleaning | Instagram bio and the booking form’s service types |

### Deliberately omitted

These were not confirmed and should be added only when the client supplies them:

- **Public email address** — none is published. The contact section therefore uses the verified phone number and the quote form only. Add an email to the contact/footer (and the JSON-LD) when available.
- **Pricing, insurance/bonding, years in business, guarantees, eco claims, staff numbers** — none were verified, so none are claimed.
- **Additional reviews** — only three are reproduced. No review names, ratings, dates or platform badges have been invented.

All copy has been rewritten to be concise and conversion-focused, while keeping those facts unchanged.

### Services

The page presents the five services supplied for the redesign, each with its included work:

1. **Standard Cleaning** — dusting, tidying, bathrooms, bins, kitchen surfaces, general upkeep.
2. **Deep Cleaning** — bathrooms, floors, walls and sills, cupboards, carpet steaming, upholstery, appliances, neglected areas.
3. **Move-In / Move-Out Cleaning** — bathrooms, walls and floors, kitchen and appliances, cupboards, surfaces, all rooms.
4. **Carpet & Upholstery Cleaning** — steam cleaning, deep extraction, stain treatment, cleaning solutions, odour neutraliser, furniture refresh.
5. **Floor Stripping & Waxing** — stripping, machine scrubbing, residue removal, fresh finish and wax, buffing.

Descriptions were tightened for the web, but no service, inclusion or claim was added beyond the supplied list. The quote form’s service menu uses the same five names.

### Google reviews and address

The Google Business Profile for **2 ball Cleaning Services** (linked from the hero rating and the reviews section) is the source for:

- **454 MacEwen Rd, Summerside, PE C1N 6E9, Canada** — shown in the contact section, the footer, the map caption and the JSON-LD, with Google Maps directions links.
- **Mon–Sat, 8:00 am – 5:00 pm; Sunday closed** — shown in the contact details, the map caption, the footer and the JSON-LD `openingHoursSpecification`.
- **5.0 rating from 33 reviews** — shown as a linked rating pill in the hero and as the large score in the reviews section.
- **Three reviews**, reproduced verbatim (backwoods Burger, Jannine Parillas, Annette Nierop) and labelled “Google review”. The section links back to the originals and states where they come from.

Ratings and review counts change. When re-checking, update all three places at once: the hero pill, the reviews section (`5.0`, `33`, and the review cards) and the JSON-LD `aggregateRating` in `index.html`. Do not add a review that is not on the profile.

### Logo

The site now uses the **official 2Ball Cleaning badge**: navy outer ring, blue field, the two-ball broom/droplet icon, “2BALL / CLEANING SERVICES” and the line “expert care. every square.” It is shown at 42 px beside the Space Grotesk wordmark in the header and footer, and supplies the favicon, Apple touch icon, social card and JSON-LD logo.

Files in `assets/logo/`:

- `2ball-logo.webp` — 512 px badge used on the page, social card and metadata
- `apple-touch-icon.png` — 180 px home-screen icon on a deep-navy field
- `Logo.jpg` — the 1024 px original supplied by the company

`favicon.png` (64 px) sits at the project root. If the badge artwork changes, regenerate these three derivatives from the new original and keep the displayed header size at 42 px (36 px on small screens).

---

## Photography

All photographs on the page are **2Ball Cleaning’s own job photos**, taken from the gallery of their GoDaddy site (<https://site-ymotohhdg.godaddysites.com/>). They show team members in branded shirts working in Summerside-area homes and workplaces. No stock photography remains on the site.

Each image was art-directed and cropped for its slot, then resized and converted to WebP. Some rooms appear both as a service image and in the Results gallery as a different crop; those are the same job, not different clients.

| Local file | Source photo on the GoDaddy site | Used for |
| --- | --- | --- |
| `hero-team-cleaning.webp` | `IMG_7664.jpeg` | Hero |
| `standard-hallway.webp` | `IMG_7264.jpeg` | Standard Cleaning |
| `deep-kitchen.webp` | `IMG_7280.jpeg` | Deep Cleaning |
| `moveout-bathroom.webp` | `IMG_7870.jpeg` | Move-In / Move-Out Cleaning |
| `carpet-stairs.webp` | `att.2wA_Ar098A7X7U2UJIYYozNgvHKCgxi23kmDrZ9TC.jpeg` | Carpet & Upholstery Cleaning |
| `floor-kitchen.webp` | `IMG_7902.jpeg` | Floor Stripping & Waxing |
| `about-stove-detail.webp` | `IMG_7669.jpeg` | About |
| `gallery-kitchen.webp` | `IMG_7902.jpeg` (alternate crop) | Results 01 |
| `gallery-hallway.webp` | `IMG_7264.jpeg` (alternate crop) | Results 02 |
| `gallery-cooktop.webp` | `IMG_7280.jpeg` (alternate crop) | Results 03 |
| `gallery-stairs.webp` | `att.2wA_…jpeg` (alternate crop) | Results 04 |

The social sharing image (`assets/images/og-2ball-cleaning.jpg`) was composed from the official badge, the hero photo and brand type.

The photos are used on 2Ball’s own site. If more authentic project images arrive, add them in the same formats and update the alt text and Results intro so they stay accurate.

---

## Configure the quote form

The quote form is fully built and validated, but **it is not connected to an inbox by default**. It will not pretend to send a message. With no endpoint configured, submitting a valid form shows a clear configuration warning and the verified phone number.

### 1. Create a form endpoint

Using [Formspree](https://formspree.io/) (or any endpoint that accepts a POST):

1. Create a form in Formspree.
2. Copy its endpoint, which looks like `https://formspree.io/f/abcdwxyz`.
3. In `index.html`, set the form’s `data-endpoint`:

```html
<form class="quote-form" id="quote-form" method="post"
      data-endpoint="https://formspree.io/f/abcdwxyz" novalidate>
```

No API key or secret goes in the HTML — only the public form endpoint.

### 2. Endpoint requirements

- Accepts `POST` with `multipart/form-data` (the browser sends `FormData`).
- Returns a **2xx** response on success. With Formspree, JSON responses work automatically.
- If the endpoint is on another origin, it must allow CORS requests from the site’s domain.
- Field names sent: `name`, `email`, `phone`, `service`, `property`, `preferred_date`, `preferred_time`, `message`, plus the `_gotcha` honeypot field (leave empty / ignore it server-side).

Formspree treats the submitted `email` field as the reply-to address by default.

If your backend expects JSON instead of `FormData`, update the `fetch()` call in `js/main.js`.

### 3. Test it

Submit a completed form with the endpoint set. The success panel should appear only after a 2xx response. Then test an invalid endpoint: the form should stay visible and show a retry/phone message.

### Privacy note

The form says: “We’ll only use these details to respond to your request.” If a formal privacy policy exists, link it here and in the footer. No privacy-policy page was present on the original site, so none was invented.

---

## Map and hours

The contact section embeds OpenStreetMap for **454 MacEwen Rd, Summerside, PE C1N 6E9, Canada**. It is keyless: the iframe uses OpenStreetMap’s `export/embed.html` with a bounding box and marker coordinates, and no API key is needed. The same address, phone number and hours are also written out in the contact panel and footer, and are in the `LocalBusiness` JSON-LD.

The map’s **Get directions** link opens Google Maps, matching the Google Business Profile. Map tiles are © OpenStreetMap contributors; the licence credit appears in the iframe and in the caption.

The embed loads content from OpenStreetMap and sends the visitor’s IP address there. If a privacy policy is added, mention this third-party embed. To move the map, update the `bbox` and `marker` values in the iframe `src`; to remove it, delete the `.contact__map` figure.

Hours (from the company’s GoDaddy site) are:

| Day | Hours |
| --- | --- |
| Monday – Friday | 8:00 am – 5:00 pm |
| Saturday | 8:00 am – 5:00 pm |
| Sunday | Closed |

When the hours change, update the contact details, map caption, footer and JSON-LD together. Sunday is omitted from `openingHoursSpecification`, which is how closed days are represented.

---

## Accessibility & behaviour

Implemented:

- Semantic landmarks, one `<h1>`, logical heading order and a skip link.
- Sticky header, keyboard-operable mobile menu, Escape to close, focus returned to the menu button.
- Quote modal: `role="dialog"`, `aria-modal`, labelled and described, close button, backdrop click, Escape, background `inert`, body scroll lock, focus moved in, focus trapped, focus returned to the triggering button.
- Visible two-tone focus indicators on buttons and links.
- Inline, accessible validation (required fields, email format, phone length, no past dates), `aria-invalid` and error text linked with `aria-describedby`.
- Submission lock prevents duplicate requests; `role="alert"` announces status changes.
- Reduced-motion support: all reveals and smooth scrolling are disabled under `prefers-reduced-motion`, with content fully visible without JavaScript.
- Responsive down to 375 px and below; no horizontal overflow; the modal becomes a full-height panel on small screens.

Automated and manual checks performed:

- axe-core (WCAG 2.1 A/AA tags) on the page and open modal: **0 violations**.
- Chrome at 1440, 1024, 768 and 375 px: no horizontal overflow; header and gallery reflow correctly.
- Modal open/close, focus trap, Escape, focus return, mobile-menu focus and inert background tested with Puppeteer.
- Form success and failure states tested against a local mock endpoint, including a blocked double submit.
- All eleven content images, the logo, fonts, favicon and CSS/JS requested successfully (no 404s); every content image’s `width`/`height` attributes match its file, and the logo declares a 1:1 ratio.

### Without JavaScript

Content remains visible and anchor links work, but the quote modal and form require JavaScript. The form has no non-JS action; configure a backend and add a server-side fallback if non-JS submissions are required.

---

## Performance

- No JavaScript libraries, no CSS framework, no web-font network requests (fonts are local).
- Hero image is preloaded with `fetchpriority="high"`; all below-the-fold images use `loading="lazy"` and `decoding="async"`.
- Images are resized to their display needs and converted to WebP: total page image payload is about 1 MB across eleven images, with the hero at ~148 KB.
- `width` and `height` attributes on every image prevent layout shift.
- Scroll work uses passive listeners and `requestAnimationFrame`; reveals use IntersectionObserver.
- Animations are limited to transforms/opacity and respect reduced motion.

---

## SEO & deployment

Included:

- Descriptive title and meta description, canonical URL (`https://2ballcleaning.site/`), Open Graph and Twitter card metadata with a local 1200×630 image.
- One H1, descriptive alt text, semantic section structure.
- `LocalBusiness` JSON-LD using only verified details: name, phone, postal address, geo coordinates, opening hours, `hasMap`, service description, 5.0/33 `aggregateRating`, logo/image, and the company’s Google, Facebook and Instagram profiles. No invented price range or guarantees.

The site is a static bundle: deploy the whole folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, cPanel). There is no build command.

Before going live:

1. Set the form endpoint and send a real test request.
2. If the domain changes, update the canonical URL, Open Graph URLs and JSON-LD URLs in `index.html`.
3. Add more real project photos to the Results gallery as the company completes new jobs.
4. Add any newly confirmed details (email, privacy policy) consistently across the page, footer and JSON-LD.
5. Serve over HTTPS and confirm the favicon and social image resolve at their absolute URLs.
