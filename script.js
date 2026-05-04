// ============================================
// SPREAD LIFE SPEAK LOVE — Scripts
// Dark, Bold, Editorial
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Preloader ---
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 800);
  });
  // Fallback: hide preloader after 3s max
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 3000);

  // --- Navbar scroll ---
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  const handleNavScroll = () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // --- Mobile menu ---
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  const toggleMobileMenu = () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMobileMenu);

  // Close on link click
  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });

  // --- Smooth scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = nav.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Scroll reveal animations ---
  const revealElements = document.querySelectorAll(
    '.about-title, .about-lead, .about-bio p, .about-certs, .about-image-block, ' +
    '.services-title, .service-card, ' +
    '.results-title, .testimonial, ' +
    '.cta-block, ' +
    '.contact-title, .contact-sub, .contact-details, .contact-form'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on sibling index
        const siblings = entry.target.parentElement.children;
        let index = 0;
        for (let j = 0; j < siblings.length; j++) {
          if (siblings[j] === entry.target) { index = j; break; }
        }

        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 80);

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(el);
  });

  // --- Hero parallax on bg text ---
  const heroBgText = document.querySelector('.hero-bg-text');
  if (heroBgText) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBgText.style.transform = `translateY(${scrolled * 0.15}px)`;
      }
    }, { passive: true });
  }

  // --- Hero text entrance animation ---
  const heroElements = document.querySelectorAll('.hero-tagline, .hero-headline, .hero-sub, .hero-cta');
  heroElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';

    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 1000 + (i * 150));
  });

  // --- Contact form ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalHTML = submitBtn.innerHTML;

      submitBtn.innerHTML = '<span>MESSAGE SENT ✓</span>';
      submitBtn.style.background = '#22C55E';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

  // --- Marquee duplicate for seamless loop ---
  const marqueeTrack = document.querySelector('.marquee-track');
  const marqueeContent = document.querySelector('.marquee-content');
  if (marqueeTrack && marqueeContent) {
    const clone = marqueeContent.cloneNode(true);
    marqueeTrack.appendChild(clone);
  }

  // --- Cursor glow effect on hero (desktop only) ---
  if (window.matchMedia('(min-width: 769px)').matches) {
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        hero.style.background = `radial-gradient(circle 600px at ${x}px ${y}px, rgba(232, 73, 28, 0.03), var(--black) 70%)`;
      });

      hero.addEventListener('mouseleave', () => {
        hero.style.background = 'var(--black)';
      });
    }
  }

});
