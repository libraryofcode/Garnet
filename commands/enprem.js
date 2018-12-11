const Discord = require('discord.js');
const web = require('../webhooks.json');
var connectToMongo = require('../db/init.js');

exports.run = async (client, message, args) => {
  const msg = await message.channel.send('*Activating...*');
  if (client.guilds.get(args[0]) === undefined) return msg.edit('TypeError: Cannot read property \'id\' of undefined');
  if (client.users.get(args[1]) === undefined) return msg.edit('TypeError: Cannot read property \'tag\' of undefined');
  connectToMongo('mongodb://127.0.0.1:27017/', async function(err, db) {
    var dbo = db.db('Garnet');

    const check = await dbo.collection('premium').findOne({guild: args[0]});
    if (check) return msg.edit('***Guild is already activated.***');
    const premObject = {
      guild: args[0],
      user: args[1],
      staff: message.author.id
    };
    try {
      dbo.collection('premium').insertOne(premObject);
    } catch (e) {
      return msg.edit(e);
    }
    await message.delete();
    await msg.edit(`***Activated ${client.user.username} Premium on ${client.guilds.get(args[0]).name} for ${client.users.get(args[1]).tag}***`);

    const hook = new Discord.WebhookClient(web.activationLogID, web.activationLogToken);
    const embed = new Discord.RichEmbed();
    embed.setTitle('PREMIUM SERVER ACTIVATION');
    embed.setColor('GREEN');
    embed.addField('Guild', `${client.guilds.get(args[0]).name} | ${args[0]}`, true);
    embed.addField('User', `${client.users.get(args[1]).tag} | ${args[1]}`, true);
    embed.addField('Staff', `${message.author.tag} | ${message.author.id}`, true);
    embed.setTimestamp();
    embed.setFooter(client.user.username, client.user.avatarURL);
    await hook.send(embed);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Systems Support'
};
  
exports.help = {
  name: 'enprem',
  category: 'System',
  description: 'Activates Premium for the specified guild.',
  usage: 'enprem [...server ID] [...user ID]'
};
