const Discord = require('discord.js');
exports.run = (client, message) => {
  
  const embed = new Discord.RichEmbed();
  embed.setTitle('Invitation Link');
  embed.addField('Invite Link', 'https://discordapp.com/oauth2/authorize?client_id=460639060851949569&scope=bot&permissions=2146954495', true);
  embed.setTimestamp();
  embed.setFooter(client.user.username, client.user.avatarURL);
  message.member.user.createDM().then(channel => channel.send(embed));
  
  const em1 = new Discord.RichEmbed()
    .setColor(message.member.displayColor)
    .setDescription('Invite link sent, check your DMs.')
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL);
  message.channel.send(em1);
};




  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['get', 'join'],
  permLevel: 'Standard User'
};
  
exports.help = {
  name: 'invite',
  category: 'Bot Information',
  description: 'Provides the bot\'s invite link.',
  usage: 'invite'
};
