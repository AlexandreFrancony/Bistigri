// randomCommander.js - Commande pour /randomcommander

const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('@discordjs/builders');
const axios = require('axios');
const colorCombinations = require('./data/Colors.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('randomcommander')
    .setDescription('Obtenez un commandant aléatoire de Magic: The Gathering selon les couleurs choisies')
    .addStringOption(option =>
      option.setName('couleurs')
        .setDescription('Entrez les couleurs (W, U, B, R, G, ou O pour incolore)')
        .setRequired(false)
    ),
  async execute(interaction) {
    const colorsInput = interaction.options.getString('couleurs');
    const colors = colorsInput ? colorsInput.toUpperCase().split('') : [];

    // Déterminer l'URL en fonction des couleurs fournies
    let url = 'https://edhrec.com/random/commander';
    if (colors.length > 0) {
      if (colors.includes('O') && colors.length === 1) {
        url = 'https://edhrec.com/commanders/colorless';
      } else if (colors.includes('O')) {
        return interaction.reply({ content: "L'option 'O' pour incolore ne peut pas être combinée avec d'autres couleurs.", ephemeral: true });
      } else {
        const validColors = ['W', 'U', 'B', 'R', 'G'];
        const invalidColors = colors.filter(color => !validColors.includes(color));
        if (invalidColors.length > 0) {
          return interaction.reply({ content: `Les couleurs fournies sont invalides: ${invalidColors.join(', ')}. Utilisez uniquement W, U, B, R, G, ou O.`, ephemeral: true });
        }
        // Construire l'URL pour les couleurs choisies à partir du JSON
        const colorsParam = colors.sort().join('').toUpperCase();
        const colorName = colorCombinations[colorsParam];
        if (!colorName) {
          return interaction.reply({ content: "Aucune combinaison de couleurs valide n'a été trouvée.", ephemeral: true });
        }
        url = `https://edhrec.com/commanders/${colorName.toLowerCase()}`;
        await interaction.reply({ content: url, ephemeral: true });

      }
    }

    try {
      // Faire une requête pour vérifier la page
      await axios.get(url);

      // Créer un bouton pour accéder à la page du commandant
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel('Voir le commandant sur EDHRec')
          .setStyle(ButtonStyle.Link)
          .setURL(url)
      );

      await interaction.reply({ content: "Voici votre commandant aléatoire !", components: [row] });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: "Une erreur est survenue lors de la récupération du commandant. Veuillez réessayer plus tard. URL: " + url, ephemeral: true });
    }
  }
};
