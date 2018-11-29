const { version } = require('discord.js');
const Discord = require('discord.js');
const utils = require('../util/utils.js');
const talkedRecently = new Set();
const moment = require('moment');
require('moment-duration-format');
exports.run = (client, message) => { 
  if (talkedRecently.has(message.author.id) && !message.member.roles.has('490364533550874644')) {

    message.channel.send('You are being rate limited!' + message.author);
  } else {
    const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
    const embed = new Discord.RichEmbed();
    //embed.setAuthor(`${client.user.username}`, `${client.user.avatarURL}`);
    embed.setTitle('STATISTICS');
    if (message.guild && message.guild.me.displayHexColor !== '#000000') {
      embed.setColor(message.guild.me.displayHexColor);
    } else {
      embed.setColor('RANDOM');
    }
    embed.addField('Version', new utils().kernelVersion, false);
    embed.addField('• Memory Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true);
    embed.addField('• Uptime', `${duration}`, true);
    embed.addField('• Users  ', `${client.users.size.toLocaleString()}`, true);
    embed.addField('• Servers ', `${client.guilds.size.toLocaleString()}`, true);
    embed.addField('• Channels', `${client.channels.size.toLocaleString()}`, true);
    embed.addField('• Discord.js Version', `v${version}`, true);
    embed.addField('• Node Version', `${process.version}`, true);
    embed.addField('Creator', 'Dutch van der Linde#0001', true);
    embed.setTimestamp();
    embed.setFooter(`${client.user.username} | Process ID ${process.ppid} - ${process.pid}`, client.user.avatarURL);
    message.channel.send(embed);
  }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
  // Removes the user from the set after a minute
    talkedRecently.delete(message.author.id);
  }, 2000);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Standard User'
};

exports.help = {
  name: 'stats',
  category: 'Bot Information',
  description: 'Gives some useful bot statistics',
  usage: 'stats'
};
