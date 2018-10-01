const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  const msg = await message.channel.send('Loading...');
  const roleM = message.guild.roles.find(role => role.name.toLowerCase() === args.join(' ').toLowerCase());
  
  const embed = new Discord.RichEmbed()
  embed.setAuthor(client.user.username, client.user.avatarURL);
  embed.setTitle(`Role | ${roleM.name}`);
  embed.setColor(`${roleM.hexColor}`);
  embed.addField('Members', `${roleM.members.size}`, true);
  embed.addField('Color', `${roleM.hexColor}`, true);
  embed.addField('Position', `${roleM.position}`, true);
  embed.addField('Hoisted', `${roleM.hoist}`, true);
  embed.addField('Mentionable', `${roleM.mentionable}`, true);
  embed.addField('Created At', `${roleM.createdAt.toLocaleString('en-US')}`, true);
  embed.setFooter(`${client.user.username} | Role ID: ${roleM.id}`);
  embed.setTimestamp();

  msg.edit(embed)



};
exports.conf = {
  enabled: false,
  guildOnly: true,
  aliases: [],
  permLevel: 'Standard User'
};
  
exports.help = {
  name: 'roleinfo',
  category: 'Misc',
  description: 'Provides info about the mentioned role.',
  usage: 'roleinfo [...rolename]'
};
  