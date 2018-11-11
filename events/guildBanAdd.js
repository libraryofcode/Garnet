const Discord = require('discord.js');
const web = require('../webhooks.json');

module.exports = async (client, guild, user) => {
  const guildName = guild.name;
  const guildID = guild.id;
  const userName = user.tag;
  const userID = user.id;

  const hook = new Discord.WebhookClient(web.guildBanAddID, web.guildBanAddToken);
  const embed = new Discord.RichEmbed()
    .setTitle('Guild Ban Add Event')
    .setThumbnail(guild.iconURL)
    .addField('Guild', `${guildName} \`(${guildID})\``)
    .addField('User', `${userName} \`(${userID})\``)
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL);
  hook.send(embed);
};