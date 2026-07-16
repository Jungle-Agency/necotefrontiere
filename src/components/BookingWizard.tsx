import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Briefcase,
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  Copy,
  FileText,
  Home,
  Loader2,
  Mail,
  Send,
  Sparkles,
  X
} from 'lucide-react';
import { CONTACT_EMAIL, WEB3FORMS_ACCESS_KEY } from '../config';

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
/* Fenêtre de réservation : de demain à 4 semaines, jours ouvrés uniquement. */
const BOOKING_WINDOW_DAYS = 28;

const DAY_HEADERS = ['lu', 'ma', 'me', 'je', 've', 'sa', 'di'];

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function addDays(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}
function firstOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function dayLabel(d: Date) {
  return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
}

/* Un créneau proposé : jour (timestamp à minuit) + période de la journée.
   Conservés triés chronologiquement pour le récapitulatif. */
interface Slot {
  day: number;
  period: string;
}
function slotLabel(s: Slot) {
  return `${dayLabel(new Date(s.day))} — ${s.period}`;
}
/* Avec l'année : le récapitulatif envoyé par email doit rester sans ambiguïté. */
function slotLabelFull(s: Slot) {
  const label = new Date(s.day).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  return `${label} — ${s.period}`;
}

function StepDots({ step }: { step: 1 | 2 | 3 | 4 }) {
  return (
    <div role="group" aria-label={`Étape ${step} sur 4`} className="flex items-center justify-center gap-0">
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
  const [slots, setSlots] = useState<Slot[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  /* 'api' : envoyé en arrière-plan (Web3Forms) — 'mailto' : via la messagerie du visiteur */
  const [sent, setSent] = useState<false | 'api' | 'mailto'>(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  /* Champ invisible pour les visiteurs : seul un robot le remplit (anti-spam) */
  const [honeypot, setHoneypot] = useState('');
  const [copied, setCopied] = useState(false);

  // Vue calendrier (étape 3)
  const minDay = useMemo(() => addDays(startOfDay(new Date()), 1), []);
  const maxDay = useMemo(() => addDays(minDay, BOOKING_WINDOW_DAYS - 1), [minDay]);
  const [viewMonth, setViewMonth] = useState(() => firstOfMonth(minDay));
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const isSelectable = (d: Date) => {
    const dow = d.getDay();
    return dow !== 0 && dow !== 6 && d >= minDay && d <= maxDay;
  };

  // Cellules du mois affiché : cases vides d'alignement (semaine qui commence lundi) puis les jours
  const monthCells = useMemo<(Date | null)[]>(() => {
    const lead = (viewMonth.getDay() + 6) % 7;
    const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
    return [
      ...Array.from({ length: lead }, () => null),
      ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i + 1))
    ];
  }, [viewMonth]);

  const canPrev = viewMonth.getTime() > firstOfMonth(minDay).getTime();
  const canNext = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1).getTime() <= firstOfMonth(maxDay).getTime();

  const daySlotCount = (d: Date) => slots.filter((s) => s.day === d.getTime()).length;

  // Un clic sur le bouton d'une offre pré-remplit le projet et saute l'étape 1
  useEffect(() => {
    if (initialObjective) {
      setObjective(initialObjective);
      setStep((s) => (s === 1 ? 2 : s));
    }
  }, [initialObjective]);

  const toggleSlot = (day: number, period: string) => {
    setSlots((prev) => {
      if (prev.some((s) => s.day === day && s.period === period)) {
        return prev.filter((s) => !(s.day === day && s.period === period));
      }
      if (prev.length >= MAX_SLOTS) return prev;
      return [...prev, { day, period }].sort(
        (a, b) => a.day - b.day || PERIODS.indexOf(a.period) - PERIODS.indexOf(b.period)
      );
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
    ...slots.map((s) => `   - ${slotLabelFull(s)}`),
    '',
    `Nom : ${name.trim()}`,
    `Email : ${email.trim()}`,
    ...(phone.trim() ? [`Téléphone : ${phone.trim()}`] : []),
    ...(message.trim() ? ['', 'Message :', message.trim()] : []),
    '',
    '— Envoyé depuis le site Né côté frontière'
  ].join('\n');

  const subject = `Demande de RDV découverte — ${name.trim()}`;

  const sendViaMailto = () => {
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(recapText)}`;
    setSent('mailto');
  };

  const sendRequest = async () => {
    if (!WEB3FORMS_ACCESS_KEY) {
      sendViaMailto();
      return;
    }
    setSending(true);
    setSendError(false);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject,
          from_name: name.trim(),
          email: email.trim(),
          botcheck: honeypot,
          message: recapText
        })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setSent('api');
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
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
            {sent === 'api' ? 'Votre demande est envoyée !' : 'Votre demande est prête'}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed max-w-md">
            {sent === 'api'
              ? 'Nous avons bien reçu votre demande — voici votre récapitulatif. Nous confirmons votre créneau par email sous 24 h ouvrées.'
              : 'Votre messagerie s’est ouverte avec le récapitulatif ci-dessous — il ne reste qu’à l’envoyer. Nous confirmons votre créneau par email sous 24 h ouvrées.'}
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

        {sent === 'mailto' && (
          <p className="text-center text-[11px] text-gray-500">
            La messagerie ne s’est pas ouverte ? Copiez le récapitulatif et envoyez-le nous directement.
          </p>
        )}

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {/* ——— Calendrier ——— */}
            <div className="rounded-2xl border-2 border-brand-lightblue bg-white p-4">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => canPrev && setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
                  disabled={!canPrev}
                  aria-label="Mois précédent"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-brand-blue hover:bg-brand-lightblue/50 disabled:opacity-25 disabled:cursor-default transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-display font-black text-sm text-brand-blue capitalize">
                  {viewMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                </span>
                <button
                  onClick={() => canNext && setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
                  disabled={!canNext}
                  aria-label="Mois suivant"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-brand-blue hover:bg-brand-lightblue/50 disabled:opacity-25 disabled:cursor-default transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center mb-1">
                {DAY_HEADERS.map((h) => (
                  <span key={h} className="text-[10px] font-bold uppercase tracking-wider text-brand-blue/40 py-1">
                    {h}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {monthCells.map((d, i) => {
                  if (!d) return <span key={`blank-${i}`} />;
                  const selectable = isSelectable(d);
                  const isSelected = selectedDay?.getTime() === d.getTime();
                  const count = daySlotCount(d);
                  return (
                    <button
                      key={d.getTime()}
                      onClick={() => selectable && setSelectedDay(d)}
                      disabled={!selectable}
                      aria-label={dayLabel(d)}
                      aria-pressed={isSelected}
                      className={`relative aspect-square rounded-xl text-sm font-semibold transition-all cursor-pointer disabled:cursor-default ${
                        isSelected
                          ? 'bg-brand-blue text-white shadow-soft'
                          : selectable
                            ? 'text-brand-blue hover:bg-brand-lightblue/60'
                            : 'text-gray-300'
                      }`}
                    >
                      {d.getDate()}
                      {count > 0 && (
                        <span
                          className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                            isSelected ? 'bg-white' : 'bg-brand-red'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ——— Périodes du jour sélectionné + créneaux retenus ——— */}
            <div className="space-y-4">
              <div className="rounded-2xl border-2 border-brand-lightblue bg-white p-4 min-h-36">
                {selectedDay ? (
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-brand-blue capitalize">{dayLabel(selectedDay)}</p>
                    <div className="flex flex-wrap gap-2">
                      {PERIODS.map((period) => {
                        const active = slots.some(
                          (s) => s.day === selectedDay.getTime() && s.period === period
                        );
                        const full = !active && slots.length >= MAX_SLOTS;
                        return (
                          <button
                            key={period}
                            onClick={() => toggleSlot(selectedDay.getTime(), period)}
                            disabled={full}
                            aria-pressed={active}
                            className={`text-xs font-semibold px-3.5 py-2 rounded-full border transition-all cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed ${
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
                ) : (
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Sélectionnez un jour dans le calendrier pour choisir vos horaires — les week-ends
                    ne sont pas proposés.
                  </p>
                )}
              </div>

              {slots.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-blue/60">
                    Vos créneaux proposés
                  </p>
                  <ul className="space-y-1.5">
                    {slots.map((s) => (
                      <li
                        key={`${s.day}-${s.period}`}
                        className="flex items-center justify-between gap-2 bg-brand-cream border border-brand-lightblue rounded-xl px-3 py-2 text-xs font-semibold text-brand-blue capitalize"
                      >
                        {slotLabel(s)}
                        <button
                          onClick={() => toggleSlot(s.day, s.period)}
                          aria-label={`Retirer le créneau ${slotLabel(s)}`}
                          className="shrink-0 w-5 h-5 rounded-full bg-white text-brand-blue/60 hover:text-brand-red flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
                Vos créneaux : {slots.map(slotLabel).join(' · ')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom *"
              aria-label="Votre nom (obligatoire)"
              aria-required="true"
              autoComplete="name"
              className="w-full bg-white border-2 border-brand-lightblue focus:border-brand-blue rounded-2xl px-4 py-3.5 text-sm text-brand-blue placeholder-gray-400 outline-none transition-colors"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email *"
              aria-label="Votre email (obligatoire)"
              aria-required="true"
              aria-invalid={email.trim() !== '' && !emailValid}
              autoComplete="email"
              className="w-full bg-white border-2 border-brand-lightblue focus:border-brand-blue rounded-2xl px-4 py-3.5 text-sm text-brand-blue placeholder-gray-400 outline-none transition-colors"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Votre téléphone (facultatif)"
              aria-label="Votre téléphone (facultatif)"
              autoComplete="tel"
              className="w-full bg-white border-2 border-brand-lightblue focus:border-brand-blue rounded-2xl px-4 py-3.5 text-sm text-brand-blue placeholder-gray-400 outline-none transition-colors sm:col-span-2"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Un mot sur votre situation ? (facultatif)"
              aria-label="Un mot sur votre situation (facultatif)"
              rows={3}
              className="w-full bg-white border-2 border-brand-lightblue focus:border-brand-blue rounded-2xl px-4 py-3.5 text-sm text-brand-blue placeholder-gray-400 outline-none transition-colors resize-none sm:col-span-2"
            />
            {/* Anti-spam : champ invisible pour les humains, rempli uniquement par les robots */}
            <input
              type="text"
              name="botcheck"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
          </div>

          <button
            onClick={sendRequest}
            disabled={!canSend || sending}
            className="w-full bg-brand-red hover:bg-brand-red/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm px-8 py-4 rounded-2xl shadow-red hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {sending ? 'Envoi en cours…' : 'Envoyer ma demande de rendez-vous'}
          </button>

          {!canSend && (
            <p className="text-center text-[11px] text-gray-500 -mt-3">
              Indiquez votre nom et un email valide pour envoyer votre demande.
            </p>
          )}

          {sendError && (
            <div className="rounded-2xl border border-brand-red/30 bg-brand-red/5 p-4 text-center space-y-2 -mt-2">
              <p className="text-xs font-semibold text-brand-red">
                L’envoi n’a pas abouti — vérifiez votre connexion et réessayez.
              </p>
              <button
                onClick={sendViaMailto}
                className="text-xs font-bold text-brand-blue underline underline-offset-4 hover:text-brand-red transition-colors cursor-pointer"
              >
                Ou envoyez votre demande depuis votre messagerie
              </button>
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            <BackButton onClick={() => setStep(3)} />
            <p className="text-[11px] text-gray-500 text-right leading-relaxed">
              {WEB3FORMS_ACCESS_KEY
                ? 'Vos informations ne servent qu’à organiser ce rendez-vous — rien n’est transmis avant votre clic.'
                : 'L’envoi se fait depuis votre messagerie — aucune donnée n’est transmise avant.'}
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
