import * as d3 from 'd3';
import { motion } from 'framer-motion';
import Polaroid from '../components/Polaroid.jsx';
import Reveal from '../components/Reveal.jsx';

const EVENTOS = [
  { emoji: '🤰', label: 'el anuncio' },
  { emoji: '👶', label: 'mi llegada' },
  { emoji: '🚗', label: 'mi primera aventura (4 meses)' },
  { emoji: '🥣', label: 'descubriendo nuevos sabores (6 meses)' },
  { emoji: '🎉', label: '22 años después...' },
];

const VIDA = [
  { etapa: 'nacimiento', pct: 100, emoji: '👶', nota: 'aparecí contra pronóstico' },
  { etapa: '4 meses', pct: 30, emoji: '🚗', nota: 'el accidente' },
  { etapa: '6 meses', pct: 20, emoji: '🥣', nota: 'la papilla traidora' },
  { etapa: '22 años', pct: 100, emoji: '🎉', nota: 'recuperación total' },
];

function SurvivalChart() {
  const W = 720;
  const H = 300;
  const x = d3.scalePoint().domain(VIDA.map((d) => d.etapa)).range([70, W - 60]);
  const y = d3.scaleLinear().domain([0, 100]).range([H - 60, 34]);
  const linea = d3
    .line()
    .x((d) => x(d.etapa))
    .y((d) => y(d.pct))
    .curve(d3.curveMonotoneX);
  const area = d3
    .area()
    .x((d) => x(d.etapa))
    .y0(y(0))
    .y1((d) => y(d.pct))
    .curve(d3.curveMonotoneX);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" role="img" aria-label="mi barra de vida en los primeros meses">
      {/* guías de 0/50/100% */}
      {[0, 50, 100].map((v) => (
        <g key={v}>
          <line x1={60} x2={W - 40} y1={y(v)} y2={y(v)} stroke="#efe9f8" strokeWidth="1" />
          <text x={50} y={y(v) + 4} textAnchor="end" style={{ fontFamily: 'var(--sans)', fontSize: 12, fill: '#9a9a9a' }}>
            {v}%
          </text>
        </g>
      ))}

      <motion.path
        d={area(VIDA)}
        fill="#f4effc"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.9 }}
      />
      <motion.path
        d={linea(VIDA)}
        fill="none"
        stroke="#8e6bc8"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      />

      {VIDA.map((d, i) => (
        <motion.g
          key={d.etapa}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 * i + 0.3, type: 'spring', bounce: 0.5 }}
        >
          <circle cx={x(d.etapa)} cy={y(d.pct)} r={14} fill="#fff" stroke="#8e6bc8" strokeWidth="1.5" />
          <text x={x(d.etapa)} y={y(d.pct) + 5} textAnchor="middle" fontSize="14">
            {d.emoji}
          </text>
          <text
            x={x(d.etapa)}
            y={y(d.pct) + (d.pct > 50 ? -24 : -24)}
            textAnchor="middle"
            style={{ fontFamily: 'var(--hand)', fontSize: 15, fill: '#5e4a8a' }}
          >
            {d.nota}
          </text>
          <text x={x(d.etapa)} y={H - 30} textAnchor="middle" style={{ fontFamily: 'var(--fraunces)', fontSize: 14, fill: '#6b6b6b' }}>
            {d.etapa}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

function IconoRebote({ emoji, label, delay = 0 }) {
  return (
    <motion.div
      style={{ textAlign: 'center', flex: 1 }}
      initial={{ opacity: 0, scale: 0.3 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', bounce: 0.55, duration: 0.8, delay }}
    >
      <div style={{ fontSize: '2.4rem' }}>{emoji}</div>
      <div className="nota-pequena">{label}</div>
    </motion.div>
  );
}

export default function PlotTwists() {
  return (
    <section id="plot-twists" data-capitulo="plot-twists" className="chapter">
      <Reveal>
        <p className="chapter-kicker">capítulo uno</p>
        <h2 className="chapter-title">¿por dónde empieza una vida?</h2>
      </Reveal>

      <div className="tl-horizontal">
        {EVENTOS.map((e, i) => (
          <IconoRebote key={e.label} emoji={e.emoji} label={e.label} delay={i * 0.18} />
        ))}
        <div
          style={{
            position: 'absolute',
            left: '6%',
            right: '6%',
            top: 26,
            height: 2,
            background: 'var(--linea)',
            zIndex: -1,
          }}
        />
      </div>

      <div className="scrolly-block prose">
        <Reveal>
          <p className="big">antes de empezar... tengo que contar un pequeño detalle.</p>
          <p>
            a mi mamá le habían dicho que ya no podía tener más hijos.
            <br />
            claramente decidí aparecer igual.
          </p>
        </Reveal>
        <Polaroid nombre="ecografia" caption="mi primera foto, técnicamente" rotate={-3} tape emoji="🤍" />
      </div>

      <div className="scrolly-block prose">
        <Reveal>
          <p>
            todo iba bastante bien...
            <br />
            hasta que a los cuatro meses tuve un accidente automovilístico.
          </p>
          <p className="big">casi me voy.</p>
        </Reveal>
        <Polaroid nombre="3mese" caption="3 meses, todavía sin enterarme de nada" rotate={2.5} emoji="👶" />
      </div>

      <div className="scrolly-block prose">
        <Reveal>
          <p>bueno... sobreviví.</p>
          <p>
            pero a los seis meses probé mi primera papilla.
            <br />
            resultó que era alérgica a heinz.
          </p>
          <p className="big">otra vez casi me voy.</p>
        </Reveal>
        <Polaroid nombre="yo_6_meses" caption="6 meses y ya con historial médico" rotate={-2} tape emoji="🍼" />
      </div>

      <Reveal className="scrolly-block">
        <p className="big prose" style={{ fontFamily: 'var(--serif)', fontSize: '2rem' }}>
          mi historia empieza fuerte jajaja.
        </p>
      </Reveal>

      <div className="survival" style={{ maxWidth: 780 }}>
        <Reveal>
          <p className="hand">survival meter (mi barra de vida, versión no oficial)</p>
        </Reveal>
        <SurvivalChart />
      </div>

      {/* la línea del timeline se estira y se vuelve el tronco del árbol familiar */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{
          width: 2,
          height: '14vh',
          background: 'var(--lila)',
          margin: '6vh auto 0',
          transformOrigin: 'top',
        }}
      />
    </section>
  );
}
