import { motion } from 'framer-motion';

// curva "dibujada a mano" que une un bloque con el siguiente.
// lado: hacia dónde se curva el trazo. nota: anotación manuscrita opcional.
const PATHS = {
  derecha: 'M80 4 C 128 34, 122 64, 84 90 C 52 112, 58 134, 78 152',
  izquierda: 'M80 4 C 32 34, 38 64, 76 90 C 108 112, 102 134, 82 152',
};

const FLECHAS = {
  derecha: 'M69 143 L 78 152 L 87 143',
  izquierda: 'M73 143 L 82 152 L 91 143',
};

export default function Conector({ lado = 'derecha', nota, alto = 150 }) {
  return (
    <div className="conector" aria-hidden="true">
      <svg viewBox="0 0 160 160" style={{ height: alto, width: 'auto', overflow: 'visible' }}>
        <motion.path
          d={PATHS[lado]}
          fill="none"
          stroke="var(--lila)"
          strokeWidth="2.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.9 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        />
        <motion.path
          d={FLECHAS[lado]}
          fill="none"
          stroke="var(--lila)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.9 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ delay: 0.8, duration: 0.3 }}
        />
      </svg>
      {nota && (
        <motion.span
          className={`conector-nota conector-nota--${lado}`}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ delay: 0.5, type: 'spring', bounce: 0.5 }}
        >
          {nota}
        </motion.span>
      )}
    </div>
  );
}
