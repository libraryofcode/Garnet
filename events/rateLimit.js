const Discord = require('discord.js');
module.exports = (client, guild, message, rateLimit, rateLimitInfo) => { //eslint-disable-line no-unused-vars
  const info = rateLimitInfo;
  /*const requestLimit = rateLimitInfo.requestLimit;
  const timeDifference = rateLimitInfo.timeDifference;
  const method = rateLimitInfo.method;
  const path = rateLimitInfo.path;
  */
  
  const embed = new Discord.RichEmbed();
  embed.setTitle('Rate Limit Event');
  embed.setDescription(info);
  //embed.addField('Request Limit', requestLimit, true);
  //embed.addField('Time Difference', timeDifference, true);
  //embed.addField('Method', method, true);
  //embed.addField('Path', path, true);
  embed.setFooter(client.user.username, client.user.avatarURL);
  embed.setTimestamp();

  client.channel.get('503374359918805009').send(embed);
};