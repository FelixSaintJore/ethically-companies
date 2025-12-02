# Shop Ethically

Une application web pour identifier les entreprises mères des marques et leurs controverses.

## Fonctionnalités

- Recherche de marques (basée sur `data/catalog.json`).
- Annuaire complet des marques référencées.
- **Tracking utilisateur** : Suivi des actions (visites, recherches, clics) via une base de données SQLite.

## Installation

1.  Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé.
2.  Installez les dépendances :
    ```bash
    npm install
    ```

## Lancement

1.  Démarrez le serveur :
    ```bash
    node server.js
    ```
2.  Ouvrez votre navigateur sur : [http://localhost:3000](http://localhost:3000)

## Utilisation du Tracking

Pour simuler un utilisateur unique et suivre ses actions, ajoutez le paramètre `uid` dans l'URL :

[http://localhost:3000/?uid=utilisateur123](http://localhost:3000/?uid=utilisateur123)

Les actions suivantes sont enregistrées dans la base de données `data/tracking.db` :
- Visite de la page (`page_view`).
- Recherche effectuée (`search`).
- Clic sur un lien externe (`click`).

### Voir les données de tracking

Une route d'administration (simple) est disponible pour voir les 100 dernières entrées de tracking :
[http://localhost:3000/api/admin/tracking](http://localhost:3000/api/admin/tracking)

## Structure du projet

- `server.js` : Le serveur Node.js (Express).
- `database.js` : Gestion de la base de données SQLite.
- `public/` : Fichiers statiques (HTML, CSS, JS client).
- `data/` : Données (Catalogue JSON et Base de données SQLite).