import { useMemo } from 'react';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
import { motion } from 'framer-motion';
import Polaroid from '../components/Polaroid.jsx';
import Reveal from '../components/Reveal.jsx';

const W = 760;
const H = 300;

export default function Carrera() {
  const { nodes, links } = useMemo(() => {
    const gen = sankey()
      .nodeWidth(14)
      .nodePadding(40)
      .extent([
        [10, 20],
        [W - 10, H - 20],
      ]);
    return gen({
      nodes: [
        { name: 'bioingeniería' },
        { name: 'cambio de carrera' },
        { name: 'data science' },
        { name: 'belcorp' },
      ].map((d) => ({ ...d })),
      links: [
        { source: 0, target: 1, value: 10 },
        { source: 1, target: 2, value: 14 },
        { source: 2, target: 3, value: 18 },
      ].map((d) => ({ ...d })),
    });
  }, []);

  const path = sankeyLinkHorizontal();

  return (
    <section id="data-science" data-capitulo="data-science" className="chapter tech-bg" style={{ maxWidth: 'none' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <p className="chapter-kicker">capítulo seis</p>
          <h2 className="chapter-title">spoiler: estaba en la carrera equivocada.</h2>
        </Reveal>

        <div className="scrolly-block prose">
          <Reveal>
            <p className="big">entré a utec en bioingeniería.</p>
            <p>si soy completamente sincera... nunca terminé de sentir que pertenecía ahí.</p>
          </Reveal>
          <Polaroid nombre="bioingenieria" width={220} ratio="wide" rotate={-2} tape caption="mi era de bioingeniera" emoji="🧬" />
        </div>

        <div className="scrolly-block prose">
          <Reveal>
            <p>aprendí muchísimo. hice amigos.</p>
            <p className="big">pero siempre sentía que me faltaba algo.</p>
          </Reveal>
          <Polaroid nombre="laboratorio" width={220} ratio="wide" rotate={2.5} caption="horas y horas de laboratorio" emoji="🥼" />
        </div>

        <div className="scrolly-block">
          <Reveal>
            <p className="hand" style={{ textAlign: 'center' }}>y entonces el camino encontró otra ruta:</p>
          </Reveal>
          <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" role="img" aria-label="de bioingeniería a data science">
            {links.map((l, i) => (
              <motion.path
                key={i}
                d={path(l)}
                fill="none"
                stroke={i === 0 ? '#c8a2ff' : '#8e6bc8'}
                strokeOpacity={i === 0 ? 0.45 : 0.55}
                strokeWidth={Math.max(1, l.width)}
                initial={{ opacity: 0, pathLength: 0 }}
                whileInView={{ opacity: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.55 }}
              />
            ))}
            {nodes.map((n, i) => (
              <motion.g
                key={n.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.5 }}
              >
                <rect x={n.x0} y={n.y0} width={n.x1 - n.x0} height={n.y1 - n.y0} rx="6" fill="#5e4a8a" />
                <text
                  x={n.x0 < W / 2 ? n.x1 + 10 : n.x0 - 10}
                  y={(n.y0 + n.y1) / 2}
                  dy="0.35em"
                  textAnchor={n.x0 < W / 2 ? 'start' : 'end'}
                  style={{ fontFamily: 'var(--fraunces)', fontSize: 17, fontWeight: 600, fill: '#222' }}
                >
                  {n.name}
                </text>
              </motion.g>
            ))}
          </svg>
          <p className="chart-note">el flujo se hace más ancho porque la decisión fue ganando fuerza</p>
        </div>

        <div className="scrolly-block prose">
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
