exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
  await message.reply('System is shutting down.');
  client.commands.forEach( async cmd => {
    await client.unloadCommand(cmd);
  });
  process.exit(80);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['s'],
  permLevel: 'Systems Administrator'
};

exports.help = {
  name: 'shutdown',
  category: 'System',
  description: 'Shuts down the bot.',
  usage: 'shutdown'
};
