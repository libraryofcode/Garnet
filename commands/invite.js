const Discord = require("discord.js");
exports.run = async (client, message) => {
  if(message.channel.id != "488762614156099585" || "489234703229124608") return;
const embed = new Discord.RichEmbed()
    .setAuthor(`${client.user.username}`, `${client.user.avatarURL}`)
    .setColor(message.member.displayColor)
    .addField("Invite Link", "https://discordapp.com/api/oauth2/authorize?client_id=460639060851949569&permissions=8&scope=bot", true)
    .setFooter("client.user.username | Beta - Master");
    message.channel.send(embed);
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["get", "join"],
    permLevel: "Systems Alpha/Dev Tester"
  };
  
  exports.help = {
    name: "invite",
    category: "Bot Information",
    description: "Provides the invite link.",
    usage: "invite"
  };
