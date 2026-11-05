import { firm, esc } from './data.js';

const messages = {
  required: 'This field is required.',
  phone: 'Please enter a valid 10-digit phone number.',
  email: 'Please enter a valid email address.',
  consent: 'Please agree to the terms to continue.',
};

function validateField(input) {
  const field = input.closest('.field, .check');
  const err = field?.querySelector('.field__error');
  let msg = '';
  const v = input.type === 'checkbox' ? input.checked : input.value.trim();
  if (input.required && !v) msg = input.type === 'checkbox' ? messages.consent : messages.required;
  else if (v && input.dataset.type === 'phone' && input.value.replace(/\D/g, '').replace(/^1/, '').length !== 10) msg = messages.phone;
  else if (v && input.dataset.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) msg = messages.email;
  field?.classList.toggle('has-error', !!msg);
  input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  if (err) err.textContent = msg;
  return !msg;
}

function success(form, first) {
  const box = document.createElement('div');
  box.className = 'form__success on-dark';
  box.setAttribute('role', 'status');
  box.innerHTML = `
    <p class="eyebrow">Request received</p>
    <p class="h3" style="color:var(--white)">Thank you${first ? `, ${esc(first)}` : ''}. <span class="accent">We’ll be in touch.</span></p>
    <p style="color:var(--on-dark-2)">If your matter is urgent, call <a class="link" href="${firm.phoneHref}" style="color:var(--gold)">${firm.phone}</a> — available 24/7.</p>`;
  form.replaceWith(box);
}

export function bindForms(root = document) {
  root.querySelectorAll('form[data-consult-form]').forEach((form) => {
    if (form.dataset.bound) return;
    form.dataset.bound = '1';

    // Format phone as the user types: (718) 275-7779
    form.querySelector('[data-type="phone"]')?.addEventListener('input', (e) => {
      const d = e.target.value.replace(/\D/g, '').replace(/^1/, '').slice(0, 10);
      e.target.value = d.length > 6 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : d.length > 3 ? `(${d.slice(0, 3)}) ${d.slice(3)}` : d;
    });

    // Clear an error the moment the field becomes valid (while typing), so the
    // layout never shifts under the pointer when the user moves to the next field.
    form.addEventListener('input', (e) => {
      const f = e.target.closest('.has-error');
      if (!f) return;
      const prev = f.querySelector('.field__error')?.textContent;
      if (!validateField(e.target) && prev) f.querySelector('.field__error').textContent = prev;
    });
    form.addEventListener('focusout', (e) => { if (e.target.matches('input, select') && e.target.value) validateField(e.target); });
    form.addEventListener('change', (e) => { if (e.target.closest('.has-error')) validateField(e.target); });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const inputs = [...form.querySelectorAll('input, select, textarea')];
      const ok = inputs.map(validateField).every(Boolean);
      if (!ok) { form.querySelector('[aria-invalid="true"]')?.focus(); return; }

      const btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      btn.style.opacity = 0.7;
      const data = Object.fromEntries(new FormData(form));

      if (firm.formEndpoint) {
        try {
          const res = await fetch(firm.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
          if (!res.ok) throw new Error(res.statusText);
        } catch {
          btn.disabled = false;
          btn.style.opacity = '';
          btn.insertAdjacentHTML('afterend', `<p class="field__error" role="alert">Something went wrong sending your request. Please call ${firm.phone}.</p>`);
          return;
        }
      } else {
        // No endpoint configured yet — prototype mode.
        console.info('[consult form] no endpoint configured; submission not sent', data);
        await new Promise((r) => setTimeout(r, 500));
      }
      success(form, data.firstName);
    });
  });
}
