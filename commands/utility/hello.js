const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('Dis bonjour à Bisitgri!'),
	async execute(interaction) {
		await interaction.reply(`Hello, ${interaction.user.username} ! 👋`);
	},
};