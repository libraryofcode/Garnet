exports.run = (client, message, args) => {
  const thisTag = client.tags.get(`${message.guild.id}-${args[0]}`);
  if (!thisTag) return message.channel.send(`Tag name \`${args[0]}\`not found.`);
    
  message.delete();
  message.channel.send(thisTag);
};
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Standard User'
};
            
exports.help = {
  name: 'dtag',
  category: 'Misc',
  description: 'Get\'s a tag from the database, but also deletes the command trigger.',
  usage: 'dtag [tag name]'
};