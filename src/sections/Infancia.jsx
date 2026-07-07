import { useEffect, useState } from 'react';
import cloud from 'd3-cloud';
import { motion, AnimatePresence } from 'framer-motion';
import Polaroid from '../components/Polaroid.jsx';
import Reveal from '../components/Reveal.jsx';
import Conector from '../components/Conector.jsx';

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
  vicky: { fotos: ['vicky', 'vicky2'], texto: 'y gran parte de mis vacaciones a trujillo las pasaba con mi prima vicky.' },
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

const COLLAGE = [
  { nombre: 'vestido_lila', caption: 'el famoso vestido lila', width: 220, rotate: -4, tape: true, left: '0%', top: 40, float: 5.2 },
  { nombre: 'cantando', caption: 'mi era de artista', width: 205, rotate: 3.5, left: '21%', top: 190, float: 6.1 },
  { nombre: '1anio', caption: 'mi primer añito', width: 225, rotate: -2.5, tape: true, left: '44%', top: 10, float: 5.6 },
  { nombre: 'collage_yobebe', caption: 'mini yo', width: 230, rotate: 4, left: '68%', top: 170, float: 6.6 },
];

const NOTAS = [
  { texto: 'bailaba ♪', left: '13%', top: 6, rotate: -6, delay: 0.5, size: '1.5rem' },
  { texto: 'cantaba a todo volumen', left: '26%', top: 545, rotate: 3, delay: 0.75, size: '1.35rem' },
  { texto: 'todo era lila', left: '3%', top: 430, rotate: -5, delay: 1, size: '1.4rem' },
  { texto: 'banda sonora: nickelodeon', left: '66%', top: 96, rotate: 4, delay: 1.15, size: '1.25rem' },
  { texto: '✦', left: '39%', top: 100, rotate: 0, delay: 1.3, size: '1.5rem' },
  { texto: '✦', left: '64%', top: 40, rotate: 0, delay: 1.45, size: '1.1rem' },
  { texto: '❀', left: '95%', top: 130, rotate: 10, delay: 1.55, size: '1.4rem' },
  { texto: '✦', left: '17%', top: 500, rotate: 0, delay: 1.65, size: '1.2rem' },
  { texto: '♡', left: '92%', top: 540, rotate: -8, delay: 1.75, size: '1.5rem' },
];

function CollageInfancia() {
  return (
    <div className="collage-infancia">
      {COLLAGE.map((c, i) => (
        <motion.div
          key={c.nombre}
          className="collage-item"
          style={{ left: c.left, top: c.top }}
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: c.float, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
        >
          <Polaroid nombre={c.nombre} caption={c.caption} width={c.width} rotate={c.rotate} tape={c.tape} emoji="🧸" />
        </motion.div>
      ))}

      {NOTAS.map((n, i) => (
        <motion.span
          key={`${n.texto}-${i}`}
          className="collage-nota"
          style={{ left: n.left, top: n.top, rotate: `${n.rotate}deg`, fontSize: n.size }}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: n.delay, type: 'spring', bounce: 0.5 }}
        >
          {n.texto}
        </motion.span>
      ))}

      {/* flechita dibujada a mano: de la nota "todo era lila" hacia el vestido */}
      <svg className="collage-doodle" viewBox="0 0 90 70" style={{ left: '7.5%', top: 372, width: 64 }}>
        <motion.path
          d="M70 62 C 62 40, 42 26, 18 14"
          fill="none"
          stroke="#8e6bc8"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.7, ease: 'easeOut' }}
        />
        <motion.path
          d="M30 10 L 18 14 L 26 25"
          fill="none"
          stroke="#8e6bc8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.85, duration: 0.3 }}
        />
      </svg>
    </div>
  );
}

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
    <section id="infancia" data-capitulo="infancia" className="chapter">
      <Reveal>
        <p className="chapter-kicker">capítulo cuatro</p>
        <h2 className="chapter-title">mi infancia en pocas palabras</h2>
        <p className="chapter-sub">
          dejando de lado mis intentos de abandonar este mundo cuando era bebé... tuve una infancia muy feliz.
        </p>
      </Reveal>

      <CollageInfancia />

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

      <Conector lado="derecha" />

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
