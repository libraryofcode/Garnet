const Discord = require("discord.js");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const msg = await message.channel.send("Ping?");
  const embed = new Discord.RichEmbed()
  .setAuthor(`${client.user.username}`, `${client.user.avatarURL}`)
    .setColor(message.member.displayColor)
    .addField("• Ping Latency", `${msg.createdTimestamp - message.createdTimestamp}ms`, true)
    .addField("• API Latency", `${Math.round(client.ping)}ms`, true)
    .setFooter(`${client.user.username} | Beta - Master`);
  msg.edit(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Standard User"
};

exports.help = {
  name: "ping",
  category: "Misc",
  description: "Pings the bot, responses with API and regular latencies.",
  usage: "ping"
};
