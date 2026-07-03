// lee automáticamente todo lo que haya en src/fotos.
// si una foto no existe todavía, foto() devuelve undefined y el
// componente Polaroid muestra un placeholder elegante en su lugar.
const mods = import.meta.glob('../fotos/*.{jpeg,jpg,png,webp,JPG,JPEG,PNG}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const byName = {};
for (const path in mods) {
  const base = path
    .split('/')
    .pop()
    .replace(/\.(jpeg|jpg|png|webp)$/i, '')
    .toLowerCase();
  byName[base] = mods[path];
}

// los nombres que usa el código (del documento de diseño) → los nombres
// reales de los archivos de bihonda. si un archivo con el nombre exacto
// existe, gana; si no, se busca el alias.
const ALIAS = {
  bryan: 'bryan_yo',
  bryan_infancia: 'bryan_jugando',
  tania: 'tania_y_yo',
  familia2: 'familiacompleta2',
  vestido_lila: 'vestidolila',
  cantando: 'yo_cantando',
  aixa_pasado: 'aixa_antes',
  fer_valeria: 'fer_yvaleria',
  nena1: 'nena',
  lasalle: 'colegiolasalle',
  lasalle_grande: 'enlasalle',
  maria: 'maja',
  valery: 'valeri',
  bioingenieria: 'clase_bioingenieria',
  laboratorio: 'laboratorio_bio',
  paolo1: 'loli',
  paolo2: 'loli2',
  mercedes: 'divemtor',
  mercedes_equipo: 'divemoto_equipo',
  belcorp_dp: 'belcorp_data_platform',
  belcorp_amigos: 'belcorpamigos',
  belcorp_mia: 'yo_en_belcorp',
  mexicodf: 'mexico_df',
  collage_ian: 'collageian',
  papas: 'papis_y_yo',
};

export function foto(name) {
  const key = String(name).toLowerCase();
  return byName[key] ?? byName[ALIAS[key]];
}
