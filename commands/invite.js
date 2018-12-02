const Discord = require('discord.js');
exports.run = (client, message) => {


    
  const embed = new Discord.RichEmbed();
  //embed.setAuthor(`${client.user.username}`, `${client.user.avatarURL}`);
  embed.setTitle('Invitation Link');
  //embed.setColor(message.member.displayColor);
  client.generateInvite(['ADMINISTRATOR']).then(link => embed.addField('Invite Link', `${link}`, true));
  embed.addField('Activation', `Don't forget, ${client.user.username} has to be activated before you can invite it. If you want to request activation, do \`moon serverinvite\` and post your server ID anywhere and ping a staff member.`);
  embed.setTimestamp();
  embed.setFooter(`${client.user.username} | Beta - Master`);
  message.member.user.createDM().then(channel => channel.send(embed));
  
  const em1 = new Discord.RichEmbed()
    //.setAuthor(`${client.user.username}`, `${client.user.avatarURL}`)
    .setTitle('Invitation Link')
    .setColor(message.member.displayColor)
    .setDescription('Invite link sent, check your DMs.')
    .addField('Activation', `Don't forget, ${client.user.username} has to be activated before you can invite it. If you want to request activation, do \`garnet serverinvite\` and post your server ID anywhere and ping a staff member.`)
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
