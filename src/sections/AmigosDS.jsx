import { useState } from 'react';
import { motion } from 'framer-motion';
import Polaroid from '../components/Polaroid.jsx';
import Reveal from '../components/Reveal.jsx';
import { foto } from '../lib/fotos.js';

const AMIGOS = [
  {
    id: 'paolo',
    label: 'paolo',
    fotos: ['paolo1', 'paolo2'],
    grosor: 7,
    ang: -1.2,
    texto:
      'y entonces apareció paolo, o loli para los amigos. el hermano que la vida decidió regalarme. él pone la neurona que me falta. yo pongo las que le faltan a él.',
  },
  {
    id: 'josue',
    label: 'josué',
    fotos: ['josue'],
    grosor: 5,
    ang: 0.5,
    texto: 'con josué he vivido demasiadas cosas. siempre me aconseja. casi nunca sigo sus consejos. igual lo quiero muchísimo.',
  },
  {
    id: 'ricardo',
    label: 'ricardo',
    fotos: ['ricardo'],
    grosor: 3,
    ang: 2.4,
    texto: 'ricardo llegó mucho después. pero ya forma parte de esta etapa. y sí... gracias por no botarme del discord. 😂',
  },
];

const BURBUJA_TL = [
  { anio: '2016', nombres: ['maría', 'valeri'], x: 12 },
  { anio: '2023', nombres: ['paolo'], x: 44 },
  { anio: '2024', nombres: ['josué'], x: 66 },
  { anio: '2026', nombres: ['ricardo'], x: 88 },
];

function RedAmigos() {
  const [activo, setActivo] = useState(null);
  const W = 640;
  const H = 380;
  const cx = 320;
  const cy = 190;
  const R = 130;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" role="img" aria-label="mi red de data science">
      {AMIGOS.map((a, i) => {
        const x = cx + Math.cos(a.ang) * R;
        const y = cy + Math.sin(a.ang) * R * 0.85;
        const dim = activo && activo !== a.id;
        const src = foto(a.fotos[0]);
        const r = activo === a.id ? 44 : 36;
        return (
          <g
            key={a.id}
            onMouseEnter={() => setActivo(a.id)}
            onMouseLeave={() => setActivo(null)}
            onClick={() => setActivo(activo === a.id ? null : a.id)}
            style={{ cursor: 'pointer' }}
          >
            <motion.line
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke={activo === a.id ? '#8e6bc8' : '#d9cdf0'}
              strokeWidth={a.grosor}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.3 }}
              style={{ opacity: dim ? 0.1 : 0.75, transition: 'opacity .4s, stroke .4s' }}
            />
            <motion.g
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.3, type: 'spring', bounce: 0.4 }}
              style={{ opacity: dim ? 0.18 : 1, transition: 'opacity .4s' }}
            >
              <circle cx={x} cy={y} r={r + 3} fill="#fff" stroke="#c8a2ff" strokeWidth="2" />
              {src ? (
                <>
                  <clipPath id={`clip-ds-${a.id}`}>
                    <circle cx={x} cy={y} r={r} />
                  </clipPath>
                  <image href={src} x={x - r} y={y - r} width={r * 2} height={r * 2} clipPath={`url(#clip-ds-${a.id})`} preserveAspectRatio="xMidYMid slice" />
                </>
              ) : (
                <>
                  <circle cx={x} cy={y} r={r} fill="#f4effc" />
                  <text x={x} y={y + 8} textAnchor="middle" fontSize="24">🧑‍💻</text>
                </>
              )}
              <text x={x} y={y + r + 20} textAnchor="middle" style={{ fontFamily: 'var(--hand)', fontSize: 18, fill: '#5e4a8a' }}>
                {a.label}
              </text>
            </motion.g>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={40} fill="#f4effc" stroke="#8e6bc8" strokeWidth="2" />
      <text x={cx} y={cy + 2} textAnchor="middle" style={{ fontSize: 22 }}>🐒</text>
      <text x={cx} y={cy + 24} textAnchor="middle" style={{ fontFamily: 'var(--hand)', fontSize: 17, fill: '#5e4a8a' }}>
        yo
      </text>
    </svg>
  );
}

export default function AmigosDS() {
  return (
    <section id="amigos-ds" data-capitulo="data-science" className="chapter tech-bg" style={{ maxWidth: 'none' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <p className="chapter-kicker">capítulo siete</p>
          <h2 className="chapter-title">y entonces encontré mi lugar.</h2>
          <p className="chapter-sub">el grosor de cada conexión no mide importancia. mide momentos compartidos.</p>
        </Reveal>

        <RedAmigos />

        {AMIGOS.map((a, i) => (
          <div className="scrolly-block prose" key={a.id}>
            <Reveal>
              <p className="big">{a.texto}</p>
            </Reveal>
            <div className="foto-fila">
              {a.fotos.map((f, j) => (
                <Polaroid key={f} nombre={f} width={185} rotate={(i + j) % 2 ? 2.5 : -2.5} tape={j === 0} emoji="🫂" />
              ))}
            </div>
          </div>
        ))}

        <div className="scrolly-block">
          <Reveal>
            <p className="hand" style={{ textAlign: 'center' }}>el año en que cada uno llegó a mi vida:</p>
          </Reveal>
          <svg viewBox="0 0 800 190" className="chart-svg" role="img" aria-label="cuándo conocí a cada amigo">
            <line x1="30" y1="120" x2="770" y2="120" stroke="#e9e2f5" strokeWidth="1.5" />
            {BURBUJA_TL.map((b, i) => (
              <motion.g
                key={b.anio}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.22 }}
              >
                {b.nombres.map((n, j) => (
                  <g key={n}>
                    <circle
                      cx={(b.x / 100) * 800 + j * 52}
                      cy={78 - j * 6}
                      r={24}
                      fill="#f4effc"
                      stroke="#8e6bc8"
                      strokeWidth="1.5"
                    />
                    <text
                      x={(b.x / 100) * 800 + j * 52}
                      y={82 - j * 6}
                      textAnchor="middle"
                      style={{ fontFamily: 'var(--hand)', fontSize: 14, fill: '#5e4a8a' }}
                    >
                      {n}
                    </text>
                  </g>
                ))}
                <circle cx={(b.x / 100) * 800} cy={120} r={4} fill="#5e4a8a" />
                <text x={(b.x / 100) * 800} y={155} textAnchor="middle" style={{ fontFamily: 'var(--fraunces)', fontSize: 16, fill: '#6b6b6b' }}>
                  {b.anio}
                </text>
              </motion.g>
            ))}
          </svg>
        </div>

        <Reveal style={{ textAlign: 'center', paddingTop: '4vh' }}>
          <p className="nota-pequena">todas las conexiones se van apagando... y solo queda una.</p>
          <p className="hand" style={{ fontSize: '1.7rem' }}>yo ─── trabajo 💼</p>
        </Reveal>
      </div>
    </section>
  );
}
