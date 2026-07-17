document.addEventListener('DOMContentLoaded', () => {

  /* ============ Mobile menu ============ */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => {
    burger.classList.toggle('is-active');
    mobileMenu.classList.toggle('is-open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('is-active');
      mobileMenu.classList.remove('is-open');
    });
  });

  /* ============ Build stats marquee ============ */
  const stats = [
    { value: '20 days', label: 'saved on builds', brand: 'NETFLIX' },
    { value: '98%', label: 'faster deployment', brand: 'STRIPE' },
    { value: '300%', label: 'throughput increase', brand: 'LINEAR' },
    { value: '6x', label: 'faster to ship', brand: 'NOTION' },
  ];
  const statsTrack = document.getElementById('statsTrack');
  if (statsTrack) {
    const buildChip = (s) => {
      const el = document.createElement('div');
      el.className = 'stat-chip';
      el.innerHTML = `<span class="stat-chip__value">${s.value}</span><span class="stat-chip__label">${s.label}<br><strong>${s.brand}</strong></span>`;
      return el;
    };
    for (let i = 0; i < 2; i++) {
      stats.forEach(s => statsTrack.appendChild(buildChip(s)));
    }
  }

  /* ============ Build integrations marquee ============ */
  const integrations = [
    ['GitHub', 'Version Control'], ['Slack', 'Communication'], ['Stripe', 'Payments'],
    ['PostgreSQL', 'Database'], ['Redis', 'Cache'], ['AWS', 'Cloud'],
    ['MongoDB', 'Database'], ['Vercel', 'Hosting'], ['Figma', 'Design'],
    ['Linear', 'Project Management'], ['Notion', 'Documentation'], ['OpenAI', 'AI/ML'],
  ];
  const buildLogoChip = ([name, cat]) => {
    const el = document.createElement('div');
    el.className = 'logo-chip';
    el.innerHTML = `<span class="logo-chip__mark">${name.slice(0,2).toUpperCase()}</span>
      <span class="logo-chip__text"><span class="logo-chip__name">${name}</span><span class="logo-chip__cat">${cat}</span></span>`;
    return el;
  };
  const trackA = document.getElementById('logosTrackA');
  const trackB = document.getElementById('logosTrackB');
  if (trackA && trackB) {
    for (let i = 0; i < 2; i++) integrations.forEach(item => trackA.appendChild(buildLogoChip(item)));
    for (let i = 0; i < 2; i++) [...integrations].reverse().forEach(item => trackB.appendChild(buildLogoChip(item)));
  }

  /* ============ Build brands marquee ============ */
  const brands = ['Meridian Labs', 'Flux Systems', 'Beacon AI', 'Prism Analytics', 'Nova Tech', 'Quantum Corp', 'Atlas Digital', 'Vertex Labs'];
  const brandsTrack = document.getElementById('brandsTrack');
  if (brandsTrack) {
    for (let i = 0; i < 2; i++) {
      brands.forEach(b => {
        const el = document.createElement('span');
        el.className = 'brand-chip';
        el.textContent = b;
        brandsTrack.appendChild(el);
      });
    }
  }

  /* ============ Live clock ============ */
  const liveClock = document.getElementById('liveClock');
  const updateClock = () => {
    if (!liveClock) return;
    const now = new Date();
    liveClock.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };
  updateClock();
  setInterval(updateClock, 1000);

  /* ============ Animated counters (on scroll into view) ============ */
  const counters = document.querySelectorAll('.metric__value');
  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const duration = 1600;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = (decimals ? current.toFixed(decimals) : Math.round(current).toLocaleString('en-US')) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => counterObserver.observe(c));

  /* ============ Developer terminal tabs ============ */
  const tabs = document.querySelectorAll('.terminal__tab');
  const panes = document.querySelectorAll('.terminal__pane');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      panes.forEach(p => p.classList.remove('is-active'));
      tab.classList.add('is-active');
      document.querySelector(`.terminal__pane[data-pane="${tab.dataset.tab}"]`).classList.add('is-active');
    });
  });

  /* ============ Pricing billing toggle ============ */
  const billingSwitch = document.getElementById('billingSwitch');
  const monthlyLabel = document.getElementById('monthlyLabel');
  const annualLabel = document.getElementById('annualLabel');
  const priceAmounts = document.querySelectorAll('.price-card__price .amount');
  const priceMonthly = ['$0', '$24', 'Custom'];
  const priceAnnual = ['$0', '$20', 'Custom'];

  let isAnnual = false;
  billingSwitch.addEventListener('click', () => {
    isAnnual = !isAnnual;
    billingSwitch.classList.toggle('is-on', isAnnual);
    monthlyLabel.classList.toggle('is-active', !isAnnual);
    annualLabel.classList.toggle('is-active', isAnnual);
    priceAmounts.forEach((el, i) => {
      el.textContent = isAnnual ? priceAnnual[i] : priceMonthly[i];
    });
  });

  /* ============ Sticky header shadow on scroll ============ */
  const header = document.getElementById('header');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.style.borderBottomColor = y > 8 ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.09)';
    lastScroll = y;
  });

  /* ============ Animated chart-glyph background (hero) ============ */
  const glyphCanvas = document.getElementById('glyphCanvas');
  if (glyphCanvas) {
    const ctx = glyphCanvas.getContext('2d');
    const heroSection = glyphCanvas.closest('.hero');
    const GLYPH_COLOR = 'rgba(20,20,15,0.5)';
    const CELL = 46;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let glyphs = [];
    let width = 0, height = 0;

    function seededRandom(seed) {
      // simple deterministic pseudo-random so layout stays stable between rebuilds until resize
      let x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    }

    function buildGlyphs() {
      glyphs = [];
      const cols = Math.ceil(width / CELL) + 1;
      const rows = Math.ceil(height / CELL) + 1;
      let i = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          i++;
          const rnd = seededRandom(r * 928.13 + c * 17.7);
          if (rnd > 0.62) continue; // sparsity
          const jitterX = (seededRandom(i * 3.1) - 0.5) * CELL * 0.7;
          const jitterY = (seededRandom(i * 7.7) - 0.5) * CELL * 0.7;
          const type = Math.floor(seededRandom(i * 13.3) * 4);
          const scale = 0.6 + seededRandom(i * 5.5) * 0.7;
          const speed = 6 + seededRandom(i * 9.9) * 10; // px per second, drifting upward
          glyphs.push({
            baseX: c * CELL + jitterX,
            baseY: r * CELL + jitterY,
            type, scale, speed,
            phase: seededRandom(i * 21.1) * height,
          });
        }
      }
    }

    function resize() {
      const rect = heroSection.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      glyphCanvas.width = width * dpr;
      glyphCanvas.height = height * dpr;
      glyphCanvas.style.width = width + 'px';
      glyphCanvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGlyphs();
    }

    function drawGlyph(x, y, type, scale) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.strokeStyle = GLYPH_COLOR;
      ctx.fillStyle = GLYPH_COLOR;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';

      if (type === 0) {
        // candlestick: wick + body
        ctx.beginPath();
        ctx.moveTo(0, -14); ctx.lineTo(0, 14);
        ctx.stroke();
        ctx.fillRect(-3, -6, 6, 14);
      } else if (type === 1) {
        // stacked dots + base line
        for (let k = 0; k < 3; k++) {
          ctx.fillRect(-4, -12 + k * 7, 8, 3.5);
        }
        ctx.beginPath();
        ctx.moveTo(-7, 14); ctx.lineTo(7, 14);
        ctx.stroke();
      } else if (type === 2) {
        // small checkmark / swoosh
        ctx.beginPath();
        ctx.moveTo(-7, 0);
        ctx.quadraticCurveTo(-2, 8, 2, 2);
        ctx.quadraticCurveTo(6, -4, 9, -8);
        ctx.stroke();
      } else {
        // tick / plus mark
        ctx.beginPath();
        ctx.moveTo(-8, -8); ctx.lineTo(8, -8);
        ctx.moveTo(-8, -8); ctx.lineTo(-8, 4);
        ctx.stroke();
      }
      ctx.restore();
    }

    let lastTime = performance.now();
    function tick(now) {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      ctx.clearRect(0, 0, width, height);

      glyphs.forEach(g => {
        g.phase -= g.speed * dt;
        let y = ((g.baseY + g.phase) % (height + 60) + (height + 60)) % (height + 60) - 30;
        drawGlyph(g.baseX, y, g.type, g.scale);
      });

      requestAnimationFrame(tick);
    }

    resize();
    requestAnimationFrame(tick);

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    });
  }

  /* ============ Reveal-on-scroll for section titles ============ */
  const revealTargets = document.querySelectorAll('.section__title, .eyebrow, .feature-card, .price-card, .stat-box, .edge-node');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'rise .7s cubic-bezier(.16,1,.3,1) both';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(t => revealObserver.observe(t));

});
