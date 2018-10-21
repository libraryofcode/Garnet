const Discord = require('discord.js');
module.exports = async (client, message, oldMessage) => { //eslint-disable-line no-unused-vars
  const memberName = message.member.user.tag;
  const memberID = message.member.id;
  const guildName = message.guild.name;
  const guildID = message.guild.id;
  const createdAt = message.createdAt;
  const channelName = message.channel.name;
  const channelID = message.channel.id;
  const oldContent = oldMessage.content;
  const newContent = message.content;
  if (oldContent === newContent) return;
  
  const embed = new Discord.RichEmbed()
    .setTitle('Message Edited Event');
  if (!message.guild.id === '203039963636301824') embed.setDescription(`**OLD CONTENT**\n\n\`\`\`${oldContent}\`\`\`\n\n**NEW CONTENT**\n\n\`\`\`${newContent}\`\`\``)
    .addField('User', `${memberName} \`(${memberID})\``, true)
    .addField('Guild', `${guildName} \`(${guildID})\``, true)
    .addField('Channel', `${channelName} \`(${channelID})\``, true)
    .addField('Created At', createdAt, true)
    .setFooter(client.user.username, client.user.avatarURL)
    .setTimestamp();
  client.channels.get('503387318162292736').send(embed);
};