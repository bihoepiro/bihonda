import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Polaroid from '../components/Polaroid.jsx';
import Reveal from '../components/Reveal.jsx';

const ETAPAS = [
  {
    id: 'mercedes',
    anio: '2024',
    nombre: 'mercedes-benz',
    cargo: 'practicante de datos',
    frase: 'mi primera experiencia profesional ❤️',
    color: '#222',
  },
  {
    id: 'belcorp-dp',
    anio: '2025',
    nombre: 'belcorp · data platform',
    cargo: 'practicante de data platform',
    frase: 'el lugar donde confirmé que esto era lo mío.',
    color: '#5e4a8a',
  },
  {
    id: 'belcorp-coe',
    anio: '2026',
    nombre: 'belcorp · analytics coe',
    cargo: 'practicante de data science',
    frase: 'todavía sigo escribiendo este capítulo.',
    color: '#8e6bc8',
  },
];

const PUNTOS_AMIGOS = [
  { x: 22, y: 30 }, { x: 45, y: 22 }, { x: 63, y: 38 }, { x: 78, y: 26 }, { x: 35, y: 55 }, { x: 58, y: 60 }, { x: 82, y: 52 },
];

function ExperienceLine() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.4'] });
  const cxPos = useTransform(scrollYProgress, [0, 1], [40, 760]);
  const hitos = [
    { x: 40, label: 'utec' },
    { x: 280, label: 'mercedes' },
    { x: 520, label: 'belcorp' },
    { x: 760, label: 'coe' },
  ];
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <svg viewBox="0 0 800 110" className="chart-svg" role="img" aria-label="mi camino profesional">
        <line x1="40" y1="55" x2="760" y2="55" stroke="#d9cdf0" strokeWidth="2" />
        {hitos.map((h) => (
          <g key={h.label}>
            <circle cx={h.x} cy={55} r={5} fill="#fff" stroke="#8e6bc8" strokeWidth="2" />
            <text x={h.x} y={92} textAnchor="middle" style={{ fontFamily: 'var(--hand)', fontSize: 17, fill: '#5e4a8a' }}>
              {h.label}
            </text>
          </g>
        ))}
        <motion.circle cx={cxPos} cy={55} r={9} fill="#8e6bc8" />
      </svg>
      <p className="chart-note">el puntito soy yo, avanzando mientras haces scroll</p>
    </div>
  );
}

function TarjetaEtapa({ etapa }) {
  return (
    <Reveal>
      <div className="career-card" style={{ borderTop: `4px solid ${etapa.color}`, cursor: 'default' }}>
        <span className="career-year">{etapa.anio}</span>
        <div className="career-nombre">{etapa.nombre}</div>
        <div className="career-cargo">{etapa.cargo}</div>
        <div className="career-frase">{etapa.frase}</div>
      </div>
    </Reveal>
  );
}

export default function Trabajo() {
  const [verPuntos, setVerPuntos] = useState(false);

  return (
    <section id="trabajo" data-capitulo="trabajo" className="chapter tech-bg" style={{ maxWidth: 'none' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <p className="chapter-kicker">capítulo ocho</p>
          <h2 className="chapter-title">¿cómo terminé trabajando en mercedes-benz... y después en belcorp?</h2>
        </Reveal>

        <div className="scrolly-block prose">
          <Reveal>
            <p className="big">en mayo del 2024 conseguí mis primeras prácticas.</p>
            <p>
              técnicamente fue divemotor...
              <br />
              pero decir mercedes-benz suena muchísimo más fancy.
            </p>
          </Reveal>
          <TarjetaEtapa etapa={ETAPAS[0]} />
          <div className="foto-fila">
            <Polaroid nombre="mercedes" width={200} ratio="wide" rotate={-2} tape caption="día uno" emoji="🚗" />
            <Polaroid nombre="mercedes_equipo" width={200} ratio="wide" rotate={2.5} caption="el equipo" emoji="🤝" />
          </div>
        </div>

        <div className="scrolly-block prose">
          <Reveal>
            <p className="big">en enero del 2025 empezó una etapa que significó muchísimo para mí: entré a belcorp.</p>
            <p>
              llegué al equipo de data platform. aprendí un montón, conocí personas increíbles y confirmé que
              realmente quería dedicarme a esto.
            </p>
          </Reveal>
          <TarjetaEtapa etapa={ETAPAS[1]} />
          <div className="foto-fila">
            <div
              style={{ position: 'relative', display: 'inline-block' }}
              onMouseEnter={() => setVerPuntos(true)}
              onMouseLeave={() => setVerPuntos(false)}
              onClick={() => setVerPuntos((v) => !v)}
            >
              <Polaroid nombre="belcorp_amigos" width={280} ratio="wide" rotate={-1.5} tape caption="cada punto es una persona que conocí en esta etapa" emoji="🫶" />
              {verPuntos &&
                PUNTOS_AMIGOS.map((p, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.06, type: 'spring', bounce: 0.5 }}
                    style={{
                      position: 'absolute',
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      width: 11,
                      height: 11,
                      borderRadius: '50%',
                      background: '#8e6bc8',
                      border: '2px solid #fff',
                      boxShadow: '0 2px 6px rgba(94,74,138,.4)',
                    }}
                  />
                ))}
            </div>
            <Polaroid nombre="belcorp_dp" width={240} ratio="wide" rotate={2} caption="más momentos con el equipo" emoji="💻" />
          </div>
        </div>

        <div className="scrolly-block prose">
          <Reveal>
            <p className="big">un año después llegó un nuevo reto.</p>
            <p>
              me cambié al equipo de analytics coe. volver a empezar daba un poco de miedo, pero también
              significaba aprender cosas nuevas y conocer a más personas.
            </p>
          </Reveal>
          <TarjetaEtapa etapa={ETAPAS[2]} />
          <div className="foto-fila">
            <Polaroid nombre="gaby" width={190} rotate={2} caption="con gaby" emoji="💐" />
            <Polaroid nombre="belcorp_mia" width={190} rotate={-2.5} tape caption="yo, en modo coe" emoji="💻" />
          </div>
        </div>

        <div className="scrolly-block">
          <ExperienceLine />
        </div>

        <Reveal style={{ textAlign: 'center' }}>
          <p className="nota-pequena">y de repente... la línea se convierte en una ruta aérea ✈️</p>
        </Reveal>
      </div>
    </section>
  );
}
