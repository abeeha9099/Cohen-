import { attorneys } from '../data.js';
import { pageHero, attorneyCard, ctaBand } from '../ui.js';

export default function attorneysPage() {
  const html = `
  ${pageHero({
    crumbs: [{ label: 'About' }, { label: 'Attorneys' }],
    eyebrow: 'Our Team',
    title: '<span class="accent">Attorneys</span>',
    lede: 'Meet our team of New York personal injury attorneys, who have over 100 years of legal experience combined. Learn more about them below:',
  })}
  <section class="section on-white rails">
    <div class="shell"><div class="team">${attorneys.map((a, i) => attorneyCard(a, i)).join('')}</div></div>
  </section>
  ${ctaBand()}`;
  return { title: 'Attorneys', description: 'Meet the New York personal injury attorneys of Cohen & Cohen Personal Injury Lawyers, P.C.', html };
}
