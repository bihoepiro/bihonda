import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// botón flotante de música de fondo. busca public/musica.mp3;
// si el archivo no existe, el botón simplemente no se muestra.
export default function Musica() {
  const audioRef = useRef(null);
  const [disponible, setDisponible] = useState(false);
  const [sonando, setSonando] = useState(false);

  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}musica.mp3`);
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = 'auto';
    audioRef.current = audio;
    const ok = () => setDisponible(true);
    audio.addEventListener('canplaythrough', ok);
    return () => {
      audio.pause();
      audio.removeEventListener('canplaythrough', ok);
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (sonando) {
      a.pause();
      setSonando(false);
    } else {
      a.play().then(() => setSonando(true)).catch(() => {});
    }
  };

  if (!disponible) return null;

  return (
    <motion.button
      className={`musica-btn${sonando ? ' musica-btn--on' : ''}`}
      onClick={toggle}
      aria-label={sonando ? 'pausar la música' : 'poner música'}
      title={sonando ? 'pausar la música' : 'ponle play'}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
    >
      <motion.span
        style={{ display: 'inline-block' }}
        animate={sonando ? { rotate: [-8, 8, -8], y: [0, -2, 0] } : { rotate: 0, y: 0 }}
        transition={sonando ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
      >
        ♪
      </motion.span>
      <span className="musica-label">{sonando ? 'música on' : 'música off'}</span>
    </motion.button>
  );
}
