const Discord = require('discord.js');
module.exports = async client => {
  // Log that the bot is online.
  client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, 'ready');

  // Make the bot "play the game" which is the help command with default prefix.
  client.user.setActivity(`${client.config.defaultSettings.prefix}help | ${client.users.size} users`, {type: 'PLAYING'});
  //client.channels.get('503384677227429888').send(`\`\`\`js\n\n${client.user.tag} is now online in ${client.guilds.size} servers with ${client.users.size} users.\`\`\``);

  const embed = new Discord.RichEmbed()
    .setTitle('Ready Event')
    .setDescription('I am now online.')
    .addField('Status', client.user.presence.status, true)
    .addField('Users', client.users.size, true)
    .addField('Guilds', client.guilds.size)
    .addField('Channels', client.channels.size)
    .setFooter(client.user.username, client.user.avatarURL)
    .setTimestamp();
    
  client.channels.get('503384677227429888').send(embed);
    

};
