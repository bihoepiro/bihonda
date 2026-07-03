import { useEffect, useState } from 'react';

const CAPITULOS = [
  { id: 'hero', emoji: '🍼', label: 'yo' },
  { id: 'plot-twists', emoji: '🎢', label: 'plot twists' },
  { id: 'familia', emoji: '❤️', label: 'familia' },
  { id: 'infancia', emoji: '🧸', label: 'infancia' },
  { id: 'la-salle', emoji: '🏫', label: 'la salle' },
  { id: 'data-science', emoji: '💻', label: 'data science' },
  { id: 'trabajo', emoji: '💼', label: 'trabajo' },
  { id: 'viajes', emoji: '✈️', label: 'viajes' },
  { id: 'gustos', emoji: '⭐', label: 'gustos' },
  { id: 'final', emoji: '💜', label: 'final' },
];

export default function ProgressTracker() {
  const [activo, setActivo] = useState('hero');

  useEffect(() => {
    const secciones = document.querySelectorAll('[data-capitulo]');
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActivo(e.target.dataset.capitulo);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    secciones.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="tracker" aria-label="capítulos">
      {CAPITULOS.map((c) => (
        <button
          key={c.id}
          className={activo === c.id ? 'active' : ''}
          onClick={() => document.getElementById(c.id)?.scrollIntoView({ behavior: 'smooth' })}
          title={c.label}
        >
          <span className="dot" />
          <span className="label">
            {c.emoji} {c.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
