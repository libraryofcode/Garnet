const Discord = require('discord.js');
exports.run = async (client, message) => {
  const mRole = message.mentions.roles.first();
  const embed = new Discord.RichEmbed()
    .setAuthor(`${client.user.username}`, `${client.user.avatarURL}`)
    .addField('Test', `${message.guild.roles.find(mRole).hexColor}`);
  message.channel.send(embed);
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
  