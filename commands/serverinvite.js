const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    const invite = 'https://discord.gg/F7KXaFk'

    const embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name, 'https://cdn.discordapp.com/icons/446067825673633794/19a38486fb2a04bda9bd064c6010ec06.png?size=128')
    .setTitle('Server Invitation')
    .setTimestamp(message.createdAt)
    .setFooter(client.user.username, client.user.avatarURL)
    .setDescription(invite)
    message.channel.send(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Standard User"
  };
  
  exports.help = {
    name: "serverinvite",
    category: "System",
    description: "Posts the invite URL to the main server.",
    usage: "serverinvite"
  };