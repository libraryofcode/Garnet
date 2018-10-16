exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
  const msg = await message.channel.send('Executing PM2 full restart...');
  msg.edit('Restarting...');
  client.commands.forEach( async cmd => {
    await client.unloadCommand(cmd);
  });
  process.exit(5);
};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['r'],
  permLevel: 'Systems Administrator'
};
  
exports.help = {
  name: 'restart',
  category: 'System',
  description: 'Restarts using PM2.',
  usage: 'restart'
};