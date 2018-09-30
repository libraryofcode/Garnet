exports.run = (client, message, [mention, ...reason]) => {

  try { if (message.mentions.members.size === 0)
    return message.reply('Please mention a user to kick');

  if (!message.guild.me.hasPermission('KICK_MEMBERS'))
    return message.reply('I do not have the kick members permission.');

  const kickMember = message.mentions.members.first();
  message.delete();

  kickMember.kick(reason.join(' ')).then(member => {
    message.reply(`***${member.user.username} has been kicked.***`);
  });
  } catch (err) {
    message.edit('EXCPT*- ' +
    err);
  }

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Server Moderator'
};
  
exports.help = {
  name: 'kick',
  category: 'Moderation',
  description: 'Kick a user from the server.',
  usage: 'kick [...user id]'
};
