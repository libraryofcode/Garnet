exports.run = async (client, message, args) => {
  return message.channel.send('This command has been globally disabled by the Development Team.')

  
  /*const member = message.mentions.members.first();
  if (!member)
    return message.reply('please mention an user of this server.');
  if (!member.bannable) 
    return message.reply('Error: Forbidden, this user is not bannable.');

  let reason = args.slice(1).join(' ');
  if (!reason) reason = 'No reason provided';
  
  await member.ban(reason)
    .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
  message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  */
};

exports.conf = {
  enabled: false,
  guildOnly: true,
  aliases: [],
  permLevel: 'Server Moderator'
};
  
exports.help = {
  name: 'ban',
  category: 'Moderation',
  description: 'Bans specified user.',
  usage: 'ban [...user]'
};
