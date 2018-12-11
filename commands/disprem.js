const Discord = require('discord.js');
const web = require('../webhooks.json');
var connectToMongo = require('../db/init.js');
exports.run = async (client, message, args) => {
  const msg = await message.channel.send('*Deactivating...');
  connectToMongo('mongodb://127.0.0.1:27017/', async function(err, db) {
    var dbo = db.db('Garnet');
    const check = await dbo.collection('premium').findOne({guild: args[0]});
    const thisUser = check.user;
    const thisGuild = check.guild;
    if (!check) return msg.edit('***Guild never had Premium.***');

    const q = { guild: args[0] };
    try {
      dbo.collection('premium').deleteOne(q);
    } catch (err) {
      msg.edit(err);
    }
    message.delete();
    try {
      await msg.edit(`***Deactivated ${client.user.username} Premium on ${client.guilds.get(thisGuild).name}***`);
    } catch (err) {
      await msg.edit('***There was an error is deactivation of Premium, however the guild was deactivated.***');
    }


    const hook = new Discord.WebhookClient(web.activationLogID, web.activationLogToken);
    const embed = new Discord.RichEmbed();
    embed.setTitle('PREMIUM SERVER DEACTIVATION');
    embed.setColor('RED');
    embed.addField('Guild', `${client.guilds.get(args[0]).name} | ${args[0]}`, true);
    embed.addField('User', `${client.users.get(thisUser).tag} | ${client.users.get(thisUser).id}`, true);
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
  name: 'disprem',
  category: 'System',
  description: 'Deactivates Premium on a server.',
  usage: 'disprem [...server ID]'
};