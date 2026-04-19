document.addEventListener('DOMContentLoaded', () => {

  /* ──────────── Language System ──────────── */
  let currentLang = 'en';

  function setLang(lang) {
    currentLang = lang;

    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));

    const activeBtn = document.querySelector(`.lang-btn[onclick="setLang('${lang}')"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Update all [data-en] / [data-ru] elements
    document.querySelectorAll('[data-en]').forEach(el => {
      const val = el.getAttribute('data-' + lang);
      if (val !== null) el.innerHTML = val;
    });

    // Update placeholders
    document.querySelectorAll('[data-placeholder-en]').forEach(el => {
      el.placeholder = el.getAttribute('data-placeholder-' + lang) || el.placeholder;
    });

    // Update select options
    document.querySelectorAll('select option[data-en]').forEach(el => {
      el.textContent = el.getAttribute('data-' + lang) || el.textContent;
    });
  }

  // Expose setLang globally so inline onclick="setLang(...)" still works
  window.setLang = setLang;


  /* ──────────── Custom Cursor ──────────── */
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (dot && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    function animCursor() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      dot.style.transform  = `translate(${mx - 4}px,  ${my - 4}px)`;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      requestAnimationFrame(animCursor);
    }
    animCursor();
  }


  /* ──────────── Header scroll ──────────── */
  const header = document.getElementById('mainHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    });
  }


  /* ──────────── Mobile Menu ──────────── */
  function toggleMobile() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('open');
  }

  function closeMobile() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.remove('open');
  }

  // Expose globally for inline onclick handlers
  window.toggleMobile = toggleMobile;
  window.closeMobile  = closeMobile;


  /* ──────────── Scroll Reveal ──────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => revealObs.observe(el));
  }


  /* ──────────── Smooth anchor links ──────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  /* ──────────── Animate stat counters ──────────── */
  function animCount(el, target, suffix, duration = 1600) {
    if (!el) return;
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const p   = Math.min((ts - start) / duration, 1);
      const val = Math.floor(p * target);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const resultsSection = document.getElementById('results');
  if (resultsSection) {
    const resultsObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const nums = document.querySelectorAll('.result-num');
          if (nums[2]) animCount(nums[2], 200, '%');
          resultsObs.disconnect();
        }
      });
    }, { threshold: 0.4 });

    resultsObs.observe(resultsSection);
  }

  /* ── Shark ── */
var sharkEl = document.getElementById('sharkWrap');
if (sharkEl) {
  var sharkSvg  = sharkEl.querySelector('svg');
  var sharkPos  = -210;
  var sharkDir  = 1;
  var sharkSpd  = 0.9;
  var heroEl    = document.getElementById('hero');

  function swimShark() {
    sharkPos += sharkSpd * sharkDir;

    var bound = heroEl ? heroEl.offsetWidth : window.innerWidth;
    var sharkW = sharkEl.offsetWidth;

    if (sharkPos > bound + 20) {
      sharkDir = -1;
      sharkEl.style.transform = 'scaleX(-1)';
    }
    if (sharkPos < -sharkW - 20) {
      sharkDir = 1;
      sharkEl.style.transform = 'scaleX(1)';
    }

    sharkEl.style.left = sharkPos + 'px';

    /* виляние хвостом */
    var wave = Math.sin(Date.now() / 320) * 2;
    sharkSvg.style.transform = 'rotate(' + wave + 'deg)';

    requestAnimationFrame(swimShark);
  }

  swimShark();
}

}); // end DOMContentLoaded

