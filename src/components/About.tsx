import { Sparkles, ShieldCheck, Landmark, HeartHandshake, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div id="about-section-content" className="space-y-16">

      {/* Story and Concept */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* Left Side: Concept Narrative */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-6"
        >

          <h3 className="text-2xl md:text-3xl font-bold text-brand-blue tracking-tight leading-tight">
            Des conseils de <span className="text-cursive text-brand-red text-4xl block sm:inline">frontière</span> basés sur une expérience locale solide.
          </h3>

          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            S'installer ou travailler en Suisse ne s'improvise pas. Entre la fiscalité à la source à Genève, le choix irrévocable de l'assurance maladie (LAMal ou CMU), et la négociation d'un salaire en francs suisses, chaque décision a un impact financier majeur.
          </p>

          <p className="text-sm md:text-base text-gray-600 leading-relaxed font-semibold text-brand-blue">
            « Nous sommes passés par là. Nous connaissons les pièges administratifs et les opportunités du marché caché de l'emploi genevois. »
          </p>

          <div className="bg-brand-lightblue/20 rounded-2xl p-5 border border-brand-lightblue/40 space-y-3">
            <h4 className="font-bold text-sm text-brand-blue uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-red" />
              Présents de part et d'autre de la frontière
            </h4>
            <p className="text-xs text-gray-600">
              Notre équipe rayonne quotidiennement sur tout l'axe transfrontalier : de <strong>Genève (Rive Gauche/Rive Droite)</strong> jusqu'à la <strong>Haute-Savoie (Annemasse, Saint-Julien, Thonon-les-Bains)</strong> et le <strong>Pays de Gex</strong>.
            </p>
          </div>
        </motion.div>

        {/* Right Side: Visual Values Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-white p-6 rounded-2xl border border-brand-lightblue shadow-sm hover:shadow-md transition-all cursor-default"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-lightblue/60 text-brand-blue flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5 text-brand-red" />
            </div>
            <h4 className="font-bold text-brand-blue text-sm mb-2">100% Locale</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Une connaissance fine et en temps réel des réglementations fiscales, du droit d'option assurance et des loyers frontaliers.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-white p-6 rounded-2xl border border-brand-lightblue shadow-sm hover:shadow-md transition-all cursor-default"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-lightblue/60 text-brand-blue flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-brand-blue text-sm mb-2">Accompagnement Neutre</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Aucun partenariat caché avec des assureurs ou des banques. Nos calculs et conseils sont faits exclusivement dans votre intérêt.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-white p-6 rounded-2xl border border-brand-lightblue shadow-sm hover:shadow-md transition-all cursor-default"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-lightblue/60 text-brand-blue flex items-center justify-center mb-4">
              <Landmark className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-brand-blue text-sm mb-2">Normes Suisses</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Des templates de CV et de lettres de motivation validés par des spécialistes du recrutement en Suisse Romande.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-white p-6 rounded-2xl border border-brand-lightblue shadow-sm hover:shadow-md transition-all cursor-default"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-lightblue/60 text-brand-blue flex items-center justify-center mb-4">
              <HeartHandshake className="w-5 h-5 text-brand-red" />
            </div>
            <h4 className="font-bold text-brand-blue text-sm mb-2">Authenticité</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Pas de théories abstraites. Des conseils vécus et testés en pratique pour démarrer votre nouvelle vie sans stress.
            </p>
          </motion.div>
        </motion.div>

      </div>

      {/* Testimonials Bento Grid */}
      <div className="space-y-6 pt-8 border-t border-brand-gray">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-red">Témoignages</span>
          <h4 className="text-xl md:text-2xl font-bold text-brand-blue font-sans">Ils ont réussi grâce à NCF</h4>
          <p className="text-xs md:text-sm text-gray-500 max-w-xl mx-auto">Découvrez les retours d'expérience de professionnels de divers secteurs installés à la frontière genevoise.</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((test, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.2 } }}
              className="bg-brand-cream/40 border border-brand-lightblue p-6 rounded-2xl flex flex-col justify-between h-full hover:bg-white hover:shadow-lg transition-all cursor-default"
            >
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed italic mb-6">
                "{test.text}"
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={test.avatar}
                  alt={test.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border-2 border-brand-blue"
                />
                <div>
                  <h5 className="font-bold text-xs text-brand-blue">{test.name}</h5>
                  <p className="text-[10px] text-brand-red font-medium leading-none mt-0.5">{test.role}</p>
                  <p className="text-[9px] text-gray-400 mt-0.5">{test.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </div>
  );
}
