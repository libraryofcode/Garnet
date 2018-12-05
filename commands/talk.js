exports.run = async (client, message, args) => {
  const cleverbot = require('cleverbot.io');

  const bot = new cleverbot('1DoyBgxuUc3EiKnm', 'FYGWlyIAE85XYjBvB1pUVjGiqhZ9opyT');
  bot.create(function(err, session) {
    bot.ask(args, function(err, response) {
      message.channel.send(response); // Will likely be: "Living in a lonely world"
    });
  });

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ask'],
  permLevel: 'Standard User'
};
  
exports.help = {
  name: 'talk',
  category: 'Fun',
  description: 'Talk to the bot.',
  usage: 'talk'
};