exports.run = async (client, message, args) => {
  if (!args || args.length < 1) return message.reply('please provide a package to unload.');

    let response = await client.unloadCommand(args[0]); //eslint-disable-line
  if (response) return message.reply(`Error Unloading: ${response}`);

  message.reply(`the package \`${args[0]}\` has been unloaded.`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['un'],
  permLevel: 'Systems Administrator'
};
  
exports.help = {
  name: 'unload',
  category: 'System',
  description: 'Unload',
  usage: 'unload [command]'
};
