const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    const embed = new Discord.RichEmbed()
    .setAuthor(`${client.user.username}`, `${client.user.avatarURL}`)
    .setColor(message.member.displayColor)
    .addField("Created At", `${client.user.createdAt}`, true)
    .addField("Library", "[Discord.js](https://github.com/discordjs/discord.js)", true)
    .addField("Language", "JavaScript", true)
    .addField("Contributors", `NightRaven#2172, CoalSephos#7566, FlatBird#9461`, true)
    .addField("Creator", `Matthew#0008`, true)
    .setFooter("Alpha/Development | ShadowShard")



    message.channel.send(embed)
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["about"],
    permLevel: "Standard User"
  };
  
  exports.help = {
    name: "info",
    category: "Miscelaneous",
    description: "Provides system information.",
    usage: "whois"
  };