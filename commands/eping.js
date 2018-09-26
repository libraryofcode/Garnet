const Discord = require("discord.js");
const talkedRecently = new Set();
exports.run = async (client, message) => {
  if (talkedRecently.has(message.author.id) && !message.member.roles.has("490364533550874644")) {

    message.channel.send("You are being rate limited!" + message.author);
  } else { // eslint-disable-line no-unused-vars
  const msg = await message.channel.send("Ping?");
  const embed = new Discord.RichEmbed()
    .setAuthor(`${client.user.username}`, `${client.user.avatarURL}`)
    .setColor(message.member.displayColor)
    .addField("• Ping Latency", `${msg.createdTimestamp - message.createdTimestamp}ms`, true)
    .addField("• API Latency", `${Math.round(client.ping)}ms`, true)
    .setFooter(`${client.user.username} | Beta - Master`);
  msg.edit(embed);
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    // Removes the user from the set after a minute
    talkedRecently.delete(message.author.id);
  }, 2000);
};
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Standard User"
};

exports.help = {
  name: "eping",
  category: "Misc",
  description: "Pings the bot, but replies with an embed.",
  usage: "eping"
};
