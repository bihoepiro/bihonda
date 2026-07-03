import { useState } from 'react';
import { motion } from 'framer-motion';
import Polaroid from '../components/Polaroid.jsx';
import Reveal from '../components/Reveal.jsx';
import { foto } from '../lib/fotos.js';

const W = 760;
const H = 430;

const NODOS = [
  { id: 'papa', label: 'papá', x: 250, y: 70, foto: 'papi_y_yo', frase: 'siempre estuvo ahí y es mi fan número 1.' },
  { id: 'mama', label: 'mamá', x: 510, y: 70, foto: 'mami_y_yo', frase: 'la persona más trabajadora que conozco.' },
  { id: 'bryan', label: 'bryan', x: 170, y: 330, foto: 'bryan', frase: 'responsable de gran parte de mi personalidad.' },
  { id: 'tania', label: 'tania', x: 380, y: 330, foto: 'tania', frase: 'mi hermana mayor y mejor amiga ❤️' },
  { id: 'yo', label: 'yo', x: 590, y: 330, foto: 'fotoprincipal', frase: 'la última en llegar. la protagonista de esta página.' },
];

const UNION = { x: 380, y: 150 };

function rama(hijo) {
  return `M ${UNION.x} ${UNION.y} C ${UNION.x} ${UNION.y + 80}, ${hijo.x} ${hijo.y - 90}, ${hijo.x} ${hijo.y - 34}`;
}

function FamilyTree() {
  const [activo, setActivo] = useState(null);
  const hijos = NODOS.filter((n) => ['bryan', 'tania', 'yo'].includes(n.id));
  const nodoActivo = NODOS.find((n) => n.id === activo);

  return (
    <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto' }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" role="img" aria-label="árbol familiar">
        {/* tronco: papá y mamá se unen */}
        <motion.path
          d={`M ${NODOS[0].x} ${NODOS[0].y + 34} C ${NODOS[0].x} ${UNION.y}, ${UNION.x} ${UNION.y - 40}, ${UNION.x} ${UNION.y}`}
          fill="none"
          stroke="#8e6bc8"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        />
        <motion.path
          d={`M ${NODOS[1].x} ${NODOS[1].y + 34} C ${NODOS[1].x} ${UNION.y}, ${UNION.x} ${UNION.y - 40}, ${UNION.x} ${UNION.y}`}
          fill="none"
          stroke="#8e6bc8"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        />
        {hijos.map((h, i) => (
          <motion.path
            key={h.id}
            d={rama(h)}
            fill="none"
            stroke="#8e6bc8"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 + i * 0.45 }}
          />
        ))}

        {NODOS.map((n, i) => {
          const src = foto(n.foto);
          const r = activo === n.id ? 42 : 34;
          return (
            <motion.g
              key={n.id}
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i < 2 ? 0.1 : 0.9 + (i - 2) * 0.45, type: 'spring', bounce: 0.4 }}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setActivo(n.id)}
              onMouseLeave={() => setActivo(null)}
              onClick={() => setActivo(activo === n.id ? null : n.id)}
            >
              <circle cx={n.x} cy={n.y} r={r + 3} fill="#fff" stroke="#c8a2ff" strokeWidth="2" style={{ transition: 'r .4s' }} />
              {src ? (
                <>
                  <clipPath id={`clip-${n.id}`}>
                    <circle cx={n.x} cy={n.y} r={r} />
                  </clipPath>
                  <image
                    href={src}
                    x={n.x - r}
                    y={n.y - r}
                    width={r * 2}
                    height={r * 2}
                    clipPath={`url(#clip-${n.id})`}
                    preserveAspectRatio="xMidYMid slice"
                  />
                </>
              ) : (
                <>
                  <circle cx={n.x} cy={n.y} r={r} fill="#f4effc" />
                  <text x={n.x} y={n.y + 8} textAnchor="middle" fontSize="26">
                    {n.id === 'papa' ? '👨' : n.id === 'mama' ? '👩' : n.id === 'bryan' ? '👦' : n.id === 'tania' ? '👧' : '🐒'}
                  </text>
                </>
              )}
              <text
                x={n.x}
                y={n.y + r + 22}
                textAnchor="middle"
                style={{ fontFamily: 'var(--hand)', fontSize: 19, fill: '#5e4a8a' }}
              >
                {n.label}
              </text>
            </motion.g>
          );
        })}
      </svg>

      {nodoActivo && (
        <div
          style={{
            position: 'absolute',
            left: `${(nodoActivo.x / W) * 100}%`,
            top: `${(nodoActivo.y / H) * 100 - 6}%`,
            transform: 'translate(-50%, -110%)',
            pointerEvents: 'none',
          }}
        >
        <motion.div
          className="hover-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {foto(nodoActivo.foto) && (
            <img
              src={foto(nodoActivo.foto)}
              alt={nodoActivo.label}
              style={{ width: 150, aspectRatio: '4/3', objectFit: 'cover', borderRadius: 8, marginBottom: 8 }}
            />
          )}
          <p className="frase">
            <strong>{nodoActivo.label}</strong>
            <br />
            {nodoActivo.frase}
          </p>
        </motion.div>
        </div>
      )}
    </div>
  );
}

export default function Familia() {
  return (
    <section id="familia" data-capitulo="familia" className="chapter">
      <Reveal>
        <p className="chapter-kicker">capítulo dos</p>
        <h2 className="chapter-title">la gente que siempre estuvo desde el capítulo uno ❤️</h2>
      </Reveal>

      <div className="prose scrolly-block" style={{ marginTop: '6vh' }}>
        <Reveal>
          <p className="big">bueno... antes de seguir tengo que presentar al elenco principal.</p>
          <p>mi familia. somos cinco.</p>
          <p>
            mi papá. mi mamá. mi hermano bryan. mi hermana tania. y finalmente yo.
          </p>
          <p className="big">la verdad siempre he sentido que tuve mucha suerte con la familia que me tocó.</p>
        </Reveal>
      </div>

      <FamilyTree />

      <div className="foto-fila" style={{ justifyContent: 'center', marginTop: '10vh' }}>
        <Polaroid nombre="familiacompleta" width={260} ratio="wide" rotate={-2.5} tape caption="el elenco completo" emoji="👨‍👩‍👧‍👦" />
        <Polaroid nombre="mami_y_yo" width={185} rotate={2} caption="mami y yo" emoji="🌸" />
        <Polaroid nombre="papi_y_yo" width={185} rotate={-1.5} caption="papi y yo" emoji="🤍" />
        <Polaroid nombre="bryan" width={185} rotate={3} tape caption="bryan" emoji="🎮" />
        <Polaroid nombre="tania" width={185} rotate={-3} caption="tania" emoji="💐" />
        <Polaroid nombre="familia2" width={230} ratio="wide" rotate={1.5} caption="nosotros, otra vez" emoji="🏡" />
      </div>
    </section>
  );
}
