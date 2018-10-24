const Discord = require('discord.js');
const status = {
  online: 'Online',
  idle: 'Idle',
  dnd: 'Do Not Disturb',
  offline: 'Offline/Invisible'
};
exports.run = async (client, message, args) => {
  const resolvedUser = (args[0] !== undefined) ? message.guild.members.get(args[0].match(/[0-9]/g).join('')) : null;
  //In the future, we have plans to check if a user is playing Spotify, and if they are have a specific Spotify only embed for the game.

  const msg = await message.channel.send('Loading...');
  const botuser = resolvedUser ? message.guild.members.get(resolvedUser.id) : message.member;
  //Above constant adds the ability to get a game for a user by an ID instead of having to mention them.
  //const botuser = message.mentions.users.first() ? message.guild.members.get(message.mentions.users.first().id) : message.member;
  const errorembed = new Discord.RichEmbed();
  errorembed.setAuthor(`${botuser.displayName}#${botuser.user.discriminator}`);
  errorembed.setColor(botuser.displayColor);
  errorembed.setDescription('This user isn\'t playing anything.');
  errorembed.setTimestamp();
  errorembed.setFooter(`${client.user.username} | ID ${botuser.id} | Beta - Master`);

  if (!botuser.user.presence.game) return msg.edit(errorembed);
  const embed = new Discord.RichEmbed()
    .setColor(botuser.displayColor)
    .setTimestamp()
    .setFooter(`${client.user.username} | ID ${botuser.id} | Beta - Master`);

  
  if (botuser.user.presence.game.name !== 'Spotify') {
    const game = botuser.user.presence.game;

    try {
      embed.setAuthor(`${botuser.displayName}#${botuser.user.discriminator}`, game.assets.smallImageURL);
    } catch (err) {
      embed.setAuthor(botuser.displayName, 'https://cdn.discordapp.com/avatars/460639060851949569/4f545d7d0ee4fb31a411035793c4aef8.png?size=2048');
    }
    try {
      embed.setThumbnail(game.assets.largeImageURL);
    } catch (err) {
      embed.setThumbnail('https://cdn.discordapp.com/avatars/460639060851949569/4f545d7d0ee4fb31a411035793c4aef8.png?size=2048');
    }
    try {
      embed.addField('Status', `${status[botuser.user.presence.status]}`, true);
    } catch (err) {
      embed.addField('Status', 'An error occured while getting the user\'s status.', true);
    }
    try {
      if (game.name === null) embed.addField('Playing', 'Unspecified', true);
      else
        embed.addField('Playing', `${game.name}`, true);
    } catch (err) {
      embed.addField('Playing', 'An error occured while getting the game\'s name.', true);
    }
    try {
      if (game.details === null) embed.addField('Details', 'Unspecified', true);
      else
        embed.addField('Details', `${game.details}`, true);
    }
    catch (err) {
      embed.addField('Details', 'No Info', true);
    }
    try {
      if (game.state === null) embed.addField('Details', 'Unspecified', true);
      else 
        embed.addField('State', `${game.state}`, true);
    } catch (err) {
      embed.addField('State', 'No state', true);
    }
    try {
      embed.addField('Started', `${game.timestamps.start.toLocaleString('en-US')}`, true);
    } catch (err) {
      embed.addField('Started', 'None', true);
    }
  } else if (botuser.user.presence.game.name === 'Spotify') {
    embed.setTitle('Spotify', 'https://cdn.discordapp.com/attachments/358674161566220288/496894273304920064/2000px-Spotify_logo_without_text.png');
    embed.setAuthor(`${client.user.username}`, `${client.user.avatarURL}`);
    embed.setThumbnail(botuser.user.presence.game.assets.largeImageURL);
    embed.setColor('#1DB954');
    embed.addField('Song', `${botuser.user.presence.game.details}`, true);
    embed.addField('Artist', `${botuser.user.presence.game.state}`, true);
    embed.addField('Album', `${botuser.user.presence.game.assets.largeText}`, true);
    embed.addField('Start', `${botuser.user.presence.game.timestamps.start.toLocaleString('en-US')}`, true);
    embed.addField('End', `${botuser.user.presence.game.timestamps.end.toLocaleString('en-US')}`, true);
    embed.setTimestamp();
    embed.setFooter(`${botuser.user.tag} is listening to Spotify.`, 'https://cdn.discordapp.com/attachments/358674161566220288/496894273304920064/2000px-Spotify_logo_without_text.png');
    /*else {
      embed.setFooter(`${botuser.displayName}#${botuser.user.discriminator} is listening to Spotify with <@!${botuser.user.presence.game.party.id.split(':')[1]}>`, 'https://cdn.discordapp.com/attachments/358674161566220288/496894273304920064/2000px-Spotify_logo_without_text.png');
    } */
  }
  msg.edit(embed);

  
};


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Standard User'
};

exports.help = {
  name: 'game',
  category: 'Misc',
  description: 'Provides information on the user\'s game.',
  usage: 'game'
};
