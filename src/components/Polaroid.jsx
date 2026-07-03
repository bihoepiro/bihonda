import { useEffect, useId } from 'react';
import { motion } from 'framer-motion';
import { foto } from '../lib/fotos.js';
import { useFotoCounter } from './PhotoCounter.jsx';

/**
 * foto estilo polaroid. si el archivo no existe todavía en src/fotos,
 * muestra un placeholder elegante (nunca rompe la página).
 *
 * props: nombre (sin extensión), caption, rotate, width, tape, ratio ('tall'|'wide'|'square'), emoji
 */
export default function Polaroid({
  nombre,
  caption,
  rotate = 0,
  width = 220,
  tape = false,
  ratio = 'tall',
  emoji = '📷',
  drop = true,
  instant = false,
  className = '',
  style,
}) {
  const id = useId();
  const counter = useFotoCounter();
  const src = foto(nombre);

  useEffect(() => counter?.registrar(id), [counter, id]);
  useEffect(() => {
    if (instant) counter?.marcarVisto(id);
  }, [instant, counter, id]);

  const ratioClass = ratio === 'wide' ? '--wide' : ratio === 'square' ? '--square' : '';

  // dentro de paneles que se montan al interactuar (no al hacer scroll),
  // whileInView no dispara — ahí se anima directo al montar (instant),
  // con rotación estática para no pelear con el resolver de keyframes
  const animacion = instant
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
      }
    : {
        initial: drop ? { opacity: 0, y: -36, rotate: rotate + 6 } : { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0, rotate },
        viewport: { once: true, margin: '-8% 0px' },
        onViewportEnter: () => counter?.marcarVisto(id),
      };

  return (
    <motion.figure
      className={`polaroid ${className}`}
      style={{ width, rotate: `${rotate}deg`, margin: 0, ...style }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      {...animacion}
    >
      {tape && <span className="tape" />}
      {src ? (
        <img
          className={`polaroid-img${ratioClass ? ` polaroid-img${ratioClass}` : ''}`}
          src={src}
          alt={caption || nombre}
          loading="lazy"
        />
      ) : (
        <div className={`polaroid-placeholder${ratioClass ? ` polaroid-placeholder${ratioClass}` : ''}`}>
          <span className="emoji">{emoji}</span>
          <span className="nombre">{nombre}</span>
        </div>
      )}
      {caption && <figcaption className="polaroid-caption">{caption}</figcaption>}
    </motion.figure>
  );
}
