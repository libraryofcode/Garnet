const Discord = require('discord.js');
const talkedRecently = new Set();
const moment = require('moment');
require('moment-duration-format');


exports.run = (client, message) => {
  if (talkedRecently.has(message.author.id) && !message.member.roles.has('490364533550874644')) {

    message.channel.send('You are being rate limited!' + message.author);
  } else { 
    const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
    const embed = new Discord.RichEmbed()
      //.setAuthor(`${client.user.username}`, `${client.user.avatarURL}`)
      .setThumbnail(client.user.avatarURL)
      .setColor(message.member.displayColor)
      .addField('• Uptime', `${duration}`, false)
      .addField('• API Latency', `${Math.round(client.ping)}ms`, true)
      .addField('• API Ping Ratings', `${client.pings.join(', ')}`, true)
      .setFooter(client.user.username, client.user.avatarURL)
      .setTimestamp();
    

    message.channel.send(embed);
    talkedRecently.add(message.author.id);
    setTimeout(() => {
    // Removes the user from the set after a minute
      talkedRecently.delete(message.author.id);
    }, 2000);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['up'],
  permLevel: 'Systems Alpha/Dev Tester'
};

exports.help = {
  name: 'uptime',
  category: 'Bot Information',
  description: 'Provides the uptime.',
  usage: 'uptime'
};
