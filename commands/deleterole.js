exports.run = async (client, message, args) => {
  const msg = await message.channel.send('Deleting role..');
  try {
    const roleM = message.guild.roles.find(role => role.name.toLowerCase() === args.join(' ').toLowerCase());
    roleM.delete('Role deleted upon Administrator request.');
  } catch (err) {
    console.log(err);
  } try {
    const roleID =  message.guild.roles.get(`${args[0]}`);
    roleID.delete('Role deleted upon Administrator request.');
  } catch (err) {
    console.log(err);
  }


  msg.edit('Role successfully deleted.');

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Server Admin'
};
    
exports.help = {
  name: 'deleterole',
  category: 'Moderation',
  description: 'Deletes a role in the server.',
  usage: 'deleterole [...roleID] || [...rolename]'
};