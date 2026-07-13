/* =========================================================
   MÁS FRUTA — main.js
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---- Loader ---- */
  const loader = document.querySelector('.loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 300);
  });

  /* ---- Navbar on scroll ---- */
  const navbar = document.querySelector('.navbar');
  const fabTop = document.querySelector('.fab-top');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    fabTop.classList.toggle('show', y > 500);
  });

  /* ---- Mobile menu ---- */
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });

  /* ---- Back to top ---- */
  document.querySelector('.fab-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  /* ---- Animated counters ---- */
  const counters = document.querySelectorAll('[data-count]');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const tick = () => {
        current += step;
        if (current >= target) { el.textContent = target.toLocaleString('es-CO'); return; }
        el.textContent = current.toLocaleString('es-CO');
        requestAnimationFrame(tick);
      };
      tick();
      counterIO.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(c => counterIO.observe(c));

  /* ---- Product filters ---- */
  const filtroBtns = document.querySelectorAll('.filtro-btn');
  const productCards = document.querySelectorAll('.producto-card');
  filtroBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filtroBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      productCards.forEach(card => {
        const show = cat === 'todos' || card.dataset.cat === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---- Testimonials carousel ---- */
  const slides = document.querySelectorAll('.testi-slide');
  const dots = document.querySelectorAll('.testi-dots span');
  let testiIndex = 0;
  function showSlide(i) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[i].classList.add('active');
    dots[i].classList.add('active');
    testiIndex = i;
  }
  dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
  if (slides.length) {
    setInterval(() => showSlide((testiIndex + 1) % slides.length), 5000);
  }

  /* ---- Gallery lightbox ---- */
  const galleryImgs = document.querySelectorAll('.masonry img');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox.querySelector('img');
  galleryImgs.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src.replace('w=500', 'w=1400');
      lightbox.classList.add('active');
    });
  });
  lightbox.addEventListener('click', () => lightbox.classList.remove('active'));

  /* ---- Contact form validation ---- */
  const form = document.querySelector('#contact-form');
  const successMsg = document.querySelector('.form-success');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      const fields = [
        { el: form.nombre, test: v => v.trim().length > 2 },
        { el: form.correo, test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
        { el: form.celular, test: v => /^[0-9+\s]{7,15}$/.test(v) },
        { el: form.mensaje, test: v => v.trim().length > 5 },
      ];
      fields.forEach(f => {
        const group = f.el.closest('.form-group');
        if (!f.test(f.el.value)) { group.classList.add('error'); valid = false; }
        else { group.classList.remove('error'); }
      });
      if (valid) {
        successMsg.classList.add('show');
        form.reset();
        setTimeout(() => successMsg.classList.remove('show'), 5000);
      }
    });
  }

  /* ---- Smooth anchor scroll offset for fixed navbar ---- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const y = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });

});
