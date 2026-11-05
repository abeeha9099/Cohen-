import { firm, offices, esc } from '../data.js';
import { icon, pageHero, formCard, officeRow } from '../ui.js';
import notFound from './notfound.js';

export default function locationPage(path) {
  const o = offices.find((x) => x.path === path);
  if (!o) return notFound();
  const others = offices.filter((x) => x !== o);
  const h1 = o.h1.replace(/ Near You$/, '');

  const html = `
  ${pageHero({
    crumbs: [{ label: 'Contact' }, { label: o.menu }],
    eyebrow: 'Our Office Location',
    title: `${esc(h1)} <span class="accent">Near You</span>`,
    lede: esc(firm.topbar),
  })}

  <section class="section on-white rails">
    <div class="shell loc">
      <div class="stack" style="--stack:28px">
        <dl class="loc__details" data-stagger="60">
          <div class="loc__row"><dt>Address</dt><dd>${o.address}<br>${o.city}</dd></div>
          <div class="loc__row"><dt>Phone</dt><dd><a class="link" href="${o.tel}">${o.phone}</a></dd></div>
          ${o.fax ? `<div class="loc__row"><dt>Fax</dt><dd>${o.fax}</dd></div>` : ''}
          <div class="loc__row"><dt>Hours</dt><dd>${o.hours}</dd></div>
          <div class="loc__row"><dt>24/7 line</dt><dd><a class="link" href="${firm.phoneHref}">${firm.phone}</a></dd></div>
        </dl>
        <div data-reveal style="display:flex;flex-wrap:wrap;gap:12px">
          <a class="btn" href="${o.directions}" target="_blank" rel="noopener">Get Directions ${icon('arrow', 'ico--arrow')}</a>
          <button class="btn btn--outline" type="button" data-consult>Free Consultation</button>
        </div>
        <div class="map" data-reveal="fade"><iframe title="Map of the ${esc(o.name)} office" src="${o.map}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
      </div>
      ${formCard()}
    </div>
  </section>

  <section class="section on-light rails" aria-labelledby="other-h">
    <div class="shell">
      <div class="section-head"><h2 class="h2" id="other-h" data-split>Other <span class="accent">Locations</span></h2></div>
      <div class="offices">${others.map((x, i) => officeRow(x, i)).join('')}</div>
    </div>
  </section>`;

  return { title: o.h1, description: `${o.h1} — ${o.address}, ${o.city}. ${o.hours}. Call ${firm.phone}.`, html };
}
