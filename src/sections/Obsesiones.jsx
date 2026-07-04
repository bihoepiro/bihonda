import { useMemo, useState } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import { foto } from '../lib/fotos.js';

const OBSESIONES = [
  { id: 'matcha', img: 'matcha', emoji: '🍵', valor: 30, frase: 'no sé cuándo empezó. solo sé que ahora siempre termino pidiendo matcha.' },
  { id: 'fotografía', img: 'lovemylife', emoji: '📷', valor: 27, frase: 'mi celular tiene demasiadas fotos. no me arrepiento de ninguna.' },
  { id: 'harry potter', img: 'harrypotter', emoji: '🧙', valor: 25, frase: 'gracias bryan ❤️' },
  { id: 'playlists', img: 'spotify', emoji: '🎵', valor: 22, frase: 'tengo playlists para absolutamente todo.' },
  { id: 'series', img: 'showslover', emoji: '📺', valor: 21, frase: 'amo ver series. mi comfort show siempre gana.' },
  { id: 'criminal minds', img: 'spencerreid', emoji: '📺', valor: 20, frase: 'spencer reid fue mi primer amor platónico. nunca lo superé. 😂' },
  { id: 'tiktok', img: 'tiktok', emoji: '📱', valor: 18, frase: 'tiktok es un agujero negro.' },
  { id: 'ravenclaw', img: 'ravenclaw', emoji: '🦅', valor: 16, frase: 'obviamente ravenclaw.' },
  { id: 'the blacklist', img: 'blacklist', emoji: '🎬', valor: 13, frase: 'reddington merece un premio. yo también, por terminarla.' },
  { id: 'killing eve', img: 'killingeve', emoji: '🔪', valor: 13, frase: 'villanelle tiene el mejor clóset de la televisión.' },
];

export default function Obsesiones() {
  const [activa, setActiva] = useState(null);

  const circulos = useMemo(() => {
    const root = d3
      .pack()
      .size([720, 560])
      .padding(24)(d3.hierarchy({ children: OBSESIONES }).sum((d) => d.valor));
    return root.leaves();
  }, []);

  const obsesion = OBSESIONES.find((o) => o.id === activa);

  return (
    <section id="gustos" data-capitulo="gustos" className="chapter">
      <Reveal>
        <p className="chapter-kicker">capítulo diez</p>
        <h2 className="chapter-title">unas cuantas obsesiones.</h2>
        <p className="chapter-sub">no son hobbies. son pequeñas obsesiones. hay una diferencia.</p>
      </Reveal>

      <div className="dos-columnas dos-columnas--centrado">
        <svg viewBox="0 0 720 595" className="chart-svg" role="img" aria-label="mis obsesiones, a escala">
          {circulos.map((c, i) => {
            const d = c.data;
            const grande = activa === d.id;
            const src = d.img && foto(d.img);
            const slug = d.id.replace(/\s+/g, '-');
            return (
              <motion.g
                key={d.id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08, type: 'spring', bounce: 0.4 }}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setActiva(d.id)}
                onClick={() => setActiva(activa === d.id ? null : d.id)}
              >
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={grande ? c.r * 1.12 : c.r}
                  fill={grande ? '#ece2fb' : '#f4effc'}
                  stroke="#8e6bc8"
                  strokeWidth={grande ? 2.2 : 1.4}
                  style={{ transition: 'all .4s' }}
                />
                {src ? (
                  <>
                    <clipPath id={`clip-obs-${slug}`}>
                      <circle cx={c.x} cy={c.y} r={c.r - 3} />
                    </clipPath>
                    <image
                      href={src}
                      x={c.x - (c.r - 3)}
                      y={c.y - (c.r - 3)}
                      width={(c.r - 3) * 2}
                      height={(c.r - 3) * 2}
                      preserveAspectRatio="xMidYMid slice"
                      clipPath={`url(#clip-obs-${slug})`}
                      style={{ pointerEvents: 'none' }}
                    />
                  </>
                ) : (
                  <text x={c.x} y={c.y - 4} textAnchor="middle" style={{ fontSize: c.r * 0.62, pointerEvents: 'none' }}>
                    {d.emoji}
                  </text>
                )}
                <text
                  x={c.x}
                  y={c.y + c.r + 16}
                  textAnchor="middle"
                  style={{
                    fontFamily: 'var(--hand)',
                    fontSize: Math.max(14, c.r * 0.24),
                    fill: '#5e4a8a',
                    pointerEvents: 'none',
                    paintOrder: 'stroke',
                    stroke: '#fff',
                    strokeWidth: 4,
                    strokeLinejoin: 'round',
                  }}
                >
                  {d.id}
                </text>
              </motion.g>
            );
          })}
        </svg>

        <div style={{ minHeight: 160 }}>
          <AnimatePresence mode="wait">
            {obsesion ? (
              <motion.div
                key={obsesion.id}
                className="hover-card"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                style={{ maxWidth: 320 }}
              >
                {obsesion.img && foto(obsesion.img) ? (
                  <img
                    src={foto(obsesion.img)}
                    alt={obsesion.id}
                    style={{ width: '100%', maxWidth: 280, aspectRatio: '4/3', objectFit: 'cover', borderRadius: 8, marginBottom: 8 }}
                  />
                ) : (
                  <div style={{ fontSize: '2rem' }}>{obsesion.emoji}</div>
                )}
                <p className="frase" style={{ fontSize: '1.15rem' }}>{obsesion.frase}</p>
              </motion.div>
            ) : (
              <motion.p key="hint" className="nota-pequena" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                el tamaño de cada círculo mide el nivel de obsesión.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Reveal style={{ textAlign: 'center', paddingTop: '6vh' }}>
        <p className="nota-pequena">todos los círculos vuelven al centro... y se convierten en fotografías.</p>
      </Reveal>
    </section>
  );
}
