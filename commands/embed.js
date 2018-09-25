const Discord = require('discord.js')

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setFooter(client.user.username, client.user.avatarURL)
    .setDescription(args.join(" "))
    .setTimestamp()
    
    message.delete()
    message.channel.send(embed)
}

    exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: [],
        permLevel: "Server Moderator"
      };
      
      exports.help = {
        name: "embed",
        category: "Fun",
        description: "Sends an embed, like a say command. But with an embed.",
        usage: "embed [...text]"
      };
      
