/* Enblissed: kilka żywych elementów strony głównej. Bez bibliotek i bez połączeń na zewnątrz.
   1) sekcje wjeżdżają przy przewijaniu, 2) paski wykresu rosną, gdy są widoczne,
   3) zakładki wykresu (remonty / tłumaczenia), 4) pływający przycisk WhatsApp po zjechaniu z hero. */
(function () {
  var d = document, root = d.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');

  var io = ('IntersectionObserver' in window) && !reduce ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }) : null;

  d.querySelectorAll('.reveal, .bars').forEach(function (el) {
    if (io) io.observe(el); else el.classList.add('in');
  });

  /* zakładki wykresu */
  d.querySelectorAll('[data-tabs]').forEach(function (box) {
    var tabs = box.querySelectorAll('[role="tab"]');
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        tabs.forEach(function (x) {
          var on = x === t;
          x.setAttribute('aria-selected', on ? 'true' : 'false');
          var p = d.getElementById(x.getAttribute('aria-controls'));
          if (p) {
            p.hidden = !on;
            if (on) { p.classList.remove('in'); void p.offsetWidth; p.classList.add('in'); }
          }
        });
      });
    });
  });

  /* pływający WhatsApp */
  var fab = d.querySelector('.fab'), hero = d.querySelector('.hero');
  if (fab && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      fab.classList.toggle('show', !es[0].isIntersecting);
    }, { threshold: 0 }).observe(hero);
  }
})();
