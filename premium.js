/* ===== PREMIUM / 3D LAYER ===== */
(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // scroll progress
  const prog = $('#progress');
  addEventListener('scroll', () => {
    prog.style.width = (scrollY / (document.documentElement.scrollHeight - innerHeight) * 100) + '%';
  }, { passive: true });

  // cursor glow
  const cur = $('#cursor');
  addEventListener('pointermove', e => {
    cur.style.opacity = 1; cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px';
  });

  // hero headline word-by-word reveal
  if (!reduce) {
    let i = 0;
    const wrap = n => {
      [...n.childNodes].forEach(c => {
        if (c.nodeType === 3) {
          const f = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(t => {
            if (!t.trim()) { f.append(t); return; }
            const w = document.createElement('span'); w.className = 'w';
            const s = document.createElement('span');
            s.style.animationDelay = (.15 + i++ * .09) + 's'; s.textContent = t;
            w.append(s); f.append(w);
          });
          c.replaceWith(f);
        } else if (c.nodeType === 1 && c.tagName !== 'BR') wrap(c);
      });
    };
    wrap($('.hero h1'));
  }

  // 3D tilt + glare
  if (!reduce && matchMedia('(hover:hover)').matches) {
    $$('.card, .svc, .quote, .player').forEach(el => {
      const g = document.createElement('div'); g.className = 'glare'; el.append(g);
      const max = el.classList.contains('player') ? 4 : 7;
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.transition = 'transform .08s';
        el.style.transform = `perspective(900px) rotateX(${(.5 - y) * max}deg) rotateY(${(x - .5) * max}deg) translateY(-6px)`;
        el.style.setProperty('--gx', x * 100 + '%'); el.style.setProperty('--gy', y * 100 + '%');
        el.classList.add('tilting');
      });
      el.addEventListener('pointerleave', () => {
        el.style.transition = ''; el.style.transform = ''; el.classList.remove('tilting');
      });
    });
  }

  // looping counters in showreel
  $$('[data-loop]').forEach(el => {
    const end = parseFloat(el.dataset.count), suf = el.dataset.suffix || '';
    const run = () => {
      const t0 = performance.now();
      const step = t => {
        const p = Math.min((t - t0) / 1600, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(end * e) + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    run(); setInterval(run, 4000);
  });

})();
