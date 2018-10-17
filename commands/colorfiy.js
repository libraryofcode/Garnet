const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  ///const content = args.join(' ');


  const embed = new Discord.RichEmbed();
  embed.setDescription(args.join(' '))
  embed.setColor('RANDOM');
  embed.setFooter(client.user.username, client.user.avatarURL);
  embed.setTimestamp();
  message.delete();
  return await message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Standard User'
};
      
exports.help = {
  name: 'colorfiy',
  category: 'Fun',
  description: 'Embeds your text, with a color!',
  usage: 'colorfiy [...text]'
};
