const Discord = require('discord.js');

exports.run = (client, message) => {
  const roleslist = message.channel.guild.roles.map(r => r.name + ' - ' + r.members.size);

  const embed = new Discord.RichEmbed();
  embed.setTitle('**Server Roles List**');
  embed.setAuthor(client.user.username, client.user.avatarURL);
  embed.setDescription(roleslist);
  embed.setFooter(`Total Roles: ${message.guild.roles.size}`);
  embed.setTimestamp();

  message.channel.send(embed);
};


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['listroles'],
  permLevel: 'Standard User'
};
    
exports.help = {
  name: 'roles',
  category: 'Misc',
  description: 'List the roles in the server.',
  usage: 'roles'
};