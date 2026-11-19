# Demon Slayer — site immersif

Site React + Vite avec scroll vidéo (GSAP ScrollTrigger), fond WebGL (Three.js).

## Démarrer

```bash
npm install
npm run dev
```

## Vidéo

Placer `demon-slayer.mp4` dans `public/videos/` (voir le README de ce dossier).

## Build

```bash
npm run build
npm run preview
```

## Déploiement sur Vercel

1. Pousser le projet sur GitHub.
2. Sur vercel.com : "Add New Project", importer le dépôt.
3. Framework : Vite (détecté automatiquement). Build : `npm run build`, dossier : `dist`.
4. Deploy. Les fichiers `vercel.json` et le cache de `/videos` sont déjà configurés.

Ou en ligne de commande : `npx vercel` puis `npx vercel --prod`.

## Documentation

- `CAHIER_DES_CHARGES.md` : spécifications du projet.
- `skills/JOURNAL.md` : journal de travail.
