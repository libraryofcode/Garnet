const Discord = require('discord.js')


exports.run = async (client, message, args) => {

//https://canary.discordapp.com/api/webhooks/491814470641909765/
const hook = new Discord.WebhookClient('491814470641909765', 'p-OeOEnFzBGY9nnrLx-149wEHQbpmdGlMVKRQmbUJytcDtCT_Kw_******');

// Send a message using the webhook
hook.send(`__Activation request for server:__ 
***${args[0]}*** initiated by user: **${message.author.username}#${message.author.discriminator}** with the ID of ${message.author.id}`);

message.react('✅')
message.channel.send(`***Server activation request for server ${args[0]} by ${message.author.username}#${message.author.discriminator} sent.***`)
}










exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["request", "requestactivation"],
    permLevel: "Standard User"
  };
  
  exports.help = {
    name: "rac",
    category: "System",
    description: "Sends a request to activate the server ID",
    usage: "rac [...server ID]"
  };
