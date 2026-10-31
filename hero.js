(function () {
  const vis = document.querySelector('.pv');
  if (!vis) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !matchMedia('(hover:hover)').matches) return;

  // gentle 3D parallax: each product layer moves at its own depth
  const layers = [...vis.querySelectorAll('.layer')];
  addEventListener('pointermove', e => {
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
    vis.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 7}deg)`;
    layers.forEach(l => {
      const d = +l.dataset.depth || 0;
      l.style.translate = `${-x * d}px ${-y * d}px`;
    });
  });
})();
