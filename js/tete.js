// Chargé en tête de page : active les animations d'entrée seulement si elles peuvent être jouées.
// Si le script principal ne confirme pas dans les 2,5 s (réseau lent, erreur), tout le contenu redevient visible.
(function () {
  var reduit = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduit) return;
  document.documentElement.classList.add('anim');
  setTimeout(function () {
    if (!window.__animationsPretes) document.documentElement.classList.remove('anim');
  }, 2500);
})();
