import { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import { foto } from '../lib/fotos.js';

const LIMA = [-77.03, -12.05];

const VIAJES = [
  { anio: 2014, lugar: 'cancún', pais: 'méxico', coords: [-86.85, 21.16], foto: 'cancun', frase: 'mi primer sello en el pasaporte.' },
  { anio: 2016, lugar: 'panamá', pais: 'panamá', coords: [-79.52, 8.98], foto: null, frase: 'escala que cuenta como viaje. punto.' },
  { anio: 2016, lugar: 'bahamas', pais: 'bahamas', coords: [-77.34, 25.05], foto: 'bahamas', frase: 'el mar más turquesa que he visto.' },
  { anio: 2017, lugar: 'bogotá', pais: 'colombia', coords: [-74.07, 4.71], foto: 'bogota', frase: 'frío, arepas y mucha familia.' },
  { anio: 2017, lugar: 'ciudad de méxico', pais: 'méxico', coords: [-99.13, 19.43], foto: 'mexicodf', frase: 'la primera de muchas veces.' },
  { anio: 2019, lugar: 'cancún', pais: 'méxico', coords: [-86.85, 21.16], foto: 'cancun', frase: 'segunda ronda de playa.' },
  { anio: 2019, lugar: 'ciudad de méxico', pais: 'méxico', coords: [-99.13, 19.43], foto: 'mexicodf', frase: 'méxico otra vez, porque sí.' },
  { anio: 2021, lugar: 'cancún', pais: 'méxico', coords: [-86.85, 21.16], foto: 'cancun', frase: 'cancún y yo: una relación estable.' },
  { anio: 2023, lugar: 'ciudad de méxico', pais: 'méxico', coords: [-99.13, 19.43], foto: 'mexicodf', frase: 'ya casi me dan la nacionalidad honoraria.' },
  { anio: 2024, lugar: 'madrid', pais: 'españa', coords: [-3.7, 40.42], foto: 'madrid', frase: 'mi primera vez en europa 🇪🇸' },
  { anio: 2024, lugar: 'barcelona', pais: 'españa', coords: [2.17, 41.39], foto: 'barcelona', frase: 'gaudí entendió todo.' },
  { anio: 2024, lugar: 'parís', pais: 'francia', coords: [2.35, 48.86], foto: 'paris', frase: 'sí... es tan bonito como dicen.' },
  { anio: 2024, lugar: 'ámsterdam', pais: 'países bajos', coords: [4.9, 52.37], foto: 'amsterdam', frase: 'bicicletas, canales y cero sentido de orientación.' },
  { anio: 2024, lugar: 'múnich', pais: 'alemania', coords: [11.58, 48.14], foto: 'munich', frase: 'todo demasiado ordenado. me encantó.' },
  { anio: 2024, lugar: 'roma', pais: 'italia', coords: [12.5, 41.9], foto: 'roma', frase: 'la pasta de verdad no se compara.' },
  { anio: 2024, lugar: 'venecia', pais: 'italia', coords: [12.32, 45.44], foto: 'roma', frase: 'una ciudad flotando. literal.' },
  { anio: 2025, lugar: 'roma', pais: 'italia', coords: [12.5, 41.9], foto: 'roma', frase: 'volver también puede ser un viaje.' },
  { anio: 2026, lugar: 'punta cana', pais: 'rep. dominicana', coords: [-68.4, 18.58], foto: 'puntacana', frase: 'mi aventura más reciente.' },
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
      <div className="nota-pequena" style={{ fontSize: '0.95rem' }}>(aproximado, no me cobren la precisión ✈️)</div>
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
      setVisibles(Math.round(avance * VIAJES.length));
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
        <p className="chapter-sub">sigue bajando: cada scroll despega un vuelo desde lima ✈️</p>
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
                (el mapa no cargó, pero los viajes fueron reales 🌎)
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
      <div style={{ height: '170vh' }} />

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
