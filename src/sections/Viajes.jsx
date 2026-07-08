import { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import { foto } from '../lib/fotos.js';

const LIMA = [-77.03, -12.05];

const VIAJES = [
  { anio: 2014, lugar: 'ciudad de méxico', pais: 'méxico', coords: [-99.13, 19.43], foto: 'mexicodf', frase: 'mi segunda casa empezó aquí.' },
  { anio: 2014, lugar: 'cancún', pais: 'méxico', coords: [-86.85, 21.16], foto: 'cancun', frase: 'uno de los viajes más especiales de mi infancia.' },
  { anio: 2016, lugar: 'panamá', pais: 'panamá', coords: [-79.52, 8.98], foto: null, frase: 'un viaje que hoy significa aún más.' },
  { anio: 2016, lugar: 'bahamas', pais: 'bahamas', coords: [-77.34, 25.05], foto: 'bahamas', frase: 'ese mar sigue siendo imposible de olvidar.' },
  { anio: 2017, lugar: 'bogotá', pais: 'colombia', coords: [-74.07, 4.71], foto: 'bogota', frase: 'entre familia, frío y buenos recuerdos.' },
  { anio: 2017, lugar: 'ciudad de méxico', pais: 'méxico', coords: [-99.13, 19.43], foto: 'mexicodf', frase: 'ya se sentía familiar.' },
  { anio: 2019, lugar: 'cancún', pais: 'méxico', coords: [-86.85, 21.16], foto: 'cancun', frase: 'volver también tiene su magia.' },
  { anio: 2019, lugar: 'ciudad de méxico', pais: 'méxico', coords: [-99.13, 19.43], foto: 'mexicodf', frase: 'volver ya era una tradición.' },
  { anio: 2021, lugar: 'cancún', pais: 'méxico', coords: [-86.85, 21.16], foto: 'cancun', frase: 'como volver a un lugar conocido.' },
  { anio: 2022, lugar: 'san andrés', pais: 'colombia', coords: [-81.7, 12.58], foto: 'viajeprom', frase: 'sol, amigos y cero preocupaciones.' },
  { anio: 2022, lugar: 'bogotá', pais: 'colombia', coords: [-74.07, 4.71], foto: 'andres_carne_de_res', frase: 'extensión del viaje de promo: andrés carne de res, mi restaurante favorito de colombia.' },
  { anio: 2023, lugar: 'ciudad de méxico', pais: 'méxico', coords: [-99.13, 19.43], foto: 'mexicodf', frase: 'hay lugares que siempre te reciben igual.' },
  { anio: 2024, lugar: 'ciudad de méxico', pais: 'méxico', coords: [-99.13, 19.43], foto: 'mexicodf', frase: 'mi segunda casa, una vez más.' },
  { anio: 2024, lugar: 'madrid', pais: 'españa', coords: [-3.7, 40.42], foto: 'madrid', frase: 'la primera parada de un viaje inolvidable.' },
  { anio: 2024, lugar: 'barcelona', pais: 'españa', coords: [2.17, 41.39], foto: 'barcelona', frase: 'una ciudad con demasiada personalidad.' },
  { anio: 2024, lugar: 'parís', pais: 'francia', coords: [2.35, 48.86], foto: 'paris', frase: 'menos cliché de lo que esperaba.' },
  { anio: 2024, lugar: 'ámsterdam', pais: 'países bajos', coords: [4.9, 52.37], foto: 'amsterdam', frase: 'tenías razón, hazel.' },
  { anio: 2024, lugar: 'múnich', pais: 'alemania', coords: [11.58, 48.14], foto: 'munich', frase: 'si me mudara a europa, sería aquí.' },
  { anio: 2024, lugar: 'roma', pais: 'italia', coords: [12.5, 41.9], foto: 'roma', frase: 'no fue suficiente una sola vez.' },
  { anio: 2024, lugar: 'venecia', pais: 'italia', coords: [12.32, 45.44], foto: 'roma', frase: 'la vista sí, la experiencia no tanto.' },
  { anio: 2025, lugar: 'roma', pais: 'italia', coords: [12.5, 41.9], foto: 'roma', frase: 'algunos lugares merecen una segunda visita.' },
  { anio: 2026, lugar: 'punta cana', pais: 'rep. dominicana', coords: [-68.4, 18.58], foto: 'puntacana', frase: 'el viaje más reciente... por ahora.' },
];

function haversineKm(a, b) {
  const R = 6371;
  const rad = Math.PI / 180;
  const dLat = (b[1] - a[1]) * rad;
  const dLon = (b[0] - a[0]) * rad;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a[1] * rad) * Math.cos(b[1] * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

// los viajes del mismo año se encadenan como un solo tour
// (lima → ciudad → ciudad → ... → lima), no ida y vuelta por cada ciudad
const KM_ACUMULADOS = VIAJES.map((v, i) => {
  const prev = VIAJES[i - 1];
  const next = VIAJES[i + 1];
  const desde = prev && prev.anio === v.anio ? prev.coords : LIMA;
  let km = haversineKm(desde, v.coords);
  if (!next || next.anio !== v.anio) km += haversineKm(v.coords, LIMA);
  return Math.round(km);
});

function KmCounter({ km }) {
  return (
    <div className="km-counter">
      {km.toLocaleString('es-PE')} km recorridos
      <div className="nota-pequena" style={{ fontSize: '0.95rem' }}>(aproximado, no me cobren la precisión)</div>
    </div>
  );
}

export default function Viajes() {
  const scrollRef = useRef(null);
  const [mundo, setMundo] = useState(null);
  const [visibles, setVisibles] = useState(0);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/countries-110m.json`)
      .then((r) => r.json())
      .then((topo) => setMundo(feature(topo, topo.objects.countries)))
      .catch(() => setMundo('error'));
  }, []);

  // cuántos viajes se muestran depende del avance del scroll dentro de la sección
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const avance = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
      // los vuelos terminan de aparecer al ~70% del scroll: el tramo final
      // deja el mapa completo en pantalla antes de soltar el sticky
      setVisibles(Math.min(VIAJES.length, Math.round((avance / 0.7) * VIAJES.length)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const W = 900;
  const H = 480;

  const { proyeccion, path } = useMemo(() => {
    const proyeccion = d3.geoNaturalEarth1().scale(178).translate([W / 2.15, H / 1.82]);
    return { proyeccion, path: d3.geoPath(proyeccion) };
  }, []);

  const arco = (coords) => {
    const from = proyeccion(LIMA);
    const to = proyeccion(coords);
    const mx = (from[0] + to[0]) / 2;
    const my = Math.min(from[1], to[1]) - Math.abs(from[0] - to[0]) * 0.18 - 24;
    return `M ${from[0]} ${from[1]} Q ${mx} ${my} ${to[0]} ${to[1]}`;
  };

  const km = KM_ACUMULADOS.slice(0, visibles).reduce((a, b) => a + b, 0);
  const sellosVistos = [...new Map(VIAJES.slice(0, visibles).map((v) => [`${v.pais}-${v.anio}`, v])).values()];

  return (
    <section id="viajes" data-capitulo="viajes" className="chapter chapter--wide" ref={scrollRef}>
      <Reveal>
        <p className="chapter-kicker">capítulo nueve</p>
        <h2 className="chapter-title">mi pasaporte ha trabajado más que yo.</h2>
        <p className="chapter-sub">sigue bajando: cada scroll despega un vuelo desde lima, y cada punto guarda una foto.</p>
      </Reveal>

      {/* el sticky vive dentro de este wrapper: al terminar el spacer,
          el mapa se va con él y ya no puede taparse con lo que sigue */}
      <div style={{ position: 'relative' }}>
      <div className="mapa-wrap">
        <div className="mapa-lienzo">
          <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" role="img" aria-label="mapa de mis viajes">
            {mundo && mundo !== 'error' &&
              mundo.features.map((f, i) => (
                <path
                  key={f.id ?? `pais-${i}`}
                  d={path(f)}
                  fill={f.properties.name === 'Peru' ? '#c8a2ff' : '#f1ecf9'}
                  stroke="#fff"
                  strokeWidth="0.6"
                />
              ))}
            {mundo === 'error' && (
              <text x={W / 2} y={H / 2} textAnchor="middle" style={{ fontFamily: 'var(--hand)', fontSize: 20, fill: '#9a9a9a' }}>
                (el mapa no cargó, pero los viajes fueron reales)
              </text>
            )}

            {/* lima */}
            <circle cx={proyeccion(LIMA)[0]} cy={proyeccion(LIMA)[1]} r={5} fill="#5e4a8a" />
            <text x={proyeccion(LIMA)[0] + 9} y={proyeccion(LIMA)[1] + 4} style={{ fontFamily: 'var(--hand)', fontSize: 15, fill: '#5e4a8a' }}>
              lima
            </text>

            <AnimatePresence>
              {VIAJES.slice(0, visibles).map((v, i) => {
                const [x, y] = proyeccion(v.coords);
                return (
                  <motion.g key={`${v.lugar}-${v.anio}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <motion.path
                      d={arco(v.coords)}
                      fill="none"
                      stroke="#8e6bc8"
                      strokeWidth="1.4"
                      strokeDasharray="4 3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                    />
                    {/* halo que late para invitar a tocar el punto */}
                    <motion.circle
                      cx={x}
                      cy={y}
                      fill="none"
                      stroke="#8e6bc8"
                      strokeWidth="1.5"
                      style={{ pointerEvents: 'none' }}
                      initial={{ r: 6, opacity: 0 }}
                      animate={{ r: [6, 15], opacity: [0.55, 0] }}
                      transition={{ delay: 1, duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                    />
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={6}
                      fill="#8e6bc8"
                      stroke="#fff"
                      strokeWidth="1.5"
                      style={{ cursor: 'pointer' }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7, type: 'spring', bounce: 0.5 }}
                      onClick={() => setPopup(popup?.anio === v.anio && popup?.lugar === v.lugar ? null : { ...v, x: (x / W) * 100, y: (y / H) * 100 })}
                      onMouseEnter={() => setPopup({ ...v, x: (x / W) * 100, y: (y / H) * 100 })}
                    />
                  </motion.g>
                );
              })}
            </AnimatePresence>
          </svg>

          {popup && (
            <motion.div
              className="mapa-popup polaroid"
              initial={{ opacity: 0, y: 12, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              style={{
                width: 175,
                left: `clamp(0%, ${popup.x - 10}%, 78%)`,
                top: `clamp(0%, ${popup.y - 46}%, 60%)`,
              }}
              onMouseLeave={() => setPopup(null)}
            >
              {foto(popup.foto) ? (
                <img className="polaroid-img polaroid-img--wide" src={foto(popup.foto)} alt={popup.lugar} />
              ) : (
                <div className="polaroid-placeholder polaroid-placeholder--wide">
                  <span className="emoji">✈️</span>
                  <span className="nombre">{popup.lugar}</span>
                </div>
              )}
              <figcaption className="polaroid-caption">
                {popup.lugar} · {popup.anio}
                <br />
                <span style={{ fontSize: '1rem', color: 'var(--ink-muted)' }}>{popup.frase}</span>
              </figcaption>
            </motion.div>
          )}

          {visibles > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{
                position: 'absolute',
                bottom: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(255,255,255,.88)',
                borderRadius: 999,
                padding: '5px 16px',
                fontFamily: 'var(--hand)',
                fontSize: '1.1rem',
                color: '#5e4a8a',
                boxShadow: '0 2px 10px rgba(94,74,138,.18)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              toca cada puntito para ver la foto de ese viaje
            </motion.div>
          )}

          <div className="pasaporte">
            <h4>🛂 pasaporte</h4>
            <div className="sellos">
              {sellosVistos.map((v, i) => (
                <motion.div
                  key={`${v.pais}-${v.anio}`}
                  className="sello"
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: -8 + (i % 3) * 8 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                >
                  <span>{v.pais}</span>
                  <span>{v.anio}</span>
                </motion.div>
              ))}
              {sellosVistos.length === 0 && <span className="nota-pequena">aún sin sellos...</span>}
            </div>
          </div>
        </div>
      </div>

      {/* espacio de scroll para que el mapa vaya revelando vuelos */}
      <div style={{ height: '200vh' }} />

      <KmCounter km={km} />
      </div>

      <Reveal style={{ textAlign: 'center', padding: '14vh 0 4vh' }}>
        <p className="nota-pequena">
          las rutas desaparecen... el planeta se hace pequeño... y se convierte en un círculo.
        </p>
      </Reveal>
    </section>
  );
}
