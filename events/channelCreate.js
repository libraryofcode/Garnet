const Discord = require('discord.js')
module.exports = async (client, channel, guild) => {
  const channelName = await channel.name;
  const channelID = await channel.id;
  const guildName = await guild.name;
  const guildID = await guild.id

  const embed = new Discord.RichEmbed()
  embed.setTitle('Channel Create Event');
  embed.addField('Channel', `${channelName} \`(${channelID})\``);
  embed.addField('Guild', `${guildName} \`(${guildID})\``);
  embed.setFooter(client.user.username, client.user.avatarURL);
  embed.setTimestamp();

  client.channels.get('503431040451215360').send(embed)
}
