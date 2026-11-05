import { firm, home, why, reviews, attorneys, offices, areasServed, badges, tickerResults, disclaimer, LIVE, esc } from '../data.js';
import { icon, helpNow, ctaBand, attorneyCard, officeRow } from '../ui.js';
import { rich, slug } from '../rich.js';

// The three reviews shown on the original homepage come first.
const homeNames = ['Jose Huezo', 'Anthony Dangelo', 'Percephany Reyes'];
const slides = [
  ...homeNames.map((n) => reviews.find((r) => r.name === n)).filter(Boolean),
  ...reviews.filter((r) => !homeNames.includes(r.name) && r.text.length > 90 && r.text.length < 420).slice(0, 7),
];

const guideItems = [
  ...home.guide.slice(1),
  { h: 'Types Of Cases Our Personal Injury Lawyers in NYC Handle', body: home.types },
  { h: 'Common Injuries Our New York Personal Injury Attorneys Help Clients Receive Compensation For', body: home.injuries },
  { h: 'Here’s How to Find Our Nearby Personal Injury and Car Accident Attorneys in NYC', body: home.find },
];

export default function homePage() {
  const html = `
  <!-- HERO ---------------------------------------------------------------- -->
  <section class="hero on-dark" aria-labelledby="hero-h">
    <div class="hero__media"><img src="/images/unisphere-bw.webp" alt="" fetchpriority="high"></div>
    <div class="hero__shade"></div>
    <div class="hero__guides shell" aria-hidden="true" style="position:absolute;left:0;right:0;margin:auto">
      <i class="v" style="left:var(--gutter)"></i><i class="v" style="left:58%"></i>
      <i class="dot" style="left:58%;top:clamp(72px,10vw,150px)"></i>
    </div>
    <div class="shell">
      <div class="hero__inner">
        <p class="hero__tagline" data-reveal>${esc(firm.tagline)}</p>
        <h1 class="display" id="hero-h" data-split>A New York Personal Injury Lawyer in Queens <span class="accent">You Can Trust</span></h1>
        <p class="hero__lede" data-reveal style="--d:300ms">You deserve a New York lawyer that will go into the ring for you and deliver the knockout punch. Our confident, competent attorneys know how to take on anybody to get you the full compensation you deserve.</p>
        <div class="hero__ctas" data-reveal style="--d:420ms">
          <button class="btn" type="button" data-consult>Free Consultation</button>
          <a class="hero__call" href="${firm.phoneHref}">${icon('phone')} ${firm.phone}</a>
          <span class="secure">${icon('lock')} 100% Secure and Confidential</span>
        </div>
      </div>
    </div>
    <div class="ticker">
      <div class="shell">
        <ul class="ticker__grid" data-stagger="60" aria-label="Case results">
          ${tickerResults.map((r) => `<li class="tick"><a href="/case-results/" class="tick__amt num">${r.amount}</a><span class="tick__type">${esc(r.type)}</span><span class="tick__place">${esc(r.place)}</span></li>`).join('')}
        </ul>
        <div class="ticker__foot"><span>${esc(disclaimer)}</span><a class="link" href="/case-results/">All case results ${icon('arrow')}</a></div>
      </div>
    </div>
  </section>

  ${helpNow()}

  <!-- BADGES --------------------------------------------------------------- -->
  <section class="on-white" aria-label="Awards and memberships">
    <div class="shell"><ul class="badges" data-stagger="70">
      ${badges.map((b) => `<li class="badge"><img src="${b.src}" alt="${esc(b.alt)}" width="${b.w}" height="${b.h}" loading="lazy"></li>`).join('')}
    </ul></div>
  </section>

  <!-- AWARD-WINNING ------------------------------------------------------ -->
  <section class="section on-white rails" aria-labelledby="award-h">
    <div class="shell split">
      <div class="stack" style="--stack:26px">
        <h2 class="h2" id="award-h" data-split>Award-winning attorneys <span class="accent">you can trust</span></h2>
        <div class="prose" data-reveal>
          ${home.award.slice(0, 2).map((p) => `<p>${esc(p)}</p>`).join('')}
          <p>Wondering what your case is worth? <a class="link" style="color:var(--royal)" href="${LIVE}/pain-and-suffering-calculator-free-new-york-car-accident-settlement-calculator-near-you/" target="_blank" rel="noopener">Try our free case evaluation calculator! ${icon('ext')}</a></p>
        </div>
        <div data-reveal><button class="btn" type="button" data-consult>Free Consultation</button></div>
      </div>
      <div class="photo-frame" data-reveal="fade">
        <div class="img-reveal" data-observe><img src="/images/attorneys-walking.webp" alt="Cohen &amp; Cohen attorneys" width="848" height="770" loading="lazy"></div>
      </div>
    </div>
  </section>

  <!-- STATEMENT ---------------------------------------------------------- -->
  <section class="section on-dark rails" aria-label="We keep fighting">
    <div class="shell statement">
      <p class="statement__big" data-scrub>We keep fighting no matter what.</p>
      <div class="statement__stat" data-reveal>
        <span class="statement__num num" data-count="100" data-suffix="+">100+</span>
        <span class="statement__label">Over 100 years of combined legal experience</span>
      </div>
    </div>
  </section>

  <!-- PRACTICE AREAS ------------------------------------------------------ -->
  <section class="section on-white rails" aria-labelledby="pa-h">
    <div class="shell">
      <div class="section-head section-head--split">
        <h2 class="h2" id="pa-h" data-split>Practice <span class="accent">Areas</span></h2>
        <div class="stack" style="--stack:18px" data-reveal>
          <p class="lede">From car and truck accidents to construction, premises liability and nursing home abuse — 54 practice areas across New York.</p>
          <a class="link" style="color:var(--royal)" href="/practice-areas/">All Practice Areas ${icon('arrow')}</a>
        </div>
      </div>
      <div class="ilist">
        ${home.practice.map((p, i) => {
          const ext = p.href.startsWith('http');
          return `<a class="irow" href="${p.href}" ${ext ? 'target="_blank" rel="noopener"' : ''} data-reveal style="--d:${i * 60}ms">
            <span class="index">0${i + 1}</span>
            <span class="irow__title">${esc(p.title)}</span>
            <span class="irow__text">${esc(p.text)}</span>
            <span class="arrow-box">${icon('arrow')}</span>
          </a>`;
        }).join('')}
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -------------------------------------------------------- -->
  <section class="section on-royal rails" aria-labelledby="testi-h">
    <div class="shell testi">
      <div class="testi__aside">
        <h2 class="h2" id="testi-h" data-split>Always ready to <span class="accent">go the distance</span></h2>
        <p class="lede" data-reveal>${esc(firm.rating)}.</p>
        <div class="stack" style="--stack:12px" data-reveal>
          <a class="link" href="/testimonials/">Read all testimonials ${icon('arrow')}</a><br>
          <a class="link" href="${firm.reviewsUrl}" target="_blank" rel="noopener">Google reviews ${icon('ext')}</a>
        </div>
      </div>
      <div class="testi__main" data-reveal style="--d:150ms">
        <div class="testi__top">
          <span class="stars" aria-hidden="true">★★★★★</span>
          <span class="index num" data-counter>01 / ${String(slides.length).padStart(2, '0')}</span>
          <div class="testi__controls">
            <button type="button" data-prev aria-label="Previous testimonial">${icon('up')}</button>
            <button type="button" data-next aria-label="Next testimonial">${icon('down')}</button>
          </div>
        </div>
        <blockquote class="quote quote-swap" data-quote aria-live="polite">“${esc(slides[0].text)}”</blockquote>
        <div class="testi__who"><span class="node"></span><strong data-name>${esc(slides[0].name)}</strong></div>
      </div>
    </div>
  </section>

  <!-- WHY CHOOSE US --------------------------------------------------------- -->
  <section class="section on-light rails" aria-labelledby="why-h">
    <div class="shell">
      <div class="section-head section-head--split">
        <h2 class="h2" id="why-h" data-split>Why choose <span class="accent">Cohen &amp; Cohen</span></h2>
        <div class="stack" style="--stack:18px" data-reveal>
          <p class="lede">${esc(why.intro[0].split('. ').slice(0, 2).join('. '))}.</p>
          <a class="link" style="color:var(--royal)" href="/why-choose-us/">Read Why Choose Us ${icon('arrow')}</a>
        </div>
      </div>
      <div class="wgrid" data-stagger="40">
        ${why.sections.map((s, i) => `<a href="/why-choose-us/#${slug(s.title)}"><span class="index">${String(i + 1).padStart(2, '0')}</span><span>${esc(s.title)}</span>${icon('arrow')}</a>`).join('')}
      </div>
    </div>
  </section>

  <!-- OUR PROCESS --------------------------------------------------------- -->
  <section class="section on-dark rails" aria-labelledby="process-h">
    <div class="shell">
      <div class="section-head section-head--split">
        <h2 class="h2" id="process-h" data-split>Our <span class="accent">Process</span></h2>
        <p class="lede" data-reveal>${esc(home.processIntro)}</p>
      </div>
      <ol class="steps" data-observe>
        <span class="steps__line" aria-hidden="true"></span>
        ${home.process.map((s, i) => `<li class="step" data-reveal style="--d:${i * 110}ms"><span class="node"></span><span class="step__n num">0${i + 1}</span><span class="step__t">${esc(s)}</span></li>`).join('')}
      </ol>
    </div>
  </section>

  <!-- TEAM --------------------------------------------------------------- -->
  <section class="section on-white rails" aria-labelledby="team-h">
    <div class="shell">
      <div class="section-head section-head--split">
        <h2 class="h2" id="team-h" data-split>Our <span class="accent">Team</span></h2>
        <div class="stack" style="--stack:18px" data-reveal>
          <p class="lede">Meet our team of New York personal injury attorneys, who have over 100 years of legal experience combined.</p>
          <a class="link" style="color:var(--royal)" href="/attorney/">All attorneys ${icon('arrow')}</a>
        </div>
      </div>
      <div class="team">${attorneys.map((a, i) => attorneyCard(a, i)).join('')}</div>
    </div>
  </section>

  <!-- GUIDE (original long-form content, kept verbatim) ------------------- -->
  <section class="section on-light rails" aria-labelledby="guide-h">
    <div class="shell guide">
      <div class="guide__intro">
        <h2 class="h2" id="guide-h" data-split>${esc(home.guide[0].h)}</h2>
        <div class="prose" data-reveal>${rich(home.guide[0].body)}</div>
        <div data-reveal><a class="link" style="color:var(--royal)" href="${LIVE}/how-long-do-you-have-to-file-a-police-report-after-a-car-accident-in-new-york/" target="_blank" rel="noopener">How Long Do You Have to File a Police Report in New York State? ${icon('ext')}</a></div>
      </div>
      <div class="acc">
        ${guideItems.map((g, i) => `
        <details data-reveal style="--d:${(i % 4) * 50}ms">
          <summary><span class="index">${String(i + 1).padStart(2, '0')}</span><span class="t">${esc(g.h)}</span><span class="pm" aria-hidden="true"></span></summary>
          <div class="acc__body">${rich(g.body)}</div>
        </details>`).join('')}
      </div>
    </div>
  </section>

  ${ctaBand()}

  <!-- LOCATIONS ---------------------------------------------------------- -->
  <section class="section on-white rails" aria-labelledby="loc-h">
    <div class="shell">
      <div class="section-head section-head--split">
        <h2 class="h2" id="loc-h" data-split>Locations</h2>
        <p class="lede" data-reveal>${esc(firm.topbar)}</p>
      </div>
      <div class="offices">${offices.map((o, i) => officeRow(o, i)).join('')}</div>
      <div class="areas">
        <div data-reveal><h3 class="h4">Areas Served</h3></div>
        <ul class="chip-list" data-stagger="20">${areasServed.map((a) => `<li class="chip">${a}</li>`).join('')}</ul>
      </div>
      <div class="trust" data-reveal>
        <p class="trust__rating"><span class="stars" aria-hidden="true">★★★★★</span>${esc(firm.rating)}</p>
        <a class="link" style="color:var(--royal)" href="${firm.bbb}" target="_blank" rel="noopener">BBB Business Review ${icon('ext')}</a>
      </div>
    </div>
  </section>`;

  const mount = (root) => {
    let i = 0, busy = false;
    const q = root.querySelector('[data-quote]');
    const nm = root.querySelector('[data-name]');
    const counter = root.querySelector('[data-counter]');
    const go = (d) => {
      if (busy) return; busy = true;
      i = (i + d + slides.length) % slides.length;
      q.classList.add('is-out');
      setTimeout(() => {
        q.textContent = `“${slides[i].text}”`;
        nm.textContent = slides[i].name;
        counter.textContent = `${String(i + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
        q.classList.remove('is-out'); busy = false;
      }, 380);
    };
    root.querySelector('[data-prev]').addEventListener('click', () => go(-1));
    root.querySelector('[data-next]').addEventListener('click', () => go(1));
  };

  return {
    title: 'New York Personal Injury Lawyer Queens, NY',
    description: 'Cohen & Cohen Personal Injury Lawyers, P.C. — New York personal injury lawyers in Queens. Free consultation, no fee unless we win. Available 24/7: (718) 275-7779.',
    html,
    mount,
  };
}
