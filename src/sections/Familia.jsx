import { motion } from 'framer-motion';
import Polaroid from '../components/Polaroid.jsx';
import Reveal from '../components/Reveal.jsx';

// página de scrapbook familiar: fotos superpuestas, notas manuscritas
// y pequeños doodles que unen a cada quien con su lugar en la familia.
const FOTOS = [
  { nombre: 'familiacompleta', caption: 'el elenco completo', width: 290, ratio: 'wide', rotate: -2, tape: true, left: '29%', top: 0, float: 5.4 },
  { nombre: 'papi_y_yo', caption: 'papi y yo', width: 195, rotate: -5, tape: true, left: '2%', top: 55, float: 6.2 },
  { nombre: 'mami_y_yo', caption: 'mami y yo', width: 195, rotate: 4, left: '73%', top: 50, float: 5.8 },
  { nombre: 'bryan', caption: 'bryan', width: 185, rotate: 3.5, tape: true, left: '7%', top: 455, float: 6.6 },
  { nombre: 'tania', caption: 'tania', width: 185, rotate: -3.5, left: '71%', top: 465, float: 5.6 },
  { nombre: 'familia2', caption: 'nosotros, otra vez', width: 262, ratio: 'wide', rotate: 2, tape: true, left: '33%', top: 505, float: 6.0 },
];

const NOTAS = [
  { t: 'mi fan número uno', left: '1%', top: 378, r: -5, size: '1.3rem' },
  { t: 'la más trabajadora del mundo', left: '69%', top: 372, r: 4, size: '1.3rem' },
  { t: 'somos cinco', left: '45%', top: 275, r: -3, size: '1.4rem' },
  { t: 'el culpable de gran parte de mi personalidad', left: '1%', top: 775, r: -3, size: '1.15rem' },
  { t: 'mi hermana mayor y mejor amiga ♡', left: '65%', top: 782, r: 3, size: '1.2rem' },
  { t: '♡', left: '26%', top: 92, r: 0, size: '1.6rem' },
  { t: '♡', left: '70%', top: 20, r: 0, size: '1.2rem' },
  { t: '✦', left: '25%', top: 330, r: 0, size: '1.4rem' },
  { t: '✦', left: '74%', top: 300, r: 0, size: '1.2rem' },
  { t: '❀', left: '30%', top: 900, r: 8, size: '1.5rem' },
  { t: 'conmigo desde el día uno ♡', left: '60%', top: 908, r: -3, size: '1.35rem' },
];

// pequeñas líneas a mano que unen a los papás con los hermanos
const HILOS = [
  { left: '9%', top: 368, path: 'M30 4 C 8 32, 46 56, 26 84' },
  { left: '82%', top: 360, path: 'M26 4 C 48 34, 12 58, 30 86' },
];

function CollageFamilia() {
  return (
    <div className="collage-familia">
      {FOTOS.map((c, i) => (
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
        style={{ left: '36%', top: 800 }}
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

      {NOTAS.map((n, i) => (
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

      {HILOS.map((h, i) => (
        <svg key={i} className="collage-doodle" style={{ left: h.left, top: h.top, width: 56, height: 90 }} viewBox="0 0 56 90">
          <motion.path
            d={h.path}
            fill="none"
            stroke="var(--lila)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.85 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 + i * 0.3, duration: 0.8, ease: 'easeOut' }}
          />
        </svg>
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
          antes de seguir tengo que presentar al elenco principal: mi familia. siempre he sentido que tuve
          mucha suerte con la que me tocó.
        </p>
      </Reveal>

      <CollageFamilia />
    </section>
  );
}
