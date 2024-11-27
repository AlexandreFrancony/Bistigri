// friend-responses.js - Gestion des réponses personnalisées pour les amis

module.exports = (message, friendsIds) => {
    switch (message.author.id) {
      case '605511035528544286':
        return message.channel.send("Bastos... trop tôt pour regarder petit gourmand");
        message.channel.send("Bastos... Mon cher Bastos...").then(() => {
          setTimeout(() => {
            message.channel.send("On sait tout les deux ce qu'il va se passer maintenant que tu as lancé cette commande, n'est-ce pas ?");
            setTimeout(() => {
              message.channel.send("Une vraie cause perdue, mais bon, on le savait déjà tous.");
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
        return message.channel.send("Victor il faut encore que tu fasses un DM ou deux pour lancer la commande");
      case '338737552372531201':
        return message.channel.send("Prout2Femme, ton taux d'alcool dans le sang est trop bas pour lancer la commande");
      case '385835735032397834':
        return message.channel.send("Ilhan, le grand parmi les grands, tu n'as pas besoin de lancer la commande");
      case '617814020933681193':
        return message.channel.send("Mon pauvre Simon, ton taux de conneries par minute est bien trop haut pour lancer la commande");
      case '210475469731004416':
        return message.channel.send("Frérot, tes 90 décibels t'empêchent de lancer la commande");
      case '351644821376729110':
        return message.channel.send("Mon cher Thiplouv, t'as tellement claqué dans Genshin que t'as pas le droit de lancer la commande");
      default:
        return message.channel.send("Vous n'avez pas les droits nécessaires pour exécuter cette commande.");
    }
  };
  