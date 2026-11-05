import { attorneys, esc } from '../data.js';
import { icon, portrait, attorneyCard, ctaBand } from '../ui.js';
import notFound from './notfound.js';

export default function attorneyPage(slugParam) {
  const a = attorneys.find((x) => x.slug === slugParam);
  if (!a) return notFound();
  const others = attorneys.filter((x) => x.slug !== a.slug).slice(0, 5);
  const words = a.name.split(' ');
  const last = words.pop();

  const html = `
  <section class="page-hero rails on-dark">
    <div class="shell">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/attorney/">Attorneys</a><span aria-hidden="true">/</span><span aria-current="page">${esc(a.name)}</span></nav>
      <p class="eyebrow" data-reveal>${esc(a.title)}</p>
      <h1 class="display" data-split style="margin-top:20px">${esc(words.join(' '))} <span class="accent">${esc(last)}</span></h1>
    </div>
  </section>

  <section class="section on-white rails">
    <div class="shell profile">
      <aside class="profile__aside">
        <div class="img-reveal" data-observe>${portrait(a, true)}</div>
        <button class="btn btn--block" type="button" data-consult>Book Consultation Now</button>
      </aside>
      <div class="stack" style="--stack:40px">
        ${a.about.length ? `<div class="stack" style="--stack:18px"><h2 class="h3" data-reveal>About ${esc(a.name)}</h2><div class="prose" data-reveal>${a.about.map((p) => `<p>${esc(p)}</p>`).join('')}</div></div>` : ''}
        ${a.facts.length ? `<dl class="facts" data-stagger="50">${a.facts.map((f) => `<div class="fact"><dt>${esc(f.k)}</dt><dd>${f.v.map((v) => `<span>${esc(v)}</span>`).join('')}</dd></div>`).join('')}</dl>` : ''}
      </div>
    </div>
  </section>

  <section class="section on-light rails">
    <div class="shell">
      <div class="section-head section-head--split"><h2 class="h2" data-split>Our <span class="accent">Team</span></h2>
      <a class="link" style="color:var(--royal)" href="/attorney/" data-reveal>All attorneys ${icon('arrow')}</a></div>
      <div class="team">${others.map((o, i) => attorneyCard(o, i)).join('')}</div>
    </div>
  </section>
  ${ctaBand()}`;

  return { title: a.name, description: `${a.name}, ${a.title} at Cohen & Cohen Personal Injury Lawyers, P.C.`, html };
}
