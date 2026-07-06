import { useState } from 'react';
import { CalendarCheck, ShieldCheck } from 'lucide-react';
import { InlineWidget } from 'react-calendly';
import { CALENDLY_URL } from '../config';

/**
 * Le widget Calendly (iframe tierce, dépose des cookies) n'est chargé
 * qu'après une action explicite de l'utilisateur : conformité RGPD et
 * gain de performance au chargement initial de la page.
 */
export default function CalendlyBooking() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return <InlineWidget url={CALENDLY_URL} styles={{ minWidth: '100%', height: '700px' }} />;
  }

  return (
    <div className="flex flex-col items-center justify-center text-center gap-5 px-6 py-16 md:py-24">
      <div className="w-14 h-14 rounded-2xl bg-brand-lightblue/60 text-brand-blue flex items-center justify-center">
        <CalendarCheck className="w-7 h-7 text-brand-red" />
      </div>
      <div className="space-y-2 max-w-md">
        <h3 className="text-lg font-display font-black text-brand-blue tracking-tight">
          Afficher l’agenda de réservation
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Cliquez ci-dessous pour charger notre agenda en ligne et choisir votre créneau.
          Confirmation immédiate, sans engagement.
        </p>
      </div>
      <button
        onClick={() => setLoaded(true)}
        className="bg-brand-red hover:bg-brand-red/90 text-white font-bold text-sm px-8 py-4 rounded-2xl shadow-red hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
      >
        <CalendarCheck className="w-4 h-4" />
        Afficher les créneaux disponibles
      </button>
      <p className="flex items-center gap-1.5 text-[11px] text-gray-500 max-w-sm">
        <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-brand-blue/60" />
        En affichant l’agenda, vous acceptez le chargement du service tiers Calendly, susceptible de déposer des cookies.
      </p>
    </div>
  );
}
