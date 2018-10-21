const Discord = require('discord.js');
module.exports = async (client, message, member, guild) => { //eslint-disable-line no-unused-vars
  const memberName = message.member.user.tag;
  const memberID = message.member.id;
  const guildName = message.guild.name;
  const guildID = message.guild.id;
  const content = message.content;
  const createdAt = message.createdAt;
  const channelName = message.channel.name;
  const channelID = message.channel.id;

  const embed = new Discord.RichEmbed()
    .setTitle('Message Deletion Event');
  if (!message.guild.id === '203039963636301824') embed.setDescription(`**CONTENT**\n\n${content}`)
    .addField('User', `${memberName} \`(${memberID})\``, true)
    .addField('Guild', `${guildName} \`(${guildID})\``, true)
    .addField('Channel', `${channelName} \`(${channelID})\``, true)
    .addField('Created At', createdAt, true)
    .setFooter(client.user.username, client.user.avatarURL)
    .setTimestamp();
  client.channels.get('503373884251308042').send(embed);


};