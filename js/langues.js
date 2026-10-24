// Trois langues : français (texte d'origine de la page), anglais et tamoul.
// Les textes de index.html sont traduits à la volée : chaque texte (ou alt, placeholder, aria-label) dont la version
// française figure dans le dictionnaire est remplacé ; le reste (noms, adresses, chiffres) ne bouge pas.
// main.js utilise window.T('texte français', { variables }) pour les messages qu'il affiche lui-même.
// Choix : ?lang=fr|en|ta dans l'adresse, sinon le dernier choix sur cet appareil, sinon la langue du navigateur.
(function () {
  'use strict';

  var DICO = {
    en: {
      // Navigation et en-tête
      'Aller au contenu': 'Skip to content',
      'Accueil': 'Home',
      'Notre histoire': 'Our story',
      'Le mariage': 'The wedding',
      'Infos pratiques': 'Practical info',
      'RSVP': 'RSVP',
      'Ouvrir le menu': 'Open the menu',
      'Fermer le menu': 'Close the menu',
      'Menu': 'Menu',
      'Navigation principale': 'Main navigation',
      'Accueil — Fabrice et Marguerite': 'Home — Fabrice and Marguerite',
      'Langue': 'Language',
      // Accueil
      'Le mariage de Fabrice et Marguerite': 'The wedding of Fabrice and Marguerite',
      'Le mariage de': 'The wedding of',
      'et': 'and',
      'Vendredi 6 novembre 2026': 'Friday 6 November 2026',
      'Découvrir notre invitation': 'Discover our invitation',
      'Foi': 'Faith', 'Famille': 'Family', 'Amour': 'Love', 'Toujours': 'Forever',
      "Faire défiler vers l'invitation": 'Scroll to the invitation',
      // Histoire et compte à rebours
      'Les familles Boliva, Raymond et Rouvier sont heureuses de vous faire part du mariage de leurs enfants.':
        'The Boliva, Raymond and Rouvier families are delighted to announce the marriage of their children.',
      '« Deux chemins, une belle rencontre, et une aventure qui continue... Nous sommes heureux de vous inviter à célébrer notre mariage. »':
        '“Two paths, one beautiful encounter, and an adventure that goes on… We are delighted to invite you to celebrate our wedding.”',
      'Découvrir le programme': 'See the programme',
      'Compte à rebours avant le mariage': 'Countdown to the wedding',
      'Jours': 'Days', 'Heures': 'Hours', 'Minutes': 'Minutes', 'Secondes': 'Seconds',
      'Avant notre mariage': 'Until our wedding',
      'Fabrice & Marguerite se sont dit oui !': 'Fabrice & Marguerite said yes!',
      "Merci d'avoir partagé ce jour avec nous": 'Thank you for sharing this day with us',
      // Programme
      'Le programme': 'The programme',
      '14h': '2 pm', '16h30': '4:30 pm', '19h': '7 pm',
      'Cérémonie civile': 'Civil ceremony',
      'Cérémonie religieuse': 'Church ceremony',
      'Réception': 'Reception',
      'Célébrée par le Père Cyril Sandou et le Père Arsène.': 'Celebrated by Father Cyril Sandou and Father Arsène.',
      "Voir l'itinéraire": 'Get directions',
      // Galerie
      'En images': 'In pictures',
      'Quelques instants de notre histoire, avant le grand jour.': 'A few moments of our story, before the big day.',
      // Infos pratiques
      'Date': 'Date',
      '14h · Cérémonie civile': '2 pm · Civil ceremony',
      '16h30 · Cérémonie religieuse': '4:30 pm · Church ceremony',
      '19h · Réception': '7 pm · Reception',
      'Itinéraire': 'Directions',
      'Ajouter au calendrier': 'Add to calendar',
      'Google Agenda': 'Google Calendar',
      'Télécharger le faire-part': 'Download the invitation card',
      // Réponse
      'Votre réponse': 'Your reply',
      '« Merci de nous faire part de votre présence pour cette journée si spéciale. »':
        '“Please let us know whether you will be with us on this very special day.”',
      "Mode démonstration : ce serveur n'enregistre pas les réponses. Merci de répondre directement aux mariés.":
        'Demonstration mode: this server does not record replies. Please reply directly to the couple.',
      'Nom et prénom': 'Full name',
      'Votre nom et prénom': 'Your full name',
      'Présence': 'Attendance',
      'Oui, avec joie': 'Yes, with joy',
      'Non, hélas': 'Sadly, no',
      'Nombre de personnes': 'Number of guests',
      '(selon votre invitation)': '(as stated on your invitation)',
      '1 personne': '1 guest', '2 personnes': '2 guests', '3 personnes': '3 guests',
      '4 personnes': '4 guests', '5 personnes': '5 guests', '6 personnes': '6 guests',
      'Restrictions alimentaires': 'Dietary requirements',
      '(facultatif)': '(optional)',
      'Végétarien, sans porc, allergies…': 'Vegetarian, no pork, allergies…',
      'E-mail ou téléphone': 'Email or phone',
      '(facultatif, pour que les mariés puissent vous joindre)': '(optional, so the couple can reach you)',
      'vous@exemple.fr ou 06…': 'you@example.com or phone number…',
      'Message aux mariés': 'Message to the couple',
      'Quelques mots…': 'A few words…',
      'Envoyer ma réponse': 'Send my reply',
      "Votre réponse est transmise aux mariés et sert uniquement à l'organisation du mariage ; elle sera effacée après la fête.":
        'Your reply goes to the couple only and is used solely to organise the wedding; it will be deleted after the celebration.',
      'Merci': 'Thank you',
      'Modifier ma réponse': 'Change my reply',
      // Messages du formulaire (main.js) et du serveur
      'Envoi en cours…': 'Sending…',
      'Merci d’indiquer votre nom et prénom.': 'Please enter your full name.',
      'Merci d’indiquer si vous serez présent.': 'Please tell us whether you will attend.',
      'Le nombre de personnes doit être compris entre 1 et {max}.': 'The number of guests must be between 1 and {max}.',
      'Mode démonstration : votre réponse ne peut pas être enregistrée ici. Merci de répondre directement aux mariés.':
        'Demonstration mode: your reply cannot be recorded here. Please reply directly to the couple.',
      'Trop de réponses envoyées depuis cet appareil. Réessayez dans une heure.':
        'Too many replies sent from this device. Please try again in an hour.',
      'Enregistrement impossible pour le moment. Réessayez dans quelques minutes.':
        'Your reply could not be saved right now. Please try again in a few minutes.',
      'Connexion impossible. Vérifiez votre réseau puis réessayez.': 'No connection. Check your network and try again.',
      'Merci de prendre le temps de remplir le formulaire.': 'Please take a moment to fill in the form.',
      'Origine refusée.': 'Request refused.',
      'Nous avons hâte de vous retrouver': 'We can’t wait to see you',
      '{nom}, votre présence est bien notée pour le {date}.': '{nom}, your attendance is confirmed for {date}.',
      '{nom}, votre présence ({n} personnes) est bien notée pour le {date}.': '{nom}, your attendance ({n} guests) is confirmed for {date}.',
      'Vous nous manquerez': 'We will miss you',
      '{nom}, merci de nous avoir prévenus. Nous penserons à vous ce jour-là.':
        '{nom}, thank you for letting us know. We will be thinking of you on that day.',
      // Conclusion et pied de page
      '6 novembre 2026': '6 November 2026',
      '« Avec les meilleurs compliments de la famille. »': '“With the best compliments of the family.”',
      'Les familles Boliva, Raymond et Rouvier': 'The Boliva, Raymond and Rouvier families',
      'F & M · Vendredi 6 novembre 2026': 'F & M · Friday 6 November 2026',
      'Remonter en haut de la page': 'Back to the top of the page',
      'Fabrice & Marguerite — 6 novembre 2026': 'Fabrice & Marguerite — 6 November 2026',
      // Textes des images
      'Fabrice et Marguerite se sourient, entourés de fleurs bordeaux': 'Fabrice and Marguerite smiling at each other, surrounded by burgundy flowers',
      'Fabrice et Marguerite, portrait en noir et blanc': 'Fabrice and Marguerite, black and white portrait',
      'Les mains des mariés et le collier de jasmin': 'The couple’s hands and the jasmine garland',
      'Fabrice et Marguerite, regards échangés au milieu des fleurs': 'Fabrice and Marguerite looking at each other among the flowers',
      'Fabrice et Marguerite dans un cœur de ballons rouges': 'Fabrice and Marguerite in a heart of red balloons',
      'Tirage noir et blanc du couple, posé parmi des fleurs blanches': 'Black and white print of the couple among white flowers',
      'Fabrice et Marguerite debout devant des drapés roses et bleus, des guirlandes de jasmin et leur monogramme F et M':
        'Fabrice and Marguerite standing before pink and blue drapes, jasmine garlands and their F and M monogram',
      'Fabrice, sourire tourné vers Marguerite': 'Fabrice, smiling at Marguerite',
      'Marguerite, jasmin dans les cheveux, sourire tourné vers Fabrice': 'Marguerite, jasmine in her hair, smiling at Fabrice',
      'Bougies et roses sur la table': 'Candles and roses on the table',
      'Bouquet de roses rouges et crème': 'Bouquet of red and cream roses',
      "Enveloppe ivoire fermée d'un sceau de cire": 'Ivory envelope closed with a wax seal',
      'Arche fleurie et drapés rouges': 'Flowered arch and red drapes',
      'Le faire-part officiel : les familles Boliva, Raymond et Rouvier sont heureuses de vous faire part du mariage de Fabrice et Marguerite, vendredi 6 novembre 2026':
        'The official invitation card: the Boliva, Raymond and Rouvier families are delighted to announce the marriage of Fabrice and Marguerite, Friday 6 November 2026'
    },

    ta: {
      'Aller au contenu': 'உள்ளடக்கத்திற்குச் செல்லவும்',
      'Accueil': 'முகப்பு',
      'Notre histoire': 'எங்கள் கதை',
      'Le mariage': 'திருமணம்',
      'Infos pratiques': 'தகவல்கள்',
      'RSVP': 'பதில்',
      'Ouvrir le menu': 'பட்டியலைத் திறக்க',
      'Fermer le menu': 'பட்டியலை மூட',
      'Menu': 'பட்டியல்',
      'Navigation principale': 'முதன்மை வழிசெலுத்தல்',
      'Accueil — Fabrice et Marguerite': 'முகப்பு — Fabrice, Marguerite',
      'Langue': 'மொழி',
      'Le mariage de Fabrice et Marguerite': 'Fabrice – Marguerite திருமணம்',
      'Le mariage de': 'திருமண அழைப்பு',
      'et': 'மற்றும்',
      'Vendredi 6 novembre 2026': 'வெள்ளிக்கிழமை, 6 நவம்பர் 2026',
      'Découvrir notre invitation': 'எங்கள் அழைப்பிதழைக் காண்க',
      'Foi': 'நம்பிக்கை', 'Famille': 'குடும்பம்', 'Amour': 'அன்பு', 'Toujours': 'என்றென்றும்',
      "Faire défiler vers l'invitation": 'அழைப்பிதழுக்குச் செல்லவும்',
      'Les familles Boliva, Raymond et Rouvier sont heureuses de vous faire part du mariage de leurs enfants.':
        'Boliva, Raymond, Rouvier குடும்பத்தினர் தங்கள் பிள்ளைகளின் திருமணத்தை மகிழ்ச்சியுடன் அறிவிக்கின்றனர்.',
      '« Deux chemins, une belle rencontre, et une aventure qui continue... Nous sommes heureux de vous inviter à célébrer notre mariage. »':
        '« இரண்டு பாதைகள், ஓர் அழகான சந்திப்பு, தொடரும் ஒரு பயணம்… எங்கள் திருமணத்தைக் கொண்டாட உங்களை அன்புடன் அழைக்கிறோம். »',
      'Découvrir le programme': 'நிகழ்ச்சி நிரலைக் காண்க',
      'Compte à rebours avant le mariage': 'திருமணத்திற்கான நேரக் கணக்கு',
      'Jours': 'நாட்கள்', 'Heures': 'மணி', 'Minutes': 'நிமிடம்', 'Secondes': 'விநாடி',
      'Avant notre mariage': 'எங்கள் திருமணத்திற்கு இன்னும்',
      'Fabrice & Marguerite se sont dit oui !': 'Fabrice – Marguerite திருமணம் இனிதே நடந்தது!',
      "Merci d'avoir partagé ce jour avec nous": 'இந்நாளை எங்களுடன் பகிர்ந்தமைக்கு நன்றி',
      'Le programme': 'நிகழ்ச்சி நிரல்',
      '14h': 'மதியம் 2:00', '16h30': 'மாலை 4:30', '19h': 'மாலை 7:00',
      'Cérémonie civile': 'பதிவுத் திருமணம்',
      'Cérémonie religieuse': 'ஆலயத் திருமணம்',
      'Réception': 'வரவேற்பு விருந்து',
      'Célébrée par le Père Cyril Sandou et le Père Arsène.': 'நடத்தி வைப்பவர்கள்: அருட்தந்தை Cyril Sandou, அருட்தந்தை Arsène.',
      "Voir l'itinéraire": 'வழியைக் காண்க',
      'En images': 'படங்களில்',
      'Quelques instants de notre histoire, avant le grand jour.': 'பெருநாளுக்கு முன், எங்கள் கதையின் சில தருணங்கள்.',
      'Date': 'தேதி',
      '14h · Cérémonie civile': 'மதியம் 2:00 · பதிவுத் திருமணம்',
      '16h30 · Cérémonie religieuse': 'மாலை 4:30 · ஆலயத் திருமணம்',
      '19h · Réception': 'மாலை 7:00 · வரவேற்பு விருந்து',
      'Itinéraire': 'வழி',
      'Ajouter au calendrier': 'நாட்காட்டியில் சேர்க்க',
      'Google Agenda': 'Google Calendar',
      'Télécharger le faire-part': 'அழைப்பிதழைப் பதிவிறக்க',
      'Votre réponse': 'உங்கள் பதில்',
      '« Merci de nous faire part de votre présence pour cette journée si spéciale. »':
        '« இந்தச் சிறப்பான நாளில் உங்கள் வருகையை எங்களுக்குத் தெரியப்படுத்துங்கள். »',
      "Mode démonstration : ce serveur n'enregistre pas les réponses. Merci de répondre directement aux mariés.":
        'சோதனை முறை: இந்தத் தளம் பதில்களைப் பதிவு செய்யாது. மணமக்களிடம் நேரடியாகத் தெரிவிக்கவும்.',
      'Nom et prénom': 'பெயர்',
      'Votre nom et prénom': 'உங்கள் முழுப் பெயர்',
      'Présence': 'வருகை',
      'Oui, avec joie': 'ஆம், மகிழ்ச்சியுடன்',
      'Non, hélas': 'இல்லை, வருந்துகிறோம்',
      'Nombre de personnes': 'நபர்களின் எண்ணிக்கை',
      '(selon votre invitation)': '(உங்கள் அழைப்பின்படி)',
      '1 personne': '1 நபர்', '2 personnes': '2 நபர்கள்', '3 personnes': '3 நபர்கள்',
      '4 personnes': '4 நபர்கள்', '5 personnes': '5 நபர்கள்', '6 personnes': '6 நபர்கள்',
      'Restrictions alimentaires': 'உணவுக் கட்டுப்பாடுகள்',
      '(facultatif)': '(விருப்பம் இருந்தால்)',
      'Végétarien, sans porc, allergies…': 'சைவம், பன்றி இறைச்சி இல்லாமல், ஒவ்வாமை…',
      'E-mail ou téléphone': 'மின்னஞ்சல் அல்லது தொலைபேசி',
      '(facultatif, pour que les mariés puissent vous joindre)': '(விருப்பம் இருந்தால், மணமக்கள் உங்களைத் தொடர்புகொள்ள)',
      'vous@exemple.fr ou 06…': 'you@example.com அல்லது 06…',
      'Message aux mariés': 'மணமக்களுக்கு ஒரு செய்தி',
      'Quelques mots…': 'சில வார்த்தைகள்…',
      'Envoyer ma réponse': 'பதிலை அனுப்பு',
      "Votre réponse est transmise aux mariés et sert uniquement à l'organisation du mariage ; elle sera effacée après la fête.":
        'உங்கள் பதில் மணமக்களுக்கு மட்டுமே அனுப்பப்படும்; திருமண ஏற்பாட்டிற்கு மட்டுமே பயன்படுத்தப்பட்டு, விழாவுக்குப் பின் நீக்கப்படும்.',
      'Merci': 'நன்றி',
      'Modifier ma réponse': 'பதிலை மாற்ற',
      'Envoi en cours…': 'அனுப்பப்படுகிறது…',
      'Merci d’indiquer votre nom et prénom.': 'உங்கள் பெயரை உள்ளிடவும்.',
      'Merci d’indiquer si vous serez présent.': 'நீங்கள் வருவீர்களா என்பதைத் தெரிவிக்கவும்.',
      'Le nombre de personnes doit être compris entre 1 et {max}.': 'நபர்களின் எண்ணிக்கை 1 முதல் {max} வரை இருக்க வேண்டும்.',
      'Mode démonstration : votre réponse ne peut pas être enregistrée ici. Merci de répondre directement aux mariés.':
        'சோதனை முறை: உங்கள் பதிலை இங்கே பதிவு செய்ய இயலாது. மணமக்களிடம் நேரடியாகத் தெரிவிக்கவும்.',
      'Trop de réponses envoyées depuis cet appareil. Réessayez dans une heure.':
        'இந்தச் சாதனத்திலிருந்து அதிகமான பதில்கள் அனுப்பப்பட்டுள்ளன. ஒரு மணி நேரம் கழித்து மீண்டும் முயற்சிக்கவும்.',
      'Enregistrement impossible pour le moment. Réessayez dans quelques minutes.':
        'இப்போது பதிவு செய்ய இயலவில்லை. சில நிமிடங்கள் கழித்து மீண்டும் முயற்சிக்கவும்.',
      'Connexion impossible. Vérifiez votre réseau puis réessayez.': 'இணைப்பு இல்லை. உங்கள் இணையத்தைச் சரிபார்த்து மீண்டும் முயற்சிக்கவும்.',
      'Merci de prendre le temps de remplir le formulaire.': 'படிவத்தை நிரப்ப சிறிது நேரம் எடுத்துக்கொள்ளவும்.',
      'Origine refusée.': 'கோரிக்கை மறுக்கப்பட்டது.',
      'Nous avons hâte de vous retrouver': 'உங்களைச் சந்திக்க ஆவலுடன் காத்திருக்கிறோம்',
      '{nom}, votre présence est bien notée pour le {date}.': '{nom}, {date} அன்று உங்கள் வருகை பதிவு செய்யப்பட்டது.',
      '{nom}, votre présence ({n} personnes) est bien notée pour le {date}.': '{nom}, {date} அன்று உங்கள் வருகை ({n} நபர்கள்) பதிவு செய்யப்பட்டது.',
      'Vous nous manquerez': 'உங்கள் வருகையை இழக்கிறோம்',
      '{nom}, merci de nous avoir prévenus. Nous penserons à vous ce jour-là.':
        '{nom}, தெரியப்படுத்தியதற்கு நன்றி. அந்நாளில் உங்களை நினைவுகூர்வோம்.',
      '6 novembre 2026': '6 நவம்பர் 2026',
      '« Avec les meilleurs compliments de la famille. »': '« குடும்பத்தினரின் அன்பான வாழ்த்துகளுடன். »',
      'Les familles Boliva, Raymond et Rouvier': 'Boliva, Raymond, Rouvier குடும்பத்தினர்',
      'F & M · Vendredi 6 novembre 2026': 'F & M · வெள்ளிக்கிழமை, 6 நவம்பர் 2026',
      'Remonter en haut de la page': 'பக்கத்தின் மேலே செல்ல',
      'Fabrice & Marguerite — 6 novembre 2026': 'Fabrice & Marguerite — 6 நவம்பர் 2026',
      'Fabrice et Marguerite se sourient, entourés de fleurs bordeaux': 'செந்நிற மலர்களுக்கு நடுவே புன்னகைக்கும் Fabrice, Marguerite',
      'Fabrice et Marguerite, portrait en noir et blanc': 'Fabrice, Marguerite – கருப்பு வெள்ளைப் படம்',
      'Les mains des mariés et le collier de jasmin': 'மணமக்களின் கைகளும் மல்லிகை மாலையும்',
      'Fabrice et Marguerite, regards échangés au milieu des fleurs': 'மலர்களுக்கு நடுவே ஒருவரையொருவர் பார்க்கும் Fabrice, Marguerite',
      'Fabrice et Marguerite dans un cœur de ballons rouges': 'சிவப்பு பலூன் இதயத்தில் Fabrice, Marguerite',
      'Tirage noir et blanc du couple, posé parmi des fleurs blanches': 'வெள்ளை மலர்களுக்கு நடுவே மணமக்களின் கருப்பு வெள்ளைப் படம்',
      'Fabrice et Marguerite debout devant des drapés roses et bleus, des guirlandes de jasmin et leur monogramme F et M':
        'இளஞ்சிவப்பு, நீலத் திரைகள், மல்லிகை மாலைகள், F – M முத்திரை முன் நிற்கும் Fabrice, Marguerite',
      'Fabrice, sourire tourné vers Marguerite': 'Marguerite-ஐப் பார்த்துப் புன்னகைக்கும் Fabrice',
      'Marguerite, jasmin dans les cheveux, sourire tourné vers Fabrice': 'கூந்தலில் மல்லிகையுடன் Fabrice-ஐப் பார்த்துப் புன்னகைக்கும் Marguerite',
      'Bougies et roses sur la table': 'மேசையில் மெழுகுவர்த்திகளும் ரோஜாக்களும்',
      'Bouquet de roses rouges et crème': 'சிவப்பு, வெண்ணிற ரோஜாப் பூங்கொத்து',
      "Enveloppe ivoire fermée d'un sceau de cire": 'மெழுகு முத்திரையிட்ட தந்த நிற உறை',
      'Arche fleurie et drapés rouges': 'மலர் வளைவும் சிவப்புத் திரைகளும்',
      'Le faire-part officiel : les familles Boliva, Raymond et Rouvier sont heureuses de vous faire part du mariage de Fabrice et Marguerite, vendredi 6 novembre 2026':
        'அதிகாரப்பூர்வ அழைப்பிதழ்: Boliva, Raymond, Rouvier குடும்பத்தினர் Fabrice – Marguerite திருமணத்தை மகிழ்ச்சியுடன் அறிவிக்கின்றனர், வெள்ளிக்கிழமை 6 நவம்பர் 2026'
    }
  };

  var LANGUES = ['fr', 'en', 'ta'];
  var CLE = 'langue-mariage';
  var ATTRIBUTS = ['alt', 'placeholder', 'aria-label', 'title'];
  var langue = 'fr';
  var titreFr = document.title;

  var norme = function (s) { return s.replace(/\s+/g, ' ').trim(); };
  var traduire = function (fr) { var d = DICO[langue]; return (d && d[fr]) || fr; };
  // Les guillemets français restent collés à leur texte (espace insécable) : jamais un « » » seul en bout de ligne.
  var typo = function (s) { return s.replace(/« /g, '« ').replace(/ »/g, ' »'); };

  window.T = function (fr, vars) {
    var s = traduire(fr);
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split('{' + k + '}').join(vars[k]); });
    return s;
  };

  function textes(racine) {
    var liste = [];
    var w = document.createTreeWalker(racine, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode && n.parentNode.nodeName;
        return p === 'SCRIPT' || p === 'STYLE' || !n.nodeValue.trim() ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    while (w.nextNode()) liste.push(w.currentNode);
    return liste;
  }

  function appliquer(l) {
    langue = LANGUES.indexOf(l) >= 0 ? l : 'fr';
    document.documentElement.lang = langue;
    document.title = traduire(norme(titreFr));
    textes(document.body).forEach(function (n) {
      // Le texte français d'origine est gardé sur le nœud ; un texte inconnu du dictionnaire reste tel quel.
      if (n.__fr === undefined) n.__fr = n.nodeValue;
      var bords = n.__fr.match(/^(\s*)[\s\S]*?(\s*)$/);
      var cle = norme(n.__fr);
      var d = DICO[langue];
      // En français, on remet le texte d'origine tel quel (avec ses espaces insécables).
      if (langue === 'fr') { n.nodeValue = n.__fr; return; }
      var t = d && d[cle];
      if (t !== undefined && t !== null) n.nodeValue = bords[1] + typo(t) + bords[2];
    });
    ATTRIBUTS.forEach(function (a) {
      Array.prototype.forEach.call(document.querySelectorAll('[' + a + ']'), function (el) {
        var cleA = '__fr_' + a;
        if (el[cleA] === undefined) el[cleA] = el.getAttribute(a);
        var fr = norme(el[cleA]);
        var d = DICO[langue];
        var t = langue === 'fr' ? fr : (d && d[fr]);
        if (t) el.setAttribute(a, t);
      });
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-langue]'), function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-langue') === langue));
    });
    try { localStorage.setItem(CLE, langue); } catch (e) { /* navigation privée : pas de mémoire, sans gravité */ }
    document.dispatchEvent(new CustomEvent('langue', { detail: langue }));
  }

  function initiale() {
    var p = (location.search.match(/[?&]lang=(fr|en|ta)\b/) || [])[1];
    if (p) return p;
    try { var m = localStorage.getItem(CLE); if (LANGUES.indexOf(m) >= 0) return m; } catch (e) { /* idem */ }
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'fr';
    nav = nav.slice(0, 2).toLowerCase();
    return nav === 'ta' ? 'ta' : nav === 'en' ? 'en' : 'fr';
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-langue]'), function (b) {
    b.addEventListener('click', function () { appliquer(b.getAttribute('data-langue')); });
  });
  window.LANGUE = function () { return langue; };
  appliquer(initiale());
})();
