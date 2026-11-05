import { firm, nav, languages, offices, valueList, practiceGroups, LIVE, esc } from './data.js';

/* ---- Icons --------------------------------------------------------------- */
const P = {
  arrow: '<path d="M7 17L17 7M8.5 7H17v8.5"/>',
  phone: '<path d="M5 4h3.5l2 5-2.4 1.6a11 11 0 005.3 5.3L15 13.5l5 2V19a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  up: '<path d="M6 15l6-6 6 6"/>',
  down: '<path d="M6 9l6 6 6-6"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="1.5"/><path d="M8 11V8a4 4 0 018 0v3"/>',
  pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0114 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  ext: '<path d="M14 5h5v5M19 5l-8 8M17 14v4a1 1 0 01-1 1H6a1 1 0 01-1-1V8a1 1 0 011-1h4"/>',
  facebook: '<path d="M14.5 8H17V4.5h-2.5A4 4 0 0010.5 8.5V10.5H8V14h2.5v6.5H14V14h2.6l.6-3.5H14V8.9c0-.5.4-.9.5-.9z"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/>',
  linkedin: '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M8 10.5V16.5M8 7.6v.01M11.5 16.5v-6M11.5 13c0-1.6 1-2.6 2.3-2.6s2.2.9 2.2 2.6v3.5"/>',
  tiktok: '<path d="M14 3.5v11a3.5 3.5 0 11-3.5-3.5M14 3.5c.4 2.6 2.4 4.6 5 5"/>',
};
export const icon = (name, cls = '') =>
  `<svg class="ico ico--${name} ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name]}</svg>`;

/** Attributes for a link that may point at the live site. */
export const href = (item) => (item.ext ? `href="${item.href}" target="_blank" rel="noopener"` : `href="${item.href}"`);
export const extMark = (item) => (item.ext ? `${icon('ext', 'ext-mark')}<span class="sr-only"> (opens the current site in a new tab)</span>` : '');

/* ---- Header -------------------------------------------------------------- */
export const header = () => `
  <div class="topbar">
    <div class="shell topbar__inner">
      <p class="topbar__msg">${esc(firm.topbar)}</p>
      <nav class="topbar__langs" aria-label="Language">${languages.map((l) => `<a ${href(l)} lang="${l.lang}" ${l.lang === 'en' ? 'aria-current="true"' : ''}>${l.label}</a>`).join('')}</nav>
    </div>
  </div>
  <header class="header" id="header">
    <div class="shell header__inner">
      <a class="brand" href="/" aria-label="${esc(firm.legalName)} — home"><img src="/images/logo-white.svg" alt="${esc(firm.legalName)}" width="288" height="58"></a>
      <div class="header__actions">
        <a class="header__phone" href="${firm.phoneHref}"><strong>${firm.phone}</strong><small><span class="live"></span>Available 24/7</small></a>
        <button class="btn btn--sm header__cta" type="button" data-consult>Free Consultation</button>
        <button class="burger" type="button" aria-expanded="false" aria-controls="menu" aria-label="Open menu"><span></span></button>
      </div>
    </div>
    <nav class="nav" aria-label="Primary"><div class="shell"><ul class="nav__list">
        ${nav.map((n) => n.children ? `
          <li class="nav__item">
            <button class="nav__link" type="button" aria-expanded="false" data-dd>${n.label} ${icon('down')}</button>
            <div class="dropdown ${n.children.length > 6 ? 'dropdown--wide' : ''}"><ul>
              ${n.children.map((c) => `<li><a ${href(c)}>${esc(c.label)} ${extMark(c)}</a></li>`).join('')}
            </ul></div>
          </li>` : `<li class="nav__item"><a class="nav__link" href="${n.href}">${n.label}</a></li>`).join('')}
      </ul></div></nav>
  </header>
  <div class="menu" id="menu" aria-hidden="true">
    ${nav.map((n, i) => n.children ? `
      <div class="menu__group">
        <button class="menu__top" type="button" style="--i:${i}" aria-expanded="false">${n.label} ${icon('plus')}</button>
        <div class="menu__sub"><ul>${n.children.map((c) => `<li><a ${href(c)}>${esc(c.label)} ${extMark(c)}</a></li>`).join('')}</ul></div>
      </div>` : `<div class="menu__group"><a class="menu__top" style="--i:${i}" href="${n.href}">${n.label}</a></div>`).join('')}
    <div class="menu__foot">
      <a class="menu__phone" href="${firm.phoneHref}">${firm.phone}</a>
      <span class="small" style="display:flex;align-items:center;gap:8px;color:var(--on-dark-2)"><span class="live"></span>Available 24/7</span>
      <button class="btn btn--block" type="button" data-consult>Free Consultation</button>
      <p class="small" style="display:flex;gap:18px;color:var(--on-dark-2)">${languages.map((l) => `<a ${href(l)} lang="${l.lang}">${l.label}</a>`).join('')}</p>
    </div>
  </div>`;

/* ---- Consultation form (fields as on the original Gravity Form) --------- */
let n = 0;
export function consultForm() {
  const p = `f${++n}`;
  return `<form class="form" data-consult-form novalidate>
    <p class="form__req"><span aria-hidden="true">*</span> indicates required fields</p>
    <div class="form__row form__row--2">
      <div class="field"><label for="${p}-first">First Name <span class="req">*</span></label><input id="${p}-first" name="firstName" autocomplete="given-name" required><span class="field__error" aria-live="polite"></span></div>
      <div class="field"><label for="${p}-last">Last Name <span class="req">*</span></label><input id="${p}-last" name="lastName" autocomplete="family-name" required><span class="field__error" aria-live="polite"></span></div>
    </div>
    <div class="form__row form__row--2">
      <div class="field"><label for="${p}-phone">Phone <span class="req">*</span></label><input id="${p}-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required data-type="phone"><span class="field__error" aria-live="polite"></span></div>
      <div class="field"><label for="${p}-email">Email</label><input id="${p}-email" name="email" type="email" autocomplete="email" data-type="email"><span class="field__error" aria-live="polite"></span></div>
    </div>
    <div class="field"><label for="${p}-src">How Did You Hear About Us? <span class="req">*</span></label>
      <select id="${p}-src" name="source" required>
        <option value="">How Did You Hear About Us?</option>
        <option>Existing/Previous Client</option><option>Referral</option><option>Search Engine (Google, Bing, etc.)</option>
        <option>AI (ChatGPT, Gemini, etc.)</option><option>Social Media (Facebook, Instagram, etc.)</option>
        <option>Online Directory (Yelp, Lawyers.com, Avvo, etc.)</option><option>Website</option><option>Other</option>
      </select><span class="field__error" aria-live="polite"></span></div>
    <div class="field"><label for="${p}-msg">Message</label><textarea id="${p}-msg" name="message" placeholder="How can we help you?"></textarea></div>
    <label class="check"><input type="checkbox" name="consent" required> <span>I agree to terms &amp; conditions <span class="req" style="color:var(--royal)">*</span></span></label>
    <p class="fineprint">By submitting this form and signing up for texts, you consent to receive informational text messages from Cohen &amp; Cohen Personal Injury Lawyers, P.C. at the number provided, including messages sent by an autodialer. Consent is not a condition of purchase. Message &amp; data rates may apply. Message frequency varies. Unsubscribe at any time by replying STOP. Reply HELP for help. <a href="${LIVE}/privacy-policy/" target="_blank" rel="noopener">Privacy Policy</a>.</p>
    <div class="form__submit">
      <button class="btn btn--navy" type="submit">Free Consultation</button>
      <span class="secure">${icon('lock')} 100% Secure and Confidential</span>
    </div>
  </form>`;
}

export const formCard = (title = 'Get Help Now') => `
  <div class="form-card" data-reveal="scale">
    <div class="form-card__head">
      <h2 class="h3">${title}</h2>
      <a class="form-card__phone" href="${firm.phoneHref}">${firm.phone}<small><span class="live"></span>Available 24/7</small></a>
    </div>
    ${consultForm()}
  </div>`;

/* ---- Reusable sections --------------------------------------------------- */
export const helpNow = () => `
  <section class="section on-royal rails" aria-labelledby="helpnow-h">
    <div class="shell helpnow">
      <div class="helpnow__intro">
        <p class="eyebrow" data-reveal>Injury Lawyers That Fight</p>
        <h2 class="h2" id="helpnow-h" data-split>Get the immediate <span class="accent">help you deserve</span></h2>
        <ul class="values" data-stagger="80">${valueList.map((v) => `<li>${icon('check')} ${v}</li>`).join('')}</ul>
        <div data-reveal><a class="btn btn--ghost" href="/why-choose-us/">Learn More ${icon('arrow', 'ico--arrow')}</a></div>
      </div>
      ${formCard()}
    </div>
  </section>`;

export const ctaBand = () => `
  <section class="cta-band" aria-labelledby="cta-h">
    <div class="shell cta-band__inner">
      <h2 class="h2" id="cta-h" data-split>Get the focused help you deserve</h2>
      <div class="cta-band__phone" data-reveal>
        <a class="big" href="${firm.phoneHref}">${firm.phone}</a>
        <small><span class="live"></span>Available 24/7</small>
        <button class="btn btn--navy" type="button" data-consult>Free Consultation</button>
      </div>
    </div>
  </section>`;

export const pageHero = ({ crumbs = [], eyebrow, title, lede = '', aside = '' }) => `
  <section class="page-hero rails on-dark">
    <div class="shell">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a>${crumbs.map((c) => `<span aria-hidden="true">/</span>${c.href ? `<a href="${c.href}">${esc(c.label)}</a>` : `<span aria-current="page">${esc(c.label)}</span>`}`).join('')}</nav>
      <div class="page-hero__grid">
        <div class="stack" style="--stack:22px">
          ${eyebrow ? `<p class="eyebrow" data-reveal>${eyebrow}</p>` : ''}
          <h1 class="display" data-split>${title}</h1>
        </div>
        <div class="stack" style="--stack:22px;--d:200ms" data-reveal>
          ${lede ? `<p class="lede">${lede}</p>` : ''}
          ${aside}
        </div>
      </div>
    </div>
  </section>`;

export const portrait = (a, eager = false) =>
  `<div class="portrait" ${/sean-jacoby|sitara-abbas/.test(a.photo) ? 'data-fit="cover"' : ''}><img src="${a.photo}" alt="${esc(a.name)}, ${esc(a.title)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"></div>`;

export const attorneyCard = (a, i = 0) => `
  <a class="atty" href="/attorney/${a.slug}/" data-reveal style="--d:${(i % 5) * 70}ms">
    ${portrait(a)}
    <div class="atty__meta">
      <div><div class="atty__name">${esc(a.name)}</div><div class="atty__role">${esc(a.title)}</div></div>
      <span class="arrow-box">${icon('arrow')}</span>
    </div>
  </a>`;

export const officeRow = (o, i = 0) => `
  <article class="office" data-reveal style="--d:${i * 60}ms">
    <span class="index">${String(i + 1).padStart(2, '0')}</span>
    <h3 class="office__name"><a href="${o.path}">${o.name}</a></h3>
    <address>${o.address}<br>${o.city}</address>
    <a class="office__phone link" href="${o.tel}">${icon('phone')} ${o.phone}</a>
    <div class="office__actions">
      <a class="link" href="${o.directions}" target="_blank" rel="noopener">Directions ${icon('arrow')}</a>
      <a class="link" href="${o.path}">Office page ${icon('arrow')}</a>
    </div>
  </article>`;

/* ---- Footer / drawer / action bar --------------------------------------- */
export const footer = () => `
  <footer class="footer">
    <div class="shell">
      <div class="footer__grid">
        <div class="footer__col stack" style="--stack:20px">
          <img class="footer__logo" src="/images/logo-white.svg" alt="${esc(firm.legalName)}" width="288" height="58" loading="lazy">
          <a class="footer__phone" href="${firm.phoneHref}">${firm.phone}</a>
          <p class="small" style="display:flex;align-items:center;gap:8px"><span class="live"></span>Available 24/7</p>
          <div class="social">${firm.social.map((s) => `<a href="${s.href}" target="_blank" rel="noopener" aria-label="${s.label}">${icon(s.label.toLowerCase())}</a>`).join('')}</div>
        </div>
        ${nav.filter((g) => g.children && g.label !== 'Contact').map((g) => `
        <div class="footer__col">
          <p class="footer__title">${g.label}</p>
          <ul class="footer__links">${g.children.map((c) => `<li><a ${href(c)}>${esc(c.label)} ${extMark(c)}</a></li>`).join('')}
          ${g.label === 'About' ? '<li><a href="/case-results/">Case Results</a></li><li><a href="/testimonials/">Testimonials</a></li>' : ''}</ul>
        </div>`).join('')}
        <div class="footer__col">
          <p class="footer__title">Locations</p>
          <ul class="footer__links">${offices.map((o) => `<li><a href="${o.path}">${o.name}</a> <span class="small" style="color:var(--on-dark-3)">${o.phone}</span></li>`).join('')}</ul>
        </div>
      </div>
    </div>
    <div class="wordmark" aria-hidden="true">Cohen <span>&amp;</span> Cohen</div>
    <div class="shell">
      <div class="footer__base">
        <span>Copyright © ${new Date().getFullYear()} ${esc(firm.legalName)} · ${'Prior results do not guarantee a similar outcome.'}</span>
        <nav aria-label="Legal">
          <a href="${LIVE}/disclaimer/" target="_blank" rel="noopener">Disclaimer</a>
          <a href="${LIVE}/privacy-policy/" target="_blank" rel="noopener">Privacy Policy</a>
          <a href="${LIVE}/sitemap/" target="_blank" rel="noopener">Sitemap</a>
        </nav>
      </div>
    </div>
  </footer>`;

export const drawer = () => `
  <div class="drawer" id="drawer" aria-hidden="true">
    <div class="drawer__scrim" data-close></div>
    <div class="drawer__panel" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
      <div class="drawer__head">
        <div><p class="h4" id="drawer-title" style="color:var(--white)">Get Help Now</p><a href="${firm.phoneHref}" style="color:var(--gold);font-weight:600">${firm.phone} · Available 24/7</a></div>
        <button class="icon-btn" type="button" data-close aria-label="Close">${icon('close')}</button>
      </div>
      <div class="drawer__body">${consultForm()}</div>
    </div>
  </div>`;

export const actionbar = () => `
  <div class="actionbar" id="actionbar">
    <a class="btn btn--ghost" href="${firm.phoneHref}">${icon('phone')} Call 24/7</a>
    <button class="btn" type="button" data-consult>Free Consultation</button>
  </div>`;

export { practiceGroups };
