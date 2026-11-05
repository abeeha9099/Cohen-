# Correction Plan — Cohen & Cohen Redesign

Date: 2026-11-05. Source: the live site's raw HTML/CSS (downloaded and parsed), not summaries.

## 1. What went wrong in v1
- **Brand replaced.** v1 used a cream/oxblood/coral palette taken from the reference (a fintech template). The firm's real brand is royal blue + gold.
- **Logo replaced.** v1 drew a "C&C" tile. The firm has a real logo (CC monogram + wordmark).
- **Reference widgets copied.** v1 copied a credit card (hero), a rating widget, dashboard-style practice cards, pricing cards and a copper gradient panel.
- **Content rewritten or trimmed.** Testimonials were cut to 16, names shortened, the Why Choose Us copy was paraphrased, 8 attorney bios were missing, the practice list was regrouped and its links dropped, and the navigation didn't match the original.
- **No photography.** The firm's real photos and attorney headshots were not used.

## 2. Original brand (from the site's theme CSS and logo)
| Role | HEX | Source |
|---|---|---|
| Primary — Royal Blue | `#124081` | `--primary-color` in theme `custom.css`; header, nav and section backgrounds |
| Secondary — Gold | `#F7B731` | `--secondary-color`; CTA buttons, headline accents, phone number |
| Deep Navy | `#112337` | Text/contrast colour (`--gf-color-*-contrast`), logo backdrop |
| Midnight | `#071A34` | Top announcement bar / darkest surface |
| Light Grey | `#F5F5F5` / `#F2F2F2` | Light section backgrounds |
| Slate | `#585E6A` / `#686E77` | Secondary text, borders |
| White | `#FFFFFF` | Logo, text on blue |

- **Logo:** `Cohen-Logo-background-Logo.svg`. It is a white CC monogram with "COHEN & COHEN / PERSONAL INJURY LAWYERS, P.C.", designed for dark backgrounds.
- **Type on the live site:** Balboa (condensed display, uppercase) and Aktiv Grotesk (body), both served from a licensed Adobe Typekit kit. The free stand-ins are **Barlow Condensed** and **Barlow**. The firm can swap its own Typekit kit back in by changing two CSS variables.
- **Photography:** the Queens Unisphere (colour, and a black-and-white texture), two attorneys walking together, Albert Cohen's portrait, cut-out headshots of all ten attorneys, a car-accident scene, and the award badges (Super Lawyers, Avvo 10.0, Million Dollar Advocates Forum, AAJ, NYSTLA).

## 3. Original information architecture (kept)
- Top bar: "Unable to drive to one of our offices? We will meet you at your home or hospital room."
- **About:** Why Choose Us · Attorneys · Careers · Videos
- **Practice Areas:** Personal Injury · Slip and Fall · Car Accidents · Premises Liability · Car Insurance Claim Disputes · Nursing Home Abuse · Truck Accident Lawyers · Construction Accidents · New York Lead Poisoning Lawyer · All Practice Areas
- **Case Results**
- **Testimonials**
- **Resources:** Blog · Pain and Suffering Settlement Examples · Pain and Suffering Calculator
- **Contact:** Forest Hills/Queens · Staten Island · Brooklyn · Long Island · Bronx
- Languages: English · Español · Русский. Phone (718) 275-7779, Available 24/7. "Free Consultation" and "100% Secure and Confidential".

**Rebuilt in this prototype:** Home, Why Choose Us, Attorneys plus all 10 bios, Case Results (all 13), Testimonials (all 80 unique), Practice Areas (all 54, in the original groups), and all 5 office pages.

**Linked to the live site (marked ↗):** the 54 individual practice-area articles, Blog, Careers, Videos, both pain-and-suffering pages, Español, Русский, Disclaimer, Privacy Policy and Sitemap. These are long SEO articles or tools that this prototype doesn't rebuild. Linking to them keeps every page reachable without inventing content.

## 4. Reference images — what is adapted, what is not
**Adapted (principles):**
- Oversized, tightly set headlines with one accent line.
- Strong contrast between light and dark sections.
- Hairline column rules with small node dots to give the page an architectural grid.
- Numbered `[01]` editorial lists.
- Asymmetric two-column splits (statement left, detail right).
- A single large testimonial with a counter and up/down controls.
- A slim scrolling band of short promises.
- A giant wordmark in the footer.
- Square-cornered buttons, generous whitespace, and calm, slow reveal animations.

**Not used:** the credit card and hand, charts and dashboards, pricing cards, partner-logo circles, the copper gradient panel, the cream/oxblood/coral palette, and all of its text.

## 5. Redesign direction
- **"Royal blue and gold, editorial."** Navy and royal-blue full-bleed sections alternate with white and light-grey ones. Gold is reserved for calls to action, key numbers and headline accent lines, as on the original. Gold always sits on navy or blue, or as a button fill with navy text (contrast about 9:1), never as gold text on white.
- **Typography:** condensed uppercase display headings in the brand's style (for example "AWARD-WINNING ATTORNEYS / *YOU CAN TRUST*" with the second line in gold), set much larger and with tighter leading. Body text in Barlow at 17–18px with comfortable line length.
- **Photography first:** the hero uses the Unisphere in the firm's blue, with the two-attorneys photo. Every attorney card uses the real headshot, and the original badges appear as real images.
- **Layout:** asymmetric editorial sections, fewer boxes, thin rules instead of cards, and numbered lists.
- **Content:** firm text is carried over verbatim (generated from the parsed site). Long SEO sections are kept in expandable panels so nothing is lost and the page stays readable.

## 6. Open items for the firm (not changed silently)
- The featured Google review names "Albert Kim", who is not on the attorney list. It is kept on the Testimonials page as published.
- Typos in the original copy (for example "CPLR 54015" and "and and") are kept as published until the firm approves corrections.
- The site says "4 Locations in NYC". That is accurate, because Lynbrook is on Long Island, outside NYC, and five offices are listed in total.
- The contact form needs the firm's endpoint, and the fonts need the firm's Typekit kit.
