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
    let botuser = message.mentions.users.first() ? message.guild.members.get(message.mentions.users.first().id) : message.member
let bot;
if (botuser.user.bot === true) {
  bot = "Yes";
} else {
  bot = "No";
}

    
try {  const embed = new Discord.RichEmbed()
    .setAuthor(botuser.displayName, botuser.user.presence.game.assets.smallImageURL)
    .setThumbnail(botuser.user.presence.game.assets.largeImageURL)
    .setColor(botuser.displayColor)
    .addField("Status", `${status[botuser.user.presence.status]}`, true)
    .addField("Playing", `${botuser.user.presence.game ? `${botuser.user.presence.game.name}` : "not playing anything."}`, true)
    .addField("Details", `${botuser.user.presence.game.details}`, true)
    .addField("State", `${botuser.user.presence.game.state}`, true)
    .addField("ID", botuser.id, false)
    .addField("Bot", `${bot}`, false)
    .addField("Guild", `${bot}`, false)
    .setFooter("ShadowShard | Alpha Development")
    msg.edit(embed)
} catch (err) {
    msg.edit('Exception: ' + err)
    }
}


  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["g"],
    permLevel: "Systems Alpha/Dev Tester"
  };
  
  exports.help = {
    name: "game",
    category: "Misc",
    description: "Provides information on the user's game.",
    usage: "game"
  };