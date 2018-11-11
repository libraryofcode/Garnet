const client = require('../client.js');
const status = {
  online: 'Online',
  idle: 'Idle',
  dnd: 'Do Not Disturb',
  offline: 'Offline/Invisible'
};

module.exports = {
  name: 'game',
  action: (msg, args) => {
    const resolvedUser = (args[0] !== undefined) ? msg.channel.guild.members.get(args[0].match(/[0-9]/g).join('')) : null;
    const botuser = resolvedUser ? msg.channel.guild.members.get(resolvedUser.id) : msg.member;

    if (!botuser.game) {
      return msg.channel.createMessage('This user isn\'t playing anything.');
    } else {
      msg.channel.sendTyping();
    }

    const thisStatus = status[botuser.status]; 

    const gameName = botuser.game.name || 'Unspecified';

    const gameDetails = botuser.game.details || 'Unspecified';
    
    const gameState = botuser.game.state || 'Unspecified';

    const highestRole = botuser.roles
      .map(i => msg.channel.guild.roles.get(i))
      .filter(i => i.color)
      .sort((a,b) => b.position - a.position)[0].color; //eslint-disable-line

    const largeImage = botuser.game.assets.large_image 
      ? largeImage = `https://i.scdn.co/image/${botuser.game.assets.large_image.split(':').splice(1)}`
      : largeImage = 'https://cdn.discordapp.com/avatars/460639060851949569/4f545d7d0ee4fb31a411035793c4aef8.png?size=2048';
    
    const startTimeStamp = botuser.game.timestamps.start 
      ? new Date(botuser.game.timestamps.start).toLocaleString('en-us') 
      : 'Unspecified';
    
    const endTimeStamp = botuser.game.timestamps.end 
      ? new Date(botuser.game.timestamps.end).toLocaleString('en-us')
      : 'Unspecified';

    const embed = {};
    if (botuser.game.name !== 'Spotify') {
      embed.embed = {
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
    } else if (botuser.game.name === 'Spotify') {
      embed.embed = {
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
    }
    return msg.channel.createMessage(embed);
  }, options: {
    'description': 'Shows a specified user\'s game details.'
  }
};