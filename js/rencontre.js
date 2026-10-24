// Section « Notre rencontre » : Fabrice arrive par la gauche, Marguerite par la droite, ils se rejoignent sur la pose
// « ensemble » puis forment un cœur avec leurs mains, au rythme du défilement (aucune bibliothèque).
// Sans JavaScript ou avec « réduire les animations », la section reste courte et montre directement la pose du cœur.
(function () {
  'use strict';
  var section = document.querySelector('[data-rencontre]');
  if (!section) return;
  var reduit = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduit && reduit.matches) return;

  var scene = section.querySelector('.rencontre__scene');
  var fabrice = section.querySelector('[data-fabrice]');
  var marguerite = section.querySelector('[data-marguerite]');
  var ensemble = section.querySelector('[data-ensemble]');
  var coeur = section.querySelector('[data-coeur]');
  var phrases = section.querySelectorAll('[data-phrase]');
  var invite = section.querySelector('[data-invite]');
  var coeurs = section.querySelectorAll('[data-petit-coeur]');
  var jambeG = section.querySelector('[data-jambe-g]');
  var jambeD = section.querySelector('[data-jambe-d]');
  var sari = section.querySelector('[data-sari]');
  section.classList.add('rencontre--active');

  // Mesures prises sur les images (scripts/preparer-rencontre.py), en fraction de la hauteur H de la pose à deux :
  // tête de Fabrice et de Marguerite dans la pose « ensemble », par rapport au centre de l'image.
  var TETE_F_ENSEMBLE = -0.117;
  var TETE_M_ENSEMBLE = 0.0825;
  var HAUTEUR_M = 0.927; // Marguerite mesure 92,7 % de la hauteur de Fabrice
  var TETE_F_IMAGE = 0.688; // position de la tête dans l'image de Fabrice seul (fraction de sa largeur)
  var TETE_M_IMAGE = 0.703;

  var borne = function (x) { return Math.max(0, Math.min(1, x)); };
  var lisse = function (a, b, t) { var v = borne((t - a) / (b - a)); return v * v * (3 - 2 * v); };
  var entre = function (a, b, t) { return a + (b - a) * t; };
  var image = 0;

  function dessiner() {
    image = 0;
    var r = section.getBoundingClientRect();
    var course = Math.max(1, r.height - window.innerHeight);
    var p = borne(-r.top / course);
    var largeur = scene.clientWidth;
    var H = ensemble.offsetHeight || coeur.offsetHeight; // tailles hors transformations
    if (!H) return;
    var cx = largeur / 2;

    // 1. La marche (2 → 55 %) : chacun part juste derrière le bord de l'écran, entre aussitôt, ralentit en
    //    approchant et finit à sa place dans la pose « ensemble ».
    var avance = borne((p - 0.02) / 0.53);
    var marche = 1 - (1 - avance) * (1 - avance);
    var lF = fabrice.offsetWidth;
    var lM = marguerite.offsetWidth;
    var teteF = entre(-(1 - TETE_F_IMAGE) * lF - 4, cx + TETE_F_ENSEMBLE * H, marche);
    var teteM = entre(largeur + TETE_M_IMAGE * lM + 4, cx + TETE_M_ENSEMBLE * H, marche);
    // Huit foulées sur tout le trajet : la phase suit la distance parcourue, donc les pas « collent » au sol.
    var pas = Math.sin(marche * 16 * Math.PI);
    var force = Math.min(1, 4 * (1 - marche)) * Math.min(1, avance * 8);
    var rebond = Math.abs(pas) * 0.01 * H * force;
    var bascule = pas * 0.8 * force;
    // Fabrice va vers la droite : la jambe avant pivote vers la droite (angle négatif), l'autre recule.
    jambeG.style.transform = 'rotate(' + (-pas * 11 * force) + 'deg)';
    jambeD.style.transform = 'rotate(' + (pas * 11 * force) + 'deg)';
    // Marguerite va vers la gauche : le bas du sari se balance d'un côté à l'autre à chaque pas.
    sari.style.transform = 'skewX(' + (pas * 4 * force) + 'deg)';
    fabrice.style.transform = 'translate(' + (teteF - TETE_F_IMAGE * lF) + 'px,' + (-rebond) + 'px) rotate(' + bascule + 'deg)';
    marguerite.style.transform = 'translate(' + (teteM - TETE_M_IMAGE * lM) + 'px,' + (-rebond * 0.8) + 'px) rotate(' + (-bascule * 0.7) + 'deg)';

    // 2. Les deux silhouettes se fondent dans la pose « ensemble » (55 → 66 %), puis dans le cœur (78 → 90 %).
    var seuls = 1 - lisse(0.55, 0.66, p);
    var aDeux = lisse(0.55, 0.66, p) * (1 - lisse(0.78, 0.9, p));
    var enCoeur = lisse(0.78, 0.9, p);
    fabrice.style.opacity = seuls;
    marguerite.style.opacity = seuls;
    ensemble.style.opacity = aDeux;
    coeur.style.opacity = enCoeur;
    coeur.style.transform = 'translateX(-50%) scale(' + entre(0.97, 1, lisse(0.78, 1, p)) + ')';

    // 3. Les trois phrases, et l'invitation à défiler au tout début.
    var vis = [1 - lisse(0.42, 0.5, p), lisse(0.5, 0.58, p) * (1 - lisse(0.76, 0.84, p)), lisse(0.84, 0.92, p)];
    for (var i = 0; i < phrases.length; i++) {
      phrases[i].style.opacity = vis[i];
      phrases[i].style.transform = 'translateY(' + (1 - vis[i]) * 12 + 'px)';
    }
    invite.style.opacity = 1 - lisse(0.02, 0.1, p);

    // 4. Petits cœurs dorés qui s'envolent pendant la pose du cœur.
    for (var k = 0; k < coeurs.length; k++) {
      var depart = 0.84 + k * 0.025;
      var t = lisse(depart, depart + 0.14, p);
      coeurs[k].style.opacity = Math.sin(Math.PI * t) * enCoeur;
      coeurs[k].style.transform = 'translate(-50%, ' + (-t * 0.35 * H) + 'px) scale(' + entre(0.6, 1.1, t) + ')';
    }
  }

  function demander() { if (!image) image = requestAnimationFrame(dessiner); }
  window.addEventListener('scroll', demander, { passive: true });
  window.addEventListener('resize', demander, { passive: true });
  [jambeG, sari, ensemble, coeur].forEach(function (im) {
    if (!im.complete) im.addEventListener('load', demander);
  });
  demander();
})();
