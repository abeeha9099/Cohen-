// ---------------------------------------------------------------------------
// Source of truth: cohenandcohenlawgroup.com (raw HTML parsed 2026-11-05).
// Long-form content lives in /src/content/*.json and is generated verbatim
// from the original pages — see /audit/03-correction-plan.md.
// Do not add business claims here that are not on the firm's site.
// ---------------------------------------------------------------------------
import attorneysJson from './content/attorneys.json';
import reviewsJson from './content/reviews.json';
import resultsJson from './content/results.json';
import practiceJson from './content/practice.json';
import whyJson from './content/why.json';
import homeJson from './content/home.json';

export const LIVE = 'https://www.cohenandcohenlawgroup.com';

export const firm = {
  legalName: 'Cohen & Cohen Personal Injury Lawyers, P.C.',
  phone: '(718) 275-7779',
  phoneHref: 'tel:+17182757779',
  topbar: 'Unable to drive to one of our offices? We will meet you at your home or hospital room.',
  tagline: 'Fearless. Relentless. A True Fighter!',
  rating: 'We’re Proud of Our 4.9/5 Rating Across 240+ Reviews on Google',
  reviewsUrl: 'https://maps.app.goo.gl/4FtudpcaHk5Pnm1k9',
  bbb: 'https://www.bbb.org/us/ny/forest-hills/profile/personal-injury-lawyers/cohen-cohen-personal-injury-lawyers-p-c-0121-151494/',
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/AlbertCohenEsq/' },
    { label: 'Instagram', href: 'https://www.instagram.com/cohenandcoheninjury/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/albert-cohen/' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@cohenandcoheninjury' },
  ],
  // Leave empty until the firm supplies its form endpoint (Gravity Forms / CRM).
  formEndpoint: '',
};

export const disclaimer = '*Prior results do not guarantee a similar outcome.*';

// Value list shown beside the intake form on the original homepage (verbatim).
export const valueList = ['4 Locations in NYC', '100+ Years of Combined Experience', 'Free to Evaluate Your Case', 'No Fee Unless We Win'];

export const badges = [
  { src: '/images/badges/super-lawyers.webp', alt: 'Rated by Super Lawyers — Albert Cohen', w: 120, h: 100 },
  { src: '/images/badges/avvo.webp', alt: 'Avvo Rating 10.0 — Albert Cohen, Top Attorney', w: 148, h: 115 },
  { src: '/images/badges/million-dollar-advocates.webp', alt: 'Million Dollar Advocates Forum', w: 116, h: 116 },
  { src: '/images/badges/aaj.webp', alt: 'American Association for Justice', w: 300, h: 77 },
  { src: '/images/badges/nystla.webp', alt: 'New York State Trial Lawyers Association', w: 364, h: 110 },
];

// Offices — addresses, phones and hours as published on each location page.
export const offices = [
  { slug: 'forest-hills', path: '/locations/forest-hills-personal-injury-office/', name: 'Forest Hills', menu: 'Forest Hills/Queens, NY', h1: 'Forest Hills Personal Injury Lawyers Near You', address: '104-70 Queens Blvd #312', city: 'Forest Hills, NY 11375', phone: '(718) 736-2567', fax: '(718) 275-7722' },
  { slug: 'staten-island', path: '/staten-island-personal-injury-lawyer/', name: 'Staten Island', menu: 'Staten Island, NY', h1: 'Staten Island Personal Injury Lawyers Near You', address: '1855 Victory Blvd', city: 'Staten Island, NY 10314', phone: '(718) 568-5708' },
  { slug: 'brooklyn', path: '/locations/brooklyn-personal-injury-lawyer-office/', name: 'Brooklyn', menu: 'Brooklyn, NY', h1: 'Brooklyn Personal Injury Lawyers Near You', address: '45 4th Ave 2nd Floor', city: 'Brooklyn, NY 11217', phone: '718-775-3996' },
  { slug: 'long-island', path: '/locations/long-island-lynbrook-personal-injury-lawyer-near-you/', name: 'Long Island', menu: 'Long Island, NY', h1: 'Long Island (Lynbrook) Personal Injury Lawyers Near You', address: '303 Sunrise Highway', city: 'Lynbrook, NY 11563', phone: '718-550-7121' },
  { slug: 'bronx', path: '/locations/bronx-personal-injury-lawyer-near-you/', name: 'Bronx', menu: 'Bronx, NY', h1: 'Bronx Personal Injury Lawyers Near You', address: '2511 East Tremont Ave.', city: 'Bronx, NY 10461', phone: '718-306-6863' },
].map((o) => {
  const q = encodeURIComponent(`${o.address}, ${o.city}`);
  return { ...o, hours: 'Open 24 Hours', directions: `https://www.google.com/maps/dir/?api=1&destination=${q}`, map: `https://www.google.com/maps?q=${q}&output=embed`, tel: `tel:+1${o.phone.replace(/\D/g, '')}` };
});

export const areasServed = [
  'Bronx', 'Brooklyn', 'Bushwick', 'Brooklyn Heights', 'Central Harlem', 'East Harlem', 'East Village',
  'Financial District', 'Greenpoint', 'Forest Hills', 'Harlem', 'Howard Beach', 'Jackson Heights',
  'Lower East Side', 'Lower Manhattan', 'Manhattan', 'Midtown', 'New Jersey', 'Rego Park', 'Soho',
  'Tribeca', 'Upper East Side', 'Upper Manhattan', 'Upper West Side', 'West Side', 'West Harlem',
];

// Navigation — mirrors the original site's menu. `ext: true` = page lives on the current site.
export const nav = [
  { label: 'About', children: [
    { label: 'Why Choose Us', href: '/why-choose-us/' },
    { label: 'Attorneys', href: '/attorney/' },
    { label: 'Careers', href: `${LIVE}/careers/`, ext: true },
    { label: 'Videos', href: `${LIVE}/video/`, ext: true },
  ] },
  { label: 'Practice Areas', children: [
    { label: 'Personal Injury', href: '/locations/forest-hills-personal-injury-office/' },
    { label: 'Slip and Fall', href: `${LIVE}/queens-new-york-slip-and-fall-lawyer-near-you/`, ext: true },
    { label: 'Car Accidents', href: `${LIVE}/queens-car-accident-lawyer/`, ext: true },
    { label: 'Premises Liability', href: `${LIVE}/premises-liability-lawyer-new-york-premises-liability-settlements-near-you/`, ext: true },
    { label: 'Car Insurance Claim Disputes', href: `${LIVE}/car-insurance-lawyer-ny-insurance-dispute-lawyer/`, ext: true },
    { label: 'Nursing Home Abuse', href: `${LIVE}/nursing-home-neglect-abuse/`, ext: true },
    { label: 'Truck Accident Lawyers', href: `${LIVE}/truck-accident-lawyer-queens-ny-semi-truck-injury-attorney-near-you/`, ext: true },
    { label: 'Construction Accidents', href: `${LIVE}/queens-construction-accident-attorney/`, ext: true },
    { label: 'New York Lead Poisoning Lawyer', href: `${LIVE}/queens-new-york-lead-poisoning-lawyer-near-you/`, ext: true },
    { label: 'All Practice Areas', href: '/practice-areas/' },
  ] },
  { label: 'Case Results', href: '/case-results/' },
  { label: 'Testimonials', href: '/testimonials/' },
  { label: 'Resources', children: [
    { label: 'Blog', href: `${LIVE}/blogs/`, ext: true },
    { label: 'Pain and Suffering Settlement Examples', href: `${LIVE}/pain-and-suffering-settlement-examples-new-york-emotional-distress-settlement-amounts-near-you/`, ext: true },
    { label: 'Pain and Suffering Calculator', href: `${LIVE}/pain-and-suffering-calculator-free-new-york-car-accident-settlement-calculator-near-you/`, ext: true },
  ] },
  { label: 'Contact', children: offices.map((o) => ({ label: o.menu, href: o.path })) },
];

export const languages = [
  { label: 'English', href: '/', lang: 'en' },
  { label: 'Español', href: `${LIVE}/espanol/`, lang: 'es', ext: true },
  { label: 'Русский', href: `${LIVE}/russian/`, lang: 'ru', ext: true },
];

// Homepage practice teasers → their original pages.
export const homePracticeLinks = {
  'Car Accidents': `${LIVE}/queens-car-accident-lawyer/`,
  'Nursing Home Abuse': `${LIVE}/nursing-home-neglect-abuse/`,
  'Construction Accidents': `${LIVE}/queens-construction-accident-attorney/`,
  'Premises Liability': `${LIVE}/premises-liability-lawyer-new-york-premises-liability-settlements-near-you/`,
  'Slip and Fall Accidents': `${LIVE}/queens-new-york-slip-and-fall-lawyer-near-you/`,
  'Personal Injury Lawyers': '/locations/forest-hills-personal-injury-office/',
};

/* ---- Generated verbatim content ---------------------------------------- */
export const attorneys = attorneysJson;
export const reviews = reviewsJson;
export const featuredReview = {
  name: 'Marcela A.',
  source: 'Google',
  text: 'Many thanks to the team at Cohen and Cohen for handling my personal injury case that ended as a success! My attorney, Albert Kim, was an absolute pleasure to work with and it was evident that he cared about me as a human, not just a client. The whole ordeal was made easy for me as the team did all they had to and kept me informed throughout the process. Ashley was also great and helpful throughout the lawsuit and Luisa at the front desk was so very kind as well! I must recommend the firm for all they did for me and their professionalism along the way.',
};
export const results = resultsJson.results;
export const resultsIntro = resultsJson.intro;
export const tickerResults = results.filter((r) => r.type);
export const practiceGroups = practiceJson.map((g) => ({ ...g, id: g.title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }));
export const why = whyJson;
export const home = {
  ...homeJson,
  practice: homeJson.practice.map((p) => ({ ...p, text: p.text.replace(/\s*\[\.\.\.\]$/, '…'), href: homePracticeLinks[p.title] })),
  processIntro: homeJson.process[0],
  process: homeJson.process.slice(1).filter((s) => s !== 'Step'),
};

export const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
