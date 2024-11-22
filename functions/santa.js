// santa.js - Commande pour !santa

module.exports = async (message) => {
    try {
      // Vérifier que l'utilisateur est autorisé à exécuter la commande
      const ownerId = process.env.ID_OWNER;
      const friendsIds = process.env.ID_FRIENDS ? process.env.ID_FRIENDS.split(',') : [];
  
      if (message.author.id !== ownerId) {
        if (friendsIds.includes(message.author.id)) {
          switch (message.author.id) {
            case '605511035528544286':
                return message.channel.send("Bastos... trop tôt pour regarder petit gourmand");
                message.channel.send("Bastos... Mon cher Bastos...").then(() => {
                    setTimeout(() => {
                      message.channel.send("On sait tout les deux ce qu'il va se passer maintenant que tu as lancé cette commande, n'est-ce pas ?");
                      setTimeout(() => {
                        message.channel.send("Une vrai cause perdue, mais bon, on le savait déjà tous.");
                        setTimeout(() => {
                          message.channel.send("https://cdn.discordapp.com/attachments/885221164232871986/1309620090097897512/webm_mixed.webm?ex=67423e41&is=6740ecc1&hm=4b8c2a0494088b0a013585f9e524934a1bc0fec795f41984b9713cae956ccb8f&");
                        }, 2000);
                      }, 2000);
                    }, 2000);
                  });
                return;
            case '254713783677747202':
              return message.channel.send("Morel, Morel... Ton égo est bien trop grand pour lancer la commande");
            case '353946381368426497':
              return message.channel.send("Victor il faut encore que tu fasse un DM ou deux pour lancer la commande");
            case '338737552372531201':
              return message.channel.send("Prout2Femme, ton taux d'alcool dans le sang est trop bas pour lancer la commande");
            case '385835735032397834':
              return message.channel.send("Ilhan, le grand parmis les grands, tu n'as pas besoin de lancer la commande");
            case '617814020933681193':
              return message.channel.send("Mon pauvre Simon, ton taux de conneries par minute est bien trop haut pour lancer la commande");
            case '210475469731004416':
              return message.channel.send("Frérot, tes 90 décibels t'empêche de lancer la commande");
            case '351644821376729110':
              return message.channel.send("Mon cher Thiplouv, t'as tellement claqué dans Genshin que t'as pas le droit de lancer la commande");
            default:
              return message.channel.send("Vous n'avez pas les droits nécessaires pour exécuter cette commande.");
          }
        } else {
          return message.channel.send("Vous n'avez pas les droits nécessaires pour exécuter cette commande.");
        }
      }
  
      // Vérifier que le message provient d'un salon de texte
      if (!message.guild) {
        return message.channel.send("Cette commande ne peut être utilisée que dans un serveur.");
      }
  
      // Récupérer le rôle 'Secret Santa' dans le serveur par son ID depuis la variable d'environnement
      const santaRoleId = process.env.SANTA_ROLE_ID;
      const santaRole = await message.guild.roles.fetch(santaRoleId); // Utilisation de fetch pour s'assurer que le rôle est bien récupéré
  
      if (!santaRole) {
        return message.channel.send("Le rôle 'Secret Santa' n'existe pas. Veuillez vérifier l'ID du rôle et l'attribuer aux participants.");
      }
  
      // Récupérer tous les membres du serveur pour s'assurer que le cache est mis à jour
      await message.guild.members.fetch();
  
      // Récupérer tous les membres ayant le rôle 'Secret Santa'
      const members = message.guild.members.cache.filter(member => member.roles.cache.has(santaRole.id) && !member.user.bot);
      const participants = Array.from(members.values());
  
      if (participants.length < 2) {
        return message.channel.send("Il faut au moins deux participants avec le rôle 'Secret Santa' pour organiser un échange de cadeaux.");
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
          message.channel.send(`Impossible d'envoyer un message privé à ${giver.user.username}. Veuillez vérifier ses paramètres de confidentialité.`);
        }
      }
  
      message.channel.send("Les affectations pour le Secret Santa ont été envoyées à chaque participant ! 🎅🎄");
    } catch (error) {
      console.error(error);
      message.channel.send("Une erreur est survenue lors de l'organisation du Secret Santa. Veuillez réessayer.");
    }
  };
  