import { firm } from '../data.js';

export default function notFound() {
  return {
    title: 'Page not found',
    html: `<section class="nf on-dark rails"><div class="shell stack" style="--stack:24px;display:grid;justify-items:center;padding-block:96px">
      <p class="eyebrow">404</p>
      <h1 class="display" data-split>Page <span class="accent">not found</span></h1>
      <p class="lede">Need help now? Call <a class="link" href="${firm.phoneHref}" style="color:var(--gold)">${firm.phone}</a> — available 24/7.</p>
      <a class="btn" href="/">Back to home</a>
    </div></section>`,
  };
}
