Placer ici la vidéo principale : `demon-slayer.mp4`.

Recommandations :
- Format H.264 (MP4), 4K (3840x2160) ou 2K pour le web, ~24-30 fps.
- Peu de keyframes : encoder avec un GOP court (-g 15 ou -keyint 15 avec ffmpeg),
  sinon le scrub saute et l'image se fige.
- Garder la vidéo sous ~30 Mo si possible (ou la découper en plusieurs fichiers).
- Exemple ffmpeg : ffmpeg -i source.mov -c:v libx264 -crf 23 -preset slow -g 15 -movflags +faststart -an demon-slayer.mp4
