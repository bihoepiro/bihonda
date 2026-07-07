import { FotoProvider } from './components/PhotoCounter.jsx';
import ProgressTracker from './components/ProgressTracker.jsx';
import PhotoCounterBadge from './components/PhotoCounterBadge.jsx';
import Musica from './components/Musica.jsx';
import Hero from './sections/Hero.jsx';
import PlotTwists from './sections/PlotTwists.jsx';
import Familia from './sections/Familia.jsx';
import Sobrinos from './sections/Sobrinos.jsx';
import Infancia from './sections/Infancia.jsx';
import LaSalle from './sections/LaSalle.jsx';
import Carrera from './sections/Carrera.jsx';
import AmigosDS from './sections/AmigosDS.jsx';
import Trabajo from './sections/Trabajo.jsx';
import Viajes from './sections/Viajes.jsx';
import Obsesiones from './sections/Obsesiones.jsx';
import Final from './sections/Final.jsx';

export default function App() {
  return (
    <FotoProvider>
      <ProgressTracker />
      <PhotoCounterBadge />
      <Musica />
      <main>
        <Hero />
        <PlotTwists />
        <Familia />
        <Sobrinos />
        <Infancia />
        <LaSalle />
        <Carrera />
        <AmigosDS />
        <Trabajo />
        <Viajes />
        <Obsesiones />
        <Final />
      </main>
    </FotoProvider>
  );
}
