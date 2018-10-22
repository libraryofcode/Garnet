const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  try {
    const info = await client.activatedServers.get(args[0]).join('\n');
    //const guild = await client.guilds.get(info).name;

    const embed = new Discord.RichEmbed();
    embed.setTitle('Activated Guilds List');
    embed.addField('User', args[0]);
    //embed.addField('Guilds', `${guild} \`(${info})\``);
    embed.addField('Guilds', info);
    await message.channel.send(embed);
  } catch (err) {
    message.channel.send(err);
  }
}; 

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Systems Support'
};
    
exports.help = {
  name: 'racl',
  category: 'System',
  description: 'Provides a list of the specified user\'s activated servers.',
  usage: 'racl [...userID]'
};
  