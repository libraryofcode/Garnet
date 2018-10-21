const Discord = require('discord.js');
module.exports = async (client, message, oldMessage) => { //eslint-disable-line no-unused-vars
  const memberName = message.member.user.tag;
  const memberID = message.member.id;
  const guildName = message.guild.name;
  const guildID = message.guild.id;
  const createdAt = message.createdAt;
  const channelName = message.channel.name;
  const channelID = message.channel.id;
  const oldContent = message.content;
  const newContent = oldMessage.content;
  if (oldContent === newContent) return;
  
  const embed = new Discord.RichEmbed()
    .setTitle('Message Edited Event')
    //.setDescription(`**OLD CONTENT**\n\n\`\`\`${oldContent}\`\`\`\n\n**NEW CONTENT**\n\n\`\`\`${newContent}\`\`\``)
    .setDescription(`\`\`\`diff\n--OLD CONTENT--\`\`\`\n\n${oldContent}\n\n\`\`\`diff\n--NEW CONTENT--\`\`\`\n\n${newContent}`)
    .addField('User', `${memberName} \`(${memberID})\``, true)
    .addField('Guild', `${guildName} \`(${guildID})\``, true)
    .addField('Channel', `${channelName} \`(${channelID})\``, true)
    .addField('Created At', createdAt, true)
    .setFooter(client.user.username, client.user.avatarURL)
    .setTimestamp();
  client.channels.get('503387318162292736').send(embed);
};