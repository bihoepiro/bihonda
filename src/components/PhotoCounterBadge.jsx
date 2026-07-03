import { useFotoCounter } from './PhotoCounter.jsx';

export default function PhotoCounterBadge() {
  const counter = useFotoCounter();
  if (!counter || counter.total === 0) return null;
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <div className="foto-counter" aria-live="polite">
      📷 recuerdos vistos&nbsp; {pad(counter.vistos)} / {pad(counter.total)}
    </div>
  );
}
