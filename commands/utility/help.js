const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Affiche les commandes disponibles pour le bot.'),
  async execute(interaction) {
    const commandList = interaction.client.commands;
    
    let helpMessage = '**Voici les commandes disponibles :**\n';
    commandList.forEach((command) => {
      helpMessage += `- \`/${command.data.name}\` : ${command.data.description}\n`;
    });

    await interaction.reply(helpMessage);
  },
};
