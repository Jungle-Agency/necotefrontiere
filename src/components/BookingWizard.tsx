import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Briefcase,
  CalendarCheck,
  Check,
  Compass,
  FileText,
  Home,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { InlineWidget } from 'react-calendly';
import { CALENDLY_URL } from '../config';

export type Objective = 'decouverte' | 'cv' | 'emploi' | 'installation';

interface BookingWizardProps {
  /** Pré-sélection quand l'utilisateur arrive depuis le bouton d'une offre. */
  initialObjective?: Objective | null;
}

const OBJECTIVES: { id: Objective; label: string; sub: string; Icon: typeof Compass }[] = [
  {
    id: 'decouverte',
    label: 'Faire le point',
    sub: 'Je découvre, je veux un premier diagnostic de ma situation',
    Icon: Compass
  },
  {
    id: 'cv',
    label: 'Optimiser mon CV',
    sub: 'Un CV aux normes du marché suisse qui passe le filtre recruteur',
    Icon: FileText
  },
  {
    id: 'emploi',
    label: 'Trouver un emploi',
    sub: 'Décrocher un poste à Genève ou en Suisse romande',
    Icon: Briefcase
  },
  {
    id: 'installation',
    label: 'M’installer en frontalier',
    sub: 'Assurance maladie, fiscalité, banque, démarches',
    Icon: Home
  }
];

const SITUATIONS = [
  'Je vis en France, près de la frontière',
  'Je vis en France, plus loin de la frontière',
  'Je vis déjà en Suisse',
  'Autre situation'
];

/* Tous les rendez-vous commencent par le créneau découverte offert :
   la recommandation cadre ce qui sera abordé pendant ce premier échange. */
const RECOMMENDATIONS: Record<Objective, { title: string; detail: string }> = {
  decouverte: {
    title: 'RDV découverte offert · 20 min',
    detail:
      'Un premier échange gratuit pour poser votre situation, vérifier votre éligibilité et repartir avec des prochaines étapes claires.'
  },
  cv: {
    title: 'Offre conseillée : CV Boost — dès 119 €',
    detail:
      'Refonte complète aux normes suisses, mots-clés recruteurs, lettre de motivation en option. On valide ensemble la formule pendant votre RDV découverte offert.'
  },
  emploi: {
    title: 'Offre conseillée : Pack Recherche Travail — 200 €',
    detail:
      'Stratégie de ciblage, accès au marché caché, LinkedIn et simulation d’entretien. On cadre le plan d’action pendant votre RDV découverte offert.'
  },
  installation: {
    title: 'Offre conseillée : Pack Installation — 400 €',
    detail:
      'LAMal vs CMU, impôt à la source, banque et douanes : votre RDV découverte offert permet de cadrer l’installation avant de démarrer.'
  }
};

function StepDots({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center justify-center gap-0">
      {[1, 2, 3].map((n, i) => (
        <div key={n} className="flex items-center">
          {i > 0 && <span className="w-8 sm:w-12 border-t-2 border-dashed border-brand-red/30" />}
          <span
            className={`w-8 h-8 rounded-full font-display font-black text-xs flex items-center justify-center border-2 transition-colors ${
              step >= n
                ? 'bg-brand-blue border-brand-blue text-white'
                : 'bg-white border-brand-lightblue text-brand-blue/50'
            }`}
          >
            {step > n ? <Check className="w-4 h-4" /> : n}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function BookingWizard({ initialObjective = null }: BookingWizardProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [objective, setObjective] = useState<Objective | null>(null);
  const [situation, setSituation] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loaded, setLoaded] = useState(false);

  // Un clic sur le bouton d'une offre pré-remplit le projet et saute l'étape 1
  useEffect(() => {
    if (initialObjective) {
      setObjective(initialObjective);
      setStep((s) => (s === 1 ? 2 : s));
    }
  }, [initialObjective]);

  if (loaded) {
    return (
      <div>
        {objective && (
          <div className="flex items-center gap-2 px-5 py-3 bg-brand-cream border-b border-brand-lightblue text-xs font-semibold text-brand-blue">
            <Sparkles className="w-3.5 h-3.5 text-brand-red shrink-0" />
            {RECOMMENDATIONS[objective].title}
          </div>
        )}
        <InlineWidget
          url={CALENDLY_URL}
          prefill={{
            ...(name.trim() ? { name: name.trim() } : {}),
            ...(email.trim() ? { email: email.trim() } : {})
          }}
          utm={{
            utmSource: 'site-ncf',
            utmCampaign: objective ?? 'direct',
            utmContent: situation ?? ''
          }}
          styles={{ minWidth: '100%', height: '700px' }}
        />
      </div>
    );
  }

  const showAgenda = () => setLoaded(true);

  return (
    <div className="px-6 py-10 md:px-12 md:py-12 space-y-8">
      <StepDots step={step} />

      {/* ———— Étape 1 : le projet ———— */}
      {step === 1 && (
        <div className="space-y-5 animate-fade-in">
          <h3 className="text-center text-lg md:text-xl font-display font-black text-brand-blue tracking-tight">
            Quel est votre projet ?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {OBJECTIVES.map(({ id, label, sub, Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setObjective(id);
                  setStep(2);
                }}
                className={`text-left p-4 rounded-2xl border-2 transition-all cursor-pointer hover:-translate-y-0.5 hover:shadow-soft ${
                  objective === id
                    ? 'border-brand-blue bg-brand-lightblue/30'
                    : 'border-brand-lightblue bg-white hover:border-brand-blue/40'
                }`}
              >
                <span className="flex items-center gap-2 font-display font-black text-sm text-brand-blue">
                  <Icon className="w-4 h-4 text-brand-red shrink-0" />
                  {label}
                </span>
                <span className="block mt-1 text-xs text-gray-600 leading-relaxed">{sub}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ———— Étape 2 : la situation ———— */}
      {step === 2 && (
        <div className="space-y-5 animate-fade-in">
          <h3 className="text-center text-lg md:text-xl font-display font-black text-brand-blue tracking-tight">
            Où en êtes-vous géographiquement ?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {SITUATIONS.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSituation(s);
                  setStep(3);
                }}
                className={`text-left px-4 py-3.5 rounded-2xl border-2 text-sm font-semibold text-brand-blue transition-all cursor-pointer hover:-translate-y-0.5 hover:shadow-soft ${
                  situation === s
                    ? 'border-brand-blue bg-brand-lightblue/30'
                    : 'border-brand-lightblue bg-white hover:border-brand-blue/40'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue/60 hover:text-brand-blue transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Retour
            </button>
          </div>
        </div>
      )}

      {/* ———— Étape 3 : récapitulatif + coordonnées ———— */}
      {step === 3 && objective && (
        <div className="space-y-6 max-w-2xl mx-auto animate-fade-in">
          {/* Recommandation */}
          <div className="relative overflow-hidden rounded-2xl bg-brand-cream border border-brand-lightblue p-5 md:p-6">
            <span className="absolute inset-y-0 left-0 w-1.5 bg-brand-red" />
            <div className="pl-3 space-y-1.5">
              <p className="flex items-center gap-2 font-display font-black text-sm md:text-base text-brand-blue">
                <Sparkles className="w-4 h-4 text-brand-red shrink-0" />
                {RECOMMENDATIONS[objective].title}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">{RECOMMENDATIONS[objective].detail}</p>
            </div>
          </div>

          {/* Coordonnées facultatives pour préremplir Calendly */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom (facultatif)"
              autoComplete="name"
              className="w-full bg-white border-2 border-brand-lightblue focus:border-brand-blue rounded-2xl px-4 py-3.5 text-sm text-brand-blue placeholder-gray-400 outline-none transition-colors"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email (facultatif)"
              autoComplete="email"
              className="w-full bg-white border-2 border-brand-lightblue focus:border-brand-blue rounded-2xl px-4 py-3.5 text-sm text-brand-blue placeholder-gray-400 outline-none transition-colors"
            />
          </div>
          <p className="text-[11px] text-gray-500 leading-relaxed -mt-3">
            Uniquement pour préremplir le formulaire de réservation — rien n’est envoyé tant que vous ne confirmez pas votre créneau.
          </p>

          <button
            onClick={showAgenda}
            className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bold text-sm px-8 py-4 rounded-2xl shadow-red hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4" />
            Afficher les créneaux disponibles
          </button>

          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue/60 hover:text-brand-blue transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Retour
            </button>
            <p className="flex items-center gap-1.5 text-[11px] text-gray-500 text-right">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-brand-blue/60" />
              L’agenda est fourni par Calendly (service tiers, cookies).
            </p>
          </div>
        </div>
      )}

      {/* Accès direct pour les pressés */}
      {step < 3 && (
        <p className="text-center">
          <button
            onClick={showAgenda}
            className="text-xs font-semibold text-gray-500 hover:text-brand-blue underline underline-offset-4 decoration-brand-lightblue transition-colors cursor-pointer"
          >
            Afficher directement l’agenda sans personnalisation
          </button>
        </p>
      )}
    </div>
  );
}
