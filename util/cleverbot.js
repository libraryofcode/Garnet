function botInit() {
  //const client = require('../index.js');
  const cleverbot = require('cleverbot.io');

  const bot = new cleverbot('www.speedtest.net/result/7846522987', 'FYGWlyIAE85XYjBvB1pUVjGiqhZ9opyT');
  bot.create(function(err, session) {
  // session is your session name, it will either be as you set it previously, or cleverbot.io will generate one for you
  
  // Woo, you initialized cleverbot.io.  Insert further code here
  });
}
module.exports = botInit;