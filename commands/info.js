const Discord = require('discord.js');
exports.run = async (client, message) => {
  const msg = await message.channel.send('Loading info...');
  const embed = new Discord.RichEmbed();
  embed.setAuthor(`${client.user.username}`, `${client.user.avatarURL}`);
  embed.setColor('RANDOM');
  embed.setDescription('This is a clone of the [Moonglow](https://github.com/FCCouncil/Moonglow) GitHub repo. Join us today, and help contribute!');
  embed.addField('Version', '4.0.5', true);
  embed.addField('Created At', `${client.user.createdAt.toLocaleString('en-US')}`, true);
  embed.addField('Library', '[Discord.js](https://github.com/discordjs/discord.js)', true);
  embed.addField('Language', 'JavaScript', true);
  embed.addField('Contributors', 'Flatbird#0001, TheSkele27#1337, The Phoenix of Phoebus#9935', true);
  embed.addField('Developers', 'Matthew#0008, NightRaven#2172, CoalSephos#7566');
  embed.addField('Creator', 'Matthew#0008', true);
  embed.setTimestamp();
  embed.setFooter(`${client.user.username} | Beta - Master`, 'https://cdn.discordapp.com/attachments/358674161566220288/493662532746084352/js.png');



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
