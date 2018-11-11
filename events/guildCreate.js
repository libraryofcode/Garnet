// This event executes when a new guild (server) is joined.
const Discord = require('discord.js');
const fs = require('fs');
const web = require('../webhooks.json');
module.exports = (client, guild) => {
  /* this code checks to make sure that the bot is in the authorized list of servers below in the "activatedServers"
  If it's not in this list, then the bot will leave the server and then will return a DEBUG message to the console. */

  fs.readFile('./allowedGuildDB.json', 'utf8', (err, data) => {
    if (err !== null) {
      console.log(err);
    }
    else {
      const allowedGuild = JSON.parse(data);
      if (allowedGuild.allowedGuildIDs.includes(guild.id)) {
        client.logger.debug(`[GUILD AUTHORIZED] ${guild.name}`);
        const hook1 = new Discord.WebhookClient(web.guildCreateID, web.guildCreateToken);
        const successEmbed = new Discord.RichEmbed()
          .setTitle('Guild Create Event')
          .setThumbnail(guild.iconURl)
          .addField('Authorized', 'True', true)
          .addField('Guild', `${guild.name} \`\`(${guild.id})\`\``, true)
          .addField('Owner', `${guild.owner.user.tag} \`\`(${guild.owner.user.id})\`\``)
          .setFooter(client.user.username, client.user.avatarURL)
          .setTimestamp();
    
        //client.channels.get('503374601892397060').send(successEmbed);
        hook1.send(successEmbed);
    
        return;
      }
      else { 
        client.logger.debug(`[GUILD UNAUTHORIZED] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
        const hook2 = new Discord.WebhookClient(web.guildCreateID, web.guildCreateToken);
        const errorEmbed = new Discord.RichEmbed()
          .setTitle('Guild Create Event')
          .setThumbnail(guild.iconURl)
          .addField('Authorized', 'False', true)
          .addField('Guild', `${guild.name} \`\`(${guild.id})\`\``, true)
          .addField('Owner', `${guild.owner.user.tag} \`\`(${guild.owner.user.id})\`\``)
          .setFooter(client.user.username, client.user.avatarURL)
          .setTimestamp();
        //client.channels.get('503374601892397060').send(errorEmbed);
        hook2.send(errorEmbed);
        return guild.leave(guild.id);
      }                                                            
    }
  });

  // If you don't want this feature on your bot, feel free to remove everything from this line of text to the above comment.
    


  client.logger.debug(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);


};
