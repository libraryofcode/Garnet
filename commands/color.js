const Discord = require('discord.js');
const axios = require('axios');
exports.run = async (client, message, args) => {
  //https://dummyimage.com/600x400/000/fff
  const colorCode = args.join(' ');
  const msg = await message.channel.send('Loading...');
  try {
    const name = await axios({
      method: 'get',
      url: `http://www.thecolorapi.com/id?hex=${colorCode}`,
    }).then(m => m.data.name.value);
    const rgb = await axios({
      method: 'get',
      url: `http://www.thecolorapi.com/id?hex=${colorCode}`,
    }).then(m => m.data.rgb.value);
    /*const hex = axios({
      method: 'get',
      url: `http://www.thecolorapi.com/id?hex=${colorCode}`,
    }).then(m => m.data.hex.value);*/
    const embed = new Discord.RichEmbed()
      .setColor(colorCode)
      .setTitle('COLOR')
      .addField('Name', name, true)
      .addField('Hex Code', `#${colorCode.toUpperCase()}`, true)
      .addField('RGB', rgb, true)
      .setImage(`https://dummyimage.com/100x100/${colorCode}/ffffff&text=Garnet`)
      .setFooter(client.user.username, client.user.avatarURL)
      .setTimestamp();
    msg.edit(embed);
  } catch (err) {
    msg.edit(err);
    message.channel.send(`An error has occurred while processing. | ${err}`);
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
