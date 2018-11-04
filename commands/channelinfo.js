const Discord = require('discord.js');

exports.run = async (client, message, args) => {

  const resolvedChannel = (args[0] !== undefined) ? message.guild.channels.get(args[0].match(/[0-9]/g).join('')) : null;
  const thisChannel = resolvedChannel ? message.guild.channels.get(resolvedChannel.id) : message.channel;

  const msg = await message.channel.send('Loading...');
  const embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setTitle('Channel Information')
    .addField('Name', `${thisChannel.name}`, true);
  try { 
    embed.addField('Category', `${thisChannel.parent.name}`, true);
  } catch (err) {
    embed.addField('Category', 'None', true);
  }
  if (!message.channel.topic) {
    embed.addField('Topic', 'None', true);
  }
  else {
    embed.addField('Topic', `${thisChannel.topic}`, true);
  }
  embed.addField('Position', `${thisChannel.calculatedPosition}`, true);
  embed.addField('Overrides', `${thisChannel.permissionOverwrites.size}`, true);
  if (thisChannel.nsfw === true) {
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
