const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  const dataSuggestion = args.join(' ');
  if (!dataSuggestion) return message.reply('**Please include text for the suggestion!**');
  
  const embed = new Discord.RichEmbed()
    .setTitle('FC Server Suggestion')
    .addField('Author:', `${message.author.username} (${message.author.id})`)
    .addField('Suggestion:', `${dataSuggestion}`)
    .setTimestamp()
    .setColor('RANDOM')
    .setFooter(client.user.username, client.user.avatarURL);
  client.channels.get('462361967026241536').send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Standard User'
};
  
exports.help = {
  name: 'suggest',
  category: 'system',
  description: 'Suggest something on the guild.',
  usage: 'suggest [..suggestion]'
};
