const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  const dataSuggestion = args.join(' ');
  if (!dataSuggestion) return message.channel.send('**Please include text for the suggestion!**');

  const msg = await message.channel.send('Sending your suggestion to Development...');
  
  const embed = new Discord.RichEmbed()
    .setTitle('Moonglow Suggestion')
    .setThumbnail(message.guild.iconURL)
    .addField('Author', `${message.author.username} (${message.author.id})`)
    .addField('Orgin Guild', `${message.guild.name} (${message.guild.id})`)
    .addField('Suggestion', `${dataSuggestion}`)
    .setTimestamp()
    .setColor('RANDOM')
    .setFooter(client.user.username, client.user.avatarURL);
  client.channels.get('481464215962648577').send({embed});
  client.channels.get('503473196704727050').send({embed});
  msg.edit('Suggestion has been successfully sent to the Moonglow Development Team!');
  msg.delete(10000);
  message.delete(10000);
  //pls
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Standard User'
};
  
exports.help = {
  name: 'suggest',
  category: 'System',
  description: 'Send a suggestion for Moonglow to the developers.',
  usage: 'suggest [..suggestion]'
};
