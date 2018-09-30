const Discord = require('discord.js');
const talkedRecently = new Set();
exports.run = async (client, message) => {
  if (talkedRecently.has(message.author.id) && !message.member.roles.has('490364533550874644')) {

    message.channel.send('You are being rate limited!' + message.author);
  } else { // eslint-disable-line no-unused-vars
    const msg = await message.channel.send('Loading... *If you are seeing this message longer than 5 seconds, an error may have occurred.*');
    function checkBots(guild) {
      let botCount = 0; 
      guild.members.forEach(member => { 
        if (member.user.bot) botCount++; 
      });
      return botCount; 
    }
    function checkMembers(guild) {
      let memberCount = 0;
      guild.members.forEach(member => {
        if (!member.user.bot) memberCount++; 
      });
      return memberCount;
    }
    const embed = new Discord.RichEmbed()
      .setAuthor(`${client.user.username}`, `${client.user.avatarURL}`)
      .setTitle('Server Information')
      .setThumbnail(message.guild.iconURL)
      .setColor(message.member.displayColor)
      .addField('Server Owner', message.guild.owner, true)
      .addField('Server Region', message.guild.region, true)
      .addField('Channels', message.guild.channels.size, false)
      .addField('Roles', `${message.guild.roles.size}`, false)
      .addField('Created', `${message.guild.createdAt.toLocaleString('en-US')}`, false)
      .addField('Members', message.guild.memberCount, true)
      .addField('Humans', checkMembers(message.guild), true)
      .addField('Bots', checkBots(message.guild), true)
      .addField('Verification Level', message.guild.verificationLevel, true)
      .setFooter(`${client.user.username} | Beta - Master`);
    msg.edit(embed);
    talkedRecently.add(message.author.id);
    setTimeout(() => {
    // Removes the user from the set after a minute
      talkedRecently.delete(message.author.id);
    }, 2000);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Standard User'
};

exports.help = {
  name: 'serverinfo',
  category: 'Misc',
  description: 'Provides information about the current guild.',
  usage: 'serverinfo'
};
