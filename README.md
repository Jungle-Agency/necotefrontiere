# NCF — Accompagnement Frontalier

Site vitrine et prise de rendez-vous pour **NCF**, service d'accompagnement des
frontaliers et futurs résidents suisses (bassin genevois & Haute-Savoie).

Application **React + TypeScript + Vite**, stylée avec **Tailwind CSS v4**.
Pas de backend : la prise de rendez-vous se fait via un **widget Calendly** intégré.

## Démarrage

```bash
npm install
npm run dev      # serveur de développement (http://localhost:5173)
npm run build    # build de production dans dist/
npm run preview  # prévisualise le build de production
```

## Configuration du lien Calendly

Le lien Calendly utilisé pour toutes les réservations est centralisé dans
[`src/config.ts`](src/config.ts) :

```ts
export const CALENDLY_URL = 'https://calendly.com/REMPLACE-MOI';
```

Remplace cette valeur par ton vrai lien Calendly et c'est tout.

## Structure

```
index.html              Point d'entrée HTML
src/
  main.tsx              Montage React
  App.tsx              Page (Hero, Services, À propos, FAQ, Footer, modale de RDV)
  config.ts            CALENDLY_URL
  data.ts              Packs, FAQ, témoignages
  types.ts             Types TypeScript
  index.css            Tailwind + thème de marque
  components/
    Header.tsx         Navigation
    BookingFlow.tsx    Modale : choix du pack + widget Calendly
    About.tsx          « Qui sommes-nous » + témoignages
    FAQ.tsx            Accordéon FAQ
  assets/images/       Image hero + image de marque
```
