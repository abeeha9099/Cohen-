// Lightweight motion layer: IntersectionObserver reveals, word-split headings,
// scroll-scrubbed statement text, count-ups, pointer tilt. No dependencies.
// Everything degrades to static content under prefers-reduced-motion.

// `?static` in the URL forces the reduced-motion path (QA / screenshots).
export const reduced = () => document.documentElement.classList.contains('no-motion') || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let observer;
let cleanups = [];

function splitWords(el, cls = 'w') {
  if (el.dataset.splitDone) return;
  el.dataset.splitDone = '1';
  let i = 0;
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === 3) {
        const parts = child.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          const outer = document.createElement('span');
          outer.className = cls;
          if (cls === 'w') {
            const inner = document.createElement('span');
            inner.textContent = part;
            outer.style.setProperty('--i', i++);
            outer.appendChild(inner);
          } else {
            outer.textContent = part;
            outer.dataset.i = i++;
          }
          frag.appendChild(outer);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === 1 && child.tagName !== 'BR') {
        walk(child);
      }
    });
  };
  walk(el);
  return i;
}

function fmt(el, v) {
  const d = +(el.dataset.decimals || 0);
  const n = d ? v.toFixed(d) : Math.round(v).toLocaleString('en-US');
  el.textContent = `${el.dataset.prefix || ''}${n}${el.dataset.suffix || ''}`;
}

function countUp(el) {
  const to = parseFloat(el.dataset.count);
  if (reduced()) return fmt(el, to);
  const dur = 1800;
  const t0 = performance.now();
  const step = (t) => {
    const p = Math.min(1, (t - t0) / dur);
    const e = 1 - Math.pow(2, -10 * p);
    fmt(el, to * (p === 1 ? 1 : e));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initScrub(root) {
  const els = [...root.querySelectorAll('[data-scrub]')];
  if (!els.length || reduced()) return;
  const data = els.map((el) => {
    el.classList.add('scrub');
    const n = splitWords(el, 'sw');
    return { el, words: [...el.querySelectorAll('.sw')], n };
  });
  let raf = 0;
  const update = () => {
    raf = 0;
    const vh = window.innerHeight;
    data.forEach(({ el, words, n }) => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.88 - r.top) / (r.height + vh * 0.4)));
      const lit = p * (n + 2);
      words.forEach((w, i) => w.style.setProperty('--o', (0.2 + 0.8 * Math.min(1, Math.max(0, lit - i))).toFixed(3)));
    });
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
  cleanups.push(() => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); });
}

function initTilt(root) {
  if (reduced() || !window.matchMedia('(pointer: fine)').matches) return;
  root.querySelectorAll('[data-tilt]').forEach((zone) => {
    const card = zone.querySelector('[data-tilt-target]');
    if (!card) return;
    const move = (e) => {
      const r = zone.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty('--ry', `${(x * 14).toFixed(2)}deg`);
      card.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`);
    };
    const leave = () => { card.style.setProperty('--ry', '0deg'); card.style.setProperty('--rx', '0deg'); };
    zone.addEventListener('pointermove', move);
    zone.addEventListener('pointerleave', leave);
  });
}

export function initMotion(root) {
  cleanups.forEach((fn) => fn());
  cleanups = [];
  observer?.disconnect();

  const rm = reduced();

  root.querySelectorAll('[data-stagger]').forEach((group) => {
    const step = +(group.dataset.stagger || 80);
    [...group.children].forEach((c, i) => {
      if (!c.hasAttribute('data-reveal')) c.setAttribute('data-reveal', '');
      c.style.setProperty('--d', `${i * step}ms`);
    });
  });

  if (!rm) root.querySelectorAll('[data-split]').forEach((el) => splitWords(el));
  root.querySelectorAll('[data-count]').forEach((el) => { if (!rm) fmt(el, 0); });

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        el.classList.add('is-in');
        if (el.dataset.count !== undefined) countUp(el);
        observer.unobserve(el);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );
  root.querySelectorAll('[data-reveal], [data-split], [data-count], [data-observe]').forEach((el) => observer.observe(el));
  document.querySelectorAll('.footer [data-reveal]:not(.is-in)').forEach((el) => observer.observe(el));

  initScrub(root);
  initTilt(root);
}

/* ---- Global chrome behaviour (runs once) -------------------------------- */
export function initChrome() {
  const header = document.getElementById('header');
  const bar = document.getElementById('actionbar');
  let raf = 0;
  // The header stays fixed at the top at all times (it never hides on scroll).
  const update = () => {
    raf = 0;
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle('is-scrolled', y > 8);
    header.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : 0);
    bar?.classList.toggle('is-visible', y > 520);
  };
  window.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
  update();
}
