/* ============================================================
   Ian Dave B. Anonas — Portfolio JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── Navbar scroll effect ── */
  const navbar = document.querySelector('.navbar-custom');
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 50);
    }
    if (backToTop) {
      backToTop.classList.toggle('visible', scrollY > 400);
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Mobile nav close on link click ── */
  const navCollapse = document.getElementById('navbarNav');
  if (navCollapse) {
    document.querySelectorAll('.nav-link-custom').forEach(link => {
      link.addEventListener('click', () => {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      });
    });
  }

  /* ── Active nav link ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link-custom').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Scroll Reveal ── */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ── Hero animations ── */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    setTimeout(() => heroContent.classList.add('revealed'), 100);
  }

  /* ── Portfolio Filter ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card-wrap');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      portfolioCards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });

  /* ── Contact Form Validation ── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const fields = [
        { id: 'fullName', msg: 'Please enter your full name.' },
        { id: 'email', msg: 'Please enter a valid email.', isEmail: true },
        { id: 'subject', msg: 'Please enter a subject.' },
        { id: 'message', msg: 'Please enter your message.' },
      ];

      fields.forEach(({ id, msg, isEmail }) => {
        const input = document.getElementById(id);
        const feedback = document.getElementById(id + 'Error');
        const val = input.value.trim();

        let fieldValid = val.length > 0;
        if (isEmail && fieldValid) {
          fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        }

        if (!fieldValid) {
          input.classList.add('is-invalid');
          input.classList.remove('is-valid');
          if (feedback) { feedback.textContent = msg; feedback.classList.add('show'); }
          valid = false;
        } else {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
          if (feedback) feedback.classList.remove('show');
        }
      });

      if (valid) {
        showToast('Message sent successfully! I\'ll get back to you soon.');
        contactForm.reset();
        contactForm.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
      }
    });

    // Real-time validation clear
    contactForm.querySelectorAll('.form-control-custom').forEach(input => {
      input.addEventListener('input', () => {
        if (input.value.trim()) {
          input.classList.remove('is-invalid');
          const feedback = document.getElementById(input.id + 'Error');
          if (feedback) feedback.classList.remove('show');
        }
      });
    });
  }

  /* ── Toast ── */
  function showToast(message) {
    let toast = document.querySelector('.toast-custom');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-custom';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  /* ── Smooth anchor scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
