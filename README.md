# bihonda — 22 años resumidos en datos, fotos y demasiados plot twists

scrollytelling interactivo hecho con react + d3 + framer motion.

## cómo correrlo

```
npm install
npm run dev
```

y abrir http://localhost:5173

## las fotos

copia todas las fotos en `src/fotos/` (ver `src/fotos/README.md` con la lista de nombres).
la página las detecta sola por nombre de archivo. si una foto no existe todavía,
se muestra un placeholder elegante — nada se rompe.

## estructura

- `src/sections/` — un archivo por capítulo (hero, plot twists, familia, sobrinos,
  infancia, la salle, carrera, amigos, trabajo, viajes, obsesiones, final)
- `src/components/` — polaroid, reveals, progress tracker, contador de recuerdos
- `src/lib/fotos.js` — lector automático de la carpeta de fotos
- `public/fonts/` — fuentes autoalojadas (instrument serif, fraunces, manrope, caveat)
- `public/data/countries-110m.json` — mapa mundial para la sección de viajes

## build de producción

```
npm run build
npm run preview
```
