// Informations du mariage, centralisées. Le compte à rebours, les liens d'itinéraire, le calendrier et le formulaire
// s'appuient sur ce fichier. Les textes affichés dans index.html doivent rester cohérents avec ces valeurs.
window.MARIAGE = {
  couple: {
    lui: 'Fabrice', luiNom: 'Boliva',
    elle: 'Marguerite', elleAlias: 'Indira', elleNom: 'Raymond',
    monogramme: 'F & M'
  },
  familles: 'Les familles Boliva, Raymond et Rouvier',
  date: {
    iso: '2026-11-06T14:00:00+01:00',       // début de la journée : cérémonie civile, heure de Paris
    finIso: '2026-11-06T23:59:00+01:00',
    affichage: 'Vendredi 6 novembre 2026',
    court: '6 novembre 2026'
  },
  site: {
    url: 'https://fabrice-et-marguerite.github.io/',
    titre: 'Fabrice & Marguerite — 6 novembre 2026'
  },
  histoire: 'Deux chemins, une belle rencontre, et une aventure qui continue... Nous sommes heureux de vous inviter à célébrer notre mariage.',
  evenements: [
    { heure: '14h', titre: 'Cérémonie civile', lieu: 'Mairie de Pantin', adresse: '45 avenue du Général-Leclerc, 93500 Pantin', note: '' },
    { heure: '16h30', titre: 'Cérémonie religieuse', lieu: 'Église Notre-Dame-de-Pontmain', adresse: '60 avenue de la République, 93170 Bagnolet', note: 'Célébrée par le Père Cyril Sandou et le Père Arsène.' },
    { heure: '19h', titre: 'Réception', lieu: 'Espace Noisy-le-Sec', adresse: '14 rue de la Pointe, 93130 Noisy-le-Sec', note: '' }
  ],
  rsvp: {
    intro: 'Merci de nous faire part de votre présence pour cette journée si spéciale.',
    maxPersonnes: 6,
    // Les réponses partent vers le serveur Hostinger (GitHub Pages ne fait pas tourner PHP).
    api: 'https://darkorchid-swan-138363.hostingersite.com/mariage/rsvp.php'
  },
  conclusion: 'Avec les meilleurs compliments de la famille.'
};
