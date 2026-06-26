import { useState, useRef } from 'react';
import {
  PhoneCall,
  Check,
  Calendar,
  Mail,
  Phone,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
  ArrowDown,
  Clock,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICE_PACKAGES } from './data';
import Header from './components/Header';
import BookingFlow from './components/BookingFlow';
import FAQ from './components/FAQ';
import About from './components/About';

// Photo du Jet d'eau de Genève (lac Léman) — Unsplash, libre d'usage commercial.
// Pour utiliser ta propre image : remplace simplement cette URL.
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1757584666096-59deb41f1124?auto=format&fit=crop&q=80&w=2000';

export default function App() {
  const [activePackageId, setActivePackageId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openBooking = (pkgId: string) => {
    setActivePackageId(pkgId);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-blue font-sans selection:bg-brand-red/10 selection:text-brand-red">
      {/* Header / Navbar */}
      <Header
        onBookClick={() => openBooking('decouverte')}
        onNavigate={handleNavigate}
      />

      {/* Hero Section (Accueil) */}
      <div
        ref={accueilRef}
        className="relative min-h-[80vh] flex items-center overflow-hidden py-20 md:py-32 bg-cover bg-center bg-no-repeat bg-brand-lightblue"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        {/* Soft, professional brand color gradient overlay to guarantee perfect contrast and Swiss luxury atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-cream via-brand-cream/85 md:via-brand-cream/75 lg:via-brand-cream/45 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl space-y-6 md:space-y-8 text-left"
          >

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-brand-blue"
              >
                Votre alliée pour <br className="hidden sm:inline" />
                réussir votre vie <br className="hidden sm:inline" />
                <span className="text-brand-red underline decoration-brand-lightblue decoration-wavy">à Genève.</span>
              </motion.h1>

              {/* Brand signature cursive */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="pt-1"
              >
                <p className="text-3xl sm:text-4xl text-brand-red font-cursive select-none">
                  Née ici, les vrais conseils de frontière. <span className="text-brand-blue">❤️</span>
                </p>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl leading-relaxed font-semibold"
            >
              NCF est le service d’accompagnement de référence pour ceux qui souhaitent <strong>travailler en Suisse</strong>, devenir <strong>frontaliers</strong> ou s’installer sereinement en <strong>Haute-Savoie</strong> et dans le bassin genevois. Des conseils de terrain, concrets et sans intermédiaire.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button
                onClick={() => handleNavigate('services')}
                className="bg-brand-blue hover:bg-brand-blue/90 text-white font-extrabold text-sm px-8 py-4.5 rounded-2xl shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Découvrir nos Services
                <ArrowDown className="w-4 h-4 text-brand-red animate-bounce" />
              </button>
              <button
                onClick={() => openBooking('decouverte')}
                disabled
                className="bg-brand-red text-white font-extrabold text-sm px-8 py-4.5 rounded-2xl shadow-lg shadow-brand-red/10 transition-all flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
              >
                <PhoneCall className="w-4 h-4" />
                Appel gratuit (20 min)
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Transition Banner */}
      <div className="bg-brand-blue text-white py-6 overflow-hidden border-y border-brand-lightblue/20">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-around items-center gap-6 text-center text-xs md:text-sm font-bold tracking-wider uppercase">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <span className="text-brand-red text-lg">✦</span> Accompagnement sur-mesure
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden sm:flex items-center gap-2"
          >
            <span className="text-brand-red text-lg font-cursive">✦</span> Zéro partenariat commercial caché
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <span className="text-brand-red text-lg">✦</span> Guides pratiques actualisés 2026
          </motion.div>
        </div>
      </div>

      {/* Services Section */}
      <div ref={servicesRef} id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue tracking-tight font-sans">
              Des offres adaptées à chaque étape de votre projet suisse
            </h2>
            <p className="text-sm md:text-base text-gray-500">
              Choisissez la formule qui correspond à vos besoins et réservez instantanément votre appel d’accompagnement en sélectionnant un créneau directement dans notre agenda Calendly.
            </p>
          </motion.div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-16">
            {SERVICE_PACKAGES.map((pkg, idx) => {
              const isPopular = pkg.id === 'travail';
              const isFree = pkg.price === 0;

              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.2 } }}
                  className={`rounded-3xl border p-6 md:p-8 flex flex-col justify-between relative cursor-default ${
                    isPopular
                      ? 'border-brand-blue bg-brand-lightblue/10 shadow-lg ring-2 ring-brand-blue/30 lg:scale-[1.03]'
                      : 'border-brand-lightblue bg-brand-cream/20 hover:border-brand-blue/30 hover:bg-brand-cream/30 shadow-sm'
                  }`}
                >
                  {isPopular && pkg.badge && (
                    <span className="absolute -top-3.5 left-6 text-[10px] font-black px-3.5 py-1.5 bg-brand-blue text-white rounded-full uppercase tracking-widest shadow-sm">
                      {pkg.badge}
                    </span>
                  )}

                  {/* Header info */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-brand-red flex items-center gap-1 uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5 text-brand-red shrink-0" /> {pkg.duration}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-brand-blue mb-2 font-sans">{pkg.name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-6">
                      {pkg.description}
                    </p>

                    <div className="border-t border-brand-lightblue/50 pt-5 mb-6">
                      <span className="text-xs font-bold text-gray-400 block uppercase mb-1">Tarif unique</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl md:text-4xl font-black text-brand-blue">
                          {isFree ? 'Gratuit' : `${pkg.price} €`}
                        </span>
                        {!isFree && <span className="text-xs text-gray-500 font-semibold">TTC</span>}
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-3 mb-8">
                      <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider block">Ce qui est compris :</span>
                      <ul className="space-y-2.5">
                        {pkg.features.map((feat, index) => (
                          <li key={index} className="flex items-start gap-2.5 text-xs text-gray-700">
                            <Check className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5 stroke-[2.5]" />
                            <span className="leading-tight">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA button */}
                  <div>
                    <button
                      onClick={() => openBooking(pkg.id)}
                      disabled
                      className={`w-full py-4 rounded-xl text-xs font-bold transition-all opacity-50 cursor-not-allowed flex items-center justify-center gap-1.5 ${
                        isPopular
                          ? 'bg-brand-red text-white shadow-lg shadow-brand-red/10'
                          : isFree
                          ? 'bg-brand-blue text-white'
                          : 'bg-white border border-brand-blue text-brand-blue'
                      }`}
                    >
                      {isFree ? 'Réserver gratuitement' : 'Réserver mon créneau'}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quick inline scheduler notification */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="bg-brand-cream border border-brand-lightblue rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 max-w-4xl mx-auto"
          >
            <div className="text-left space-y-1">
              <h4 className="font-extrabold text-brand-blue text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-red animate-pulse" />
                Vous hésitez encore sur la formule ?
              </h4>
              <p className="text-xs text-gray-500 max-w-xl">
                Prenez un premier contact sans engagement. Notre appel d’orientation gratuit de 20 minutes vous permettra d’obtenir des réponses claires sur votre statut et de valider votre projet d’emploi suisse.
              </p>
            </div>
            <button
              onClick={() => openBooking('decouverte')}
              disabled
              className="bg-brand-blue text-white font-extrabold text-xs px-6 py-4 rounded-xl shrink-0 transition-all flex items-center gap-2 shadow-md opacity-50 cursor-not-allowed"
            >
              Prendre RDV (Calendly Gratuit)
              <ArrowRight className="w-4 h-4 text-brand-red" />
            </button>
          </motion.div>

        </div>
      </div>

      {/* Qui Sommes-Nous ? Section */}
      <div ref={aboutRef} id="qui-sommes-nous" className="py-20 bg-white border-t border-brand-lightblue/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue tracking-tight font-sans">
              La force de l’expérience terrain
            </h2>
            <p className="text-sm md:text-base text-gray-500">
              NCF n’est pas une agence de recrutement lointaine, mais un collectif d'accompagnateurs locaux basés entre Annemasse et Genève.
            </p>
          </motion.div>

          <About />
        </div>
      </div>

      {/* F.A.Q Section */}
      <div ref={faqRef} id="faq" className="py-20 bg-brand-cream border-t border-brand-lightblue/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue tracking-tight font-sans">
              Tout savoir sur le statut frontalier suisse
            </h2>
            <p className="text-sm md:text-base text-gray-500">
              Retrouvez nos réponses claires aux questions les plus fréquemment posées par nos candidats à l'expatriation ou au travail frontalier.
            </p>
          </motion.div>

          <FAQ />
        </div>
      </div>

      {/* Floating Action / Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-blue/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl animate-scale-up border border-brand-lightblue">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-brand-cream text-brand-blue p-2 hover:bg-brand-red hover:text-white rounded-full transition-all cursor-pointer shadow-sm"
              title="Fermer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <BookingFlow
              initialPackageId={activePackageId}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Footer & Networks */}
      <footer className="bg-brand-blue text-white pt-16 pb-8 border-t-2 border-brand-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/10 pb-12 mb-8">

            {/* Brand Intro Column */}
            <div className="md:col-span-5 space-y-4">
              <img
                src="/wordmark-ncf-360.png"
                alt="Né côté frontière — Née ici, les vrais conseils de frontière"
                className="w-28 rounded-2xl shadow-md"
              />
              <p className="text-xs text-brand-lightblue leading-relaxed max-w-sm">
                Service d’accompagnement de terrain pour concrétiser votre installation, réformer votre CV aux normes helvétiques et vous prémunir des erreurs administratives transfrontalières.
              </p>
            </div>

            {/* Quick links */}
            <div className="md:col-span-3 space-y-3 text-left">
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-red">Ressources & Accès</h4>
              <ul className="space-y-2 text-xs text-brand-lightblue">
                <li>
                  <button onClick={() => handleNavigate('services')} className="hover:text-white transition-all">Nos Tarifs & Packs</button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('qui-sommes-nous')} className="hover:text-white transition-all">Qui sommes-nous ?</button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('faq')} className="hover:text-white transition-all">F.A.Q Frontalière</button>
                </li>
                <li>
                  <button onClick={() => openBooking('decouverte')} disabled className="text-brand-lightblue/40 font-semibold cursor-not-allowed">Réserver un créneau (bientôt disponible)</button>
                </li>
              </ul>
            </div>

            {/* Contacts & Social Networks */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-red">Suivez-nous sur nos réseaux</h4>

              {/* Social icons */}
              <div className="flex gap-3">
                <a
                  href="https://linkedin.com/company/ncf-accompagnement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-brand-red hover:text-white text-brand-lightblue rounded-xl flex items-center justify-center transition-all"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com/ncf-accompagnement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-brand-red hover:text-white text-brand-lightblue rounded-xl flex items-center justify-center transition-all"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com/ncf-accompagnement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-brand-red hover:text-white text-brand-lightblue rounded-xl flex items-center justify-center transition-all"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com/ncf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-brand-red hover:text-white text-brand-lightblue rounded-xl flex items-center justify-center transition-all"
                  title="X (Twitter)"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>

              {/* Local Contact details */}
              <div className="space-y-1.5 pt-2 text-xs text-brand-lightblue">
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-brand-red shrink-0" />
                  <span>contact@ncf-accompagnement.fr</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-brand-red shrink-0" />
                  <span>CH : +41 (0) 22 552 14 00 | FR : +33 (0) 4 50 12 00 00</span>
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Footer Credits */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-brand-lightblue/60">
            <p>© {new Date().getFullYear()} Né côté frontière — Accompagnement Frontalier. Tous droits réservés.</p>
            <div className="flex gap-4">
              <a href="#accueil" className="hover:underline">Mentions Légales</a>
              <a href="#accueil" className="hover:underline">Politique de Confidentialité</a>
              <a href="#accueil" className="hover:underline">CGV</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
