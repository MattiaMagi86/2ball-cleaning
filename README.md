# 2Ball Cleaning — one-page website

A complete, responsive one-page site for **2Ball Cleaning**, a residential and commercial cleaning service based in Summerside, Prince Edward Island.

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
│   └── logo/               # Ball mark, dark/light logo lockups, Apple icon
├── favicon.svg
└── README.md
```

No image or font is hot-linked. Everything needed to render the page is stored in this folder.

---

## Design system

| Token | Value | Use |
| --- | --- | --- |
| Ink | `#101614` | Text, dark sections, footer |
| Teal | `#0C3B34` | Accent headline, contact section |
| Signal yellow | `#F4D000` | Primary CTA, highlights, ball mark |
| Warm white | `#F5F1E8` | Page background |
| Paper | `#FFFDF7` | Alternating sections |
| Muted | `#59635C` | Body copy on light backgrounds |

Type is set in **Space Grotesk** (display) and **Manrope** (body), both self-hosted from the Google Fonts OFL release. Display sizes use `clamp()` so the hero scales from mobile to large desktop without hard breakpoints.

The full design system lives in the custom properties at the top of `css/styles.css`.

---

## Verified content (and sources)

The original site at <https://2ballcleaning.site/> is a GoDaddy one-pager containing only the company name, the line “Clean Spaces, Happy Places”, a contact form and an email sign-up. It does **not** publish services, a phone number, an email address, an address, prices, reviews or a logo image.

To avoid inventing details, the redesign uses only information confirmed by 2Ball Cleaning’s own pages and listings:

| Detail used | Source |
| --- | --- |
| Company name, “Clean Spaces, Happy Places”, professional cleaning positioning | <https://2ballcleaning.site/> |
| Standard Cleaning, Deep Cleaning, Move-In/Move-Out Cleaning, Office Cleaning; preferred date and time; property address; room details | The company’s own booking form: <https://form.jotform.com/261204382762050> |
| Phone `(902) 916-9536` | Yelp listing, and repeated in the company’s Facebook posts that link to `2ballcleaning.site` |
| Summerside, PEI base and surrounding-area service | Yelp listing, Instagram bio (“Summerside, PE”), Facebook posts for Summerside and Wellington jobs |
| Residential and commercial cleaning | Instagram bio and the booking form’s service types |

### Deliberately omitted

These were not confirmed and should be added only when the client supplies them:

- **Public email address** — none is published. The contact section therefore uses the verified phone number and the quote form only. Add an email to the contact/footer (and the JSON-LD) when available.
- **Street address, business hours, pricing, insurance/bonding, years in business, guarantees, eco claims** — none were verified, so none are claimed.
- **Testimonials** — the original site has no genuine reviews, so the testimonials section was replaced with a useful “Good to know” information band. Do not add invented reviews, ratings or platform badges.

All copy has been rewritten to be concise and conversion-focused, while keeping those facts unchanged.

### Logo

The original site does not have an image logo — only text set in a spaced sans-serif. The identity here is therefore a **recreation**, not a download: a yellow ball mark plus a Space Grotesk “2BALL / CLEANING SERVICES” wordmark. Files are in `assets/logo/`:

- `2ball-mark.svg` — vector ball mark
- `2ball-logo-dark.png` / `2ball-logo-light.png` — 2× lockups for email, print and social use
- `apple-touch-icon.png` — full-bleed 180 px home-screen icon

If the company has an official logo file, replace these assets and the inline SVG marks in `index.html`, keeping the displayed size and aspect ratio.

---

## Photography

All photographs are free-to-use Pexels images downloaded and converted to WebP. They are **representative imagery**, not photos of 2Ball Cleaning’s own jobs, and the Results section says so on the page. The Pexels licence does not require attribution, but sources are credited here and in the footer.

| Local file | Pexels photo | Used for |
| --- | --- | --- |
| `assets/images/hero-cleaners.webp` | [6197121](https://www.pexels.com/photo/women-in-gray-shirt-and-orange-jumper-cleaning-the-house-6197121/) | Hero |
| `assets/images/standard-living.webp` | [31594918](https://www.pexels.com/photo/bright-scandinavian-living-room-interior-design-31594918/) | Standard Cleaning |
| `assets/images/deep-kitchen.webp` | [5591903](https://www.pexels.com/photo/woman-cleaning-a-kitchen-counter-5591903/) | Deep Cleaning |
| `assets/images/move-boxes.webp` | [4246119](https://www.pexels.com/photo/empty-apartment-with-packed-carton-boxes-before-moving-4246119/) | Move-In / Move-Out Cleaning |
| `assets/images/office-cleaners.webp` | [6197117](https://www.pexels.com/photo/women-in-working-clothes-cleaning-the-house-6197117/) | Office Cleaning |
| `assets/images/about-window.webp` | [6195281](https://www.pexels.com/photo/woman-in-gray-shirt-wiping-the-glass-window-6195281/) | About |
| `assets/images/gallery-living.webp` | [35395078](https://www.pexels.com/photo/bright-minimalist-living-room-with-sunlight-35395078/) | Gallery 01 |
| `assets/images/gallery-bathroom.webp` | [35493900](https://www.pexels.com/photo/bright-modern-minimalist-bathroom-interior-design-35493900/) | Gallery 02 |
| `assets/images/gallery-window.webp` | [12749678](https://www.pexels.com/photo/living-room-with-sofas-and-coffee-table-12749678/) | Gallery 03 |
| `assets/images/gallery-sink.webp` | [10573247](https://www.pexels.com/photo/cleaning-kitchen-in-latex-gloves-10573247/) | Gallery 04 |

Licence: <https://www.pexels.com/license/>

The social sharing image (`assets/images/og-2ball-cleaning.jpg`) was composed from the hero image and brand type.

If the client has authentic before-and-after photographs, swap them into the same filenames and update the Results intro/alt text so they are presented accurately.

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
- All ten local images, fonts, favicon and CSS/JS requested successfully (no 404s), and all image `width`/`height` attributes match their files.

### Without JavaScript

Content remains visible and anchor links work, but the quote modal and form require JavaScript. The form has no non-JS action; configure a backend and add a server-side fallback if non-JS submissions are required.

---

## Performance

- No JavaScript libraries, no CSS framework, no web-font network requests (fonts are local).
- Hero image is preloaded with `fetchpriority="high"`; all below-the-fold images use `loading="lazy"` and `decoding="async"`.
- Images are resized to their display needs and converted to WebP: total image payload is about 800 KB, with the hero at ~56 KB.
- `width` and `height` attributes on every image prevent layout shift.
- Scroll work uses passive listeners and `requestAnimationFrame`; reveals use IntersectionObserver.
- Animations are limited to transforms/opacity and respect reduced motion.

---

## SEO & deployment

Included:

- Descriptive title and meta description, canonical URL (`https://2ballcleaning.site/`), Open Graph and Twitter card metadata with a local 1200×630 image.
- One H1, descriptive alt text, semantic section structure.
- `LocalBusiness` JSON-LD using only verified details: name, phone, Summerside/PE locality, service description, logo/image, and the company’s Facebook and Instagram profiles. No invented address, hours, rating or price range.

The site is a static bundle: deploy the whole folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, cPanel). There is no build command.

Before going live:

1. Set the form endpoint and send a real test request.
2. If the domain changes, update the canonical URL, Open Graph URLs and JSON-LD URLs in `index.html`.
3. Replace the representative gallery photos if authentic project photos are available.
4. Add any newly confirmed details (email, hours, address, privacy policy) consistently across the page, footer and JSON-LD.
5. Serve over HTTPS and confirm the favicon and social image resolve at their absolute URLs.
