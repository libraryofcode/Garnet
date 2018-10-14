exports.run = async (client, message) => {
  const msg = message.channel.send('Loading the Carti...');
  msg.edit('The Carti gun has been loaded and is ready to ban, pew pew.');
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Standard User'
};
    
exports.help = {
  name: 'carti',
  category: 'Fun',
  description: 'Just, Carti tbh.',
  usage: 'carti'
};