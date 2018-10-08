const axios = require('axios');

exports.run = (client, message, args) => {
  function slowmode(s, m) {
    axios({
      method: 'patch',
      url: `https://discordapp.com/api/v6/channels/${message.channel.id}`,
      headers: {
        'Authorization' : `Bot ${client.config.token}`
      },
      data: {
        rate_limit_per_user: s,
        reason: args.slice(1).join(' ')
      }
    }).then(message.channel.send(m))
      .catch(() =>{
        message.channel.send('An error has occurred, either I do not have permissions or the ID is undefined.');
      });
  }


        
  if (args[0] === 'off') {
    message.delete();
    slowmode(0, '***Slowmode has been disabled in this channel.***');
  } else if (isNaN(args[0]) || parseInt(args[0]) > 120 || parseInt(args[0]) < 1) {
    message.channel.send(`Please provide a number between 1 and 120!`);
  } else {
    message.delete();
    slowmode(args[0], `***Slowmode is enabled in this channel for ${args[0]} seconds.***`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Server Moderator'
};
  
exports.help = {
  name: 'slowmode',
  category: 'Moderation',
  description: 'Prevents users from sending messages too fast.',
  usage: 'Slowmode [...# of secs]'
};
  
