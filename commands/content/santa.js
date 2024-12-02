const { SlashCommandBuilder } = require('@discordjs/builders');
const handleFriendResponse = require('./functions/friend-responses');

module.exports = {
  cooldown: 60,
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
          return interaction.reply("Vous n'avez pas les droits nécessaires pour exécuter cette commande. id: " + interaction.user.id);
        }
      }

      // Vérifier que le message provient d'un salon de texte
      if (!interaction.guild) {
        return interaction.reply("Cette commande ne peut être utilisée que dans un serveur.");
      }

      // Répondre rapidement à l'interaction pour éviter l'expiration
      await interaction.reply("Le Secret Santa est en cours de traitement, veuillez patienter... 🎅");

      // Chercher le rôle 'Secret Santa' dans le serveur par nom
      const santaRole = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'secret santa');
      if (!santaRole) {
        return interaction.followUp("Le rôle 'Secret Santa' n'existe pas ou n'a pas été trouvé. Veuillez vérifier le nom du rôle et l'attribuer aux participants.");
      }

      // Récupérer tous les membres du serveur pour s'assurer que le cache est mis à jour
      await interaction.guild.members.fetch();

      // Récupérer tous les membres ayant le rôle 'Secret Santa'
      const members = interaction.guild.members.cache.filter(member => member.roles.cache.has(santaRole.id) && !member.user.bot);
      const participants = Array.from(members.values());

      if (participants.length < 2) {
        return interaction.followUp("Il faut au moins deux participants avec le rôle 'Secret Santa' pour organiser un échange de cadeaux.");
      }

      // Afficher les participants
      let participantsList = "Participants : \n";
      participants.forEach((participant, index) => {
        participantsList += `${index + 1}. ${participant.user.username}\n`;
      });
      console.log(participantsList);

      // Mélanger les participants et attribuer un partenaire
      let shuffled = [...participants];
      let assigned = false;

      // Essayer de mélanger jusqu'à éviter les couples réciproques
      let i = 0;
      while (!assigned) {
        i++;
        console.log("Shuffling number " + i);
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

      console.log("Shuffled participants done. i = " + i);

      // Envoyer les résultats à chaque participant en message privé
      for (let i = 0; i < participants.length; i++) {
        const giver = participants[i];
        const receiver = shuffled[i];

        try {
          console.log("Sending message to " + giver.user.username);
          await giver.send(`Bonjour ${giver.user.username}, vous allez offrir un cadeau à : **${receiver.user.username}** ! 🎁`);
        } catch (err) {
          console.log("[ERROR] MP to " + giver.user.username);
          await interaction.followUp(`Impossible d'envoyer un message privé à ${giver.user.username}. Veuillez vérifier ses paramètres de confidentialité.`);
        }
      }

      // Mettre à jour la réponse d'origine pour informer de la réussite
      await interaction.followUp("Les affectations pour le Secret Santa ont été envoyées à chaque participant ! 🎅🎄");
      
      setTimeout(() => {
        interaction.followUp("https://youtu.be/uuEZu6VK-U8");
      }, 2000);

    } catch (error) {
      console.error(error);
      // Si une erreur se produit, répondre en conséquence
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp("Une erreur est survenue lors de l'organisation du Secret Santa. Veuillez réessayer.");
      } else {
        await interaction.reply("Une erreur est survenue lors de l'organisation du Secret Santa. Veuillez réessayer.");
      }
    }
  }
};
