import { esc } from './data.js';

/** Render verbatim lines: plain lines → <p>, consecutive "- Label: text" lines → <ul>. */
export function rich(lines = []) {
  let out = '';
  let list = [];
  const flush = () => {
    if (!list.length) return;
    out += `<ul>${list.map((l) => {
      const m = l.match(/^([^:]{2,60}):\s*(.*)$/);
      return `<li>${m ? `<strong>${esc(m[1])}:</strong> ${esc(m[2])}` : esc(l)}</li>`;
    }).join('')}</ul>`;
    list = [];
  };
  lines.forEach((l) => {
    if (/^-\s+/.test(l)) list.push(l.replace(/^-\s+/, ''));
    else { flush(); out += `<p>${esc(l)}</p>`; }
  });
  flush();
  return out;
}

export const slug = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
