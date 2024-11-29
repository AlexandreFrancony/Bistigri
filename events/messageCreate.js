const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot) return;

    const lowerMessage = message.content.toLowerCase().trim();
    if (lowerMessage.endsWith('quoi') || lowerMessage.endsWith('quoi?')) {
      await message.channel.send('feur');
    }
  },
};
