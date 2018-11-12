//const client = require('../client.js');
const axios = require ('axios');
const config = require('../config.json');

function slowmode(msg, args, s, m) {
  msg.channel.sendTyping();
  if (!msg.member.permission.has('manageMessages')) {
    return msg.channel.createMessage('You need `Manage Messages` to perform this action.');
  }
  axios({
    method: 'patch',
    url: `https://discordapp.com/api/v6/channels/${msg.channel.id}`,
    headers: {
      'Authorization' : `Bot ${config.token}`
    },
    data: {
      rate_limit_per_user: s,
      reason: args.slice(1).join(' ')
    }
  })
    .then(() => msg.channel.createMessage(m))
    .catch(() => {
      return msg.channel.createMessage('An error has occurred, either I do not have permissions or the ID is undefined.');
    });
}

module.exports = {
  name: 'slowmode',
  action: (msg, args) => {        
    if (args[0] === 'off') {
      slowmode(msg, args, 0, '***Slowmode has been disabled in this channel.***');
    } else if (isNaN(args[0]) || parseInt(args[0]) > 120 || parseInt(args[0]) < 1) {
      return msg.channel.createMessage('**Error:** Please use a number between 1 and 120');
    } else {
      return slowmode(msg, args, args[0], `***Slowmode is enabled in this channel for ${args[0]} seconds.***`);
    }
  }, options: {
    'description': 'Enables slowmode in the channel the command is used in.',
    'usage': 'slowmode [...# of seconds] || slowmode off; [...reason]',
    'argsRequired': true,
    'deleteCommand': true,
    'guildOnly': true
  }
};