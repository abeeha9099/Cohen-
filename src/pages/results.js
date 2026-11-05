import { results, resultsIntro, disclaimer, esc } from '../data.js';
import { icon, pageHero, helpNow } from '../ui.js';

export default function resultsPage() {
  const html = `
  ${pageHero({
    crumbs: [{ label: 'Case Results' }],
    eyebrow: 'Queens, NY Personal Injury Lawyers',
    title: 'Results Matter—<span class="accent">And So Do You</span>',
    lede: esc(resultsIntro[0]),
    aside: `<p class="lede">${esc(resultsIntro[1] || '')}</p>`,
  })}

  <section class="section on-white rails" aria-label="Case results">
    <div class="shell">
      <div class="rlist">
        ${results.map((r, i) => {
          const long = r.paras.join(' ').length > 420 || r.paras.length > 1;
          return `<article class="ritem" data-reveal style="--d:${(i % 3) * 60}ms">
            <div>
              <h2 class="ritem__amt num">${esc(r.amount)}</h2>
              ${r.type ? `<p class="ritem__meta">${esc(r.type)}<span>${esc(r.place)}</span></p>` : ''}
            </div>
            <div>
              <div class="prose"><p>${esc(r.paras[0])}</p></div>
              ${long && r.paras.length > 1 ? `<div class="more"><div class="prose" style="padding-top:1.1em">${r.paras.slice(1).map((p) => `<p>${esc(p)}</p>`).join('')}</div></div>
              <button class="toggle" type="button" aria-expanded="false" data-toggle>Read the full case ${icon('down')}</button>` : ''}
            </div>
          </article>`;
        }).join('')}
      </div>
      <p class="disclaimer">${esc(disclaimer)}</p>
    </div>
  </section>
  ${helpNow()}`;

  const mount = (root) => {
    root.querySelectorAll('[data-toggle]').forEach((b) => b.addEventListener('click', () => {
      const item = b.closest('.ritem');
      const open = item.classList.toggle('is-expanded');
      b.setAttribute('aria-expanded', String(open));
      b.childNodes[0].textContent = open ? 'Show less ' : 'Read the full case ';
    }));
  };

  return { title: 'Case Results', description: 'Case results from Cohen & Cohen Personal Injury Lawyers, P.C. Prior results do not guarantee a similar outcome.', html, mount };
}
