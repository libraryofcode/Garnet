const Discord = require('discord.js');

exports.run = (client, message) => {
  const embed = new Discord.RichEmbed();
  embed.setTitle('Garnet Community Staff');
  embed.setImage('https://cdn.discordapp.com/attachments/446080476604661790/517587963929165844/iF7mLRAmAAAAAElFTkSuQmCC.png');
  embed.setThumbnail('https://cdn.discordapp.com/icons/446067825673633794/ee1c00dbd90b5ef6d14589ce10074b30.png?size=128');
  embed.addField('Council', 'Dutch van der Linde, NightRaven, Flatbird, Bean, Zahro', true);
  embed.addField('Public & Foreign Relations', 'Joe', true);
  embed.addField('Management', 'Coal, James, Realitus, Tanner', true);
  embed.addField('Moderators', 'aikaterna & Hosea Matthews', true);
  embed.addField('Deputies', 'KhaaZ, Max, Yolo');
  embed.setFooter(client.user.username, client.user.avatarURL);
  embed.setTimestamp();

  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['community', 'team'],
  permLevel: 'Standard User'
};
    
exports.help = {
  name: 'staff',
  category: 'Bot Information',
  description: 'Gives information about the staff for Garnet',
  usage: 'staff'
};