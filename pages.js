/* Page renderers. Each page sets <body data-page="..."> */
(function () {
  const S = window.SITE, P = document.body.dataset.page;
  const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const id = new URLSearchParams(location.search).get('id');
  const prod = i => S.products.find(p => p.id === i);

  const plans = () => S.plans.map(p => `
    <div class="plan reveal ${p.featured ? 'feat' : ''}">
      ${p.featured ? '<span class="ribbon">Most popular</span>' : ''}
      <h3>${p.name}</h3><div class="pr">${p.price}${p.price.startsWith('$') ? ' <small>/ project</small>' : ''}</div><div class="nt">${p.note}</div>
      <ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
      <a class="btn ${p.featured ? 'btn--primary' : 'btn--ghost'}" href="book.html?plan=${encodeURIComponent(p.name)}">${p.cta}</a></div>`).join('');
  const faq = () => S.faq.map((q, i) => `<div class="qa reveal"><button aria-expanded="false">${q[0]}</button><div class="ans">${q[1]}</div></div>`).join('');
  const bindFaq = () => $$('.qa').forEach(q => q.querySelector('button').onclick = () => {
    const open = q.classList.toggle('open'), a = q.querySelector('.ans');
    q.querySelector('button').setAttribute('aria-expanded', open);
    a.style.maxHeight = open ? a.scrollHeight + 40 + 'px' : 0;
  });
  const put = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; };
  const done = () => { bindFaq(); window.revealAll && revealAll(); };

  /* ---------------- HOME ---------------- */
  if (P === 'home') {
    put('#plansGrid', plans());
    put('#faqList', faq());
    const tech = [['React', '#61dafb'], ['Next.js', '#111827'], ['TypeScript', '#3178c6'], ['Node.js', '#3c873a'], ['Python', '#f7c948'], ['PostgreSQL', '#336791'], ['AWS', '#ff9900'], ['Stripe', '#635bff'], ['OpenAI', '#10a37f'], ['Figma', '#f24e1e'], ['Docker', '#2496ed'], ['Tailwind', '#38bdf8']];
    const t = tech.map(([n, c]) => `<div class="tchip"><i style="background:${c}"></i>${n}</div>`).join('');
    put('#techTrack', t + t);

    // scroll story
    const steps = $$('.step'), panes = $$('.story__pane');
    if (steps.length) {
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        const i = steps.indexOf(e.target);
        steps.forEach((s, k) => s.classList.toggle('on', k === i));
        panes.forEach((p, k) => p.classList.toggle('on', k === i));
      }), { rootMargin: '-45% 0px -45% 0px' });
      steps.forEach(s => io.observe(s));
      steps[0].classList.add('on'); panes[0].classList.add('on');
    }
  }

  /* ---------------- PRODUCT ---------------- */
  if (P === 'product') {
    const p = prod(id) || S.products[0];
    document.title = p.name + ' — ' + S.name;
    put('#app', `
      <div class="container detail"><div class="crumbs"><a href="index.html">Home</a> / <a href="index.html#work">Work</a> / ${p.name}</div>
      <div class="dgrid"><div>
        <small class="eyebrow">${p.cat === 'ai' ? 'AI & Automation' : p.cat[0].toUpperCase() + p.cat.slice(1)}</small>
        <h1 style="font-size:clamp(30px,4.4vw,46px);margin-bottom:14px">${p.name}</h1>
        <p style="font-size:18px">${p.tagline}</p>
        <h2>Live preview</h2>
        <div class="viewer">
          <div class="viewer__bar"><button class="on" data-d="desktop">🖥 Desktop</button><button data-d="tablet">📱 Tablet</button><button data-d="phone">📲 Phone</button></div>
          <div class="viewer__stage"><div class="frame" id="frame" data-d="desktop">
            <div class="frame__bar"><i></i><i></i><i></i></div>
            <div class="site2">
              <div class="site2__nav"><b>${p.name.split(' ')[0]}</b><span><em>Home</em><em>Features</em><em>Pricing</em></span></div>
              <div class="site2__hero ${p.g}"><h4>${p.tagline}</h4><p>${p.desc.slice(0, 70)}…</p><b>Get started</b></div>
              <div class="site2__tiles"><i>${p.emoji}</i><i>⚡</i><i>🔒</i></div>
            </div></div></div>
          <p style="font-size:13px;margin-top:10px">Interactive preview — switch devices to see how it adapts.</p>
        </div>
        <h2>About this product</h2><p>${p.desc}</p>
        <h2>Key features</h2><ul class="flist">${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
        <h2>Results</h2><div class="res">${p.results.map(r => { const m = r.match(/^([^\s]+)\s(.*)$/); return `<div><b>${m ? m[1] : r}</b><span>${m ? m[2] : ''}</span></div>`; }).join('')}</div>
      </div>
      <aside class="side"><small style="color:var(--mut)">Starting at</small><div class="price">${p.price.replace('From ', '')}</div>
        <div style="color:#f59e0b;font-weight:700">★ ${p.rating} <span style="color:var(--mut);font-weight:500">· ${p.metric}</span></div><hr>
        <small style="color:var(--mut)">Tech stack</small><div class="tags" style="margin-top:8px">${p.stack.map(s => `<span>${s}</span>`).join('')}</div><hr>
        <a class="btn btn--primary" href="book.html?product=${p.id}">Request a quote</a>
        <a class="btn btn--ghost" href="calculator.html">Estimate cost</a>
</aside></div>
      <h2 style="margin:70px 0 24px;font-size:28px">More products</h2>
      <div class="cgrid">${S.products.filter(x => x.id !== p.id).slice(0, 3).map(x => `
        <a class="ccard reveal" href="product.html?id=${x.id}"><div class="ccard__img ${x.g}"><em>${x.tag || x.cat}</em>${x.emoji}</div>
        <div class="ccard__body"><small>${x.price}</small><h3>${x.name}</h3><p>${x.tagline}</p><span class="link">View product →</span></div></a>`).join('')}</div></div>`);
    $$('.viewer__bar button').forEach(b => b.onclick = () => {
      $$('.viewer__bar button').forEach(x => x.classList.toggle('on', x === b));
      $('#frame').dataset.d = b.dataset.d;
    });
  }

  /* ---------------- PRICING ---------------- */
  if (P === 'pricing') { put('#plansGrid', plans()); put('#faqList', faq()); }

  /* ---------------- CALCULATOR ---------------- */
  if (P === 'calc') {
    const types = [['Landing website', 900, 2, '🌐'], ['Business website', 1800, 4, '🏢'], ['eCommerce store', 2800, 6, '🛍️'], ['Web app / SaaS', 4500, 10, '⚙️'], ['Mobile app', 6000, 12, '📱'], ['AI automation', 2200, 5, '🤖']];
    const feats = [['Admin dashboard', 900, 2], ['Payments', 600, 1], ['User accounts', 700, 2], ['AI chatbot', 1200, 2], ['Blog / CMS', 500, 1], ['Multi-language', 600, 1], ['Analytics & SEO', 450, 1], ['API integrations', 800, 2]];
    const times = [['Rush', 1.35, .6, '~40% faster'], ['Standard', 1, 1, 'Recommended'], ['Flexible', .9, 1.4, 'Save ~10%']];
    let t = 1, tm = 1; const f = new Set();
    put('#types', types.map((x, i) => `<button class="opt ${i === t ? 'on' : ''}" data-i="${i}">${x[3]} ${x[0]}</button>`).join(''));
    put('#feats', feats.map((x, i) => `<button class="opt" data-i="${i}">${x[0]}<small>+$${x[1]}</small></button>`).join(''));
    put('#times', times.map((x, i) => `<button class="opt ${i === tm ? 'on' : ''}" data-i="${i}">${x[0]}<small>${x[3]}</small></button>`).join(''));
    let shown = 0;
    const money = n => '$' + (Math.round(n / 50) * 50).toLocaleString();
    const calc = () => {
      let base = types[t][1], wk = types[t][2];
      f.forEach(i => { base += feats[i][1]; wk += feats[i][2]; });
      base *= times[tm][1]; wk = Math.max(1, Math.round(wk * times[tm][2]));
      const lo = base * .9, hi = base * 1.2;
      const to = lo, from = shown; shown = to; const t0 = performance.now();
      (function step(n) { const p = Math.min((n - t0) / 500, 1); $('#est').textContent = money(from + (to - from) * p).toLocaleString() + ' – ' + money(hi * (from + (to - from) * p) / lo).toLocaleString(); if (p < 1) requestAnimationFrame(step); })(t0);
      $('#wks').textContent = wk + '–' + (wk + 2) + ' weeks';
      $('#sum').innerHTML = `<li>• ${types[t][0]}</li>` + [...f].map(i => `<li>• ${feats[i][0]}</li>`).join('') + `<li>• ${times[tm][0]} timeline</li>`;
      const msg = `Estimate request — ${types[t][0]}; features: ${[...f].map(i => feats[i][0]).join(', ') || 'none'}; ${times[tm][0]} timeline; est. ${money(lo)}–${money(hi)} (${wk}–${wk + 2} weeks)`;
      $('#cbook').href = 'book.html?msg=' + encodeURIComponent(msg);
    };
    $$('#types .opt').forEach(b => b.onclick = () => { t = +b.dataset.i; $$('#types .opt').forEach(x => x.classList.toggle('on', x === b)); calc(); });
    $$('#feats .opt').forEach(b => b.onclick = () => { const i = +b.dataset.i; f.has(i) ? f.delete(i) : f.add(i); b.classList.toggle('on'); calc(); });
    $$('#times .opt').forEach(b => b.onclick = () => { tm = +b.dataset.i; $$('#times .opt').forEach(x => x.classList.toggle('on', x === b)); calc(); });
    shown = types[t][1] * .9; calc();
  }

  /* ---------------- BOOKING ---------------- */
  if (P === 'book') {
    const q = new URLSearchParams(location.search);
    let view = new Date(); view.setDate(1); view.setHours(0, 0, 0, 0);
    let pick = null, slot = null;
    const slots = ['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const draw = () => {
      $('#mname').textContent = view.toLocaleString('en', { month: 'long', year: 'numeric' });
      const first = view.getDay(), days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
      let h = ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => `<span>${d}</span>`).join('') + '<i></i>'.repeat(first);
      for (let d = 1; d <= days; d++) {
        const dt = new Date(view.getFullYear(), view.getMonth(), d);
        const off = dt < today || dt.getDay() === 0 || dt - today > 60 * 864e5;
        h += `<button class="day ${pick && +pick === +dt ? 'on' : ''}" data-t="${+dt}" ${off ? 'disabled' : ''}>${d}</button>`;
      }
      $('#cal').innerHTML = h;
      $$('.day:not(:disabled)').forEach(b => b.onclick = () => { pick = new Date(+b.dataset.t); slot = null; draw(); drawSlots(); upd(); });
    };
    const drawSlots = () => {
      $('#slots').innerHTML = pick ? slots.map(s => `<button type="button" class="slot ${slot === s ? 'on' : ''}">${s}</button>`).join('') : '<p style="color:var(--mut);font-size:14px;grid-column:1/-1">Pick a date first.</p>';
      $$('.slot').forEach(b => b.onclick = () => { slot = b.textContent; drawSlots(); upd(); });
    };
    const upd = () => $('#sel').innerHTML = pick ? `<b>${pick.toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' })}</b>${slot ? ' at <b>' + slot + '</b>' : ' — choose a time'} <span>(GMT+6)</span>` : 'No date selected yet';
    $('#prev').onclick = () => { const v = new Date(view); v.setMonth(v.getMonth() - 1); if (v >= new Date(today.getFullYear(), today.getMonth(), 1)) { view = v; draw(); } };
    $('#next').onclick = () => { view.setMonth(view.getMonth() + 1); draw(); };
    if (q.get('msg')) $('#bmsg').value = q.get('msg');
    else if (q.get('product')) { const p = prod(q.get('product')); if (p) $('#bmsg').value = 'I’m interested in: ' + p.name + '.\n'; }
    else if (q.get('plan')) $('#bmsg').value = 'I’m interested in the ' + q.get('plan') + ' plan.\n';
    draw(); drawSlots(); upd();
    $('#bform').onsubmit = async e => {
      e.preventDefault();
      const f = e.target, note = $('#bnote');
      if (!pick || !slot) { note.textContent = 'Please choose a date and a time.'; return; }
      if (!f.name.value.trim() || !/\S+@\S+\.\S+/.test(f.email.value)) { note.textContent = 'Please enter your name and a valid email.'; return; }
      note.textContent = 'Sending…';
      const when = pick.toDateString() + ' ' + slot + ' (GMT+6)';
      const ok = await sendLead({ name: f.name.value, email: f.email.value, phone: f.phone.value, preferred_time: when, project: f.msg.value });
      if (ok) $('#bwrap').innerHTML = `<div class="msg-ok"><div class="rocket">🎉</div><h3 style="margin:10px 0">You’re booked!</h3><p style="color:var(--mut)">Request received for <b>${when}</b>. I’ll confirm by email shortly.</p><a class="btn btn--primary" style="margin-top:18px" href="index.html">Back to home</a></div>`;
      else note.textContent = 'Opening your email app so you can send the request…';
    };
  }

  done();
})();
