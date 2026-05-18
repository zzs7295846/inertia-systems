import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { Clients } from './components/Clients';
import { Services } from './components/Services';
import { ContactForm } from './components/ContactForm';

function App() {
  return (
    <main className="bg-matte-black selection:bg-surgeon-white selection:text-matte-black scrollbar-hide">
      <Hero />
      <Manifesto />
      <Clients />
      <Services />
      <ContactForm />
      
      {/* Footer */}
      <footer className="py-24 px-6 border-t border-white/5 text-center">
        <div className="flex flex-col items-center space-y-12">
          <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent" />
          <div className="space-y-4">
            <p className="text-[10px] font-mono tracking-[1.2em] text-code-white/20 uppercase pl-[1.2em]">
              Inertia Systems
            </p>
            <p className="text-[8px] font-mono tracking-[0.5em] text-code-white/10 uppercase">
              Defeating the Tyranny of Dopamine
            </p>
          </div>
          <div className="pt-12">
            <p className="text-[10px] font-mono text-code-white/10">
              © 2026 INERTIA SYSTEMS. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
