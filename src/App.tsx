import { BeforeAfter } from './components/BeforeAfter';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { Navbar } from './components/Navbar';
import { Process } from './components/Process';
import { Projects } from './components/Projects';
import { TechStack } from './components/TechStack';
import { Ticker } from './components/Ticker';
import { useMagnetic } from './hooks/useMagnetic';
import { useReveal } from './hooks/useReveal';

export default function App() {
  useReveal();
  useMagnetic();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <Ticker />
      <Navbar />
      <main id="main">
        <Hero />
        <Manifesto />
        <TechStack />
        <BeforeAfter />
        <Projects />
        <Process />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
