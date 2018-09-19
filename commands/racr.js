const Discord = require('discord.js')


exports.run = async (client, message, args) => {

    const hook = new Discord.WebhookClient('491823610797883402', 'iKKbBlgqa7ooSScTL4jyK-s0MUCwM874C59gwS6G5MA1-CKp_e4KqCUj4uxMq5nK49O4');
    message.react('✅')
    message.delete()
    hook.send(`Activation Request for server ${args[0]} by <@!${args[1]}> has been activated by ${message.author.username}#${message.author.discriminator}.`)
    hook.send('If you need the invite URL, do `moon invite` in any channel and it will be sent to you.')
}















exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["confirm"],
    permLevel: "Systems Administrator"
  };
  
  exports.help = {
    name: "racr",
    category: "System",
    description: "Confirms server activation.",
    usage: "racr [...server ID]"
  };