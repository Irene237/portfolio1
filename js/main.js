(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };

  // Menu mobile
  var burger = $('.burger'), menu = $('#menu');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  }
  burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });

  // Apparition au défilement (désactivée si IntersectionObserver absent)
  var targets = document.querySelectorAll('.sec > h2, .skills article, .proj, .mini article, .tl li, .contact > *, .about > *');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    targets.forEach(function (t) { t.classList.add('rv'); io.observe(t); });
  }

  // Aperçu agrandi des captures
  var lb = $('#lb'), lbImg = $('img', lb);
  function closeLb() { lb.hidden = true; document.body.style.overflow = ''; }
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t.matches && t.matches('img[data-zoom]')) {
      lbImg.src = t.currentSrc || t.src; lbImg.alt = t.alt;
      lb.hidden = false; document.body.style.overflow = 'hidden';
    } else if (!lb.hidden && (t === lb || t.tagName === 'BUTTON')) { closeLb(); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeLb(); setMenu(false); }
  });

  // Formulaire : ouvre le client e-mail avec le message pré-rempli
  var form = $('#cf'), out = $('#fmsg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form), nom = (d.get('nom') || '').trim(),
        mail = (d.get('email') || '').trim(), msg = (d.get('msg') || '').trim();
    if (!nom || !msg || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)) {
      out.textContent = 'Renseignez votre nom, un e-mail valide et votre message.';
      return;
    }
    var body = msg + '\n\n' + nom + '\n' + mail;
    window.location.href = 'mailto:irene659673239@gmail.com?subject=' +
      encodeURIComponent('Contact portfolio : ' + nom) + '&body=' + encodeURIComponent(body);
    out.textContent = 'Votre application e-mail s\'ouvre. Si rien ne se passe, écrivez à irene659673239@gmail.com.';
    form.reset();
  });

  // Barre de progression et halo lumineux sous le curseur
  var bar = document.createElement('div'); bar.className = 'prog'; document.body.appendChild(bar);
  window.addEventListener('scroll', function () {
    var m = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = 'scaleX(' + (m > 0 ? scrollY / m : 0) + ')';
  }, { passive: true });
  document.querySelectorAll('.skills article, .mini article, .shots').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
})();
