// friend-responses.js - Gestion des réponses personnalisées pour les amis

module.exports = async (interaction) => {
  switch (interaction.user.id) {
    case '605511035528544286':
      await interaction.reply("Bastos... trop tôt pour regarder petit gourmand");
      setTimeout(() => {
        interaction.followUp("Bastos... Mon cher Bastos...").then(() => {
          setTimeout(() => {
            interaction.followUp("On sait tout les deux ce qu'il va se passer maintenant que tu as lancé cette commande, n'est-ce pas ?");
            setTimeout(() => {
              interaction.followUp("Une vraie cause perdue, mais bon, on le savait déjà tous.");
              setTimeout(() => {
                interaction.followUp("https://cdn.discordapp.com/attachments/885221164232871986/1309620090097897512/webm_mixed.webm?ex=67423e41&is=6740ecc1&hm=4b8c2a0494088b0a013585f9e524934a1bc0fec795f41984b9713cae956ccb8f&");
              }, 2000);
            }, 2000);
          }, 2000);
        });
      }, 2000);
      return;
    case '254713783677747202':
      return interaction.reply("Morel, Morel... Ton égo est bien trop grand pour lancer la commande");
    case '353946381368426497':
      return interaction.reply("Victor il faut encore que tu fasses un DM ou deux pour lancer la commande");
    case '338737552372531201':
      return interaction.reply("Prout2Femme, ton taux d'alcool dans le sang est trop bas pour lancer la commande");
    case '385835735032397834':
      return interaction.reply("Ilhan, le grand parmi les grands, tu n'as pas besoin de lancer la commande");
    case '617814020933681193':
      return interaction.reply("Mon pauvre Simon, ton taux de conneries par minute est bien trop haut pour lancer la commande");
    case '210475469731004416':
      return interaction.reply("Frérot, tes 90 décibels t'empêchent de lancer la commande");
    case '351644821376729110':
      return interaction.reply("Mon cher Thiplouv, t'as tellement claqué dans Genshin que t'as pas le droit de lancer la commande");
    case '904363285892186133':
      return interaction.reply("Anthony, test, id :" + interaction.user.id);
    default:
      return interaction.reply("Vous n'avez pas les droits nécessaires pour exécuter cette commande.");
  }
};
