const Discord = require('discord.js');
exports.run = (client, message, args) => {
const content = args.join(" ");

if(!content) return message.reply('Please add text to include in the embed!')

const embed = new Discord.RichEmbed()
.setDescription(`${content}`)
.setColor('RANDOM')
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
