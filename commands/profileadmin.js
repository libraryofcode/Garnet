exports.run = async (client, message, args) => {
  const msg = await message.channel.send('Authenticating...');
  const myMessages = await client.stats.get(`${args[1]} | ${message.guild.id}`);
  const repPoints = await client.repPoints.get(args[1]);
  if (args[0] === 'messages') {
    client.stats.set(`${args[1]} | ${message.guild.id}`, args[2]);
    await msg.edit(`I have edited \`${args[1]}\` key to \`${args[2]}\`. They now have a total of \`${myMessages}\` messages.`);
  } 
  else if (args[0] === 'reputation') {
    client.repPoints.set(args[1], args[2]);
    await msg.edit(`I have edited \`${args[1]}\` key to \`${args[2]}\`. They now have a total of \`${repPoints}\` reputation points.`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Systems Administrator'
};
      
exports.help = {
  name: 'profileadmin',
  category: 'System',
  description: 'Changes specified user\'s messages or reputation points.',
  usage: 'profileadmin [messages (User ID) (New Messages) || [reputation (User ID) (New Reputation Points)'
};