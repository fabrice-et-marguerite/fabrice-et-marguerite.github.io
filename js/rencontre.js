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
  var pasF = fabrice.querySelectorAll('[data-pas]');
  var pasM = marguerite.querySelectorAll('[data-pas]');
  var imageF = 0;
  var imageM = 0;
  section.classList.add('rencontre--active');

  // Autour des mariés : halo, couronne de cœurs flottants et pétales de jasmin (positions dans style.css).
  var COEUR = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5'
    + 'c2.1 0 3.6 1.2 4.3 2.6.7-1.4 2.2-2.6 4.3-2.6 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"/></svg>';
  var creer = function (classe, parent, html) {
    var el = document.createElement('span');
    el.className = classe;
    el.setAttribute('aria-hidden', 'true');
    if (html) el.innerHTML = html;
    parent.appendChild(el);
    return el;
  };
  var halo = creer('rencontre__halo', scene);
  var autour = creer('rencontre__autour', scene);
  var flottants = [];
  for (var c = 0; c < 11; c++) {
    // L'enveloppe apparaît au défilement ; le cœur intérieur se balance en continu (animation CSS).
    flottants.push(creer('rencontre__flottant', autour, '<span class="rencontre__flottant-coeur">' + COEUR + '</span>'));
  }
  var pluie = creer('rencontre__pluie', scene);
  for (var q = 0; q < 12; q++) creer('rencontre__petale', pluie);

  // Mesures prises sur les images (scripts/preparer-rencontre.py), en fraction de la hauteur H de la pose à deux :
  // tête de Fabrice et de Marguerite dans la pose « ensemble », par rapport au centre de l'image.
  var TETE_F_ENSEMBLE = -0.117;
  var TETE_M_ENSEMBLE = 0.0825;
  // En marche, Fabrice a une grande enjambée : on les arrête un peu écartés, le fondu fait le dernier rapprochement.
  var ECART_F = -0.13;
  var ECART_M = 0.05;
  var HAUTEUR_M = 0.927; // Marguerite mesure 92,7 % de la hauteur de Fabrice
  var TETE_F_IMAGE = 0.531; // position de la tête dans les images de marche (fraction de leur largeur)
  var FOULEE = 0.9; // longueur d'une foulée complète (un cycle d'images), en hauteurs de personnage
  var TETE_M_IMAGE = 0.422; // Marguerite marche vers la gauche : sa tête est à gauche du buste

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
    // Pendant le fondu, ils glissent jusqu'à leur place exacte dans la pose « ensemble ».
    var rapproche = 1 - lisse(0.52, 0.63, p);
    var lF = fabrice.offsetWidth;
    var lM = marguerite.offsetWidth;
    var departF = -(1 - TETE_F_IMAGE) * lF - 4;
    var departM = largeur + TETE_M_IMAGE * lM + 4;
    var teteF = entre(departF, cx + (TETE_F_ENSEMBLE + ECART_F * rapproche) * H, marche);
    var teteM = entre(departM, cx + (TETE_M_ENSEMBLE + ECART_M * rapproche) * H, marche);
    // Huit foulées sur tout le trajet : la phase suit la distance parcourue, donc les pas « collent » au sol.
    var pas = Math.sin(marche * 12 * Math.PI);
    var force = Math.min(1, 4 * (1 - marche)) * Math.min(1, avance * 8);
    var rebond = Math.abs(pas) * 0.006 * H * force;
    var bascule = pas * 0.35 * force;
    // Images de marche : un cycle complet par foulée parcourue à l'écran, si bien que les pieds ne glissent pas,
    // sur téléphone comme sur grand écran, à l'aller comme au retour.
    var nF = Math.floor(Math.abs(teteF - departF) / (FOULEE * H) * pasF.length) % pasF.length;
    var nM = Math.floor(Math.abs(teteM - departM) / (FOULEE * 0.927 * H) * pasM.length) % pasM.length;
    if (nF !== imageF) { pasF[imageF].style.opacity = 0; pasF[nF].style.opacity = 1; imageF = nF; }
    if (nM !== imageM) { pasM[imageM].style.opacity = 0; pasM[nM].style.opacity = 1; imageM = nM; }
    fabrice.style.transform = 'translate(' + (teteF - TETE_F_IMAGE * lF) + 'px,' + (-rebond) + 'px) rotate(' + bascule + 'deg)';
    marguerite.style.transform = 'translate(' + (teteM - TETE_M_IMAGE * lM) + 'px,' + (-rebond * 0.8) + 'px) rotate(' + (-bascule * 0.7) + 'deg)';

    // 2. Les deux silhouettes se fondent dans la pose « ensemble » (55 → 66 %), puis dans le cœur (78 → 90 %).
    var seuls = 1 - lisse(0.56, 0.64, p);
    var aDeux = lisse(0.56, 0.64, p) * (1 - lisse(0.78, 0.9, p));
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
    // 5. Autour des mariés : le halo et les cœurs flottants arrivent un à un quand ils se rejoignent ;
    //    les pétales tombent pendant toute la scène, plus denses au cœur final. Tout continue de bouger tout
    //    seul (animations CSS) tant que la section est à l'écran, même si l'on arrête de défiler.
    var reunis = lisse(0.55, 0.7, p);
    halo.style.opacity = reunis * (0.75 + 0.25 * enCoeur);
    halo.style.transform = 'translateX(-50%) scale(' + entre(0.7, 1.08, reunis) + ')';
    for (var f = 0; f < flottants.length; f++) {
      var arrivee = lisse(0.56 + f * 0.012, 0.64 + f * 0.012, p);
      flottants[f].style.opacity = arrivee;
      flottants[f].style.transform = 'scale(' + entre(0.3, 1, arrivee) + ')';
    }
    pluie.style.opacity = entre(0.55, 1, lisse(0.78, 0.9, p));
    var visible = r.bottom > 0 && r.top < window.innerHeight;
    section.classList.toggle('rencontre--reunis', visible && reunis > 0);
    section.classList.toggle('rencontre--pluie', visible);

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
  [pasF[0], pasM[0], ensemble, coeur].forEach(function (im) {
    if (!im.complete) im.addEventListener('load', demander);
  });
  demander();
})();
