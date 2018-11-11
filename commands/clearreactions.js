exports.run = async (client, message, args) => {
  const msg = await message.channel.send('Clearing reactions...');
  if (args[1]) {
    try {
      message.delete();
      const thisChannel = message.guild.channels.get(args[1]);
      thisChannel.fetchMessage(args[0])
        .then(message => message.clearReactions());
      return msg.delete();
    } catch (err) {
      return msg.edit(err);
    }
  }
  else {
    try {
      message.delete();
      message.channel.fetchMessage(args[0])
        .then(message => message.clearReactions());
      return msg.delete();
    } catch (err) {
      return msg.edit(err);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['clear'],
  permLevel: 'Systems Administrator'
};
  
exports.help = {
  name: 'clearreactions',
  category: 'Moderation',
  description: 'Clears all reactions on a specified message.',
  usage: 'clearreactions [messageID] [channelID (defaults to message channel)]'
};
  