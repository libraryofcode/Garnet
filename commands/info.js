const Discord = require('discord.js');
const utils = require('../util/utils.js');
exports.run = async (client, message) => {
  const msg = await message.channel.send('Loading info...');
  const embed = new Discord.RichEmbed();
  embed.setAuthor('Information');
  if (message.guild && message.guild.me.displayHexColor !== '#000000') {
    embed.setColor(message.guild.me.displayHexColor);
  } else {
    embed.setColor('RANDOM');
  }
  embed.setDescription('This is a clone of the [Garnet](https://github.com/LOCCouncil/Garnet) GitHub repo. Join us today, and help contribute!');
  embed.addField('Version', new utils().kernelVersion, true);
  embed.addField('Created At', `${client.user.createdAt.toLocaleString('en-US')}`, true);
  embed.addField('Library', '[Discord.js](https://github.com/discordjs/discord.js)', true);
  embed.addField('Language', 'JavaScript & TypeScript', true);
  embed.addField('Contributors', 'TheSkele27#1337, The Phoenix of Phoebus#9935', true);
  embed.addField('Developers', 'Dutch van der Linde#0001, NightRaven#2172, CoalSephos#7566, Flatbird#0001');
  embed.addField('Creator', 'Dutch van der Linde#0001', true);
  embed.setTimestamp();
  embed.setFooter(client.user.username, client.user.avatarURL);



  msg.edit(embed);
};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['about'],
  permLevel: 'Standard User'
};
  
exports.help = {
  name: 'info',
  category: 'Bot Information',
  description: 'Provides system information.',
  usage: 'info'
};
