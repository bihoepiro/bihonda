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

// debajo del árbol: los recuerdos de los cinco
const COLLAGE_FOTOS = [
  { nombre: 'familiacompleta', caption: 'el elenco completo', width: 275, ratio: 'wide', rotate: -3, tape: true, left: '6%', top: 20, float: 5.4 },
  { nombre: 'familia2', caption: 'nosotros, otra vez', width: 258, ratio: 'wide', rotate: 2, tape: true, left: '55%', top: 75, float: 6.2 },
];

const COLLAGE_NOTAS = [
  { t: 'somos cinco', left: '13%', top: 310, r: -3, size: '1.35rem' },
  { t: '✦', left: '46%', top: 45, r: 0, size: '1.3rem' },
  { t: '♡', left: '48%', top: 250, r: 0, size: '1.4rem' },
  { t: '❀', left: '88%', top: 360, r: 8, size: '1.5rem' },
];

function CollageFamilia() {
  return (
    <div className="collage-familia">
      {COLLAGE_FOTOS.map((c, i) => (
        <motion.div
          key={c.nombre}
          className="collage-item"
          style={{ left: c.left, top: c.top }}
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: c.float, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        >
          <Polaroid nombre={c.nombre} caption={c.caption} width={c.width} ratio={c.ratio} rotate={c.rotate} tape={c.tape} emoji="🏡" />
        </motion.div>
      ))}

      {COLLAGE_NOTAS.map((n, i) => (
        <motion.span
          key={`${n.t}-${i}`}
          className="collage-nota"
          style={{ left: n.left, top: n.top, rotate: `${n.r}deg`, fontSize: n.size }}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.12, type: 'spring', bounce: 0.5 }}
        >
          {n.t}
        </motion.span>
      ))}
    </div>
  );
}

// sandra y kike: no salen en el árbol, pero son familia igual
function FamiliaElegida() {
  return (
    <div
      className="scrolly-block"
      style={{ display: 'flex', flexWrap: 'wrap', gap: '56px 72px', justifyContent: 'center', alignItems: 'flex-start', marginTop: '5vh' }}
    >
      <motion.div
        style={{ maxWidth: 250, textAlign: 'center' }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <Polaroid nombre="sandra" caption="sandra ♡" width={215} ratio="square" rotate={-2.5} tape emoji="🌷" style={{ margin: '0 auto' }} />
        <p className="hand" style={{ fontSize: '1.35rem', margin: '1.4rem 0 0' }}>gracias por cuidarme desde que era bebé.</p>
      </motion.div>

      <motion.div
        style={{ maxWidth: 280, textAlign: 'center' }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      >
        <div style={{ position: 'relative', width: 245, margin: '0 auto' }}>
          <span className="washi washi--dorado" style={{ top: -13, left: '50%', translate: '-50% 0', rotate: '-4deg', zIndex: 2 }} />
          <Polaroid nombre="kike" caption="kike ♡" width={245} ratio="wide" rotate={1.5} className="polaroid--vintage" emoji="🤍" />
        </div>
        <p className="hand" style={{ fontSize: '1.35rem', margin: '1.4rem 0 0' }}>aunque ya no estés aquí, siempre te llevo conmigo.</p>
      </motion.div>
    </div>
  );
}

export default function Familia() {
  return (
    <section id="familia" data-capitulo="familia" className="chapter">
      <Reveal>
        <p className="chapter-kicker">capítulo dos</p>
        <h2 className="chapter-title">la gente que siempre estuvo desde el capítulo uno ❤️</h2>
        <p className="chapter-sub">
          antes de seguir tengo que presentar al elenco principal: mi familia — los de sangre, y los que se
          volvieron familia.
        </p>
      </Reveal>

      <FamilyTree />

      <Reveal style={{ textAlign: 'center', paddingTop: '8vh' }}>
        <p className="hand">y estos son algunos de nuestros recuerdos:</p>
      </Reveal>

      <CollageFamilia />

      <Reveal style={{ textAlign: 'center', paddingTop: '9vh' }}>
        <p className="hand" style={{ fontSize: '1.6rem' }}>y hay dos personas que no salen en el árbol, pero son familia:</p>
      </Reveal>

      <FamiliaElegida />
    </section>
  );
}
