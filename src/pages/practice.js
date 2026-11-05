import { practiceGroups, esc } from '../data.js';
import { icon, pageHero, helpNow } from '../ui.js';

export default function practicePage() {
  const total = practiceGroups.reduce((n, g) => n + g.items.length, 0);
  const html = `
  ${pageHero({
    crumbs: [{ label: 'Practice Areas' }],
    eyebrow: 'Queens, NY Personal Injury Lawyers',
    title: 'Practice <span class="accent">Areas</span>',
    lede: 'We provide a free, no-obligation case evaluation and handle all personal injury cases on a contingency fee basis.',
    aside: `<p class="small" style="color:var(--on-dark-3)">${total} practice areas in ${practiceGroups.length} groups. Each links to its full page on the current site ${icon('ext', 'ext-mark')}</p>`,
  })}

  <nav class="subnav" aria-label="Practice area groups">
    <div class="shell"><div class="subnav__list">
      ${practiceGroups.map((g) => `<a href="/practice-areas/#${g.id}" data-sub="${g.id}">${esc(g.title)}</a>`).join('')}
    </div></div>
  </nav>

  <div class="on-white rails">
    <div class="shell">
      ${practiceGroups.map((g, i) => `
      <section class="pgroup" id="${g.id}" aria-labelledby="${g.id}-h">
        <div class="pgroup__intro">
          <span class="index">${String(i + 1).padStart(2, '0')} · ${g.items.length} areas</span>
          <h2 class="h2" id="${g.id}-h" data-split style="font-size:clamp(2.2rem,1.4rem + 2.6vw,3.8rem)">${esc(g.title)}</h2>
        </div>
        <div class="plinks" data-stagger="30">
          ${g.items.map((it) => `<a href="${esc(it.href)}" target="_blank" rel="noopener">${esc(it.label)} ${icon('ext')}</a>`).join('')}
        </div>
      </section>`).join('')}
    </div>
  </div>

  ${helpNow()}`;

  const mount = (root) => {
    const links = [...root.querySelectorAll('[data-sub]')];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((l) => l.classList.toggle('is-active', l.dataset.sub === e.target.id));
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    root.querySelectorAll('.pgroup').forEach((s) => io.observe(s));
    return () => io.disconnect();
  };

  return { title: 'Practice Areas', description: 'All practice areas of Cohen & Cohen Personal Injury Lawyers, P.C.: premises liability, nursing home neglect, motor vehicle, construction and traumatic injuries.', html, mount };
}
