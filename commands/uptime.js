const moment = require('moment');
require('moment-duration-format');
const client = require('../client.js');

module.exports = {
  name: 'uptime',
  action: (msg) => {
    const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');

    const embed = {
      //title: 'Uptime',
      fields: [
        {
          name: 'Uptime',
          value: duration,
          inline: true
        },
        {
          name: 'Started At',
          value: new Date(client.startTime).toLocaleString('en-us'),
          inline: true
        }
      ],
      footer: {
        text: client.user.username,
        icon_url: client.user.avatarURL
      },
      timestamp: new Date()
    };
    msg.channel.createMessage({ embed });
  },
  options: {
    description: 'Shows the bot\'s uptime.'
  }
};