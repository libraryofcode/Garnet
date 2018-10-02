exports.run = async (client, message) => {
  const msg = await message.channel.send('Ping...');
    
  msg.edit(`🏓 Pong! \`${msg.createdTimestamp - message.createdTimestamp}ms\``);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Standard User'
};
  
exports.help = {
  name: 'ping',
  category: 'Misc',
  description: 'Pings the bot, without the embed.',
  usage: 'ping'
};