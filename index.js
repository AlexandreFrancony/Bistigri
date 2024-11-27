require('dotenv').config();

const { Client, Events, GatewayIntentBits } = require('discord.js');
const TOKEN = process.env.DISCORD_BOT_TOKEN;

// Créer une instance de Client avec les intents appropriés
const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers
] });

const commands = require('./functions/f_list');

// Événement déclenché lorsque le bot est prêt
client.once(Events.ClientReady, readyClient => {
    console.log(`${readyClient.user.tag} est maintenant en ligne !`);
});

// Événement déclenché lorsqu'un message est envoyé
client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const prefix = '!';
    if (!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/\s+/);
    const command = args.shift().toLowerCase();

    if (commands[command]) {
        commands[command](message); // Exécute la commande si elle est définie
    }
});

// Connecter le bot
client.login(TOKEN);
