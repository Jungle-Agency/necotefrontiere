import { motion } from 'motion/react';
import { CalendarCheck, Compass, Footprints } from 'lucide-react';

interface HowItWorksProps {
  onBookClick: () => void;
}

const STEPS = [
  {
    Icon: CalendarCheck,
    title: 'RDV découverte offert',
    text: '20 minutes en visio ou par téléphone pour faire le point sur votre projet et votre éligibilité. Sans engagement.',
  },
  {
    Icon: Compass,
    title: 'Diagnostic & formule',
    text: 'Nous définissons ensemble ce dont vous avez réellement besoin — rien de plus. Vous choisissez votre offre en connaissance de cause.',
  },
  {
    Icon: Footprints,
    title: 'Accompagnement terrain',
    text: 'CV, candidatures, assurance, fiscalité, démarches : on avance à vos côtés, de votre côté de la frontière comme de l’autre.',
  },
];

export default function HowItWorks({ onBookClick }: HowItWorksProps) {
  return (
    <section id="etapes" className="py-16 md:py-20 bg-brand-cream brand-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[0.22em] text-brand-red">
            <span className="w-6 h-px bg-brand-red/70" />
            Comment ça se passe
            <span className="w-6 h-px bg-brand-red/70" />
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-brand-blue tracking-[-0.02em] leading-[1.05] text-balance">
            Trois étapes, zéro détour
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Ligne pointillée reliant les bornes (desktop) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-6 left-[16.66%] right-[16.66%] border-t-2 border-dashed border-brand-red/30"
          />

          {STEPS.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="relative flex flex-col items-center text-center gap-4"
            >
              {/* Borne frontière numérotée */}
              <span className="relative z-10 w-12 h-12 rounded-full bg-white border-2 border-brand-red text-brand-red font-display font-black text-lg flex items-center justify-center shadow-soft">
                {idx + 1}
              </span>
              <div className="space-y-2 max-w-xs">
                <h3 className="font-display font-black text-brand-blue text-lg tracking-tight flex items-center justify-center gap-2">
                  <step.Icon className="w-4 h-4 text-brand-red shrink-0" />
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={onBookClick}
            className="text-sm font-bold text-brand-red hover:text-brand-blue transition-colors cursor-pointer underline underline-offset-4 decoration-dashed decoration-brand-red/50"
          >
            Commencer par l’étape 1 — c’est offert
          </button>
        </div>
      </div>
    </section>
  );
}
