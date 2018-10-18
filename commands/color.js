const Discord = require('discord.js');
//const superagent = require ('superagent');
exports.run = async (client, message, args) => {
  //https://dummyimage.com/600x400/000/fff
  const colorCode = args.join(' ');
  const msg = await message.channel.send('Loading...');
  try {
    const embed = new Discord.RichEmbed()
      .setColor(colorCode)
      .setTitle('COLOR')
      .addField('Hex Code', `#${colorCode.toUpperCase()}`, true)
      .setImage(`https://dummyimage.com/100x100/${colorCode}/ffffff&text=Moonglow`)
      .setFooter(client.user.username, client.user.avatarURL)
      .setTimestamp();
    msg.edit(embed);
  } catch (err) {
    msg.edit(err);
    message.channel.send('An error has occurred while processing.');
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Standard User'
};
  
exports.help = {
  name: 'color',
  category: 'Fun',
  description: 'Gets a color and provides it.',
  usage: 'color [...hex code]'
};
