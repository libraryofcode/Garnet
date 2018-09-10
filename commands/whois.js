const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    const msg = await message.channel.send("Loading...");
    const friendly = client.config.permLevels.find(l => l.level === level).name;
    let botuser = message.mentions.users.first() ? message.guild.members.get(message.mentions.users.first().id) : message.member
    let matt = message.mentions.users.first() ? message.guild.members.get(message.mentions.users.first().id).roles.sort((a, b) => b.position - a.position).map(i => i.id) : message.member.roles.sort((a, b) => b.position - a.position).map(i => i.id)
let myDick = "";
for(let i = 0; i < matt.length; i++) {
  myDick += "<@&" + matt[i] + ">";
  if(matt.length != (i+1))
    myDick += ", ";
}
myDick;
    const embed = new Discord.RichEmbed()
    .setAuthor(botuser.displayName, botuser.user.avatarURL)
    .setColor(botuser.displayColor)
    .addField("ID", botuser.id, true)
    .addField("Joined At", `${botuser.joinedAt}`, true)
    .addField("Presense", `${botuser.user.presence.status}`, true)
    .addField("Roles", `${myDick}`, true)
    .addField("Acknowledgements", `${friendly}`, true)
    .addField("System Level", `${level}`, true)
    msg.edit(embed)
  };
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["userinfo"],
    permLevel: "Standard User"
  };
  
  exports.help = {
    name: "whois",
    category: "Miscelaneous",
    description: "Provides user information.",
    usage: "whois"
  };