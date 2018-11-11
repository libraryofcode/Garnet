exports.run = async (client, message, args) => {
  const msg = await message.channel.send('Authenticating...');
  const resolvedUser = (args[0] !== undefined) ? message.guild.members.get(args[0].match(/[0-9]/g).join('')) : null;
  const botuser = resolvedUser ? message.guild.members.get(resolvedUser.id) : null;
  const thisUser = botuser.id;

  try {
    if (client.blackList.get(thisUser)) {
      client.blackList.set(thisUser, false);
      message.delete();
      msg.edit(`✅ ***Successfully removed ${botuser.user.tag} from the global blacklist.***`);
    } else {
      message.delete();
      return msg.edit('***Error: This user was never in the blacklist.***');
    }
  } catch (err) {
    message.channel.send(err);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ubl'],
  permLevel: 'Systems Administrator'
};
      
exports.help = {
  name: 'unblacklist',
  category: 'System',
  description: 'Removes the specified user from the global blacklist.',
  usage: 'unblacklist [...user]'
};