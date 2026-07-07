import { useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import Polaroid from '../components/Polaroid.jsx';
import Reveal from '../components/Reveal.jsx';
import { foto } from '../lib/fotos.js';

const spotifyPlaylist =
  'https://open.spotify.com/playlist/1BA6IztOv0g2tBndLzuyPf?si=PdW70y1eRBemxZobBWuZ0w&pi=uIXMIdEWR0ytu';

const WALL = [
  { nombre: 'collage_familia', left: '3%', top: '3%', rotate: -4, width: 235, caption: 'familia', emoji: '👨‍👩‍👧‍👦' },
  { nombre: 'collage_amigos', left: '33%', top: '0%', rotate: 3.5, width: 215, caption: 'amigos', emoji: '🫂' },
  { nombre: 'collage_ian', left: '64%', top: '5%', rotate: -2, width: 255, ian: true, emoji: '🤍' },
  { nombre: 'papas', left: '10%', top: '34%', rotate: 3, width: 200, caption: 'ellos dos', emoji: '💞' },
  { nombre: 'hermanos', left: '41%', top: '31%', rotate: -3.5, width: 225, caption: 'hermanos', emoji: '👧👦' },
  { nombre: 'sobrinos_y_yo', left: '70%', top: '42%', rotate: 4, width: 210, caption: 'los enanos y yo', emoji: '🧸' },
  { nombre: 'collage_fam1', left: '6%', top: '66%', rotate: -3.5, width: 210, caption: 'más nosotros', emoji: '🏡' },
  { nombre: 'collage_amigos2', left: '36%', top: '63%', rotate: 2.5, width: 200, caption: 'más ellos', emoji: '🥹' },
  { nombre: 'collage_familia5', left: '66%', top: '73%', rotate: -2, width: 215, caption: 'y más amor', emoji: '💞' },
];

const WALL_NOTAS = [
  { t: 'mi gente favorita ♡', left: '44%', top: '21%', r: -4, size: '1.5rem' },
  { t: '✦', left: '25%', top: '26%', r: 0, size: '1.5rem' },
  { t: '✦', left: '65%', top: '33%', r: 0, size: '1.2rem' },
  { t: '❀', left: '9%', top: '54%', r: 8, size: '1.4rem' },
  { t: '♡', left: '58%', top: '62%', r: -6, size: '1.5rem' },
  { t: 'gracias por tanto', left: '30%', top: '88%', r: 3, size: '1.35rem' },
  { t: '✦', left: '90%', top: '90%', r: 0, size: '1.3rem' },
];

const FELICIDAD = [
  { anio: 2004, valor: 7, emoji: '😊', frase: 'aparecí. contra todo pronóstico.', foto: 'yo_6_meses' },
  { anio: 2012, valor: 8, emoji: '🥹', frase: 'llegó fabianne.', foto: 'fabi_pasado' },
  { anio: 2016, valor: 8.5, emoji: '😄', frase: 'la salle, aixa, nena. buen año.', foto: 'lasalle' },
  { anio: 2020, valor: 3, emoji: '😭', frase: 'ese año ya saben lo que pasó.', foto: null },
  { anio: 2021, valor: 6, emoji: '🙂', frase: 'empezó utec.', foto: 'bioingenieria' },
  { anio: 2023, valor: 9, emoji: '😄', frase: 'la mejor decisión que he tomado.', foto: 'datascience' },
  { anio: 2024, valor: 9, emoji: '😄', frase: 'europa + primeras prácticas.', foto: 'paris' },
  { anio: 2025, valor: 8.5, emoji: '😊', frase: 'belcorp y gente nueva.', foto: 'belcorp_amigos' },
  { anio: 2026, valor: 10, emoji: '❤️', frase: 'todavía quedan muchos capítulos.', foto: 'fotoprincipal' },
];

function HappinessTimeline() {
  const [punto, setPunto] = useState(null);
  const W = 780;
  const H = 300;
  // espaciado uniforme: es una línea de recuerdos, no de precisión temporal
  const x = d3
    .scalePoint()
    .domain(FELICIDAD.map((d) => d.anio))
    .range([55, W - 45]);
  const y = d3.scaleLinear().domain([0, 10]).range([H - 50, 30]);
  const linea = d3
    .line()
    .x((d) => x(d.anio))
    .y((d) => y(d.valor))
    .curve(d3.curveMonotoneX);

  return (
    <div style={{ position: 'relative', maxWidth: 840, margin: '0 auto' }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" role="img" aria-label="cómo recuerdo cada etapa">
        <motion.path
          d={linea(FELICIDAD)}
          fill="none"
          stroke="#8e6bc8"
          strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        {FELICIDAD.map((p, i) => (
          <motion.g
            key={p.anio}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.18, type: 'spring', bounce: 0.5 }}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setPunto(p)}
            onClick={() => setPunto(punto?.anio === p.anio ? null : p)}
          >
            <circle cx={x(p.anio)} cy={y(p.valor)} r={13} fill="#fff" stroke="#8e6bc8" strokeWidth="1.5" />
            <text x={x(p.anio)} y={y(p.valor) + 5} textAnchor="middle" fontSize="14">
              {p.emoji}
            </text>
            <text x={x(p.anio)} y={H - 22} textAnchor="middle" style={{ fontFamily: 'var(--fraunces)', fontSize: 14, fill: '#6b6b6b' }}>
              {p.anio}
            </text>
          </motion.g>
        ))}
      </svg>
      <p className="chart-note">basado únicamente en cómo recuerdo esos años ❤️ (metodología: cero. cariño: mucho.)</p>

      {punto && (
        <div
          style={{
            position: 'absolute',
            left: `clamp(0%, ${((x(punto.anio) - 100) / W) * 100}%, 70%)`,
            top: -10,
            transform: 'translateY(-100%)',
            pointerEvents: 'none',
          }}
        >
        <motion.div
          className="hover-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {punto.foto && foto(punto.foto) && (
            <img src={foto(punto.foto)} alt={String(punto.anio)} style={{ width: 140, aspectRatio: '4/3', objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
          )}
          <p className="frase">
            <strong>{punto.anio}</strong> — {punto.frase}
          </p>
        </motion.div>
        </div>
      )}
    </div>
  );
}

export default function Final() {
  return (
    <section id="final" data-capitulo="final" className="chapter chapter--wide">
      <Reveal>
        <p className="chapter-kicker">último capítulo</p>
        <h2 className="chapter-title">y bueno... aquí sigo.</h2>
      </Reveal>

      <div className="memory-wall">
        {WALL_NOTAS.map((n, i) => (
          <motion.span
            key={`nota-${i}`}
            className="collage-nota"
            style={{ left: n.left, top: n.top, rotate: `${n.r}deg`, fontSize: n.size, zIndex: 2 }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4 + i * 0.15, type: 'spring', bounce: 0.5 }}
          >
            {n.t}
          </motion.span>
        ))}
        {WALL.map((w, i) => (
          <motion.div
            key={w.nombre}
            className="memory-item"
            style={{ left: w.left, top: w.top }}
            initial={{ opacity: 0, y: -80, rotate: w.rotate * 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-6% 0px' }}
            transition={{ duration: 0.8, delay: i * 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {w.ian ? (
              <figure className="polaroid" style={{ width: w.width, rotate: `${w.rotate}deg`, margin: 0 }}>
                <span className="tape" />
                {foto(w.nombre) ? (
                  <img className="polaroid-img" src={foto(w.nombre)} alt="ian" />
                ) : (
                  <div className="polaroid-placeholder">
                    <span className="emoji">🤍</span>
                    <span className="nombre">{w.nombre}</span>
                  </div>
                )}
                <figcaption className="polaroid-caption">ian 🤍</figcaption>
                <div className="ian-heart">
                  <span style={{ fontSize: '1.8rem' }}>❤️</span>
                  <span>highlight del 2026</span>
                </div>
              </figure>
            ) : (
              <Polaroid nombre={w.nombre} width={w.width} rotate={w.rotate} caption={w.caption} emoji={w.emoji} tape={i % 2 === 0} />
            )}
          </motion.div>
        ))}
      </div>

      <div className="scrolly-block">
        <Reveal>
          <p className="hand" style={{ textAlign: 'center', fontSize: '1.6rem' }}>happiness timeline</p>
        </Reveal>
        <HappinessTimeline />
      </div>

      <div className="scrolly-block" style={{ margin: '20vh auto', maxWidth: 760 }}>
        <motion.div
          className="nota-final-wrap"
          initial={{ opacity: 0, y: 40, rotate: -4 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="nota-final">
            <span className="washi washi--lila" style={{ top: -14, left: 36, rotate: '-6deg' }} />
            <span className="washi washi--rosa" style={{ top: -12, right: 42, rotate: '7deg' }} />
            <p>bueno... hasta aquí llega la versión 22.0 de mi historia.</p>
            <p>si llegaste hasta el final: gracias por hacer scroll conmigo ❤️</p>
            <p>
              quedan lugares por conocer, modelos por entrenar y seguramente varios plot twists más...
              pero esos capítulos todavía se están escribiendo.
            </p>
            <p className="firma">— bihonda</p>
            <span className="mancha-matcha" style={{ bottom: -18, right: -20 }} />
          </div>

          <div style={{ position: 'absolute', right: -84, top: -52 }} className="polaroid-final">
            <Polaroid nombre="fotoprincipal2" width={108} rotate={7} tape caption="yo" emoji="🌷" />
          </div>

          <motion.div
            className="ticket-final"
            style={{ left: -58, bottom: 26, rotate: '-8deg' }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: 'spring', bounce: 0.5 }}
          >
            ✈ versión 23.0 · próximamente
          </motion.div>

          {[
            { t: '✦', left: '-6%', top: '8%', size: '1.5rem', delay: 0.8 },
            { t: '❀', left: '103%', top: '55%', size: '1.4rem', delay: 0.95 },
            { t: '✦', left: '98%', top: '92%', size: '1.1rem', delay: 1.1 },
            { t: '♡', left: '-8%', top: '68%', size: '1.5rem', delay: 1.2 },
          ].map((d, i) => (
            <motion.span
              key={i}
              className="deco-final"
              style={{ left: d.left, top: d.top, fontSize: d.size }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: d.delay, type: 'spring', bounce: 0.5 }}
            >
              {d.t}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <div className="spotify-cierre">
        <Reveal>
          <p className="hand" style={{ fontSize: '1.6rem', margin: '0 0 2rem' }}>antes de irte, un último recuerdo:</p>
        </Reveal>
        <Reveal delay={0.15}>
          <a className="cassette" href={spotifyPlaylist} target="_blank" rel="noreferrer">
            <span className="washi washi--rosa" style={{ top: -15, left: '50%', translate: '-50% 0', rotate: '-3deg' }} />
            <span className="cassette-play">▶</span>
            <span className="cassette-label">
              <span className="cassette-titulo">mixtape · 22 años en canciones</span>
              <span className="cassette-sub">lado a — para conocerme un poquito más</span>
            </span>
            <span className="cassette-window">
              <span className="reel"><span className="reel-centro" /></span>
              <span className="cassette-cinta" />
              <span className="reel"><span className="reel-centro" /></span>
            </span>
            <span className="cassette-nota">play en spotify ♪</span>
          </a>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="nota-pequena" style={{ marginTop: '3.5rem' }}>hecho con react, d3 y demasiado matcha 🍵 — bihonda, 2026</p>
        </Reveal>
      </div>
    </section>
  );
}
