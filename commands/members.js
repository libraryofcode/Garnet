const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  const msg = await message.channel.send('Loading...');
  const roleM = message.guild.roles.find(role => role.name.toLowerCase() === args.join(' ').toLowerCase());

  const embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setTitle(`Members | ${roleM.name}`)
    .setDescription(`${roleM.members.map(m=>m.user.tag).join('\n')}`)
    .setFooter(`${client.user.username} | Role ID: ${roleM.id}`);
  

  msg.edit(embed);
};

exports.conf = {
  enabled: false,
  guildOnly: true,
  aliases: [],
  permLevel: 'Standard User'
};
    
exports.help = {
  name: 'members',
  category: 'Misc',
  description: 'Provides a list of members in the specified role.',
  usage: 'members [...rolename]'
};
    