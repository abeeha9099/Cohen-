import { firm, reviews, featuredReview, esc } from '../data.js';
import { icon, pageHero, ctaBand } from '../ui.js';

const PAGE = 24;

export default function testimonialsPage() {
  const html = `
  ${pageHero({
    crumbs: [{ label: 'Testimonials' }],
    eyebrow: 'Always ready to go the distance',
    title: '<span class="accent">Testimonials</span>',
    lede: `${esc(firm.rating)}.`,
    aside: `<a class="link" href="${firm.reviewsUrl}" target="_blank" rel="noopener">Read our Google reviews ${icon('ext')}</a>`,
  })}

  <section class="section on-light rails">
    <div class="shell">
      <figure class="featured on-royal" data-reveal>
        <span class="eyebrow">Featured Review · ${esc(featuredReview.source)}</span>
        <blockquote><p>“${esc(featuredReview.text)}”</p></blockquote>
        <figcaption class="rcard__name" style="color:var(--white)">${esc(featuredReview.name)}</figcaption>
      </figure>
      <div class="masonry" data-reviews>
        ${reviews.map((r, i) => `
        <figure class="rcard ${i >= PAGE ? 'is-hidden' : ''}" ${i < PAGE ? 'data-reveal' : ''} style="--d:${(i % 3) * 70}ms">
          <span class="stars" aria-label="5 stars">★★★★★</span>
          <blockquote><p>${esc(r.text)}</p></blockquote>
          <figcaption class="rcard__name">${esc(r.name)}</figcaption>
        </figure>`).join('')}
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:center;margin-top:24px">
        <button class="btn btn--outline" type="button" data-more>Show more testimonials</button>
        <span class="small muted" data-count-label>Showing ${Math.min(PAGE, reviews.length)} of ${reviews.length}</span>
      </div>
    </div>
  </section>
  ${ctaBand()}`;

  const mount = (root) => {
    const btn = root.querySelector('[data-more]');
    const label = root.querySelector('[data-count-label]');
    btn.addEventListener('click', () => {
      const hidden = [...root.querySelectorAll('.rcard.is-hidden')].slice(0, PAGE);
      hidden.forEach((c, i) => { c.classList.remove('is-hidden'); c.style.animation = `page-in .6s var(--ease-out) ${i * 30}ms both`; });
      const shown = root.querySelectorAll('.rcard:not(.is-hidden)').length;
      label.textContent = `Showing ${shown} of ${reviews.length}`;
      if (shown >= reviews.length) btn.remove();
    });
  };

  return { title: 'Testimonials', description: `${firm.rating}. Read what clients say about Cohen & Cohen Personal Injury Lawyers, P.C.`, html, mount };
}
