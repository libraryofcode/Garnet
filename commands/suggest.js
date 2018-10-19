const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  const dataSuggestion = args.join(" ");
  if (!dataSuggestion) return message.reply('**Please include text for the suggestion!**');
  
  const Discord = new Discord.RichEmbed()
  .setTitle('FCC Server Suggestion')
  .addField('Author:', `${message.author.username} (${message.author.id})`)
  .addField('Suggestion:', `${dataSuggestion}`)
  .setTimestamp()
  .setColor('BLACK')
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
  category: 'FCC Server',
  description: 'Suggest something on the guild.',
  usage: 'suggest [..suggestion]'
};
