import { ServicePackage, FAQItem, Testimonial } from './types';

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'cv-boost',
    name: 'CV Boost',
    price: 119,
    duration: '2 à 4 jours ouvrés',
    description: 'Pour ceux qui veulent un CV clair, professionnel et adapté au marché de l’emploi : personnes en recherche d’emploi, étudiants et jeunes diplômés.',
    features: [
      'Analyse et optimisation de votre CV actuel',
      'Refonte complète du CV (structure + mise en page + contenu)',
      'Adaptation au secteur d’activité visé (France / Suisse)',
      'Optimisation des mots-clés pour recruteurs',
      '1 aller-retour de modifications'
    ],
    badge: 'Essentiel CV',
    icon: 'FileText'
  },
  {
    id: 'cv-boost-coaching',
    name: 'CV Boost + Coaching Express',
    price: 169,
    duration: '3 à 5 jours ouvrés',
    description: 'L’offre complète pour maximiser vos chances d’être recruté rapidement, décrocher des entretiens et être guidé sur votre orientation.',
    features: [
      'Refonte complète de votre CV optimisé recruteur',
      'Lettre de motivation personnalisée selon votre secteur',
      'Rendez-vous de 40 minutes (conseils + stratégie emploi + orientation)',
      'Optimisation des candidatures (comment postuler efficacement)',
      '1 aller-retour de modifications'
    ],
    badge: 'Premium',
    icon: 'Briefcase'
  },
  {
    id: 'travail',
    name: 'Pack Recherche Travail',
    price: 200,
    duration: 'Suivi sur 1 mois',
    description: 'Votre stratégie de ciblage et préparation intensive pour décrocher votre futur poste à Genève.',
    features: [
      'Diagnostic approfondi du marché suisse dans votre secteur',
      'Techniques d’accès au marché caché (80% des postes en Suisse)',
      'Optimisation de votre profil LinkedIn pour les recruteurs suisses',
      'Simulation d’entretien d’embauche avec questions locales types',
      'Suivi hebdomadaire par email/WhatsApp pendant 30 jours'
    ],
    badge: 'Le Plus Populaire',
    icon: 'Briefcase'
  },
  {
    id: 'installation',
    name: 'Pack Installation',
    price: 400,
    duration: 'Accompagnement complet',
    description: 'Devenez frontalier ou résident suisse en toute sérénité sans commettre d’erreurs administratives coûteuses.',
    features: [
      'Aide à la recherche de logement (bassin genevois / Haute-Savoie)',
      'Étude comparative personnalisée LAMal vs CMU (Assurance Maladie)',
      'Explication et optimisation de la fiscalité (impôt à la source, quasi-résident)',
      'Aide à comprendre les démarches douanières',
      'Ouverture et choix des banques suisses',
      'Gestion des devises et rapatriement du salaire',
      'Conseils sur les principales démarches administratives liées à l’installation',
      'Assistance directe par messagerie pendant toute votre installation'
    ],
    badge: 'Sérénité Totale',
    icon: 'Home'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'Général',
    question: 'Quelle est la différence fiscale entre travailler à Genève et en Haute-Savoie ?',
    answer: 'À Genève, l’impôt sur le revenu est prélevé directement à la source sur votre salaire suisse. En Haute-Savoie (si vous êtes résident et travaillez dans d’autres cantons comme Vaud), vous payez vos impôts en France. NCF vous aide à décrypter les accords fiscaux pour simuler précisément votre revenu net disponible après impôts et cotisations.'
  },
  {
    category: 'Installation',
    question: 'Comment choisir entre l’assurance suisse LAMal et la CMU française ?',
    answer: 'En tant que travailleur frontalier, vous disposez d’un « droit d’option » unique pour choisir votre couverture maladie entre le système suisse (LAMal frontalier) et le système de sécurité sociale français (CMU). Ce choix est définitif et irrévocable. Nous analysons votre structure familiale, vos revenus et vos besoins médicaux pour calculer la solution la plus avantageuse pour vous (les économies peuvent s’élever à plusieurs milliers d’euros par an).'
  },
  {
    category: 'Emploi',
    question: 'Pourquoi un CV français n’est-il généralement pas accepté en Suisse ?',
    answer: 'Le marché du travail suisse a des codes stricts. Les recruteurs s’attendent à voir des mentions spécifiques : votre permis de travail actuel ou ciblé (G pour frontalier, B pour résident), votre nationalité, une photo extrêmement professionnelle, et un niveau de détail précis sur vos tâches et vos réalisations chiffrées. Notre Pack CV adapte votre profil pour franchir ce premier filtre décisif.'
  },
  {
    category: 'Général',
    question: 'Qu’est-ce que le statut de quasi-résident à Genève ?',
    answer: 'Si au moins 90 % des revenus de votre foyer proviennent de Suisse, vous pouvez demander à être traité fiscalement comme un résident suisse (quasi-résident). Cela vous ouvre le droit de déduire vos charges réelles (loyer, frais de transport, pensions, cotisations au 3ème pilier). NCF effectue une simulation pour valider si ce statut est financièrement opportun pour votre foyer.'
  },
  {
    category: 'Installation',
    question: 'Comment gérer mon salaire en Francs Suisses (CHF) pour éviter les frais de change ?',
    answer: 'Recevoir un salaire en CHF et vivre en France (Zone Euro) implique un risque de change et des frais bancaires. Nous vous accompagnons pour ouvrir les bons comptes (système de virement international à frais minimes, compte multi-devises) afin de rapatrier votre salaire au meilleur taux du marché sans passer par les commissions abusives des banques traditionnelles.'
  },
  {
    category: 'Emploi',
    question: 'Combien de temps faut-il pour obtenir un permis de travail frontalier (Permis G) ?',
    answer: 'C’est l’employeur suisse qui effectue la demande de permis G auprès de l’office cantonal de la population et des migrations (OCPM à Genève). Les délais varient généralement de 2 à 4 semaines. Vous pouvez commencer à travailler dès le dépôt du dossier par votre employeur.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Mélanie D.',
    role: 'Infirmière à l’Hôpital de Genève (HUG)',
    location: 'Habite à Annemasse',
    text: 'Le diagnostic gratuit m’a permis de comprendre directement mes options d’assurance maladie. J’ai ensuite pris le Pack Installation : un gain de temps inestimable pour choisir la LAMal et ouvrir mon compte de rapatriement de salaire sans frais !',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120'
  },
  {
    name: 'Thomas R.',
    role: 'Chef de projet IT',
    location: 'Habite à Saint-Julien-en-Genevois',
    text: 'Je cherchais à travailler à Genève depuis 6 mois sans succès. Avec le Pack CV de NCF, mon CV a été complètement transformé. Résultat : 3 entretiens décrochés en 3 semaines, et un contrat signé avec le permis G en poche ! Je recommande les yeux fermés.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120'
  },
  {
    name: 'Julien et Sarah',
    role: 'Ingénieur & Enseignante',
    location: 'S’installent en Haute-Savoie',
    text: 'Nous déménagions depuis Lyon. Le Pack Recherche et le Pack Installation nous ont évité des erreurs sur l’impôt à la source genevois et la déclaration de nos voitures à la douane. Des conseils ultra-concrets par des experts qui connaissent par cœur le terrain !',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=120'
  }
];
