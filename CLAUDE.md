# Mistuzzo — Web Design Website

## Project Overview

**Project Name:** Mistuzzo  
**Website URL:** https://mistuzzo.com  
**Business Type:** Web Design Agency  
**Primary Offer:** FREE Demo Website for Businesses  
**Deployment Platform:** Netlify  
**Current Status:** Active — Facebook Ads driving traffic to `/demo`

---

## Business Model & Strategy

### Core Offering
- FREE custom demo website for business owners (no obligation)
- Revenue from paid hosting/maintenance after client approves demo
- Web design and development services only (no digital marketing services offered)

### Key Value Propositions
1. Risk-free demo website (completely free, 48hr turnaround)
2. Professional web design without upfront cost
3. No pricing displayed publicly — discussed on calls only
4. 100% satisfaction guarantee

### Marketing Strategy
- Facebook Ads → `/demo` (dedicated ad landing page, noindex)
- SEO → main site pages (index, contact, portfolio, about, services)
- Local SEO keywords: Hinckley, Ashby de la Zouch, Coalville (in meta only, not visible copy)
- Google Reviews (Elfsight widget) for social proof

---

## File Structure

```
mistuzzo/
├── index.html              # Homepage — hero, portfolio preview, reviews, CTAs
├── contact.html            # Contact/demo request form (Netlify) + founders strip
├── portfolio.html          # Full portfolio grid (9 items)
├── about.html              # Founders & company values
├── services.html           # Web design, web development, SEO services
├── demo.html               # Ad landing page (noindex) — full Sabri Suby funnel
├── thank-you.html          # Post demo-request confirmation (noindex)
├── download.html           # Lead magnet PDF download + demo upsell (noindex)
├── cookies.js              # Meta Pixel GDPR loader (shared across funnel pages)
├── privacy-policy.html     # Privacy policy (UK GDPR — linked from cookie banner & footers)
├── make-deploy.ps1         # Builds clean deploy/ folder for Netlify drag-and-drop
├── _internal/              # NOT deployed — archives, logs, stats, old files
│
├── styles/
│   └── styles.css          # Shared stylesheet for main site pages
│
├── assets/
│   └── 5-Reasons-Youre-Losing-Customers-Online.pdf  # Lead magnet PDF
│
├── favicons/               # Full favicon set
│   ├── favicon.ico
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   └── site.webmanifest
│
├── logos/                  # Client logos for ticker strip (original colour)
│   ├── sweetst.png
│   ├── punjabifolkentertainment.png
│   ├── shifa-logo.png
│   ├── thedaughterbaker.png
│   ├── pbakedit.jpg
│   ├── mkmoments.png
│   └── teachersconnect.jpeg
│
├── portfolio/              # Portfolio screenshots (domain-named files)
│   ├── checkoutwebsite.netlify.app.png
│   ├── aestheticclinic.netlify.app.png
│   ├── thedaughterbaker.co.uk.png
│   ├── teddyshair.co.uk.png
│   ├── pbakedit.co.uk.png
│   ├── punjabifolkentertainment.com.png
│   ├── mkpatisserie.co.uk.png
│   ├── shifascateringblackburn.co.uk.jpeg
│   └── sweetst.co.uk.jpeg
│
├── about/                  # Founder photos
│   ├── jayden.jpeg
│   └── lorenzo.jpeg
│
├── robots.txt              # Allow all, points to sitemap
├── sitemap.xml             # 5 main pages (demo/thank-you/download excluded)
└── CLAUDE.md               # This file
```

---

## Tech Stack

- **Hosting:** Netlify (drag-and-drop deploy, no build step)
- **Forms:** Netlify Forms (`data-netlify="true"`) — email to mistuzzo.marketing@outlook.com
- **Fonts:** Google Fonts — Poppins (headings 700/800/900), Outfit (body 300–800)
- **Icons:** Font Awesome 6.5.1 (CDN)
- **Animations:** none on main site pages (AOS removed July 2026); demo.html funnel page still uses AOS v2.3.4 (CDN)
- **Reviews:** Elfsight Google Reviews — widget ID `elfsight-app-d169149b-33a2-4ed8-b72b-32af608d283e`
- **Analytics:** Meta Pixel via `cookies.js` (GDPR consent-gated)

---

## Design System

### Colours
```css
--black: #0a0a0a;       /* Page background */
--dark: #0f0f0f;        /* Section-dark background, flat panels */
--cyan: #00e5ff;        /* Brand accent — CTAs, links, small icons ONLY */
--white: #f2f2f2;       /* Headings */
--grey: #8f8f8f;        /* Body text, labels */
--text: #c5c5c5;        /* Secondary text */
--hairline: #222;       /* Borders, section dividers */
```

### Visual Style
Flat, editorial dark theme (redesigned July 2026 — v3.3). No glow blobs, no grain overlay, no glassmorphism, no hover-lift transforms, no scroll animations on main pages. Cyan is reserved for CTAs, links and small icons only — never for headline words or decorative gradients. Cards are unboxed: hairline top rules (`#2e2e2e`) instead of bordered glass panels. Headings use Outfit 600 with tight letter-spacing (Poppins remains only in the MISTUZZO logo wordmark). Page headers and the homepage hero are left-aligned. Hairline color token: `--hairline: #222`. Logo ticker renders grayscale, colour on hover.

### Fonts
- **Headings & body:** Outfit (headings 600, tight letter-spacing; body 300–800)
- **Logo wordmark only:** Poppins 800

### Breakpoints
- `968px` — stacks most grids to single column
- `600px` — tightens padding, adjusts mobile-specific elements

### Mobile Navigation
Slide-in drawer from the right at ≤968px. Implementation:
- `.nav-links` uses `transform: translateX(100%)` by default; `translateX(0)` when `.open`
- `.nav-backdrop` (created via JS, appended to body) fades in behind the drawer
- Body scroll locked (`overflow: hidden`) while drawer is open
- Closes on: backdrop click, nav link click, hamburger tap
- z-index: drawer = 10000, backdrop = 9999

---

## Pages

### Main Site Pages (indexed by search engines)

#### index.html — Homepage
Sections: Hero (flat, left-aligned typographic — no background image), Logo Ticker, "What We Do" (3 hairline-ruled columns), Portfolio Preview (4 items: pbakedit, punjabifolkentertainment, teddyshair, thedaughterbaker), "Why Free Demo" (4 hairline-ruled columns), Google Reviews (Elfsight), Final CTA.

SEO: `Professional Web Design | Mistuzzo` — local keywords in meta, structured data (ProfessionalService + WebSite schemas).

#### contact.html — Contact/Demo Request
Two-column layout: left = Netlify form + what-happens-next steps + direct contact box; right = package checklist + info cards. Google Reviews section. Form: name, WhatsApp, business name, social handle.

Form config:
```html
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/thank-you.html">
    <input type="hidden" name="form-name" value="contact">
    <input type="hidden" name="bot-field">
```

#### portfolio.html — Portfolio
9-item grid: checkoutwebsite (KOVA), aestheticclinic (Maison Aura), thedaughterbaker, teddyshair, pbakedit, punjabifolkentertainment, mkpatisserie, shifascateringblackburn, sweetst (last). CTA block at bottom.

#### about.html — About
Mission section (text + inline stats row — stock team photo removed in v3.3), founders grid (Jayden + Lorenzo, unboxed portraits), values (3 hairline-ruled columns), CTA.

Founder photo positioning:
- Jayden: `object-position: center 40%` (portrait — crop anchored to face)
- Lorenzo: `object-position: center top` (default class value)

#### services.html — Services
Three service blocks: Web Design, Web Development, SEO Optimisation. No digital marketing services. "Everything Included" 12-item grid. CTA. No pricing displayed.

---

### Funnel Pages (noindex — ad traffic only)

#### demo.html — Ad Landing Page (`/demo`)
Full Sabri Suby 17-step funnel. Minimal nav (logo + CTA only, no site nav). Two Netlify forms:
- `demo-request` → redirects to `/thank-you.html`
- `lead-magnet` → redirects to `/download.html`

All content self-contained (inline CSS, no external stylesheet dependency). Includes: hero + form, logo ticker, problem story, solution cards, Google Reviews, why-free-demo, portfolio (8 items), benefits, value stack/offer, intrigue bullets, lead magnet, P.S. closing, Meta Pixel via cookies.js.

#### thank-you.html — Demo Request Confirmation
Shown after `demo-request` form submits. 3-step process explained. Fires `fbq('track', 'Lead')` when pixel is ready. Back link → `/`.

#### download.html — Lead Magnet Download
Shown after `lead-magnet` form submits. PDF download button → `/assets/5-Reasons-Youre-Losing-Customers-Online.pdf`. Upsell section → `/demo#demo-form`. Fires `fbq('track', 'Lead')`. Back link → `/`.

---

## Forms

### Netlify Form Setup
All forms use `data-netlify="true"` and a hidden `<input type="hidden" name="form-name" value="...">` field. Netlify auto-detects on first deploy.

**To enable email notifications (one-time setup after deploy):**
1. Netlify Dashboard → Site → Forms
2. Select each form → Notifications → Add notification
3. Email: `mistuzzo.marketing@outlook.com`
4. Repeat for `contact`, `demo-request`, and `lead-magnet`

### Forms in the project
| Form name | Page | Action |
|---|---|---|
| `contact` | contact.html | `/thank-you.html` |
| `demo-request` | demo.html | `/thank-you.html` |
| `lead-magnet` | demo.html | `/download.html` |

---

## Meta Pixel & Cookie Consent

All pixel logic lives in **`cookies.js`** — the only file that needs editing to activate tracking.

### To activate
1. Get Pixel ID from Meta Events Manager → Connect Data Sources → Web
2. Open `cookies.js` and replace `'YOUR_PIXEL_ID'` on line 2

### How it works
- **First visit:** branded cookie consent banner appears (bottom of screen)
- **Accept:** pixel loads, `PageView` fires, consent stored (`mm_cookie_consent=accepted`)
- **Decline:** nothing fires, consent stored, no banner on return
- **Return visit (accepted):** pixel loads silently

### Pixel events
| Page | Events |
|---|---|
| `demo.html` | `PageView` |
| `thank-you.html` | `PageView` + `Lead` (demo request conversion) |
| `download.html` | `PageView` + `Lead` (lead magnet conversion) |

---

## SEO

### Local Keywords Strategy
Towns **Hinckley, Ashby de la Zouch, Coalville** are kept in:
- `<meta name="keywords">`
- `<meta name="description">`
- Open Graph and Twitter Card descriptions
- Structured data `areaServed`

They are **NOT** in any visible copy — all visible copy says "UK-wide" or "across the UK" to avoid limiting perceived service area.

### Structured Data
All main pages have JSON-LD. Homepage and contact have ProfessionalService + WebSite schemas with `areaServed` listing local towns + UK.

### Sitemap & Robots
- `sitemap.xml` — lists 5 main pages at mistuzzo.com with 2026-05-09 dates
- `robots.txt` — `Allow: /`, `Sitemap: https://mistuzzo.com/sitemap.xml`
- Funnel pages (demo, thank-you, download) have `<meta name="robots" content="noindex, nofollow">`

### Search Console Verification

**Google Search Console:**
1. Go to https://search.google.com/search-console
2. Add property → URL prefix → `https://mistuzzo.com`
3. Choose "HTML tag" verification method
4. Copy the `<meta name="google-site-verification" content="...">` tag
5. Paste inside `<head>` in `index.html` (before deploy)
6. Click Verify in Search Console
7. Submit sitemap: `https://mistuzzo.com/sitemap.xml`

**Bing Webmaster Tools:**
1. Go to https://www.bing.com/webmasters
2. Add site → `https://mistuzzo.com`
3. Choose "XML file" or "Meta tag" verification
4. If meta tag: paste into `index.html` `<head>`, deploy, then verify
5. Submit sitemap after verification

---

## Deployment Checklist

### Files to deploy (drag-and-drop to Netlify)
Run `make-deploy.ps1` — it builds a clean `deploy/` folder containing only the live files, then drag `deploy/` onto Netlify. Never drag the project root (it contains CLAUDE.md, `_internal/`, and git files).

Deployed set: all main + funnel .html files, privacy-policy.html, cookies.js, robots.txt, sitemap.xml, BingSiteAuth.xml, googlec6fa2383d904a23d.html, and the styles/, assets/, favicons/, about/, portfolio/, logos/ folders.

### After first deploy
- [ ] Set up Netlify form notifications (3 forms) → mistuzzo.marketing@outlook.com
- [ ] Test all 3 forms submit correctly and redirect to correct pages
- [ ] Activate Meta Pixel: replace `'YOUR_PIXEL_ID'` in cookies.js
- [ ] Verify Google Search Console (meta tag in index.html head)
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Bing Webmaster Tools
- [ ] Test cookie consent banner appears and pixel fires on accept
- [ ] Test PDF download works (assets/5-Reasons-Youre-Losing-Customers-Online.pdf)
- [ ] Check all portfolio images load
- [ ] Test mobile layout on real device

---

## Critical Rules

### NEVER DO
- Display pricing — discussed on calls only
- Mention digital marketing, Facebook ads, or email marketing as services offered
- Use location-specific copy in visible text — say "UK-wide" instead
- Add React/Vue/Angular — vanilla JS only
- Obfuscate emails — all emails plain text
- Add Hinckley/Ashby/Coalville to visible page copy
- Index demo.html, thank-you.html, or download.html — keep noindex

### ALWAYS DO
- Keep FREE demo as the core CTA on every page
- Test forms after every deploy
- Update sitemap.xml when adding new indexable pages
- Keep Netlify form `<input type="hidden" name="form-name">` field present
- Keep cookies.js on all funnel pages (demo, thank-you, download)
- Keep the dark/cyan design system consistent across all pages

---

## Contact Information

**Business Email:** mistuzzo.marketing@outlook.com  
**WhatsApp:** +44 7359 713107  
**Instagram:** @mistuzzo_marketing  
**Website:** https://mistuzzo.com

**Founders:** Jayden (design & development) + Lorenzo (strategy & client relations)

---

## Version History

**Version 3.3 — July 2026**
- Full visual de-slop of the 5 main pages + privacy policy (funnel pages untouched):
  glow blobs, grain overlay, glassmorphism cards, gradient hover borders, hover-lift
  transforms, AOS scroll animations, and two-tone cyan headlines all removed
- Homepage hero: Unsplash stock background removed → flat, left-aligned typographic hero
- About page: generic Unsplash stock "team" photo removed (was not the actual team)
- Cards unboxed to hairline-ruled columns; icon squares → small plain cyan icons
- Headings: Poppins 800 → Outfit 600 (Poppins kept for logo wordmark only)
- Logo ticker: grayscale with colour on hover
- Cyan restricted to CTAs, links and small accents

**Version 3.2 — July 2026**
- Created privacy-policy.html (was 404 on live site despite cookie banner + footers linking to it)
- CTR-focused title tags on index, portfolio, services (offer in the title, not just "Professional Web Design")
- Founders strip (photos + "deal directly with us") added to contact form card
- NOTE: business stays generalist — no niche positioning in site copy (owner decision, July 2026)
- Fixed about/Jayden.JPEG → jayden.jpeg case mismatch (photo 404'd on Netlify's case-sensitive hosting)
- Deploy hygiene: internal files moved to _internal/; make-deploy.ps1 builds clean deploy/ folder

**Version 3.1 — May 2026**
- Slide-in drawer navigation (right side) replacing full-screen overlay — all 5 main pages
- About page: stock image hidden on mobile; founder photo positioning fixed (Jayden center 40%)
- All 3 Netlify forms: added honeypot spam protection

**Version 3.0 — May 2026**
- Full dark/cyan redesign of all 5 main pages
- Removed all "Marketing" from business name
- Removed digital marketing services (web design only)
- Fixed domain to mistuzzo.com throughout
- Local SEO keywords in meta only (not visible copy)
- Background image hero on homepage
- 9-item portfolio grid (KOVA + Maison Aura added)
- Integrated ad landing page as demo.html
- Added thank-you.html, download.html, cookies.js, assets/ folder
- Meta Pixel GDPR-compliant loader
- Lead magnet PDF funnel
