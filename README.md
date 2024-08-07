# TEST SAQARA

## Description

Ce projet est une application backend développée pour le test technique de Saqara. Il utilise Node.js avec le framework NestJS pour créer une API RESTful. Le backend gère l'authentification des utilisateurs, la gestion des utilisateurs et d'autres fonctionnalités essentielles. C'est une API CRUD pour des projets et des tâches

## Prérequis

- Node.js (version 20 ou supérieure)
- npm (version 8 ou supérieure)
- Docker

## Installation

1. Clonez le dépôt :

    ```sh
    git clone git@github.com:Cbelbegra/TestSaqara.git
    cd TestSaqara
    ```

2. Installez les dépendances :

    ```sh
    npm install
    ```

3. Dans le repertoire backend, Configurez les variables d'environnement en copiant `env.dist` en 3 fichiers `.env.dev`, `.env.prod`, `.env.test` à la racine du projet et en y ajoutant les variables nécessaires :

    ```env
    MONGODB_URI=mongodb://localhost:27017/{dev|prod|test}
    JWT_SECRET=your_jwt_secret
    ```
4. Dans le repertoire frontend, Configurez les variables d'environnement en copiant `env.dist` en `.env`à la racine du projet et en y ajoutant les variables nécessaires :

    ```env
    REACT_APP_API_URL=http://127.0.0.1:3001
    ```
## Dockerisation

1. Assurez-vous que Docker est installé et en cours d'exécution sur votre machine.

2. Pour démarrer les services, exécutez :

    ```sh
    docker-compose up -d
    ```
3. Le FrontEnd sera disponible à l'adresse `http://127.0.0.1:3000`.
4. L'API sera disponible à l'adresse `http://127.0.0.1:3001`.

## Tests

Pour exécuter les tests unitaires et d'intégration du backend, utilisez les commandes suivantes :

- Tests unitaires :

    ```sh
    npm run test
    ```

- Tests d'intégration :

    ```sh
    npm run test:e2e
    ```
## Fonctionnalités

- **Authentification des utilisateurs** : Inscription, connexion, validation et gestion des tokens JWT.
- **Gestion des utilisateurs** : Création et authentification des utilisateurs.
- **Gestion des projets et des tâches** : CRUD pour les projets et les tâches.

## Structure du projet

- `backend/` et `frontend/` : contiennent respectivement le Back et le Front.
- `{backend|frontend}/src/` : Contient le code source de l'application.
- `{backend|frontend}/test/` : Contient les tests unitaires et d'intégration.
- `frontend/src/types` : Contient les types, nottament pour les projets et les tâches.
- `frontend/src/pages` : Contient les layout de page principales et de sidebar.
- `frontend/src/components` : Contient le code de chaque composant du front.
- `README.md` : Documentation du projet.

## Routing du Frontend

L'application utilise `react-router-dom` pour gérer le routing. Voici un aperçu des routes définies dans l'application :

- **`/login`** : Affiche le composant `Login` pour permettre aux utilisateurs de se connecter.
- **`/register`** : Affiche le composant `Register` pour permettre aux utilisateurs de s'inscrire.
- **`/projects`** : Affiche le composant `ProjectList` pour afficher la liste des projets.
- **`/projects/:projectId`** : Affiche le composant `ProjectDetail` pour afficher les détails d'un projet spécifique. Le paramètre `:projectId` est utilisé pour identifier le projet.
- **`/tasks`** : Affiche le composant `TaskList` pour afficher la liste des tâches.
- **`/tasks/:taskId`** : Affiche le composant `TaskDetail` pour afficher les détails d'une tâche spécifique. Le paramètre `:taskId` est utilisé pour identifier la tâche.

Le fichier `App.tsx` contient la configuration du routing :

## Technologies utilisées

- **Node.js** : Environnement d'exécution JavaScript.
- **NestJS** : Framework pour construire des applications Node.js évolutives.
- **Mongoose** : ODM pour MongoDB.
- **bcryptjs** : Pour le hachage des mots de passe.
- **jsonwebtoken** : Pour la gestion des tokens JWT.
- **Docker** : Pour la containerisation de la base de données MongoDB et des services backend/frontend.
- **React** : Bibliothèque JavaScript pour construire des interfaces utilisateur.
- **TypeScript** : Sur-ensemble typé de JavaScript qui ajoute des types statiques.

## Auteurs

- [Belbegra Christophe](https://github.com/Cbelbegra)