# Simon Vallée — Portfolio de création de sites web

Portfolio bilingue (FR/EN) et trois sites de démonstration pour des entreprises
fictives. Sites 100 % statiques : HTML, CSS et un peu de JavaScript, sans
framework ni étape de compilation.

## Contenu

| Chemin | Page | Langue |
| --- | --- | --- |
| `/` | Portfolio (accueil) | Français |
| `/en/` | Portfolio (accueil) | Anglais |
| `/mentions-legales.html`, `/en/legal-notice.html` | Mentions légales du portfolio | FR / EN |
| `/demos/plombier/` | Kerflux Plomberie — artisan plombier | Français |
| `/demos/restaurant/` et `/demos/restaurant/en/` | Salicorne — bistrot marin | Bilingue FR / EN |
| `/demos/coach/` | Tidewise Coaching — coach indépendante | Anglais |

Chaque démo a sa page de mentions légales type, un bandeau discret « Site de
démonstration » et la balise `noindex` : les entreprises fictives n’apparaîtront
pas dans Google (le référencement de base reste en place pour la démonstration :
titres, descriptions, données structurées Schema.org).

```
assets/
  css/portfolio.css      styles du portfolio (thème clair et sombre)
  css/demo-banner.css    bandeau « démo » et éléments communs aux formulaires
  js/main.js             menu mobile, année du pied de page, repli des photos
  js/forms.js            envoi des formulaires via Web3Forms  ← clé à coller ici
  fonts/                 polices auto-hébergées (licence SIL OFL)
  img/                   favicon et image de partage (og-image.png)
demos/<démo>/style.css   chaque démo a sa propre identité visuelle
```

## Mettre en ligne gratuitement (GitHub Pages)

1. Sur GitHub : **Settings → Pages**.
2. Source : **Deploy from a branch**, branche `main` (après fusion de cette branche), dossier `/ (root)`.
3. Le site est publié sur `https://sucubria.github.io/portfolio/`.

Si vous utilisez ensuite votre propre nom de domaine, remplacez l’adresse de
base partout (balises `canonical`, `hreflang`, Open Graph, `sitemap.xml`,
`robots.txt`, `404.html`) :

```sh
grep -rl "https://sucubria.github.io/portfolio/" . --include="*.html" --include="*.xml" --include="*.txt" \
  | xargs sed -i "s#https://sucubria.github.io/portfolio/#https://www.votre-domaine.fr/#g"
```

## Activer les formulaires (Web3Forms, gratuit)

Les formulaires de devis (plombier), de réservation (restaurant) et de
rendez-vous (coach) sont envoyés sans serveur par
[Web3Forms](https://web3forms.com) (gratuit jusqu’à 250 envois par mois, sans
compte).

1. Sur web3forms.com, saisissez l’adresse e-mail qui doit recevoir les messages :
   une clé d’accès vous est envoyée.
2. Collez-la dans `assets/js/forms.js` : `const WEB3FORMS_ACCESS_KEY = "…";`

Tant que la clé est vide, les formulaires fonctionnent en **mode démo** : ils
valident les champs et affichent une confirmation, sans rien envoyer.

## À compléter avant publication

- `mentions-legales.html` et `en/legal-notice.html` : adresse professionnelle et
  SIRET (repérés par `[à compléter]`). Vérifiez aussi la mention « TVA non
  applicable, article 293 B du CGI », valable seulement si vous relevez de la
  franchise en base de TVA.

## Photos

Les photos du restaurant sont chargées depuis Unsplash (licence Unsplash :
usage commercial autorisé, sans attribution obligatoire). Si l’une d’elles ne
se charge pas, un visuel de remplacement aux couleurs du restaurant s’affiche.
Les autres visuels (illustrations, icônes, logos) sont dessinés en SVG/CSS.

## Vérifier en local

```sh
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```
