# Cohen & Cohen — Current Site Audit

Site: https://www.cohenandcohenlawgroup.com/  ·  Audited: 2026-11-05
Method: fetched page markup (HTTP 200 on every page tried). Visual and mobile findings are **inferred from markup**, not from rendered screenshots. See "Gaps" at the end.

Pages read: Home, Why Choose Us, Attorneys, Albert Cohen bio, Charles Haviv bio, Case Results, Testimonials, Practice Areas, Forest Hills office, Queens Car Accident (partly verbatim), Careers, Videos, Español.

---

## 1. Top-line verdict

The site has strong raw material. It has real eight-figure-total case results, 240+ Google reviews at 4.9/5, five offices, three languages, 24/7 availability and a deep SEO library (54 practice pages). The presentation hides it:

1. **Every page is one endless scroll.** Each page repeats the same blocks: result ticker, form, "100+ years", process, team, five locations, areas served, featured review. The page's own content gets buried between them.
2. **The main conversion button does nothing.** "Free Consultation" points to `#` on every page we read, and so do the menu parents.
3. **The facts don't match from page to page.** Phone numbers, firm name, location count and attorney names all vary. That costs trust on a site whose job is to earn trust.
4. **Typography and hierarchy are SEO-driven, not reader-driven.** There are ALL-CAPS H2 walls, titles up to 240 characters, skipped heading levels, two H1s on one page and duplicated paragraphs.

---

## 2. Findings by category

### A. Conversion & CTAs (highest impact)
| # | Issue | Where |
|---|---|---|
| A1 | "Free Consultation" buttons link to `#` | Every page |
| A2 | Nav parents (About, Practice Areas, Resources, Contact) link to `#`. On touch devices they rely on hover or tap behaviour | Global |
| A3 | Header `tel:` link is malformed: `tel:\(718\) 275-7779>` | Global header |
| A4 | "Email contact form" and "via email" links go to `#` or to the Forest Hills page. No email address appears anywhere | Home, Attorneys |
| A5 | Intake form appears twice on many pages, and the consent checkbox is required | Home, Forest Hills, Why Choose Us |
| A6 | 8 result tiles all link to the same /case-results/ page, with no anchors to the specific case | Global |
| A7 | Office address, hours and directions sit below the FAQs and SEO copy | Forest Hills |

### B. Consistency & trust (needs client decisions)
| # | Conflict | Values seen |
|---|---|---|
| B1 | Main/office phone numbers | (718) 275-7779 site-wide 24/7 · (718) 736-2567 Forest Hills · **718-300-0000** on the Queens Car Accident page |
| B2 | Firm name | "Cohen & Cohen Personal Injury Lawyers, P.C." · "Cohen & Cohen Car Accident & Personal Injury Lawyers, P.C." · "Cohen & Cohen Law Group" · "Cohen and Cohen" |
| B3 | Location count | "4 Locations in NYC" vs. 5 offices listed, one of them in Lynbrook, Long Island |
| B4 | Featured Google review names **"Albert Kim"**, who is not on the team list | Global footer review |
| B5 | Albert Cohen's title | "CEO and Founder" on the listing vs. "Owner and Founder" in the bio |
| B6 | Practice scope | Homepage copy mentions real estate closings, probate, estate planning and elder law. Raisa Cohen is listed as "Immigration Attorney". Several testimonials are about estate planning or real estate (one names "Mitchell Coven", who is not on the team). Is this a PI-only firm now? |
| B7 | $1,175,000 dram-shop result: the text says $925k from one bar, but the arithmetic line uses $950k | Case Results |
| B8 | 3 testimonials are duplicated under two names each (Vera Isak / Vera I., Kseniya Spencer / Kseniya S., Mikey Sadykov / Mikey S.) | Testimonials |
| B9 | Charles Haviv and Ryan Charder cards may share the same photo (identical image data in the markup, **unverified**) | Attorneys |
| B10 | Nav says "Pain and Suffering Calculator", while Why Choose Us says the firm does "not rely on … an online calculator" | Global vs. Why Choose Us |
| B11 | Award badges (Super Lawyers, Avvo, Million Dollar Advocates, AAJ, NYSTLA) show no year or selecting body. The Super Lawyers widget shows "loading …" | Home, Albert Cohen bio |

### C. Visual hierarchy & layout
- The hero leads with the boxing metaphor ("go into the ring… knockout punch"). The headline itself is the generic H1 "A New York Personal Injury Lawyer in Queens You Can Trust". The hero image file is a screenshot (`Screenshot2024-12-13at5.34.10PM-1-1-1.webp`).
- Three different slogan bands ("WE KEEP FIGHTING NO MATTER WHAT", "OVER 100 YEARS…" twice, "ALWAYS READY TO GO THE DISTANCE") each repeat the same Free Consultation button. They add length without adding information.
- On the homepage, 7+ long SEO H2 sections sit between the practice cards and the process/team. The order follows keywords, not a client's questions.
- On practice pages, near-duplicate sections open with the same sentence, and the table-of-contents labels don't match the headings.
- The process steps are good content but sit far down the page.
- Practice-area cards: of the 6 cards, only 3 have a description, and one ("PERSONAL INJURY LAWYERS") links to the Forest Hills office page.

### D. Typography & copy
- ALL-CAPS headings everywhere ("GET THE IMMEDIATE HELP YOU DESERVE", "ZERo FEES UNLESS WE WIN" with a mixed-case typo).
- Page titles are keyword-stacked: the Forest Hills title is about 240 characters, and the Queens Car Accident title has no firm name.
- Typos: "SuperLaywers", "accidets", "can helps", "crossexamine", "and and", "CPLR 54015" (likely 5015). The $3.5M write-up says "Defendant fell down the steps".
- The Charles Haviv bio switches between first and third person. It also contains the garbled phrase "licensed as a private Pilot Trilingual".
- A broken Albert Cohen quote fragment appears on Why Choose Us ("ring. The client is a king or a queen…").
- The "Who pays my medical bills" section talks about estate planning.

### E. Information architecture
- 54 practice links in 6 groups. Some are duplicates (Slip & Fall = Queens Slip & Fall; Lead Paint = Lead Poisoning) and some are mis-targeted ("Personal Injury Litigation" goes to a Staten Island URL; "Knee & Hip Injuries" sits under a construction sub-URL).
- "Personal Injury" in the nav goes to the Forest Hills office page. "Staten Island, NY" under Contact goes to a practice page, not a location page.
- There are two truck-accident URLs (`…semi-truck-injury…` and `…best-semi-truck-injury…`).
- Spanish nav links Lynbrook to `/locations/lynbrook-personal-injury-office/`, while English uses `/locations/long-island-lynbrook-…`.
- **Empty pages:** Careers has a heading and no listings. Videos has no video content in the markup and two H1s (the videos may be script-loaded, which is unverified).
- Español is only partly translated: reviews, areas served, result tiles, form labels and footer are still in English. There is no Russian review yet (not fetched).
- No pagination: 82 testimonials and 13 results each sit on one long page.

### F. Accessibility & technical
- Many images have empty alt text or filename alt text ("cohen-fight", "CHARLES-HAVIV", "million dollar advocates form2").
- Social icons have no accessible text, only a title attribute.
- Heading hierarchy has skipped levels (H2→H4) and two H1s on Videos.
- Images are lazy-loaded with 1×1 placeholders, so the real images depend on JavaScript.
- The platform appears to be WordPress (`/wp-content/uploads/`). The page builder is unconfirmed.
- A "Skip to content" link is present (good).

### G. Mobile usability (inferred)
- Very long pages with repeated blocks mean heavy scrolling on phones, and the form can appear twice before the content ends.
- Hover-dependent dropdown parents with `#` hrefs are unreliable on touch.
- The ticker of 8 results plus 26 "Areas Served" chips on every page add bulk.
- We could not confirm whether a sticky click-to-call bar exists on mobile. **Rendered mobile screenshots are needed to verify.**

### H. Compliance — flag for the firm's counsel (not legal advice)
New York Rules of Professional Conduct Rule 7.1 governs attorney advertising. Items the firm should confirm while the redesign is underway:
- Whether "Attorney Advertising" labelling is needed and where.
- That the past-results disclaimer sits next to every result display. It currently appears in the footer only on some pages.
- Dates and selecting bodies for ratings and awards.
- Treatment of client testimonials.
- Retention requirements for the redesigned pages.

---

## 3. What to keep (the site's real assets)
- Case results with narratives (13 cases: $375k to $3.5M).
- 4.9/5 across 240+ Google reviews, plus 82 written testimonials.
- Five offices plus home and hospital visits, available 24/7.
- English, Spanish and Russian (and Hebrew, mentioned on Why Choose Us).
- No fee unless we win, with the NY §474-a fee explanation.
- The 5-step "Our Process".
- The positioning on Why Choose Us: "boutique trial firm, not a settlement mill", senior attorneys on every case, lien litigation, structured settlements. This is the most differentiated copy on the site and should lead the homepage.
- Albert Cohen's credentials: Pace Law J.D. cum laude 2002, Don Keenan Trial School, Avvo Superb, Million Dollar Advocates Forum, NYSTLA, and recognition from Sen. Schumer and the NYC Council.
- The long-tail SEO pages (54 practice URLs). Their URLs must be preserved or 301-redirected.

---

## 4. Design direction (from /reference images)
The 7 reference images show a premium fintech landing page ("Fintrix", a third-party template, used only as mood). Elements to borrow in spirit, not copy:
- Warm cream (#E6E1D6-ish) and deep oxblood/espresso (#341917-ish) palette, with a muted burgundy accent. Use a signal colour (coral) sparingly for primary actions.
- Hairline grid lines and node dots framing the layout.
- Large, tight, mixed-weight headlines with one accent-coloured word.
- Full-bleed dark sections for proof (stats row), numbered "[01]" lists and a large quote testimonial slider.
- A big wordmark footer.

For a law firm this translates into calm authority rather than "boxing" aggression: results and reviews as the hero proof, and the intake form one tap away.

---

## 5. Open questions for you / the firm
1. Which phone number is the primary, and should each office keep its own number?
2. What is the official firm name to use?
3. Does the firm still practise immigration, estate planning or real estate? If not, we drop those testimonials and Raisa Cohen's title, or reframe them.
4. Who is "Albert Kim"? Keep or replace the featured review?
5. Correct the dram-shop figure ($925k or $950k)?
6. Professional attorney headshots and office photography: does the firm have them? Without them we will use tasteful placeholders and **no stock "lawyer" faces presented as the team**.
7. Is the redesign a static front-end prototype, or a WordPress theme? Must the existing URLs stay identical?

---

## Gaps in this audit (not invented — still to collect)
- Bios not read: Raisa Cohen, Jared Hatcliffe, Ryan Charder, Jeremy Glicksman, Sitara Abbas, Amir Ali, Alexandra Stata, Sean Jacoby.
- Office pages not read: Staten Island, Brooklyn, Long Island, Bronx (we have their addresses and phones from the homepage).
- Not read: Russian page, blog index, calculator, settlement-examples page, privacy/disclaimer, and the other practice pages.
- Only part of the Queens Car Accident page came back verbatim: the text after "Will an Accident Lawyer in Queens Help Victims…" is unverified.
- No rendered desktop or mobile screenshots, so colours, fonts and real mobile behaviour are not verified. **Screenshots of the current homepage (desktop and phone) would close this gap.**
