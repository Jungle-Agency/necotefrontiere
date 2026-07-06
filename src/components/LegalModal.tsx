import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export type LegalTab = 'cgu' | 'privacy';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalTab;
  onClose: () => void;
}

const LAST_UPDATE = '6 juillet 2026';

function CGUContent() {
  return (
    <div>
      <h2>Conditions Générales d’Utilisation</h2>
      <p><strong>Dernière mise à jour :</strong> {LAST_UPDATE}</p>

      <h2>1. Mentions légales</h2>
      <p>
        Le présent site est édité par Né côté frontière (NCF), service d’accompagnement des
        travailleurs frontaliers et futurs résidents entre la France et la Suisse.
      </p>
      <ul>
        <li><strong>Raison sociale :</strong> Né côté frontière (NCF)</li>
        <li><strong>Siège :</strong> Bassin genevois (Annemasse — Genève)</li>
        <li><strong>Email :</strong> contact@ncf-accompagnement.fr</li>
      </ul>

      <h2>2. Objet</h2>
      <p>
        Les présentes Conditions Générales d’Utilisation (CGU) ont pour objet de définir les
        modalités d’accès et d’utilisation du présent site internet (ci-après le « Site »).
        En accédant au Site, l’utilisateur accepte sans réserve les présentes CGU.
      </p>

      <h2>3. Accès au site</h2>
      <p>
        Le Site est accessible gratuitement à tout utilisateur disposant d’un accès à internet.
        NCF se réserve le droit de suspendre, restreindre ou interrompre l’accès au Site, en tout
        ou partie, sans préavis ni indemnité, pour des raisons de maintenance ou pour tout autre motif.
      </p>

      <h2>4. Services proposés</h2>
      <p>Le Site a pour vocation de présenter les activités et services de NCF, notamment :</p>
      <ul>
        <li>Optimisation et refonte de CV aux normes du marché de l’emploi suisse</li>
        <li>Accompagnement à la recherche d’emploi dans le bassin genevois et en Suisse romande</li>
        <li>Accompagnement à l’installation et au statut de travailleur frontalier (assurance maladie, fiscalité, banque, démarches administratives)</li>
        <li>Rendez-vous de conseil personnalisés, en ligne ou sur place</li>
      </ul>
      <p>
        Les informations présentes sur le Site (y compris les tarifs et le contenu des offres) sont
        fournies à titre indicatif et ne constituent en aucun cas un engagement contractuel. Les
        prestations payantes font l’objet d’une confirmation individuelle lors de la prise de rendez-vous.
      </p>

      <h2>5. Propriété intellectuelle</h2>
      <p>
        L’ensemble des contenus présents sur le Site (textes, images, graphismes, logos, vidéos,
        icônes, sons, logiciels, etc.) est protégé par les lois françaises, suisses et
        internationales relatives à la propriété intellectuelle. Toute reproduction,
        représentation, modification ou exploitation, totale ou partielle, de ces contenus est
        strictement interdite sans l’autorisation écrite préalable de NCF.
      </p>

      <h2>6. Prise de rendez-vous</h2>
      <p>
        Le Site propose un module de demande de rendez-vous. Les informations que vous y
        renseignez restent dans votre navigateur et ne nous sont transmises — par email, depuis
        votre propre messagerie — que lorsque vous validez l’envoi de votre demande. Elles sont
        traitées conformément à notre Politique de Confidentialité.
      </p>

      <h2>7. Responsabilité</h2>
      <p>
        NCF s’efforce de fournir des informations exactes et à jour sur le Site (notamment en
        matière de réglementation frontalière, fiscale et d’assurance), mais ne saurait garantir
        l’exhaustivité ou l’exactitude de celles-ci. NCF décline toute responsabilité :
      </p>
      <ul>
        <li>En cas d’interruption ou d’inaccessibilité du Site</li>
        <li>En cas de dommages directs ou indirects résultant de l’utilisation du Site</li>
        <li>Concernant le contenu des sites tiers accessibles via des liens hypertextes</li>
      </ul>

      <h2>8. Liens hypertextes</h2>
      <p>
        Le Site peut contenir des liens vers des sites tiers. NCF n’exerce aucun contrôle sur ces
        sites et décline toute responsabilité quant à leur contenu ou leurs pratiques en matière de
        protection des données.
      </p>

      <h2>9. Droit applicable et juridiction</h2>
      <p>
        Les présentes CGU sont régies par le droit français. En cas de litige et à défaut de
        résolution amiable, les tribunaux compétents seront ceux du ressort du siège de NCF, sauf
        dispositions légales contraires.
      </p>

      <h2>10. Modification des CGU</h2>
      <p>
        NCF se réserve le droit de modifier les présentes CGU à tout moment. Les modifications
        entrent en vigueur dès leur publication sur le Site. L’utilisateur est invité à consulter
        régulièrement les CGU.
      </p>
    </div>
  );
}

function PrivacyContent() {
  return (
    <div>
      <h2>Politique de Confidentialité</h2>
      <p><strong>Dernière mise à jour :</strong> {LAST_UPDATE}</p>

      <h2>1. Introduction</h2>
      <p>
        NCF accorde une importance particulière à la protection de la vie privée de ses
        utilisateurs. La présente Politique de Confidentialité décrit les données personnelles que
        nous collectons, les raisons pour lesquelles nous les collectons et la manière dont nous
        les utilisons, conformément au Règlement Général sur la Protection des Données (RGPD) de
        l’Union européenne et à la Loi fédérale suisse sur la protection des données (LPD).
      </p>

      <h2>2. Responsable du traitement</h2>
      <ul>
        <li><strong>Raison sociale :</strong> Né côté frontière (NCF)</li>
        <li><strong>Siège :</strong> Bassin genevois (Annemasse — Genève)</li>
        <li><strong>Email :</strong> contact@ncf-accompagnement.fr</li>
      </ul>

      <h2>3. Données collectées</h2>
      <h3>3.1 Données communiquées volontairement</h3>
      <p>Lorsque vous nous adressez une demande de rendez-vous via le Site, nous pouvons collecter :</p>
      <ul>
        <li>Nom et prénom</li>
        <li>Adresse email</li>
        <li>Numéro de téléphone (le cas échéant)</li>
        <li>Les informations que vous renseignez sur votre situation et votre projet</li>
      </ul>
      <h3>3.2 Données collectées automatiquement</h3>
      <p>Lors de votre visite sur le Site, certaines données techniques peuvent être collectées automatiquement :</p>
      <ul>
        <li>Adresse IP</li>
        <li>Type de navigateur et version</li>
        <li>Système d’exploitation</li>
        <li>Pages visitées et durée de la visite</li>
        <li>Source de référence</li>
      </ul>

      <h2>4. Finalités du traitement</h2>
      <p>Les données personnelles collectées sont utilisées pour :</p>
      <ul>
        <li>Organiser et assurer les rendez-vous de conseil que vous réservez</li>
        <li>Répondre à vos demandes de contact</li>
        <li>Améliorer l’expérience utilisateur sur le Site</li>
        <li>Établir des statistiques de fréquentation anonymes</li>
        <li>Assurer le bon fonctionnement technique du Site</li>
      </ul>

      <h2>5. Base juridique du traitement</h2>
      <p>Le traitement de vos données repose sur :</p>
      <ul>
        <li><strong>Votre consentement</strong> lorsque vous prenez rendez-vous ou nous contactez</li>
        <li><strong>L’exécution de mesures précontractuelles ou contractuelles</strong> pour la réalisation des prestations réservées</li>
        <li><strong>Notre intérêt légitime</strong> pour l’amélioration de nos services et le bon fonctionnement du Site</li>
      </ul>

      <h2>6. Partage des données</h2>
      <p>
        NCF ne vend, ne loue ni ne cède vos données personnelles à des tiers. Vos données peuvent
        être partagées uniquement avec :
      </p>
      <ul>
        <li>Nos prestataires techniques (hébergement) dans la mesure strictement nécessaire</li>
        <li>Les autorités compétentes en cas d’obligation légale</li>
      </ul>

      <h2>7. Durée de conservation</h2>
      <p>
        Les données personnelles sont conservées pendant la durée nécessaire aux finalités pour
        lesquelles elles ont été collectées :
      </p>
      <ul>
        <li><strong>Données de contact et de rendez-vous :</strong> 24 mois après le dernier échange</li>
        <li><strong>Données de navigation :</strong> 13 mois maximum</li>
      </ul>

      <h2>8. Cookies</h2>
      <p>
        Le Site n’utilise pas de cookie publicitaire ni de traceur tiers, et ne charge aucun
        service tiers de suivi. Vous pouvez par ailleurs configurer votre navigateur pour refuser
        les cookies.
      </p>

      <h2>9. Vos droits</h2>
      <p>Conformément au RGPD et à la LPD, vous disposez des droits suivants :</p>
      <ul>
        <li><strong>Droit d’accès :</strong> obtenir une copie de vos données personnelles</li>
        <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
        <li><strong>Droit à l’effacement :</strong> demander la suppression de vos données</li>
        <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
        <li><strong>Droit d’opposition :</strong> vous opposer au traitement de vos données</li>
        <li><strong>Droit de retrait du consentement :</strong> retirer votre consentement à tout moment</li>
      </ul>
      <p>Pour exercer ces droits, contactez-nous à : <strong>contact@ncf-accompagnement.fr</strong></p>

      <h2>10. Sécurité</h2>
      <p>
        NCF met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos
        données personnelles contre tout accès non autorisé, toute altération, divulgation ou
        destruction.
      </p>

      <h2>11. Transfert international de données</h2>
      <p>
        Les données personnelles sont stockées et traitées en France, en Suisse ou dans l’Espace
        Économique Européen (EEE). En cas de transfert vers un pays ne bénéficiant pas d’un niveau
        de protection adéquat, des garanties appropriées (clauses contractuelles types) seront
        mises en place.
      </p>

      <h2>12. Modification de la politique</h2>
      <p>
        NCF se réserve le droit de modifier la présente Politique de Confidentialité à tout moment.
        Toute modification sera publiée sur cette page avec une date de mise à jour actualisée.
      </p>

      <h2>13. Contact</h2>
      <p>
        Pour toute question relative à la présente Politique de Confidentialité, vous pouvez nous
        contacter à : <strong>contact@ncf-accompagnement.fr</strong>
      </p>
    </div>
  );
}

export default function LegalModal({ isOpen, initialTab = 'cgu', onClose }: LegalModalProps) {
  const [tab, setTab] = useState<LegalTab>(initialTab);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Informations légales">
      <div className="absolute inset-0 bg-brand-blue/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-[95%] max-w-3xl max-h-[85vh] bg-white border border-brand-lightblue rounded-3xl overflow-hidden flex flex-col shadow-soft-lg animate-scale-up">
        {/* Barre d'onglets */}
        <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-brand-lightblue shrink-0">
          <div className="flex gap-1 bg-brand-cream p-1 rounded-full border border-brand-lightblue/60">
            <button
              onClick={() => setTab('cgu')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                tab === 'cgu' ? 'bg-brand-blue text-white shadow-soft' : 'text-brand-blue/60 hover:text-brand-blue'
              }`}
            >
              Mentions légales & CGU
            </button>
            <button
              onClick={() => setTab('privacy')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                tab === 'privacy' ? 'bg-brand-blue text-white shadow-soft' : 'text-brand-blue/60 hover:text-brand-blue'
              }`}
            >
              Confidentialité
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-brand-blue/50 hover:text-brand-blue transition-colors p-1.5 cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenu défilant */}
        <div className="overflow-y-auto p-6 md:p-8 legal-content">
          {tab === 'cgu' ? <CGUContent /> : <PrivacyContent />}
        </div>
      </div>
    </div>
  );
}
