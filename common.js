/* Shared behaviour for every page: nav/footer, theme, chat, WhatsApp, lead sending */
(function () {
  const S = window.SITE;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  window.$ = window.$ || $; window.$$ = window.$$ || $$;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  window.esc = esc;

  /* ---------- theme ---------- */
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.dataset.theme = saved;

  /* ---------- injected nav + footer (sub pages) ---------- */
  const links = [['index.html#work', 'Work'], ['case-studies.html', 'Case Studies'], ['pricing.html', 'Pricing'], ['calculator.html', 'Estimate'], ['blog.html', 'Blog'], ['about.html', 'About']];
  const navHTML = `
  <header class="nav scrolled" id="nav"><div class="container nav__inner">
    <a href="index.html" class="logo"><span class="logo__mark">YN</span> ${esc(S.name)}</a>
    <nav class="nav__links" id="navLinks" aria-label="Main">
      ${links.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}
      <a href="book.html" class="btn btn--primary btn--sm">Book a Free Call</a>
    </nav>
    <button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span></button>
  </div></header>`;
  const footHTML = `
  <footer class="footer"><div class="container footer__grid">
    <div><a href="index.html" class="logo logo--light"><span class="logo__mark">YN</span> ${esc(S.name)}</a><p>Websites, apps and AI automation for growing businesses.</p></div>
    <div><h4>Explore</h4><a href="index.html#work">Work</a><a href="case-studies.html">Case Studies</a><a href="pricing.html">Pricing</a><a href="calculator.html">Cost Estimator</a></div>
    <div><h4>Company</h4><a href="about.html">About</a><a href="blog.html">Blog</a><a href="book.html">Book a call</a><a href="pricing.html#faq">FAQ</a></div>
    <div><h4>Connect</h4><a href="mailto:${S.email}">${S.email}</a><a href="https://wa.me/${S.whatsapp}" target="_blank" rel="noopener">WhatsApp</a><a href="https://github.com/Shafin5556" target="_blank" rel="noopener">GitHub</a></div>
  </div><div class="container footer__bar">© ${new Date().getFullYear()} ${esc(S.name)}. All rights reserved.</div></footer>`;
  const navSlot = $('#site-nav'), footSlot = $('#site-footer');
  if (navSlot) navSlot.outerHTML = navHTML;
  if (footSlot) footSlot.outerHTML = footHTML;

  /* mobile menu (sub pages; index has its own in script.js) */
  const burger = $('#burger'), nl = $('#navLinks');
  if (burger && navSlot) burger.addEventListener('click', () => {
    const o = nl.classList.toggle('open'); burger.setAttribute('aria-expanded', o);
  });

  /* ---------- theme toggle button ---------- */
  const tg = document.createElement('button');
  tg.className = 'themebtn'; tg.setAttribute('aria-label', 'Toggle dark mode');
  const paint = () => tg.textContent = document.documentElement.dataset.theme === 'dark' ? '☀️' : '🌙';
  paint();
  tg.addEventListener('click', () => {
    const d = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = d; localStorage.setItem('theme', d); paint();
  });
  const nlinks = $('#navLinks'); if (nlinks) nlinks.append(tg);

  /* ---------- progress bar + reveal (sub pages) ---------- */
  if (navSlot !== null || document.body.classList.contains('sub')) {
    const pr = document.createElement('div'); pr.className = 'progress'; document.body.prepend(pr);
    addEventListener('scroll', () => pr.style.width = (scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight) * 100) + '%', { passive: true });
  }
  window.revealAll = (root = document) => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
    $$('.reveal:not(.in)', root).forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });
  };
  if (document.body.classList.contains('sub')) revealAll();

  /* ---------- lead sending (FormSubmit: emails you directly) ---------- */
  window.sendLead = async function (fields) {
    try {
      const r = await fetch('https://formsubmit.co/ajax/' + S.email, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ _subject: 'New portfolio lead', _template: 'table', ...fields })
      });
      if (!r.ok) throw 0; return true;
    } catch (e) {
      location.href = 'mailto:' + S.email + '?subject=' + encodeURIComponent('New project enquiry') + '&body=' + encodeURIComponent(Object.entries(fields).map(([k, v]) => k + ': ' + v).join('\n'));
      return false;
    }
  };

  /* ---------- WhatsApp float ---------- */
  const wa = document.createElement('a');
  wa.className = 'wa'; wa.href = 'https://wa.me/' + S.whatsapp + '?text=' + encodeURIComponent('Hi! I saw your portfolio and have a project in mind.');
  wa.target = '_blank'; wa.rel = 'noopener'; wa.setAttribute('aria-label', 'Chat on WhatsApp');
  wa.innerHTML = '<svg viewBox="0 0 32 32" width="26" height="26" fill="#fff"><path d="M16 3a13 13 0 0 0-11 19.8L3 29l6.4-2A13 13 0 1 0 16 3zm0 23.7a10.6 10.6 0 0 1-5.4-1.5l-.4-.2-3.8 1 1-3.7-.3-.4A10.6 10.6 0 1 1 16 26.700zm5.800-7.900c-.3-.2-1.900-.9-2.200-1-.3-.1-.5-.2-.7.2l-1 1.200c-.2.200-.4.200-.7.100a8.700 8.700 0 0 1-4.300-3.800c-.3-.6.300-.5.900-1.700.1-.2 0-.4 0-.5l-1-2.300c-.2-.6-.5-.5-.7-.5h-.6a1.200 1.200 0 0 0-.9.400 3.700 3.700 0 0 0-1.100 2.700c0 1.600 1.100 3.200 1.300 3.400.2.200 2.300 3.500 5.600 4.900 2 .800 2.800.9 3.800.7.600-.1 1.900-.8 2.200-1.600.3-.8.3-1.400.2-1.600-.1-.1-.3-.2-.7-.4z"/></svg>';
  document.body.append(wa);

  /* ---------- rule-based assistant widget ---------- */
  const chat = document.createElement('div');
  chat.className = 'chat';
  chat.innerHTML = `
    <button class="chat__fab" id="chatFab" aria-label="Open assistant">💬</button>
    <div class="chat__box" id="chatBox" hidden>
      <div class="chat__head"><b>Assistant</b><small>Instant answers · replies are automatic</small><button id="chatX" aria-label="Close">✕</button></div>
      <div class="chat__log" id="chatLog"></div>
      <div class="chat__quick" id="chatQuick"></div>
      <form class="chat__form" id="chatForm"><input id="chatIn" placeholder="Ask about price, time, services…" autocomplete="off"><button aria-label="Send">➤</button></form>
    </div>`;
  document.body.append(chat);
  const log = $('#chatLog'), box = $('#chatBox');
  const KB = [
    [/price|cost|how much|budget|quote|pricing/, 'Projects start at $990 (Starter), most business projects are $2,900+, and bigger platforms are custom. Try the <a href="calculator.html">cost estimator</a> for an instant range.'],
    [/time|long|deliver|deadline|week|fast/, 'Landing pages take ~2 weeks, stores and web apps 4–8 weeks, larger platforms 10–16 weeks. You get a milestone plan up front.'],
    [/ai|chatbot|automat|gpt/, 'Yes — I build AI assistants trained on your own docs, plus workflow automation. See the <a href="product.html?id=assistant">AI Support Assistant</a>.'],
    [/shop|store|ecom|sell/, 'I build fast online stores with one-page checkout and inventory tools. See the <a href="product.html?id=store">Store product</a> and its <a href="case-study.html?id=lumina">case study</a>.'],
    [/support|maint|after/, 'Every plan includes free support after launch, and monthly maintenance plans are available.'],
    [/own|code|source/, 'You own 100% of the code, designs and assets once the project is paid.'],
    [/book|call|meet|consult|talk|contact/, 'Great — <a href="book.html">book a free consultation here</a> or message on WhatsApp using the green button.'],
    [/hi|hello|hey/, 'Hi! 👋 I can answer questions about pricing, timelines and services. What would you like to know?']
  ];
  const say = (t, who) => { const m = document.createElement('div'); m.className = 'msg ' + who; m.innerHTML = t; log.append(m); log.scrollTop = log.scrollHeight; };
  const reply = q => { const hit = KB.find(([r]) => r.test(q.toLowerCase())); setTimeout(() => say(hit ? hit[1] : 'I’m not sure about that one — <a href="book.html">book a free call</a> and I’ll answer personally.', 'bot'), 450); };
  const quick = ['Pricing', 'Timeline', 'AI automation', 'Book a call'];
  $('#chatQuick').innerHTML = quick.map(q => `<button type="button">${q}</button>`).join('');
  $$('#chatQuick button').forEach(b => b.onclick = () => { say(esc(b.textContent), 'me'); reply(b.textContent); });
  $('#chatFab').onclick = () => { box.hidden = !box.hidden; if (!log.children.length) say('Hi! 👋 Ask me about pricing, timelines or services.', 'bot'); };
  $('#chatX').onclick = () => box.hidden = true;
  $('#chatForm').onsubmit = e => { e.preventDefault(); const v = $('#chatIn').value.trim(); if (!v) return; say(esc(v), 'me'); $('#chatIn').value = ''; reply(v); };

  /* ---------- intro loader (once per session) ---------- */
  if (!sessionStorage.getItem('intro') && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sessionStorage.setItem('intro', 1);
    const l = document.createElement('div'); l.className = 'loader';
    l.innerHTML = '<div class="loader__mark">YN</div><div class="loader__bar"><i></i></div>';
    document.body.append(l);
    setTimeout(() => { l.classList.add('out'); setTimeout(() => l.remove(), 600); }, 900);
  }
  document.body.classList.add('ready');
})();
