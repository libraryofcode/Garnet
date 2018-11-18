exports.run = async (client, message, args) => {
  if (args[0] === 'create') {
    try {
      if (client.tags.get(`${message.guild.id}-${args[1]}`)) return message.channel.send('This tag already exists.');
      client.tags.set(`${message.guild.id}-${args[1]}`,`${args.splice(2).join(' ')}`);
      return message.channel.send(`Successfully created tag \`${args[1]}\``);
    } catch (err) {
      return message.channel.send(`An error has occurred during processing | **${err}**`);
    }
  }
  if (args[0] === 'delete') {
    const thisTag = client.tags.get(`${message.guild.id}-${args[1]}`);
    if (!thisTag) return message.channel.send(`The tag \`${args[1]}\` was not found.`);
    try {
      client.tags.remove(`${message.guild.id}-${args[1]}`);
    } catch (err) {
      return message.channel.send(`An error has occurred during processing. | **${err}**`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['tagmanager'],
  permLevel: 'Server Moderator'
};
            
exports.help = {
  name: 'tagm',
  category: 'Misc',
  description: 'Edits or deletes tags.',
  usage: 'tagm create [tag name] [tag content] **OR** tagm delete [tag name]'
};