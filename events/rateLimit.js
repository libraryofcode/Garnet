const Discord = require('discord.js');
module.exports = (client, guild, message, rateLimit, rateLimitInfo) => { //eslint-disable-line no-unused-vars
  const info = rateLimit.rateLimitInfo;
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  const level = client.permlevel(message);
  const settings = message.settings = client.getGuildSettings(message.guild);

  /*const requestLimit = rateLimitInfo.requestLimit;
  const timeDifference = rateLimitInfo.timeDifference;
  const method = rateLimitInfo.method;
  const path = rateLimitInfo.path;
  */
  
  const embed = new Discord.RichEmbed();
  embed.setTitle('Rate Limit Event');
  embed.setDescription(info);
  embed.addField('User', `${message.author.username} \`(${message.author.id})\``, true);
  embed.addField('User Permissions', client.config.permLevels.find(l => l.level === level).name, true);
  embed.addField('Command', cmd.help.name, true);
  try {
    embed.addField('Guild', `${message.guild.name} \`(${message.guild.id})\``, true);
    embed.addField('Channel', `${message.channel.name} \`(${message.channel.id})\``, true);
  } catch (error) {
    console.log(error);
  }
  embed.setFooter(client.user.username, client.user.avatarURL);
  embed.setTimestamp();
  //embed.addField('Request Limit', requestLimit, true);
  //embed.addField('Time Difference', timeDifference, true);
  //embed.addField('Method', method, true);
  //embed.addField('Path', path, true);
  embed.setFooter(client.user.username, client.user.avatarURL);
  embed.setTimestamp();
  client.channels.get('503374359918805009').send(embed);
};