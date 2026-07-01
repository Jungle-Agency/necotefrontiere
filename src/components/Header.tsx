import { useState } from 'react';
import { Menu, X, CalendarCheck, Globe2 } from 'lucide-react';

interface HeaderProps {
  onBookClick: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ onBookClick, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Accueil', id: 'accueil' },
    { label: 'Nos Services', id: 'services' },
    { label: 'Qui Sommes-Nous ?', id: 'qui-sommes-nous' },
    { label: 'F.A.Q', id: 'faq' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header id="app-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-lightblue/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo Brand */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleNavClick('accueil')}>
            <img
              src="/logo-ncf-256.png"
              alt="Logo Né côté frontière"
              className="h-10 w-auto select-none"
            />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-extrabold text-brand-blue tracking-tight leading-none">Né côté frontière</span>
              <span className="hidden sm:block text-[9px] font-bold text-brand-red uppercase tracking-wider mt-1">Conseils frontaliers FR / CH</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-brand-blue">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="hover:text-brand-red transition-all cursor-pointer relative py-2 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Call to Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-brand-blue font-bold bg-brand-lightblue/50 px-3 py-1.5 rounded-full">
              <Globe2 className="w-3.5 h-3.5 text-brand-blue animate-spin-slow" />
              <span>FR / CH</span>
            </div>
            <button
              onClick={onBookClick}
              className="bg-brand-red hover:bg-brand-red/90 text-white text-xs font-extrabold px-5 py-3 rounded-full shadow-red hover:-translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              RDV Découverte (Gratuit)
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onBookClick}
              className="bg-brand-red hover:bg-brand-red/90 text-white p-2.5 rounded-full shadow-red flex items-center justify-center transition-all cursor-pointer"
              title="Prendre rendez-vous via Calendly"
            >
              <CalendarCheck className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-blue p-2 hover:bg-brand-cream rounded-lg transition-all"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-brand-lightblue bg-white px-4 py-6 space-y-4 animate-fade-in">
          <nav className="flex flex-col gap-4 text-base font-bold text-brand-blue">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left py-2 px-3 hover:bg-brand-cream rounded-xl transition-all"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-brand-gray flex flex-col gap-3">
            <div className="flex items-center justify-between px-3 text-xs text-brand-blue font-bold">
              <span>Bassin Genevois & Haute-Savoie</span>
              <span className="bg-brand-lightblue/80 px-2 py-0.5 rounded-full text-[10px]">100% Local</span>
            </div>
            <button
              onClick={() => {
                onBookClick();
                setIsOpen(false);
              }}
              className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-extrabold text-sm py-4 rounded-xl flex items-center justify-center gap-2 shadow-blue cursor-pointer transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              Réserver mon RDV Gratuit
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
