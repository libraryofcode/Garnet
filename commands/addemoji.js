const checkPrem = require('../db/functions/checkPrem.js');

exports.run = async (client, message, args) => {
  checkPrem(message.guild.id).then(m => {
    if (m === false) return message.channel.send('This server is not premium.');
    message.channel.send('Creating emoji').then(msg => {
      if (!message.guild.me.hasPermission('MANAGE_EMOJIS')) return msg.edit('I don\'t have permissions to `MANAGE EMOJIS` in this guild.');
  
      message.guild.createEmoji(`${args[0]}`, `${args[1]}`)
        .then(emoji => msg.edit(`Created new emoji with name \`${emoji.name}\``))
        .catch(console.error);
      message.delete(8);
    });

  });
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
