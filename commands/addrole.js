exports.run = async (client, message, args) => {
  /*const resolvedUser = (args[0] !== undefined) ? message.guild.members.get(args[0].match(/[0-9]/g).join('')) : null;
  const botuser = resolvedUser ? message.guild.members.get(resolvedUser.id) : null;
  if (!botuser) return message.reply('That user could not be found.');
  const role = args.join(' ').slice(22);
  if (!role) return message.reply('Please specify a role name.');
  const gRole = message.guild.roles.find('name', role);
  if (!gRole) return message.reply('I couldn\'t find that role.');
        
  if (botuser.roles.has(gRole.id)) return message.reply('The user specified already has that role.');
  await(botuser.addRole(gRole.id));
        
  try {
    message.delete();
    await message.channel.send(`✅ ***Changed roles for ${botuser}, added ${gRole.name}***`);
  } catch (e) {
    message.channel.send(e);
  }
};*/
  message.channel.send('This command is temporary disabled.');
  throw new TypeError('This command is disabled.');
};

exports.conf = {
  enabled: false,
  guildOnly: true,
  aliases: [],
  permLevel: 'Server Admin'
};
  
exports.help = {
  name: 'addrole',
  category: 'Moderation',
  description: 'Adds a role to the specified user.',
  usage: 'addrole [...user, rolename]'
};
