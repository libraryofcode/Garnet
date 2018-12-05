//const util = require('../util/util.ts');
exports.run = async (client, message) => {
    //const thisMessage = '🏓 Pong!';
    const msg = await message.channel.send('🏓 Pong!');
      
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
    category: 'Bot Information',
    description: 'Pings the bot, without the embed.',
    usage: 'ping'
  };