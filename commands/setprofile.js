exports.run = async (client, message, args) => {
  const msg = await message.channel.send('Authenticating...');
  if (args[0] === 'title') {
    client.userTitle.set(`${message.author.id}`, `${args.splice(1).join(' ')}`);
    //return msg.edit(`**You have successfully edited your title to ${args.splice(1).join(' ')}**`);
    //return msg.edit(args.splice(1).join(' '));
    const thisTitle = await client.userTitle.get(`${message.author.id}`);
    return msg.edit(`**You have successfully edited your title to \`${thisTitle}\`!**`);
  }
  if (args[0] === 'bio') {
    client.userBio.set(`${message.author.id}`, `${args.splice(1).join(' ')}`);
    //return msg.edit(`**You have successfully edited your bio to ${args.splice(1).join(' ')}**`);
    //return msg.edit(args.splice(1).join(' '));
    const thisBio = await client.userBio.get(`${message.author.id}`);
    //return msg.edit('**You have successfully edited your bio to ' + thisBio + '**!');
    return msg.edit(`**You have successfuly edited your bio to \`${thisBio}\`!**`);
  }
  else {
    return msg.edit('This is not a valid option, please try again.');
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['profileset'],
  permLevel: 'Standard User'
};
        
exports.help = {
  name: 'setprofile',
  category: 'Fun',
  description: 'Allows you to edit your title or bio.',
  usage: 'setprofile [title (New Title)] **OR** [bio (New Bio)]'
};