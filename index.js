// Importer discord.js
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config(); // Pour charger les variables d'environnement à partir du fichier .env

// Créer une instance de Client
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Récupérer le token du bot à partir des variables d'environnement
const TOKEN = process.env.DISCORD_BOT_TOKEN;

// Événement déclenché lorsque le bot est prêt
client.once('ready', () => {
    console.log(`${client.user.tag} est maintenant en ligne !`);
});

// Événement déclenché lorsqu'un message est envoyé
client.on('messageCreate', (message) => {
    // Vérifier que le message commence par "!hello" et que ce n'est pas un message du bot lui-même
    if (message.author.bot) return;
    if (message.content === '!hello') {
        message.channel.send(`Hello, ${message.author.username} ! 👋`);
    }
});

// Connecter le bot
client.login(TOKEN);
