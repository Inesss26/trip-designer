# MyTripDesigner

Site vitrine d'une travel planner qui conçoit des voyages sur mesure, avec un
back-office protégé par mot de passe pour gérer les voyages, les formules, les
avis, les textes du site et les demandes de contact.

Il n'y a **ni compte client ni paiement** : le seul espace authentifié est
`/admin`, réservé à la créatrice du site.

## Stack

- **Next.js 16** (App Router, React 19, Server Actions) et **TypeScript**
- **Tailwind CSS v4**, avec quelques composants **shadcn/ui** utilisés surtout
  dans le back-office
- **Supabase** (PostgreSQL + Storage) pour les données et les images
- **zod** pour la validation, **jose** pour la session admin signée
- **Vitest** pour les tests unitaires

> Le design de la partie publique est volontairement minimal : il est prévu
> d'être remplacé par les maquettes Figma. La structure des pages et l'accès aux
> données sont en place, la mise en forme reste à faire.

## Démarrage rapide

```bash
npm install
npm run dev
```

Le site est servi sur [http://localhost:43127](http://localhost:43127).

Sans configuration, l'application démarre en **mode démonstration** : les
contenus viennent d'un jeu de données en mémoire (`lib/data/demo.ts`), et le mot
de passe d'administration est `admin`. Les modifications faites dans
l'administration fonctionnent, mais ne survivent pas au redémarrage du serveur.
Un bandeau le rappelle sur chaque écran du back-office.

## Variables d'environnement

Copiez `.env.example` vers `.env.local` et renseignez :

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé publique, utilisée pour lire les contenus publiés et enregistrer une demande de contact |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé serveur, utilisée uniquement par l'administration. **Ne jamais l'exposer au navigateur** |
| `ADMIN_PASSWORD` | Mot de passe unique d'accès à `/admin` |
| `ADMIN_SESSION_SECRET` | Secret de signature du cookie de session, 32 caractères minimum (`openssl rand -base64 32`) |

En production, l'absence de `ADMIN_SESSION_SECRET` fait échouer le démarrage de
la session, et l'absence de `ADMIN_PASSWORD` rend l'administration inaccessible :
c'est volontaire, pour ne jamais déployer un back-office ouvert.

## Mise en place de Supabase

1. Créer un projet sur [supabase.com](https://supabase.com).
2. Appliquer le schéma : ouvrir l'éditeur SQL du dashboard et exécuter
   [supabase/migrations/0001_init.sql](supabase/migrations/0001_init.sql). Ce
   fichier crée les tables, les index, les déclencheurs `updated_at`, les
   politiques RLS et le bucket Storage public `media`.
3. Optionnel : exécuter [supabase/seed.sql](supabase/seed.sql) pour partir avec
   le même contenu que le mode démonstration. Le seed est idempotent et ne
   réécrit pas les textes déjà modifiés depuis l'administration.
4. Reporter les trois variables Supabase dans `.env.local`, puis relancer
   `npm run dev`. Le bandeau « mode démonstration » disparaît.

Avec la CLI Supabase, les étapes 2 et 3 se résument à `supabase db push` puis
`supabase db seed`.

### Modèle de données

| Table | Contenu |
| --- | --- |
| `trips` | Voyages et exemples d'itinéraires (photos, durée, tarif indicatif, statut) |
| `services` | Formules proposées, avec ce qui est inclus |
| `reviews` | Avis clients, avec modération (`pending` / `published`) |
| `leads` | Demandes envoyées depuis le formulaire de contact, avec suivi et notes internes |
| `site_content` | Valeurs des textes éditables du site, identifiés par une clé (`home.hero.title`, …) |

Le catalogue des textes éditables (clés, libellés affichés dans
l'administration, type de champ) est défini dans le code, dans `demoContent`
([lib/data/demo.ts](lib/data/demo.ts)) : la base ne stocke que les valeurs
modifiées. Ajouter un bloc de texte ne demande donc aucune migration, et
l'écran Contenus fonctionne même si le seed n'a pas été appliqué.

### Sécurité des accès

RLS est active sur toutes les tables :

- la clé `anon` ne lit que les lignes `status = 'published'` de `trips`,
  `services` et `reviews`, plus l'intégralité de `site_content` ;
- la clé `anon` peut insérer dans `leads` mais ne peut **pas** les relire : les
  demandes ne sortent que côté serveur, dans l'administration ;
- toutes les écritures de l'administration passent par la clé `service_role`,
  côté serveur uniquement.

## Administration

`/admin` donne accès au tableau de bord, aux voyages, aux formules, aux avis,
aux demandes et aux contenus de pages.

Le contrôle d'accès fonctionne à trois niveaux :

1. [proxy.ts](proxy.ts) redirige vers `/admin/login` quand le cookie de session
   est absent ou invalide — c'est un confort de navigation ;
2. [app/admin/(dashboard)/layout.tsx](app/admin/(dashboard)/layout.tsx) revérifie
   la session avant de rendre quoi que ce soit ;
3. chaque Server Action de mutation appelle `assertAdminSession()`
   ([lib/auth/guard.ts](lib/auth/guard.ts)).

Le mot de passe est comparé en temps constant
(`crypto.timingSafeEqual`), et la session est un JWT HS256 stocké dans un cookie
`httpOnly` valable sept jours ([lib/auth/session.ts](lib/auth/session.ts)).

> Il n'y a pas de limitation de débit sur la connexion : en serverless, un
> compteur en mémoire ne serait pas fiable. Les tentatives ratées sont
> simplement ralenties. Pour durcir, ajouter une règle de rate limiting dans le
> WAF Vercel sur `/admin/login`, ou un compteur partagé (Upstash Redis).

### Images

Les photos de voyages acceptent soit une URL collée dans le champ prévu, soit un
envoi de fichier vers le bucket Storage `media` (JPEG, PNG, WebP ou AVIF, 8 Mo
maximum). L'envoi de fichiers nécessite Supabase ; en mode démonstration, seule
l'URL est possible. Les images de démonstration pointent vers `picsum.photos` et
sont à remplacer par les photos réelles.

Tout nouveau domaine d'images doit être déclaré dans `images.remotePatterns`
([next.config.ts](next.config.ts)).

### Propagation des modifications

Les pages publiques sont mises en cache. Après chaque enregistrement dans
l'administration, `revalidatePublicPages()`
([lib/revalidate.ts](lib/revalidate.ts)) invalide l'accueil, la page contact et
les pages de voyages : le changement est visible immédiatement. Un délai de
revalidation d'une heure sert de filet de sécurité pour les contenus modifiés
directement dans Supabase.

## Structure du projet

```
app/
  page.tsx                    Accueil (formules, voyages, avis, à propos)
  voyages/[slug]/             Page d'un voyage
  contact/                    Formulaire de demande + Server Action
  admin/login/                Écran de connexion
  admin/(dashboard)/          Back-office, protégé par le layout
components/
  site/                       Composants publics
  admin/                      Composants du back-office
  ui/                         Primitives shadcn/ui
lib/
  auth/                       Session signée et garde-fous
  data/                       Accès aux données, avec bascule mode démo
  supabase/                   Clients anon / service_role, Storage
  validation/schemas.ts       Schémas zod partagés formulaires ↔ base
proxy.ts                      Redirection des routes /admin
supabase/                     Migration SQL et seed
tests/                        Tests Vitest
```

## Scripts

```bash
npm run dev        # serveur de développement sur le port 43127
npm run build      # build de production
npm run start      # serveur de production
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run test       # Vitest
```

## Déploiement sur Vercel

1. Importer le dépôt sur Vercel : le framework Next.js est détecté
   automatiquement, aucune configuration supplémentaire n'est nécessaire.
2. Déclarer les cinq variables d'environnement du tableau ci-dessus pour les
   environnements Production et Preview.
3. Déployer. Vérifier ensuite que `/admin/login` demande bien le mot de passe et
   que le formulaire de contact enregistre une demande visible dans
   `/admin/demandes`.

`/admin` et `/admin/login` sont exclus de l'indexation par les moteurs de
recherche via leurs métadonnées `robots`.

## Ce qui reste à faire

- Habillage graphique de la partie publique d'après les maquettes Figma.
- Notification par e-mail à la réception d'une demande, si souhaité (les
  demandes sont pour l'instant consultées dans l'administration).
