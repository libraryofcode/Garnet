//const Discord = require('discord.js');

exports.run = (client, message, args) => {
  message.delete();
  message.channel.send(args.join(' '));
  
    
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Systems Developer'
};
      
exports.help = {
  name: 'say',
  category: 'Fun',
  description: 'Makes the bot say something.',
  usage: 'say [...text]'
};
      