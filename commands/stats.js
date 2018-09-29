const { version } = require("discord.js");
const Discord = require("discord.js");
const talkedRecently = new Set();
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if (talkedRecently.has(message.author.id) && !message.member.roles.has("490364533550874644")) {

    message.channel.send("You are being rate limited!" + message.author);
  } else {
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  const embed = new Discord.RichEmbed()
    .setAuthor(`${client.user.username}`, `${client.user.avatarURL}`)
    .setTitle(`STATISTICS`)
    .setColor(message.member.displayColor)
    .addField("Version", "3.5.5", false)
    .addField("• Memory Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
    .addField("• Uptime", `${duration}`, true)
    .addField("• Users  ", `${client.users.size.toLocaleString()}`, true)
    .addField("• Servers ", `${client.guilds.size.toLocaleString()}`, true)
    .addField("• Channels", `${client.channels.size.toLocaleString()}`, true)
    .addField("• Discord.js Version", `v${version}`, true)
    .addField("• Node Version", `${process.version}`, true)
    .addField("Creator", `Matthew#0008`, true)
    .setTimestamp()
    .setFooter(`${client.user.username} | Process ID ${process.ppid} - ${process.pid}`);
  message.channel.send(embed);
};
talkedRecently.add(message.author.id);
setTimeout(() => {
  // Removes the user from the set after a minute
  talkedRecently.delete(message.author.id);
}, 2000);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Standard User"
};

exports.help = {
  name: "stats",
  category: "Bot Information",
  description: "Gives some useful bot statistics",
  usage: "stats"
};
