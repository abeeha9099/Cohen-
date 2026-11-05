import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/sections.css';

import { offices } from './data.js';
import { header, footer, drawer, actionbar } from './ui.js';
import { initMotion, initChrome, reduced } from './motion.js';
import { bindForms } from './form.js';

import home from './pages/home.js';
import whyPage from './pages/firm.js';
import practice from './pages/practice.js';
import results from './pages/results.js';
import attorneys from './pages/attorneys.js';
import attorney from './pages/attorney.js';
import testimonials from './pages/reviews.js';
import locationPage from './pages/location.js';
import notFound from './pages/notfound.js';

// Paths mirror the original site so existing URLs keep working.
const routes = [
  [/^\/$/, home],
  [/^\/why-choose-us\/?$/, whyPage],
  [/^\/practice-areas\/?$/, practice],
  [/^\/case-results\/?$/, results],
  [/^\/testimonials\/?$/, testimonials],
  [/^\/attorney\/?$/, attorneys],
  [/^\/attorney\/([\w-]+)\/?$/, attorney],
];
const SITE = 'Cohen & Cohen Personal Injury Lawyers, P.C.';
const norm = (p) => (p.endsWith('/') ? p : `${p}/`);

if (new URLSearchParams(location.search).has('static')) document.documentElement.classList.add('no-motion');

/* ---- Shell ---------------------------------------------------------------- */
const app = document.getElementById('app');
app.innerHTML = `${header()}<main id="main" tabindex="-1"></main>${footer()}${drawer()}${actionbar()}`;
const main = document.getElementById('main');
const drawerEl = document.getElementById('drawer');
const menuEl = document.getElementById('menu');
const burger = document.querySelector('.burger');
let lastFocus = null;

function closeDropdowns(except) {
  document.querySelectorAll('.nav__item.is-open').forEach((li) => {
    if (li === except) return;
    li.classList.remove('is-open');
    li.querySelector('[data-dd]')?.setAttribute('aria-expanded', 'false');
  });
}
function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  document.body.classList.toggle('is-locked', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuEl.setAttribute('aria-hidden', String(!open));
}
function openDrawer() {
  setMenu(false);
  closeDropdowns();
  lastFocus = document.activeElement;
  drawerEl.classList.add('is-open');
  drawerEl.setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-locked');
  bindForms(drawerEl);
  setTimeout(() => drawerEl.querySelector('input')?.focus({ preventScroll: true }), reduced() ? 0 : 450);
}
function closeDrawer() {
  drawerEl.classList.remove('is-open');
  drawerEl.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('is-locked');
  lastFocus?.focus?.({ preventScroll: true });
}

document.addEventListener('click', (e) => {
  const dd = e.target.closest('[data-dd]');
  if (dd) {
    const li = dd.closest('.nav__item');
    const open = !li.classList.contains('is-open');
    closeDropdowns(li);
    li.classList.toggle('is-open', open);
    dd.setAttribute('aria-expanded', String(open));
    return;
  }
  if (!e.target.closest('.nav__item')) closeDropdowns();

  const mt = e.target.closest('button.menu__top');
  if (mt) {
    const g = mt.closest('.menu__group');
    const open = g.classList.toggle('is-open');
    mt.setAttribute('aria-expanded', String(open));
    return;
  }
  if (e.target.closest('[data-consult]')) { e.preventDefault(); openDrawer(); return; }
  if (e.target.closest('[data-close]')) { closeDrawer(); return; }
  if (e.target.closest('.burger')) { setMenu(!document.body.classList.contains('menu-open')); return; }

  const a = e.target.closest('a[href]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (a.target === '_blank') { setMenu(false); return; }
  if (!href.startsWith('/') || href.startsWith('//') || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  setMenu(false);
  closeDropdowns();
  a.blur();
  const url = new URL(href, location.origin);
  if (norm(url.pathname) === norm(location.pathname)) {
    if (url.hash) { history.pushState(null, '', href); document.querySelector(url.hash)?.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth' }); }
    else window.scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' });
    return;
  }
  history.pushState(null, '', href);
  render();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (drawerEl.classList.contains('is-open')) closeDrawer();
    if (document.body.classList.contains('menu-open')) { setMenu(false); burger.focus(); }
    const open = document.querySelector('.nav__item.is-open [data-dd]');
    closeDropdowns();
    open?.focus();
  }
  if (e.key === 'Tab' && drawerEl.classList.contains('is-open')) {
    const f = [...drawerEl.querySelectorAll('a[href], button, input, select, textarea')].filter((el) => !el.disabled && el.offsetParent);
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});
window.addEventListener('popstate', () => render());

/* ---- Router -------------------------------------------------------------- */
let first = true;
let unmount = null;

async function render() {
  const path = location.pathname;
  let view;
  const office = offices.find((o) => norm(o.path) === norm(path));
  if (office) view = locationPage(office.path);
  else {
    let page = notFound, params = [];
    for (const [re, p] of routes) { const m = path.match(re); if (m) { page = p; params = m.slice(1); break; } }
    view = page(...params);
  }

  if (!first && !reduced()) {
    main.classList.add('is-leaving');
    await new Promise((r) => setTimeout(r, 220));
  }
  unmount?.();
  main.innerHTML = view.html;
  document.title = view.title ? `${view.title} - ${SITE}` : SITE;
  if (view.description) document.querySelector('meta[name="description"]').setAttribute('content', view.description);

  // Active state: top-level link, or the dropdown that contains the current page.
  document.querySelectorAll('.nav__item').forEach((li) => {
    const links = [...li.querySelectorAll('a[href^="/"]')].map((a) => norm(a.getAttribute('href')));
    const active = links.some((h) => h !== '/' && norm(path).startsWith(h));
    li.querySelector('.nav__link').toggleAttribute('aria-current', active);
  });

  main.classList.remove('is-leaving');
  if (!first) { main.classList.remove('is-entering'); void main.offsetWidth; main.classList.add('is-entering'); }
  if (location.hash) requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView());
  else if (!first) { window.scrollTo(0, 0); main.focus({ preventScroll: true }); }

  initMotion(main);
  bindForms(main);
  unmount = view.mount?.(main) || null;
  first = false;
}

initChrome();
render();
