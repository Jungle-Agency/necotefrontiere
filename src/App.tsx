import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import {
  Check,
  Calendar,
  Mail,
  Phone,
  Facebook,
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
import BookingWizard, { type Objective } from './components/BookingWizard';
import LegalModal, { type LegalTab } from './components/LegalModal';
import HowItWorks from './components/HowItWorks';
import CookieBanner, { getCookieConsent } from './components/CookieBanner';

// Le bouton d'une offre pré-remplit le parcours de prise de rendez-vous
const PKG_OBJECTIVE: Record<string, Objective> = {
  'cv-boost': 'cv',
  'cv-boost-coaching': 'cv',
  travail: 'emploi',
  installation: 'installation'
};

// Photo du Jet d'eau de Genève (lac Léman) — self-hébergée (WebP optimisé),
// préchargée depuis index.html. Pour changer d'image : remplace public/hero-leman.webp.
const HERO_IMAGE = '/hero-leman.webp';

// Icône WhatsApp (absente de lucide-react)
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

// Icône TikTok (absente de lucide-react)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.28 0 .56.05.82.13V9.4a6.33 6.33 0 0 0-.94-.07A6.34 6.34 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V8.56a8.16 8.16 0 0 0 4.77 1.52v-3.4c-.35 0-.7 0-1.04.01z" />
    </svg>
  );
}

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
  const rdvRef = useRef<HTMLDivElement>(null);

  const sectionRefs: Record<string, RefObject<HTMLDivElement>> = {
    accueil: accueilRef,
    services: servicesRef,
    'qui-sommes-nous': aboutRef,
    faq: faqRef,
    rdv: rdvRef
  };

  const scrollToSection = (sectionId: string) => {
    const target = sectionRefs[sectionId]?.current;
    if (!target) return false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    return true;
  };

  // Navigation interne : scroll + ancre dans l'URL (liens partageables, ex. /#services)
  const handleNavigate = (sectionId: string) => {
    if (scrollToSection(sectionId) && window.location.hash !== `#${sectionId}`) {
      history.pushState(null, '', `#${sectionId}`);
    }
  };

  // À l'arrivée avec une ancre (/#faq…) et au bouton retour du navigateur
  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.slice(1);
      if (id) scrollToSection(id);
    };
    scrollToHash();
    window.addEventListener('popstate', scrollToHash);
    return () => window.removeEventListener('popstate', scrollToHash);
  }, []);

  // Objectif transmis au parcours de RDV (pré-rempli selon le bouton cliqué)
  const [bookingObjective, setBookingObjective] = useState<Objective | null>(null);
  const goToBooking = (objective?: Objective) => {
    if (objective) setBookingObjective(objective);
    handleNavigate('rdv');
  };

  // Modale légale (Mentions légales & CGU / Politique de confidentialité)
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('cgu');
  const openLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setLegalOpen(true);
  };

  // Bandeau cookies : affiché tant que le visiteur n'a pas exprimé de choix
  const [cookieBannerVisible, setCookieBannerVisible] = useState(() => getCookieConsent() === null);

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-brand-cream text-brand-blue font-sans antialiased selection:bg-brand-red/10 selection:text-brand-red">
      {/* Header / Navbar */}
      <Header onBookClick={() => goToBooking('decouverte')} onNavigate={handleNavigate} />

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
                onClick={() => goToBooking('decouverte')}
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
              {['Demande de RDV en 2 minutes', 'Sans engagement', 'Conseils de terrain, sans intermédiaire'].map((t, i) => (
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
          {['Accompagnement sur-mesure', 'Zéro partenariat commercial caché', 'FAQ frontalière actualisée 2026'].map((t, i) => (
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
      <HowItWorks onBookClick={() => goToBooking('decouverte')} />

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
              Choisissez la formule qui correspond à vos besoins et proposez vos créneaux directement en ligne — nous confirmons votre rendez-vous sous 24 h ouvrées.
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
                onClick={() => goToBooking('decouverte')}
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
                    onClick={() => goToBooking(PKG_OBJECTIVE[pkg.id])}
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
      <section ref={rdvRef} id="rdv" className="py-16 md:py-24 bg-brand-cream border-t border-brand-lightblue/50 brand-glow">
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
              Préparons votre rendez-vous
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Deux questions pour personnaliser votre premier échange, proposez vos disponibilités — nous confirmons votre créneau par email sous 24 h ouvrées. Sans engagement.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-brand-lightblue overflow-hidden bg-white shadow-soft-lg"
          >
            <BookingWizard initialObjective={bookingObjective} />
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
                loading="lazy"
                decoding="async"
                width={224}
                height={224}
                className="w-28 h-auto rounded-2xl shadow-soft-lg"
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
                <li><button onClick={() => goToBooking()} className="hover:text-white transition-all">Prendre rendez-vous en ligne</button></li>
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
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-brand-red shrink-0" />
                  <a href="tel:+33685813683" className="hover:text-white transition-all">
                    06 85 81 36 83
                  </a>
                </p>
                <p className="text-xs text-brand-lightblue/70 leading-relaxed pt-1">
                  Bassin genevois & Haute-Savoie — réponse sous 24 h ouvrées. Le plus simple reste de réserver directement un créneau découverte gratuit dans notre agenda.
                </p>
              </div>

              {/* Réseaux sociaux & WhatsApp */}
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://wa.me/33685813683"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Nous écrire sur WhatsApp"
                  className="w-9 h-9 rounded-full bg-white/10 text-brand-lightblue hover:bg-brand-red hover:text-white flex items-center justify-center transition-all hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/share/1Eki7MXbde/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Notre page Facebook"
                  className="w-9 h-9 rounded-full bg-white/10 text-brand-lightblue hover:bg-brand-red hover:text-white flex items-center justify-center transition-all hover:-translate-y-0.5"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.tiktok.com/@ncfconseil"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Notre compte TikTok"
                  className="w-9 h-9 rounded-full bg-white/10 text-brand-lightblue hover:bg-brand-red hover:text-white flex items-center justify-center transition-all hover:-translate-y-0.5"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-brand-lightblue/80">
            <p>© {new Date().getFullYear()} Né côté frontière — Accompagnement Frontalier. Tous droits réservés.</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => openLegal('cgu')} className="hover:underline cursor-pointer">Mentions Légales & CGU</button>
              <button onClick={() => openLegal('privacy')} className="hover:underline cursor-pointer">Politique de Confidentialité</button>
              <button onClick={() => setCookieBannerVisible(true)} className="hover:underline cursor-pointer">Gérer les cookies</button>
            </div>
          </div>

        </div>
      </footer>

      {/* Modale légale */}
      <LegalModal isOpen={legalOpen} initialTab={legalTab} onClose={() => setLegalOpen(false)} />

      {/* Bandeau cookies */}
      {cookieBannerVisible && (
        <CookieBanner
          onChoice={() => setCookieBannerVisible(false)}
          onOpenPrivacy={() => openLegal('privacy')}
        />
      )}
    </div>
    </MotionConfig>
  );
}
