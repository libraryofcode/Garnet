const Discord = require('discord.js');
module.exports = async (client, guild, channel) => {
  const channelName = await channel.name;
  const channelID = await channel.id;
  const guildName = await channel.guild.name;
  const guildID = await channel.guild.id;
  const guildIcon = await channel.guild.iconURL;

  const embed = new Discord.RichEmbed()
    .setTitle('Channel Delete Event')
    .setThumbnail(guildIcon)
    .addField('Channel', `${channelName} \`(${channelID})\``)
    .addField('Guild', `${guildName} \`(${guildID})\``)
    .setFooter(client.user.username, client.user.avatarURL)
    .setTimestamp();
  client.channels.get('503729103917023252').send(embed);

};