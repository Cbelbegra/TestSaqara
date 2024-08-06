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

3. Configurez les variables d'environnement en copiant `env.dist` en 3 fichiers `.env.dev`, `.env.prod`, `.env.test` à la racine du projet et en y ajoutant les variables nécessaires :

    ```env
    MONGODB_URI=mongodb://localhost:27017/{dev|prod|test}
    JWT_SECRET=your_jwt_secret
    ```
## Dockerisation

1. Assurez-vous que Docker est installé et en cours d'exécution sur votre machine.

2. Pour démarrer les services, exécutez :

    ```sh
    docker-compose up -d
    ```
3. L'API sera disponible à l'adresse `http://localhost:3000`.

## Tests

Pour exécuter les tests unitaires et d'intégration, utilisez les commandes suivantes :

- Tests unitaires :

    ```sh
    npm run test
    ```

- Tests d'intégration :

    ```sh
    npm run test:e2e
    ```
## Fonctionnalités

- **Authentification des utilisateurs** : Inscription, connexion et gestion des tokens JWT.
- **Gestion des utilisateurs** : Création, mise à jour et suppression des utilisateurs.
- **Gestion des projets et des tâches** : CRUD pour les projets et les tâches.

## Structure du projet

- `backend/` et `frontend/` : contiennent respectivement le Back et le Front.
- `{backend|frontend}/src/` : Contient le code source de l'application.
- `{backend|frontend}/test/` : Contient les tests unitaires et d'intégration.
- `README.md` : Documentation du projet.

## Technologies utilisées

- **Node.js** : Environnement d'exécution JavaScript.
- **NestJS** : Framework pour construire des applications Node.js évolutives.
- **Mongoose** : ODM pour MongoDB.
- **bcryptjs** : Pour le hachage des mots de passe.
- **jsonwebtoken** : Pour la gestion des tokens JWT.
- **Docker** : Pour la containerisation de la base de données MongoDB et des services backend/frontend.

## Auteurs

- [Belbegra Christophe](https://github.com/Cbelbegra)