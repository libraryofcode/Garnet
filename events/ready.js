const Discord = require('discord.js');
const web = require('../webhooks.json');
module.exports = async client => {
  client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, 'ready');
  client.user.setActivity(`${client.config.defaultSettings.prefix}help | ${client.users.size} users`, {type: 'PLAYING'});
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
    
  hook.send(embed);
    

};
