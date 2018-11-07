//const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  const msg = await message.channel.send('Authenticating...');
  const resolvedUser = (args[0] !== undefined) ? message.guild.members.get(args[0].match(/[0-9]/g).join('')) : null;
  const botuser = resolvedUser ? message.guild.members.get(resolvedUser.id) : null;
  const thisUser = botuser.id;

  if (thisUser === message.author.id) return msg.edit('***Error: You cannot blacklist yourself.***');
  if (botuser.user.bot) return msg.edit('***Error: You cannot blacklist a bot.***'); 

  try {
    if (client.blackList.get(thisUser)) {
      message.delete();
      msg.edit('***Error: This user is already blacklisted.***');
      return msg.delete(5000);
    } else {
      client.blackList.set(thisUser, true);
      message.delete();
      return msg.edit(`✅ ***Successfully added ${botuser.user.tag} to the global blacklist.***`);
    }
  } catch (err) {
    message.channel.send(err);
  }
};


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['bl'],
  permLevel: 'Systems Support'
};
    
exports.help = {
  name: 'blacklist',
  category: 'System',
  description: 'Adds the specified user to the global blacklist.',
  usage: 'blacklist [...user]'
};