// santa.js - Commande pour !santa

const { SlashCommandBuilder } = require('@discordjs/builders');
const handleFriendResponse = require('./functions/friend-responses');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('santa')
    .setDescription('Organiser un Secret Santa entre les membres avec le rôle Secret Santa'),
  async execute(interaction) {
    try {
      // Vérifier que l'utilisateur est autorisé à exécuter la commande
      const ownerId = process.env.ID_OWNER;
      const friendsIds = process.env.ID_FRIENDS ? process.env.ID_FRIENDS.split(',') : [];

      if (interaction.user.id !== ownerId) {
        if (friendsIds.includes(interaction.user.id)) {
          return handleFriendResponse(interaction);
        } else {
          return interaction.reply("Vous n'avez pas les droits nécessaires pour exécuter cette commande. id: "+ interaction.user.id);
        }
      }

      // Vérifier que le message provient d'un salon de texte
      if (!interaction.guild) {
        return interaction.reply("Cette commande ne peut être utilisée que dans un serveur.");
      }

      // Récupérer le rôle 'Secret Santa' dans le serveur par son ID depuis la variable d'environnement
      const santaRoleId = process.env.SANTA_ROLE_ID;
      const santaRole = await interaction.guild.roles.fetch(santaRoleId); // Utilisation de fetch pour s'assurer que le rôle est bien récupéré

      if (!santaRole) {
        return interaction.reply("Le rôle 'Secret Santa' n'existe pas. Veuillez vérifier l'ID du rôle et l'attribuer aux participants.");
      }

      // Récupérer tous les membres du serveur pour s'assurer que le cache est mis à jour
      await interaction.guild.members.fetch();

      // Récupérer tous les membres ayant le rôle 'Secret Santa'
      const members = interaction.guild.members.cache.filter(member => member.roles.cache.has(santaRole.id) && !member.user.bot);
      const participants = Array.from(members.values());

      if (participants.length < 2) {
        return interaction.reply("Il faut au moins deux participants avec le rôle 'Secret Santa' pour organiser un échange de cadeaux.");
      }

      // Mélanger les participants et attribuer un partenaire
      let shuffled = [...participants];
      let assigned = false;

      // Essayer de mélanger jusqu'à éviter les couples réciproques
      while (!assigned) {
        shuffled = shuffled.sort(() => Math.random() - 0.5);
        assigned = true;

        // Vérifier les affectations mutuelles (A -> B et B -> A)
        for (let i = 0; i < participants.length; i++) {
          const giver = participants[i];
          const receiver = shuffled[i];

          // Si un utilisateur est attribué à lui-même ou une réciprocité se produit, remélanger
          if (giver === receiver || (participants[i] === shuffled[(i + 1) % participants.length] && shuffled[i] === participants[(i + 1) % participants.length])) {
            assigned = false;
            break;
          }
        }
      }

      // Envoyer les résultats à chaque participant en message privé
      for (let i = 0; i < participants.length; i++) {
        const giver = participants[i];
        const receiver = shuffled[i];

        try {
          await giver.send(`Bonjour ${giver.user.username}, vous allez offrir un cadeau à : **${receiver.user.username}** ! 🎁`);
        } catch (err) {
          interaction.followUp(`Impossible d'envoyer un message privé à ${giver.user.username}. Veuillez vérifier ses paramètres de confidentialité.`);
        }
      }

      interaction.reply("Les affectations pour le Secret Santa ont été envoyées à chaque participant ! 🎅🎄");
    } catch (error) {
      console.error(error);
      interaction.reply("Une erreur est survenue lors de l'organisation du Secret Santa. Veuillez réessayer.");
    }
  }
};
