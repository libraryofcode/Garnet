exports.run = (client, message) => {
  const guildmap = client.guilds.map(i => `(Name: ${i.name}) | (ID: ${i.id}) | (Members: ${i.members.size})`);
  message.channel.send(guildmap);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sl'],
  permLevel: 'Systems Support'
};
  
exports.help = {
  name: 'serverlist',
  description: 'Shows a list of the server the bot is on.',
  usage: 'serverlist'
};