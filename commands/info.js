const client = require('../client.js');

module.exports = {
  name: 'info',
  action: async (msg) => {
    msg.channel.sendTyping();

    const embed = {
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      description: 'This is a clone of the [Moonglow](https://github.com/FCCouncil/Moonglow/tree/eris) GitHub repo. Join us today, and help contribute!',
      fields: [
        {
          name: 'Version',
          value: '0.1.0',
          inline: true
        },
        {
          name: 'Created At',
          value: new Date(client.user.createdAt).toLocaleString('en-us'),
          inline: true
        },
        {
          name: 'Library',
          value: '[Eris](https://github.com/abalabahaha/eris)',
          inline: true
        },
        {
          name: 'Language',
          value: 'JavaScript & TypeScript',
          inline: true
        },
        {
          name: 'Contributors',
          value: 'The Phoenix of Phoebus#9935',
          inline: false
        },
        {
          name: 'Developers',
          value: 'Matthew#0008, CoalSephos#7566, Flatbird#0001',
          inline: false
        }
      ],
      timestamp: new Date(msg.createdAt),
      footer: {
        text: client.user.username,
        icon_url: client.user.avatarURL
      }
    };
    msg.channel.createMessage({embed: embed});
  }
};