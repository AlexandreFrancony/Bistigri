const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Créer une instance de Client avec les intents appropriés
const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers // Ajoute les intents nécessaires ici
] });

const commands = require('./functions/f_list');

// Récupérer le token du bot à partir des variables d'environnement
const TOKEN = process.env.DISCORD_BOT_TOKEN;

// Événement déclenché lorsque le bot est prêt
client.once('ready', () => {
    console.log(`${client.user.tag} est maintenant en ligne !`);
});

// Événement déclenché lorsqu'un message est envoyé
client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    
    const args = message.content.slice(1).split(' '); // Découpe la commande en morceaux
    const command = args.shift().toLowerCase(); // Extrait le nom de la commande

    if (commands[command]) {
        commands[command](message); // Exécute la commande si elle est définie
    }
});

// Connecter le bot
client.login(TOKEN);
