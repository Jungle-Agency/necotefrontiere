import { useRef, useState, type ReactNode } from 'react';
import {
  Check,
  Calendar,
  Mail,
  ArrowRight,
  ArrowDown,
  Clock,
  ChevronRight
} from 'lucide-react';
import { motion, MotionConfig } from 'motion/react';
import { SERVICE_PACKAGES } from './data';
import Header from './components/Header';
import FAQ from './components/FAQ';
import About from './components/About';
import CalendlyBooking from './components/CalendlyBooking';
import LegalModal, { type LegalTab } from './components/LegalModal';
import BorderLine from './components/BorderLine';
import HowItWorks from './components/HowItWorks';

// Photo du Jet d'eau de Genève (lac Léman) — self-hébergée (WebP optimisé),
// préchargée depuis index.html. Pour changer d'image : remplace public/hero-leman.webp.
const HERO_IMAGE = '/hero-leman.webp';

// Petit intitulé « eyebrow » réutilisé au-dessus des titres de section
function Eyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[0.22em] text-brand-red ${center ? 'justify-center' : ''}`}>
      <span className="w-6 h-px bg-brand-red/70" />
      {children}
      {center && <span className="w-6 h-px bg-brand-red/70" />}
    </div>
  );
}

export default function App() {
  // References for scrolling
  const accueilRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const calendlyRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (sectionId: string) => {
    let targetRef;
    if (sectionId === 'accueil') targetRef = accueilRef;
    else if (sectionId === 'services') targetRef = servicesRef;
    else if (sectionId === 'qui-sommes-nous') targetRef = aboutRef;
    else if (sectionId === 'faq') targetRef = faqRef;
    else if (sectionId === 'calendly') targetRef = calendlyRef;

    if (targetRef && targetRef.current) {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      targetRef.current.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  const goToBooking = () => handleNavigate('calendly');

  // Modale légale (Mentions légales & CGU / Politique de confidentialité)
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('cgu');
  const openLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setLegalOpen(true);
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-brand-cream text-brand-blue font-sans antialiased selection:bg-brand-red/10 selection:text-brand-red">
      {/* Header / Navbar */}
      <Header onBookClick={goToBooking} onNavigate={handleNavigate} />

      {/* Ligne de frontière — élément signature, se dessine au scroll */}
      <BorderLine />

      <main>
      {/* ============================ HERO ============================ */}
      <section
        ref={accueilRef}
        id="accueil"
        className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden py-20 md:py-32 bg-cover bg-center bg-no-repeat bg-brand-lightblue grain"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        {/* Voiles de couleur marque pour le contraste et l'atmosphère */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-cream via-brand-cream/90 md:via-brand-cream/80 lg:via-brand-cream/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-cream/85 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl space-y-6 md:space-y-7 text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Eyebrow>Accompagnement frontalier · FR / CH</Eyebrow>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-[-0.02em] leading-[1.02] sm:leading-[0.95] text-brand-blue text-balance"
              >
                Votre alliée pour <br className="hidden sm:inline" />
                réussir votre vie <br className="hidden sm:inline" />
                <span className="relative inline-block text-brand-red">
                  en Suisse.
                  <span className="absolute left-0 -bottom-1 h-3 w-full bg-brand-red/15 rounded-sm -z-10" />
                </span>
              </motion.h1>

              {/* Signature cursive de marque */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="pt-1"
              >
                <p className="text-4xl sm:text-5xl text-brand-red font-cursive font-semibold -rotate-1 select-none">
                  Née ici, les vrais conseils de frontière.
                </p>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-lg text-gray-700 max-w-2xl leading-relaxed font-medium text-pretty"
            >
              NCF est le service d’accompagnement de référence pour toutes celles et ceux qui souhaitent <strong className="text-brand-blue">travailler en Suisse</strong>, devenir <strong className="text-brand-blue">frontaliers</strong> ou s’y installer sereinement. Que vous viviez en <strong className="text-brand-blue">Haute-Savoie</strong>, dans l’<strong className="text-brand-blue">Ain</strong>, à <strong className="text-brand-blue">Genève</strong>, dans le <strong className="text-brand-blue">canton de Vaud</strong> ou ailleurs le long de la frontière, nous vous apportons des conseils de terrain, concrets et sans intermédiaire.
            </motion.p>

            {/* Boutons d'action */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <button
                onClick={goToBooking}
                className="group bg-brand-red hover:bg-brand-red/90 text-white font-bold text-sm px-8 py-4 rounded-2xl shadow-red hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Prendre RDV gratuit (20 min)
              </button>
              <button
                onClick={() => handleNavigate('services')}
                className="bg-white/70 backdrop-blur border border-brand-blue/15 text-brand-blue font-bold text-sm px-8 py-4 rounded-2xl shadow-soft hover:bg-white hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Découvrir nos Services
                <ArrowDown className="w-4 h-4 text-brand-red group-hover:translate-y-0.5 transition-transform" />
              </button>
            </motion.div>

            {/* Bandeau de réassurance */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-3 text-xs font-semibold text-brand-blue/80"
            >
              {['RDV en ligne immédiat', 'Sans engagement', 'Conseils de terrain, sans intermédiaire'].map((t, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-brand-red stroke-[3]" />
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================ BANDEAU ============================ */}
      <div className="bg-brand-blue text-white py-5 overflow-hidden border-y-2 border-brand-red/60">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-around items-center gap-x-8 gap-y-3 text-center text-xs md:text-sm font-bold tracking-wider uppercase">
          {['Accompagnement sur-mesure', 'Zéro partenariat commercial caché', 'Guides pratiques actualisés 2026'].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-2.5"
            >
              <span className="text-brand-red text-lg leading-none">✦</span>
              {t}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ============================ COMMENT ÇA SE PASSE ============================ */}
      <HowItWorks onBookClick={goToBooking} />

      {/* ============================ SERVICES ============================ */}
      <section ref={servicesRef} id="services" className="py-16 md:py-24 bg-white brand-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-5 max-w-3xl mx-auto mb-10 md:mb-14"
          >
            <div className="flex justify-center"><Eyebrow center>Nos offres</Eyebrow></div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-brand-blue tracking-[-0.02em] leading-[1.05] text-balance">
              Des offres adaptées à chaque étape de votre projet suisse
            </h2>
            <p className="text-base text-gray-600 leading-relaxed text-pretty">
              Choisissez la formule qui correspond à vos besoins et prenez rendez-vous instantanément en sélectionnant un créneau directement dans notre agenda Calendly.
            </p>
          </motion.div>

          {/* Bloc découverte offert */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl mb-10 md:mb-14 bg-brand-cream border border-brand-lightblue shadow-soft"
          >
            {/* Filet rouge éditorial */}
            <span className="absolute inset-y-0 left-0 w-1.5 bg-brand-red" />

            {/* Tampon douanier */}
            <span
              aria-hidden="true"
              className="hidden lg:block absolute top-5 right-8 -rotate-6 border-2 border-brand-red/50 rounded-md p-1 text-brand-red/70"
            >
              <span className="block border border-brand-red/40 rounded-sm px-3 py-1 font-display font-black text-[11px] uppercase tracking-[0.25em]">
                Offert
              </span>
            </span>
            <div className="p-8 md:p-10 md:pl-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-7">
              <div className="space-y-3 max-w-2xl">
                <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-red">
                  <Calendar className="w-3.5 h-3.5" />
                  Gratuit · 20 min · Sans engagement
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-black tracking-tight leading-tight text-brand-blue text-balance">
                  Commencez par un rendez-vous découverte offert
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed text-pretty">
                  Faisons le point sur votre projet : diagnostic de votre situation, évaluation de votre éligibilité et définition des prochaines étapes. Le meilleur point de départ avant de choisir une offre.
                </p>
              </div>
              <button
                onClick={goToBooking}
                className="shrink-0 bg-brand-red hover:bg-brand-red/90 text-white font-bold text-sm px-7 py-4 rounded-2xl shadow-red hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
              >
                Prendre RDV gratuit
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Grille des offres */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
            {SERVICE_PACKAGES.map((pkg, idx) => {
              const isPopular = pkg.id === 'travail';
              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className={`group relative rounded-3xl border p-7 md:p-8 flex flex-col bg-white transition-shadow duration-300 cursor-default ${
                    isPopular
                      ? 'border-brand-blue/25 shadow-soft-lg xl:-translate-y-3'
                      : 'border-brand-lightblue shadow-soft hover:shadow-soft-lg'
                  }`}
                >
                  {/* Accent haut pour l'offre populaire */}
                  {isPopular && (
                    <span className="absolute inset-x-0 -top-px h-1.5 rounded-t-3xl bg-gradient-to-r from-brand-red to-brand-blue" />
                  )}
                  {isPopular && pkg.badge && (
                    <span className="absolute -top-3 left-7 text-[10px] font-black px-3 py-1.5 bg-brand-blue text-white rounded-full uppercase tracking-widest shadow-md">
                      {pkg.badge}
                    </span>
                  )}

                  <div className="flex-1">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-red uppercase tracking-wider">
                      <Clock className="w-3.5 h-3.5 shrink-0" /> {pkg.duration}
                    </span>

                    <h3 className="mt-4 text-xl font-display font-black text-brand-blue tracking-tight">{pkg.name}</h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{pkg.description}</p>

                    <div className="mt-5 pt-5 border-t border-brand-lightblue/60">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Tarif unique</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-4xl font-display font-black text-brand-blue tracking-tight">{pkg.price} €</span>
                        <span className="text-[11px] text-gray-500 font-semibold">TTC</span>
                      </div>
                    </div>

                    <ul className="mt-5 space-y-2.5">
                      {pkg.features.map((feat, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-sm text-gray-700 leading-snug">
                          <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={goToBooking}
                    className={`mt-7 w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-1.5 transition-all hover:-translate-y-0.5 cursor-pointer ${
                      isPopular
                        ? 'bg-brand-red text-white shadow-red'
                        : 'bg-brand-blue text-white shadow-soft hover:shadow-blue'
                    }`}
                  >
                    Réserver mon créneau
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============================ RENDEZ-VOUS ============================ */}
      <section ref={calendlyRef} id="calendly" className="py-16 md:py-24 bg-brand-cream border-t border-brand-lightblue/50 brand-glow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-5 max-w-2xl mx-auto mb-10"
          >
            <div className="flex justify-center"><Eyebrow center>Prise de rendez-vous</Eyebrow></div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-brand-blue tracking-[-0.02em] leading-[1.05] text-balance">
              Réservez votre créneau en ligne
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Choisissez le moment qui vous convient directement dans notre agenda. Confirmation immédiate, sans engagement.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="calendly-frame rounded-3xl border border-brand-lightblue overflow-hidden bg-white shadow-soft-lg"
          >
            <CalendlyBooking />
          </motion.div>
        </div>
      </section>

      {/* ============================ QUI SOMMES-NOUS ============================ */}
      <section ref={aboutRef} id="qui-sommes-nous" className="py-16 md:py-24 bg-white border-t border-brand-lightblue/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-5 max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <div className="flex justify-center"><Eyebrow center>Qui sommes-nous</Eyebrow></div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-brand-blue tracking-[-0.02em] leading-[1.05] text-balance">
              La force de l’expérience terrain
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              NCF n’est pas une agence de recrutement lointaine, mais un collectif d'accompagnateurs locaux basés entre Annemasse et Genève.
            </p>
          </motion.div>

          <About />
        </div>
      </section>

      {/* ============================ F.A.Q ============================ */}
      <section ref={faqRef} id="faq" className="py-16 md:py-24 bg-brand-cream border-t border-brand-lightblue/30 brand-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-5 max-w-3xl mx-auto mb-12"
          >
            <div className="flex justify-center"><Eyebrow center>Questions fréquentes</Eyebrow></div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-brand-blue tracking-[-0.02em] leading-[1.05] text-balance">
              Tout savoir sur le statut frontalier suisse
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Retrouvez nos réponses claires aux questions les plus fréquemment posées par nos candidats à l'expatriation ou au travail frontalier.
            </p>
          </motion.div>

          <FAQ />
        </div>
      </section>
      </main>

      {/* ============================ FOOTER ============================ */}
      <footer className="bg-brand-blue text-white pt-16 pb-8 border-t-2 border-brand-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/10 pb-12 mb-8">

            {/* Colonne marque */}
            <div className="md:col-span-5 space-y-4">
              <img
                src="/wordmark-ncf-360.png"
                alt="Né côté frontière — Née ici, les vrais conseils de frontière"
                className="w-28 rounded-2xl shadow-soft-lg"
              />
              <p className="text-sm text-brand-lightblue/90 leading-relaxed max-w-sm">
                Service d’accompagnement de terrain pour concrétiser votre installation, réformer votre CV aux normes helvétiques et vous prémunir des erreurs administratives transfrontalières.
              </p>
            </div>

            {/* Liens rapides */}
            <div className="md:col-span-3 space-y-3 text-left">
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-red">Ressources & Accès</h4>
              <ul className="space-y-2 text-sm text-brand-lightblue/90">
                <li><button onClick={() => handleNavigate('services')} className="hover:text-white transition-all">Nos Tarifs & Packs</button></li>
                <li><button onClick={() => handleNavigate('qui-sommes-nous')} className="hover:text-white transition-all">Qui sommes-nous ?</button></li>
                <li><button onClick={() => handleNavigate('faq')} className="hover:text-white transition-all">F.A.Q Frontalière</button></li>
                <li><button onClick={goToBooking} className="hover:text-white transition-all">Prendre rendez-vous via Calendly</button></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-red">Nous contacter</h4>

              <div className="space-y-1.5 text-sm text-brand-lightblue/90">
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-brand-red shrink-0" />
                  <a href="mailto:contact@ncf-accompagnement.fr" className="hover:text-white transition-all">
                    contact@ncf-accompagnement.fr
                  </a>
                </p>
                <p className="text-xs text-brand-lightblue/70 leading-relaxed pt-1">
                  Bassin genevois & Haute-Savoie — réponse sous 24 h ouvrées. Le plus simple reste de réserver directement un créneau découverte gratuit dans notre agenda.
                </p>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-brand-lightblue/80">
            <p>© {new Date().getFullYear()} Né côté frontière — Accompagnement Frontalier. Tous droits réservés.</p>
            <div className="flex gap-4">
              <button onClick={() => openLegal('cgu')} className="hover:underline cursor-pointer">Mentions Légales & CGU</button>
              <button onClick={() => openLegal('privacy')} className="hover:underline cursor-pointer">Politique de Confidentialité</button>
            </div>
          </div>

        </div>
      </footer>

      {/* Modale légale */}
      <LegalModal isOpen={legalOpen} initialTab={legalTab} onClose={() => setLegalOpen(false)} />
    </div>
    </MotionConfig>
  );
}
