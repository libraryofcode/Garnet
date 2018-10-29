const client = require('../client.js');
const status = {
  online: 'Online',
  idle: 'Idle',
  dnd: 'Do Not Disturb',
  offline: 'Offline/Invisible'
};

module.exports = {
  name: 'game',
  action: async (msg, args) => {
    msg.channel.sendTyping();

    const resolvedUser = (args[0] !== undefined) ? msg.channel.guild.members.get(args[0].match(/[0-9]/g).join('')) : null;
    const botuser = resolvedUser ? msg.channel.guild.members.get(resolvedUser.id) : msg.member;

    const highestRole = botuser.roles.map(i => msg.channel.guild.roles.get(i)).filter(i => i.color).sort(function (a,b) { return b.position - a.position})[0].color //eslint-disable-line
    const errorEmbed = {
      author: {
        name: `${botuser.user.username}#${botuser.user.discriminator}`,
        icon_url: botuser.user.avatarURL
      },
      color: highestRole,
      description: 'This user isn\'t playing anything.',
      timestamp: new Date(msg.createdAt),
      footer: {
        text: `${client.user.username} | User ID: ${botuser.id}`
      }
    };
    if (!botuser.game) return msg.channel.createMessage({embed: errorEmbed});
     
    let largeImage;
    try {
      if (botuser.game.assets.large_image === undefined || null) {
        largeImage = 'https://cdn.discordapp.com/avatars/460639060851949569/4f545d7d0ee4fb31a411035793c4aef8.png?size=2048';
      } else {
        largeImage = `https://i.scdn.co/image/${botuser.game.assets.large_image.split(':').splice(1)}`;
      }
    } catch (err) {
      largeImage = 'https://cdn.discordapp.com/avatars/460639060851949569/4f545d7d0ee4fb31a411035793c4aef8.png?size=2048';
    }
    const thisStatus = status[botuser.status]; 

    let gameName;
    try {
      if (botuser.game.name === undefined || null) {
        gameName = 'Unspecified';
      } else {
        gameName = botuser.game.name;
      }
    } catch (err) {
      gameName = 'Unspecified';
    }

    let gameDetails;
    try {
      if (botuser.game.details === undefined || null) {
        gameDetails = 'Unspecified';
      } else {
        gameDetails = botuser.game.details;
      }
    } catch (err) {
      gameDetails = 'Unspecified';
    }
    
    let gameState;
    try {
      if (botuser.game.state === undefined || null) {
        gameState = 'Unspecified';
      } else {
        gameState = botuser.game.state;
      }
    } catch (err) {
      gameState = 'Unspecified';
    }

    
    let startTimeStamp;
    try { 
      if (botuser.game.timestamps.start === undefined || null) {
        startTimeStamp = 'Unspecified';
      } else {
        startTimeStamp = new Date(botuser.game.timestamps.start).toLocaleString('en-us');
      }
    } catch (err) {
      startTimeStamp = 'Unspecified';
    }

    let endTimeStamp;
    try {
      if (botuser.game.timestamps.end === undefined || null) {
        endTimeStamp = 'Unspecified';
      } else {
        endTimeStamp = new Date(botuser.game.timestamps.end).toLocaleString('en-us');
      }
    } catch (err) {
      endTimeStamp = 'Unspecified';
    }

    if (botuser.game.name !== 'Spotify') {
      const embed1 = {
        author: {
          name: `${botuser.user.username}#${botuser.user.discriminator}`,
          icon_url: botuser.user.avatarURL
        },
        color: highestRole,
        timestamp: new Date (msg.createdAt),
        thumbnail: {url: largeImage},
        fields: [
          {
            name: 'Status',
            value: thisStatus,
            inline: true
          },
          {
            name: 'Playing',
            value: gameName,
            inline: true
          },
          {
            name: 'Details',
            value: gameDetails,
            inline: true
          },
          {
            name: 'State',
            value: gameState,
            inline: true
          },
          {
            name: 'Started',
            value: startTimeStamp,
            inline: true
          }
        ], 
        footer: {
          text: `${client.user.username} | User ID: ${botuser.id}`
        }
      };
      return msg.channel.createMessage({embed: embed1});
    } else if (botuser.game.name === 'Spotify') {
      const embed2 = {
        title: 'Spotify',
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        thumbnail: {url: largeImage},
        color: 0x1DB954,
        fields: [
          {
            name: 'Song',
            value: gameDetails,
            inline: true
          },
          {
            name: 'Artist',
            value: gameState,
            inline: true
          },
          {
            name: 'Album',
            value: gameName,
            inline: true
          },
          {
            name: 'Start',
            value: startTimeStamp,
            inline: true
          },
          {
            name: 'End',
            value: endTimeStamp,
            inline: true
          }
        ],
        timestamp: new Date (msg.createdAt),
        footer: {
          text: `${botuser.username}#${botuser.discriminator} is listening to Spotify`,
          icon_url: 'https://cdn.discordapp.com/attachments/358674161566220288/496894273304920064/2000px-Spotify_logo_without_text.png'
        }
      };
      msg.channel.createMessage({embed: embed2});
    }
  }, options: {
    'description': 'Shows a specified user\'s game details.'
  }
};