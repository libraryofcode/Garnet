const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    const embed = new Discord.RichEmbed()
    .setAuthor(`${client.user.username}`, `${client.user.avatarURL}`)
    .setColor(message.member.displayColor)
    .setDescription("This is a clone of the [ShadowShard](https://github.com/FCCouncil/ShadowShard) GitHub epo. Join us today, and help contribute!")
    .addField("Created At", `${client.user.createdAt}`, true)
    .addField("Library", "[Discord.js](https://github.com/discordjs/discord.js)", true)
    .addField("Language", "JavaScript", true)
    .addField("Contributors", `NightRaven#2172, CoalSephos#7566, FlatBird#9461`, true)
    .addField("Creator", `Matthew#0008`, true)
    .setFooter(`${client.user.username} | Alpha Development`);



    message.channel.send(embed);
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["about"],
    permLevel: "Standard User"
  };
  
  exports.help = {
    name: "info",
    category: "Bot Information",
    description: "Provides system information.",
    usage: "whois"
  };