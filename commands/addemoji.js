exports.run = async (client, message, args) => {
  const msg = await message.channel.send('Creating emoji...');
  if (!message.guild.me.hasPermission('MANAGE_EMOJIS')) return msg.edit('I don\'t have permissions to `MANAGE EMOJIS` in this guild.');
  message.guild.createEmoji(`${args[0]}`, `${args[1]}`)
    .then(emoji => msg.edit(`Created new emoji with name \`${emoji.name}\``))
    .catch(console.error);
  message.delete(8);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Server Manager'
};
    
exports.help = {
  name: 'addemoji',
  category: 'Moderation',
  description: 'Adds an emoji to the server.',
  usage: 'addemoji [...url] [...emoji name]'
};
