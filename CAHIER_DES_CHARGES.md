# Cahier des charges — Demon Slayer, site immersif

## 1. Contexte et objectif
Site vitrine immersif consacré à l'univers de Demon Slayer. L'expérience repose sur une vidéo 4K
dont la lecture est pilotée par le scroll de l'utilisateur, accompagnée d'un fond animé en WebGL.
Objectif : impressionner visuellement, raconter l'univers en chapitres, et terminer par un appel à l'action.

## 2. Public cible
- Fans de Demon Slayer, francophones (Bénin, Afrique de l'Ouest et diaspora).
- Visiteurs mobiles et desktop, connexions variables (le poids de la vidéo doit rester raisonnable).

## 3. Stack technique
- React 18 + Vite 5 (JavaScript, JSX).
- GSAP 3 (core + ScrollTrigger) via `gsap` et `@gsap/react` (hook `useGSAP`).
  Tous les plugins GSAP sont gratuits depuis le rachat par Webflow : pas de token ni de registre privé.
- Three.js (WebGL) pour le fond animé : shader plein écran (bruit fractal, braise et eau).
- Déploiement : Vercel (framework Vite, build `npm run build`, sortie `dist`).
- Code source versionné sur GitHub (recommandé).

## 4. Fonctionnalités

### F1 — Vidéo scrubbée au scroll (priorité haute)
- Une vidéo 4K en fond, en position sticky plein écran.
- Le temps de lecture de la vidéo est lié à la position de scroll (ScrollTrigger, `scrub`).
- Lissage du scroll (`scrub: 0.8`) pour un rendu fluide.
- Démarrage du scrub uniquement après chargement des métadonnées de la vidéo.

### F2 — Chapitres en texte animé (priorité haute)
- Trois chapitres plus un épilogue, alternés gauche / droite / centre.
- Apparition progressive (fondu, léger flou, translation) liée au scroll.
- Textes en français, titres en typographie serif.

### F3 — Fond WebGL (priorité haute)
- Canvas Three.js plein écran en arrière-plan, shader GLSL.
- Couleurs qui évoluent avec la progression du scroll (passage braise → eau).
- Réaction légère à la position de la souris.
- Libération propre des ressources (geometry, material, renderer) au démontage.

### F4 — Indicateur de progression (priorité moyenne)
- Barre de progression et pourcentage affichés en bas de l'écran.

### F5 — Appel à l'action (priorité moyenne)
- Bouton "Commencer l'aventure" en fin de page. Destination à définir (lien, boutique, inscription).

### F6 — Accessibilité et préférences
- Respect de `prefers-reduced-motion` (animation du grain désactivée).
- Vidéo muette (`muted`), aucune lecture automatique avec son.
- Textes avec contraste suffisant sur fond sombre.

## 5. Exigences non fonctionnelles
- Performance : 60 fps cible sur desktop récent ; animations en `transform` et `opacity`.
- Pixel ratio du canvas WebGL plafonné à 1,5.
- Poids de la vidéo : idéalement moins de 30 Mo, encodée avec un GOP court (scrub fluide).
- Compatibilité : Chrome, Edge, Firefox, Safari récents ; WebGL requis (message de repli à ajouter si absent).
- Responsive : mobile (≥ 360 px) et desktop.
- SEO de base : balises `title` et `description`, langue `fr`.

## 6. Contenu et assets
- Vidéo principale `public/videos/demon-slayer.mp4` (4K source, version web compressée).
- Droits : le contenu Demon Slayer appartient à ses ayants droit. Le projet doit rester
  un hommage / une vitrine non commerciale, sauf accord, et ne doit pas reprendre de logos ou
  visuels protégés sans autorisation. À valider avant mise en ligne publique.

## 7. Architecture
```
src/
  main.jsx                  point d'entrée
  App.jsx                   composition : fond WebGL + section vidéo
  components/
    ScrollVideo.jsx         vidéo scrubbée, chapitres, HUD (GSAP)
    ThreeBackground.jsx     canvas Three.js + shader (WebGL)
  styles/global.css         thème, mise en page, animations CSS
public/videos/              vidéo et README d'encodage
skills/                     skills GSAP pour les agents IA + JOURNAL.md
vercel.json                 configuration de déploiement
```

## 8. Déploiement
1. `npm install`, `npm run dev` pour tester en local.
2. `npm run build` doit passer sans erreur.
3. Import du dépôt sur Vercel ; framework Vite ; sortie `dist`.
4. Vérifier : chargement de la vidéo, scrub, fond WebGL, mobile.

## 9. Critères d'acceptation
- [ ] La vidéo avance et recule au rythme du scroll, sans saut visible.
- [ ] Les chapitres apparaissent et disparaissent selon le scroll.
- [ ] Le fond WebGL s'affiche et change de couleur avec la progression.
- [ ] Aucune erreur dans la console au chargement et au démontage.
- [ ] `npm run build` réussit ; déploiement Vercel accessible en HTTPS.
- [ ] Site lisible et fluide sur mobile.

## 10. Hors périmètre (V1)
- Boutique, paiement, compte utilisateur.
- Contenu vidéo multiple ou lecteur avec son.
- Internationalisation (anglais, etc.).

## 11. Évolutions possibles
- Plusieurs vidéos ou séquences par chapitre.
- Effets de particules (feuilles, flammes) en Three.js ou via un canvas dédié.
- Chargement progressif (poster, préchargement par étapes).
