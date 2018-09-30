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
  const embed = new Discord.RichEmbed()
    .setColor(botuser.displayColor)
    .setTimestamp()
    .setFooter(`${client.user.username} | ID ${botuser.id} | Beta - Master`);

  if (!botuser.user.presence.game) {
    embed.setAuthor(botuser.displayName),
    embed.addField('Playing', 'This user is not playing anything.', true);
  } else {
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
      embed.addField('Playing', `${game.name}`, true);
    } catch (err) {
      embed.addField('Playing', 'An error occured while getting the game\'s name.', true);
    }
    try {
      embed.addField('Details', `${game.details}`, true);
    }
    catch (err) {
      embed.addField('Details', 'No Info', true);
    }
    try {
      embed.addField('State', `${game.state}`, true);
    } catch (err) {
      embed.addField('State', 'No state', true);
    }
    try {
      embed.addField('Started', `${game.timestamps.start}`, true);
    } catch (err) {
      embed.addField('Started', 'None', true);
    }
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
