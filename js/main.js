// Fabrice & Marguerite — comportement du site : navigation, animations (GSAP + ScrollTrigger), compte à rebours, RSVP.
(function () {
  'use strict';
  var C = window.MARIAGE || {};
  var html = document.documentElement;
  var reduit = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var gsapOk = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  var anime = gsapOk && !reduit && html.classList.contains('anim');
  var $ = function (sel, racine) { return (racine || document).querySelector(sel); };
  var $$ = function (sel, racine) { return Array.prototype.slice.call((racine || document).querySelectorAll(sel)); };

  if (gsapOk) window.gsap.registerPlugin(window.ScrollTrigger);
  if (!anime) html.classList.remove('anim');
  window.__animationsPretes = true;

  /* ------------------------------------------------------------------ Navigation */
  var nav = $('[data-nav]');
  function majNav() { nav.classList.toggle('nav--fond', window.scrollY > 60); }
  window.addEventListener('scroll', majNav, { passive: true });
  majNav();

  var liens = $$('.nav__liens a');
  var sections = liens.map(function (a) { return $(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (!e.isIntersecting) return;
        liens.forEach(function (a) { a.classList.toggle('actif', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { obs.observe(s); });
  }

  var burger = $('.nav__burger');
  var menu = $('#menu-mobile');
  var fermerMenu = $('.menu__fermer', menu);
  function menuOuvert(ouvert) {
    menu.hidden = !ouvert;
    burger.setAttribute('aria-expanded', String(ouvert));
    burger.setAttribute('aria-label', ouvert ? 'Fermer le menu' : 'Ouvrir le menu');
    document.body.classList.toggle('menu-ouvert', ouvert);
    (ouvert ? fermerMenu : burger).focus();
  }
  burger.addEventListener('click', function () { menuOuvert(menu.hidden); });
  fermerMenu.addEventListener('click', function () { menuOuvert(false); });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { menuOuvert(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) menuOuvert(false); });

  var haut = $('[data-haut]');
  if (haut) haut.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduit ? 'auto' : 'smooth' }); });

  /* ------------------------------------------------------------------ Compte à rebours (6 novembre 2026, 14 h, Paris) */
  var cible = new Date((C.date && C.date.iso) || '2026-11-06T14:00:00+01:00').getTime();
  var grille = $('[data-compte]');
  var sous = $('[data-compte-sous]');
  var fete = $('[data-compte-fete]');
  var feteSous = $('[data-compte-fete-sous]');
  var cj = $('[data-compte-j]'), ch = $('[data-compte-h]'), cm = $('[data-compte-m]'), cs = $('[data-compte-s]');
  var pad = function (n) { return String(Math.max(0, n)).padStart(2, '0'); };
  var minuterie = null;
  function tic() {
    var diff = cible - Date.now();
    if (diff <= 0) {
      grille.hidden = true; sous.hidden = true; fete.hidden = false; feteSous.hidden = false;
      if (minuterie) clearInterval(minuterie);
      return;
    }
    cj.textContent = pad(Math.floor(diff / 864e5));
    ch.textContent = pad(Math.floor(diff / 36e5) % 24);
    cm.textContent = pad(Math.floor(diff / 6e4) % 60);
    cs.textContent = pad(Math.floor(diff / 1e3) % 60);
  }
  tic();
  minuterie = setInterval(tic, 1000);

  /* ------------------------------------------------------------------ Animations */
  if (anime) {
    var gsap = window.gsap;
    var ST = window.ScrollTrigger;
    var ordinateur = window.matchMedia('(min-width: 900px)').matches;

    // Entrée de l'accueil : photo, puis titre, prénoms, date, bouton.
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to('.hero__image', { opacity: 1, duration: 1.4, ease: 'power2.out' }, 0)
      .fromTo('.hero__image img', { scale: ordinateur ? 1.1 : 1.08 }, { scale: ordinateur ? 1.04 : 1, duration: 2.2, ease: 'power2.out' }, 0)
      .to('.hero__sur', { opacity: 1, y: 0, duration: .9 }, .5)
      .to('.hero__nom, .hero__et', { opacity: 1, y: 0, duration: 1, stagger: .22 }, .8)
      .to('.hero__alias', { opacity: 1, y: 0, duration: .8 }, 1.6)
      .to('.hero__trait', { scaleX: 1, duration: .9 }, 1.9)
      .to('.hero__date', { opacity: 1, y: 0, duration: .8 }, 2.1)
      .to('.hero__bouton', { opacity: 1, y: 0, duration: .8 }, 2.4)
      .to('.nav, .hero__mots, .hero__chevron', { opacity: 1, duration: 1 }, 2.6);

    // Profondeur très légère sur la photo d'accueil (ordinateur seulement : sur mobile l'image est dans le flux).
    if (ordinateur) {
      gsap.to('.hero__image img', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    }

    // Révélations au défilement
    $$('.reveal').forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    $$('.reveal-img').forEach(function (el) {
      gsap.fromTo(el, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'power4.inOut', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    });
    $$('.trait--anim').forEach(function (el) {
      gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });

    // Déplacement doux des photos au défilement
    $$('[data-parallax]').forEach(function (el) {
      var d = parseFloat(el.getAttribute('data-parallax')) || 20;
      var bloc = el.closest('figure, section') || el;
      gsap.fromTo(el, { y: -d }, { y: d, ease: 'none', scrollTrigger: { trigger: bloc, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    // Recalcul après chargement des images et des polices
    window.addEventListener('load', function () { ST.refresh(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ST.refresh(); });
  }

  /* ------------------------------------------------------------------ RSVP */
  var form = $('[data-rsvp]');
  if (!form) return;
  var api = (C.rsvp && C.rsvp.api) || 'rsvp.php';
  var maxPersonnes = (C.rsvp && C.rsvp.maxPersonnes) || 6;
  var demo = $('[data-demo]');
  var erreur = $('[data-erreur]');
  var bouton = $('[data-envoyer]');
  var merci = $('[data-merci]');
  var merciTitre = $('[data-merci-titre]');
  var merciTexte = $('[data-merci-texte]');
  var blocPresent = $('[data-si-present]');
  var modeServeur = false;
  var libelleBouton = bouton.textContent;

  form.elements.t.value = String(Date.now());

  function majPresence() {
    var oui = form.elements.presence.value === 'oui';
    blocPresent.hidden = !oui;
  }
  $$('input[name="presence"]', form).forEach(function (r) { r.addEventListener('change', majPresence); });
  majPresence();

  // Le serveur enregistre-t-il vraiment ? Sinon, on l'affiche clairement (jamais de fausse confirmation).
  fetch(api + '?etat=1', { headers: { Accept: 'application/json' }, cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (j) { modeServeur = !!(j && j.ok && j.mode === 'serveur'); demo.hidden = modeServeur; })
    .catch(function () { modeServeur = false; demo.hidden = false; });

  function montrerErreur(texte) {
    erreur.textContent = texte;
    erreur.hidden = false;
    erreur.scrollIntoView({ block: 'nearest', behavior: reduit ? 'auto' : 'smooth' });
  }
  function chargement(actif) {
    bouton.disabled = actif;
    bouton.textContent = actif ? 'Envoi en cours…' : libelleBouton;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    erreur.hidden = true;
    var nom = form.elements.nom.value.trim();
    var presence = form.elements.presence.value;
    var personnes = parseInt(form.elements.personnes.value, 10) || 1;
    if (nom.length < 2) { montrerErreur('Merci d’indiquer votre nom et prénom.'); form.elements.nom.focus(); return; }
    if (presence !== 'oui' && presence !== 'non') { montrerErreur('Merci d’indiquer si vous serez présent.'); return; }
    if (presence === 'oui' && (personnes < 1 || personnes > maxPersonnes)) { montrerErreur('Le nombre de personnes doit être compris entre 1 et ' + maxPersonnes + '.'); return; }
    if (!modeServeur) {
      montrerErreur('Mode démonstration : votre réponse ne peut pas être enregistrée ici. Merci de répondre directement aux mariés.');
      return;
    }
    var donnees = {
      nom: nom, presence: presence, personnes: presence === 'oui' ? personnes : 0,
      regime: presence === 'oui' ? form.elements.regime.value.trim() : '',
      message: form.elements.message.value.trim(),
      contact: form.elements.contact.value.trim(),
      site_web: form.elements.site_web.value, t: parseInt(form.elements.t.value, 10) || 0
    };
    chargement(true);
    fetch(api, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(donnees) })
      .then(function (r) { return r.json().then(function (j) { return { statut: r.status, corps: j }; }); })
      .then(function (res) {
        chargement(false);
        var j = res.corps || {};
        if (res.statut === 429) { montrerErreur(j.erreur || 'Trop de réponses envoyées depuis cet appareil. Réessayez dans une heure.'); return; }
        if (!j.ok) { montrerErreur(j.erreur || 'Enregistrement impossible pour le moment. Réessayez dans quelques minutes.'); return; }
        var court = (C.date && C.date.court) || '6 novembre 2026';
        if (presence === 'oui') {
          merciTitre.textContent = 'Nous avons hâte de vous retrouver';
          merciTexte.textContent = nom + ', votre présence' + (personnes > 1 ? ' (' + personnes + ' personnes)' : '') + ' est bien notée pour le ' + court + '.';
        } else {
          merciTitre.textContent = 'Vous nous manquerez';
          merciTexte.textContent = nom + ', merci de nous avoir prévenus. Nous penserons à vous ce jour-là.';
        }
        form.hidden = true;
        merci.hidden = false;
        merci.scrollIntoView({ block: 'center', behavior: reduit ? 'auto' : 'smooth' });
      })
      .catch(function () {
        chargement(false);
        montrerErreur('Connexion impossible. Vérifiez votre réseau puis réessayez.');
      });
  });

  $('[data-merci-fermer]').addEventListener('click', function () {
    merci.hidden = true;
    form.hidden = false;
    form.elements.t.value = String(Date.now());
    form.elements.nom.focus();
  });
})();
