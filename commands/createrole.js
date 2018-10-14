exports.run = async (client, message, args) => {

  const msg = await message.channel.send('Creating role...');

  if (!message.guild.me.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {
    return msg.edit('Sorry, I don\'t have permissions to **Manage Roles** in this guild, please check my permissions and try again.');
  } else {

    message.guild.createRole({
      name: `${args[0]}`,
      color: args[1],
      hoist: args[2]
    });
    
    
    msg.edit(`Created the role \`${args[0]}\` with color \`${args[1]}\` and a hoist of \`${args[2]}\``);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Server Admin'
};
  
exports.help = {
  name: 'createrole',
  category: 'Moderation',
  description: 'Creates a role in the server.',
  usage: 'createrole [rolename] [color] [hoist(boolean)]'
};