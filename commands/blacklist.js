const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  const msg = await message.channel.send('Authenticating...');
  const resolvedUser = (args[0] !== undefined) ? message.guild.members.get(args[0].match(/[0-9]/g).join('')) : null;
  const botuser = resolvedUser ? message.guild.members.get(resolvedUser.id) : null;
  const thisUser = botuser.id;

  // Baby can't you see, I'm calling? A guy like you, should wear a warning. It's dangerous, I'm falling.

  if (thisUser === message.author.id) return msg.edit('***Error: You cannot blacklist yourself.***');
  if (botuser.user.bot) return msg.edit('***Error: You cannot blacklist an application or another bot.***'); 
  
  const successEmbed = new Discord.RichEmbed()
  successEmbed.setTitle('GLOBAL BLACKLIST SYSTEM');
  successEmbed.setDescription(`✅ ***Successfully added ${botuser.user.tag} to the global blacklist.***`);
  successEmbed.setFooter(client.user.username, client.user.avatarURL);

  try {
    if (client.blackList.get(thisUser)) {
      message.delete();
      msg.edit('***Error: This user is already blacklisted.***');
      return msg.delete(5000);
    } else {
      client.blackList.set(thisUser, true);
      message.delete();
      //return msg.edit(`✅ ***Successfully added ${botuser.user.tag} to the global blacklist.***`);
      return msg.edit(successEmbed);
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
