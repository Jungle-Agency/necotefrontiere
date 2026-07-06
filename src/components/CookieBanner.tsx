import { Cookie } from 'lucide-react';

export type CookieConsent = 'accepted' | 'refused';

const STORAGE_KEY = 'ncf-cookie-consent';

/** Choix mémorisé du visiteur, ou null s'il ne s'est pas encore prononcé. */
export function getCookieConsent(): CookieConsent | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'accepted' || v === 'refused' ? v : null;
  } catch {
    return null;
  }
}

export function saveCookieConsent(consent: CookieConsent) {
  try {
    localStorage.setItem(STORAGE_KEY, consent);
  } catch {
    /* stockage local indisponible (navigation privée stricte) : le bandeau réapparaîtra */
  }
}

interface CookieBannerProps {
  onChoice: (consent: CookieConsent) => void;
  onOpenPrivacy: () => void;
}

export default function CookieBanner({ onChoice, onOpenPrivacy }: CookieBannerProps) {
  const choose = (consent: CookieConsent) => {
    saveCookieConsent(consent);
    onChoice(consent);
  };

  return (
    <div
      role="dialog"
      aria-label="Préférences cookies"
      className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:max-w-md z-40 bg-white border border-brand-lightblue rounded-2xl shadow-soft-lg p-5 animate-fade-in"
    >
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-9 h-9 rounded-xl bg-brand-lightblue/60 flex items-center justify-center">
          <Cookie className="w-4.5 h-4.5 text-brand-red" />
        </span>
        <div className="space-y-1">
          <p className="font-display font-black text-sm text-brand-blue tracking-tight">
            Cookies & confidentialité
          </p>
          <p className="text-xs text-gray-600 leading-relaxed">
            Ce site fonctionne sans cookie publicitaire ni traceur tiers. Votre choix est mémorisé
            dans votre navigateur et s’appliquera à d’éventuels outils de mesure d’audience.{' '}
            <button
              onClick={onOpenPrivacy}
              className="underline underline-offset-2 text-brand-blue hover:text-brand-red transition-colors cursor-pointer"
            >
              En savoir plus
            </button>
          </p>
        </div>
      </div>

      <div className="flex gap-2.5 mt-4">
        <button
          onClick={() => choose('refused')}
          className="flex-1 bg-white border-2 border-brand-lightblue hover:border-brand-blue/40 text-brand-blue font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer"
        >
          Refuser
        </button>
        <button
          onClick={() => choose('accepted')}
          className="flex-1 bg-brand-red hover:bg-brand-red/90 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-red transition-all cursor-pointer"
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
