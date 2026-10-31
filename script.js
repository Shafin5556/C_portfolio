const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

// sticky nav + mobile menu
const nav = $('#nav'), burger = $('#burger'), links = $('#navLinks');
const onScroll = () => nav.classList.toggle('scrolled', scrollY > 10);
onScroll();
addEventListener('scroll', onScroll, { passive: true });
burger.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
  nav.classList.toggle('open', open);
});
$$('a', links).forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open'); nav.classList.remove('open');
  burger.setAttribute('aria-expanded', false);
}));

// project filter tabs
const tabs = $$('.tab'), cards = $$('.card');
tabs.forEach(t => t.addEventListener('click', () => {
  tabs.forEach(x => x.classList.toggle('is-active', x === t));
  const f = t.dataset.filter;
  cards.forEach(c => {
    const show = f === 'all' || c.dataset.cat === f;
    c.classList.toggle('hide', !show);
    c.classList.remove('pop');
    if (show) { void c.offsetWidth; c.classList.add('pop'); }
  });
}));

// logo marquee: duplicate for seamless loop
const track = $('#marquee');
track.innerHTML += track.innerHTML;

// count-up numbers
const count = el => {
  const end = parseFloat(el.dataset.count), dec = +el.dataset.dec || 0, suf = el.dataset.suffix || '';
  const t0 = performance.now(), dur = 1400;
  const step = t => {
    const p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
    el.textContent = (end * e).toFixed(dec) + suf;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

// scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  $$('[data-count]', e.target).forEach(count);
  io.unobserve(e.target);
}), { threshold: .15 });
$$('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 3) * 90 + 'ms';
  io.observe(el);
});

// contact form -> emails the lead via sendLead (common.js)
$('#form').addEventListener('submit', async e => {
  e.preventDefault();
  const f = e.target, note = $('#formNote');
  const ok = f.name.value.trim() && /\S+@\S+\.\S+/.test(f.email.value) && f.msg.value.trim();
  if (!ok) { note.textContent = 'Please fill in every field with a valid email.'; return; }
  note.textContent = 'Sending…';
  const sent = await window.sendLead({ name: f.name.value, email: f.email.value, project: f.msg.value });
  note.textContent = sent ? "Thanks! I'll reply within 48 hours." : 'Opening your email app so you can send it…';
  if (sent) f.reset();
});

$('#yr').textContent = new Date().getFullYear();
