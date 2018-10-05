exports.run = (client, message, args) => {
  throw TypeError('This command is disabled');

};

exports.conf = {
  enabled: false,
  guildOnly: true,
  aliases: [],
  permLevel: 'Standard User'
};
  
exports.help = {
  name: 'joe',
  category: 'Fun',
  description: 'Joe, just Joe.',
  usage: 'joe [...mention]'
};