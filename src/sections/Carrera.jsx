import { motion } from 'framer-motion';
import Polaroid from '../components/Polaroid.jsx';
import Reveal from '../components/Reveal.jsx';
import Conector from '../components/Conector.jsx';

const W = 800;
const H = 150;

const PASOS = [
  { label: 'bioingeniería', anio: '2021' },
  { label: 'cambio de carrera', anio: '2023' },
  { label: 'data science', anio: '2023' },
  { label: 'belcorp', anio: '2025' },
];

export default function Carrera() {

  return (
    <section id="data-science" data-capitulo="data-science" className="chapter tech-bg" style={{ maxWidth: 'none' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <p className="chapter-kicker">capítulo seis</p>
          <h2 className="chapter-title">spoiler: estaba en la carrera equivocada.</h2>
        </Reveal>

        <div className="scrolly-block prose bloque-zz">
          <Reveal>
            <p className="big">entré a utec en bioingeniería.</p>
            <p>si soy completamente sincera... nunca terminé de sentir que pertenecía ahí.</p>
          </Reveal>
          <Polaroid nombre="bioingenieria" width={220} ratio="wide" rotate={-2} tape caption="mi era de bioingeniera" emoji="🧬" />
        </div>

        <Conector lado="derecha" />

        <div className="scrolly-block prose bloque-zz bloque-zz--inv">
          <Reveal>
            <p>aprendí muchísimo. hice amigos.</p>
            <p className="big">pero siempre sentía que me faltaba algo.</p>
          </Reveal>
          <Polaroid nombre="laboratorio" width={220} ratio="wide" rotate={2.5} caption="horas y horas de laboratorio" emoji="🥼" />
        </div>

        <Conector lado="izquierda" nota="hasta que..." />

        <div className="scrolly-block">
          <Reveal>
            <p className="hand" style={{ textAlign: 'center' }}>mi ruta, resumida:</p>
          </Reveal>
          <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" role="img" aria-label="de bioingeniería a data science">
            <motion.line
              x1={70}
              y1={70}
              x2={W - 70}
              y2={70}
              stroke="#d9cdf0"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            />
            {PASOS.map((p, i) => {
              const x = 70 + (i * (W - 140)) / (PASOS.length - 1);
              const ultimo = i === PASOS.length - 1;
              return (
                <motion.g
                  key={p.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.4, type: 'spring', bounce: 0.45 }}
                >
                  <circle cx={x} cy={70} r={ultimo ? 10 : 7} fill={ultimo ? '#5e4a8a' : '#fff'} stroke="#8e6bc8" strokeWidth="2" />
                  <text x={x} y={42} textAnchor="middle" style={{ fontFamily: 'var(--fraunces)', fontSize: 14, fill: '#6b6b6b' }}>
                    {p.anio}
                  </text>
                  <text x={x} y={104} textAnchor="middle" style={{ fontFamily: 'var(--hand)', fontSize: 18, fill: '#5e4a8a' }}>
                    {p.label}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>

        <Conector lado="derecha" />

        <div className="scrolly-block prose bloque-zz">
          <Reveal>
            <p className="big">en el 2023 decidí cambiarme de carrera.</p>
            <p className="big" style={{ color: 'var(--lila-deep)' }}>
              hasta hoy sigue siendo la mejor decisión que he tomado.
            </p>
          </Reveal>
          <Polaroid nombre="datascience" width={240} ratio="wide" rotate={-2} tape caption="ahora sí: mi lugar" emoji="📊" />
        </div>
      </div>
    </section>
  );
}
