const Discord = require('discord.js');
const checkPrem = require('../db/functions/checkPrem.js');

exports.run = async (client, message, args) => {
  const prem = await checkPrem(message.guild.id);
  if (prem === false) return;
  const embed = new Discord.RichEmbed()
    .setFooter(client.user.username, client.user.avatarURL)
    .setDescription(args.join(' '))
    .setTimestamp();
    
  message.delete();
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Server Moderator'
};
      
exports.help = {
  name: 'embed',
  category: 'Fun',
  description: 'Sends an embed, like a say command. But with an embed.',
  usage: 'embed [...text]'
};
      
