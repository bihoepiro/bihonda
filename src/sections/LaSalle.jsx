import { useState } from 'react';
import { motion } from 'framer-motion';
import Polaroid from '../components/Polaroid.jsx';
import Reveal from '../components/Reveal.jsx';
import { foto } from '../lib/fotos.js';

const ANIOS = [
  { anio: '2016', texto: 'en el 2016 cambié de colegio. la salle cambió mi vida.', foto: 'lasalle' },
  { anio: '2019', texto: 'para el 2019 ya no era "el colegio nuevo". era mi segunda casa.', foto: 'lasalle_grande' },
  { anio: '2020', texto: '2020... mi último capítulo ahí. hay lugares que una nunca termina de dejar.', foto: null },
];

const PERSONAS = [
  {
    id: 'maria',
    label: 'maría',
    foto: 'maria',
    ang: -0.9,
    frase: 'mi cristina yang. si alguien entiende esa referencia... sabe exactamente por qué.',
    momento: 'maría es mi cristina yang. si alguien entiende esa referencia... sabe exactamente por qué.',
  },
  {
    id: 'valery',
    label: 'valeri',
    foto: 'valery',
    ang: 0.35,
    frase: 'somos completamente opuestas. y creo que justamente por eso nos llevamos tan bien.',
    momento: 'con valeri somos completamente opuestas. y creo que justamente por eso nos llevamos tan bien.',
  },
  {
    id: 'profes',
    label: 'profesores',
    foto: 'profesores_lasalle',
    ang: 2.3,
    frase: 'ellos enseñaron una forma distinta de ver el mundo.',
    momento: 'y mis profesores me enseñaron una forma distinta de ver el mundo.',
  },
];

function NetworkLaSalle() {
  const [activa, setActiva] = useState(null);
  const W = 700;
  const H = 400;
  const cx = 350;
  const cy = 200;
  const R = 145;
  const persona = PERSONAS.find((p) => p.id === activa);

  return (
    <div style={{ position: 'relative', maxWidth: 1050, margin: '0 auto' }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" role="img" aria-label="las personas de la salle">
        {PERSONAS.map((p, i) => {
          const x = cx + Math.cos(p.ang) * R;
          const y = cy + Math.sin(p.ang) * R * 0.8;
          const dim = activa && activa !== p.id;
          const src = foto(p.foto);
          const r = activa === p.id ? 44 : 36;
          return (
            <g
              key={p.id}
              onMouseEnter={() => setActiva(p.id)}
              onMouseLeave={() => setActiva(null)}
              onClick={() => setActiva(activa === p.id ? null : p.id)}
              style={{ cursor: 'pointer' }}
            >
              <motion.line
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke={activa === p.id ? '#8e6bc8' : '#d9cdf0'}
                strokeWidth={activa === p.id ? 2.5 : 1.5}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.25 }}
                style={{ opacity: dim ? 0.1 : 1, transition: 'opacity .4s, stroke .4s' }}
              />
              <motion.g
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.25, type: 'spring', bounce: 0.4 }}
                style={{ opacity: dim ? 0.18 : 1, transition: 'opacity .4s' }}
              >
                <circle cx={x} cy={y} r={r + 3} fill="#fff" stroke="#c8a2ff" strokeWidth="2" />
                {src ? (
                  <>
                    <clipPath id={`clip-ls-${p.id}`}>
                      <circle cx={x} cy={y} r={r} />
                    </clipPath>
                    <image href={src} x={x - r} y={y - r} width={r * 2} height={r * 2} clipPath={`url(#clip-ls-${p.id})`} preserveAspectRatio="xMidYMid slice" />
                  </>
                ) : (
                  <>
                    <circle cx={x} cy={y} r={r} fill="#f4effc" />
                    <text x={x} y={y + 8} textAnchor="middle" fontSize="24">{p.id === 'profes' ? '🍎' : '👧'}</text>
                  </>
                )}
                <text x={x} y={y + r + 20} textAnchor="middle" style={{ fontFamily: 'var(--hand)', fontSize: 18, fill: '#5e4a8a' }}>
                  {p.label}
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

      {persona && (
        <motion.div
          className="hover-card"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ position: 'absolute', right: 0, bottom: 0, pointerEvents: 'none' }}
        >
          {foto(persona.foto) && (
            <img src={foto(persona.foto)} alt={persona.label} style={{ width: 160, aspectRatio: '4/3', objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
          )}
          <p className="frase">
            <strong>{persona.label}</strong>
            <br />
            {persona.frase}
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default function LaSalle() {
  return (
    <section id="la-salle" data-capitulo="la-salle" className="chapter">
      <Reveal>
        <p className="chapter-kicker">capítulo cinco</p>
        <h2 className="chapter-title">
          2016. pensé que solo estaba cambiando de colegio. resultó que estaba cambiando mi vida.
        </h2>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 24, marginTop: '8vh' }}>
        <div style={{ position: 'relative' }}>
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-20% 0px' }}
            transition={{ duration: 2, ease: 'easeOut' }}
            style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'var(--lila)', transformOrigin: 'top' }}
          />
        </div>
        <div>
          {ANIOS.map((a, i) => (
            <div key={a.anio} className="scrolly-block" style={{ margin: '10vh 0', position: 'relative' }}>
              <Reveal>
                <span
                  className="hand"
                  style={{ position: 'absolute', left: -114, top: 0, width: 90, textAlign: 'center', fontSize: '1.6rem' }}
                >
                  {a.anio}
                </span>
                <p className="prose big">{a.texto}</p>
              </Reveal>
              {a.foto && <Polaroid nombre={a.foto} width={230} ratio="wide" rotate={i % 2 ? 2.5 : -2.5} tape={i % 2 === 0} emoji="🏫" />}
            </div>
          ))}
        </div>
      </div>

      <div className="scrolly-block">
        <Reveal>
          <p className="hand" style={{ textAlign: 'center' }}>si tuviera que resumir esa etapa en personas:</p>
        </Reveal>
        <NetworkLaSalle />
      </div>

      {PERSONAS.map((p, i) => (
        <div className="scrolly-block prose" key={p.id}>
          <Reveal>
            <p className="big">{p.momento}</p>
          </Reveal>
          <Polaroid nombre={p.foto} width={210} rotate={i % 2 ? 2.5 : -2.5} tape={i % 2 === 0} caption={p.label} emoji="🫂" />
        </div>
      ))}

      <Reveal className="prose scrolly-block">
        <p className="big">cuando pienso en la salle no pienso en tareas.</p>
        <p>pienso en personas. pienso en la empatía.</p>
        <p>pienso en la fe, la fraternidad y el servicio.</p>
        <p className="big">y creo que gran parte de quién soy hoy nació ahí.</p>
      </Reveal>

      {/* transición a utec: aparece 2021 y el ambiente se vuelve tech */}
      <Reveal style={{ textAlign: 'center', paddingTop: '8vh' }}>
        <p className="nota-pequena">la línea del tiempo sigue... y aparece un nodo nuevo.</p>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', margin: '1rem 0 0', color: 'var(--lila-deep)' }}>
          2021
        </p>
        <p className="hand">empieza utec 💻</p>
      </Reveal>
    </section>
  );
}
