const Discord = require('discord.js');
const web = require('../webhooks.json');
module.exports = (client, guild) => {
  const guildName = guild.name;
  const guildID = guild.id;
  const guildOwner = guild.owner;
  //client.channels.get('503374691046653963').send(`Guild ${guildName} with ID ${guildID} has become unavailable to the client.`);
  const hook = new Discord.WebhookClient(web.guildUnavailableID, web.guildUnavailableToken);
  const embed = new Discord.RichEmbed()
    .setTitle('Guild Unavailable Event')
    .addField('Guild', `${guildName} \`(${guildID})\` by ${guildOwner}`)
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL);
  hook.send(embed);
};