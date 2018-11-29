const Discord = require('discord.js');

exports.run = async (client, message) => {
  const mainCreator = 'Dutch van der Linde#0001';
  const mainCreatorThumbnail = 'https://cdn.discordapp.com/avatars/278620217221971968/c2d796835763314037ca6dc0f4f46557.png?size=2048';
  //const mainCreatorID = '278620217221971968';
  
  const developerOne = 'Flatbird#0001';
  //const developerOneThumbnail = 'https://cdn.discordapp.com/avatars/282586181856657409/a_3b145a55ff342e03762fdb64c6040519.gif';
  //const developerOneID = '282586181856657409';

  const developerTwo = 'CoalSephos#7566';
  //const developerTwoThumbnail = 'https://cdn.discordapp.com/avatars/155698776512790528/dc0d452df901f94c69713228bb9689bf.png?size=256';
  //const developerTwoID = '155698776512790528';

  const developerThree = 'NightRaven#0420';
  //const developerThreeThumbnail = 'https://cdn.discordapp.com/avatars/239261547959025665/776b17504f3c05a52c3153c497bf90bd.png?size=256';
  //const developerThreeID = '239261547959025665';

  const devCollage = 'https://cdn.discordapp.com/attachments/464982080976322560/517495573780103198/devcollage.png';

  const embed = new Discord.RichEmbed();
  embed.setTitle('Developer & Creator Information');
  embed.setThumbnail(mainCreatorThumbnail);
  //embed.setAuthor(mainCreator, mainCreatorThumbnail);
  if (message.guild && message.guild.me.displayHexColor !== '#000000') {
    embed.setColor(message.guild.me.displayHexColor);
  } else {
    embed.setColor('RANDOM');
  }
  embed.addField('Founder, Creator, & Developer', `${mainCreator} is the person who founded, created, and developed ${client.user.username} along with other developers.`, true);
  embed.addField('Head Developer, Advisor, & Community Manager', `${developerOne}`, true);
  embed.addField('Developer, Bug Hunter, & Community Manager', `${developerTwo}`, true);
  embed.addField('Developer, Functionality Assistant, & Community Administrator', `${developerThree}`, true);
  embed.setImage(devCollage);
  embed.setFooter(client.user.username, client.user.avatarURL);
  embed.setTimestamp(new Date(client.user.createdAt));

  message.channel.send(embed);

  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['founders', 'developers', 'devs', 'dev'],
  permLevel: 'Standard User'
};
  
exports.help = {
  name: 'creator',
  category: 'Bot Information',
  description: 'Gives information about the creatoe and developers.',
  usage: 'creator'
};