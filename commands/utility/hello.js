const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('Say hi to Bisitgri!'),
	async execute(interaction) {
		await interaction.reply(`Hello, ${interaction.user.username} ! 👋`);
	},
};