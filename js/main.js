/**
 * Luxe Events — Main JavaScript
 * Navbar, Dark Mode, Forms, FAQ, Testimonials, Gallery Filter
 */

(function () {
  'use strict';

  /* ---------- DOM Ready ---------- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initTheme();
    initNavbar();
    initMobileMenu();
    initFAQ();
    initTestimonials();
    initGalleryFilter();
    initForms();
    initPasswordToggles();
    initPasswordStrength();
    initNewsletter();
    setActiveNavLink();
    setMinEventDate();
  }

  /* ---------- Set minimum event date to today ---------- */
  function setMinEventDate() {
    const dateInput = document.getElementById('event-date');
    if (!dateInput) return;
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  /* ---------- Dark Mode ---------- */
  function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const saved = localStorage.getItem('luxe-theme');

    if (saved === 'light') {
      document.documentElement.classList.add('light');
    }

    if (toggle) {
      toggle.addEventListener('click', () => {
        document.body.classList.add('theme-transitioning');
        document.documentElement.classList.toggle('light');
        const isLight = document.documentElement.classList.contains('light');
        localStorage.setItem('luxe-theme', isLight ? 'light' : 'dark');

        setTimeout(() => {
          document.body.classList.remove('theme-transitioning');
        }, 500);
      });
    }
  }

  /* ---------- Navbar Scroll Effect ---------- */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ---------- Mobile Menu ---------- */
  function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!hamburger || !mobileMenu) return;

    const links = mobileMenu.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    links.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Active Nav Link ---------- */
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach((link) => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* ---------- FAQ Accordion ---------- */
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        faqItems.forEach((other) => {
          other.classList.remove('active');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          item.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ---------- Testimonials Slider ---------- */
  function initTestimonials() {
    const track = document.getElementById('testimonials-track');
    if (!track) return;

    const cards = track.querySelectorAll('.testimonial-card');
    if (cards.length === 0) return;

    let currentIndex = 0;
    let visibleCount = getVisibleCount();
    let autoplayInterval;

    function getVisibleCount() {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }

    function getMaxIndex() {
      return Math.max(0, cards.length - visibleCount);
    }

    function slideTo(index) {
      currentIndex = Math.min(index, getMaxIndex());
      const cardWidth = cards[0].offsetWidth;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    function nextSlide() {
      if (currentIndex >= getMaxIndex()) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      slideTo(currentIndex);
    }

    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }

    window.addEventListener('resize', () => {
      visibleCount = getVisibleCount();
      slideTo(currentIndex);
    });

    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        stopAutoplay();
        currentIndex = currentIndex <= 0 ? getMaxIndex() : currentIndex - 1;
        slideTo(currentIndex);
        startAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        stopAutoplay();
        nextSlide();
        startAutoplay();
      });
    }

    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
  }

  /* ---------- Gallery Filter ---------- */
  function initGalleryFilter() {
    const tabs = document.querySelectorAll('.filter-tab');
    const items = document.querySelectorAll('.gallery-item');
    if (tabs.length === 0 || items.length === 0) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;

        items.forEach((item) => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = '';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            requestAnimationFrame(() => {
              item.style.transition = 'opacity 0.4s, transform 0.4s';
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            });
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---------- Form Validation ---------- */
  const validators = {
    required: (value) => value.trim() !== '',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    phone: (value) => /^[\d\s\-+()]{10,}$/.test(value.replace(/\s/g, '')),
    minLength: (value, min) => value.length >= min,
    match: (value, matchValue) => value === matchValue,
    date: (value) => {
      const selected = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    },
    number: (value, min) => parseInt(value, 10) >= min,
  };

  function showError(input, message) {
    input.classList.add('error');
    input.classList.remove('success');
    const errorEl = input.parentElement.querySelector('.form-error') ||
                    input.closest('.form-group')?.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  }

  function clearError(input) {
    input.classList.remove('error');
    input.classList.add('success');
    const errorEl = input.parentElement.querySelector('.form-error') ||
                    input.closest('.form-group')?.querySelector('.form-error');
    if (errorEl) {
      errorEl.classList.remove('visible');
    }
  }

  function validateField(input, rules) {
    const value = input.value;
    for (const rule of rules) {
      if (!rule.test(value)) {
        showError(input, rule.message);
        return false;
      }
    }
    clearError(input);
    return true;
  }

  function initForms() {
    /* Login Form */
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('[name="email"]');
        const password = loginForm.querySelector('[name="password"]');
        let valid = true;

        valid = validateField(email, [
          { test: validators.required, message: 'Email is required' },
          { test: validators.email, message: 'Please enter a valid email' },
        ]) && valid;

        valid = validateField(password, [
          { test: validators.required, message: 'Password is required' },
          { test: (v) => validators.minLength(v, 6), message: 'Password must be at least 6 characters' },
        ]) && valid;

        if (valid) {
          showModal('Welcome Back!', 'You have successfully logged in. Redirecting to your dashboard...');
          loginForm.reset();
        }
      });
    }

    /* Register Form */
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = registerForm.querySelector('[name="username"]');
        const email = registerForm.querySelector('[name="email"]');
        const password = registerForm.querySelector('[name="password"]');
        const confirm = registerForm.querySelector('[name="confirm_password"]');
        const terms = registerForm.querySelector('[name="terms"]');
        let valid = true;

        valid = validateField(username, [
          { test: validators.required, message: 'Username is required' },
          { test: (v) => validators.minLength(v, 3), message: 'Username must be at least 3 characters' },
        ]) && valid;

        valid = validateField(email, [
          { test: validators.required, message: 'Email is required' },
          { test: validators.email, message: 'Please enter a valid email' },
        ]) && valid;

        valid = validateField(password, [
          { test: validators.required, message: 'Password is required' },
          { test: (v) => validators.minLength(v, 8), message: 'Password must be at least 8 characters' },
        ]) && valid;

        valid = validateField(confirm, [
          { test: validators.required, message: 'Please confirm your password' },
          { test: (v) => validators.match(v, password.value), message: 'Passwords do not match' },
        ]) && valid;

        const termsError = registerForm.querySelector('.terms-error');
        if (!terms.checked) {
          if (termsError) {
            termsError.style.display = 'block';
            termsError.classList.add('visible');
          }
          valid = false;
        } else if (termsError) {
          termsError.style.display = 'none';
          termsError.classList.remove('visible');
        }

        if (valid) {
          showModal('Account Created!', 'Welcome to Luxe Events. Your account has been registered successfully.');
          registerForm.reset();
          updateStrengthBar('');
        }
      });
    }

    /* Booking Form */
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fields = {
          full_name: [
            { test: validators.required, message: 'Full name is required' },
            { test: (v) => validators.minLength(v, 2), message: 'Name must be at least 2 characters' },
          ],
          email: [
            { test: validators.required, message: 'Email is required' },
            { test: validators.email, message: 'Please enter a valid email' },
          ],
          phone: [
            { test: validators.required, message: 'Phone number is required' },
            { test: validators.phone, message: 'Please enter a valid phone number' },
          ],
          event_date: [
            { test: validators.required, message: 'Event date is required' },
            { test: validators.date, message: 'Event date must be in the future' },
          ],
          event_type: [
            { test: validators.required, message: 'Please select an event type' },
          ],
          location: [
            { test: validators.required, message: 'Location is required' },
          ],
          guests: [
            { test: validators.required, message: 'Number of guests is required' },
            { test: (v) => validators.number(v, 1), message: 'Must have at least 1 guest' },
          ],
          budget: [
            { test: validators.required, message: 'Budget is required' },
          ],
        };

        let valid = true;
        Object.entries(fields).forEach(([name, rules]) => {
          const input = bookingForm.querySelector(`[name="${name}"]`);
          if (input && !validateField(input, rules)) valid = false;
        });

        if (valid) {
          showModal('Booking Submitted!', 'Thank you for choosing Luxe Events. Our team will contact you within 24 hours to confirm your event details.');
          bookingForm.reset();
        }
      });
    }

    /* Contact Form */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('[name="name"]');
        const email = contactForm.querySelector('[name="email"]');
        const subject = contactForm.querySelector('[name="subject"]');
        const message = contactForm.querySelector('[name="message"]');
        let valid = true;

        valid = validateField(name, [
          { test: validators.required, message: 'Name is required' },
        ]) && valid;

        valid = validateField(email, [
          { test: validators.required, message: 'Email is required' },
          { test: validators.email, message: 'Please enter a valid email' },
        ]) && valid;

        valid = validateField(subject, [
          { test: validators.required, message: 'Subject is required' },
        ]) && valid;

        valid = validateField(message, [
          { test: validators.required, message: 'Message is required' },
          { test: (v) => validators.minLength(v, 10), message: 'Message must be at least 10 characters' },
        ]) && valid;

        if (valid) {
          showModal('Message Sent!', 'Thank you for reaching out. We will get back to you within 48 hours.');
          contactForm.reset();
        }
      });
    }

    /* Real-time validation on blur */
    document.querySelectorAll('.form-input, .form-select, textarea.form-input').forEach((input) => {
      input.addEventListener('blur', () => {
        if (input.value.trim()) {
          input.classList.remove('error');
        }
      });
    });
  }

  /* ---------- Password Visibility Toggle ---------- */
  function initPasswordToggles() {
    document.querySelectorAll('.password-toggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const input = btn.parentElement.querySelector('input');
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        btn.innerHTML = isPassword
          ? '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
          : '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
      });
    });
  }

  /* ---------- Password Strength Indicator ---------- */
  function initPasswordStrength() {
    const passwordInput = document.getElementById('register-password');
    if (!passwordInput) return;

    passwordInput.addEventListener('input', (e) => {
      updateStrengthBar(e.target.value);
    });
  }

  function updateStrengthBar(password) {
    const fill = document.getElementById('strength-fill');
    const text = document.getElementById('strength-text');
    if (!fill || !text) return;

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const levels = [
      { width: '0%', color: '#EF4444', label: '' },
      { width: '25%', color: '#EF4444', label: 'Weak' },
      { width: '50%', color: '#F59E0B', label: 'Fair' },
      { width: '75%', color: '#D4AF37', label: 'Good' },
      { width: '100%', color: '#10B981', label: 'Strong' },
    ];

    const level = password.length === 0 ? levels[0] : levels[strength] || levels[1];
    fill.style.width = level.width;
    fill.style.background = level.color;
    text.textContent = level.label;
    text.style.color = level.color;
  }

  /* ---------- Success Modal ---------- */
  function showModal(title, message) {
    let modal = document.getElementById('success-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'success-modal';
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content" role="dialog" aria-labelledby="modal-title" aria-modal="true">
          <div class="modal-icon">✓</div>
          <h3 id="modal-title" class="font-display text-2xl font-bold mb-2"></h3>
          <p class="text-secondary mb-6" style="color: var(--text-secondary)"></p>
          <button class="btn-primary w-full" id="modal-close">Continue</button>
        </div>
      `;
      document.body.appendChild(modal);

      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
      modal.querySelector('#modal-close').addEventListener('click', closeModal);
    }

    modal.querySelector('#modal-title').textContent = title;
    modal.querySelector('p').textContent = message;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  /* ---------- Newsletter ---------- */
  function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!validators.email(input.value)) {
        input.style.borderColor = '#EF4444';
        return;
      }
      input.style.borderColor = '#10B981';
      showModal('Subscribed!', 'Thank you for subscribing to our newsletter. Stay tuned for exclusive event offers.');
      form.reset();
    });
  }

  /* Expose for animations.js */
  window.LuxeEvents = { showModal, closeModal };
})();
