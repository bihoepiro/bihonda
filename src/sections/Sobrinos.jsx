import { useState } from 'react';
import { motion } from 'framer-motion';
import Polaroid from '../components/Polaroid.jsx';
import Reveal from '../components/Reveal.jsx';
import Conector from '../components/Conector.jsx';

const SOBRINOS = [
  { nombre: 'fabi', anio: 2012, edad: '14 años', antes: 'fabi_pasado', ahora: 'fabi_presente', emojiAntes: '👶', emojiAhora: '👧', pct: 100 },
  { nombre: 'luisito', anio: 2019, edad: '7 añitos', antes: 'luisito_antes', ahora: 'luisito_presente', emojiAntes: '👶', emojiAhora: '👦', pct: 50 },
  { nombre: 'consuelito', anio: 2023, edad: '3 añitos', antes: 'consuelito_antes', ahora: 'consuelito_presente', emojiAntes: '👶', emojiAhora: '👧', pct: 22 },
];

function GrowthLine({ s, delay }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 18, alignItems: 'center', marginBottom: 26, position: 'relative' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setHover((h) => !h)}
    >
      <span className="survival-label" style={{ fontSize: '1.25rem' }}>
        {s.nombre}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: '1.5rem' }}>{s.emojiAntes}</span>
        <div style={{ flex: 1, height: 8, background: 'var(--lavanda)', borderRadius: 99, overflow: 'hidden' }}>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: s.pct / 100 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay, ease: 'easeOut' }}
            style={{ height: '100%', background: 'linear-gradient(90deg, var(--lila), var(--lila-deep))', transformOrigin: 'left', borderRadius: 99 }}
          />
        </div>
        <span style={{ fontSize: '1.5rem' }}>{s.emojiAhora}</span>
        {hover && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="hand"
            style={{ position: 'absolute', right: 0, top: -30 }}
          >
            hoy: {s.edad} 🎂
          </motion.span>
        )}
      </div>
    </div>
  );
}

export default function Sobrinos() {
  return (
    <section id="sobrinos" data-capitulo="familia" className="chapter">
      <Reveal>
        <p className="chapter-kicker">capítulo tres</p>
        <h2 className="chapter-title">y entonces llegaron ellos.</h2>
      </Reveal>

      <div className="scrolly-block prose bloque-zz">
        <Reveal>
          <p className="hand" style={{ fontSize: '1.9rem', margin: '0 0 0.5rem' }}>fabianne</p>
          <p className="big">en el 2012 llegó alguien que cambió completamente mi vida.</p>
          <p>
            fabianne es, técnicamente, mi sobrina.
            <br />
            pero nunca la sentí solo como mi sobrina.
          </p>
          <p className="big">siempre fue la hermanita menor que nunca tuve.</p>
        </Reveal>
        <div className="foto-fila">
          <Polaroid nombre="fabi_pasado" width={190} rotate={-3} tape caption="fabianne de bebé" emoji="🍼" />
          <Polaroid nombre="fabi_presente" width={190} rotate={2.5} caption="fabianne hoy" emoji="🌟" style={{ marginTop: 26 }} />
        </div>
      </div>

      <Conector lado="izquierda" nota="siete años después..." />

      <div className="scrolly-block prose bloque-zz bloque-zz--inv">
        <Reveal>
          <p className="hand" style={{ fontSize: '1.9rem', margin: '0 0 0.5rem' }}>luisito</p>
          <p className="big">en el 2019 llegó luisito.</p>
          <p>
            desde que nació, se convirtió en una de mis personas favoritas.
            <br />
            no sé cómo explicarlo, simplemente lo amo demasiado.
          </p>
        </Reveal>
        <div className="foto-fila">
          <Polaroid nombre="luisito_antes" width={190} rotate={2} caption="luisito de bebé" emoji="🍼" />
          <Polaroid nombre="luisito_presente" width={190} rotate={-2.5} tape caption="luisito hoy" emoji="⚽" style={{ marginTop: 26 }} />
        </div>
      </div>

      <Conector lado="derecha" nota="y todavía faltaba alguien" />

      <div className="scrolly-block prose bloque-zz">
        <Reveal>
          <p className="hand" style={{ fontSize: '1.9rem', margin: '0 0 0.5rem' }}>consuelito</p>
          <p className="big">y en el 2023 la familia volvió a crecer con la llegada de consuelito, mi ahijada.</p>
          <p>todavía siento que hace nada era un bebé, pero ya está creciendo demasiado rápido.</p>
        </Reveal>
        <div className="foto-fila">
          <Polaroid nombre="consuelito_antes" width={190} rotate={-2} caption="consuelito de bebé" emoji="🍼" />
          <Polaroid nombre="consuelito_presente" width={190} rotate={3} tape caption="consuelito hoy" emoji="🎀" style={{ marginTop: 26 }} />
        </div>
      </div>

      <Conector lado="izquierda" />

      <Reveal className="scrolly-block prose">
        <p className="big">y bueno... ahora la casa siempre tiene alguien corriendo por ahí.</p>
      </Reveal>

      <div style={{ maxWidth: 640, margin: '6vh 0' }}>
        <Reveal>
          <p className="hand">growth timeline (crecen demasiado rápido)</p>
        </Reveal>
        {SOBRINOS.map((s, i) => (
          <GrowthLine key={s.nombre} s={s} delay={i * 0.3} />
        ))}
      </div>

      <div className="foto-fila" style={{ justifyContent: 'center' }}>
        <Polaroid nombre="sobrinos" width={210} ratio="wide" rotate={-2} caption="los tres" emoji="🧸" />
        <Polaroid nombre="sobrinos2" width={210} ratio="wide" rotate={2.5} tape caption="caos hermoso" emoji="🎈" />
        <Polaroid nombre="sobrinos_y_yo" width={210} ratio="wide" rotate={-1} caption="la tía favorita (yo)" emoji="💜" />
      </div>
    </section>
  );
}
