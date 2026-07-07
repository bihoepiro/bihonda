import { motion } from 'framer-motion';
import Polaroid from '../components/Polaroid.jsx';
import Reveal from '../components/Reveal.jsx';

// árbol familiar dibujado como en un diario: polaroids chuecas,
// líneas a mano que unen a los papás con nosotros, y notas al margen.
const ARBOL_FOTOS = [
  { nombre: 'papi_y_yo', caption: 'papá', width: 150, rotate: -4, tape: true, left: '13%', top: 10 },
  { nombre: 'mami_y_yo', caption: 'mamá', width: 150, rotate: 3.5, tape: true, left: '56%', top: 0 },
  { nombre: 'bryan', caption: 'bryan', width: 148, rotate: 3, left: '4%', top: 420 },
  { nombre: 'tania', caption: 'tania', width: 148, rotate: -3, tape: true, left: '38%', top: 445 },
  { nombre: 'fotoprincipal', caption: 'yo', width: 148, rotate: 4, left: '72%', top: 415 },
];

const ARBOL_LINEAS = [
  // papá y mamá bajan y se encuentran
  { d: 'M212 268 C 204 315, 320 300, 358 320 S 425 335 438 338', delay: 0.3 },
  { d: 'M663 258 C 672 308, 545 305, 508 322 S 458 340 442 338', delay: 0.45 },
  // y de ahí salimos los tres
  { d: 'M438 340 C 375 372, 178 355, 122 415', delay: 1.0 },
  { d: 'M440 340 C 444 375, 468 400, 470 440', delay: 1.2 },
  { d: 'M442 340 C 525 372, 762 352, 828 410', delay: 1.4 },
];

const ARBOL_NOTAS = [
  { t: 'mi fan número uno', left: '4%', top: 288, r: -5, size: '1.25rem' },
  { t: 'la más trabajadora del mundo', left: '68%', top: 278, r: 4, size: '1.25rem' },
  { t: '♡', left: '41%', top: 296, r: 0, size: '1.7rem' },
  { t: 'primero ellos', left: '36%', top: 120, r: -3, size: '1.3rem' },
  { t: 'y después nosotros', left: '46%', top: 372, r: 2, size: '1.3rem' },
  { t: 'el culpable de gran parte de mi personalidad', left: '0%', top: 700, r: -3, size: '1.1rem' },
  { t: 'mi hermana mayor y mejor amiga ♡', left: '34%', top: 715, r: 2, size: '1.15rem' },
  { t: 'la última en llegar', left: '73%', top: 692, r: -4, size: '1.2rem' },
  { t: '✦', left: '30%', top: 40, r: 0, size: '1.3rem' },
  { t: '✦', left: '90%', top: 330, r: 0, size: '1.4rem' },
];

function ArbolFamiliar() {
  return (
    <div className="arbol-familia">
      <svg className="arbol-lineas" viewBox="0 0 1050 745" preserveAspectRatio="none" aria-hidden="true">
        {ARBOL_LINEAS.map((l, i) => (
          <motion.path
            key={i}
            d={l.d}
            fill="none"
            stroke="var(--lila)"
            strokeWidth="2.2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.85 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ delay: l.delay, duration: 0.9, ease: 'easeInOut' }}
          />
        ))}
      </svg>

      {ARBOL_FOTOS.map((c, i) => (
        <motion.div
          key={c.nombre}
          className="collage-item"
          style={{ left: c.left, top: c.top }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5.4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        >
          <Polaroid nombre={c.nombre} caption={c.caption} width={c.width} rotate={c.rotate} tape={c.tape} emoji="🏡" />
        </motion.div>
      ))}

      {ARBOL_NOTAS.map((n, i) => (
        <motion.span
          key={`${n.t}-${i}`}
          className="collage-nota"
          style={{ left: n.left, top: n.top, rotate: `${n.r}deg`, fontSize: n.size }}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.12, type: 'spring', bounce: 0.5 }}
        >
          {n.t}
        </motion.span>
      ))}
    </div>
  );
}

// debajo del árbol: los recuerdos en grupo, sandra y kike
const COLLAGE_FOTOS = [
  { nombre: 'familiacompleta', caption: 'el elenco completo', width: 280, ratio: 'wide', rotate: -3, tape: true, left: '3%', top: 0, float: 5.4 },
  { nombre: 'sandra', caption: 'sandra ♡', width: 195, ratio: 'square', rotate: 2.5, tape: true, left: '40%', top: 55, float: 5.8 },
  { nombre: 'familia2', caption: 'nosotros, otra vez', width: 262, ratio: 'wide', rotate: 2, tape: true, left: '66%', top: 15, float: 6.2 },
];

const COLLAGE_NOTAS = [
  { t: 'somos cinco', left: '9%', top: 268, r: -3, size: '1.35rem' },
  { t: 'mi segunda mamá ♡', left: '40%', top: 348, r: 2, size: '1.25rem' },
  { t: 'me cuida desde bebé', left: '42%', top: 378, r: 2, size: '1.05rem' },
  { t: '♡', left: '62%', top: 300, r: 0, size: '1.4rem' },
  { t: '✦', left: '31%', top: 40, r: 0, size: '1.3rem' },
  { t: '❀', left: '30%', top: 520, r: 8, size: '1.5rem' },
  { t: 'mi segundo papá. siempre conmigo ♡', left: '60%', top: 528, r: -3, size: '1.35rem' },
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

      {/* kike: un lugar especial, quieto y con marco antiguo */}
      <motion.div
        className="collage-item"
        style={{ left: '36%', top: 420 }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      >
        <div style={{ position: 'relative' }}>
          <span className="washi washi--dorado" style={{ top: -13, left: '50%', translate: '-50% 0', rotate: '-4deg', zIndex: 2 }} />
          <Polaroid nombre="kike" caption="kike ♡" width={245} ratio="wide" rotate={-1.5} className="polaroid--vintage" emoji="🤍" />
        </div>
      </motion.div>

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

      <ArbolFamiliar />

      <Reveal style={{ textAlign: 'center', paddingTop: '8vh' }}>
        <p className="hand">y estos son algunos de nuestros recuerdos:</p>
      </Reveal>

      <CollageFamilia />
    </section>
  );
}
