const Discord = require("discord.js");
const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
  };
exports.run = async (client, message, args, level) => {
    if(message.mentions.users.first())
        try { 
            level = client.permlevel(message.mentions.users.first().lastMessage);
        } catch(e) {
            level = 0;
        }
    const msg = await message.channel.send("Loading...");
    const friendly = client.config.permLevels.find(l => l.level === level).name;
    let botuser = message.mentions.users.first() ? message.guild.members.get(message.mentions.users.first().id) : message.member
    let matt = message.mentions.users.first() ? message.guild.members.get(message.mentions.users.first().id).roles.sort((a, b) => b.position - a.position).map(i => i.id).slice(0, -1) : message.member.roles.sort((a, b) => b.position - a.position).map(i => i.id).slice(0, -1)
let myDick = "";
for(let i = 0; i < matt.length; i++) {
  myDick += "<@&" + matt[i] + ">";
  if(matt.length != (i+1))
    myDick += ", ";
    var bot;
    if (botuser.user.bot === true) {
      bot = "Yes";
    } else {
      bot = "No";
    }
}
myDick;
    const embed = new Discord.RichEmbed()
    .setAuthor(botuser.displayName, botuser.user.avatarURL)
    .setColor(botuser.displayColor)
    .addField("ID", botuser.id, true)
    .addField("Bot", `${bot}`, true)
    .addField("Guild", `${bot}`, true)
    .addField("Joined Server At", `${botuser.joinedAt}`, true)
    .addField("Created Account At", `${botuser.user.createdAt}`, true)
    .addField("Status", `${status[botuser.user.presence.status]}`, true)
    .addField("Playing", `${botuser.user.presence.game ? `${botuser.user.presence.game.name}` : "not playing anything."}`, true)
    .addField("Roles", `${myDick}`, true)
    .addField("Acknowledgements", `${friendly}`, true)
    .addField("System Level", `${level}`, true)
    .setFooter("ShadowShard | Alpha Development")
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
    category: "Misc",
    description: "Provides user information.",
    usage: "whois"
  };
