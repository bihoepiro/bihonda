import { useEffect, useState } from 'react';
import cloud from 'd3-cloud';
import { motion, AnimatePresence } from 'framer-motion';
import Polaroid from '../components/Polaroid.jsx';
import Reveal from '../components/Reveal.jsx';

const PALABRAS = [
  { text: 'bryan', size: 52 },
  { text: 'harry potter', size: 42 },
  { text: 'nickelodeon', size: 38 },
  { text: 'nena', size: 34 },
  { text: 'aixa', size: 32 },
  { text: 'lila', size: 30 },
  { text: 'vicky', size: 28 },
  { text: 'relatos mágicos', size: 26 },
  { text: 'fer', size: 24 },
  { text: 'valeria', size: 24 },
];

const HISTORIAS = {
  bryan: {
    fotos: ['bryan_infancia', 'bryan'],
    texto:
      'si hoy me gusta harry potter... o todavía hago referencias a icarly, drake & josh y hey arnold... gran parte de la culpa la tiene bryan.',
    chips: ['harry potter', 'nickelodeon', 'relatos mágicos', 'drake & josh', 'icarly', 'hey arnold'],
    chipsTitulo: 'todo lo que me pegó:',
  },
  'harry potter': { fotos: ['bryan_infancia'], texto: 'mi primera gran obsesión. gracias bryan ⚡' },
  nickelodeon: { fotos: ['cantando'], texto: 'mi infancia entera tuvo banda sonora de nickelodeon.' },
  aixa: {
    fotos: ['aixa_pasado', 'aixa_presente'],
    texto: 'aixa fue mi mejor amiga de la infancia. algunas amistades se van, pero la nuestra simplemente creció.',
  },
  fer: {
    fotos: ['fer_valeria'],
    texto:
      'gran parte de mi infancia también la pasé jugando con fer y valeria. creo que ninguno imaginaba lo rápido que iba a pasar el tiempo.',
  },
  valeria: {
    fotos: ['fer_valeria'],
    texto:
      'gran parte de mi infancia también la pasé jugando con fer y valeria. creo que ninguno imaginaba lo rápido que iba a pasar el tiempo.',
  },
  vicky: { fotos: ['vicky'], texto: 'y gran parte de mis vacaciones a trujillo las pasaba con mi prima vicky.' },
  nena: {
    fotos: ['nena1', 'nena2'],
    texto: 'y en el 2016 llegó nena. una bichón maltés que decidió convertirse en la dueña absoluta de la casa. 🐾',
  },
  lila: {
    fotos: ['vestido_lila'],
    texto: 'durante muchos años estuve convencida de que el lila era el mejor color del universo.',
  },
  'relatos mágicos': { fotos: ['bryan_infancia'], texto: 'los leíamos con bryan hasta quedarnos dormidos.' },
};

const W = 760;
const H = 440;

function WordCloud({ onSelect, activa }) {
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    cloud()
      .size([W, H])
      .words(PALABRAS.map((d) => ({ ...d })))
      .padding(22)
      .rotate(() => 0)
      .font('Georgia')
      .fontSize((d) => d.size)
      .random(() => 0.5)
      .on('end', setLayout)
      .start();
  }, []);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" role="img" aria-label="palabras de mi infancia">
      <g transform={`translate(${W / 2},${H / 2})`}>
        {layout.map((w, i) => (
          // el <g> lleva la posición (atributo svg) y framer solo anima
          // opacidad — si framer tocara transform, las palabras se apilan
          <g key={w.text} transform={`translate(${w.x},${w.y})`}>
            <motion.text
              textAnchor="middle"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              style={{
                fontFamily: 'var(--fraunces)',
                fontSize: w.size,
                fontWeight: 600,
                fill: activa === w.text ? '#8e6bc8' : '#5e4a8a',
                opacity: activa && activa !== w.text ? 0.35 : 1,
                cursor: 'pointer',
                transition: 'fill .3s',
              }}
              onMouseEnter={() => onSelect(w.text)}
              onClick={() => onSelect(w.text)}
            >
              {w.text}
            </motion.text>
          </g>
        ))}
      </g>
    </svg>
  );
}

export default function Infancia() {
  const [activa, setActiva] = useState('bryan');
  const historia = HISTORIAS[activa];

  return (
    <section id="infancia" data-capitulo="infancia" className="chapter chapter--wide">
      <Reveal>
        <p className="chapter-kicker">capítulo cuatro</p>
        <h2 className="chapter-title">mi infancia en pocas palabras</h2>
      </Reveal>

      <div className="prose scrolly-block" style={{ marginTop: '4vh' }}>
        <Reveal>
          <p>dejando de lado mis intentos de abandonar este mundo cuando era bebé...</p>
          <p className="big">tuve una infancia muy feliz.</p>
          <p>
            bailaba. cantaba. y durante muchos años estuve convencida de que el lila era el mejor color del
            universo.
          </p>
        </Reveal>
        <div className="foto-fila">
          <Polaroid nombre="vestido_lila" width={190} rotate={-2.5} tape caption="el famoso vestido lila" emoji="💜" />
          <Polaroid nombre="cantando" width={190} rotate={2} caption="mi era de artista" emoji="🎤" />
        </div>
      </div>

      <Reveal>
        <p className="hand" style={{ fontSize: '1.6rem', marginBottom: 0 }}>
          cada palabra guarda un recuerdo
        </p>
      </Reveal>

      <div className="dos-columnas" style={{ marginTop: '2vh' }}>
        <WordCloud onSelect={setActiva} activa={activa} />

        <div style={{ minHeight: 380, paddingTop: 12 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activa}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
                {historia.fotos.map((f, i) => (
                  <Polaroid key={f} nombre={f} width={155} rotate={i % 2 ? 3 : -3} drop={false} instant emoji="🧸" />
                ))}
              </div>
              <p className="big" style={{ marginTop: 18, maxWidth: 420, fontFamily: 'var(--fraunces)' }}>
                {historia.texto}
              </p>
              {historia.chips && (
                <div style={{ marginTop: 6 }}>
                  <p className="hand" style={{ margin: '0 0 8px' }}>{historia.chipsTitulo}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {historia.chips.map((c, i) => (
                      <motion.span
                        key={c}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15 + i * 0.08, type: 'spring', bounce: 0.4 }}
                        style={{
                          background: '#f4effc',
                          border: '1px solid #d9cdf0',
                          color: '#5e4a8a',
                          borderRadius: 99,
                          padding: '5px 14px',
                          fontFamily: 'var(--hand)',
                          fontSize: '1.05rem',
                        }}
                      >
                        {c}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* transición: solo queda una palabra */}
      <Reveal className="scrolly-block" style={{ textAlign: 'center', padding: '10vh 0 4vh' }}>
        <p className="nota-pequena">poco a poco las palabras desaparecen... y solo queda una.</p>
        <motion.p
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(3rem, 9vw, 6rem)',
            margin: '2rem 0 0',
            color: 'var(--lila-ink)',
          }}
        >
          la salle
        </motion.p>
      </Reveal>
    </section>
  );
}
