const Discord = require("discord.js");
const status = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline/Invisible"
};
exports.run = async (client, message, args, level) => {
  if (message.mentions.users.first())
    try {
      level = client.permlevel(message.mentions.users.first().lastMessage);
    } catch (e) {
      level = 0;
    }
  const msg = await message.channel.send("Loading...");
  try {
    const friendly = client.config.permLevels.find(l => l.level === level).name;
    const botuser = message.mentions.users.first() ? message.guild.members.get(message.mentions.users.first().id) : message.member;
    const matt = message.mentions.users.first() ? message.guild.members.get(message.mentions.users.first().id).roles.sort((a, b) => b.position - a.position).map(i => i.id).slice(0, -1) : message.member.roles.sort((a, b) => b.position - a.position).map(i => i.id).slice(0, -1);
    let bot = "";
    let myDick = "";
    for (let i = 0; i < matt.length; i++) {
      myDick += "<@&" + matt[i] + ">";
      if (matt.length != (i + 1)) myDick += ", ";
    }
    if (botuser.user.bot === true) {
      bot = "Yes";
    } else {
      bot = "No";
    }

    const embed = new Discord.RichEmbed()
      .setAuthor(botuser.displayName, botuser.user.avatarURL)
      .setColor(botuser.displayColor)
      .addField("Joined Server At", `${botuser.joinedAt}`, true)
      .addField("Created Account At", `${botuser.user.createdAt}`, true)
      .addField("Status", `${status[botuser.user.presence.status]}`, true)
      .addField("Playing", `${botuser.user.presence.game ? `${botuser.user.presence.game.name}` : "No rich presense found."}`, true)
      .addField("Roles", `${myDick}`, true)
      .addField("Acknowledgements", `${friendly}`, true)
      .addField("System Level", `${level}`, true)
      .setFooter(`${client.user.username} | ID ${botuser.id} |  Beta - Master`);
    if (bot == "Yes") {
      embed.addField("Bot", `${bot}`, true)
    }
    msg.edit(embed);
  } catch (err) {
    msg.edit(`EXCPT*- ` +
      err);
  }
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
