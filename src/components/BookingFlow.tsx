import { useState, useMemo } from 'react';
import { Check, Clock, CalendarClock, Mail, Phone } from 'lucide-react';
import { SERVICE_PACKAGES } from '../data';
// Calendly désactivé pour l'instant.
// Pour le réactiver : remettre l'import { InlineWidget } from 'react-calendly'
// et { CALENDLY_URL } from '../config', puis restaurer le bloc widget (voir section 2).

interface BookingFlowProps {
  initialPackageId: string | null;
  onClose?: () => void;
}

export default function BookingFlow({ initialPackageId }: BookingFlowProps) {
  const [selectedPkgId, setSelectedPkgId] = useState<string | null>(initialPackageId);

  const selectedPkg = useMemo(
    () => SERVICE_PACKAGES.find((p) => p.id === selectedPkgId) || SERVICE_PACKAGES[0],
    [selectedPkgId]
  );

  return (
    <div
      id="booking-flow-container"
      className="bg-white rounded-3xl overflow-hidden max-w-4xl mx-auto"
    >
      {/* Flow Header */}
      <div className="bg-brand-blue text-white px-6 py-6 md:px-8">
        <span className="text-xs tracking-widest text-brand-lightblue font-semibold uppercase">
          Prise de rendez-vous
        </span>
        <h3 className="text-xl md:text-2xl font-bold font-sans">Réservez votre accompagnement</h3>
        <p className="text-xs text-brand-lightblue mt-1">
          Choisissez votre prestation, puis sélectionnez directement un créneau dans notre agenda.
        </p>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Package selector */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-wider block">
            1. Votre prestation
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SERVICE_PACKAGES.map((pkg) => {
              const isActive = pkg.id === selectedPkg.id;
              return (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPkgId(pkg.id)}
                  className={`text-left p-4 rounded-2xl border transition-all relative flex justify-between items-center gap-3 cursor-pointer ${
                    isActive
                      ? 'border-brand-blue bg-brand-lightblue/20 ring-2 ring-brand-blue/30'
                      : 'border-gray-200 hover:border-brand-blue/50 bg-white'
                  }`}
                >
                  <span>
                    <span className="block font-bold text-brand-blue text-sm">{pkg.name}</span>
                    <span className="text-[11px] text-brand-blue/70 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-brand-red" /> {pkg.duration || 'Sur-mesure'}
                    </span>
                  </span>
                  <span className="text-sm font-bold text-brand-blue shrink-0">
                    {pkg.price === 0 ? 'Gratuit' : `${pkg.price} €`}
                  </span>
                  {isActive && (
                    <span className="absolute -top-1.5 -right-1.5 bg-brand-blue text-white rounded-full p-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected package summary */}
        <div className="bg-brand-cream border border-brand-lightblue rounded-2xl p-5">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
              Inclus dans « {selectedPkg.name} » :
            </span>
            <span className="text-sm font-bold text-brand-red bg-white border border-brand-lightblue px-3 py-1 rounded-lg">
              {selectedPkg.price === 0 ? 'Gratuit' : `${selectedPkg.price} €`}
            </span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
            {selectedPkg.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prise de rendez-vous — Calendly désactivé pour l'instant */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-wider block">
            2. Réservez votre rendez-vous
          </span>

          <div className="rounded-2xl border border-brand-lightblue bg-brand-cream/50 p-6 md:p-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-lightblue/60 text-brand-blue mb-4">
              <CalendarClock className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-brand-blue mb-1">
              Réservation en ligne bientôt disponible
            </h4>
            <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
              En attendant la mise en place de notre agenda en ligne, contactez-nous directement
              pour fixer votre rendez-vous «&nbsp;{selectedPkg.name}&nbsp;». Réponse sous 24&nbsp;h.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`mailto:contact@ncf-accompagnement.fr?subject=${encodeURIComponent(
                  `Demande de rendez-vous — ${selectedPkg.name}`
                )}`}
                className="inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all"
              >
                <Mail className="w-4 h-4" />
                Nous écrire
              </a>
              <a
                href="tel:+41225521400"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-brand-cream text-brand-blue border border-brand-blue font-semibold text-sm px-5 py-3 rounded-xl transition-all"
              >
                <Phone className="w-4 h-4" />
                Nous appeler
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
