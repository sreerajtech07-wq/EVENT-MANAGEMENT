/**
 * Luxe Events — GSAP Animations
 * ScrollTrigger, Hero, Cards, Gallery, Counters, Footer
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    initNavbarAnimation();
    initHeroAnimations();
    initSectionReveals();
    initServiceCards();
    initGalleryReveal();
    initEventCards();
    initPricingCards();
    initTestimonialFade();
    initCounters();
    initFAQReveal();
    initCTAReveal();
    initFooterFade();
    initAuthAnimations();
    initParallax();
  });

  /* ---------- Navbar Entrance ---------- */
  function initNavbarAnimation() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    gsap.from(navbar, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2,
    });
  }

  /* ---------- Hero Animations ---------- */
  function initHeroAnimations() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-label', { opacity: 0, y: 30, duration: 0.8 })
      .from('.hero-title', { opacity: 0, y: 50, duration: 1 }, '-=0.5')
      .from('.hero-subtitle', { opacity: 0, y: 40, duration: 0.8 }, '-=0.6')
      .from('.hero-description', { opacity: 0, y: 30, duration: 0.8 }, '-=0.5')
      .from('.hero-buttons', { opacity: 0, y: 30, duration: 0.8 }, '-=0.4')
      .from('.scroll-indicator', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
      .from('.floating-element', {
        opacity: 0,
        scale: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'back.out(1.7)',
      }, '-=1');

    /* Hero parallax on scroll */
    gsap.to('.hero-bg', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  /* ---------- Parallax Elements ---------- */
  function initParallax() {
    gsap.utils.toArray('[data-parallax]').forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      gsap.to(el, {
        y: () => speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }

  /* ---------- Generic Section Reveals ---------- */
  function initSectionReveals() {
    gsap.utils.toArray('.gsap-reveal').forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    /* About section image + text */
    const aboutImage = document.querySelector('.about-image');
    const aboutContent = document.querySelector('.about-content');
    if (aboutImage && aboutContent) {
      gsap.from(aboutImage, {
        opacity: 0,
        x: -60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 75%',
        },
      });
      gsap.from(aboutContent, {
        opacity: 0,
        x: 60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 75%',
        },
      });
    }
  }

  /* ---------- Service Cards Stagger ---------- */
  function initServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    if (cards.length === 0) return;

    gsap.from(cards, {
      opacity: 0,
      y: 60,
      scale: 0.95,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.services-section',
        start: 'top 75%',
      },
    });
  }

  /* ---------- Gallery Reveal ---------- */
  function initGalleryReveal() {
    const items = document.querySelectorAll('.gallery-item');
    if (items.length === 0) return;

    gsap.from(items, {
      opacity: 0,
      scale: 0.85,
      duration: 0.6,
      stagger: {
        amount: 0.8,
        grid: 'auto',
        from: 'start',
      },
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.gallery-section',
        start: 'top 75%',
      },
    });
  }

  /* ---------- Upcoming Events Stagger ---------- */
  function initEventCards() {
    const cards = document.querySelectorAll('.event-card');
    if (cards.length === 0) return;

    gsap.from(cards, {
      opacity: 0,
      y: 80,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.events-section',
        start: 'top 75%',
      },
    });
  }

  /* ---------- Pricing Scale Animation ---------- */
  function initPricingCards() {
    const cards = document.querySelectorAll('.pricing-card');
    if (cards.length === 0) return;

    gsap.from(cards, {
      opacity: 0,
      scale: 0.8,
      y: 50,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: '.pricing-section',
        start: 'top 75%',
      },
    });
  }

  /* ---------- Testimonials Fade ---------- */
  function initTestimonialFade() {
    const section = document.querySelector('.testimonials-section');
    if (!section) return;

    gsap.from(section.querySelector('.section-header'), {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
    });

    gsap.from('.testimonial-inner', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.testimonials-slider',
        start: 'top 80%',
      },
    });
  }

  /* ---------- Animated Counters ---------- */
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (counters.length === 0) return;

    counters.forEach((counter) => {
      const target = parseInt(counter.dataset.counter, 10);
      const suffix = counter.dataset.suffix || '';

      ScrollTrigger.create({
        trigger: counter,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 2.5,
            ease: 'power2.out',
            onUpdate: function () {
              counter.textContent = Math.round(this.targets()[0].val) + suffix;
            },
          });
        },
      });
    });
  }

  /* ---------- FAQ Reveal ---------- */
  function initFAQReveal() {
    const items = document.querySelectorAll('.faq-item');
    if (items.length === 0) return;

    gsap.from(items, {
      opacity: 0,
      x: -30,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.faq-section',
        start: 'top 75%',
      },
    });
  }

  /* ---------- CTA Banner Reveal ---------- */
  function initCTAReveal() {
    const cta = document.querySelector('.cta-banner');
    if (!cta) return;

    gsap.from(cta, {
      opacity: 0,
      scale: 0.95,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cta,
        start: 'top 85%',
      },
    });
  }

  /* ---------- Footer Fade ---------- */
  function initFooterFade() {
    const footer = document.querySelector('.footer-section');
    if (!footer) return;

    gsap.from(footer.children, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footer,
        start: 'top 90%',
      },
    });
  }

  /* ---------- Auth Page Animations ---------- */
  function initAuthAnimations() {
    const authCard = document.querySelector('.auth-card');
    if (!authCard) return;

    gsap.from('.auth-bg-shape', {
      scale: 0,
      opacity: 0,
      duration: 1.5,
      stagger: 0.3,
      ease: 'power2.out',
    });

    gsap.from(authCard, {
      opacity: 0,
      y: 60,
      scale: 0.95,
      duration: 1,
      ease: 'power3.out',
      delay: 0.3,
    });

    gsap.from(authCard.querySelectorAll('.form-group, .btn-primary, .auth-footer'), {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
      delay: 0.6,
    });
  }
})();
