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

// Événement déclenché lorsque le bot est prêt
client.once(Events.ClientReady, readyClient => {
    console.log(`${readyClient.user.tag} est maintenant en ligne !`);
});

// Connecter le bot
client.login(TOKEN);
