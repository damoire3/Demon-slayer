# Journal de travail — Demon Slayer

Format : date — action — statut — notes.

## 2026-11-17

- Réception du pack de skills GSAP (gsap-skills-main). Skills lues : gsap-core, gsap-scrolltrigger, gsap-react, gsap-performance, gsap-frameworks, gsap-plugins, gsap-timeline, gsap-utils. Source : https://github.com/greensock/gsap-skills (copie locale, licence MIT).
- Décision : stack React + Vite, GSAP (ScrollTrigger + useGSAP), Three.js pour le WebGL, déploiement Vercel.
- Initialisation du projet : package.json, vite.config.js, index.html, vercel.json, .gitignore. Statut : fait.
- Création de App.jsx, main.jsx et des composants ScrollVideo.jsx (scrub vidéo, chapitres, HUD) et ThreeBackground.jsx (shader WebGL). Statut : fait, à tester.
- Correction : le tween de scrub est créé après loadedmetadata (la durée vidéo n'était pas connue à la création). Statut : fait.
- Rédaction du cahier des charges (CAHIER_DES_CHARGES.md) et du README. Statut : fait.
- Vidéo : fichier `demon-slayer.mp4` attendu dans public/videos/. Statut : en attente.

## À faire

- Ajouter la vidéo finale encodée (GOP court).
- Tester `npm run dev` et `npm run build`.
- Tester le scrub sur mobile (Safari iOS notamment).
- Définir la destination du bouton CTA.
- Valider les droits sur les visuels avant mise en ligne publique.
- Déployer sur Vercel et noter l'URL de production ici.
