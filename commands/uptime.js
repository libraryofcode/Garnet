const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  const embed = new Discord.RichEmbed()
    .setAuthor(`${client.user.username}`, `${client.user.avatarURL}`)
    .setColor(message.member.displayColor)
    .addField("• Uptime", `${duration}`, true)
    .addField("• Ping", `${Math.round(client.ping)}ms`, true)
    .addField("• Ping Ratings", `${client.pings}`, true)
    .setFooter(`${client.user.username} | Alpha Development`);
    

  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Systems Alpha/Dev Tester"
};

exports.help = {
  name: "uptime",
  category: "Bot Information",
  description: "Provides the uptime.",
  usage: "uptime"
};
