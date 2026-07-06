import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Briefcase,
  CalendarCheck,
  Check,
  Compass,
  Copy,
  FileText,
  Home,
  Mail,
  Send,
  Sparkles
} from 'lucide-react';
import { CONTACT_EMAIL } from '../config';

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

const PERIODS = ['Matin (9h–12h)', 'Après-midi (14h–18h)', 'Soir (18h–20h)'];
const MAX_SLOTS = 3;

/** Les 8 prochains jours ouvrés (lundi–vendredi), libellés en français. */
function upcomingBusinessDays(count = 8): { key: string; label: string }[] {
  const days: { key: string; label: string }[] = [];
  const d = new Date();
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) {
      days.push({
        key: d.toISOString().slice(0, 10),
        label: d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
      });
    }
  }
  return days;
}

function StepDots({ step }: { step: 1 | 2 | 3 | 4 }) {
  return (
    <div className="flex items-center justify-center gap-0">
      {[1, 2, 3, 4].map((n, i) => (
        <div key={n} className="flex items-center">
          {i > 0 && <span className="w-6 sm:w-10 border-t-2 border-dashed border-brand-red/30" />}
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

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue/60 hover:text-brand-blue transition-colors cursor-pointer"
    >
      <ArrowLeft className="w-3.5 h-3.5" /> Retour
    </button>
  );
}

export default function BookingWizard({ initialObjective = null }: BookingWizardProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [objective, setObjective] = useState<Objective | null>(null);
  const [situation, setSituation] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const days = useMemo(() => upcomingBusinessDays(), []);

  // Un clic sur le bouton d'une offre pré-remplit le projet et saute l'étape 1
  useEffect(() => {
    if (initialObjective) {
      setObjective(initialObjective);
      setStep((s) => (s === 1 ? 2 : s));
    }
  }, [initialObjective]);

  const toggleSlot = (slot: string) => {
    setSlots((prev) => {
      if (prev.includes(slot)) return prev.filter((s) => s !== slot);
      if (prev.length >= MAX_SLOTS) return prev;
      return [...prev, slot];
    });
  };

  const objectiveLabel = OBJECTIVES.find((o) => o.id === objective)?.label ?? '';
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSend = name.trim().length > 1 && emailValid && slots.length > 0;

  const recapText = [
    'Bonjour NCF,',
    '',
    'Je souhaite prendre un rendez-vous découverte (20 min, offert).',
    '',
    `• Mon projet : ${objectiveLabel}`,
    `• Ma situation : ${situation ?? '—'}`,
    '• Mes disponibilités :',
    ...slots.map((s) => `   - ${s}`),
    '',
    `Nom : ${name.trim()}`,
    `Email : ${email.trim()}`,
    ...(phone.trim() ? [`Téléphone : ${phone.trim()}`] : []),
    ...(message.trim() ? ['', 'Message :', message.trim()] : []),
    '',
    '— Envoyé depuis le site Né côté frontière'
  ].join('\n');

  const sendRequest = () => {
    const subject = `Demande de RDV découverte — ${name.trim()}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(recapText)}`;
    setSent(true);
  };

  const copyRecap = async () => {
    try {
      await navigator.clipboard.writeText(recapText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* presse-papier indisponible : le texte reste sélectionnable à la main */
    }
  };

  /* ———— Écran de confirmation ———— */
  if (sent) {
    return (
      <div className="px-6 py-12 md:px-12 md:py-14 max-w-2xl mx-auto space-y-6 animate-fade-in">
        <div className="flex flex-col items-center text-center gap-3">
          <span className="w-14 h-14 rounded-full bg-brand-lightblue/60 flex items-center justify-center">
            <Check className="w-7 h-7 text-brand-blue stroke-[3]" />
          </span>
          <h3 className="text-xl md:text-2xl font-display font-black text-brand-blue tracking-tight">
            Votre demande est prête
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed max-w-md">
            Votre messagerie s’est ouverte avec le récapitulatif ci-dessous — il ne reste qu’à
            l’envoyer. Nous confirmons votre créneau par email sous 24 h ouvrées.
          </p>
        </div>

        <div className="rounded-2xl border border-brand-lightblue bg-brand-cream p-5">
          <pre className="whitespace-pre-wrap text-xs text-gray-700 leading-relaxed font-sans">{recapText}</pre>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={copyRecap}
            className="flex-1 bg-white border-2 border-brand-lightblue hover:border-brand-blue/40 text-brand-blue font-bold text-sm px-6 py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copié !' : 'Copier le récapitulatif'}
          </button>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex-1 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-blue transition-all flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            {CONTACT_EMAIL}
          </a>
        </div>

        <p className="text-center text-[11px] text-gray-500">
          La messagerie ne s’est pas ouverte ? Copiez le récapitulatif et envoyez-le nous directement.
        </p>

        <div className="text-center">
          <button
            onClick={() => setSent(false)}
            className="text-xs font-bold text-brand-blue/60 hover:text-brand-blue transition-colors cursor-pointer underline underline-offset-4"
          >
            Modifier ma demande
          </button>
        </div>
      </div>
    );
  }

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
            <BackButton onClick={() => setStep(1)} />
          </div>
        </div>
      )}

      {/* ———— Étape 3 : les disponibilités ———— */}
      {step === 3 && (
        <div className="space-y-5 max-w-2xl mx-auto animate-fade-in">
          <div className="text-center space-y-1.5">
            <h3 className="text-lg md:text-xl font-display font-black text-brand-blue tracking-tight">
              Quand êtes-vous disponible ?
            </h3>
            <p className="text-xs text-gray-500">
              Choisissez jusqu’à {MAX_SLOTS} créneaux — nous confirmons le rendez-vous par email sous 24 h ouvrées.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-brand-lightblue bg-white overflow-hidden">
            <div className="max-h-72 overflow-y-auto divide-y divide-brand-lightblue/60">
              {days.map((day) => (
                <div key={day.key} className="flex flex-col sm:flex-row sm:items-center gap-2 px-4 py-3">
                  <span className="sm:w-44 shrink-0 text-sm font-bold text-brand-blue capitalize">{day.label}</span>
                  <div className="flex flex-wrap gap-2">
                    {PERIODS.map((period) => {
                      const slot = `${day.label} — ${period}`;
                      const active = slots.includes(slot);
                      const full = !active && slots.length >= MAX_SLOTS;
                      return (
                        <button
                          key={period}
                          onClick={() => toggleSlot(slot)}
                          disabled={full}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed ${
                            active
                              ? 'bg-brand-blue border-brand-blue text-white'
                              : 'bg-white border-brand-lightblue text-brand-blue hover:border-brand-blue/50'
                          }`}
                        >
                          {period}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <BackButton onClick={() => setStep(2)} />
            <span className="text-xs font-bold text-brand-blue/60">
              {slots.length}/{MAX_SLOTS} créneau{slots.length > 1 ? 'x' : ''} choisi{slots.length > 1 ? 's' : ''}
            </span>
            <button
              onClick={() => setStep(4)}
              disabled={slots.length === 0}
              className="bg-brand-blue hover:bg-brand-blue/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-blue transition-all flex items-center gap-2 cursor-pointer"
            >
              Continuer
              <CalendarCheck className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ———— Étape 4 : coordonnées + récapitulatif ———— */}
      {step === 4 && objective && (
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
              <p className="text-xs text-gray-500 pt-1">
                Vos créneaux : {slots.join(' · ')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom *"
              autoComplete="name"
              className="w-full bg-white border-2 border-brand-lightblue focus:border-brand-blue rounded-2xl px-4 py-3.5 text-sm text-brand-blue placeholder-gray-400 outline-none transition-colors"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email *"
              autoComplete="email"
              className="w-full bg-white border-2 border-brand-lightblue focus:border-brand-blue rounded-2xl px-4 py-3.5 text-sm text-brand-blue placeholder-gray-400 outline-none transition-colors"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Votre téléphone (facultatif)"
              autoComplete="tel"
              className="w-full bg-white border-2 border-brand-lightblue focus:border-brand-blue rounded-2xl px-4 py-3.5 text-sm text-brand-blue placeholder-gray-400 outline-none transition-colors sm:col-span-2"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Un mot sur votre situation ? (facultatif)"
              rows={3}
              className="w-full bg-white border-2 border-brand-lightblue focus:border-brand-blue rounded-2xl px-4 py-3.5 text-sm text-brand-blue placeholder-gray-400 outline-none transition-colors resize-none sm:col-span-2"
            />
          </div>

          <button
            onClick={sendRequest}
            disabled={!canSend}
            className="w-full bg-brand-red hover:bg-brand-red/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm px-8 py-4 rounded-2xl shadow-red hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            Envoyer ma demande de rendez-vous
          </button>

          <div className="flex items-center justify-between gap-4">
            <BackButton onClick={() => setStep(3)} />
            <p className="text-[11px] text-gray-500 text-right leading-relaxed">
              L’envoi se fait depuis votre messagerie — aucune donnée n’est transmise avant.
            </p>
          </div>
        </div>
      )}

      {/* Accès direct pour les pressés */}
      {step < 4 && (
        <p className="text-center">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Demande de rendez-vous')}`}
            className="text-xs font-semibold text-gray-500 hover:text-brand-blue underline underline-offset-4 decoration-brand-lightblue transition-colors"
          >
            Ou écrivez-nous directement : {CONTACT_EMAIL}
          </a>
        </p>
      )}
    </div>
  );
}
