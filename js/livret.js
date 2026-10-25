// Livret de messe en ligne : choix de l'écriture (tamoul, tanglish, les deux) et de la taille du texte.
// L'écriture vient du QR code imprimé (?e=ta ou ?e=tl), sinon du dernier choix sur ce téléphone.
(function () {
  var racine = document.documentElement;
  var ECRITURES = ['ta', 'tl', 'les-deux'];
  var TAILLES = [-1, 0, 1, 2, 3];

  function lire(cle) {
    try { return localStorage.getItem(cle); } catch (e) { return null; }
  }
  function garder(cle, valeur) {
    try { localStorage.setItem(cle, valeur); } catch (e) { /* navigation privée : tant pis */ }
  }

  function ecriture(valeur, memoriser) {
    if (ECRITURES.indexOf(valeur) < 0) return;
    racine.setAttribute('data-ecriture', valeur);
    document.querySelectorAll('.choix button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-ecriture') === valeur));
    });
    if (memoriser) garder('livret-ecriture', valeur);
  }

  function taille(valeur) {
    valeur = Math.max(TAILLES[0], Math.min(TAILLES[TAILLES.length - 1], valeur));
    if (valeur === 0) racine.removeAttribute('data-taille');
    else racine.setAttribute('data-taille', String(valeur));
    garder('livret-taille', String(valeur));
  }

  var demandee = new URLSearchParams(location.search).get('e');
  ecriture(demandee || lire('livret-ecriture') || 'ta', false);
  taille(parseInt(lire('livret-taille') || '0', 10) || 0);

  document.querySelectorAll('.choix button').forEach(function (b) {
    b.addEventListener('click', function () { ecriture(b.getAttribute('data-ecriture'), true); });
  });
  document.querySelectorAll('.taille button').forEach(function (b) {
    b.addEventListener('click', function () {
      var actuelle = parseInt(racine.getAttribute('data-taille') || '0', 10);
      taille(actuelle + parseInt(b.getAttribute('data-taille'), 10));
    });
  });
})();
