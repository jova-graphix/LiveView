// LifeView Medical Hospital -- shared site behaviour
// Guards every lookup so the same file can run on any page,
// even pages that don't contain a particular element.

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
});

// Loader
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) setTimeout(() => loader.classList.add('hide'), 500);
});

// Dark mode
const root = document.documentElement;
const darkToggle = document.getElementById('darkToggle');
const applyTheme = (t) => { t === 'dark' ? root.classList.add('dark') : root.classList.remove('dark'); };
const saved = localStorage.getItem('lifeview-theme');
applyTheme(saved || 'light');
if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    const isDark = root.classList.toggle('dark');
    localStorage.setItem('lifeview-theme', isDark ? 'dark' : 'light');
  });
}

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    menuBtn.setAttribute('aria-expanded', String(!isOpen));
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.add('hidden')));
}

// Scroll progress + back to top
const progress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');
if (progress || backToTop) {
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    if (progress) progress.style.width = scrolled + '%';
    if (backToTop) {
      if (h.scrollTop > 500) {
        backToTop.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      } else {
        backToTop.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      }
    }
  });
}
if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); revealObserver.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));
}

// Animated counters
const counters = document.querySelectorAll('.counter');
if (counters.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.floor(eased * target);
        el.textContent = val.toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString() + suffix;
      };
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));
}

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => {
      i.classList.remove('open');
      const t = i.querySelector('.faq-toggle');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
  });
});

// Gallery lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
if (lightbox && lightboxImg && lightboxCaption) {
  document.querySelectorAll('.gallery-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const img = btn.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = btn.dataset.caption + ' — placeholder image';
      lightbox.classList.add('active');
    });
  });
  const lightboxClose = document.getElementById('lightboxClose');
  if (lightboxClose) lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('active'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lightbox.classList.remove('active'); });
}

// Appointment form (front-end only demo)
const form = document.getElementById('appointmentForm');
const formStatus = document.getElementById('formStatus');
if (form && formStatus) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    formStatus.textContent = 'Thank you — your appointment request has been received. Our front desk will call you shortly to confirm.';
    formStatus.className = 'mt-4 text-sm text-emerald-600 dark:text-emerald-400';
    formStatus.classList.remove('hidden');
    form.reset();
  });
}

// Newsletter (front-end only demo)
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('newsletterEmail');
    input.value = '';
    input.placeholder = 'Subscribed! Thank you.';
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
