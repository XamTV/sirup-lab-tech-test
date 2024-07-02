Books Management Application
============================

Description
-----------

Cette application permet de gérer une liste de livres. Les utilisateurs peuvent filtrer les livres par sujet et niveau, sélectionner un livre pour voir ses détails et naviguer vers les chapitres spécifiques du livre.

Table of Contents
-----------------

-   [Description](#description)
-   [Fonctionnalités](#fonctionnalit%C3%A9s)
-   [Installation](#installation)
-   [Utilisation](#utilisation)
-   [Structure du Projet](#structure-du-projet)
-   [API](#api)

Fonctionnalités
---------------

-   Affichage de la liste des livres
-   Filtrage des livres par sujet et niveau
-   Navigation vers les détails d'un livre
-   Sélection et navigation vers des chapitres spécifiques

Installation
------------

Clonez le dépôt :

Copier le code

`git clone https://github.com/votre-utilisateur/votre-repo.git
cd votre-repo`

Installez les dépendances :

Copier le code

`npm install`

Utilisation
-----------

Démarrez l'application :

Copier le code

`npm start`

Ouvrez votre navigateur et accédez à <http://localhost:3000>.

Structure du Projet
-------------------

-   `src/components/BooksList.jsx` : Composant pour afficher et filtrer la liste des livres
-   `src/components/Book.jsx` : Composant pour afficher les détails d'un livre et sélectionner des chapitres
-   `src/components/Chapter.jsx` : Composant pour afficher les détails d'un chapitre
-   `src/styles/BooksList.css` : Fichier CSS pour styliser la liste des livres
-   `src/styles/Book.css` : Fichier CSS pour styliser les détails d'un livre

API
---

L'application utilise une API GraphQL pour récupérer les données des livres et des chapitres. Les requêtes principales sont :

-   Récupère la liste des livres :

    graphql

    Copier le code

    `query{viewer{books{hits{id displayTitle url subjects{name}levels{name}valid}}}}`

-   Récupère les chapitres d'un livre spécifique :

    graphql

    Copier le code

    `query chapters($bookId:Int){viewer{chapters(bookIds:[$bookId]){hits{id title url valid}}}}`
