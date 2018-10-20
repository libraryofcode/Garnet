const Discord = require('discord.js');
const cooldown = new Set();
exports.run = async (client, message, args) => {
  if (cooldown.has(message.author.id)) {
   
    const cooldownMessage = await message.reply('you are being ratelimited. Chill out for a minute.');
    cooldownMessage.delete(10000);
  } else {
    const dataSuggestion = args.join(' ');
    if (!dataSuggestion) return message.channel.send('**Please include text for the suggestion!**');

    const msg = await message.channel.send('Sending your suggestion');
    if (!message.guild.id === '446067825673633794') return msg.edit('This command can only be used in the Fortnite Community server.');
  
    const embed = new Discord.RichEmbed()
      .setTitle('Moonglow Suggestion')
      .addField('Author', `${message.author.username} (${message.author.id})`)
      .addField('Suggestion', `${dataSuggestion}`)
      .setTimestamp()
      .setColor('RANDOM')
      .setFooter(client.user.username, client.user.avatarURL);
    const embedsend = await client.channels.get('462361967026241536').send({embed});
    //const successEmote = client.emojis.get('477618704155410452');
    embedsend.react(client.emojis.get('477618704155410452'));
    //const errorEmote = client.emojis.get('477698393754304513');
    embedsend.react(client.emojis.get('477698393754304513'));
    msg.edit('Suggestion has been successfully sent!');
    msg.delete(10000);
    message.delete(10000);
  }
  cooldown.add(message.author.id);
  setTimeout(() => {
  // Removes the user from the set after a minute
    cooldown.delete(message.author.id);
  }, 600000);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Standard User'
};
  
exports.help = {
  name: 'serversuggest',
  category: 'settings',
  description: 'Send a suggestion for the FC Server.',
  usage: 'suggest [..suggestion]'
};