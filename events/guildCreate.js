// This event executes when a new guild (server) is joined.
const Discord = require('discord.js');
const web = require('../webhooks.json');
module.exports = (client, guild) => {
  client.logger.debug(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
  const hook = new Discord.WebhookClient(web.guildCreateID, web.guildCreateToken);
  const embed = new Discord.RichEmbed();
  embed.setTitle('GUILD CREATE EVENT');
  embed.setColor('GREEN');
  embed.addField('Guild', `${guild.name} \`\`(${guild.id})\`\``, true);
  embed.addField('Owner', `${guild.owner.user.tag} \`\`(${guild.owner.user.id})\`\``);
  embed.setTimestamp();
  embed.setFooter(client.user.username, client.user.avatarURL);
  hook.send(embed);
};
