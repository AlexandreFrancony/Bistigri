# SecretSanta Discord Bot

Ce projet est un bot Discord simple, nommé **SecretSanta**, écrit en JavaScript avec Node.js et utilisant la librairie `discord.js`. Le bot répond à des commandes prédéfinies, notamment `!hello`, et peut être étendu avec d'autres commandes personnalisées.

## Fonctionnalités
- **Commandes de base** : Le bot peut répondre à des commandes comme `!hello` et `!help`.
- **Intégration à Discord** : Le bot utilise des intents spécifiques pour interagir avec les membres et lire les messages.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants :
- **Node.js** (version 16 ou plus récente) et **npm** installés.
- Un compte **Discord** et des permissions suffisantes pour inviter des bots sur un serveur.
- Un bot Discord créé via le [Discord Developer Portal](https://discord.com/developers/applications) avec un **token** valide.

## Installation

1. **Cloner le Dépôt**
   ```sh
   git clone https://github.com/username/secretsanta-bot.git
   cd secretsanta-bot
   ```

2. **Installer les Dépendances**
   ```sh
   npm install
   ```

3. **Configurer les Variables d'Environnement**
   - Créez un fichier `.env` à la racine du projet et ajoutez-y votre token Discord :
     ```env
     DISCORD_BOT_TOKEN=VOTRE_TOKEN_ICI
     SANTA_ROLE_ID=ID_DU_ROLE_SANTA
     ID_OWNER=ID_DU_PROPRIETAIRE
     ID_FRIENDS=id1,id2,id3
     ```
   - Vous pouvez vous référer au fichier `.env.example` pour voir les variables attendues.

4. **Lancer le Bot Localement**
   ```sh
   npm start
   ```
   Si tout fonctionne bien, vous devriez voir un message indiquant que le bot est connecté.

## Utilisation

Pour inviter votre bot sur votre serveur de test, suivez les étapes suivantes :

1. **Générer un Lien d'Invitation**
   - Allez sur le [Discord Developer Portal](https://discord.com/developers/applications), sélectionnez votre bot, et allez dans **OAuth2 > URL Generator**.
   - Sélectionnez les scopes `bot` et les permissions nécessaires (par exemple, `Send Messages`, `Read Messages`).
   - Copiez le lien généré et ouvrez-le dans votre navigateur pour inviter le bot sur votre serveur.

2. **Commandes Disponibles**
   - `!hello` : Le bot vous renverra une salutation.
   - `!help` : Le bot vous présentera les commandes disponibles.
   - 

## Déploiement sur Heroku

Le bot peut être facilement déployé sur **Heroku**. Voici comment faire :

1. **Installer la CLI Heroku** :
   [Instructions d'installation](https://devcenter.heroku.com/articles/heroku-cli).
   
2. **Se Connecter à Heroku** :
   ```sh
   heroku login
   ```

3. **Créer une Application Heroku** :
   ```sh
   heroku create nom-de-ton-app
   ```

4. **Ajouter le Remote Heroku et Déployer** :
   ```sh
   git add .
   git commit -m "Préparation pour déploiement"
   git push heroku main
   ```

5. **Configurer les Variables d'Environnement sur Heroku** :
   - Allez dans votre tableau de bord Heroku, section **Settings**, et ajoutez `DISCORD_BOT_TOKEN` dans **Config Vars**.

## Structure du Projet
- **index.js** : Fichier principal du bot contenant la logique des commandes.
- **package.json** : Fichier de configuration des dépendances et des scripts.
- **.env** : Fichier pour les variables sensibles comme le token du bot.
- **.gitignore** : Fichier pour ignorer les fichiers qui ne doivent pas être commis dans le dépôt, notamment `node_modules` et `.env`.

## Contribution
Les contributions sont les bienvenues ! Si vous souhaitez ajouter des fonctionnalités, créez une **issue** ou soumettez une **pull request**.

## Prochaines Fonctionnalités (Suggestions)
- Ajout d'une commande `!santa` pour générer des tirages au sort pour le Secret Santa.
- Commandes de gestion des salons (création de salons pour les échanges de cadeaux).
- Intégration avec une API externe pour obtenir des idées de cadeaux.

## Licence
Ce projet est sous licence **MIT**. Pour plus d'informations, consultez le fichier `LICENSE`.

---
Merci d'utiliser SecretSanta Bot et bonnes fêtes !

