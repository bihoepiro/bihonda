import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import Polaroid from '../components/Polaroid.jsx';
import Reveal from '../components/Reveal.jsx';
import { foto } from '../lib/fotos.js';

const BURBUJAS = [
  { id: 'mono', img: 'mono', emoji: '🐒', r: 44, frase: 'nací en el año del mono. siempre ha sido mi animal favorito.' },
  { id: 'acuario', img: 'acuario', emoji: '♒', r: 38, frase: 'soy acuario y creo que con eso me podrán entender.' },
  { id: 'data', img: 'data_science', emoji: '📊', r: 50, frase: 'ya quiero ser una data scientist.' },
  { id: 'matcha', img: 'matcha', emoji: '🍵', r: 44, frase: 'claramente hay algo mejor que un café: un matcha.' },
  { id: 'foto', img: 'lovemylife', emoji: '📷', r: 42, frase: 'probablemente estoy tomando fotos a todo lo que esté pasando.' },
  { id: 'playlists', img: 'spotify', emoji: '🎵', r: 38, frase: 'tengo playlists para casi cualquier momento.' },
  { id: 'series', img: 'showslover', emoji: '📺', r: 36, frase: 'soy adicta a las series, así que probablemente ya vi tu serie favorita.' },
  { id: 'hp', img: 'harrypotter', emoji: '🧙', r: 42, frase: 'todo empezó porque bryan me convenció de ver harry potter.' },
  { id: 'ravenclaw', img: 'ravenclaw', emoji: '🦅', r: 36, frase: 'sí, soy ravenclaw.' },
  { id: 'cm', img: 'reid', emoji: '📺', r: 38, frase: 'spencer reid fue mi primer amor ficticio.' },
  { id: 'tiktok', img: 'tiktok', emoji: '📱', r: 34, frase: 'tiktok es mi perdición.' },
  { id: 'viajes', img: 'viaje', emoji: '✈️', r: 42, frase: 'todo lo que involucre subirme a un avión, me tienen incluida.' },
  { id: 'lila', emoji: '💜', r: 34, frase: 'por años mi color favorito fue el lila.' },
];

const PARTICULAS = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 67) % 96}%`,
  top: `${(i * 41) % 92}%`,
  size: 4 + (i % 4) * 3,
  dur: 7 + (i % 5) * 2,
}));

function BubbleChart() {
  const ref = useRef(null);
  const [tip, setTip] = useState(null);

  useEffect(() => {
    const W = 480;
    const H = 540;
    const svg = d3.select(ref.current).attr('viewBox', `0 0 ${W} ${H}`);
    svg.selectAll('*').remove();

    const nodes = BURBUJAS.map((b, i) => ({
      ...b,
      x: W / 2 + Math.cos(i) * 90,
      y: H / 2 + Math.sin(i * 2) * 90,
      fase: Math.random() * Math.PI * 2,
    }));

    const g = svg
      .selectAll('g.burbuja')
      .data(nodes)
      .join('g')
      .attr('class', 'burbuja')
      .style('cursor', 'pointer');

    g.append('circle')
      .attr('r', (d) => d.r)
      .attr('fill', '#f4effc')
      .attr('stroke', '#8e6bc8')
      .attr('stroke-width', 1.5);

    g.each(function (d) {
      const nodo = d3.select(this);
      const src = d.img && foto(d.img);
      if (src) {
        const ri = d.r - 2;
        nodo.append('clipPath').attr('id', `clip-bub-${d.id}`).append('circle').attr('r', ri);
        nodo
          .append('image')
          .attr('href', src)
          .attr('x', -ri)
          .attr('y', -ri)
          .attr('width', ri * 2)
          .attr('height', ri * 2)
          .attr('preserveAspectRatio', 'xMidYMid slice')
          .attr('clip-path', `url(#clip-bub-${d.id})`)
          .style('pointer-events', 'none');
      } else {
        nodo
          .append('text')
          .text(d.emoji)
          .attr('text-anchor', 'middle')
          .attr('dy', '0.36em')
          .style('font-size', `${d.r * 0.85}px`)
          .style('pointer-events', 'none');
      }
    });

    let t = 0;
    const sim = d3
      .forceSimulation(nodes)
      .alphaDecay(0)
      .velocityDecay(0.25)
      .force('x', d3.forceX(W / 2).strength(0.012))
      .force('y', d3.forceY(H / 2).strength(0.012))
      .force('collide', d3.forceCollide((d) => d.r + 5).iterations(2))
      .on('tick', () => {
        t += 0.012;
        nodes.forEach((d) => {
          d.vx += Math.sin(t + d.fase) * 0.014;
          d.vy += Math.cos(t * 0.9 + d.fase) * 0.014;
          d.x = Math.max(d.r, Math.min(W - d.r, d.x));
          d.y = Math.max(d.r, Math.min(H - d.r, d.y));
        });
        g.attr('transform', (d) => `translate(${d.x},${d.y})`);
      });

    const activar = (event, d) => {
      g.select('circle')
        .transition()
        .duration(400)
        .attr('r', (n) => (n.id === d.id ? n.r * 1.22 : n.r))
        .attr('fill', (n) => (n.id === d.id ? '#ece2fb' : '#f4effc'));
      const [x, y] = [d.x, d.y];
      setTip({ frase: d.frase, x: (x / W) * 100, y: (y / H) * 100 });
    };
    const desactivar = () => {
      g.select('circle').transition().duration(400).attr('r', (n) => n.r).attr('fill', '#f4effc');
      setTip(null);
    };

    g.on('mouseenter', activar).on('mouseleave', desactivar).on('click', activar);

    return () => sim.stop();
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <svg ref={ref} className="chart-svg" role="img" aria-label="las cosas que me hacen ser yo" />
      {tip && (
        <div
          className="bubble-tip"
          style={{
            left: `${Math.min(tip.x, 58)}%`,
            top: `${Math.min(tip.y + 9, 82)}%`,
          }}
        >
          <span style={{ color: '#8e6bc8' }}>✎ </span>
          {tip.frase}
        </div>
      )}
      <p className="chart-note">las cosas que me hacen ser yo, a escala</p>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" data-capitulo="hero" style={{ position: 'relative', overflow: 'hidden' }}>
      {PARTICULAS.map((p, i) => (
        <motion.span
          key={i}
          className="particula"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -26, 0], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="hero">
        <div>
          <Reveal>
            <h1 className="hero-title">BIHONDA</h1>
            <p className="hero-tagline">22 años resumidos en datos, fotos y demasiados plot twists.</p>
          </Reveal>
          <div className="hero-foto-wrap">
            <Polaroid nombre="fotoprincipal" width={300} rotate={-2.5} tape caption="hola, soy bobi" emoji="🌷" />
            <Polaroid nombre="yo_bebe" width={170} rotate={3.5} caption="yo, versión 2004" emoji="🍼" />
          </div>
        </div>
        <Reveal delay={0.25}>
          <BubbleChart />
        </Reveal>
      </div>

      <div className="hero-narracion prose">
        <Reveal>
          <p className="big">hola, soy bihonda.</p>
          <p>bueno... mis amigos me dicen biho, pijo o bobi.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p>
            nací un 10 de febrero del 2004. soy acuario y creo que eso explica bastantes cosas de mi
            personalidad. además nací en el año chino del mono, que casualmente siempre ha sido mi animal
            favorito.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="big">
            y bueno... esta es mi vida contada como probablemente la contaría alguien que estudia data science.
          </p>
          <p className="hand">↓ sigue bajando, te prometo que será interesante</p>
        </Reveal>
      </div>
    </section>
  );
}
