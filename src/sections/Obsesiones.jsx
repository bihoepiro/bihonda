import { useMemo, useState } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';

const OBSESIONES = [
  { id: 'matcha', emoji: '🍵', valor: 30, frase: 'no sé cuándo empezó. solo sé que ahora siempre termino pidiendo matcha.' },
  { id: 'fotografía', emoji: '📷', valor: 27, frase: 'mi celular tiene demasiadas fotos. no me arrepiento de ninguna.' },
  { id: 'harry potter', emoji: '🧙', valor: 25, frase: 'gracias bryan ❤️' },
  { id: 'playlists', emoji: '🎵', valor: 22, frase: 'tengo playlists para absolutamente todo.' },
  { id: 'criminal minds', emoji: '📺', valor: 20, frase: 'spencer reid fue mi primer amor platónico. nunca lo superé. 😂' },
  { id: 'tiktok', emoji: '📱', valor: 18, frase: 'tiktok es un agujero negro.' },
  { id: 'ravenclaw', emoji: '🦅', valor: 16, frase: 'obviamente ravenclaw.' },
  { id: 'the blacklist', emoji: '🎬', valor: 13, frase: 'reddington merece un premio. yo también, por terminarla.' },
  { id: 'killing eve', emoji: '🔪', valor: 13, frase: 'villanelle tiene el mejor clóset de la televisión.' },
];

export default function Obsesiones() {
  const [activa, setActiva] = useState(null);

  const circulos = useMemo(() => {
    const root = d3
      .pack()
      .size([720, 560])
      .padding(14)(d3.hierarchy({ children: OBSESIONES }).sum((d) => d.valor));
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
        <svg viewBox="0 0 720 560" className="chart-svg" role="img" aria-label="mis obsesiones, a escala">
          {circulos.map((c, i) => {
            const d = c.data;
            const grande = activa === d.id;
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
                <text x={c.x} y={c.y - 4} textAnchor="middle" style={{ fontSize: c.r * 0.62, pointerEvents: 'none' }}>
                  {d.emoji}
                </text>
                <text
                  x={c.x}
                  y={c.y + c.r * 0.45}
                  textAnchor="middle"
                  style={{ fontFamily: 'var(--hand)', fontSize: Math.max(13, c.r * 0.26), fill: '#5e4a8a', pointerEvents: 'none' }}
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
                <div style={{ fontSize: '2rem' }}>{obsesion.emoji}</div>
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
