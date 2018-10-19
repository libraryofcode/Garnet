const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  const resolvedUser = (args[0] !== undefined) ? message.guild.members.get(args[0].match(/[0-9]/g).join('')) : null;
  const botuser = resolvedUser ? message.guild.members.get(resolvedUser.id) : message.member;

  const msg = await message.channel.send('Loading...');

  const embed = new Discord.RichEmbed();
  embed.setAuthor(botuser.user.avatarURL);
  embed.setTitle('Avatar');
  embed.setColor(botuser.displayHexColor);
  embed.addField('User', `${botuser.user.tag}`);
  embed.setImage(botuser.user.avatarURL);
  embed.setTimestamp();
  embed.setFooter(`${client.user.username} | User ID: ${botuser.id}`, client.user.avatarURL);

  msg.edit(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['av'],
  permLevel: 'Standard User'
};
  
exports.help = {
  name: 'avatar',
  category: 'Misc',
  description: 'Gets a user\'s avatar.',
  usage: 'avatar [...user]'
};