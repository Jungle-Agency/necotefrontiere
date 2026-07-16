# NCF — Accompagnement Frontalier

Site vitrine et prise de rendez-vous pour **NCF (Né côté frontière)**, service
d'accompagnement des frontaliers et futurs résidents suisses (bassin genevois &
Haute-Savoie).

Application **React + TypeScript + Vite**, stylée avec **Tailwind CSS v4**.
Pas de backend : la demande de rendez-vous se fait via un parcours en 4 étapes
qui génère un email récapitulatif (`mailto:`) vers l'adresse de contact.

## Démarrage

```bash
npm install
npm run dev      # serveur de développement (http://localhost:5173)
npm run build    # build de production dans dist/
npm run preview  # prévisualise le build de production
```

## Configuration

- **Email de contact** : centralisé dans [`src/config.ts`](src/config.ts)
  (`CONTACT_EMAIL`) — utilisé par le parcours de RDV et les liens du site.
- **Envoi du formulaire** : renseigner `WEB3FORMS_ACCESS_KEY` dans
  [`src/config.ts`](src/config.ts) pour que la demande de RDV parte en
  arrière-plan (clé gratuite sur [web3forms.com](https://web3forms.com), reçue
  par email en entrant `CONTACT_EMAIL`). Sans clé, le site retombe sur l'envoi
  via la messagerie du visiteur (`mailto:`).
- **Offres, FAQ, témoignages** : [`src/data.ts`](src/data.ts).
  ⚠️ La FAQ est dupliquée dans le JSON-LD de [`index.html`](index.html)
  (rich snippets Google) — penser à synchroniser les deux à chaque modification.
- **Domaine** : l'URL canonique, les balises Open Graph et
  [`public/sitemap.xml`](public/sitemap.xml) pointent vers
  `https://necotefrontiere.com/` — à ajuster si le domaine change.
- **Mentions légales** : renseigner le numéro SIRET dans
  [`src/components/LegalModal.tsx`](src/components/LegalModal.tsx) dès réception
  de l'immatriculation (actuellement « immatriculation en cours »).

## Structure

```
index.html              Point d'entrée HTML (SEO, Open Graph, JSON-LD)
public/
  fonts/                Polices auto-hébergées (woff2 variables, sous-ensemble latin)
  og-image.jpg          Image d'aperçu pour les partages (1200×630)
src/
  main.tsx              Montage React
  App.tsx               Page (Hero, Étapes, Services, RDV, À propos, FAQ, Footer)
  config.ts             CONTACT_EMAIL
  data.ts               Packs, FAQ, témoignages
  types.ts              Types TypeScript
  index.css             Tailwind + thème de marque + @font-face
  components/
    Header.tsx          Navigation (desktop + drawer mobile)
    HowItWorks.tsx      Section « Comment ça se passe »
    BookingWizard.tsx   Parcours de RDV en 4 étapes (calendrier + récapitulatif mailto)
    About.tsx           « Qui sommes-nous » + témoignages
    FAQ.tsx             Accordéon FAQ filtrable par catégorie
    LegalModal.tsx      Mentions légales & CGU / Politique de confidentialité
    CookieBanner.tsx    Bandeau de consentement (choix mémorisé en localStorage)
```

## Notes

- Les polices sont auto-hébergées (`public/fonts/`) : aucune requête vers
  Google Fonts (RGPD). Pour changer les familles/graisse, remplacer les fichiers
  woff2 et les blocs `@font-face` de `src/index.css`.
- La navigation met à jour l'ancre de l'URL (`/#services`, `/#faq`…) : les
  sections sont partageables par lien direct.
