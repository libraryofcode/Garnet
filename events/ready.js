const Discord = require('discord.js');
const web = require('../webhooks.json');
module.exports = async client => {
  // Log that the bot is online.
  client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, 'ready');

  // Make the bot "play the game" which is the help command with default prefix.
  client.user.setActivity(`${client.config.defaultSettings.prefix}help | ${client.users.size} users`, {type: 'PLAYING'});
  //client.channels.get('503384677227429888').send(`\`\`\`js\n\n${client.user.tag} is now online in ${client.guilds.size} servers with ${client.users.size} users.\`\`\``);
  const hook = new Discord.WebhookClient(web.mainLogID, web.mainLogToken);
  const embed = new Discord.RichEmbed()
    .setTitle('Ready Event')
    .setThumbnail(client.user.avatarURL)
    .addField('Status', client.user.presence.status, true)
    .addField('Users', client.users.size, true)
    .addField('Guilds', client.guilds.size, true)
    .addField('Channels', client.channels.size, true)
    .addField('Ready At', client.readyAt.toLocaleString('en-US'))
    .setFooter(client.user.username, client.user.avatarURL)
    .setTimestamp();
    
  //client.channels.get('503384677227429888').send(embed);
  hook.send(embed);
    

};
