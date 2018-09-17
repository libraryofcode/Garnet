const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    const embed = new Discord.RichEmbed()
    .setAuthor(`${client.user.username}`, `${client.user.avatarURL}`)
    .setColor(message.member.displayColor)
    .setDescription("This is a clone of the [Moonglow](https://github.com/FCCouncil/Moonglow) GitHub repo. Join us today, and help contribute!")
    .addField("Version", "3.0.0", true)
    .addField("Created At", `${client.user.createdAt}`, true)
    .addField("Library", "[Discord.js](https://github.com/discordjs/discord.js)", true)
    .addField("Language", "JavaScript", true)
    .addField("Contributors", `NightRaven#2172, CoalSephos#7566, FlatBird#9461, TheSkele27#1337`, true)
    .addField("Creator", `Matthew#0008`, true)
    .setFooter(`${client.user.username} | Beta - Master`);



    message.channel.send(embed);
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["about"],
    permLevel: "Standard User"
  };
  
  exports.help = {
    name: "info",
    category: "Bot Information",
    description: "Provides system information.",
    usage: "whois"
  };
