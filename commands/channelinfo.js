const Discord = require('discord.js');

exports.run = async (client, message) => {
  const msg = await message.channel.send('Loading...');
  const embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setTitle('Channel Information')
    .addField('Name', `${message.channel.name}`, true);
  try { 
    embed.addField('Category', `${message.channel.parent.name}`, true);
  } catch (err) {
    embed.addField('Category', 'None', true);
  }
  if (!message.channel.topic) {
    embed.addField('Topic', 'None', true);
  }
  else {
    embed.addField('Topic', `${message.channel.topic}`, true);
  }
  embed.addField('Position', `${message.channel.calculatedPosition}`, true);
  embed.addField('Overrides', `${message.channel.permissionOverwrites.size}`, true);
  if (message.channel.nsfw === true) {
    embed.addField('NSFW', 'Yes', true);
  }
  embed.setFooter(client.user.username, client.user.avatarURL);
  embed.setTimestamp();
  msg.edit(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Standard User'
};
  
exports.help = {
  name: 'channelinfo',
  category: 'Misc',
  description: 'Provides information for the channel.',
  usage: 'channelinfo'
};
