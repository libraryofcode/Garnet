const Discord = require("discord.js");
const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
};
exports.run = async (client, message, args) => {
    const msg = await message.channel.send("Loading...");
    const botuser = message.mentions.users.first() ? message.guild.members.get(message.mentions.users.first().id) : message.member;


  const embed = new Discord.RichEmbed()
    .setColor(botuser.displayColor)
    .setFooter(`${client.user.username} | ID ${botuser.id} | Alpha Development`);
    try {
      embed.setAuthor(botuser.displayName, botuser.user.presence.game.assets.smallImageURL)
  }
  catch(err) {
      embed.setAuthor(botuser.displayName, 'https://cdn.discordapp.com/avatars/460639060851949569/4f545d7d0ee4fb31a411035793c4aef8.png?size=2048')
}
    try {
      embed.setThumbnail(botuser.user.presence.game.assets.largeImageURL)
    }
  catch(err) {
    embed.setThumbnail('https://cdn.discordapp.com/avatars/460639060851949569/4f545d7d0ee4fb31a411035793c4aef8.png?size=2048')
  }
  try {
    embed.addField("Status", `${status[botuser.user.presence.status]}`, true)
  }
    catch(err) {
      embed.addField("Status", `None`, true)
    }
  try {
    embed.addField("Playing", `${botuser.user.presence.game ? `${botuser.user.presence.game.name}` : "Not playing anything"}`, true)
  }
    catch(err) {
      embed.addField("Playing", `This user is not playing anything.`, true)
    }
  try {
    embed.addField("Details", `${botuser.user.presence.game.details}`, true)
  }
    catch(err) {
      embed.addField("Details", `No details`, true)
    }
  try {
    embed.addField("State", `${botuser.user.presence.game.state}`, true)
  }
    catch(err) {
      embed.addField("State", `No state`, true)
    }
  
  
  msg.edit(embed);
};


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