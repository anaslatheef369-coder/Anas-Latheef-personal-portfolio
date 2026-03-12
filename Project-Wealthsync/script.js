/* ═══════════════════════════════════════
   WealthSync – script.js
   ═══════════════════════════════════════ */

'use strict';

/* ── Navbar scroll behavior ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── Intersection Observer – scroll animations ── */
const animEls = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

animEls.forEach(el => observer.observe(el));

/* ── Hamburger toggle ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

/* ── Budget bar animation (triggered when hero is visible) ── */
const budgetFills = document.querySelectorAll('.budget-fill, .fc-bar-fill, .goal-fill');
const heroSection = document.getElementById('hero');
if (heroSection) {
  const heroObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      budgetFills.forEach(bar => {
        const targetW = bar.style.width;
        bar.style.width = '0';
        requestAnimationFrame(() => {
          setTimeout(() => { bar.style.width = targetW; }, 400);
        });
      });
      heroObs.unobserve(heroSection);
    }
  }, { threshold: 0.3 });
  heroObs.observe(heroSection);
}

/* ── Active nav link highlight ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const activeLinkObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => activeLinkObs.observe(s));

/* ── CTA button ripple effect ── */
function createRipple(e) {
  const btn = e.currentTarget;
  const existing = btn.querySelector('.ripple');
  if (existing) existing.remove();

  const circle = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  circle.classList.add('ripple');
  circle.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${e.clientX - rect.left - size / 2}px;
    top: ${e.clientY - rect.top - size / 2}px;
    background: rgba(255,255,255,0.28);
    border-radius: 50%;
    transform: scale(0);
    animation: rippleAnim 0.55s linear;
    pointer-events: none;
  `;
  if (!btn.style.position || btn.style.position === 'static') {
    btn.style.position = 'relative';
  }
  btn.style.overflow = 'hidden';
  btn.appendChild(circle);
  circle.addEventListener('animationend', () => circle.remove());
}

const style = document.createElement('style');
style.textContent = `
  @keyframes rippleAnim {
    to { transform: scale(1); opacity: 0; }
  }
  .nav-links a.active { color: #0F172A; background: #E2E8F0; }
`;
document.head.appendChild(style);

document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('click', createRipple);
});

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks.classList.remove('open');
    }
  });
});

/* ── Counter animation for stats ── */
function animateCounter(el, target, suffix = '') {
  const duration = 1500;
  const start = performance.now();
  const startVal = 0;
  const update = (now) => {
    const elapsed = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - elapsed, 3); // ease-out cubic
    el.textContent = Math.round(startVal + (target - startVal) * eased).toLocaleString() + suffix;
    if (elapsed < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

/* ── Tilt effect for hero dashboard card ── */
const dashCard = document.querySelector('.dashboard-card');
if (dashCard) {
  const wrapper = dashCard.closest('.mockup-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      dashCard.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`;
    });
    wrapper.addEventListener('mouseleave', () => {
      dashCard.style.transform = 'perspective(800px) rotateY(0) rotateX(0)';
    });
  }
}

/* ── Initialize ── */
document.addEventListener('DOMContentLoaded', () => {
  // Stagger visible elements already in view on load
  setTimeout(() => {
    document.querySelectorAll('[data-animate]:not(.is-visible)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('is-visible');
      }
    });
  }, 100);
});
