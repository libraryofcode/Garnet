const Discord = require('discord.js');

exports.run = async (client, message) => {
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


  const embed = new Discord.RichEmbed();
  embed.setAuthor(client.user.username, client.user.avatarURL);
  embed.setTitle('Server Membercount');
  embed.addField('Total Members', message.guild.memberCount, true);
  embed.addField('Humans', checkMembers(message.guild), true);
  embed.addField('Bots', checkBots(message.guild), true);
  const bans = await message.guild.fetchBans();
  //.then(bans => embed.addField('Bans', `${bans.size}`));
  embed.addField('Bans', `${bans.size}`, true);
  embed.setTimestamp();
  embed.setFooter(`${client.user.username} | Server ID: ${message.guild.id}`);
  message.channel.send(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Standard User'
};
  
exports.help = {
  name: 'membercount',
  category: 'Moderation',
  description: 'Shows a full membercount.',
  usage: 'membercount'
};

