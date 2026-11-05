import { why, esc } from '../data.js';
import { pageHero, helpNow, ctaBand } from '../ui.js';
import { rich, slug } from '../rich.js';

const table = (rows) => `<div class="table-wrap"><table>
  <thead><tr>${rows[0].map((c) => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead>
  <tbody>${rows.slice(1).map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>
</table></div>`;

export default function whyPage() {
  const html = `
  ${pageHero({
    crumbs: [{ label: 'About' }, { label: 'Why Choose Us' }],
    eyebrow: 'Queens, NY Personal Injury Lawyers',
    title: 'About <span class="accent">Us</span>',
    lede: esc(why.intro[0]),
  })}

  <section class="section on-white rails">
    <div class="shell why-layout">
      <nav class="toc" aria-label="On this page">
        <p>Why Choose Cohen &amp; Cohen</p>
        ${why.sections.map((s, i) => `<a href="/why-choose-us/#${slug(s.title)}" data-toc="${slug(s.title)}"><span class="index">${String(i + 1).padStart(2, '0')}</span>${esc(s.title)}</a>`).join('')}
      </nav>
      <div>
        <h2 class="h2" data-split style="margin-bottom:clamp(32px,4vw,56px)">Why choose Cohen &amp; Cohen Personal Injury Lawyers, <span class="accent">P.C.?</span></h2>
        ${why.sections.map((s, i) => `
        <article class="wsec" id="${slug(s.title)}">
          <header class="wsec__head">
            <span class="index">${String(i + 1).padStart(2, '0')}</span>
            <h3 class="h3" data-reveal>${esc(s.title)}</h3>
            <h4 class="wsec__q" data-reveal>${esc(s.q)}</h4>
          </header>
          <div class="prose" data-reveal>${rich(s.body.filter((b) => !b.startsWith('Prior results')))}</div>
          ${s.table ? table(s.table) : ''}
          ${s.body.some((b) => b.startsWith('Prior results')) ? `<p class="disclaimer">${esc(s.body.find((b) => b.startsWith('Prior results')))}</p>` : ''}
        </article>`).join('')}
        <article class="wsec">
          <header class="wsec__head"><h3 class="h3">Get a Free Consultation</h3></header>
          <div class="prose"><p>If you’ve been injured, Cohen &amp; Cohen Personal Injury Lawyers, P.C. will evaluate your case at no cost and on a contingency basis, meaning you pay nothing unless we win. Call (718) 275-7779, available 24/7, or request a call through our contact form. Can’t come to us? We’ll meet you at your home or hospital room.</p></div>
        </article>
      </div>
    </div>
  </section>

  ${helpNow()}
  ${ctaBand()}`;

  const mount = (root) => {
    const links = [...root.querySelectorAll('[data-toc]')];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) links.forEach((l) => l.classList.toggle('is-active', l.dataset.toc === e.target.id)); });
    }, { rootMargin: '-30% 0px -60% 0px' });
    root.querySelectorAll('.wsec[id]').forEach((s) => io.observe(s));
    return () => io.disconnect();
  };

  return { title: 'Why Choose Cohen & Cohen Personal Injury Lawyers, P.C.', description: why.intro[0].slice(0, 155), html, mount };
}
