const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('randomcommander')
    .setDescription('Obtenez un commandant aléatoire de Magic: The Gathering selon les couleurs choisies')
    .addStringOption(option =>
      option.setName('couleurs')
        .setDescription('Entrez les couleurs (W, U, B, R, G, ou C pour incolore)')
        .setRequired(false)
    ),
  async execute(interaction) {
    const colorsInput = interaction.options.getString('couleurs');
    const colors = colorsInput ? colorsInput.toUpperCase().split('') : [];

    // Déterminer les couleurs pour l'API Scryfall
    let scryfallQuery = 'https://api.scryfall.com/cards/search?q=is%3Acommander';
    if (colors.length > 0) {
      if (colors.includes('C') && colors.length === 1) {
        scryfallQuery += '+identity%3DC';
      } else if (colors.includes('C')) {
        return interaction.reply({ content: "L'option 'O' pour incolore ne peut pas être combinée avec d'autres couleurs.", ephemeral: true });
      } else {
        const validColors = ['W', 'U', 'B', 'R', 'G'];
        const invalidColors = colors.filter(color => !validColors.includes(color));
        if (invalidColors.length > 0) {
          return interaction.reply({ content: `Les couleurs fournies sont invalides: ${invalidColors.join(', ')}. Utilisez uniquement W, U, B, R, G, ou O.`, ephemeral: true });
        }
        // Construire la requête de couleur en utilisant la notation de Scryfall
        const colorsParam = colors.sort().join('').toLowerCase();
        scryfallQuery += `+identity%3D${colorsParam}`;
      }
    }

    try {
      // Faire une requête pour obtenir un commandant aléatoire depuis l'API Scryfall
      const response = await axios.get(scryfallQuery);
      const data = response.data;

      if (!data || !data.data || data.data.length === 0) {
        return interaction.reply({ content: "Aucun commandant n'a été trouvé pour les critères spécifiés.", ephemeral: true });
      }

      // Si les résultats sont paginés, récupérer une page aléatoire
      let commanderData = data.data;
      if (data.has_more) {
        const randomPage = Math.ceil(Math.random() * Math.ceil(data.total_cards / 175)); // Scryfall returns 175 cards per page
        const paginatedResponse = await axios.get(`${scryfallQuery}&page=${randomPage}`);
        commanderData = paginatedResponse.data.data;
      }

      // Choisir un commandant aléatoire parmi les résultats
      const randomIndex = Math.floor(Math.random() * commanderData.length);
      const commander = commanderData[randomIndex];

      // Créer les boutons pour accéder à la page du commandant sur Scryfall, EDHRec, et un autre pour tirer un autre commandant
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel(`Voir ${commander.name} sur Scryfall`)
          .setStyle(ButtonStyle.Link)
          .setURL(commander.scryfall_uri),
        new ButtonBuilder()
          .setLabel(`Voir ${commander.name} sur EDHRec`)
          .setStyle(ButtonStyle.Link)
          .setURL(`https://edhrec.com/route/?cc=${encodeURIComponent(commander.name)}`),
        new ButtonBuilder()
          .setLabel('Un autre !')
          .setStyle(ButtonStyle.Primary)
          .setCustomId('another_commander')
      );

      // Ajouter l'image de la carte dans la réponse
      await interaction.reply({
        content: `Voici votre commandant aléatoire : **${commander.name}** !`,
        components: [row],
        embeds: [
          {
            title: commander.name,
            image: {
              url: commander.image_uris ? commander.image_uris.normal : commander.card_faces[0].image_uris.normal
            },
            url: commander.scryfall_uri
          }
        ]
      });

      // Listener pour le bouton "Un autre !"
      const filter = i => i.customId === 'another_commander' && i.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

      collector.on('collect', async i => {
        if (i.customId === 'another_commander') {
          await this.execute(interaction); // Relancer la commande
        }
      });

    } catch (error) {
      console.error(error);
      await interaction.reply({ content: "Une erreur est survenue lors de la récupération du commandant. Veuillez réessayer plus tard.", ephemeral: true });
    }
  }
};
