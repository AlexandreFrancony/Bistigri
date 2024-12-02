const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		client.user.setActivity('MTG', { type: 'PLAYING' });
		console.log(`${client.user.tag} est maintenant en ligne !`);
	},
};